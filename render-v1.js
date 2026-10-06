// Renders cards-v1/card{1..7}.html to output/v1/thread-{n}-v1.png at 1600x900 @2x
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

(async () => {
  const outDir = path.resolve(__dirname, 'output', 'v1');
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1600, height: 900 },
    deviceScaleFactor: 2,
  });
  for (let i = 1; i <= 7; i++) {
    const file = 'file://' + path.resolve(__dirname, 'cards-v1', `card${i}.html`);
    await page.goto(file, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(outDir, `thread-${i}-v1.png`) });
    console.log(`thread-${i}-v1.png done`);
  }
  await browser.close();
})();
