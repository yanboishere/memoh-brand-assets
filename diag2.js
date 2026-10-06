const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  page.on('console', (m) => { if (m.type() !== 'debug' && !/OTS|glyf/.test(m.text())) console.log('[console]', m.type(), m.text().slice(0, 200)); });
  page.on('pageerror', (e) => console.log('[pageerror]', String(e).slice(0, 300)));

  await page.goto('http://127.0.0.1:5181/memoh-demo/?route=' + encodeURIComponent('/settings/bots/memoh'), { waitUntil: 'load', timeout: 30000 });

  // Hook the (mocked) fetch to trace display calls
  await page.evaluate(() => {
    const orig = window.fetch;
    window.fetch = async (...args) => {
      const url = String(args[0] instanceof Request ? args[0].url : args[0]);
      const res = await orig(...args);
      if (url.includes('display')) console.log('[trace] fetch', url, '->', res.status);
      return res;
    };
  });

  // Wait for tab list, click Desktop tab
  await page.waitForSelector('text=Overview', { timeout: 20000 });
  await page.click('text=Desktop');
  console.log('[step] clicked Desktop tab, url tab=', await page.evaluate(() => new URLSearchParams(location.search).get('tab')));

  // Poll video state for up to 15s
  for (let i = 0; i < 15; i++) {
    await page.waitForTimeout(1000);
    const state = await page.evaluate(() => {
      const v = document.querySelector('video');
      return v ? { readyState: v.readyState, w: v.videoWidth, h: v.videoHeight, paused: v.paused } : { hasVideo: false, text: (document.body.innerText.match(/Connecting|unavailable|Desktop/gi) || []).join(',') };
    });
    console.log('[state]', i, JSON.stringify(state));
    if (state.w > 0) break;
  }
  await page.screenshot({ path: 'output/real/probe/bot-desktop-v4.png' });
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
