import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOT_DIR = 'C:\\Users\\dk231\\.gemini\\antigravity\\brain\\b61cb5d9-df27-42de-b31d-38a1bd9f1909\\screenshots';

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runVerification() {
  console.log('Launching Chrome for FLUX AI Chatbot verification...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--use-gl=angle',
      '--use-angle=default',
      '--enable-webgl',
      '--window-size=1920,1080',
    ],
  });

  const errors = [];
  const report = {};

  try {
    // ========================================================
    // 1. DESKTOP VERIFICATION (1920x1080)
    // ========================================================
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (!text.includes('favicon')) {
          errors.push(text);
          console.error('[Browser Error]', text);
        }
      }
    });

    page.on('pageerror', (err) => {
      errors.push(err.message);
      console.error('[Page Error]', err.message);
    });

    // Mark intro seen in sessionStorage so launcher immediately appears
    await page.evaluateOnNewDocument(() => {
      sessionStorage.setItem('flux_intro_seen_v1', '1');
    });

    console.log('Navigating to http://localhost:5173/ ...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 1500));

    // Check closed launcher
    const launcherSelector = 'button[aria-label="Open FLUX AI Chatbot"]';
    await page.waitForSelector(launcherSelector, { visible: true, timeout: 5000 });
    console.log('Found closed launcher!');

    // Check ticker clearance
    const closedClearance = await page.evaluate((sel) => {
      const launcher = document.querySelector(sel);
      const ticker = document.getElementById('bottom-ticker') || document.querySelector('footer[aria-label="Status Ticker"]');
      if (!launcher || !ticker) return null;
      const lRect = launcher.getBoundingClientRect();
      const tRect = ticker.getBoundingClientRect();
      return {
        launcherBottom: Math.round(lRect.bottom),
        tickerTop: Math.round(tRect.top),
        gap: Math.round(tRect.top - lRect.bottom),
      };
    }, launcherSelector);

    console.log('Closed Launcher vs Ticker Gap:', closedClearance);
    report.closedClearance = closedClearance;

    // Screenshot 1: Desktop closed launcher
    const shot1 = path.join(SCREENSHOT_DIR, 'desktop_1_closed_launcher.png');
    await page.screenshot({ path: shot1, fullPage: false });
    console.log('Saved screenshot 1:', shot1);

    // Click launcher to open panel
    await page.click(launcherSelector);
    console.log('Clicked launcher, waiting for panel GSAP open animation...');
    await new Promise((r) => setTimeout(r, 1200));

    // Verify panel exists
    const panelSelector = 'div[role="dialog"][aria-label="FLUX AI Chatbot"]';
    await page.waitForSelector(panelSelector, { visible: true });

    // Check panel vs ticker clearance and button hit area clearance
    const openClearance = await page.evaluate((pSel) => {
      function serializeRect(r) {
        if (!r) return null;
        return {
          top: Math.round(r.top),
          bottom: Math.round(r.bottom),
          left: Math.round(r.left),
          right: Math.round(r.right),
          width: Math.round(r.width),
          height: Math.round(r.height),
        };
      }

      const panel = document.querySelector(pSel);
      const ticker = document.getElementById('bottom-ticker') || document.querySelector('footer[aria-label="Status Ticker"]');
      const minBtn = panel?.querySelector('button[aria-label="Minimize chat"]');
      const closeBtn = panel?.querySelector('button[aria-label="Close chat"]');
      const robot = panel?.querySelector('.chat-robot-container');

      const pRect = serializeRect(panel?.getBoundingClientRect());
      const tRect = serializeRect(ticker?.getBoundingClientRect());
      const minRect = serializeRect(minBtn?.getBoundingClientRect());
      const closeRect = serializeRect(closeBtn?.getBoundingClientRect());
      const rRect = serializeRect(robot?.getBoundingClientRect());

      // Overlap calculation: Robot pedestal sits to the right of header buttons
      // If robot left edge is greater than closeBtn right edge, or buttons are unobstructed:
      const minClear = minRect && rRect ? (minRect.right <= rRect.left || minRect.top >= rRect.bottom) : true;
      const closeClear = closeRect && rRect ? (closeRect.right <= rRect.left || closeRect.top >= rRect.bottom) : true;

      return {
        panelBottom: pRect?.bottom,
        tickerTop: tRect?.top,
        panelTickerGap: tRect && pRect ? tRect.top - pRect.bottom : null,
        buttonsClearOfRobot: minClear && closeClear,
        minRect,
        closeRect,
        rRect,
      };
    }, panelSelector);

    console.log('Open Panel Clearance & Button overlap check:', openClearance);
    report.openClearance = openClearance;

    // Screenshot 2: Desktop open panel with robot
    const shot2 = path.join(SCREENSHOT_DIR, 'desktop_2_open_panel_robot.png');
    await page.screenshot({ path: shot2, fullPage: false });
    console.log('Saved screenshot 2:', shot2);

    // Click a Quick Chip: "Upcoming events"
    console.log('Clicking "Upcoming events" quick chip...');
    const chipText = 'Upcoming events';
    await page.evaluate((text) => {
      const buttons = Array.from(document.querySelectorAll('.chat-quick-chip, button'));
      const chip = buttons.find((b) => b.textContent && b.textContent.includes(text));
      if (chip) chip.click();
    }, chipText);

    // Wait a brief moment while bot starts typing/answering
    await new Promise((r) => setTimeout(r, 220));

    // Screenshot 3: Conversation with typing indicator or response stream
    const shot3 = path.join(SCREENSHOT_DIR, 'desktop_3_typing_and_conversation.png');
    await page.screenshot({ path: shot3, fullPage: false });
    console.log('Saved screenshot 3:', shot3);

    // Wait for response to finish
    await new Promise((r) => setTimeout(r, 1600));

    // Screenshot 4: Full answered conversation with collapsed chips row
    const shot4 = path.join(SCREENSHOT_DIR, 'desktop_4_chip_response_collapsed.png');
    await page.screenshot({ path: shot4, fullPage: false });
    console.log('Saved screenshot 4:', shot4);

    // Test wheel scroll inside messages container does NOT scroll page
    const scrollTest = await page.evaluate(async () => {
      const scrollBox = document.querySelector('div[data-lenis-prevent]');
      const initialScrollY = window.scrollY;
      if (scrollBox) {
        scrollBox.scrollTop = 50;
        const wheelEv = new WheelEvent('wheel', { deltaY: 100, bubbles: true });
        scrollBox.dispatchEvent(wheelEv);
      }
      return {
        initialScrollY,
        finalScrollY: window.scrollY,
        preventWorked: window.scrollY === initialScrollY,
      };
    });
    console.log('Lenis Wheel Isolation Test:', scrollTest);
    report.scrollTest = scrollTest;

    // Test FPS measurement while scrolling page with chat open
    console.log('Measuring FPS with chat open while scrolling page...');
    const fpsResult = await page.evaluate(async () => {
      const frameDeltas = [];
      let lastTime = performance.now();
      let frames = 0;

      await new Promise((resolve) => {
        function tick(now) {
          const delta = now - lastTime;
          lastTime = now;
          if (frames > 3 && delta > 0) {
            frameDeltas.push(delta);
          }
          frames++;
          // Smooth sinusoidal page scroll simulating realistic user scroll
          window.scrollBy(0, Math.sin(frames * 0.12) * 22);

          if (frames < 100) {
            requestAnimationFrame(tick);
          } else {
            resolve();
          }
        }
        requestAnimationFrame(tick);
      });

      const cleanDeltas = frameDeltas.filter((d) => d > 2 && d < 100);
      const avgDelta = cleanDeltas.reduce((a, b) => a + b, 0) / cleanDeltas.length;
      const sorted = [...cleanDeltas].sort((a, b) => a - b);
      const p99Delta = sorted[Math.floor(sorted.length * 0.99)] || avgDelta;

      return {
        avgFps: Math.min(120, Math.round(1000 / avgDelta)),
        p1LowFps: Math.min(120, Math.round(1000 / p99Delta)),
        sampleCount: cleanDeltas.length,
      };
    });
    console.log('FPS Measurement:', fpsResult);
    report.fps = fpsResult;

    // Test Escape key closes/minimizes chat
    console.log('Pressing Escape key...');
    await page.keyboard.press('Escape');
    // Wait for the full 0.5s GSAP collapse animation to complete
    await new Promise((r) => setTimeout(r, 850));
    const isPanelGone = await page.evaluate((pSel) => !document.querySelector(pSel), panelSelector);
    console.log('Panel minimized on Escape:', isPanelGone);
    report.escapeWorked = isPanelGone;

    await page.close();

    // ========================================================
    // 2. MOBILE VERIFICATION (390x844 - iPhone 14/15)
    // ========================================================
    console.log('\n--- Running Mobile (390px) Verification ---');
    const mobilePage = await browser.newPage();
    await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

    await mobilePage.evaluateOnNewDocument(() => {
      sessionStorage.setItem('flux_intro_seen_v1', '1');
    });

    await mobilePage.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 1200));

    // Screenshot 5: Mobile closed launcher
    const shot5 = path.join(SCREENSHOT_DIR, 'mobile_1_closed_launcher.png');
    await mobilePage.screenshot({ path: shot5, fullPage: false });
    console.log('Saved screenshot 5:', shot5);

    // Open mobile panel
    await mobilePage.click(launcherSelector);
    await new Promise((r) => setTimeout(r, 1000));

    // Screenshot 6: Mobile open panel with robot
    const shot6 = path.join(SCREENSHOT_DIR, 'mobile_2_open_panel_robot.png');
    await mobilePage.screenshot({ path: shot6, fullPage: false });
    console.log('Saved screenshot 6:', shot6);

    // Click chip on mobile
    await mobilePage.evaluate((text) => {
      const buttons = Array.from(document.querySelectorAll('.chat-quick-chip, button'));
      const chip = buttons.find((b) => b.textContent && b.textContent.includes(text));
      if (chip) chip.click();
    }, 'How to join');

    await new Promise((r) => setTimeout(r, 300));

    // Screenshot 7: Mobile conversation with typing/reply
    const shot7 = path.join(SCREENSHOT_DIR, 'mobile_3_conversation.png');
    await mobilePage.screenshot({ path: shot7, fullPage: false });
    console.log('Saved screenshot 7:', shot7);

    await mobilePage.close();

    report.errors = errors;
    report.success = errors.length === 0;

    console.log('\n=== VERIFICATION SUMMARY ===');
    console.log(JSON.stringify(report, null, 2));

    const reportPath = path.join(SCREENSHOT_DIR, 'verification_report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
    console.log('Saved verification report to:', reportPath);
  } catch (err) {
    console.error('Verification failed with error:', err);
  } finally {
    await browser.close();
  }
}

runVerification();
