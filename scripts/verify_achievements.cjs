const puppeteer = require('../Frontend/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const outDir = path.join(__dirname, '..', 'reports', 'achievement_verification');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 1. Mobile verification (390x844)
  console.log('--- TESTING MOBILE VIEW (390x844) ---');
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await mobilePage.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  
  await mobilePage.evaluateOnNewDocument(() => {
    sessionStorage.setItem('flux_intro_seen_v1', '1');
  });

  await mobilePage.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  await mobilePage.evaluate(() => {
    const el = document.querySelector('#achievement-scene-section');
    if (el) {
      const curY = window.scrollY || document.documentElement.scrollTop || 0;
      const rect = el.getBoundingClientRect();
      const targetY = curY + rect.top;
      if (window.__lenis) {
        window.__lenis.scrollTo(targetY, { immediate: true });
      } else {
        window.scrollTo(0, targetY);
      }
    }
  });
  await new Promise(r => setTimeout(r, 1500));

  await mobilePage.screenshot({ path: path.join(outDir, 'mobile_achievement_section.png') });
  console.log('Mobile screenshot saved to reports/achievement_verification/mobile_achievement_section.png');

  // Verify mobile cards text content
  const cardData = await mobilePage.evaluate(() => {
    const section = document.querySelector('#achievement-scene-section');
    if (!section) return { error: 'Section not found' };
    const text = section.innerText;
    const cards = Array.from(section.querySelectorAll('.snap-center')).map(card => {
      const h3 = card.querySelector('h3')?.innerText || '';
      const h4 = card.querySelector('h4')?.innerText || '';
      const p = card.querySelector('p')?.innerText || '';
      const btn = card.querySelector('button')?.innerText || '';
      const img = card.querySelector('img')?.src || '';
      return { h3, h4, p, btn, img };
    });
    return {
      allText: text,
      hasSIH: text.toLowerCase().includes('smart india') || text.toLowerCase().includes('sih'),
      hasChauhan: text.toLowerCase().includes('chauhan'),
      hasShukla: text.toLowerCase().includes('archana') || text.toLowerCase().includes('shukla'),
      cardsCount: cards.length,
      cards
    };
  });

  console.log('Mobile Card Verification:', JSON.stringify(cardData, null, 2));

  // 2. Desktop verification (1920x1080)
  console.log('\n--- TESTING DESKTOP VIEW (1920x1080) ---');
  const deskPage = await browser.newPage();
  await deskPage.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await deskPage.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  
  await deskPage.evaluateOnNewDocument(() => {
    sessionStorage.setItem('flux_intro_seen_v1', '1');
  });

  await deskPage.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  await deskPage.evaluate(() => {
    const el = document.querySelector('#achievement-scene-section');
    if (el) {
      const curY = window.scrollY || document.documentElement.scrollTop || 0;
      const rect = el.getBoundingClientRect();
      const targetY = curY + rect.top + (rect.height * 0.4); // scroll into the 3D card sequence
      if (window.__lenis) {
        window.__lenis.scrollTo(targetY, { immediate: true });
      } else {
        window.scrollTo(0, targetY);
      }
    }
  });
  await new Promise(r => setTimeout(r, 2000));

  await deskPage.screenshot({ path: path.join(outDir, 'desktop_achievement_section.png') });
  console.log('Desktop screenshot saved to reports/achievement_verification/desktop_achievement_section.png');

  await browser.close();
  console.log('\nVerification run finished successfully.');
})();
