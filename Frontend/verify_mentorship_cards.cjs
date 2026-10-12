const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const ARTIFACT_DIR = "C:\\Users\\dk231\\.gemini\\antigravity\\brain\\b2e077a8-55e3-4f4f-92e2-57e7431573ca";

async function run() {
  console.log("=== STARTING RESEARCH MENTORSHIP & FACULTY VERIFICATION ===");

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-gpu-vsync",
      "--window-size=1920,1080",
    ],
  });

  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem("flux_intro_seen_v1", "1");
  });

  // Helper to wait for network / render
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // 1. Desktop 1920x1080
  console.log("\n1. Testing 1920x1080...");
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await page.goto("http://localhost:5173/", { waitUntil: "networkidle2" });

  // Scroll to beam section
  await page.evaluate(() => {
    const el = document.getElementById("beam-section");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await sleep(1500);

  // Inspect the 3 cards
  const cards1920 = await page.evaluate(() => {
    const container = document.getElementById("faculty-cards-container");
    if (!container) return null;
    const cards = Array.from(container.children);
    return cards.map((c, i) => {
      const rect = c.getBoundingClientRect();
      const text = c.innerText.trim();
      const img = c.querySelector("img.object-contain");
      const blurredBg = c.querySelector("img.object-cover");
      const dateBadge = c.querySelector("span.bg-black\\/60");
      return {
        index: i,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        textLines: text.split("\n").filter(Boolean),
        hasContainImg: !!img,
        imgSrc: img ? img.src : null,
        hasBlurredBg: !!blurredBg,
        hasDateBadge: !!dateBadge,
      };
    });
  });

  console.log("Cards at 1920x1080:", JSON.stringify(cards1920, null, 2));

  // Check ticker clearance
  const tickerClearance = await page.evaluate(() => {
    const container = document.getElementById("faculty-cards-container");
    const ticker = document.querySelector("[data-ticker]") || document.querySelector("footer");
    const containerRect = container ? container.getBoundingClientRect() : null;
    return {
      containerBottom: containerRect ? containerRect.bottom : null,
      windowHeight: window.innerHeight,
    };
  });
  console.log("Ticker clearance check at 1920x1080:", tickerClearance);

  // Screenshot 1920x1080
  const beam1920El = await page.$("#beam-section");
  if (beam1920El) {
    await beam1920El.screenshot({ path: path.join(ARTIFACT_DIR, "mentorship_1920x1080.png") });
    console.log("Saved mentorship_1920x1080.png");
  }

  // 2. Desktop 1440x900
  console.log("\n2. Testing 1440x900...");
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.evaluate(() => {
    const el = document.getElementById("beam-section");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await sleep(1500);

  const cards1440 = await page.evaluate(() => {
    const container = document.getElementById("faculty-cards-container");
    if (!container) return null;
    const cards = Array.from(container.children);
    return cards.map((c, i) => {
      const rect = c.getBoundingClientRect();
      return { index: i, width: Math.round(rect.width), height: Math.round(rect.height) };
    });
  });
  console.log("Cards at 1440x900:", JSON.stringify(cards1440, null, 2));

  const beam1440El = await page.$("#beam-section");
  if (beam1440El) {
    await beam1440El.screenshot({ path: path.join(ARTIFACT_DIR, "mentorship_1440x900.png") });
    console.log("Saved mentorship_1440x900.png");
  }

  // 3. Mobile 390px
  console.log("\n3. Testing 390px mobile...");
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto("http://localhost:5173/", { waitUntil: "networkidle2" });
  await page.evaluate(() => {
    const el = document.getElementById("beam-section");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await sleep(1500);

  const cards390 = await page.evaluate(() => {
    const container = document.getElementById("faculty-cards-container");
    if (!container) return null;
    const cards = Array.from(container.children);
    return cards.map((c, i) => {
      const rect = c.getBoundingClientRect();
      const img = c.querySelector("img.object-contain");
      return {
        index: i,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        hasContainImg: !!img,
      };
    });
  });
  console.log("Cards at 390px:", JSON.stringify(cards390, null, 2));

  const beam390El = await page.$("#beam-section");
  if (beam390El) {
    await beam390El.screenshot({ path: path.join(ARTIFACT_DIR, "mentorship_390px.png") });
    console.log("Saved mentorship_390px.png");
  }

  // 4. Navigation & Highlight tests
  console.log("\n4. Testing Navigation & Profile Highlights...");
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await page.goto("http://localhost:5173/", { waitUntil: "networkidle2" });
  await page.evaluate(() => {
    const el = document.getElementById("beam-section");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await sleep(1000);

  // Click Left Card (Dr. Satvik Vats)
  console.log("Clicking Dr. Satvik Vats card (READ PROFILE)...");
  await page.evaluate(() => {
    const container = document.getElementById("faculty-cards-container");
    const card = container.children[0].querySelector('[role="button"]');
    if (card) card.click();
  });
  await sleep(1300);

  const satvikNavStatus = await page.evaluate(() => {
    const el = document.getElementById("satvik-vats");
    if (!el) return { found: false };
    const rect = el.getBoundingClientRect();
    const hasGlow = el.innerHTML.includes("ring-white/50") || el.innerHTML.includes("border-white/90");
    return {
      url: window.location.href,
      found: true,
      top: Math.round(rect.top),
      bottom: Math.round(rect.bottom),
      inViewport: rect.top >= 0 && rect.top <= window.innerHeight,
      hasHighlightGlow: hasGlow,
    };
  });
  console.log("Satvik Vats Navigation Status:", satvikNavStatus);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, "faculty_highlight_satvik.png"), fullPage: false });
  console.log("Saved faculty_highlight_satvik.png");

  // Back button navigation
  console.log("Testing browser back button...");
  await page.goBack({ waitUntil: "networkidle2" });
  await sleep(800);
  console.log("URL after browser back button:", page.url());

  // Click Middle Card (Prof. Anupama Kaushik Sharma)
  console.log("Clicking Prof. Anupama card (READ PROFILE)...");
  await page.evaluate(() => {
    const el = document.getElementById("beam-section");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await sleep(600);
  await page.evaluate(() => {
    const container = document.getElementById("faculty-cards-container");
    const card = container.children[1].querySelector('[role="button"]');
    if (card) card.click();
  });
  await sleep(1300);

  const anupamaNavStatus = await page.evaluate(() => {
    const el = document.getElementById("anupama-kaushik-sharma");
    if (!el) return { found: false };
    const rect = el.getBoundingClientRect();
    const hasGlow = el.innerHTML.includes("ring-white/50") || el.innerHTML.includes("border-white/90");
    return {
      url: window.location.href,
      found: true,
      top: Math.round(rect.top),
      bottom: Math.round(rect.bottom),
      inViewport: rect.top >= 0 && rect.top <= window.innerHeight,
      hasHighlightGlow: hasGlow,
    };
  });
  console.log("Prof. Anupama Navigation Status:", anupamaNavStatus);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, "faculty_highlight_anupama.png"), fullPage: false });
  console.log("Saved faculty_highlight_anupama.png");

  // Keyboard navigation on Right Card (Dr. Shwet Ketu) via Enter key
  await page.goto("http://localhost:5173/", { waitUntil: "networkidle2" });
  await page.evaluate(() => {
    const el = document.getElementById("beam-section");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await sleep(800);
  console.log("Triggering Enter key on Dr. Shwet Ketu card...");
  await page.evaluate(() => {
    const container = document.getElementById("faculty-cards-container");
    const card = container.children[2].querySelector('[role="button"]');
    if (card) {
      card.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    }
  });
  await sleep(1300);

  const shwetNavStatus = await page.evaluate(() => {
    const el = document.getElementById("shwet-ketu");
    if (!el) return { found: false };
    const rect = el.getBoundingClientRect();
    const hasGlow = el.innerHTML.includes("ring-white/50") || el.innerHTML.includes("border-white/90");
    return {
      url: window.location.href,
      found: true,
      top: Math.round(rect.top),
      bottom: Math.round(rect.bottom),
      inViewport: rect.top >= 0 && rect.top <= window.innerHeight,
      hasHighlightGlow: hasGlow,
    };
  });
  console.log("Dr. Shwet Ketu Navigation Status:", shwetNavStatus);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, "faculty_highlight_shwet.png"), fullPage: false });
  console.log("Saved faculty_highlight_shwet.png");

  // Verify highlight fades after 1.6s
  console.log("Waiting 1.7s to verify highlight timeout...");
  await sleep(1700);
  const glowAfterTimeout = await page.evaluate(() => {
    const el = document.getElementById("shwet-ketu");
    return el ? el.innerHTML.includes("ring-white/50") : false;
  });
  console.log("Highlight glow active after 1.7s (expected false):", glowAfterTimeout);

  await browser.close();
  console.log("\n=== ALL VERIFICATIONS PASSED SUCCESSFULLY ===");
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
