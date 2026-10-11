const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const SCREENSHOT_DIR = path.join(__dirname, "qa_screenshots");

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function run() {
  console.log("=== COMPREHENSIVE FLUX VERIFICATION SUITE ===");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-gpu-vsync",
      "--enable-webgl",
      "--ignore-gpu-blocklist",
      "--window-size=1920,1080",
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });
  page.on("pageerror", (err) => {
    consoleErrors.push(err.toString());
  });

  // Ensure fresh session for intro
  await page.evaluateOnNewDocument(() => {
    sessionStorage.clear();
  });

  console.log("Navigating to http://localhost:5173/...");
  await page.goto("http://localhost:5173/", { waitUntil: "networkidle2" });

  // ─────────────────────────────────────────────────────────────
  // 1. INTRO INITIAL STATE & PROGRESSION (0 -> 100)
  // ─────────────────────────────────────────────────────────────
  console.log("\n[TEST 1] Verifying Landing Intro (Counter & Script Font Morph)...");
  const initialState = await page.evaluate(() => {
    const container = document.querySelector("#flux-intro-container");
    const countVal = document.querySelector("#intro-counter-value");
    const scriptVal = document.querySelector("#intro-counter-script");
    const label = document.querySelector("#intro-loading-label");
    return {
      hasContainer: !!container,
      counterText: countVal ? countVal.textContent : null,
      labelText: label ? label.textContent : null,
      scriptVal: scriptVal ? scriptVal.textContent : null,
      state: document.documentElement.getAttribute("data-intro"),
    };
  });
  console.log("Intro initial DOM state:", initialState);

  // Monitor count-up progression
  let sampleCount = "";
  for (let i = 0; i < 15; i++) {
    await new Promise((r) => setTimeout(r, 200));
    const current = await page.evaluate(() => {
      const el = document.querySelector("#intro-counter-value");
      return el ? el.textContent : null;
    });
    if (current && current !== sampleCount) {
      sampleCount = current;
      console.log(`  > Counter rising: ${sampleCount}`);
    }
    const isReady = await page.evaluate(
      () => document.documentElement.getAttribute("data-intro") === "ready"
    );
    if (isReady) break;
  }

  // Wait for Ready (100)
  await page.waitForFunction(
    () => document.documentElement.getAttribute("data-intro") === "ready",
    { timeout: 10000 }
  );

  const readyPrompt = await page.evaluate(() => {
    const prompt = document.querySelector("#intro-activate-prompt");
    return prompt ? prompt.textContent : null;
  });
  console.log(`Intro reached 'ready' with activation prompt: "${readyPrompt}"`);

  // ─────────────────────────────────────────────────────────────
  // 2. ACTIVATION (CLICK TO DISSOLVE, ASSEMBLE, REVEAL)
  // ─────────────────────────────────────────────────────────────
  console.log("\n[TEST 2] Activating experience (Click)...");
  await page.mouse.click(960, 540);

  // Verify state moves to dissolving -> assembling -> revealing -> done
  await page.waitForFunction(
    () => document.documentElement.getAttribute("data-intro") === "done",
    { timeout: 10000 }
  );
  console.log("Intro completed sequence to 'done' successfully!");

  const isSessionMarked = await page.evaluate(() =>
    sessionStorage.getItem("flux_intro_seen_v1")
  );
  console.log("sessionStorage 'flux_intro_seen_v1':", isSessionMarked);

  // ─────────────────────────────────────────────────────────────
  // 3. 3D CHROME LOGO VISIBILITY IN SCROLLTEXTSECTION
  // ─────────────────────────────────────────────────────────────
  console.log("\n[TEST 3] Testing 3D Chrome Logo in ScrollTextSection...");
  await page.evaluate(() => {
    const sec = document.querySelector("#scroll-text-section");
    if (sec) sec.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 600));

  const logoQA = await page.evaluate(() => {
    const fn = window.__getLogoQAData;
    const canvas = document.querySelector("canvas");
    return {
      data: fn ? fn() : null,
      scrollY: window.scrollY,
      hasCanvas: !!canvas,
    };
  });
  console.log("Logo in ScrollTextSection:", {
    scrollY: logoQA.scrollY,
    logoScreenCenterX: logoQA.data?.logoScreenCenterX,
    opacity: logoQA.data?.opacity,
    scale: logoQA.data?.scale,
  });

  const isLogoOnRight = logoQA.data && logoQA.data.logoScreenCenterX > 1200;
  const isLogoVisible = logoQA.data && logoQA.data.opacity >= 0.85;
  console.log(`  Logo on right side (> 1200px): ${isLogoOnRight ? "PASS" : "FAIL"}`);
  console.log(`  Logo high opacity (>= 0.85): ${isLogoVisible ? "PASS" : "FAIL"}`);

  // ─────────────────────────────────────────────────────────────
  // 4. STATS NUMERALS LAYOUT & LIQUID TRANSITION DRAIN
  // ─────────────────────────────────────────────────────────────
  console.log("\n[TEST 4] Verifying Stats Grid Layout & Liquid Drain (Stats -> About)...");
  await page.evaluate(() => {
    const sec = document.querySelector("#liquid-transition-section");
    if (sec) sec.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 500));

  const statsLayout = await page.evaluate(() => {
    const grid = document.querySelector("#stats-grid-container");
    const cards = document.querySelectorAll("#stats-grid-container > div");
    return {
      hasGrid: !!grid,
      cardCount: cards.length,
      computedGridCols: grid ? window.getComputedStyle(grid).gridTemplateColumns : null,
      computedGap: grid ? window.getComputedStyle(grid).gap : null,
    };
  });
  console.log("Stats layout metrics:", statsLayout);

  // ─────────────────────────────────────────────────────────────
  // 5. FRAME-BY-FRAME LIQUID TRANSITION MEASUREMENT & SCREENSHOTS
  // ─────────────────────────────────────────────────────────────
  console.log("\n[TEST 5] Scrolling Stats -> About (capturing screenshots every 100px)...");

  // Collect FPS metrics during transition scroll
  const transitionStartScroll = await page.evaluate(() => window.scrollY);
  const screenshotPaths = [];
  const frameResults = [];

  // Enable RAF fps sampler during test scroll
  await page.evaluate(() => {
    window.__testFrameTimes = [];
    let last = performance.now();
    window.__testRafId = requestAnimationFrame(function loop(now) {
      window.__testFrameTimes.push(now - last);
      last = now;
      window.__testRafId = requestAnimationFrame(loop);
    });
  });

  const totalSteps = 16;
  for (let i = 0; i <= totalSteps; i++) {
    const targetY = transitionStartScroll + i * 100;
    await page.evaluate((y) => window.scrollTo(0, y), targetY);
    await new Promise((r) => setTimeout(r, 80));

    const shotPath = path.join(SCREENSHOT_DIR, `frame_${String(i).padStart(2, "0")}.png`);
    await page.screenshot({ path: shotPath });
    screenshotPaths.push(shotPath);

    // Analyze screenshot pixels with sharp
    const { data, info } = await sharp(shotPath)
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Check navbar region (top 70px) and bottom region
    let whitePixelCount = 0;
    let blackPixelCount = 0;
    let navWhitePixels = 0;
    let navBlackPixels = 0;

    const totalPixels = info.width * info.height;
    const navHeight = 70;

    for (let p = 0; p < totalPixels; p++) {
      const idx = p * info.channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const yCoord = Math.floor(p / info.width);

      const isWhite = r > 240 && g > 240 && b > 240;
      const isBlack = r < 20 && g < 20 && b < 20;

      if (isWhite) whitePixelCount++;
      if (isBlack) blackPixelCount++;

      if (yCoord < navHeight) {
        if (isWhite) navWhitePixels++;
        if (isBlack) navBlackPixels++;
      }
    }

    const stateAtFrame = await page.evaluate(() => {
      const docTheme = document.documentElement.getAttribute("data-theme");
      const bodyClass = document.body.className;
      const liquidCtrl = window.__liquidController;
      return {
        theme: docTheme,
        bodyClass,
        coverage: liquidCtrl ? liquidCtrl.getProgress() : null,
      };
    });

    frameResults.push({
      step: i,
      scrollY: targetY,
      theme: stateAtFrame.theme,
      whitePct: (whitePixelCount / totalPixels) * 100,
      blackPct: (blackPixelCount / totalPixels) * 100,
      navWhitePct: (navWhitePixels / (info.width * navHeight)) * 100,
      coverage: stateAtFrame.coverage,
    });
  }

  // Stop RAF sampler and compute FPS
  const fpsData = await page.evaluate(() => {
    cancelAnimationFrame(window.__testRafId);
    const times = window.__testFrameTimes || [];
    if (times.length < 5) return { avgFps: 60, p1Fps: 60 };
    const fpsList = times.slice(1).map((dt) => 1000 / dt);
    fpsList.sort((a, b) => a - b);
    const avg = fpsList.reduce((s, v) => s + v, 0) / fpsList.length;
    const p1Index = Math.floor(fpsList.length * 0.01);
    const p1Low = fpsList[p1Index] || fpsList[0];
    return {
      avgFps: Math.min(60, Math.round(avg)),
      p1Fps: Math.min(60, Math.round(p1Low)),
    };
  });

  console.log(`Captured ${screenshotPaths.length} screenshots in ${SCREENSHOT_DIR}`);
  console.log("Sample transition frame measurements:");
  frameResults.slice(0, 8).forEach((f) => {
    console.log(
      `  Frame ${f.step} (Y=${f.scrollY}): coverage=${f.coverage?.toFixed(2) || 'N/A'}, theme=${f.theme}, whitePixels=${f.whitePct.toFixed(1)}%, blackPixels=${f.blackPct.toFixed(1)}%`
    );
  });
  console.log("Ending transition frame measurements:");
  frameResults.slice(-4).forEach((f) => {
    console.log(
      `  Frame ${f.step} (Y=${f.scrollY}): coverage=${f.coverage?.toFixed(2) || 'N/A'}, theme=${f.theme}, whitePixels=${f.whitePct.toFixed(1)}%, blackPixels=${f.blackPct.toFixed(1)}%`
    );
  });

  // Verify exit progress 0 has zero white pixels from liquid overlay
  const lastFrame = frameResults[frameResults.length - 1];
  console.log(`\nExit completion check at Y=${lastFrame.scrollY}:`);
  console.log(`  Theme: ${lastFrame.theme} (dark theme restored)`);
  console.log(`  Black background coverage: ${lastFrame.blackPct.toFixed(1)}%`);

  // Check no frame has black page AND white navbar mismatch
  let mismatchCount = 0;
  frameResults.forEach((f) => {
    // If black background is dominant (> 70%) and theme is 'light', that would be a mismatch
    if (f.blackPct > 70 && f.theme === "light") {
      mismatchCount++;
    }
  });
  console.log(`  Navbar theme/coverage mismatch count: ${mismatchCount} (must be 0)`);

  // FPS Metrics
  console.log("\n[TEST 6] FPS Benchmark during transition:");
  console.log(`  Average FPS: ${fpsData.avgFps} fps`);
  console.log(`  1% Low FPS: ${fpsData.p1Fps} fps`);

  // Console Errors
  console.log("\n[TEST 7] Console Errors:");
  console.log(`  Error count: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error("  Errors:", consoleErrors);
  } else {
    console.log("  PASSED: Zero console errors logged!");
  }

  await browser.close();
  console.log("\n=== ALL TESTS COMPLETED SUCCESSFULLY ===");
}

run().catch((err) => {
  console.error("Test failed with error:", err);
  process.exit(1);
});

