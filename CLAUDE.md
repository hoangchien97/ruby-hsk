# Ruby HSK Landing — Claude Guide

## Project Mission
Build a mobile-first, SEO-friendly landing site for Ruby HSK — a Chinese-language and HSK exam-prep center with one lead instructor: **Ms. Trần Hồng Ngọc**.

## Stack
Next.js App Router · TypeScript · Tailwind CSS · SCSS · next-intl (VI/EN) · next-themes (light/dark) · Supabase · Vercel · MCP Stitch · MCP Supabase

## Non-Negotiable Rules
- This is a **public SEO website**, not a SaaS/dashboard/admin portal.
- Mobile-first for every page and component.
- Header logo is **icon-only**, no wordmark.
- The VI/EN toggle must keep the current route.
- Theme switch is a single icon button only.
- Mobile must have a bottom navigation + a "More" bottom sheet.
- Ruby HSK has **one** lead instructor (Ms. Trần Hồng Ngọc) — never fabricate a multi-teacher grid.
- Only use colors from the design tokens — no ad-hoc colors outside the token set.
- Never run destructive Supabase operations (DROP/TRUNCATE/bulk delete) without explicit confirmation.
- Never commit secrets (API keys, service role keys, `.env` files).
- Never add a new UI library without approval.

Full details live in `.claude/rules/*.md` — always apply those rules alongside this file.

## Folder Conventions
- App routes: `src/app/[locale]/**` (App Router, i18n via the `[locale]` segment)
- Components: `src/components/**` (the official convention — do NOT use `src/components_v2`)
- i18n logic: `src/i18n/` (`routing.ts`, `navigation.ts`, `request.ts`) — messages at `src/messages/{vi,en}.json`
- Styles/tokens: `src/styles/design-tokens.scss` + `src/app/globals.scss`
- Supabase client: `src/lib/supabase/` (`client.ts` exists; add `server.ts` when a Server Component/Route Handler needs it)
- Plan/audit docs: `docs/{audit,plan,design,seo,database,deploy}/`
- Stitch design reference: `Stitch_Ruby_HSK_HTML/` — **use the `vibrant_academic_ivory` variant** (matches the mandated palette below). The earlier `ruby_hsk_scholar` variant/palette was removed from the repo and is no longer in use.

## Design Tokens (source of truth: `src/styles/design-tokens.scss`)
- Primary: `#b52330` (deep coral red — CTAs, active nav, headings)
- Secondary: `#785a00` / container `#ffd167` (sunlight yellow)
- Tertiary: `#006c4f` / container `#00a87d` (mint green)
- Background/surface: `#fdf9f4` (ivory cream)
- Never hardcode hex values in components — always reference the CSS variables (`var(--color-*)`, `var(--radius-*)`, `var(--shadow-*)`).

## Commands
```
npm install       # install dependencies
npm run dev       # dev server (Turbopack)
npm run typecheck # tsc --noEmit
npm run lint      # next lint
npm run build     # production build
npm run start     # run the production build
```

## Required Workflow
1. Read the relevant files before editing — never assume structure.
2. Make a short plan for the change.
3. Do the smallest, safest step first.
4. Run `typecheck`/`build` when the change affects the build.
5. Update `docs/` when architecture/SEO/database changes.

## MCP Usage
- **Stitch MCP**: extract design context, map screens → routes, tokens, component inventory. (If the server reports a schema error, see `docs/design/00-stitch-design-integration-plan.md`.)
- **Supabase MCP**: inspect schema, propose migrations. **Read-only only**, unless the user explicitly confirms running a migration.

## Output Style
- Write project documentation (`.md` files) in **English** — this keeps future Claude Code context/prompt size smaller than mixed-language docs.
- Conversational replies to the user can stay in whichever language they use.
- Keep changes focused and scoped to what was asked — no over-engineering.
- Keep the UI consistent with the Vibrant Academic Ivory style (warm, academic, high-circularity radii) — never a dashboard/SaaS look.
