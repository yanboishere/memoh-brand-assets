const { chromium } = require('playwright-core');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1600, height: 900 } });
  const shots = [
    ['bot-desktop', '/settings/bots/memoh?tab=desktop', 9000],
    ['bot-schedule', '/settings/bots/memoh?tab=schedule', 3000],
    ['bot-container', '/settings/bots/memoh?tab=container', 3000],
  ];
  for (const [name, route, wait] of shots) {
    try {
      await p.goto('http://127.0.0.1:5181/memoh-demo/?route=' + encodeURIComponent(route), { waitUntil: 'load', timeout: 30000 });
      await p.waitForTimeout(wait);
      await p.screenshot({ path: `output/real/probe/${name}-v2.png` });
      console.log('OK', name);
    } catch (e) { console.log('FAIL', name, e.message.slice(0, 120)); }
  }
  await b.close();
})();
