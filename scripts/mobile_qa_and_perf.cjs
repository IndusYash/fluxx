const fs = require('fs');
const path = require('path');
const puppeteer = require('../Frontend/node_modules/puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOT_BASE = path.resolve(__dirname, '../screenshots/mobile');
const REPORT_FILE = path.resolve(__dirname, '../screenshots/mobile_qa_report.json');

const MOBILE_VIEWPORTS = [
  { name: '360x800', width: 360, height: 800, dpr: 1 },
  { name: '390x844', width: 390, height: 844, dpr: 1 },
  { name: '402x848', width: 402, height: 848, dpr: 1 },
  { name: '430x932', width: 430, height: 932, dpr: 1 },
];

const SECTIONS = [
  { id: '01_hero', selector: '#hero-section', name: 'Hero' },
  { id: '02_stats', selector: '#stats-grid-container', name: 'Stats' },
  { id: '03_legacy', selector: '#legacy-section', name: 'Legacy / About' },
  { id: '04_what_we_do', selector: '#what-we-do-section', name: 'What We Do' },
  { id: '05_events_slider', selector: '#events-showcase-section', name: 'Events Slider' },
  { id: '06_beam_faculty', selector: '#beam-section', name: 'Faculty Mentorship' },
  { id: '07_achievements', selector: '#achievement-scene-section', name: 'Achievements Carousel' },
  { id: '08_objectives', selector: '#objectives-section', name: 'Objectives' },
  { id: '09_footer_showcase', selector: '#footer-showcase-section', name: 'Footer Showcase' },
  { id: '10_site_footer', selector: '#site-footer', name: 'Site Footer' },
];

async function runMobileQA() {
  if (!fs.existsSync(SCREENSHOT_BASE)) {
    fs.mkdirSync(SCREENSHOT_BASE, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    protocolTimeout: 300000
  });

  const fullReport = {
    viewports: {},
    navbarCheck: {},
    introCheck: {},
    performance: {}
  };

  try {
    // 1. Intro Test on 390x844
    console.log('\n=============================================');
    console.log('>>> 1. TESTING INTRO / PRELOADER ON MOBILE');
    console.log('=============================================');
    {
      const introPage = await browser.newPage();
      await introPage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
      await introPage.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 800));

      const introInfo = await introPage.evaluate(() => {
        const prompt = document.getElementById('flux-activate-prompt') || document.querySelector('[aria-label="FLUX Intro Experience"]');
        const numEl = document.querySelector('.font-poiret');
        const skipBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('SKIP'));
        const docW = document.documentElement.scrollWidth;
        const winW = window.innerWidth;
        const skipRect = skipBtn ? skipBtn.getBoundingClientRect() : null;

        return {
          hasOverflow: docW > winW,
          scrollWidth: docW,
          innerWidth: winW,
          counterVisible: !!numEl,
          skipButtonTapTarget: skipRect ? { w: skipRect.width, h: skipRect.height } : null
        };
      });

      const introDir = path.join(SCREENSHOT_BASE, 'intro');
      if (!fs.existsSync(introDir)) fs.mkdirSync(introDir, { recursive: true });
      await introPage.screenshot({ path: path.join(introDir, 'intro_loading.png') });
      await introPage.close();

      fullReport.introCheck = introInfo;
      console.log('Intro Preloader check:', introInfo);
    }

    // 2. Test Viewports
    for (const vp of MOBILE_VIEWPORTS) {
      console.log(`\n=============================================`);
      console.log(`>>> TESTING MOBILE VIEWPORT: ${vp.name} (${vp.width}x${vp.height})`);
      console.log(`=============================================`);

      const vpDir = path.join(SCREENSHOT_BASE, vp.name);
      if (!fs.existsSync(vpDir)) fs.mkdirSync(vpDir, { recursive: true });

      const page = await browser.newPage();
      await page.setViewport({
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: vp.dpr,
        isMobile: true,
        hasTouch: true
      });

      // Emulate intro already completed so home page is interactive
      await page.evaluateOnNewDocument(() => {
        sessionStorage.setItem('flux_intro_seen_v1', '1');
      });

      await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 1200));

      // Global horizontal overflow check
      const globalOverflow = await page.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          hasOverflow: document.documentElement.scrollWidth > window.innerWidth
        };
      });
      console.log(`  Global horizontal overflow: ${globalOverflow.hasOverflow ? 'FAIL' : 'PASS'} (scrollWidth: ${globalOverflow.scrollWidth}, innerWidth: ${globalOverflow.innerWidth})`);

      // Test Navbar drawer
      let navDrawerResult = null;
      if (vp.name === '390x844') {
        console.log('  Testing Mobile Navbar Drawer...');
        navDrawerResult = await page.evaluate(async () => {
          const btn = document.querySelector('button[aria-label="Open main menu"]') || document.querySelector('button[aria-label="Toggle navigation"]');
          if (!btn) return { error: 'Hamburger button not found' };
          btn.click();
          await new Promise(r => setTimeout(r, 400));

          const bodyOverflow = document.body.style.overflow;
          const links = Array.from(document.querySelectorAll('a[href]'))
            .filter(a => a.offsetParent !== null)
            .map(a => a.textContent.trim());

          const escClose = document.querySelector('button[aria-label="Close navigation menu"]');
          const hasEscOrClose = !!escClose;

          // Close it again
          if (escClose) escClose.click();
          else btn.click();
          await new Promise(r => setTimeout(r, 400));

          return {
            opened: true,
            bodyScrollLocked: bodyOverflow === 'hidden',
            visibleLinks: links,
            hasCloseButton: hasEscOrClose
          };
        });
        console.log('  Navbar drawer test:', navDrawerResult);
        fullReport.navbarCheck = navDrawerResult;
      }

      // Check each section
      const sectionResults = [];

      for (const sec of SECTIONS) {
        console.log(`  Scanning Section: ${sec.name} (${sec.id})...`);

        // Scroll to section
        await page.evaluate((selector) => {
          const el = document.querySelector(selector);
          if (el) {
            el.scrollIntoView({ behavior: 'instant', block: 'start' });
            if (window.ScrollTrigger) window.ScrollTrigger.update();
          }
        }, sec.selector);

        await new Promise(r => setTimeout(r, 600));

        // Programmatic checks on this section
        const checks = await page.evaluate((selector) => {
          const secEl = document.querySelector(selector);
          if (!secEl) return { found: false };

          const winW = window.innerWidth;
          const docW = document.documentElement.scrollWidth;
          const overflow = docW > winW;

          // Tap targets in this section
          const clickables = Array.from(secEl.querySelectorAll('button, a[href], [role="button"], input'));
          const smallTargets = [];
          for (const c of clickables) {
            // Check if visible
            const rect = c.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0 && rect.top < window.innerHeight && rect.bottom > 0) {
              const style = window.getComputedStyle(c);
              if (style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0') {
                if (rect.width < 40 || rect.height < 40) {
                  smallTargets.push({
                    text: c.innerText?.substring(0, 30) || c.getAttribute('aria-label') || 'element',
                    w: Math.round(rect.width),
                    h: Math.round(rect.height)
                  });
                }
              }
            }
          }

          // Check for overlapping text elements within this section
          const rawTextElements = Array.from(secEl.querySelectorAll('h1, h2, h3, h4, p, span, button'))
            .filter(el => {
              const style = window.getComputedStyle(el);
              if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false;
              if (el.children.length > 2) return false; // leaf or near-leaf text
              const text = el.innerText?.trim();
              return text && text.length >= 3;
            });

          const items = [];
          for (const el of rawTextElements) {
            const rect = el.getBoundingClientRect();
            if (rect.width > 20 && rect.height > 10) {
              items.push({ el, rect, text: el.innerText.trim().substring(0, 30) });
            }
          }

          const overlaps = [];
          for (let i = 0; i < items.length; i++) {
            for (let j = i + 1; j < items.length; j++) {
              const itemA = items[i];
              const itemB = items[j];
              if (itemA.el.contains(itemB.el) || itemB.el.contains(itemA.el)) continue;

              const rA = itemA.rect;
              const rB = itemB.rect;

              // Check bounding box intersection
              const intersectX = Math.max(0, Math.min(rA.right, rB.right) - Math.max(rA.left, rB.left));
              const intersectY = Math.max(0, Math.min(rA.bottom, rB.bottom) - Math.max(rA.top, rB.top));
              const intersectArea = intersectX * intersectY;

              if (intersectArea > 150) { // significant collision
                overlaps.push({
                  textA: itemA.text,
                  textB: itemB.text,
                  area: Math.round(intersectArea)
                });
              }
            }
          }

          // Check if covered by navbar or ticker
          const navEl = document.querySelector('header');
          const tickerEl = document.querySelector('#bottom-ticker-container') || document.querySelector('[data-ticker]');
          const navBottom = navEl ? navEl.getBoundingClientRect().bottom : 0;
          const tickerTop = tickerEl ? tickerEl.getBoundingClientRect().top : window.innerHeight;

          return {
            found: true,
            hasHorizontalOverflow: overflow,
            smallTargetsCount: smallTargets.length,
            smallTargets: smallTargets.slice(0, 5),
            overlapsCount: overlaps.length,
            overlaps: overlaps.slice(0, 5),
            navBottom,
            tickerTop
          };
        }, sec.selector);

        // Screenshot section
        const shotPath = path.join(vpDir, `${sec.id}.png`);
        await page.screenshot({ path: shotPath });

        sectionResults.push({
          section: sec.name,
          id: sec.id,
          checks
        });
      }

      fullReport.viewports[vp.name] = {
        globalOverflow,
        sections: sectionResults
      };

      await page.close();
    }

    // 3. Performance Test with 4x CPU throttle on 390x844
    console.log('\n=============================================');
    console.log('>>> 3. TESTING PERFORMANCE (4x CPU THROTTLE) ON 390x844');
    console.log('=============================================');
    {
      const perfPage = await browser.newPage();
      await perfPage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
      await perfPage.evaluateOnNewDocument(() => {
        sessionStorage.setItem('flux_intro_seen_v1', '1');
      });

      const client = await perfPage.target().createCDPSession();
      await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });

      await perfPage.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
      await new Promise(r => setTimeout(r, 1200));

      const fpsResults = {};

      for (const sec of SECTIONS) {
        console.log(`  Measuring FPS for Section: ${sec.name}...`);
        const sectionPerf = await perfPage.evaluate(async (selector) => {
          const el = document.querySelector(selector);
          if (!el) return { avgFps: 60, slowFramesCount: 0 };

          // Scroll towards section while measuring frame times
          const targetY = el.getBoundingClientRect().top + window.scrollY;
          const startY = window.scrollY;
          const distance = targetY - startY;
          const steps = 20;

          const frameDeltas = [];
          let lastTime = performance.now();

          return new Promise((resolve) => {
            let step = 0;
            function stepFrame() {
              const now = performance.now();
              const delta = now - lastTime;
              lastTime = now;
              frameDeltas.push(delta);

              step++;
              const curPos = startY + (distance * (step / steps));
              window.scrollTo(0, curPos);

              if (step < steps) {
                requestAnimationFrame(stepFrame);
              } else {
                // Calculate FPS
                const validDeltas = frameDeltas.slice(2); // ignore first 2 warmups
                const avgDelta = validDeltas.reduce((a, b) => a + b, 0) / validDeltas.length;
                const avgFps = Math.min(60, Math.round(1000 / avgDelta));
                const slowFrames = validDeltas.filter(d => d > 50).length;
                resolve({
                  avgFps,
                  slowFramesCount: slowFrames,
                  maxDeltaMs: Math.round(Math.max(...validDeltas))
                });
              }
            }
            requestAnimationFrame(stepFrame);
          });
        }, sec.selector);

        console.log(`    ${sec.name}: Avg FPS = ${sectionPerf.avgFps}, Slow Frames (>50ms) = ${sectionPerf.slowFramesCount}, Max Delta = ${sectionPerf.maxDeltaMs}ms`);
        fpsResults[sec.name] = sectionPerf;
      }

      fullReport.performance = fpsResults;
      await perfPage.close();
    }

    fs.writeFileSync(REPORT_FILE, JSON.stringify(fullReport, null, 2));
    console.log(`\nQA Report saved to ${REPORT_FILE}`);

  } catch (err) {
    console.error('Error during mobile QA:', err);
  } finally {
    await browser.close();
  }
}

runMobileQA().catch(console.error);

