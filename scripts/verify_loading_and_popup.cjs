const fs = require('fs');
const path = require('path');
const puppeteer = require('../Frontend/node_modules/puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = path.resolve(__dirname, '../screenshots/popup_and_loader');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
    await page.evaluateOnNewDocument(() => {
      sessionStorage.setItem('flux_intro_seen_v1', '1');
    });

    console.log('1. Loading Home page on desktop (1920x1080)...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1500));

    // Screenshot Desktop Hero with 3D ByteBrawl Popup
    const heroDesktopPath = path.join(OUT_DIR, '01_desktop_hero_popup.png');
    await page.screenshot({ path: heroDesktopPath });
    console.log(`Saved: ${heroDesktopPath}`);

    // Check popup presence
    const popupData = await page.evaluate(() => {
      const liveBadge = document.querySelector('span.text-cyan-300');
      const regButton = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Register Now'));
      const exploreButton = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Explore'));
      const minimizeButton = document.querySelector('button[aria-label="Minimize ByteBrawl Alert"]');
      return {
        hasLiveBadge: !!liveBadge,
        liveBadgeText: liveBadge ? liveBadge.textContent : null,
        hasRegButton: !!regButton,
        hasExploreButton: !!exploreButton,
        hasMinimizeButton: !!minimizeButton,
      };
    });
    console.log('Desktop Popup Elements:', popupData);

    // Test Mobile Viewports
    const mobileViewports = [
      { name: '360x800', width: 360, height: 800 },
      { name: '390x844', width: 390, height: 844 },
      { name: '402x848', width: 402, height: 848 },
      { name: '430x932', width: 430, height: 932 }
    ];

    for (const mv of mobileViewports) {
      console.log(`\nTesting mobile viewport ${mv.name}...`);
      await page.setViewport({ width: mv.width, height: mv.height, deviceScaleFactor: 1 });
      await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 1500));

      // Check overflow and tap targets
      const metrics = await page.evaluate(() => {
        const scrollWidth = document.documentElement.scrollWidth;
        const innerWidth = window.innerWidth;
        const buttons = Array.from(document.querySelectorAll('button, a'));
        const smallTargets = buttons.filter(el => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && (r.width < 43 || r.height < 43);
        }).map(el => ({
          tag: el.tagName,
          text: (el.textContent || '').trim().slice(0, 30),
          width: el.getBoundingClientRect().width,
          height: el.getBoundingClientRect().height
        }));

        return {
          scrollWidth,
          innerWidth,
          hasOverflow: scrollWidth > innerWidth,
          smallTargetsCount: smallTargets.length,
          smallTargets
        };
      });
      console.log(`Mobile ${mv.name} metrics:`, {
        scrollWidth: metrics.scrollWidth,
        innerWidth: metrics.innerWidth,
        hasOverflow: metrics.hasOverflow,
        smallTargetsCount: metrics.smallTargetsCount
      });

      const mobileShot = path.join(OUT_DIR, `02_mobile_hero_${mv.name}.png`);
      await page.screenshot({ path: mobileShot });
      console.log(`Saved: ${mobileShot}`);
    }

    // Test Navigation to ByteBrawl page to verify the new cyber loading animation
    console.log('\nTesting navigation to ByteBrawl to capture loading animation...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1000));

    // Click "Register Now" on the popup
    const clickSuccess = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Register Now'));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    console.log('Clicked Register Now:', clickSuccess);

    // Instantly capture transition loader
    await new Promise(r => setTimeout(r, 80));
    const loaderShot = path.join(OUT_DIR, '03_cyber_route_loader.png');
    await page.screenshot({ path: loaderShot });
    console.log(`Saved loader screen: ${loaderShot}`);

    // Wait for registration page to load
    await new Promise(r => setTimeout(r, 2000));
    console.log('Current URL after navigation:', page.url());
    const regPageShot = path.join(OUT_DIR, '04_register_page_loaded.png');
    await page.screenshot({ path: regPageShot });
    console.log(`Saved register page: ${regPageShot}`);

  } catch (err) {
    console.error('Test error:', err);
  } finally {
    await browser.close();
  }
}

run();

