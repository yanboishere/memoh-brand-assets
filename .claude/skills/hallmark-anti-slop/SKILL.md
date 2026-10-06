---
name: hallmark
description: "Anti-AI-slop design skill for greenfield pages, audits, redesigns. Makes generated UIs look made, not generated. Core rules extracted from nexu-io/open-design hallmark skill."
version: 1.0.0
---

# Hallmark (core rules)

A design skill that refuses to let the model fall back to the defaults every LLM was trained on. Insists on **structural variety**, not just visual variety.

## Disciplines that hold across every task

1. **Pre-emit self-critique.** Before handing back any output, score it 1–5 on six axes — Philosophy, Hierarchy, Execution, Specificity, Restraint, Variety. Anything < 3 triggers a revision pass. Stamp the six scores at the top of the artifact (`/* Hallmark · pre-emit critique: P5 H4 E5 S4 R5 V5 */`).

2. **Honest copy — no fabricated content.** If the user did not supply a metric, do not invent one. Stat-led layouts, comparison rows, and proof bars must use real numbers, a placeholder, or a different macrostructure. Invented "+47% conversion" / "trusted by 50,000+ teams" / "10× faster" are slop. Same rule for testimonials, logos, and case-study counts.

3. **Locked tokens — no mid-render improvisation.** Once a theme is selected, every colour and every font-family declaration must reference a named token (`var(--color-accent)`, `var(--font-display)`). Inline hex/rgb values or font-family declarations that bypass the token block are not allowed. If a value is needed that doesn't exist as a token, lift it into the token block first.

4. **Re-drawn chrome forbidden.** Do not hand-build fake browser bars (URL pill + traffic-light dots), fake phone frames, fake code-block windows (mock title bar + dots wrapping a `<pre>`), or fake IDE chrome. Use real screenshots wrapped in a `<figure>` (with at most a hairline border), or omit the chrome and let the content stand on its own.

5. **Responsive floor.** No horizontal scroll; no two-line clickable text; grid tracks use `minmax(0,1fr)`; `overflow-x: clip`; display headers wrap via `overflow-wrap:anywhere`.

## Structural variety

Two pages for two different briefs should not share the same hero → 3-feature → CTA → footer rhythm. They should feel like different pages, not colour-swaps of the same template. Vary macrostructure between artifacts in the same set: differing heading placement, section rhythm, component voice.

## Instant rejects (anti-pattern list)

- Purple/indigo→blue gradient anything as unexamined default
- Inter/Roboto as unexamined default headline face
- Glassmorphism, floating blurred blobs, mesh gradients as decoration
- Three identical feature cards in a row
- Centered hero: badge pill → huge heading → gray subheading → two buttons
- Copy like "Elevate your workflow" / "Unlock the power of" / "Seamlessly"
- Same border-radius on everything regardless of hierarchy
- Identical soft grey shadow under every card
- Tracked-out ALL-CAPS eyebrow label above every heading
- Meta strings joined with middle dots ('A · B · C')
- '→' appended to every link and button text

## Pre-flight scan

If the project already has a design system (brand tokens, fonts, palette), read it before designing. Stomping on an established palette or font stack is forbidden. The brand's own tokens override catalog themes.
