const fs = require('fs');
const path = require('path');
const puppeteer = require('../Frontend/node_modules/puppeteer-core');
const sharp = require('../Frontend/node_modules/sharp');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASELINE_DIR = path.resolve(__dirname, '../screenshots/desktop_baseline');
const AFTER_DIR = path.resolve(__dirname, '../screenshots/desktop_after');
const ARTIFACT_DIR = 'C:\\Users\\dk231\\.gemini\\antigravity\\brain\\6ac5a905-bda9-485a-a07a-4560cfb29d46';

const VIEWPORTS = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1440x900',  width: 1440, height: 900 },
  { name: '1024x768',  width: 1024, height: 768 }
];

const HOME_TARGETS = [
  { id: 'pos01_hero', selector: '#hero-section', offsetRatio: 0 },
  { id: 'pos02_scroll_text', selector: '#scroll-text-section', offsetRatio: 0.3 },
  { id: 'pos03_liquid_transition', selector: '#liquid-transition-section', offsetRatio: 0 },
  { id: 'pos04_stats', selector: '#stats-grid-container', offsetRatio: 0 },
  { id: 'pos05_legacy', selector: '#legacy-section', offsetRatio: 0 },
  { id: 'pos06_legacy_content', selector: '#legacy-spacer', offsetRatio: 0 },
  { id: 'pos07_what_we_do', selector: '#what-we-do-section', offsetRatio: 0 },
  { id: 'pos08_events_slider', selector: '#events-showcase-section', offsetRatio: 0 },
  { id: 'pos09_beam_section', selector: '#beam-section', offsetRatio: 0 },
  { id: 'pos10_achievement_scene', selector: '#achievement-scene-wrapper', offsetRatio: 0 },
  { id: 'pos11_objectives', selector: '#objectives-section', offsetRatio: 0 },
  { id: 'pos12_footer', selector: '#footer-showcase-section', offsetRatio: 0 },
];

async function captureSet(mode = 'baseline') {
  const targetDir = mode === 'baseline' ? BASELINE_DIR : AFTER_DIR;
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    for (const vp of VIEWPORTS) {
      console.log(`\n>>> Capturing ${mode} for viewport ${vp.name} (${vp.width}x${vp.height})...`);
      const vpDir = path.join(targetDir, vp.name);
      if (!fs.existsSync(vpDir)) fs.mkdirSync(vpDir, { recursive: true });

      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
      await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
      await page.evaluateOnNewDocument(() => {
        sessionStorage.setItem('flux_intro_seen_v1', '1');
      });

      // 1. Home Page
      console.log(`  Navigating to Home Page http://localhost:5173/...`);
      await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 1200));

      for (const target of HOME_TARGETS) {
        await page.evaluate((t) => {
          const el = document.querySelector(t.selector);
          if (el) {
            const rect = el.getBoundingClientRect();
            const curY = window.scrollY || document.documentElement.scrollTop || 0;
            const targetY = curY + rect.top + (rect.height * (t.offsetRatio || 0));
            if (window.__lenis) {
              window.__lenis.scrollTo(targetY, { immediate: true });
            } else {
              window.scrollTo(0, targetY);
            }
          }
          if (window.ScrollTrigger) {
            window.ScrollTrigger.update();
          }
        }, target);

        await new Promise(r => setTimeout(r, 1200));

        const filename = `${target.id}.png`;
        const filepath = path.join(vpDir, filename);
        await page.screenshot({ path: filepath });
        console.log(`    Captured ${filename}`);
      }

      // 2. Events Page
      console.log(`  Navigating to Events Page http://localhost:5173/events...`);
      await page.goto('http://localhost:5173/events', { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 1400));

      // Events pos 1 (top)
      await page.evaluate(() => {
        if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
        else window.scrollTo(0, 0);
      });
      await new Promise(r => setTimeout(r, 1200));
      await page.screenshot({ path: path.join(vpDir, 'pos13_events_top.png') });
      console.log(`    Captured pos13_events_top.png`);

      // Events pos 2 (scrolled)
      await page.evaluate(() => {
        if (window.__lenis) window.__lenis.scrollTo(700, { immediate: true });
        else window.scrollTo(0, 700);
      });
      await new Promise(r => setTimeout(r, 1200));
      await page.screenshot({ path: path.join(vpDir, 'pos14_events_scrolled.png') });
      console.log(`    Captured pos14_events_scrolled.png`);

      // 3. Faculty Page
      console.log(`  Navigating to Faculty Page http://localhost:5173/faculty...`);
      await page.goto('http://localhost:5173/faculty', { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 1400));

      // Faculty pos 1 (top)
      await page.evaluate(() => {
        if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
        else window.scrollTo(0, 0);
      });
      await new Promise(r => setTimeout(r, 1200));
      await page.screenshot({ path: path.join(vpDir, 'pos15_faculty_top.png') });
      console.log(`    Captured pos15_faculty_top.png`);

      // Faculty pos 2 (scrolled)
      await page.evaluate(() => {
        if (window.__lenis) window.__lenis.scrollTo(800, { immediate: true });
        else window.scrollTo(0, 800);
      });
      await new Promise(r => setTimeout(r, 1200));
      await page.screenshot({ path: path.join(vpDir, 'pos16_faculty_scrolled.png') });
      console.log(`    Captured pos16_faculty_scrolled.png`);

      await page.close();
    }
  } finally {
    await browser.close();
  }
}

async function diffSets() {
  console.log('\n======================================================');
  console.log('COMPARING BASELINE VS AFTER DESKTOP SCREENSHOTS');
  console.log('======================================================\n');

  const results = [];
  let anyFailed = false;

  for (const vp of VIEWPORTS) {
    const baselineVpDir = path.join(BASELINE_DIR, vp.name);
    const afterVpDir = path.join(AFTER_DIR, vp.name);

    if (!fs.existsSync(baselineVpDir) || !fs.existsSync(afterVpDir)) {
      console.error(`Missing directory for viewport ${vp.name}`);
      continue;
    }

    const files = fs.readdirSync(baselineVpDir).filter(f => f.endsWith('.png'));

    for (const file of files) {
      const bPath = path.join(baselineVpDir, file);
      const aPath = path.join(afterVpDir, file);

      if (!fs.existsSync(aPath)) {
        console.error(`Missing after screenshot: ${aPath}`);
        results.push({ viewport: vp.name, file, diffPercent: 100, pass: false });
        anyFailed = true;
        continue;
      }

      const bImg = sharp(bPath);
      const aImg = sharp(aPath);

      const [bMeta, aMeta] = await Promise.all([bImg.metadata(), aImg.metadata()]);

      if (bMeta.width !== aMeta.width || bMeta.height !== aMeta.height) {
        console.error(`Dimensions mismatch for ${vp.name}/${file}: ${bMeta.width}x${bMeta.height} vs ${aMeta.width}x${aMeta.height}`);
        results.push({ viewport: vp.name, file, diffPercent: 100, pass: false });
        anyFailed = true;
        continue;
      }

      const [bBuf, aBuf] = await Promise.all([bImg.raw().toBuffer(), aImg.raw().toBuffer()]);

      let diffPixels = 0;
      const totalPixels = bMeta.width * bMeta.height;
      const channels = bMeta.channels || 4;

      for (let i = 0; i < bBuf.length; i += channels) {
        let diffColor = false;
        for (let c = 0; c < Math.min(channels, 3); c++) {
          if (Math.abs(bBuf[i + c] - aBuf[i + c]) > 3) {
            diffColor = true;
            break;
          }
        }
        if (diffColor) diffPixels++;
      }

      const diffPercent = (diffPixels / totalPixels) * 100;
      const pass = diffPercent <= 0.05;
      if (!pass) anyFailed = true;

      results.push({
        viewport: vp.name,
        file,
        totalPixels,
        diffPixels,
        diffPercent: parseFloat(diffPercent.toFixed(4)),
        pass
      });
    }
  }

  console.table(results.map(r => ({
    Viewport: r.viewport,
    Screenshot: r.file,
    'Diff Pixels': r.diffPixels,
    'Diff %': `${r.diffPercent}%`,
    Pass: r.pass ? '✅ PASS' : '❌ FAIL'
  })));

  if (anyFailed) {
    console.error('\n❌ DESKTOP DIFF CHECK FAILED: Differences detected above threshold 0.05%!');
  } else {
    console.log('\n✅ GOLDEN RULE MET: Zero desktop differences (all <= 0.05%)!');
  }

  return { results, anyFailed };
}

(async () => {
  const mode = process.argv[2] || 'baseline';
  if (mode === 'baseline') {
    await captureSet('baseline');
    console.log('\nBaseline screenshots captured successfully!');
  } else if (mode === 'after') {
    await captureSet('after');
    console.log('\nAfter screenshots captured successfully!');
  } else if (mode === 'compare') {
    await diffSets();
  } else if (mode === 'full-verify') {
    await captureSet('after');
    await diffSets();
  } else {
    console.log('Usage: node scripts/desktop_baseline_and_diff.cjs [baseline|after|compare|full-verify]');
  }
})();

