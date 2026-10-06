const { chromium } = require('playwright-core');

const BASE = 'http://127.0.0.1:5181/memoh-demo/';
const T = 60000;

// [outfile, route (memory-history path incl. ?tab=) or null for chat home, ready selector or fn, settle ms]
const shots = [
  ['thread1-chat', null, async (p) => p.waitForSelector('textarea', { timeout: T }), 6000],
  ['thread2-desktop', '/settings/bots/memoh?tab=desktop', async (p) => p.waitForFunction(() => { const v = document.querySelector('video'); return v && v.videoWidth > 0; }, null, { timeout: T }), 2500],
  ['thread3-agents', '/settings/bots/memoh?tab=agents', 'text=Claude Code', 2000],
  ['thread4-channels', '/settings/bots/memoh?tab=channels', 'text=Telegram', 2000],
  ['thread4b-schedule', '/settings/bots/memoh?tab=schedule', 'text=Morning brief', 2000],
  ['thread5-container', '/settings/bots/memoh?tab=container', 'text=CPU', 3000],
  ['thread6-overview', '/settings/bots/memoh?tab=overview', 'text=Usage', 3500],
  ['thread7-pro', '/settings/bots/developer?tab=container', 'text=CPU', 3000],
  ['thread7b-premium', '/settings/bots/studio?tab=container', 'text=CPU', 3000],
];

// Navigate in-page via the exposed memory-history router; retry until the
// route (incl. tab query) sticks, mirroring the bootstrap deep-link loop.
async function nav(page, route) {
  await page.waitForFunction(() => Boolean(window.__demoRouter), null, { timeout: T });
  const ok = await page.evaluate(async (r) => {
    const router = window.__demoRouter;
    await router.isReady();
    const [path, query] = r.split('?');
    const tab = query ? new URLSearchParams(query).get('tab') : null;
    for (let i = 0; i < 80; i++) {
      const cur = router.currentRoute.value;
      if (cur.path === path && (!tab || cur.query.tab === tab)) return true;
      try { await router.push(cur.path === path ? r : path); } catch { /* retry */ }
      await new Promise((res) => setTimeout(res, 400));
    }
    return false;
  }, route);
  if (!ok) throw new Error('route did not stick: ' + route);
}

async function shoot(ctx, [name, route, ready, settle]) {
  const page = await ctx.newPage();
  try {
    await page.goto(BASE, { waitUntil: 'load', timeout: T });
    if (route) await nav(page, route);
    if (typeof ready === 'string') {
      await page.locator(`${ready} >> visible=true`).first().waitFor({ timeout: T });
    } else {
      await ready(page);
    }
    await page.waitForTimeout(settle);
    await page.screenshot({ path: `output/real/${name}.png` });
    console.log('[ok]', name);
    return true;
  } catch (e) {
    console.log('[fail]', name, String(e).slice(0, 160));
    await page.screenshot({ path: `output/real/${name}-FAIL.png` }).catch(() => {});
    return false;
  } finally {
    await page.close();
  }
}

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 2 });
  const only = process.argv.slice(2);
  for (const shot of shots) {
    if (only.length && !only.includes(shot[0])) continue;
    if (!(await shoot(ctx, shot))) {
      console.log('[retry]', shot[0]);
      await shoot(ctx, shot);
    }
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
