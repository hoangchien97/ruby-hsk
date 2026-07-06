# Skill: Implement Component

## Purpose
Build a reusable UI component under `src/components/**`.

## When to use
- A new UI primitive/pattern is needed in multiple places (button variant, card, form field, badge, ...).

## Steps
1. Check whether an equivalent component already exists (`src/components/ui/`, `src/components/sections/`, `src/components/layout/`) — prefer extending props over creating a duplicate file.
2. Define props explicitly with TypeScript (interface/type, never `any`).
3. Use design tokens (`var(--color-*)`, `var(--radius-*)`, `var(--shadow-*)`) — never hardcode hex values.
4. Verify it works correctly in both light/dark (check the `.dark` override in `design-tokens.scss`).
5. Mobile-first: base styles for mobile, `md:`/`lg:` overrides after.
6. Add accessible labels/states: `aria-label` for icon-only elements, `aria-hidden` for decorative icons, focus state via the existing `.focus-ring` class.
7. Place it in the correct subfolder by function (`ui/`, `layout/`, `sections/`, `logo/`, `legal/`, `loading/`, `providers/`).

## Output
- New/updated component under `src/components/**`, with a short usage example if the component is non-trivial.
