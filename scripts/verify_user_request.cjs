const fs = require('fs');
const path = require('path');
const puppeteer = require('../Frontend/node_modules/puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = path.resolve(__dirname, '../screenshots/user_request_verify');

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

    console.log('--- TEST 1: Initial Website Start (Testing that loading animation is NOT shown, landing animation runs) ---');
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
    
    // Check if transition loader is active immediately on load
    const initialLoaderActive = await page.evaluate(() => {
      const loader = document.querySelector('[data-loading-screen]');
      const telemetryTag = Array.from(document.querySelectorAll('*')).find(
        el => el.textContent && el.textContent.includes('TELEMETRY LINK ACTIVE')
      );
      return {
        hasLoaderOnStart: !!loader,
        hasTelemetryTag: !!telemetryTag
      };
    });
    console.log('Initial Start Check:', initialLoaderActive);

    // Let the landing animation finish
    console.log('Waiting for landing animation to reveal homepage...');
    await new Promise(r => setTimeout(r, 4500));

    // Capture desktop hero with the newly styled ByteBrawl popup
    const desktopHeroShot = path.join(OUT_DIR, '01_desktop_hero_styled_popup.png');
    await page.screenshot({ path: desktopHeroShot });
    console.log(`Saved desktop hero with styled popup: ${desktopHeroShot}`);

    // Verify popup elements matching the user mock
    const popupElements = await page.evaluate(() => {
      const liveBadge = Array.from(document.querySelectorAll('*')).find(
        el => el.textContent && el.textContent.includes('REGISTRATIONS LIVE')
      );
      const flagHack = Array.from(document.querySelectorAll('*')).find(
        el => el.textContent && el.textContent.includes('FLAGSHIP HACKATHON')
      );
      const regBtn = Array.from(document.querySelectorAll('button')).find(
        el => el.textContent && el.textContent.includes('REGISTER NOW')
      );
      const exploreBtn = Array.from(document.querySelectorAll('button')).find(
        el => el.textContent && el.textContent.trim() === 'EXPLORE'
      );
      const octBadge = Array.from(document.querySelectorAll('*')).find(
        el => el.textContent && el.textContent.includes('Oct 2026')
      );
      const onlineBadge = Array.from(document.querySelectorAll('*')).find(
        el => el.textContent && el.textContent.includes('Online + Onsite')
      );
      const freeBadge = Array.from(document.querySelectorAll('*')).find(
        el => el.textContent && el.textContent.includes('Free Entry')
      );
      const sysTag = Array.from(document.querySelectorAll('*')).find(
        el => el.textContent && el.textContent.includes('[SYS://BYTEBRAWL_v2]')
      );
      return {
        hasLiveBadge: !!liveBadge,
        hasFlagshipHackathon: !!flagHack,
        hasRegisterButton: !!regBtn,
        hasExploreButton: !!exploreBtn,
        hasOctBadge: !!octBadge,
        hasOnlineBadge: !!onlineBadge,
        hasFreeBadge: !!freeBadge,
        hasSysTag: !!sysTag,
      };
    });
    console.log('Styled Popup Elements Check:', popupElements);

    console.log('\n--- TEST 2: Mobile Viewport (390x844 & 360x800) ---');
    await page.setViewport({ width: 390, height: 844 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    // Bypass intro for fast mobile layout snapshot
    await page.evaluate(() => sessionStorage.setItem('flux_intro_seen_v1', '1'));
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1200));

    const mobile390Shot = path.join(OUT_DIR, '02_mobile_hero_styled_popup_390x844.png');
    await page.screenshot({ path: mobile390Shot });
    console.log(`Saved mobile 390x844 screenshot: ${mobile390Shot}`);

    // Check minimize on mobile
    const closeBtn = await page.$('button[aria-label="Minimize ByteBrawl Alert"]');
    if (closeBtn) {
      await closeBtn.click();
      await new Promise(r => setTimeout(r, 600));
      const mobilePillShot = path.join(OUT_DIR, '03_mobile_minimized_pill.png');
      await page.screenshot({ path: mobilePillShot });
      console.log(`Saved mobile pill screenshot: ${mobilePillShot}`);
    }

    console.log('\n--- TEST 3: Navigation & Loading Screen (No blue line, no telemetry pill) ---');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:5173/events', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1000));

    // Navigate to ByteBrawl page to inspect loading screen
    const navPromise = page.evaluate(() => {
      window.location.href = '/events/bytebrawl-hacktoberfest/register';
    });
    await new Promise(r => setTimeout(r, 100));

    const loaderShot = path.join(OUT_DIR, '04_monochrome_loader.png');
    await page.screenshot({ path: loaderShot });
    console.log(`Saved updated loading screen: ${loaderShot}`);

    // Verify telemetry pill is NOT present in loader
    const loaderCheck = await page.evaluate(() => {
      const telemetryPill = Array.from(document.querySelectorAll('*')).find(
        el => el.textContent && el.textContent.includes('TELEMETRY LINK ACTIVE')
      );
      return {
        hasTelemetryPill: !!telemetryPill
      };
    });
    console.log('Loader Check (telemetry pill absent):', loaderCheck);

    // Wait for registration page
    await new Promise(r => setTimeout(r, 1500));
    console.log('Successfully arrived at registration page:', page.url());

    // Test returning to Home page for buttery smoothness
    console.log('Navigating back to Home page (/) to verify buttery return...');
    await page.evaluate(() => {
      window.location.href = '/';
    });
    await new Promise(r => setTimeout(r, 1500));
    const returnHomeShot = path.join(OUT_DIR, '05_returned_to_home.png');
    await page.screenshot({ path: returnHomeShot });
    console.log(`Saved returned to home screenshot: ${returnHomeShot}`);

  } catch (err) {
    console.error('Test error:', err);
  } finally {
    await browser.close();
  }
}

run();

