# 00 — Ruby HSK Landing codebase audit

> Audit date: 2026-07-03. Performed on branch `main`, latest commit at the time `e90cef1 init project`.
> Goal: understand the full current state before planning implementation — **no code was changed during this step**.
>
> **2026-07-06 update:** several open questions below have since been resolved by later commits — see the inline notes. This file is otherwise kept as a historical snapshot; treat any status/finding below as "true as of 2026-07-03" rather than the current state. Re-run the Audit Project skill if you need a fresh snapshot.

## 1. Actual stack overview

| Component | Declared in `package.json` | Notes |
|---|---|---|
| Framework | `next@latest` (App Router) | uses `next dev --turbopack` |
| Language | TypeScript, `strict: true` | standard Next.js `tsconfig.json`, alias `@/* -> ./src/*` |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) + SCSS (`sass`) | Tailwind v4 uses `@import "tailwindcss"` in `globals.scss`, no `tailwind.config.*` (Tailwind v4 is config-less by default) |
| i18n | `next-intl@latest` | VI/EN, `localePrefix: 'always'` |
| Theme | `next-themes@latest` | class-based dark mode via `@custom-variant dark` |
| Database | `@supabase/supabase-js@latest` | at the time: only a browser client placeholder, **no schema/tables yet** (resolved — see note below) |
| Icons | `lucide-react` | used in nav, toggles, floating contact |
| Utils | `clsx` + `tailwind-merge` (the `cn()` helper) | |
| Actual package manager | **npm** (`package-lock.json` present) | README instructed `pnpm install` at the time — **mismatched the real lockfile** (fixed since — README now says npm) |

Missing at the time: test runner, Storybook, CI config, `public/` (no favicon/OG image/manifest icon yet), `tailwind.config.ts`.

## 2. Folder structure at the time

```
ruby-hsk-landing/
├─ messages/                     # next-intl message JSON — at ROOT, not under src/ (moved since — see §3)
│  ├─ en.json
│  └─ vi.json
├─ middleware.ts                 # next-intl middleware, matcher: '/', '/(vi|en)/:path*'
├─ next.config.ts                # withNextIntl plugin, images.remotePatterns open to all https
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx              # empty RootLayout, just returns children (no <html>)
│  │  ├─ not-found.tsx           # global 404 -> redirect('/vi')
│  │  ├─ globals.scss
│  │  └─ [locale]/
│  │     ├─ layout.tsx           # <html>, static metadata, Header/Footer/MobileNav/FloatingContact
│  │     ├─ not-found.tsx        # localized 404 UI
│  │     ├─ loading.tsx
│  │     ├─ page.tsx             # Home
│  │     ├─ about/page.tsx
│  │     ├─ contact/page.tsx
│  │     ├─ courses/page.tsx
│  │     ├─ privacy/page.tsx
│  │     ├─ terms/page.tsx
│  │     └─ coming-soon/page.tsx
│  ├─ components/                # ⚠️ code actually uses src/components, NOT src/components_v2
│  │  ├─ layout/ (header, footer, mobile-bottom-nav, floating-contact, theme-toggle, language-toggle)
│  │  ├─ logo/logo-icon.tsx
│  │  ├─ sections/ (hero, cards)
│  │  ├─ providers/app-providers.tsx
│  │  ├─ legal/legal-page.tsx
│  │  ├─ loading/loading-logo.tsx
│  │  └─ ui/button.tsx
│  ├─ config/site.ts
│  ├─ i18n/ (routing.ts, navigation.ts, request.ts)
│  ├─ lib/ (utils.ts, supabase/client.ts)
│  └─ styles/design-tokens.scss
├─ .mcp.json                     # supabase MCP (project scope)
├─ .env.example
├─ CLAUDE_PROMPT.md              # original prompt used to generate the boilerplate (removed since)
└─ README.md
```

### Key findings (mismatches to decide on before coding)

1. **`src/components` vs `src/components_v2`** — `README.md` and `CLAUDE_PROMPT.md` both said "Components are created in `src/components_v2`", but all real code lived in `src/components`. This was stale documentation from the boilerplate-generation step, not a reflection of the real code. → See the decision in §4. **Resolved:** `src/components` is the confirmed official convention; `README.md` no longer mentions `components_v2`, and `CLAUDE_PROMPT.md` has since been removed from the repo entirely.
2. **Package manager** — README said `pnpm install` but the repo only ever had `package-lock.json` (npm), no `pnpm-lock.yaml`. → Per the "never change the package manager" rule, npm was kept and the README was corrected. **Resolved.**
3. **`messages/` at repo root** — valid for next-intl, but inconsistent with the "everything lives under `src/`" convention the project otherwise follows (app, components, i18n, lib, config, styles). See the analysis in §3. **Resolved:** `messages/` has since been moved to `src/messages/`.
4. **`RootLayout` (`src/app/layout.tsx`) has no `<html>`/`<body>`** — technically valid since `[locale]/layout.tsx` is the layout that actually renders `<html>`, but worth remembering when adding root-level special files (`sitemap.ts`, `robots.ts`, `manifest.ts` live under `src/app/` root and are unaffected since they bypass the layout tree).
5. **`src/app/not-found.tsx` (global) hard-redirects to `/vi`** — doesn't detect locale from the `accept-language` header; acceptable for an MVP but worth flagging in the SEO/UX plan.
6. **No `public/` directory** — meant no favicon, `apple-icon`, or default OG image, an SEO/manifest gap from day one.
7. **No page had its own `generateMetadata`** — the whole site had a single static `metadata` object in `[locale]/layout.tsx`, shared by every page, with no per-page title/description, no `alternates`, no OpenGraph/Twitter card. **Resolved:** all 6 route pages now define `generateMetadata`.
8. **No `sitemap.ts`, `robots.ts`, `manifest.ts`** — flagged for Phase 5. **Resolved:** all three now exist under `src/app/`.
9. **Supabase**: only had a client-side `createBrowserSupabaseClient()`, no server client, no tables yet, `.env.example` only had `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY` (no `SUPABASE_SERVICE_ROLE_KEY`, which was fine at that stage since it wasn't needed yet). **Partially resolved:** `src/lib/supabase/types.ts` now lists `courses`, `course_categories`, `teacher_profile`, `testimonials`, `faqs`, `contact_submissions`, `newsletter_subscribers`, `site_settings`, `page_metadata` — the schema in `docs/database/00-supabase-schema-plan.md` appears to have been largely implemented since this audit.
10. **Several pages had placeholder/hardcoded content** (e.g. contact info "0000 000 000", "hello@rubyhsk.vn", a hardcoded course list in `courses/page.tsx`, repeated placeholder legal copy) — needed real SEO content or Supabase data (Phase 4/6).
11. **Header/Footer nav had hardcoded Vietnamese labels** (footer: "Trang", "Học tiếng Trung", "Pháp lý") not going through `useTranslations` — inconsistent when switching to EN.
12. **Every tablet view shares its route with desktop/mobile** (no separate route per breakpoint — expected, since tablet/mobile/desktop are responsive breakpoints of the *same* route, not separate routes). This must be guaranteed via responsive CSS, not by splitting routes.

## 3. `messages/` at root vs `src/messages/`

### State at the time
- `src/i18n/request.ts` imported via a relative path: `../../messages/${locale}.json` → i.e. up two levels from `src/i18n/` to the repo root, into `messages/`.
- This is a valid pattern and is what next-intl's own official example uses (the `create-next-app` template keeps `messages/` at the root).
- No other tool (ESLint, Jest, Vercel build) depended on this location besides `request.ts`.

### Comparison (as assessed at the time)

| Criteria | Keep `messages/` at root | Move to `src/messages/` |
|---|---|---|
| Technically valid | ✅ Works fine | ✅ Works fine (one import path change) |
| Consistency with the current convention (everything under `src/`) | ❌ Inconsistent — `app`, `components`, `i18n`, `lib`, `config`, `styles` are all under `src/`, only `messages/` sat outside | ✅ Fully consistent |
| Common in the Next.js + next-intl community | Both are common; many larger boilerplates with a `src/` folder still keep `messages` outside it | Also common, especially once a project already uses `src/` everywhere |
| Cost to change | None | Very low — one import line + moving two JSON files |
| Risk | None | Essentially none (no other tool depended on the old path) |

### Recommendation (at the time)
Move `messages/` into `src/messages/` for full consistency with the "everything lives under `src/`" convention.

**Status: done.** `messages/` now lives at `src/messages/{vi,en}.json`, and `src/i18n/request.ts` imports from `../messages/${locale}.json`.

## 4. `src/components` vs `src/components_v2` decision

- All real code uses `src/components`. No file ever existed under `src/components_v2`.
- `README.md` and `CLAUDE_PROMPT.md` were **initial planning docs** that had gone stale relative to the real code.
- Renaming `src/components` → `src/components_v2` would bring no technical benefit and only risk (dozens of imports to fix) just to match one stale doc line.

**Decision:** keep `src/components` as the project's official convention. `README.md` and `CLAUDE.md` reflect this (no more mentions of `components_v2`), and `CLAUDE_PROMPT.md` has since been deleted from the repo.

## 5. tsconfig / alias check

- `@/*` → `./src/*`: works for every current import (`@/components/...`, `@/i18n/...`, `@/lib/...`).
- No dedicated alias for `messages` — not required since only one place imports it.

## 6. Overall risk summary (at the time)

| Risk | Level | Handling note |
|---|---|---|
| No `public/` (favicon, OG image, manifest icons) | Medium | Handled in Phase 2/5 |
| Metadata shared across the whole site | High (direct SEO impact) | Handled in Phase 5 |
| Placeholder content (contact, courses, legal) | High (thin-content/legal risk) | Needs real content from the client before launch |
| Supabase MCP "Pending approval" | Low — temporarily blocked MCP-based DB inspection | Needed the user to run `claude` to approve the connection |
| Stitch MCP "Connected · tools fetch failed" | Medium — blocked automated design-context extraction | Needed the Stitch API key/endpoint checked |
| Wrong package manager in docs (pnpm vs actual npm) | Low | Fixed in docs, lockfile untouched |

## 7. Audit conclusion

At the time, the codebase was a **working boilerplate** (dev server, i18n routing, theming, basic responsive layout) but **not production-ready** in terms of SEO metadata, real content, a complete design system matching Stitch, and real Supabase integration (only a placeholder existed). Nothing needed to be deleted — everything could be kept and extended per the phases in `docs/plan/00-master-implementation-plan.md`. As of 2026-07-06, several of those phases (SEO metadata/sitemap/JSON-LD, Supabase schema, real contact/teacher content) already show meaningful progress — see the inline "Resolved" notes above.
