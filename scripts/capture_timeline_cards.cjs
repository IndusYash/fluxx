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

  const outDir = path.join(__dirname, '..', 'reports', 'events_and_card_verification');

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('flux_intro_seen_v1', '1');
  });

  await page.goto('http://localhost:5173/events', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // Scroll to timeline items (specifically Orientation and She Leads)
  await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.card-outline'));
    const orientationCard = cards.find(c => c.innerText.includes('FLUX Orientation 2025') || c.innerText.includes('Orientation'));
    if (orientationCard) {
      orientationCard.scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'mobile_timeline_orientation.png') });
  console.log('Saved mobile_timeline_orientation.png');

  await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.card-outline'));
    const sheLeadsCard = cards.find(c => c.innerText.includes('She Leads'));
    if (sheLeadsCard) {
      sheLeadsCard.scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'mobile_timeline_she_leads.png') });
  console.log('Saved mobile_timeline_she_leads.png');

  await browser.close();
  console.log('Timeline screenshots captured.');
})();

