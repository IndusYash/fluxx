const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const SCREENSHOT_DIR = path.join(__dirname, "qa_screenshots");
const ARTIFACT_DIR = "C:\\Users\\dk231\\.gemini\\antigravity\\brain\\b2e077a8-55e3-4f4f-92e2-57e7431573ca";

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function sampleAtTimes(page, timePoints) {
  // Wait for React to mount PersistentChromeLogo and register __getLogoQAData
  await page.waitForFunction(() => typeof window.__getLogoQAData === "function", { timeout: 15000 });
  const start = Date.now();
  const samples = [];
  for (const t of timePoints) {
    const elapsed = Date.now() - start;
    const wait = Math.max(0, t - elapsed);
    if (wait > 0) {
      await new Promise((r) => setTimeout(r, wait));
    }
    const data = await page.evaluate(() => {
      const qa = window.__getLogoQAData ? window.__getLogoQAData() : null;
      const anchor = document.querySelector('[data-logo-anchor="hero"]');
      const rect = anchor ? anchor.getBoundingClientRect() : null;
      return {
        logoScreenCenterX: qa ? qa.logoScreenCenterX : null,
        logoScreenCenterY: qa ? qa.logoScreenCenterY : null,
        anchorCenterX: rect ? rect.left + rect.width / 2 : (qa ? qa.anchorCenterX : null),
        anchorCenterY: rect ? rect.top + rect.height / 2 : (qa ? qa.anchorCenterY : null),
        opacity: qa ? qa.opacity : null,
        scrollY: window.scrollY,
      };
    });
    const diffX = data.logoScreenCenterX !== null && data.anchorCenterX !== null
      ? Math.abs(data.logoScreenCenterX - data.anchorCenterX)
      : null;
    const diffY = data.logoScreenCenterY !== null && data.anchorCenterY !== null
      ? Math.abs(data.logoScreenCenterY - data.anchorCenterY)
      : null;
    samples.push({
      time: t,
      logoX: data.logoScreenCenterX !== null ? Number(data.logoScreenCenterX.toFixed(2)) : null,
      logoY: data.logoScreenCenterY !== null ? Number(data.logoScreenCenterY.toFixed(2)) : null,
      anchorX: data.anchorCenterX !== null ? Number(data.anchorCenterX.toFixed(2)) : null,
      anchorY: data.anchorCenterY !== null ? Number(data.anchorCenterY.toFixed(2)) : null,
      diffX: diffX !== null ? Number(diffX.toFixed(2)) : null,
      diffY: diffY !== null ? Number(diffY.toFixed(2)) : null,
      opacity: data.opacity !== null ? Number(data.opacity.toFixed(2)) : null,
      scrollY: data.scrollY,
    });
  }
  return samples;
}

async function runVerification() {
  console.log("=================================================");
  console.log("STARTING FLUX LOGO RELOAD FIX VERIFICATION");
  console.log("=================================================");

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--enable-webgl",
      "--ignore-gpu-blocklist",
      "--window-size=1920,1080",
    ],
  });

  const allResults = {
    runs1080p: [],
    runs900p: [],
    scrolledReload: null,
  };

  // ─────────────────────────────────────────────────────────────
  // TEST 1: 5 RELOADS AT 1920x1080 (INTRO SKIPPED)
  // ─────────────────────────────────────────────────────────────
  console.log("\n[TEST 1] 5 RELOADS AT 1920x1080 (Screen Center: 960x540)");
  const page1080 = await browser.newPage();
  await page1080.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  // Mark intro seen in session
  await page1080.evaluateOnNewDocument(() => {
    sessionStorage.setItem("flux_intro_seen_v1", "1");
  });

  for (let i = 1; i <= 5; i++) {
    const isHard = i % 2 === 0;
    console.log(`\n  Run ${i}/5 (${isHard ? "Hard Reload" : "Normal Reload"} at 1920x1080):`);
    
    if (isHard) {
      const client = await page1080.target().createCDPSession();
      await client.send("Network.clearBrowserCache");
    }

    await page1080.goto("http://localhost:5173/", { waitUntil: "domcontentloaded" });

    // Sample at 0ms, 100ms, 500ms, 2000ms
    const samples = await sampleAtTimes(page1080, [0, 100, 500, 2000]);
    allResults.runs1080p.push({ run: i, type: isHard ? "hard" : "normal", samples });

    console.table(samples);

    // Save screenshot right after reload on Run 1
    if (i === 1) {
      const shotPath = path.join(SCREENSHOT_DIR, "reload_1920x1080_right_after_reload.png");
      await page1080.screenshot({ path: shotPath });
      fs.copyFileSync(shotPath, path.join(ARTIFACT_DIR, "reload_1920x1080_right_after_reload.png"));
      console.log(`  Saved screenshot: reload_1920x1080_right_after_reload.png`);
    }

    // Assertions for each sample
    for (const s of samples) {
      if (s.diffX > 2.0 || s.diffY > 2.0) {
        throw new Error(`FAIL: Sample at ${s.time}ms exceeded 2px diff! diffX=${s.diffX}, diffY=${s.diffY}`);
      }
      if (Math.abs(s.logoX - 960) < 50) {
        throw new Error(`FAIL: Logo was placed at or near screen center 960! logoX=${s.logoX}`);
      }
    }
    console.log(`  PASS: Run ${i} matched anchor within 2px at all samples and never at screen center!`);
  }
  await page1080.close();

  // ─────────────────────────────────────────────────────────────
  // TEST 2: 5 RELOADS AT 1440x900 (INTRO SKIPPED)
  // ─────────────────────────────────────────────────────────────
  console.log("\n[TEST 2] 5 RELOADS AT 1440x900 (Screen Center: 720x450)");
  const page900 = await browser.newPage();
  await page900.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  await page900.evaluateOnNewDocument(() => {
    sessionStorage.setItem("flux_intro_seen_v1", "1");
  });

  for (let i = 1; i <= 5; i++) {
    const isHard = i % 2 === 0;
    console.log(`\n  Run ${i}/5 (${isHard ? "Hard Reload" : "Normal Reload"} at 1440x900):`);
    
    if (isHard) {
      const client = await page900.target().createCDPSession();
      await client.send("Network.clearBrowserCache");
    }

    await page900.goto("http://localhost:5173/", { waitUntil: "domcontentloaded" });

    const samples = await sampleAtTimes(page900, [0, 100, 500, 2000]);
    allResults.runs900p.push({ run: i, type: isHard ? "hard" : "normal", samples });

    console.table(samples);

    if (i === 1) {
      const shotPath = path.join(SCREENSHOT_DIR, "reload_1440x900_right_after_reload.png");
      await page900.screenshot({ path: shotPath });
      fs.copyFileSync(shotPath, path.join(ARTIFACT_DIR, "reload_1440x900_right_after_reload.png"));
      console.log(`  Saved screenshot: reload_1440x900_right_after_reload.png`);
    }

    for (const s of samples) {
      if (s.diffX > 2.0 || s.diffY > 2.0) {
        throw new Error(`FAIL: Sample at ${s.time}ms exceeded 2px diff! diffX=${s.diffX}, diffY=${s.diffY}`);
      }
      if (Math.abs(s.logoX - 720) < 50) {
        throw new Error(`FAIL: Logo was placed at or near screen center 720! logoX=${s.logoX}`);
      }
    }
    console.log(`  PASS: Run ${i} matched anchor within 2px at all samples and never at screen center!`);
  }
  await page900.close();

  // ─────────────────────────────────────────────────────────────
  // TEST 3: RELOAD WHILE SCROLLED TO MIDDLE OF PAGE (FACULTY/BEAM)
  // ─────────────────────────────────────────────────────────────
  console.log("\n[TEST 3] RELOAD WHILE SCROLLED TO MIDDLE OF PAGE");
  const pageScroll = await browser.newPage();
  await pageScroll.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  await pageScroll.evaluateOnNewDocument(() => {
    sessionStorage.setItem("flux_intro_seen_v1", "1");
  });

  // Navigate, scroll to beam-section (faculty)
  await pageScroll.goto("http://localhost:5173/", { waitUntil: "networkidle2" });
  await pageScroll.waitForFunction(() => typeof window.__getLogoQAData === "function");
  await pageScroll.evaluate(() => {
    const beam = document.querySelector("#beam-section");
    if (window.__lenis && beam) {
      window.__lenis.scrollTo(beam, { immediate: true });
    }
  });
  await new Promise((r) => setTimeout(r, 600));

  const scrolledYBeforeReload = await pageScroll.evaluate(() => window.scrollY);
  console.log(`  Scrolled to section at scrollY = ${scrolledYBeforeReload}`);

  // Save scroll position into sessionStorage to simulate browser scroll restoration on reload
  await pageScroll.evaluate((y) => {
    sessionStorage.setItem("saved_scroll_restore", String(y));
  }, scrolledYBeforeReload);

  await pageScroll.evaluateOnNewDocument(() => {
    const saved = sessionStorage.getItem("saved_scroll_restore");
    if (saved) {
      const y = Number(saved);
      const interval = setInterval(() => {
        if (document.documentElement.scrollHeight > y) {
          window.scrollTo(0, y);
          if (window.__lenis) {
            window.__lenis.scrollTo(y, { immediate: true });
            clearInterval(interval);
          }
        }
      }, 10);
    }
  });

  // Now reload page with scroll preserved
  console.log("  Reloading page while scrolled...");
  await pageScroll.reload({ waitUntil: "domcontentloaded" });
  await pageScroll.waitForFunction(
    () => typeof window.__getLogoQAData === "function" && window.scrollY > 1000,
    { timeout: 15000 }
  );
  await new Promise((r) => setTimeout(r, 400));

  const dataScrolled = await pageScroll.evaluate(() => {
    const qa = window.__getLogoQAData ? window.__getLogoQAData() : null;
    return {
      scrollY: window.scrollY,
      qa,
    };
  });

  allResults.scrolledReload = dataScrolled;

  console.log("  Scrolled reload data:", JSON.stringify({
    scrollY: dataScrolled.scrollY,
    isFacultyActive: dataScrolled.qa ? dataScrolled.qa.isFacultyActive : null,
    logoScreenCenterX: dataScrolled.qa ? Number(dataScrolled.qa.logoScreenCenterX.toFixed(2)) : null,
    beamCenterX: dataScrolled.qa ? Number(dataScrolled.qa.beamCenterX.toFixed(2)) : null,
    diffX: dataScrolled.qa ? Number(dataScrolled.qa.diffX.toFixed(2)) : null,
    opacity: dataScrolled.qa ? Number(dataScrolled.qa.opacity.toFixed(2)) : null,
  }, null, 2));

  if (!dataScrolled.qa || dataScrolled.qa.diffX === null || dataScrolled.qa.diffX > 2.0) {
    throw new Error(`FAIL: Scrolled reload did not align with Faculty beam anchor within 2px! diffX=${dataScrolled.qa?.diffX}`);
  }
  console.log(`  PASS: Logo centered on Faculty beam anchor within 2px on scrolled reload! (diffX = ${dataScrolled.qa.diffX.toFixed(2)}px)`);

  const shotScrolled = path.join(SCREENSHOT_DIR, "reload_while_scrolled_middle.png");
  await pageScroll.screenshot({ path: shotScrolled });
  fs.copyFileSync(shotScrolled, path.join(ARTIFACT_DIR, "reload_while_scrolled_middle.png"));
  console.log(`  Saved screenshot: reload_while_scrolled_middle.png`);

  await pageScroll.close();
  await browser.close();

  // Save report JSON
  fs.writeFileSync(
    path.join(SCREENSHOT_DIR, "reload_verification_report.json"),
    JSON.stringify(allResults, null, 2)
  );

  console.log("\n=================================================");
  console.log("ALL VERIFICATIONS COMPLETED SUCCESSFULLY!");
  console.log("=================================================");
}

runVerification().catch((err) => {
  console.error("VERIFICATION FAILED:", err);
  process.exit(1);
});
