// Probe demo-app pages: screenshot each candidate route for inventory.
const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const BASE = 'http://127.0.0.1:5181/memoh-demo/';
const outDir = path.join(__dirname, 'output', 'real', 'probe');
fs.mkdirSync(outDir, { recursive: true });

const targets = [
  ['chat-home', ''],
  ['bots-list', '?route=' + encodeURIComponent('/settings/bots')],
  ['bot-overview', '?route=' + encodeURIComponent('/settings/bots/memoh?tab=overview')],
  ['bot-desktop', '?route=' + encodeURIComponent('/settings/bots/memoh?tab=desktop')],
  ['bot-container', '?route=' + encodeURIComponent('/settings/bots/memoh?tab=container')],
  ['bot-agents', '?route=' + encodeURIComponent('/settings/bots/memoh?tab=agents')],
  ['bot-channels', '?route=' + encodeURIComponent('/settings/bots/memoh?tab=channels')],
  ['bot-schedule', '?route=' + encodeURIComponent('/settings/bots/memoh?tab=schedule')],
  ['bot-dependencies', '?route=' + encodeURIComponent('/settings/bots/memoh?tab=dependencies')],
  ['bot-memory', '?route=' + encodeURIComponent('/settings/bots/memoh?tab=memory')],
  ['bot-remote-runtime', '?route=' + encodeURIComponent('/settings/bots/memoh?tab=remote-runtime')],
  ['bot-network', '?route=' + encodeURIComponent('/settings/bots/memoh?tab=network')],
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1600, height: 900 },
    deviceScaleFactor: 1,
  });
  page.on('console', m => { if (m.type() === 'error') console.log('[console.error]', m.text().slice(0, 200)); });
  for (const [name, qs] of targets) {
    try {
      await page.goto(BASE + qs, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(2500);
      await page.screenshot({ path: path.join(outDir, name + '.png') });
      console.log('OK', name);
    } catch (e) {
      console.log('FAIL', name, e.message.slice(0, 150));
    }
  }
  await browser.close();
})();
