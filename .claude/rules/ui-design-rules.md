# UI / Design Rules

## Source design system
- Follows the **Vibrant Academic Ivory** style.
- Official reference: `Stitch_Ruby_HSK_HTML/vibrant_academic_ivory/` (each `*_page_*` subfolder has `code.html` + `screen.png`).
- The earlier `ruby_hsk_scholar` variant/palette (`#804237` brown-based) was removed from the repo and is **no longer used** — do not resurrect it or its color values.

## Design tokens (required)
- Primary: `#b52330` (deep coral red)
- Primary hover: `#9e1e2a`
- Secondary: `#785a00` / secondary container `#ffd167` (sunlight yellow)
- Tertiary: `#006c4f` / tertiary container `#00a87d` (mint green)
- Background / surface: `#fdf9f4` (ivory cream)
- Tokens live in `src/styles/design-tokens.scss` (`--color-primary`, `--color-secondary`, ...) — check against `Stitch_Ruby_HSK_HTML/vibrant_academic_ivory/` before adding new tokens; don't change the hex values above without asking the user first.
- No ad-hoc colors outside the token set — every color in a component must reference a CSS variable or Tailwind token.

## Visual style
- Warm, academic, "cute but not childish" — light glassmorphism (`.glass-card`), soft rounded corners, primary-tinted shadows (never pure black shadows).
- No strong dashboard/dev-tool visuals (no neon, no dark-terminal look).

## Header
- Logo is **icon-only**, no wordmark (`LogoIcon` follows this correctly today — keep the `aria-label` + `sr-only` text pattern for a11y).

## Mobile bottom navigation (5 items required)
1. Home
2. Courses
3. About Ruby
4. Contact
5. More

## More bottom sheet (must contain)
- Legal links (Privacy, Terms)
- Quick contact link / "start learning" CTA
- VI/EN toggle
- Theme icon toggle
- (When available) Zalo/Messenger/Phone shortcuts

## Theme switch
- **Single icon button only** (Sun/Moon) — no dropdown, no separate light/dark/system tri-state.

## Forbidden
- No colors outside the token set.
- No SaaS/dashboard/admin styling.
- No new UI library (component primitives) without approval — prefer extending `src/components/ui/`.
