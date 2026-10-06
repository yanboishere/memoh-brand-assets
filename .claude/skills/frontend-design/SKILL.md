---
name: frontend-design
description: Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. Helps with aesthetic direction, typography, and making choices that don't read as templated defaults.
license: Complete terms in LICENSE.txt (Anthropic skills repo)
---

# Frontend Design

Approach this as the design lead at a design studio known for giving every client a distinct visual identity that is not mistaken for anyone else's. This client has already rejected proposals that felt cliché or templated, and is paying for a distinctive point of view: make deliberate, opinionated choices about palette, typography, and layout that are specific to this brief, and take aesthetic risk if justified.

## Ground your designs in the subject matter

If the brief does not identify what the product or subject matter is, identify it yourself before designing, and confirm with the client. The subject's industry, subject matter, materials, and vernacular are where distinctive visual choices come from. Build with the brief's real content and subject matter throughout.

## Design principles

For web designs, the hero is the first thing viewers will see. Open with the most characteristic thing in the subject's world, in the form that is most appropriate. Be deliberate: a big number with a small label, supporting stats, and a gradient accent is the default treatment, so only use it if that's truly the best option.

Typography carries the personality of the page. Use one family or two, and if two, make them clearly distinct. Choose typefaces deliberately, not the default families you would reach for on any other project. Set a clear type scale with intentional weights, widths, and spacing. When type is used as a headline or visual element, use the type treatment itself as an active part of the design.

Default to line lengths of less than 80 characters.

Avoid these default typographic treatments; they are the commonest tells of a generated page:
- Accenting just a single word or phrase in a headline (one word in italic/bold or a different color).
- Using all caps for labels.
- Adding unnecessary typographic labels above content.

Visual structure is information. Structural devices (outlines, borders, numbering, eyebrows, dividers, labels) encode useful information about the content rather than decorate it. Before adding numbered markers, check the content really is a sequence.

Use non-user-triggered motion sparingly and deliberately, only to draw attention. A single orchestrated moment lands better than scattered effects.

## Calibration: common AI-generated design clusters (avoid as unexamined defaults)

1. Warm cream background (near #F4F1EA) + high-contrast serif display + terracotta accent (near #D97757);
2. Near-black background with a single bright acid-green or vermilion accent;
3. Broadsheet layout with hairline rules, zero border-radius, dense newspaper columns;
4. The SaaS-card kit: identical rounded cards, one border-radius everywhere, same soft grey shadow, gradient washes as decoration;
5. Template chrome regardless of subject: tracked-out ALL-CAPS eyebrow labels; meta strings joined with middle dots ('A · B · C'); 'WORD — fragment' labels; tinted near-black (#0B0B0B, #111); monospace for small data labels; '→' appended to link/button text.

All are legitimate for some briefs, but they are defaults rather than choices. Where the brief pins down a visual direction, follow it exactly. Where it leaves an axis free, don't spend that freedom on a default.

## Process: plan, review against the brief, build, critique

Work in two passes. First, brainstorm a short design plan: a compact token system with color (4–6 named hex values), type (typefaces and roles), layout (one-sentence prose + ASCII wireframes, alignment guidance), principles (what makes this page unique).

Then review that plan against the brief before building: if any part reads like the generic default you would produce for any similar page, revise that part, say what you changed and why. Only then write code.

## Restraint and self-critique

Spend your boldness in one place. Let one element be the memorable thing, keep everything around it quiet and disciplined, and cut any decoration that does not serve the brief. Build to a quality floor: responsive, visible keyboard focus, reduced motion respected, visually accessible, harmonious palettes. Critique your own work as you build, taking screenshots to review — a picture is worth 1000 tokens. Chanel's advice: before leaving the house, take a look in the mirror and remove one accessory.

## More on writing in design

Words appear in a design to make it easier to understand and use. Write from the end user's perspective, in plain language. Use active voice. A CTA says exactly what happens when it is used. Keep tone conversational: plain verbs, sentence case, no filler. Let each written element do exactly one job. Never invent metrics or testimonials.
