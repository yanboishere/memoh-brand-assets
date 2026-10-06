# memoh-brand-assets

Brand visuals for [Memoh](https://memoh.ai) — promo cards, mascot assets, and tweet graphics.

## Layout

- `cards/` — HTML card sources (1600×900) + `brand.css` design tokens (Space Grotesk / JetBrains Mono, both SIL OFL)
- `assets/` — logo + mascot PNGs (`logo-solid.png` for compositions; `logo.png` has a transparent screen, footer use only)
- `output/light/` — rendered 3200×1800 PNGs, ready to post
- `output/icon/`, `output/meme/` — app icon renders and meme edits
- `copy/` — tweet copy paired with posters
- `gifs/`, `frames/` — animated cards and their frame sequences
- `render.js` — Playwright render loop (cards 1..15, `deviceScaleFactor: 2`)
- `cards-v1/`, `output/v1/` — deprecated first-gen cards (contain SF Pro / Apple Emoji, do not publish)

## Render

```bash
npm i
node render.js
```
