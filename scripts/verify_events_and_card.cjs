const puppeteer = require('../Frontend/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const outDir = path.join(__dirname, '..', 'reports', 'events_and_card_verification');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 1. Verify Card 04 in Achievements on Mobile and Desktop
  console.log('--- 1. VERIFYING ACHIEVEMENT CARD 04 ---');
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('flux_intro_seen_v1', '1');
  });

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // Scroll to achievements and scroll carousel to card 4
  await page.evaluate(() => {
    const el = document.querySelector('#achievement-scene-section');
    if (el) {
      const curY = window.scrollY || document.documentElement.scrollTop || 0;
      const rect = el.getBoundingClientRect();
      window.scrollTo(0, curY + rect.top);
    }
  });
  await new Promise(r => setTimeout(r, 1000));

  await page.evaluate(() => {
    const section = document.querySelector('#achievement-scene-section');
    const carousel = section.querySelector('.snap-x');
    if (carousel) {
      const cards = carousel.querySelectorAll('.snap-center');
      if (cards[3]) {
        cards[3].scrollIntoView({ behavior: 'instant', inline: 'center' });
      }
    }
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'mobile_achievement_card_04_she_leads.png') });
  console.log('Saved mobile_achievement_card_04_she_leads.png');

  const card4Data = await page.evaluate(() => {
    const section = document.querySelector('#achievement-scene-section');
    const cards = Array.from(section.querySelectorAll('.snap-center'));
    const card4 = cards[3];
    return {
      h3: card4?.querySelector('h3')?.innerText || '',
      h4: card4?.querySelector('h4')?.innerText || '',
      p: card4?.querySelector('p')?.innerText || '',
      date: card4?.querySelector('span')?.innerText || '',
      team: card4?.querySelectorAll('span')[1]?.innerText || '',
    };
  });
  console.log('Achievement Card 04:', JSON.stringify(card4Data, null, 2));

  // 2. Verify Events Page
  console.log('\n--- 2. VERIFYING /events PAGE ---');
  await page.goto('http://localhost:5173/events', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // Capture Upcoming Events
  const upcomingEl = await page.$('#upcoming-events');
  if (upcomingEl) {
    await upcomingEl.scrollIntoView();
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(outDir, 'mobile_events_upcoming_section.png') });
    console.log('Saved mobile_events_upcoming_section.png');
  }

  const eventsData = await page.evaluate(() => {
    const upcomingSection = document.querySelector('#upcoming-events');
    const upcomingCards = Array.from(upcomingSection?.querySelectorAll('h3') || []).map(h => h.innerText);
    const upcomingText = upcomingSection?.innerText || '';

    // Timeline section
    const timelineH2 = Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('Timeline'));
    const timelineSection = timelineH2?.closest('div');
    const timelineItems = Array.from(document.querySelectorAll('.card-outline h3')).map(h => h.innerText);

    return {
      upcomingCards,
      hasOrientationInUpcoming: upcomingText.toLowerCase().includes('orientation'),
      hasSheLeadsInUpcoming: upcomingText.toLowerCase().includes('she leads'),
      hasByteBrawlInUpcoming: upcomingText.toLowerCase().includes('bytebrawl'),
      timelineItems,
      hasOrientationInTimeline: timelineItems.some(item => item.toLowerCase().includes('orientation')),
      hasSheLeadsInTimeline: timelineItems.some(item => item.toLowerCase().includes('she leads')),
      hasByteBrawlInTimeline: timelineItems.some(item => item.toLowerCase().includes('bytebrawl')),
    };
  });
  console.log('Events Page Data:', JSON.stringify(eventsData, null, 2));

  // 3. Desktop view of /events
  console.log('\n--- 3. DESKTOP VIEW OF /events (1920x1080) ---');
  const deskPage = await browser.newPage();
  await deskPage.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await deskPage.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await deskPage.evaluateOnNewDocument(() => {
    sessionStorage.setItem('flux_intro_seen_v1', '1');
  });

  await deskPage.goto('http://localhost:5173/events', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  const deskUpcoming = await deskPage.$('#upcoming-events');
  if (deskUpcoming) {
    await deskUpcoming.scrollIntoView();
    await new Promise(r => setTimeout(r, 1000));
    await deskPage.screenshot({ path: path.join(outDir, 'desktop_events_upcoming_section.png') });
    console.log('Saved desktop_events_upcoming_section.png');
  }

  await browser.close();
  console.log('\nAll verifications completed successfully!');
})();

