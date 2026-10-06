const { chromium } = require('playwright-core');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1600, height: 900 } });
  const reqs = [];
  p.on('console', m => { if (m.type() === 'error') console.log('[err]', m.text().slice(0, 200)); });
  await p.goto('http://127.0.0.1:5181/memoh-demo/?route=' + encodeURIComponent('/settings/bots/memoh?tab=schedule'), { waitUntil: 'load', timeout: 30000 });
  await p.waitForTimeout(4000);
  const r1 = await p.evaluate(() => fetch('/api/bots/bot-memoh/schedule').then(r => r.json()));
  console.log('schedule by uuid:', JSON.stringify(r1).slice(0, 300));
  const r2 = await p.evaluate(() => fetch('/api/bots/memoh/schedule').then(r => r.json()));
  console.log('schedule by name:', JSON.stringify(r2).slice(0, 300));
  await b.close();
})();
