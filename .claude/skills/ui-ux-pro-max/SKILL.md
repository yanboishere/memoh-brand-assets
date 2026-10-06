---
name: ui-ux-pro-max
description: "UI/UX design intelligence for web, mobile, and desktop. Use when designing, building, reviewing, or fixing interfaces: pages, components, design systems, accessibility, interaction, responsive layout, typography, color, charts. (Core rules; searchable CSV database not installed due to network limits.)"
---

# UI/UX Pro Max — Design Intelligence (core rules)

## Rule Categories by Priority

| Priority | Category | Impact | Key Checks (Must Have) | Anti-Patterns (Avoid) |
|----------|----------|--------|------------------------|------------------------|
| 1 | Accessibility | CRITICAL | Contrast 4.5:1, Alt text, Keyboard nav, Aria-labels | Removing focus rings, Icon-only buttons without labels |
| 2 | Touch & Interaction | CRITICAL | Min size 44×44px, 8px+ spacing, Loading feedback | Reliance on hover only, Instant state changes (0ms) |
| 3 | Performance | HIGH | WebP/AVIF, Lazy loading, Reserve space (CLS < 0.1) | Layout thrashing, Cumulative Layout Shift |
| 4 | Style Selection | HIGH | Match product type, Consistency, SVG icons (no emoji) | Mixing flat & skeuomorphic randomly, Emoji as icons |
| 5 | Layout & Responsive | HIGH | Mobile-first breakpoints, No horizontal scroll | Fixed px container widths, Disable zoom |
| 6 | Typography & Color | MEDIUM | Base 16px, Line-height 1.5, Semantic color tokens | Text < 12px body, Gray-on-gray, Raw hex in components |
| 7 | Animation | MEDIUM | Context-aware timing, Motion conveys meaning | One duration for every transition, No reduced-motion |
| 8 | Forms & Feedback | MEDIUM | Visible labels, Error near field, Helper text | Placeholder-only label, Errors only at top |
| 9 | Navigation Patterns | HIGH | Predictable back, Bottom nav ≤5, Deep linking | Overloaded nav, Broken back behavior |
| 10 | Charts & Data | LOW | Legends, Tooltips, Accessible colors | Relying on color alone to convey meaning |

## Workflow

1. **Analyze requirements**: product type, target audience & context, style keywords, stack.
2. **Generate a design system first** for any new page/project: pattern, style, colors, typography, effects, and anti-patterns to avoid — decided once, before building screens.
3. **Match style to product type**: SaaS/dev-tool products favor dark mode + high information density + monospace accents; consistency over novelty.
4. **Semantic color tokens**: define tokens once (`--color-*`), never raw hex scattered in components.
5. **SVG icons only, never emoji as icons.**
6. **Verify before delivery**: contrast, hierarchy, spacing rhythm, alignment, consistency across the set.

## Key principles for marketing/social graphics (derived)

- One dominant visual anchor per artifact; supporting elements stay quiet.
- Information hierarchy: the one number/claim that matters is unmissable; secondary specs are visually secondary.
- Consistent token system across a series (same palette, type scale, spacing rhythm) while varying structure per artifact.
- Text must remain readable at feed size: high contrast, generous size for key lines.
