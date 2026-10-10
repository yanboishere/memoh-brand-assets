// Renders cards/card{1..8}.html at 1600x900 @2x
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

// THEME=dark node render.js  → output/dark/thread-N-dark.png (dark token override)
// THEME=light (default)      → output/light/thread-N-light.png
const THEME = process.env.THEME === 'dark' ? 'dark' : 'light';
const DARK_VARS = `:root {
  --bg: #0c0b12; --raise: #16141f; --line: #262336;
  --violet: #7c3aed; --violet-2: #a78bfa;
  --paper: #f2f0fa; --dim: #8b8799; --live: #34d399;
}`;

(async () => {
  const outDir = path.resolve(__dirname, 'output', THEME);
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1600, height: 900 },
    deviceScaleFactor: 2,
  });
  for (let i = 1; i <= 16; i++) {
    if (process.env.THREAD && String(i) !== process.env.THREAD) continue;
    const file = 'file://' + path.resolve(__dirname, 'cards', `card${i}.html`);
    await page.goto(file, { waitUntil: 'networkidle' });
    if (THEME === 'dark') await page.addStyleTag({ content: DARK_VARS });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(outDir, `thread-${i}-${THEME}.png`) });
    console.log(`thread-${i}-${THEME}.png done`);
  }
  await browser.close();
})();
