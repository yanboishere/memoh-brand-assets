// Records gifs/gif{2,3,4}.html into output/thread-N-demo.gif
// v2: uses page.clock virtual time so JS timeline advances exactly 100ms per frame,
// regardless of real screenshot latency (fixes compressed-pacing bug).
const { chromium } = require('playwright-core');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const JOBS = [
  { n: 2, duration: 24000 },
  { n: 3, duration: 18000 },
  { n: 4, duration: 10000 },
  { n: 5, duration: 10000 },
];
const FPS = 10;
const STEP = 1000 / FPS;

// THEME=dark node record.js → output/dark/thread-N-demo-dark.gif (dark token override)
// THEME=light (default)     → output/light/thread-N-demo-light.gif
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
  for (const job of JOBS.filter(job => !process.env.THREAD || String(job.n) === process.env.THREAD)) {
    const framesDir = path.resolve(__dirname, 'frames', String(job.n));
    fs.rmSync(framesDir, { recursive: true, force: true });
    fs.mkdirSync(framesDir, { recursive: true });

    const page = await browser.newPage({ viewport: { width: 1200, height: 675 }, deviceScaleFactor: 1 });
    // Install a mocked clock and pause it BEFORE the page loads,
    // so no timeline timers fire until we advance time manually.
    await page.clock.install();
    await page.clock.pauseAt(Date.now());
    await page.goto('file://' + path.resolve(__dirname, 'gifs', `gif${job.n}.html`), { waitUntil: 'networkidle' });
    if (THEME === 'dark') await page.addStyleTag({ content: DARK_VARS });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300); // let fonts/layout settle (real time)

    const total = Math.round(job.duration / 1000 * FPS);
    for (let f = 0; f < total; f++) {
      await page.screenshot({ path: path.join(framesDir, `f${String(f).padStart(4, '0')}.png`) });
      await page.clock.runFor(STEP); // advance virtual time exactly one frame
      await page.waitForTimeout(60); // let CSS transitions paint (real time)
    }
    await page.close();

    const out = path.join(outDir, `thread-${job.n}-demo-${THEME}.gif`);
    execSync(
      `ffmpeg -y -framerate ${FPS} -i "${framesDir}/f%04d.png" ` +
      `-filter_complex "[0:v]split[a][b];[a]palettegen=max_colors=192:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle" ` +
      `"${out}"`,
      { stdio: 'inherit' }
    );
    console.log(`thread-${job.n}-demo.gif done`);
  }
  await browser.close();
})();
