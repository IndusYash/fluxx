const fs = require('fs');
const path = require('path');
const puppeteer = require('../Frontend/node_modules/puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOTS_DIR = path.resolve(__dirname, '../screenshots');
const ARTIFACT_DIR = 'C:\\Users\\dk231\\.gemini\\antigravity\\brain\\040d8323-7870-4292-af17-9e2da61d7f75';

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

function saveScreenshot(filename) {
  const src = path.join(SCREENSHOTS_DIR, filename);
  const dest = path.join(ARTIFACT_DIR, filename);
  try {
    fs.copyFileSync(src, dest);
  } catch (err) {
    console.warn(`Could not copy screenshot to artifact dir: ${err.message}`);
  }
}

async function fetchOtp(email) {
  for (let i = 0; i < 15; i++) {
    const res = await fetch(`http://localhost:4000/api/events/bytebrawl-hacktoberfest/dev-otp?email=${encodeURIComponent(email)}`);
    const data = await res.json();
    if (data.code) return data.code;
    await new Promise((r) => setTimeout(r, 400));
  }
  return null;
}

async function clickNext(page) {
  await page.waitForSelector('#btn-next-step:not([disabled])', { timeout: 8000 });
  await page.click('#btn-next-step');
  await new Promise((r) => setTimeout(r, 600));
}

async function checkConfirmationBoxes(page) {
  await page.waitForSelector('#agree-rules', { timeout: 5000 });
  await page.evaluate(() => {
    const cb1 = document.getElementById('agree-rules');
    const cb2 = document.getElementById('confirm-details');
    if (cb1 && !cb1.checked) cb1.click();
    if (cb2 && !cb2.checked) cb2.click();
  });
  await new Promise((r) => setTimeout(r, 500));
}

async function clickSubmit(page) {
  await page.waitForSelector('#btn-submit-registration:not([disabled])', { timeout: 8000 });
  await page.click('#btn-submit-registration');
  await new Promise((r) => setTimeout(r, 800));
}

async function selectRadix(page, placeholderText, valueText) {
  await page.evaluate((ph) => {
    const btns = Array.from(document.querySelectorAll('button[role="combobox"]'));
    const btn = btns.find((b) => b.textContent && b.textContent.includes(ph));
    if (btn) btn.click();
  }, placeholderText);
  await page.waitForSelector('[role="option"]', { timeout: 4000 });
  await page.evaluate((val) => {
    const options = Array.from(document.querySelectorAll('[role="option"]'));
    const option = options.find((o) => o.textContent && o.textContent.trim() === val);
    if (option) option.click();
  }, valueText);
  await new Promise((r) => setTimeout(r, 400));
}

async function runVerification() {
  console.log('========================================================');
  console.log('BYTEBRAWL x HACKTOBERFEST: REWORKED FLOW VERIFICATION');
  console.log('========================================================\n');

  // 1. Reset Database & Dev Mail/OTP Stores
  console.log('[1/7] Resetting database and OTP test store...');
  const { prisma } = await import('../backend/prisma/client.js');
  await prisma.participant.deleteMany({
    where: { eventSlug: 'bytebrawl-hacktoberfest' },
  });
  await prisma.registration.deleteMany({
    where: { eventSlug: 'bytebrawl-hacktoberfest' },
  });
  await fetch('http://localhost:4000/api/events/bytebrawl-hacktoberfest/dev-reset', { method: 'POST' });
  console.log('✓ Clean database & mail state established.\n');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080'],
  });

  try {
    // ─────────────────────────────────────────────────────────────
    // TEST SUITE A: FULL TEAM FLOW AT 1920px (Desktop)
    // ─────────────────────────────────────────────────────────────
    console.log('[2/7] Testing Step-by-Step Team Flow at 1920px...');
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    page.on('console', (msg) => console.log('PAGE [LOG]:', msg.text()));
    page.on('pageerror', (err) => console.log('PAGE [ERROR]:', err.message));

    await page.goto('http://localhost:5173/events/bytebrawl-hacktoberfest/register', {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });
    await new Promise((r) => setTimeout(r, 1000));

    // STEP 1: Format Selection
    console.log('  -> Step 1: Format Selection (Team selected by default)');
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'step1_format_1920.png') });
    saveScreenshot('step1_format_1920.png');

    // Click Next to Step 2
    await clickNext(page);

    // STEP 2: Team Details & Live Check
    console.log('  -> Step 2: Team Details & Live Name Check');
    await page.waitForSelector('input[placeholder*="ByteCraft"]', { timeout: 5000 });
    const teamInput = await page.$('input[placeholder*="ByteCraft"]');
    await teamInput.type('CyberTitans');
    await page.waitForFunction(() => document.body.innerText.includes('Team name is available'), { timeout: 5000 });
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'step2_team_details_1920.png') });
    saveScreenshot('step2_team_details_1920.png');

    // Click Next to Step 3
    await clickNext(page);

    // STEP 3: Team Leader (Participant 1) Details & OTP Verify
    console.log('  -> Step 3: Team Leader Details + Phone Validation + OTP Verification');
    await page.waitForSelector('input[placeholder*="Devansh Mishra"]', { timeout: 5000 });

    const p1NameInput = await page.$('input[placeholder*="Devansh Mishra"]');
    await p1NameInput.type('Devansh Mishra');

    const p1RollInput = await page.$('input[placeholder*="2024CSE310"]');
    await p1RollInput.type('2024CSE310');

    // Select Branch (CSE) and Year (3rd Year)
    await selectRadix(page, 'Select Department', 'CSE');
    await selectRadix(page, 'Select Year', '3rd Year');

    // Mobile Number
    const p1MobileInput = await page.$('input[placeholder*="9876543210"]');
    await p1MobileInput.type('9876543111');

    // Email Address
    const p1EmailInput = await page.$('input[placeholder*="student@mmmut.ac.in"]');
    await p1EmailInput.type('devansh.cse@mmmut.ac.in');
    await new Promise((r) => setTimeout(r, 300));

    // Click "Verify" to send OTP
    console.log('     Sending OTP to devansh.cse@mmmut.ac.in...');
    await page.waitForSelector('#btn-verify-p1:not([disabled])', { timeout: 5000 });
    await page.click('#btn-verify-p1');

    // Retrieve OTP from backend test endpoint
    await new Promise((r) => setTimeout(r, 1000));
    const p1Otp = await fetchOtp('devansh.cse@mmmut.ac.in');
    console.log(`     Retrieved OTP: ${p1Otp}. Submitting OTP in UI...`);

    await page.waitForSelector('input[placeholder="123456"]', { timeout: 15000 });
    const p1OtpInput = await page.$('input[placeholder="123456"]');
    await p1OtpInput.type(p1Otp);
    await new Promise((r) => setTimeout(r, 300));

    // Click "Confirm OTP"
    await page.waitForSelector('#btn-confirm-otp-p1:not([disabled])', { timeout: 5000 });
    await page.click('#btn-confirm-otp-p1');
    await page.waitForFunction(() => document.body.innerText.includes('Email verified with OTP'), { timeout: 5000 });

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'step3_leader_details_1920.png') });
    saveScreenshot('step3_leader_details_1920.png');

    // Click Next to Step 4
    await clickNext(page);

    // STEP 4: Teammate (Participant 2)
    console.log('  -> Step 4: Team Members 1/2 -> Add Teammate -> OTP Verify');
    await page.waitForSelector('#btn-add-teammate', { timeout: 5000 });
    await page.click('#btn-add-teammate');
    await new Promise((r) => setTimeout(r, 600));

    await page.waitForSelector('input[placeholder*="Sakshi Tiwari"]', { timeout: 5000 });
    const p2NameInput = await page.$('input[placeholder*="Sakshi Tiwari"]');
    await p2NameInput.type('Sakshi Tiwari');

    const p2RollInput = await page.$('input[placeholder*="2024IT320"]');
    await p2RollInput.type('2024IT320');

    // Select Branch (IT) and Year (3rd Year)
    await selectRadix(page, 'Select Department', 'IT');
    await selectRadix(page, 'Select Year', '3rd Year');

    const p2MobileInput = await page.$('input[placeholder*="9876543222"]');
    await p2MobileInput.type('9876543222');

    const p2EmailInput = await page.$('input[placeholder*="teammate@mmmut.ac.in"]');
    await p2EmailInput.type('sakshi.it@mmmut.ac.in');
    await new Promise((r) => setTimeout(r, 300));

    // Click "Verify" for Teammate
    console.log('     Sending OTP to sakshi.it@mmmut.ac.in...');
    await page.waitForSelector('#btn-verify-p2:not([disabled])', { timeout: 5000 });
    await page.click('#btn-verify-p2');

    await new Promise((r) => setTimeout(r, 1000));
    const p2Otp = await fetchOtp('sakshi.it@mmmut.ac.in');
    console.log(`     Retrieved OTP: ${p2Otp}. Submitting OTP in UI...`);

    await page.waitForSelector('input[placeholder="123456"]', { timeout: 15000 });
    const p2OtpInput = await page.$('input[placeholder="123456"]');
    await p2OtpInput.type(p2Otp);
    await new Promise((r) => setTimeout(r, 300));

    await page.waitForSelector('#btn-confirm-otp-p2:not([disabled])', { timeout: 5000 });
    await page.click('#btn-confirm-otp-p2');
    await page.waitForFunction(() => document.body.innerText.includes('Email verified with OTP'), { timeout: 5000 });

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'step4_teammate_details_1920.png') });
    saveScreenshot('step4_teammate_details_1920.png');

    // Click Next to Step 5
    await clickNext(page);

    // STEP 5: Confirmation Summary & Checkboxes
    console.log('  -> Step 5: Review & Confirmation Summary');
    await checkConfirmationBoxes(page);

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'step5_confirmation_1920.png') });
    saveScreenshot('step5_confirmation_1920.png');

    // Submit Registration
    console.log('  -> Submitting Team Registration (CyberTitans)...');
    await clickSubmit(page);

    // Wait for Confirmation Panel
    try {
      await page.waitForFunction(
        () => document.body.innerText.includes("You're in.") || document.body.innerText.includes('BBH26-'),
        { timeout: 10000 }
      );
    } catch (err) {
      const pageText = await page.evaluate(() => document.body.innerText);
      console.error('SUBMISSION WAIT FAILED. PAGE TEXT CONTENT:\n', pageText);
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'debug_submit_failure.png') });
      saveScreenshot('debug_submit_failure.png');
      throw err;
    }
    await new Promise((r) => setTimeout(r, 1000));

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'step_confirmed_success_1920.png') });
    saveScreenshot('step_confirmed_success_1920.png');
    console.log('✓ Desktop 1920px Team Flow Verified Successfully!\n');

    // ─────────────────────────────────────────────────────────────
    // TEST SUITE B: MOBILE (390px) FLOW
    // ─────────────────────────────────────────────────────────────
    console.log('[3/7] Testing Step-by-Step Flow at 390px Mobile Viewport...');
    const mobilePage = await browser.newPage();
    await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

    await mobilePage.goto('http://localhost:5173/events/bytebrawl-hacktoberfest/register', {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });
    await new Promise((r) => setTimeout(r, 1000));

    // Mobile Step 1
    await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'step1_format_390.png') });
    saveScreenshot('step1_format_390.png');

    // Mobile Step 2
    await clickNext(mobilePage);
    await mobilePage.waitForSelector('input[placeholder*="ByteCraft"]', { timeout: 5000 });
    const mTeamInput = await mobilePage.$('input[placeholder*="ByteCraft"]');
    await mTeamInput.type('QuantumHackers');
    await mobilePage.waitForFunction(() => document.body.innerText.includes('Team name is available'), { timeout: 5000 });
    await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'step2_team_details_390.png') });
    saveScreenshot('step2_team_details_390.png');

    // Mobile Step 3
    await clickNext(mobilePage);
    await mobilePage.waitForSelector('input[placeholder*="Devansh Mishra"]', { timeout: 5000 });
    const mP1Name = await mobilePage.$('input[placeholder*="Devansh Mishra"]');
    await mP1Name.type('Aman Verma');
    const mP1Roll = await mobilePage.$('input[placeholder*="2024CSE310"]');
    await mP1Roll.type('2024ECE410');
    await selectRadix(mobilePage, 'Select Department', 'ECE');
    await selectRadix(mobilePage, 'Select Year', '2nd Year');
    const mP1Mobile = await mobilePage.$('input[placeholder*="9876543210"]');
    await mP1Mobile.type('8765432111');
    const mP1Email = await mobilePage.$('input[placeholder*="student@mmmut.ac.in"]');
    await mP1Email.type('aman.ece@mmmut.ac.in');
    await new Promise((r) => setTimeout(r, 300));

    await mobilePage.waitForSelector('#btn-verify-p1:not([disabled])', { timeout: 5000 });
    await mobilePage.click('#btn-verify-p1');
    await new Promise((r) => setTimeout(r, 1000));
    const mAmanOtp = await fetchOtp('aman.ece@mmmut.ac.in');
    await mobilePage.waitForSelector('input[placeholder="123456"]', { timeout: 15000 });
    const mP1OtpInput = await mobilePage.$('input[placeholder="123456"]');
    await mP1OtpInput.type(mAmanOtp);
    await mobilePage.waitForSelector('#btn-confirm-otp-p1:not([disabled])', { timeout: 5000 });
    await mobilePage.click('#btn-confirm-otp-p1');
    await mobilePage.waitForFunction(() => document.body.innerText.includes('Email verified with OTP'), { timeout: 5000 });
    await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'step3_leader_details_390.png') });
    saveScreenshot('step3_leader_details_390.png');

    // Mobile Step 4
    await clickNext(mobilePage);
    await mobilePage.waitForSelector('#btn-add-teammate', { timeout: 5000 });
    await mobilePage.click('#btn-add-teammate');
    await new Promise((r) => setTimeout(r, 600));

    await mobilePage.waitForSelector('input[placeholder*="Sakshi Tiwari"]', { timeout: 5000 });
    const mP2Name = await mobilePage.$('input[placeholder*="Sakshi Tiwari"]');
    await mP2Name.type('Riya Sharma');
    const mP2Roll = await mobilePage.$('input[placeholder*="2024IT320"]');
    await mP2Roll.type('2024IT510');
    await selectRadix(mobilePage, 'Select Department', 'IT');
    await selectRadix(mobilePage, 'Select Year', '2nd Year');
    const mP2Mobile = await mobilePage.$('input[placeholder*="9876543222"]');
    await mP2Mobile.type('8765432222');
    const mP2Email = await mobilePage.$('input[placeholder*="teammate@mmmut.ac.in"]');
    await mP2Email.type('riya.it@mmmut.ac.in');
    await new Promise((r) => setTimeout(r, 300));

    await mobilePage.waitForSelector('#btn-verify-p2:not([disabled])', { timeout: 5000 });
    await mobilePage.click('#btn-verify-p2');
    await new Promise((r) => setTimeout(r, 1000));
    const mRiyaOtp = await fetchOtp('riya.it@mmmut.ac.in');
    await mobilePage.waitForSelector('input[placeholder="123456"]', { timeout: 15000 });
    const mP2OtpInput = await mobilePage.$('input[placeholder="123456"]');
    await mP2OtpInput.type(mRiyaOtp);
    await mobilePage.waitForSelector('#btn-confirm-otp-p2:not([disabled])', { timeout: 5000 });
    await mobilePage.click('#btn-confirm-otp-p2');
    await mobilePage.waitForFunction(() => document.body.innerText.includes('Email verified with OTP'), { timeout: 5000 });
    await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'step4_teammate_details_390.png') });
    saveScreenshot('step4_teammate_details_390.png');

    // Mobile Step 5
    await clickNext(mobilePage);
    await checkConfirmationBoxes(mobilePage);
    await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'step5_confirmation_390.png') });
    saveScreenshot('step5_confirmation_390.png');

    // Mobile Submit
    await clickSubmit(mobilePage);
    await mobilePage.waitForFunction(
      () => document.body.innerText.includes("You're in.") || document.body.innerText.includes('BBH26-'),
      { timeout: 15000 }
    );
    await new Promise((r) => setTimeout(r, 1000));
    await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'step_confirmed_success_390.png') });
    saveScreenshot('step_confirmed_success_390.png');
    console.log('✓ Mobile 390px Flow Verified Successfully!\n');

    // ─────────────────────────────────────────────────────────────
    // TEST SUITE C: INDIVIDUAL REGISTRATION FLOW
    // ─────────────────────────────────────────────────────────────
    console.log('[4/7] Testing Individual Registration Flow...');
    const soloPage = await browser.newPage();
    await soloPage.setViewport({ width: 1440, height: 900 });
    await soloPage.goto('http://localhost:5173/events/bytebrawl-hacktoberfest/register', {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });
    await new Promise((r) => setTimeout(r, 1000));

    // Select Individual card
    await soloPage.waitForSelector('#card-reg-individual', { timeout: 5000 });
    await soloPage.click('#card-reg-individual');
    await new Promise((r) => setTimeout(r, 500));

    // Click Next (Step 2: Team Details)
    await clickNext(soloPage);
    await soloPage.waitForSelector('input[placeholder*="ByteCraft"]', { timeout: 5000 });
    const soloTeamInput = await soloPage.$('input[placeholder*="ByteCraft"]');
    await soloTeamInput.type('SoloHackerPriya');
    await soloPage.waitForFunction(() => document.body.innerText.includes('Team name is available'), { timeout: 5000 });

    // Click Next (Step 3: Your Details)
    await clickNext(soloPage);

    // Fill Solo Details
    await soloPage.waitForSelector('input[placeholder*="Devansh Mishra"]', { timeout: 5000 });
    const soloName = await soloPage.$('input[placeholder*="Devansh Mishra"]');
    await soloName.type('Priya Patel');
    const soloRoll = await soloPage.$('input[placeholder*="2024CSE310"]');
    await soloRoll.type('2024ME601');
    await selectRadix(soloPage, 'Select Department', 'ME');
    await selectRadix(soloPage, 'Select Year', '1st Year');
    const soloMobile = await soloPage.$('input[placeholder*="9876543210"]');
    await soloMobile.type('7654321098');
    const soloEmail = await soloPage.$('input[placeholder*="student@mmmut.ac.in"]');
    await soloEmail.type('priya.me@mmmut.ac.in');
    await new Promise((r) => setTimeout(r, 300));

    await soloPage.waitForSelector('#btn-verify-p1:not([disabled])', { timeout: 5000 });
    await soloPage.click('#btn-verify-p1');
    await new Promise((r) => setTimeout(r, 1000));
    const priyaOtp = await fetchOtp('priya.me@mmmut.ac.in');
    await soloPage.waitForSelector('input[placeholder="123456"]', { timeout: 15000 });
    const soloOtpInput = await soloPage.$('input[placeholder="123456"]');
    await soloOtpInput.type(priyaOtp);
    await soloPage.waitForSelector('#btn-confirm-otp-p1:not([disabled])', { timeout: 5000 });
    await soloPage.click('#btn-confirm-otp-p1');
    await soloPage.waitForFunction(() => document.body.innerText.includes('Email verified with OTP'), { timeout: 5000 });

    // Next to confirmation (Step 4)
    await clickNext(soloPage);
    await checkConfirmationBoxes(soloPage);

    await clickSubmit(soloPage);
    await soloPage.waitForFunction(
      () => document.body.innerText.includes("You're in.") || document.body.innerText.includes('BBH26-'),
      { timeout: 15000 }
    );
    console.log('✓ Individual Registration Verified Successfully!\n');

    // ─────────────────────────────────────────────────────────────
    // TEST SUITE D: STRICT SECURITY & VALIDATION TESTING
    // ─────────────────────────────────────────────────────────────
    console.log('[5/7] Testing Security & Strict Validation Rules...');

    // 1. Disposable Email Rejection
    const dispRes = await fetch('http://localhost:4000/api/events/bytebrawl-hacktoberfest/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'hacker@mailinator.com' }),
    });
    const dispData = await dispRes.json();
    console.log(`  -> Disposable email check (mailinator.com): Status ${dispRes.status}, Error: "${dispData.error}"`);
    if (dispRes.status === 422 && dispData.error.toLowerCase().includes('disposable')) {
      console.log('     ✓ Disposable emails correctly blocked!');
    } else {
      throw new Error(`Disposable check failed: ${JSON.stringify(dispData)}`);
    }

    // 2. Email Typo Hint Test
    const typoRes = await fetch('http://localhost:4000/api/events/bytebrawl-hacktoberfest/check-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'student@gmial.com' }),
    });
    const typoData = await typoRes.json();
    console.log(`  -> Typo check (gmial.com): Typo hint returned: "${typoData.typoHint}"`);
    if (typoData.typoHint && typoData.typoHint.includes('gmail.com')) {
      console.log('     ✓ Email typo hint correctly detected!');
    } else {
      throw new Error(`Typo check failed: ${JSON.stringify(typoData)}`);
    }

    // 3. Fake Phone Patterns (identical digits, sequential)
    const { validateIndianPhone } = await import('../backend/utils/phoneValidator.js');
    const fake1 = validateIndianPhone('9999999999');
    const fake2 = validateIndianPhone('9876543210');
    console.log(`  -> Fake phone check (9999999999): valid=${fake1.valid}, error="${fake1.error}"`);
    console.log(`  -> Fake phone check (9876543210): valid=${fake2.valid}, error="${fake2.error}"`);
    if (!fake1.valid && !fake2.valid) {
      console.log('     ✓ Fake phone numbers correctly rejected!');
    } else {
      throw new Error('Fake phone validation check failed');
    }

    // 4. Duplicate Registration Rejection (Privacy Preserving)
    const { createVerificationToken } = await import('../backend/utils/otpService.js');
    const validDupToken = createVerificationToken('devansh.cse@mmmut.ac.in');

    const dupRes = await fetch('http://localhost:4000/api/events/bytebrawl-hacktoberfest/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'INDIVIDUAL',
        teamName: 'DuplicateSquad',
        participant1: {
          fullName: 'Duplicate Tester',
          rollNumber: '2024CSE310', // already registered in CyberTitans
          branch: 'CSE',
          year: '3rd Year',
          mobile: '9876543111',
          email: 'devansh.cse@mmmut.ac.in',
          verificationToken: validDupToken,
        },
        agreedRules: true,
        confirmedDetails: true,
      }),
    });
    const dupData = await dupRes.json();
    console.log(`  -> Duplicate registration attempt: Status ${dupRes.status}, Message: "${dupData.error}"`);
    const isDup = dupRes.status === 409 && (
      (dupData.error && dupData.error.toLowerCase().includes('already registered')) ||
      (dupData.error && dupData.error.toLowerCase().includes('duplicate registration'))
    );
    if (isDup) {
      console.log('     ✓ Duplicate registration safely rejected without leaking personal data!');
    } else {
      throw new Error(`Duplicate check failed: ${JSON.stringify(dupData)}`);
    }

    // ─────────────────────────────────────────────────────────────
    // TEST SUITE E: DISPLAY SAVED DB RECORDS
    // ─────────────────────────────────────────────────────────────
    console.log('\n[6/7] Querying Database for Saved Registrations:');
    const savedRegistrations = await prisma.registration.findMany({
      where: { eventSlug: 'bytebrawl-hacktoberfest' },
      include: { participants: true },
      orderBy: { createdAt: 'desc' },
    });
    console.log(JSON.stringify(savedRegistrations, null, 2));

    // ─────────────────────────────────────────────────────────────
    // TEST SUITE F: DISPLAY SENT PERSONALIZED EMAILS
    // ─────────────────────────────────────────────────────────────
    console.log('\n[7/7] Inspecting Sent Confirmation Emails:');
    const emailRes = await fetch('http://localhost:4000/api/events/bytebrawl-hacktoberfest/dev-emails');
    const emailData = await emailRes.json();
    console.log(`Total emails dispatched: ${emailData.emails.length}`);
    emailData.emails.forEach((m, idx) => {
      console.log(`\n--- Email #${idx + 1} to: ${m.to} ---`);
      console.log(`Subject: ${m.subject}`);
      console.log(`Body (Plain Text):\n${m.text}`);
    });

    console.log('\n========================================================');
    console.log('ALL TESTS COMPLETED SUCCESSFULLY!');
    console.log('========================================================');
  } finally {
    await browser.close();
  }
}

runVerification().catch((err) => {
  console.error('\n❌ VERIFICATION RUN FAILED:', err);
  process.exit(1);
});
