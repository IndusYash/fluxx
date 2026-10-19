const puppeteer = require('../Frontend/node_modules/puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluateOnNewDocument(() => sessionStorage.setItem('flux_intro_seen_v1', '1'));
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  console.log('Testing minimize button...');
  const closeBtn = await page.$('button[aria-label="Minimize ByteBrawl Alert"]');
  if (closeBtn) {
    await closeBtn.click();
    await new Promise(r => setTimeout(r, 600));
    const pill = await page.evaluate(() => {
      const p = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('BYTEBRAWL LIVE'));
      return !!p;
    });
    console.log('Minimized to pill:', pill);
    await page.screenshot({ path: 'screenshots/popup_and_loader/05_mobile_minimized_pill.png' });

    // Reopen from pill
    console.log('Testing reopen from pill...');
    await page.evaluate(() => {
      const p = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('BYTEBRAWL LIVE'));
      if (p) p.click();
    });
    await new Promise(r => setTimeout(r, 600));
    const reopened = await page.evaluate(() => {
      const b = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Register Now'));
      return !!b;
    });
    console.log('Reopened popup:', reopened);
  }
  await browser.close();
})();

