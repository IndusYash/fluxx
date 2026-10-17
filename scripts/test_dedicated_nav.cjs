const puppeteer = require('../Frontend/node_modules/puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--window-size=1920,1080'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('1. Navigating to /events/bytebrawl-hacktoberfest...');
  await page.goto('http://localhost:5173/events/bytebrawl-hacktoberfest', {
    waitUntil: 'networkidle2',
  });
  await new Promise((r) => setTimeout(r, 1200));

  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a')).map((a) => ({
      text: a.innerText.trim(),
      href: a.getAttribute('href'),
    }))
  );
  console.log(
    'Register links found on page:',
    links.filter((l) => l.href && l.href.includes('register'))
  );

  console.log('2. Clicking Register Now link via page.click...');
  await page.click('a[href="/events/bytebrawl-hacktoberfest/register"]');
  await new Promise((r) => setTimeout(r, 1500));
  console.log('Current URL after hero click:', page.url());

  if (!page.url().includes('/events/bytebrawl-hacktoberfest/register')) {
    throw new Error('Navigation failed! Expected URL to contain /register, got: ' + page.url());
  }
  console.log('✅ Successfully navigated to dedicated register page!');

  await page.screenshot({ path: 'screenshots/dedicated_register_page_1920.png' });
  fs.copyFileSync(
    'screenshots/dedicated_register_page_1920.png',
    'C:\\Users\\dk231\\.gemini\\antigravity\\brain\\040d8323-7870-4292-af17-9e2da61d7f75\\dedicated_register_page_1920.png'
  );
  console.log('Saved dedicated_register_page_1920.png');

  // Test Mobile view
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: 'screenshots/dedicated_register_page_390.png' });
  fs.copyFileSync(
    'screenshots/dedicated_register_page_390.png',
    'C:\\Users\\dk231\\.gemini\\antigravity\\brain\\040d8323-7870-4292-af17-9e2da61d7f75\\dedicated_register_page_390.png'
  );
  console.log('Saved dedicated_register_page_390.png');

  // Test Back to Event Details Link
  console.log('3. Clicking Back to Event Details link...');
  await page.click('a[href="/events/bytebrawl-hacktoberfest"]');
  await new Promise((r) => setTimeout(r, 1200));
  console.log('URL after clicking Back:', page.url());
  if (page.url().endsWith('/register')) {
    throw new Error('Back navigation failed!');
  }
  console.log('✅ Back navigation returned to /events/bytebrawl-hacktoberfest!');

  await browser.close();
  console.log('\n🎉 ALL DEDICATED PAGE NAVIGATION TESTS PASSED!');
})();

