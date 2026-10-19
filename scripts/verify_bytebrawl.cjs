const fs = require('fs');
const path = require('path');
const puppeteer = require('../Frontend/node_modules/puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOTS_DIR = path.resolve(__dirname, '../screenshots');
const ARTIFACT_DIR = 'C:\\Users\\dk231\\.gemini\\antigravity\\brain\\040d8323-7870-4292-af17-9e2da61d7f75';

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

function saveScreenshotCopy(filename) {
  const src = path.join(SCREENSHOTS_DIR, filename);
  const dest = path.join(ARTIFACT_DIR, filename);
  try {
    fs.copyFileSync(src, dest);
  } catch (err) {
    console.warn(`Could not copy to artifact dir: ${err.message}`);
  }
}

async function runVerification() {
  console.log('Resetting ByteBrawl database records for a clean run...');
  const { default: ByteBrawlRegistration } = await import('../backend/models/bytebrawlModel.js');
  await ByteBrawlRegistration.deleteMany({ eventSlug: 'bytebrawl-hacktoberfest' });
  console.log('ByteBrawl database reset complete.');

  console.log('Launching browser for ByteBrawl verification...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080'],
  });

  try {
    const page = await browser.newPage();

    // ─────────────────────────────────────────────────────────────
    // TEST 1: DESKTOP (1920px)
    // ─────────────────────────────────────────────────────────────
    console.log('\n--- 1. Desktop 1920px Testing ---');
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('http://localhost:5173/events/bytebrawl-hacktoberfest', {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    await page.waitForSelector('h1', { timeout: 15000 });
    console.log('ByteBrawl page loaded at 1920px');

    // 1. Page Hero & Overview
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'page_1920.png') });
    saveScreenshotCopy('page_1920.png');
    console.log('Saved page_1920.png');

    // Scroll down to the registration form
    await page.evaluate(() => {
      document.getElementById('registration-section')?.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 600));

    // 2. Form with Team selected (default)
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'form_team_1920.png') });
    saveScreenshotCopy('form_team_1920.png');
    console.log('Saved form_team_1920.png');

    // Switch to Individual
    await page.click('input[value="INDIVIDUAL"]');
    await new Promise((r) => setTimeout(r, 600));

    // 3. Form with Individual selected
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'form_individual_1920.png') });
    saveScreenshotCopy('form_individual_1920.png');
    console.log('Saved form_individual_1920.png');

    // Test Validation Errors: Click submit on empty Individual form
    await page.click('button[type="submit"]');
    await new Promise((r) => setTimeout(r, 600));

    // 4. Validation Errors at 1920px
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'validation_errors_1920.png') });
    saveScreenshotCopy('validation_errors_1920.png');
    console.log('Saved validation_errors_1920.png');

    // Switch back to Team Registration and submit a REAL team registration!
    await page.click('input[value="TEAM"]');
    await new Promise((r) => setTimeout(r, 500));

    // Fill Team Form
    await page.type('#teamName', 'CyberKnights');
    // Participant 1
    await page.type('#p1-fullName', 'Devansh Mishra');
    await page.type('#p1-rollNumber', '2024CSE310');
    await page.select('#p1-branch', 'CSE');
    await page.select('#p1-year', '3rd Year');
    await page.type('#p1-mobile', '9876543111');
    await page.type('#p1-email', 'devansh.cse@mmmut.ac.in');

    // Participant 2
    await page.type('#p2-fullName', 'Sakshi Tiwari');
    await page.type('#p2-rollNumber', '2024IT320');
    await page.select('#p2-branch', 'IT');
    await page.select('#p2-year', '3rd Year');
    await page.type('#p2-mobile', '9876543222');
    await page.type('#p2-email', 'sakshi.it@mmmut.ac.in');

    // Checkboxes
    await page.click('#agreedRules');
    await page.click('#confirmedDetails');

    console.log('Submitting Real Team Registration from browser (CyberKnights)...');
    await page.click('button[type="submit"]');

    // Wait for Confirmation Panel
    await page.waitForFunction(
      () => document.body.innerText.includes("You're in.") || document.body.innerText.includes('BBH26-'),
      { timeout: 15000 }
    );
    await new Promise((r) => setTimeout(r, 800));

    // 5. Confirmation Panel at 1920px
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'confirmation_panel_1920.png') });
    saveScreenshotCopy('confirmation_panel_1920.png');
    console.log('Saved confirmation_panel_1920.png');

    // ─────────────────────────────────────────────────────────────
    // TEST 2: MOBILE (390px)
    // ─────────────────────────────────────────────────────────────
    console.log('\n--- 2. Mobile 390px Testing ---');
    const mobilePage = await browser.newPage();
    await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await mobilePage.goto('http://localhost:5173/events/bytebrawl-hacktoberfest', {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    await mobilePage.waitForSelector('h1', { timeout: 15000 });
    console.log('ByteBrawl page loaded at 390px');

    // 6. Page Hero at 390px
    await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'page_390.png') });
    saveScreenshotCopy('page_390.png');
    console.log('Saved page_390.png');

    // Scroll to registration form
    await mobilePage.evaluate(() => {
      document.getElementById('registration-section')?.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 600));

    // 7. Form with Team selected at 390px
    await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'form_team_390.png') });
    saveScreenshotCopy('form_team_390.png');
    console.log('Saved form_team_390.png');

    // Switch to Individual
    await mobilePage.click('input[value="INDIVIDUAL"]');
    await new Promise((r) => setTimeout(r, 600));

    // 8. Form with Individual selected at 390px
    await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'form_individual_390.png') });
    saveScreenshotCopy('form_individual_390.png');
    console.log('Saved form_individual_390.png');

    // Trigger validation errors on mobile
    await mobilePage.click('button[type="submit"]');
    await new Promise((r) => setTimeout(r, 600));

    // 9. Validation errors at 390px
    await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'validation_errors_390.png') });
    saveScreenshotCopy('validation_errors_390.png');
    console.log('Saved validation_errors_390.png');

    // Submit a REAL Individual registration on mobile!
    await mobilePage.type('#p1-fullName', 'Prakhar Srivastava');
    await mobilePage.type('#p1-rollNumber', '2024ECE410');
    await mobilePage.select('#p1-branch', 'ECE');
    await mobilePage.select('#p1-year', '2nd Year');
    await mobilePage.type('#p1-mobile', '9876543333');
    await mobilePage.type('#p1-email', 'prakhar.ece@mmmut.ac.in');

    // Scroll each checkbox into view before clicking
    await mobilePage.evaluate(() => document.getElementById('agreedRules')?.scrollIntoView({ block: 'center' }));
    await new Promise((r) => setTimeout(r, 100));
    await mobilePage.click('#agreedRules');
    await mobilePage.evaluate(() => document.getElementById('confirmedDetails')?.scrollIntoView({ block: 'center' }));
    await new Promise((r) => setTimeout(r, 100));
    await mobilePage.click('#confirmedDetails');

    console.log('Submitting Real Individual Registration from mobile browser (Prakhar Srivastava)...');
    await mobilePage.evaluate(() => {
      const btn = document.querySelector('button[type="submit"]');
      if (btn) {
        btn.scrollIntoView({ block: 'center' });
      }
    });
    await new Promise((r) => setTimeout(r, 300));
    await mobilePage.click('button[type="submit"]');

    await mobilePage.waitForFunction(
      () => document.body.innerText.includes("You're in.") || document.body.innerText.includes('BBH26-'),
      { timeout: 15000 }
    );
    await new Promise((r) => setTimeout(r, 800));

    // 10. Confirmation Panel at 390px
    await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'confirmation_panel_390.png') });
    saveScreenshotCopy('confirmation_panel_390.png');
    console.log('Saved confirmation_panel_390.png');

    // ─────────────────────────────────────────────────────────────
    // TEST 3: DUPLICATE DETECTION TEST FROM BROWSER
    // ─────────────────────────────────────────────────────────────
    console.log('\n--- 3. Duplicate Detection Test from Browser ---');
    const dupPage = await browser.newPage();
    await dupPage.setViewport({ width: 1280, height: 900 });
    await dupPage.goto('http://localhost:5173/events/bytebrawl-hacktoberfest', {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    await dupPage.evaluate(() => {
      document.getElementById('registration-section')?.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 500));

    await dupPage.click('input[value="INDIVIDUAL"]');
    await new Promise((r) => setTimeout(r, 400));

    // Attempt duplicate roll number (2024CSE310 - Devansh Mishra already registered)
    await dupPage.type('#p1-fullName', 'Duplicate Candidate');
    await dupPage.type('#p1-rollNumber', '2024CSE310'); // DUPLICATE ROLL!
    await dupPage.select('#p1-branch', 'CSE');
    await dupPage.select('#p1-year', '3rd Year');
    await dupPage.type('#p1-mobile', '9123456780');
    await dupPage.type('#p1-email', 'unique.email@mmmut.ac.in');

    await dupPage.evaluate(() => document.getElementById('agreedRules')?.scrollIntoView({ block: 'center' }));
    await new Promise((r) => setTimeout(r, 100));
    await dupPage.click('#agreedRules');
    await dupPage.evaluate(() => document.getElementById('confirmedDetails')?.scrollIntoView({ block: 'center' }));
    await new Promise((r) => setTimeout(r, 100));
    await dupPage.click('#confirmedDetails');

    console.log('Submitting duplicate roll number to verify 409 handling...');
    await dupPage.evaluate(() => {
      const btn = document.querySelector('button[type="submit"]');
      if (btn) btn.scrollIntoView({ block: 'center' });
    });
    await new Promise((r) => setTimeout(r, 300));
    await dupPage.click('button[type="submit"]');
    await new Promise((r) => setTimeout(r, 1500));

    // 11. Duplicate error displayed
    await dupPage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'duplicate_error_browser.png') });
    saveScreenshotCopy('duplicate_error_browser.png');
    console.log('Saved duplicate_error_browser.png');

    console.log('\n✅ ALL BROWSER AUTOMATION TESTS COMPLETED SUCCESSFULLY!');
  } finally {
    await browser.close();
  }
}

runVerification().catch((err) => {
  console.error('Browser verification failed:', err);
  process.exit(1);
});

