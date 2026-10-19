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
      window.scrollTo(0, curY + rect.top);
    }
  });
  await new Promise(r => setTimeout(r, 1000));

  // Scroll carousel to card 2 (ByteBrawl)
  await mobilePage.evaluate(() => {
    const section = document.querySelector('#achievement-scene-section');
    const carousel = section.querySelector('.snap-x');
    if (carousel) {
      const cards = carousel.querySelectorAll('.snap-center');
      if (cards[1]) {
        cards[1].scrollIntoView({ behavior: 'instant', inline: 'center' });
      }
    }
  });
  await new Promise(r => setTimeout(r, 1000));
  await mobilePage.screenshot({ path: path.join(outDir, 'mobile_card_02_bytebrawl.png') });
  console.log('Saved mobile_card_02_bytebrawl.png');

  // Scroll carousel to card 3 (ATAL FDP)
  await mobilePage.evaluate(() => {
    const section = document.querySelector('#achievement-scene-section');
    const carousel = section.querySelector('.snap-x');
    if (carousel) {
      const cards = carousel.querySelectorAll('.snap-center');
      if (cards[2]) {
        cards[2].scrollIntoView({ behavior: 'instant', inline: 'center' });
      }
    }
  });
  await new Promise(r => setTimeout(r, 1000));
  await mobilePage.screenshot({ path: path.join(outDir, 'mobile_card_03_fdp.png') });
  console.log('Saved mobile_card_03_fdp.png');

  await browser.close();
})();

