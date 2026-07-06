# Skill: Responsive QA

## Purpose
Run a full responsive check before considering a page/component "done".

## When to use
- After implementing/refactoring a page or layout component.
- Before merging/deploying.

## Check at 3 breakpoints
- Mobile: 375px
- Tablet: 768px
- Desktop: 1440px

## Checklist
- [ ] Header: icon-only logo renders correctly, desktop nav hidden below `md`, sticky behavior doesn't jump the layout.
- [ ] Mobile bottom navigation: all 5 items render correctly, active state matches the route, doesn't cover page-end content (`.page-shell` has enough padding-bottom).
- [ ] More bottom sheet: opens/closes correctly, closes on outside tap, no scroll bugs while open.
- [ ] Floating contact buttons: don't overlap the bottom nav on mobile, sensible position on desktop.
- [ ] Contact form: inputs are full-width on mobile, no horizontal overflow, clear labels/placeholders.
- [ ] Legal pages (Privacy/Terms): sticky table of contents works on desktop, collapses to a plain list on mobile if needed.
- [ ] Loading screen: renders centered, no jump on route change.
- [ ] No horizontal scroll/overflow at any breakpoint.
- [ ] Touch targets ≥ 44px for every button on mobile.

## Output
- Record any bugs found + fix them directly, or file a separate task for larger fixes.
