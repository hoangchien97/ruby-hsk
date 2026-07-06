# 00 — Stitch design integration plan (Vibrant Academic Ivory)

> **Palette note (2026-07-06):** this plan originally targeted a "Ruby HSK Scholar / Luminous Education" palette (`#804237`/`#E78F65`/`#191211`/`#F9F5F0`) sourced from a `Stitch_Ruby_HSK_HTML/ruby_hsk_scholar/` export. That export has since been **deleted from the repo**, and `src/styles/design-tokens.scss` now implements the **Vibrant Academic Ivory** palette instead (`#b52330` primary, `#fdf9f4` ivory background — see `.claude/rules/ui-design-rules.md`). This document has been updated to reflect Vibrant Academic Ivory as the current, correct target; only `Stitch_Ruby_HSK_HTML/vibrant_academic_ivory/` exists in the repo today.

## 1. Stitch MCP connection status (checked 2026-07-03)

```
claude mcp list
stitch: https://stitch.googleapis.com/mcp (HTTP) - ! Connected · tools fetch failed

claude mcp get stitch
Status: ! Connected · tools fetch failed
Issue: can't resolve reference #/$defs/ScreenInstance from id #
```

- The HTTP handshake succeeded and the API key (`X-Goog-Api-Key`) was accepted at the transport layer — **this was not a bad-key or missing-permission error**.
- The specific error `can't resolve reference #/$defs/ScreenInstance from id #` is an **invalid JSON Schema returned by the Stitch server itself** when Claude Code called `tools/list` — at least one tool's schema referenced `$ref: "#/$defs/ScreenInstance"` but the corresponding `$defs` entry didn't exist/resolve in that schema document. This is a **bug on Stitch's (Google's) MCP server**, not a local configuration issue.
- Result at the time: **no `mcp__stitch__*` tool was available** in the session (`ToolSearch` confirmed an empty namespace) until Google fixed the schema at `https://stitch.googleapis.com/mcp`.
- **Not fixable from our side:** rotating the API key or re-adding the server would not fix this, since the cause is the server's returned schema, not key/auth.
- **2026-07-06 note:** several `mcp__stitch__*` tools now appear in this session's deferred tool list, suggesting the schema issue may have been resolved since. Re-run `claude mcp get stitch` to confirm current status before assuming it's still broken.
- **Fallback while blocked:**
  1. Report the issue to Stitch (Google) support if a channel is available.
  2. Periodically retry via `claude mcp get stitch` — if Google fixes the schema, `Status` will flip to `✔ Connected` and the tools will appear automatically via `ToolSearch`, with no reconfiguration needed.
  3. In the meantime, if the user has Stitch screenshots/exports, paste them directly into the chat (the Read tool supports images) as a manual reference for Phase 2 instead of calling the MCP.

## 2. Design token extraction plan (once Stitch MCP is working)

For each relevant Stitch screen, call the matching tool (the exact tool names will be confirmed once `tools/list` succeeds — expected to be something like `get_design_context`/`get_screenshot`/`inspect_screen`) to extract:

| Token group | What to extract | Compare against |
|---|---|---|
| Colors | primary, secondary, tertiary, background, surface, border, muted, gold/accent, dark-mode state | `src/styles/design-tokens.scss` (`:root` and `.dark`) |
| Typography | font family, scale (h1–h6, body, caption), font-weight, line-height | Currently only `--font-sans` exists — no dedicated type scale yet, Tailwind defaults are used via classes (`text-4xl`, `font-black`, ...) |
| Spacing | spacing scale, if Stitch defines its own outside Tailwind defaults | Currently uses Tailwind's default spacing |
| Radius | xl/2xl/3xl | `--radius-xl/2xl/3xl` already exist, verify exact values |
| Shadows | soft, button, card | `--shadow-soft`, `--shadow-button` already exist |
| Buttons | primary/secondary/ghost, hover/active/disabled states | `src/components/ui/button.tsx` |
| Cards | glass-card, feature card, course card | `.glass-card` (globals.scss), `FeatureGrid` (`sections/cards.tsx`), course card in `courses/page.tsx` |
| Forms | input, textarea, checkbox, focus state | inputs/textareas are currently inline in `contact/page.tsx`, no reusable `Input`/`Textarea` component yet |
| Header | desktop nav, sticky behavior, icon-only logo | `src/components/layout/header.tsx` |
| Mobile bottom nav | 4 items + More, active state | `src/components/layout/mobile-bottom-nav.tsx` |
| Mobile more bottom sheet | animation, item list | the `open && <div>...` block in `mobile-bottom-nav.tsx` |
| Legal layout | sticky table of contents + content | `src/components/legal/legal-page.tsx` |
| Loading animation | icon bounce + dot pulse | `src/components/loading/loading-logo.tsx` |

**Workflow:** for each group, pull `get_design_context`/a screenshot of the matching Stitch node, compare values (hex, px, rem) against the current code, log the diff, then apply in Phase 2 (don't change code during this audit/plan step).

## 3. Stitch screen → Next.js route mapping

| Stitch screen | Route | Current file |
|---|---|---|
| Home | `/[locale]` | `src/app/[locale]/page.tsx` |
| Courses | `/[locale]/courses` | `src/app/[locale]/courses/page.tsx` |
| About | `/[locale]/about` | `src/app/[locale]/about/page.tsx` |
| Contact | `/[locale]/contact` | `src/app/[locale]/contact/page.tsx` |
| Privacy Policy | `/[locale]/privacy` | `src/app/[locale]/privacy/page.tsx` |
| Terms of Service | `/[locale]/terms` | `src/app/[locale]/terms/page.tsx` |
| Coming Soon | `/[locale]/coming-soon` | `src/app/[locale]/coming-soon/page.tsx` |
| 404 | `not-found.tsx` | `src/app/[locale]/not-found.tsx` (localized) + `src/app/not-found.tsx` (global, redirects to `/vi`) |
| Loading | `loading.tsx` + `LoadingLogo` | `src/app/[locale]/loading.tsx` + `src/components/loading/loading-logo.tsx` |
| Mobile bottom navigation | (component, not a separate route) | `src/components/layout/mobile-bottom-nav.tsx`, rendered in `[locale]/layout.tsx` |
| Mobile more bottom sheet | (component, not a separate route) | the sheet section inside `mobile-bottom-nav.tsx` |

No separate route is needed for Tablet — tablet is a responsive breakpoint of the same Home/Courses/About/Contact routes (per the original requirement: tablet only covers 4 pages, no dedicated route).

## 4. Principles for applying Stitch styles to code

1. Don't change component structure just because Stitch lays it out differently — prefer changing tokens (color/spacing/radius) first, and only change DOM structure when the layout is genuinely different.
2. The header logo is **always icon-only** — if Stitch shows a version with text, only take the icon.
3. Keep the color tone locked to the Vibrant Academic Ivory palette: `#b52330` (primary), `#785a00`/`#ffd167` (secondary), `#006c4f`/`#00a87d` (tertiary), `#fdf9f4` (background) — if Stitch shows a different tone, ask the user before changing the base tokens.
4. Never copy a "SaaS/dashboard" style wholesale — per the "no SaaS/coding/dashboard visual style" requirement, keep the warm, educational spirit.

## 5. Immediate next steps (before Phase 2 code)

- [ ] Confirm current Stitch MCP status via `claude mcp get stitch` (tools may already be available again — see the 2026-07-06 note in §1).
- [ ] Once Stitch MCP works, re-run `ToolSearch` to get the real tool names and add a "how to actually call the tools" section to this doc.
- [ ] While blocked, use pasted Stitch screenshots as a manual reference for Phase 2.
