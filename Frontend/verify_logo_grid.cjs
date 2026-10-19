const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const SCREENSHOT_DIR = path.join(__dirname, "qa_screenshots");
const ARTIFACT_DIR = "C:\\Users\\dk231\\.gemini\\antigravity\\brain\\b2e077a8-55e3-4f4f-92e2-57e7431573ca";

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}
if (!fs.existsSync(ARTIFACT_DIR)) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

// Expected 5x5 occupancy grid:
// col:  0  1  2  3  4
// r0:   A  .  B  B  B
// r1:   .  C  .  .  .
// r2:   D  .  .  E  E
// r3:   .  .  F  .  .
// r4:   G  G  .  .  .
const EXPECTED_GRID = [
  [1, 0, 1, 1, 1], // r0: A . B B B
  [0, 1, 0, 0, 0], // r1: . C . . .
  [1, 0, 0, 1, 1], // r2: D . . E E
  [0, 0, 1, 0, 0], // r3: . . F . .
  [1, 1, 0, 0, 0], // r4: G G . . .
];

const BLOCK_NAMES = [
  ["A", ".", "B", "B", "B"],
  [".", "C", ".", ".", "."],
  ["D", ".", ".", "E", "E"],
  [".", ".", "F", ".", "."],
  ["G", "G", ".", ".", "."],
];

async function run() {
  console.log("=== STARTING 3D CHROME LOGO 5X5 VERIFICATION ===");

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
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(err.toString()));

  // Fresh session
  await page.evaluateOnNewDocument(() => {
    sessionStorage.clear();
  });

  console.log("Navigating to http://localhost:5173/...");
  await page.goto("http://localhost:5173/", { waitUntil: "networkidle2" });

  // 1. Wait for Intro Ready and Activate
  console.log("Waiting for intro ready...");
  await page.waitForFunction(
    () => document.documentElement.getAttribute("data-intro") === "ready",
    { timeout: 10000 }
  );

  console.log("Clicking to activate assemble sequence...");
  await page.mouse.click(960, 540);

  console.log("Waiting for assemble & reveal sequence to complete...");
  await page.waitForFunction(
    () => document.documentElement.getAttribute("data-intro") === "done",
    { timeout: 12000 }
  );

  // Allow idle settle
  await new Promise((r) => setTimeout(r, 1200));

  // ─────────────────────────────────────────────────────────────
  // 2. CAPTURE HERO SCREENSHOT
  // ─────────────────────────────────────────────────────────────
  console.log("\n[STEP 1] Capturing Hero 3D Chrome Logo Screenshot...");
  const heroPath = path.join(SCREENSHOT_DIR, "hero_chrome_logo.png");
  const heroArtifactPath = path.join(ARTIFACT_DIR, "hero_chrome_logo.png");
  await page.screenshot({ path: heroPath });
  fs.copyFileSync(heroPath, heroArtifactPath);
  console.log(`Saved hero screenshot to: ${heroPath}`);

  // Retrieve logo grid metadata from window
  const logoInfo = await page.evaluate(() => {
    return window.__getLogoGridData ? window.__getLogoGridData() : null;
  });
  console.log("Logo Grid Data from window:", JSON.stringify(logoInfo, null, 2));

  // ─────────────────────────────────────────────────────────────
  // 3. CAPTURE FRONT-ON CHROME SCREENSHOT
  // ─────────────────────────────────────────────────────────────
  console.log("\n[STEP 2] Rendering Logo Front-On with Chrome Material...");
  const chromeRes = await page.evaluate(() => {
    if (window.__renderLogoFrontOn) {
      return window.__renderLogoFrontOn({ flatLighting: false });
    }
    return null;
  });
  await new Promise((r) => setTimeout(r, 200));

  const frontOnChromePath = path.join(SCREENSHOT_DIR, "front_on_chrome_logo.png");
  const frontOnChromeArtifactPath = path.join(ARTIFACT_DIR, "front_on_chrome_logo.png");
  if (chromeRes?.dataUrl) {
    fs.writeFileSync(frontOnChromePath, Buffer.from(chromeRes.dataUrl.split(",")[1], "base64"));
  } else {
    await page.screenshot({ path: frontOnChromePath });
  }
  fs.copyFileSync(frontOnChromePath, frontOnChromeArtifactPath);
  console.log(`Saved front-on chrome screenshot to: ${frontOnChromePath}`);

  // ─────────────────────────────────────────────────────────────
  // 4. RENDER FRONT-ON FLAT LIGHTING (FOR SILHOUETTE & GRID SAMPLING)
  // ─────────────────────────────────────────────────────────────
  console.log("\n[STEP 3] Rendering Logo Front-On with Flat Lighting...");
  const renderMeta = await page.evaluate(() => {
    if (window.__renderLogoFrontOn) {
      return window.__renderLogoFrontOn({ flatLighting: true });
    }
    return null;
  });
  await new Promise((r) => setTimeout(r, 200));

  const frontOnFlatPath = path.join(SCREENSHOT_DIR, "front_on_flat_logo.png");
  const frontOnFlatArtifactPath = path.join(ARTIFACT_DIR, "front_on_flat_logo.png");
  if (renderMeta?.dataUrl) {
    fs.writeFileSync(frontOnFlatPath, Buffer.from(renderMeta.dataUrl.split(",")[1], "base64"));
  } else {
    await page.screenshot({ path: frontOnFlatPath });
  }
  fs.copyFileSync(frontOnFlatPath, frontOnFlatArtifactPath);
  console.log(`Saved front-on flat screenshot to: ${frontOnFlatPath}`);

  // ─────────────────────────────────────────────────────────────
  // 5. SAMPLE 5X5 GRID FROM FLAT SCREENSHOT
  // ─────────────────────────────────────────────────────────────
  console.log("\n[STEP 4] Sampling 5x5 Grid Cells...");
  const flatImg = sharp(frontOnFlatPath);
  const flatMeta = await flatImg.metadata();
  const { data: flatPixels, info: flatInfo } = await flatImg
    .raw()
    .toBuffer({ resolveWithObject: true });

  const u = renderMeta?.unitSize || 0.64;
  const halfH = renderMeta?.gridHalfH || (2.5 * u * 1.05);
  const halfW = renderMeta?.gridHalfW || (halfH * (1920 / 1080));
  const width = flatInfo.width;
  const height = flatInfo.height;

  const cellHeightPx = (u / (2 * halfH)) * height;
  const cellWidthPx = (u / (2 * halfW)) * width;
  const gridLeft = width / 2 - 2.5 * cellWidthPx;
  const gridTop = height / 2 - 2.5 * cellHeightPx;

  console.log(`Grid geometry on screen:`);
  console.log(`  Cell size: ${cellWidthPx.toFixed(2)} x ${cellHeightPx.toFixed(2)} px`);
  console.log(`  Grid bounds: left=${gridLeft.toFixed(1)}, top=${gridTop.toFixed(1)}, width=${(5 * cellWidthPx).toFixed(1)}, height=${(5 * cellHeightPx).toFixed(1)} px`);

  let sampledGrid = [];
  let allCellsMatch = true;

  console.log("\nGrid sampling results:");
  for (let r = 0; r < 5; r++) {
    let rowValues = [];
    let rowDisplay = [];
    for (let c = 0; c < 5; c++) {
      const centerX = Math.round(gridLeft + (c + 0.5) * cellWidthPx);
      const centerY = Math.round(gridTop + (r + 0.5) * cellHeightPx);

      // Sample a 5x5 pixel patch around center to be robust against noise
      let sumLum = 0;
      let count = 0;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const px = centerX + dx;
          const py = centerY + dy;
          const idx = (py * width + px) * flatInfo.channels;
          const red = flatPixels[idx];
          const green = flatPixels[idx + 1];
          const blue = flatPixels[idx + 2];
          const lum = (red + green + blue) / 3;
          sumLum += lum;
          count++;
        }
      }
      const avgLum = sumLum / count;
      const isOccupied = avgLum > 100 ? 1 : 0;
      rowValues.push(isOccupied);

      const expected = EXPECTED_GRID[r][c];
      const match = isOccupied === expected;
      if (!match) allCellsMatch = false;

      const symbol = isOccupied ? BLOCK_NAMES[r][c] : ".";
      rowDisplay.push(`${symbol}${match ? "✓" : "✗"}`);
    }
    sampledGrid.push(rowValues);
    console.log(`  Row ${r}: [ ${rowDisplay.join("  ")} ]`);
  }

  console.log(`\nGrid Matching Result: ${allCellsMatch ? "PASSED (100% MATCH)" : "FAILED"}`);

  // ─────────────────────────────────────────────────────────────
  // 6. SILHOUETTE IOU & OVERLAY COMPARISON WITH FLAT FLUX LOGO
  // ─────────────────────────────────────────────────────────────
  console.log("\n[STEP 5] Comparing Silhouette with Flat Flux Logo...");
  // Crop the 5x5 grid from flat front-on screenshot and resize to 500x500
  const cropLeft = Math.round(gridLeft);
  const cropTop = Math.round(gridTop);
  const cropWidth = Math.round(5 * cellWidthPx);
  const cropHeight = Math.round(5 * cellHeightPx);

  const croppedBuffer = await sharp(frontOnFlatPath)
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .resize(500, 500)
    .grayscale()
    .raw()
    .toBuffer();

  // Render official SVG to 500x500
  const svgPath = path.join(__dirname, "public", "logo.svg");
  const svgBuffer = await sharp(svgPath)
    .resize(500, 500)
    .grayscale()
    .raw()
    .toBuffer();

  let intersection = 0;
  let union = 0;
  let svgForegroundCount = 0;
  let totalPixels = 500 * 500;

  for (let i = 0; i < totalPixels; i++) {
    const p3d = croppedBuffer[i] > 100 ? 1 : 0;
    const pSvg = svgBuffer[i] > 100 ? 1 : 0;

    if (p3d && pSvg) intersection++;
    if (p3d || pSvg) union++;
    if (pSvg) svgForegroundCount++;
  }

  const iou = union > 0 ? intersection / union : 0;
  const overlayScore = svgForegroundCount > 0 ? intersection / svgForegroundCount : 0;

  console.log(`Silhouette Comparison Analysis:`);
  console.log(`  Intersection pixels: ${intersection}`);
  console.log(`  Union pixels:        ${union}`);
  console.log(`  SVG Foreground:      ${svgForegroundCount}`);
  console.log(`  Silhouette Overlay:  ${(overlayScore * 100).toFixed(2)}% (${overlayScore.toFixed(4)}) [Required: > 95%]`);
  console.log(`  Silhouette IoU:      ${(iou * 100).toFixed(2)}% (${iou.toFixed(4)})`);
  const silhouettePassed = overlayScore >= 0.95 || iou >= 0.95;
  console.log(`  Silhouette Check:    ${silhouettePassed ? "PASSED" : "FAILED"}`);

  // Generate silhouette overlay comparison image for visual proof
  const overlayRgba = Buffer.alloc(500 * 500 * 4);
  for (let i = 0; i < totalPixels; i++) {
    const p3d = croppedBuffer[i] > 100 ? 1 : 0;
    const pSvg = svgBuffer[i] > 100 ? 1 : 0;
    const idx = i * 4;

    if (p3d && pSvg) {
      // Both match: Green / Cyan
      overlayRgba[idx] = 40;
      overlayRgba[idx + 1] = 230;
      overlayRgba[idx + 2] = 120;
      overlayRgba[idx + 3] = 255;
    } else if (p3d && !pSvg) {
      // 3D only: Yellow
      overlayRgba[idx] = 240;
      overlayRgba[idx + 1] = 200;
      overlayRgba[idx + 2] = 40;
      overlayRgba[idx + 3] = 255;
    } else if (!p3d && pSvg) {
      // SVG only: Magenta
      overlayRgba[idx] = 240;
      overlayRgba[idx + 1] = 40;
      overlayRgba[idx + 2] = 120;
      overlayRgba[idx + 3] = 255;
    } else {
      // Background: Dark navy
      overlayRgba[idx] = 10;
      overlayRgba[idx + 1] = 10;
      overlayRgba[idx + 2] = 16;
      overlayRgba[idx + 3] = 255;
    }
  }

  const overlayPath = path.join(SCREENSHOT_DIR, "silhouette_overlay_comparison.png");
  const overlayArtifactPath = path.join(ARTIFACT_DIR, "silhouette_overlay_comparison.png");
  await sharp(overlayRgba, { raw: { width: 500, height: 500, channels: 4 } })
    .png()
    .toFile(overlayPath);
  fs.copyFileSync(overlayPath, overlayArtifactPath);
  console.log(`Saved silhouette overlay comparison image to: ${overlayPath}`);

  // Restore normal interactive state
  await page.evaluate(() => {
    if (window.__restoreLogoNormal) window.__restoreLogoNormal();
  });

  // Verify console errors
  console.log(`\nConsole error count: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error("Errors:", consoleErrors);
  }

  await browser.close();

  console.log("\n=================================================");
  console.log(`ALL VERIFICATION CHECKS: ${allCellsMatch && silhouettePassed ? "SUCCESSFUL" : "FAILED"}`);
  console.log("=================================================");

  if (!allCellsMatch || !silhouettePassed) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("Verification failed with error:", err);
  process.exit(1);
});
