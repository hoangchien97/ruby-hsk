# 01 — Mobile-First Design System Audit (Vibrant Academic Ivory)

> Audit date: 2026-07-14. Scope: every page (Home, Courses, About, Contact, Privacy, Terms, 404, Coming Soon, Loading) and every shared component (Header, Footer, Mobile Bottom Nav + More sheet, Course Card, Feature/CTA/Teacher cards, FAQ, forms, buttons, inputs, badges, loading). Read-only audit — **no code was changed as part of this document.**
>
> **Palette correction:** this audit was requested against "allowed colors #804237/#E78F65/#F9F5F0/#191211." That is the retired **Ruby HSK Scholar** palette (see `.claude/rules/ui-design-rules.md`). The project's actual, intentionally-adopted system is **Vibrant Academic Ivory** (`--color-primary:#b52330`, `--color-bg:#fdf9f4`, etc., in `src/styles/design-tokens.scss`) — confirmed by this prompt's own closing line naming Vibrant Academic Ivory as the target language. This audit is written against the real, current tokens.
>
> Method: read every page/component in full; cross-referenced every spacing/typography/color/radius/shadow class against the actual token definitions in `src/styles/design-tokens.scss` and `src/app/globals.scss`.

---

## 1. Design System Audit Report

### 1.1 What already exists (source of truth)

**Color tokens** (`design-tokens.scss`) — well-formed, M3-style token set: `--color-primary` (#b52330) with `-hover`/`-container`/`-fixed`/`-fixed-dim` variants, same pattern for secondary (#785a00) and tertiary (#006c4f), plus `--color-bg` (#fdf9f4), a full surface-container ramp, outline/outline-variant, and error tokens. Dark-mode overrides exist for background/surface/text tokens but **not** for `--color-secondary-container`/`--color-primary-container` — those stay at their light-mode brightness in dark mode (pre-existing gap, not caused by this audit).

**Radius tokens**: `--radius-sm:4px`, `--radius-md:8px`, `--radius-xl:12px`, `--radius-2xl:24px`, `--radius-3xl:32px`, `--radius-full`.

**Shadow tokens**: `--shadow-card`, `--shadow-coral`, `--shadow-button`, `--shadow-soft` — all primary-tinted `rgba(181,35,48,…)`.

**Typography scale** (`globals.scss`, CSS classes, not Tailwind theme): `text-display-lg`(48/56/700), `text-display-sm`(40/48/700), `text-headline-lg`(32/40/700), `text-headline-lg-mobile`(28/36/700), `text-title-md`(20/28/600), `text-body-lg`(18/28/400), `text-body-md`(16/24/400), `text-body-sm`(14/20/400), `text-label-lg`(14/20/600), `text-label-sm`(12/16/500).

**The critical fact driving most findings below**: Tailwind's own default radius/shadow/font-size utilities were **never remapped** to these tokens (`@theme` in `globals.scss` only overrides `--breakpoint-xl`). So `rounded-2xl` (Tailwind default = 16px) and `rounded-[var(--radius-2xl)]` (token = 24px) are two *different* things that look like the same intent. Same for `rounded-3xl` (Tailwind = 24px) vs `--radius-3xl` (32px), and for `shadow-sm/md/lg/xl` (Tailwind) vs `--shadow-card/coral/button/soft` (token). This single fact explains the large majority of "inconsistency" findings — it's not that engineers picked random values, it's that two same-named-but-different systems coexist and nothing prevents mixing them.

### 1.2 Coverage check — no new broken classes found

Earlier work this session already found and fixed 6 undefined custom-scale classes in About/Courses components (`text-title-lg`, `text-title-xl`, `text-label-md`, `text-display-md`, plus added the missing `text-display-sm`/`text-body-sm`). This audit's fresh sweep of Home, Contact, layout/nav, and UI-primitive files found **zero further undefined custom-scale classes** — that class of bug appears contained to what's already fixed.

---

## 2. Consistency Violations Report

### 2.1 Radius — the single biggest systemic issue

| Value used | What it actually renders as | What the author likely meant |
|---|---|---|
| `rounded-2xl` (Tailwind default) | **16px** | `--radius-2xl` = 24px |
| `rounded-3xl` (Tailwind default) | **24px** | `--radius-3xl` = 32px |
| `rounded-[2rem]` (raw arbitrary) | 32px (matches `--radius-3xl` numerically) | should be `rounded-[var(--radius-3xl)]` |
| `rounded-[1.5rem]` (raw arbitrary) | 24px (matches `--radius-2xl` numerically) | should be `rounded-[var(--radius-2xl)]` |
| `rounded-[2.5rem]` | 40px | matches **no** token |
| inline `style={{borderTopLeftRadius:'1.25rem'}}` (MobileBottomNav bar) | 20px | matches **no** token |

Occurrences: `hero.tsx:153-154` (a `rounded-[2rem]` card sits next to a `rounded-2xl` inner image — two different radii in the same visual unit), `contact-info-sidebar.tsx:13/34/53` (`rounded-[2rem]` cards) next to `:15/36/54` (`rounded-2xl` icon chips — 32px card containing 16px-radius chips, likely meant 24px), `contact-faq.tsx:45` (bare `rounded-2xl`), `contact-map.tsx:21` (`rounded-[2.5rem]`, matches nothing), `contact-form.tsx:75/96` (`rounded-[2rem]`) vs `:200` (`rounded-[1.5rem]` textarea) vs `:114-179` (`rounded-full` on every other field) — **three different radius treatments across one form**, `mobile-bottom-nav.tsx` alone mixes inline 20px, token-correct `rounded-[var(--radius-xl)]`, bare `rounded-2xl`, bare `rounded-3xl`, `rounded-full`, and `rounded-t-[2.5rem]` — six radius mechanisms in one file. `Card`'s own base (`rounded-[var(--radius-2xl)]`, correct) is routinely overridden at call sites with bare `rounded-3xl`/`rounded-[2rem]` (`course-card.tsx:31`, `courses-hero.tsx:50`).

### 2.2 Shadows — token system bypassed more often than used

Four real tokens exist, but `shadow-sm/md/lg/xl/2xl` (Tailwind defaults) appear at least as often: `header.tsx:28`, `footer.tsx` social icons (which **stack** `shadow-sm` *and* `coral-shadow` redundantly), `contact-faq.tsx:45-46` (zero token shadows in the whole file), `contact-header.tsx:30` (`drop-shadow-2xl`), `mobile-bottom-nav.tsx` (`shadow-2xl`, `shadow-sm` ×2, plus a hand-typed `shadow-[0_-4px_10px_rgba(181,35,48,0.1)]` that duplicates a token's hue without referencing it), `floating-contact.tsx` (`shadow-lg`, despite being exactly the kind of primary CTA `--shadow-button` was made for), `scroll-to-top.tsx` (mixes `shadow-lg` with an arbitrary `shadow-[var(--color-primary)]/25`). `Button`'s `primary` variant mixes a base Tailwind `shadow-lg` with a token `hover:shadow-[var(--shadow-button)]` — base and hover states use two different shadow systems on the same element. `Card`'s `primary` variant and `hover` prop both use Tailwind `shadow-xl` while its `white`/`glass` variants correctly use token shadows.

### 2.3 Typography — scale exists but is inconsistently adopted

- **No component-level primitives consume the custom scale at all**: `Button` uses Tailwind `text-xs/sm/base`; `Badge` uses an arbitrary `text-[11px]` (closest token, `text-label-sm`, is 12/16/500 — Badge uses 11px/800-weight instead).
- **`contact-form.tsx` bypasses the scale entirely** for every heading/button/error string (`text-xl md:text-2xl`, `text-2xl md:text-3xl`, `text-lg`, `text-sm`) — the only page-level form component that does this; every other content block audited uses the token classes correctly.
- **`mobile-bottom-nav.tsx` invents six ad-hoc arbitrary sizes** (`text-[10px]`, `text-[13px]` ×2, `text-[14px]` ×2, `text-[15px]` ×2) instead of the existing `text-label-sm`(12)/`text-label-lg`(14)/`text-body-sm`(14)/`text-body-md`(16) tokens — this is the single most fragmented file in the whole audit for typography.
- **Recurring "override defeats the token" pattern**: applying `text-headline-lg`/`text-body-lg` (which bundle a specific line-height) and then ALSO applying Tailwind's `leading-relaxed`/`leading-tight`/`font-extrabold` on the same element, silently overriding the token's own line-height/weight. Found in `hero.tsx:68`, `why-ruby.tsx:69`, `teacher-section.tsx:38,45`. (This exact pattern was already found and fixed twice in About-page components earlier this session — it's a house style bug, not a one-off.)
- **`md:text-[40px]` arbitrary desktop override on top of `text-headline-lg`**, with no matching line-height override, appears independently in `contact-header.tsx:18` and `contact-faq.tsx:27` — the same anti-pattern already fixed once in `about-teacher-section.tsx` earlier this session, recurring in files that weren't touched then.
- `language-toggle.tsx` and `newsletter-form.tsx`'s error text use Tailwind `text-xs` instead of the token `text-label-sm` — same 12px size, but the token also carries a defined 500-weight that the raw class doesn't.

### 2.4 Color — mostly good, with specific real drift

The overwhelming majority of components correctly reference `var(--color-*)`. Real drift found:
- **`bg-white`/`text-white` used generically** in ~6 places instead of a surface/on-primary token: `hero.tsx` carousel frame, `footer.tsx` social icon buttons, `Button` primary/inverted variants, `Card` primary variant, `teacher-section.tsx` image frame. The site's actual background is cream `#fdf9f4`, not pure white — this is a small but visible drift, most noticeable in dark mode where `bg-white` never adapts while `var(--color-surface-container-lowest)` would.
- `bg-slate-200`/`bg-slate-100` (`hero.tsx`) and `bg-gray-100 dark:bg-gray-800` (`mobile-bottom-nav.tsx:126`) — generic Tailwind grays instead of `--color-surface-container*` tokens; the `gray` one also hardcodes its own `dark:` variant instead of relying on the token system's automatic swap.
- `bg-red-50`/`text-red-600` error banner in `contact-form.tsx:206` — the project already has real `--color-error`/`--color-error-container` tokens, correctly used in `input.tsx`, but this form's error state doesn't use them.
- **Third-party brand colors are inconsistent, not just present** (brand-color use itself is an accepted exception per earlier project decisions): Zalo is exact-hex `#0068FF` in `mobile-bottom-nav.tsx:179`, generic Tailwind `bg-blue-500` in `floating-contact.tsx:6`, and untinted `bg-white` in `footer.tsx:60`. Messenger is exact-hex `#00B2FF` in one file and generic `bg-indigo-500` in another. Same two brands, three different treatments across three files.

### 2.5 Spacing / card padding — no fixed tier system

Section vertical padding is genuinely consistent at `py-16` (64px) across Home/Courses/About sections — good baseline. But:
- `contact-header.tsx` desktop (`pt-12 pb-8`) vs its own mobile block (`pt-8 pb-6`) — not a clean 2:1 scale-down, two independently-chosen numbers for the same section in two duplicated markup blocks.
- `contact-faq.tsx`: `pb-4 md:pb-24` — a 16px→96px jump, steeper than the site's usual 2-step pattern.
- **Card padding has at least 4 distinct values with no tier logic**: `p-6` (why-ruby cards), `p-7` (contact-info-sidebar — an odd value not on any 4px/8px step used elsewhere), `p-8` (learning-paths, course-card, contact-form), `p-10` referenced at some hero-card call sites.
- `Container`'s three `max-w` breakpoints (900/1400/1600px) are hardcoded arbitrary pixels with no corresponding CSS var, while the parallel SCSS `.container` utility (`globals.scss:59-62`) uses a completely different `calc(100% - 32px)` capped-width mechanism — two parallel "container" systems that don't share an implementation.

### 2.6 Touch targets — at least 6 distinct sizes for "small icon button," several under 44px

| Element | Size | Meets 44px? |
|---|---|---|
| Newsletter submit button | `h-9 w-9` = 36px | ❌ |
| Theme toggle | `h-10 w-10` = 40px | ❌ |
| Footer social icons (×3) | `h-10 w-10` = 40px | ❌ |
| Scroll-to-top (mobile) | `w-10 h-10` = 40px | ❌ |
| Language toggle buttons | ~28-35px effective (padding-driven, no fixed size) | ❌ |
| Button `size="sm"` | ~28px tall (py-1.5 + text-xs line-height) | ❌ |
| Floating contact buttons (×3) | `h-11 w-11` = exactly 44px | ✅ (exact minimum) |
| Scroll-to-top (desktop) | `md:w-11 md:h-11` = 44px | ✅ |
| Logo, CTA buttons (`h-12`), stat icon circles | 48px+ | ✅ |
| MobileBottomNav bar items | ~44-48px depending on label line-height, not enforced via `min-h` | ⚠️ borderline |
| MobileBottomNav sheet "pull handle" *visual* affordance | `w-12 h-1.5` = 6px tall visible bar (click area is the whole wrapping row, but the affordance users see to grab is 6px) | ⚠️ affordance mismatch |

### 2.7 Floating action elements physically overlap on mobile

`floating-contact.tsx` (`bottom-28 right-4` on mobile, 3 stacked 44px buttons + 8px gaps) spans roughly `bottom: 112px → 256px`. `scroll-to-top.tsx` (`bottom-24 right-5` on mobile, one 40px button) spans roughly `bottom: 96px → 136px`. These ranges overlap in the `112–136px` band, and the two buttons sit only 4px apart horizontally (`right-4` vs `right-5`) — two independently-built floating stacks that were never checked against each other and can visually collide on a real phone screen.

### 2.8 Four different "this is the active page/item" visual languages

| Where | Mechanism |
|---|---|
| Header desktop nav | 2px coral **underline**, animated via `.nav-link-animated.active` |
| MobileBottomNav bar | Filled **chip**: `bg-primary-container/20` + `border-primary/30` |
| MobileBottomNav "More" drawer grid links | Tinted **card**: `bg-primary-container/5` + `border-primary/30` + a different fill-slide animation class (`.drawer-link-animated`) |
| Language toggle (locale, not page-nav, but same UI role) | **Solid-fill pill**: `bg-primary text-white` |

None of the four reuse each other's implementation, and the two mobile-only treatments (bar chip vs. drawer card) differ from each other in background opacity (20% vs 5%) despite living in the same file.

### 2.9 No safe-area-inset handling anywhere

Verified project-wide: zero occurrences of `env(safe-area-inset-*)` or a `pb-safe`/`pt-safe` utility. `page-shell`'s bottom clearance is a hardcoded `padding-bottom: 64px`; `MobileBottomNav`'s bar sits `fixed bottom-0` with no inset padding; the "More" sheet's bottom content padding is a fixed `pb-6`. On an iPhone with the home-indicator gesture bar, none of this compensates for the extra ~34px system-reserved zone — the bottom nav and any CTA at the bottom of the sheet risk sitting flush against or under the gesture area.

### 2.10 Component-level token drift (two parallel systems)

- **Badge**: the React `Badge` component hardcodes `text-white` for `primary`/`tertiary` variants, while the *parallel* SCSS utility classes `.badge-primary`/`.badge-tertiary` (`globals.scss:182-195`) correctly use `var(--color-on-primary)`/`var(--color-on-tertiary)`. Two badge implementations exist in this codebase and they've drifted from each other.
- **Container**: React component vs. SCSS `.container` utility, as noted in 2.5 — different max-width values, different gutter mechanism.
- **Input**: `contact-form.tsx` hand-rolls every field instead of using `Input`/`Textarea` from `ui/input.tsx`, and diverges in radius (`rounded-full` vs. the shared component's `rounded-[var(--radius-2xl)]`), border opacity (`/30` vs. full), background, padding, placeholder color token, and — most importantly — **has no per-field error state**, relying solely on one non-token-colored global error banner, while `input.tsx` has a proper built-in `error` prop wired to the real error tokens.

### 2.11 Dead code found (not a style violation, but affects audit accuracy)

`contact-map.tsx` lines 35-77 (a "floating info panel" with title, address, and two buttons) are entirely wrapped in a JSX comment — unreachable. (Previously found and already flagged, not re-fixed: `src/components/sections/cards.tsx`'s `FeatureGrid` is also dead code, unused anywhere.)

---

## 3. UI Improvement Report

Ranked by impact × effort:

1. **Stop using bare Tailwind `rounded-2xl`/`rounded-3xl`/`shadow-sm|md|lg|xl` anywhere a design-token equivalent exists.** This is the highest-leverage fix — one grep-and-replace pass (`rounded-2xl`→`rounded-[var(--radius-2xl)]`, `rounded-3xl`→`rounded-[var(--radius-3xl)]`, bare shadows → the matching `--shadow-*` token) resolves the majority of radius/shadow findings across every file at once.
2. **Give `Badge`'s `primary`/`tertiary` variants `var(--color-on-primary)`/`var(--color-on-tertiary)`** to match the SCSS utilities they're supposed to mirror.
3. **Rewire `contact-form.tsx` to use `Input`/`Textarea`/`Select` from `ui/`** instead of hand-rolled fields — this also fixes its missing per-field error states for free (the shared components already support `error` props).
4. **Pick one active-nav-state mechanism and reuse it in all four places** (header underline, bottom-bar chip, drawer card, language pill) — or explicitly decide desktop-underline vs. mobile-chip is intentional and document why, rather than an accidental fourth/fifth variant.
5. **Standardize small-icon-button size to exactly `h-11 w-11` (44px)** everywhere one currently exists at 36/40px (newsletter submit, theme toggle, footer socials, scroll-to-top mobile). Zero visual-design cost, direct accessibility win.
6. **Reconcile `floating-contact.tsx` and `scroll-to-top.tsx` into one coordinated stack** (or explicitly offset one when the other is visible) so they can't overlap.
7. **Pick one brand-color value per third-party icon (Zalo `#0068FF`, Messenger `#00B2FF`) and use it everywhere that icon appears** (`mobile-bottom-nav.tsx`, `floating-contact.tsx`, `footer.tsx` currently disagree).
8. **Adopt a 2-tier card padding system** (e.g. `p-6` compact / `p-8` standard) and remove the odd `p-7` outlier.
9. **Give `Card` and `Container` their tokens** — either delete the parallel SCSS `.container`/`.badge-*` utilities in favor of the React components, or vice versa; right now both exist and disagree.

---

## 4. Mobile UX Improvement Report

1. **Add safe-area-inset-bottom support**: `page-shell`'s `padding-bottom`, `MobileBottomNav`'s bar, and the "More" sheet's bottom padding should all add `env(safe-area-inset-bottom)` (e.g. `padding-bottom: max(16px, env(safe-area-inset-bottom))`), or a single shared `pb-safe` utility class used by all three, so content and the bottom nav aren't cramped against the iPhone gesture bar.
2. **Raise every touch target below 44px** listed in §2.6 to 44×44px minimum — this is the single most concrete, testable mobile-UX fix in the whole audit.
3. **Fix the floating-button overlap** (§2.7) before it's noticed on a real device in QA.
4. **Widen the "More" sheet's pull-handle hit affordance** — either make the visible bar taller (e.g. `h-2` instead of `h-1.5`, still thin visually) or add a visible larger tap zone around it so users can see what's draggable/tappable, not just click it by accident.
5. **`mobile-bottom-nav.tsx`'s `LanguageToggle` is wrapped in `scale-90`** inside the drawer, shrinking an already-small toggle by another 10% — remove the scale-down or give the toggle explicit minimum dimensions first.
6. **Add `aria-expanded`/`aria-controls` to the "More" trigger button and `role="dialog"`/`aria-modal` to the sheet** — currently the sheet opens/closes correctly but has no accessible-dialog semantics for screen readers.
7. **Group the sheet's backdrop-opacity and sheet-transform transitions into one coordinated timing** rather than two independent 300ms transitions that happen to start together but aren't formally linked — low risk today, but fragile if either duration changes later.
8. **Re-check `contact-map.tsx`'s fixed `h-[550px]` iframe** on a small phone (iPhone SE-class, ~667px tall viewport) — 550px leaves very little room for anything else above/below the fold; consider a `vh`-based or smaller-on-mobile height.

---

## 5. Final Design Token System

This section states what the tokens **should** be treated as going forward — the underlying values in `design-tokens.scss`/`globals.scss` are already correct; the fix is in *consumption*, not in redefining new numbers.

### Spacing Scale
| Name | Value | Use |
|---|---|---|
| Section | 64px (`py-16`) | Between major page sections — already the site's de facto standard, keep it |
| Subsection | 32-40px (`py-8`–`py-10`) | Header/intro block within a section |
| Card (standard) | 32px (`p-8`) | Default card padding |
| Card (compact) | 24px (`p-6`) | Denser card grids (feature cards, FAQ items) |
| Content | 16px (`p-4`/`gap-4`) | Inline content spacing, form field gaps |
| Small | 8px (`gap-2`/`p-2`) | Icon-to-label gaps, tight clusters |
| Mobile safe-area | `env(safe-area-inset-bottom)` added on top of the above for any fixed-bottom element | Currently missing everywhere |

Retire the one-off `p-7` and the `pt-12/pb-8` vs `pt-8/pb-6` duplicated-block pattern in favor of one responsive value (`pt-8 md:pt-12 pb-6 md:pb-8`) driven from a single markup block instead of two.

### Typography Scale (already defined — enforce adoption, don't add new sizes)
| Token | Size/Line-height/Weight | Currently under-used by |
|---|---|---|
| `text-display-lg` | 48/56/700 | — |
| `text-display-sm` | 40/48/700 | `contact-header.tsx`/`contact-faq.tsx`'s `md:text-[40px]` arbitrary overrides should become `md:text-display-sm` |
| `text-headline-lg` / `-mobile` | 32/40/700, 28/36/700 | — |
| `text-title-md` | 20/28/600 | `Button`, `contact-form.tsx` headings should adopt this instead of raw Tailwind |
| `text-body-lg` / `text-body-md` / `text-body-sm` | 18/28, 16/24, 14/20 | `Button` (`text-sm`/`text-base`) |
| `text-label-lg` / `text-label-sm` | 14/20/600, 12/16/500 | `Badge` (`text-[11px]`), `mobile-bottom-nav.tsx`'s six arbitrary sizes, `language-toggle.tsx`/`newsletter-form.tsx` (`text-xs`) |

Rule going forward: **never pair a custom-scale class with `leading-*`/`font-*` Tailwind utilities that contradict its own baked-in line-height/weight.** If a different weight is genuinely needed, that's a sign the scale needs a new named variant, not a silent override.

### Color Tokens (current values, confirmed correct — Vibrant Academic Ivory)
Primary `#b52330` / hover `#9e1e2a` / container `#ff5a5f`. Secondary `#785a00` / container `#ffd167`. Tertiary `#006c4f` / container `#00a87d`. Background `#fdf9f4`. Full surface-container ramp + outline/outline-variant + error tokens already defined in `design-tokens.scss` — no new colors needed.
Rule: **`bg-white`/`text-white`/any `slate-`/`gray-`/`red-`/`blue-`/`indigo-` Tailwind default is disallowed** except for the two documented third-party brand exceptions (Zalo `#0068FF`, Messenger `#00B2FF`), which must use the *same* exact hex in every file that renders them.

### Radius Tokens
`--radius-sm` 4px · `--radius-md` 8px · `--radius-xl` 12px · `--radius-2xl` 24px · `--radius-3xl` 32px · `--radius-full`.
Rule: **always reference the radius CSS variable directly (e.g. `rounded-[var(--radius-2xl)]`), never bare `rounded-2xl`/`rounded-3xl`** (they silently mean 16px/24px in Tailwind, not 24px/32px). Treat this as a lint-able pattern if a Tailwind/ESLint rule can be added later.

### Shadow Tokens
`--shadow-card` (ambient card lift) · `--shadow-coral` (branded ambient) · `--shadow-button` (CTA emphasis) · `--shadow-soft` (subtle). Map every current bare `shadow-sm/md/lg/xl/2xl` usage to the nearest of these four; there should be no reason to reach for a Tailwind default shadow in this codebase.

### Container Rules
One mechanism, not two. Recommend keeping the SCSS `.container` utility (`width: min(1400px, calc(100% - 32px))`) as the single source of truth and either deleting the React `Container` component or making it a thin wrapper around the same CSS custom property, so "narrow/default/wide" become named multiples of one base rather than three independent hardcoded pixel values.

### Card Rules
Radius: always `rounded-[var(--radius-2xl)]` (24px) unless a hero/feature card explicitly needs `--radius-3xl` (32px) — never bare `rounded-3xl`/`rounded-[2rem]`. Padding: standard `p-8`, compact `p-6` — no other value. Shadow: `--shadow-card` idle, `--shadow-coral` for branded/featured cards; `hover` lifts via `-translate-y` (already used) rather than swapping to a different, non-token shadow.

### Button Rules
Height scale should be explicit rather than padding-only: sm=40px, md=48px, lg=56px (all ≥44px touch target — retire the current sm that resolves to ~28px, or reserve it strictly for non-touch/desktop-only contexts). All variants get a shadow: none currently applies to `secondary`/`outlined`/`ghost` — either intentionally flat (fine, but confirm) or add `--shadow-soft` uniformly. `text-white` → `var(--color-on-primary)` on `primary`; `bg-white` → `var(--color-surface-container-lowest)` on `inverted`.

### Input Rules
One implementation: `Input`/`Textarea`/`Select` from `ui/`. No page should hand-roll form-field styling. Error state always via the component's built-in `error` prop (which already wires to `--color-error`/`--color-error-container`), never a separate ad-hoc banner with Tailwind red.

### Navigation Rules
Pick one active-state visual language and use it in all four places identified in §2.8 — recommended: the filled-chip pattern already used in `MobileBottomNav`'s bar (it's the most touch/mobile-appropriate), applied consistently to the header's desktop nav, the drawer grid, and the language toggle, replacing the underline/tinted-card/solid-pill variants. Bottom nav bar height stays `h-16`; add safe-area padding below it. Icon size stays `20px` (`h-5 w-5`); label size becomes `text-label-sm` (12px) instead of the current arbitrary `text-[10px]`.
