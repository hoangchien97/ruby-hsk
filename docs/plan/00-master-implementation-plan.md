# 00 — Master Implementation Plan: Ruby HSK Landing

> This document summarizes the full implementation roadmap, based on the findings in
> [`docs/audit/00-current-state-audit.md`](../audit/00-current-state-audit.md).
> Related docs: [design](../design/00-stitch-design-integration-plan.md),
> [seo](../seo/00-seo-implementation-plan.md), [database](../database/00-supabase-schema-plan.md),
> [deploy](../deploy/00-vercel-deployment-plan.md).
>
> **Status when written: PLAN ONLY — no phase had been executed yet.** Each phase needed user confirmation before coding.
>
> **2026-07-06 status note:** a completion report found at the repo root (`phase5-6-completion-report.md.resolved`) confirms Phase 5 (SEO infrastructure) and Phase 6 (Supabase integration) are **done** — seeded tables (`course_categories`, `courses`, `teacher_profile`, `testimonials`, `faqs`, `site_settings`, `contact_submissions`), per-route `generateMetadata`/OG/Twitter, JSON-LD (Organization, Course ×4, FAQPage, Breadcrumb), `sitemap.ts`, `robots.ts`. Real contact/teacher content (Phase 4) is also in place in `src/lib/constants/site.ts`. Remaining known gaps per that report: production `NEXT_PUBLIC_SITE_URL` still needs the real domain, the OG image is AI-generated and needs a real branding asset, Search Console verification isn't added yet, and PWA icons (`icon-192.png`/`icon-512.png`) don't exist yet. The phase statuses below were not otherwise re-verified line by line — re-run the Audit Project skill for a full current-state snapshot if needed.

## Principles across every phase

- Never delete files. Never change the package manager (keep npm). Never change the database without an explicit request.
- Don't add a new UI library unless there's a strong reason (Tailwind + SCSS + lucide-react is sufficient for now).
- Mobile-first is required for every new component/layout.
- New components go under `src/components` per the existing convention (see audit §4).
- All display text must go through `next-intl` (`useTranslations`/`getTranslations`) — don't hardcode Vietnamese strings in JSX like some places used to (footer, courses).
- Supabase MCP is read-only unless the user explicitly requests running a migration.

---

## Phase 0 — Baseline audit
**Status: DONE** (see `docs/audit/00-current-state-audit.md`)

- **Goal:** Understand the full current state, structure, MCP status, and gaps before coding.
- **Tasks:** Read package.json, next.config.ts, middleware.ts, src/app, src/i18n, messages, design-tokens.scss, components, .mcp.json, README, CLAUDE_PROMPT.md; check MCP connectivity.
- **Files touched:** None (read-only).
- **Acceptance criteria:** Audit doc lists every mismatch, gap, and open decision.
- **Risk/notes:** Supabase MCP was "Pending approval", Stitch MCP was "Connected · tools fetch failed" — both needed user action before Phase 2/6 could use them fully.

---

## Phase 1 — Architecture cleanup
- **Goal:** Clean up doc/code mismatches and lock in conventions before expanding further.
- **Tasks:**
  1. Confirm with the user: keep `src/components` (recommended) or rename everything to `src/components_v2`.
  2. If keeping `src/components`: update `README.md`, `CLAUDE_PROMPT.md` to remove mentions of `components_v2`.
  3. Confirm with the user: move `messages/` → `src/messages/` (recommended) or keep it at root.
  4. If moving: move the two JSON files + update the one import in `src/i18n/request.ts`.
  5. Fix the README "Quick start" section to match the real npm setup (drop the `pnpm` instructions).
  6. Create `public/` with a temporary favicon (to be replaced with a real asset in Phase 2 once the official Stitch logo is available).
- **Files to touch:** `README.md`, `CLAUDE_PROMPT.md`, `src/i18n/request.ts`, `messages/*` (moved), `public/favicon.ico` (new).
- **Acceptance criteria:** `npm run dev`, `npm run typecheck`, `npm run lint` run clean after the change; no doc still mentions `components_v2`/`pnpm`.
- **Risk/notes:** Low risk, mechanical change. Needed user confirmation before moving `messages/` since it's a structural decision.
- **Status: done.** `src/components` is the confirmed convention, `messages/` moved to `src/messages/`, README fixed to npm, `CLAUDE_PROMPT.md` has since been removed entirely.

---

## Phase 2 — Design tokens & base UI
- **Goal:** Sync `design-tokens.scss` and the Tailwind theme with the **Vibrant Academic Ivory** style extracted from Stitch.
- **Tasks:**
  1. Use MCP Stitch to pull design context for the main screens (see `docs/design/00-stitch-design-integration-plan.md`).
  2. Cross-check the current tokens (`--color-primary: #b52330`, `--color-secondary: #785a00`, ...) against the Stitch tokens, and update if they differ.
  3. Add any missing tokens: typography scale, spacing scale if Stitch defines its own outside Tailwind defaults.
  4. Extend `src/components/ui/` with any missing primitives Stitch calls for (e.g. badge, input, card variant) — only add what a page actually needs.
  5. Update `LogoIcon` if Stitch has a different official logo icon (still icon-only, no text).
- **Files to touch:** `src/styles/design-tokens.scss`, `src/components/ui/*`, `src/components/logo/logo-icon.tsx`.
- **Acceptance criteria:** Tokens in code match Stitch 1:1 (color, radius, shadow); no Storybook, so acceptance = visual comparison of Home/Courses against Stitch screenshots.
- **Risk/notes:** Depends on MCP Stitch working (it was erroring with "tools fetch failed" at the time this was written — if still broken, use Stitch screenshots as a manual reference instead).
- **Status: largely done.** `design-tokens.scss` already implements the Vibrant Academic Ivory palette (`#b52330` primary, `#fdf9f4` ivory background, etc.) as the mandated token set — see `.claude/rules/ui-design-rules.md`.

---

## Phase 3 — Layout components
- **Goal:** Finalize Header/Footer/MobileBottomNav/More bottom sheet to match Stitch, fully localized.
- **Tasks:**
  1. Header: keep the icon-only logo, verify spacing/breakpoints against Stitch (desktop nav hidden below `md`, already correct).
  2. Footer: move hardcoded labels ("Trang", "Học tiếng Trung", "Pháp lý") to `useTranslations` (add new keys to `messages/*.json`).
  3. Mobile bottom nav: keep 4 items + "More" button (already present), verify icons/labels match Stitch.
  4. More bottom sheet: a basic sheet already exists (Privacy/Terms/Contact + toggles) — add more items if the Stitch design calls for them (e.g. social links, hotline).
  5. `FloatingContact`: update to real Zalo/Messenger/Phone links once official contact info is available (currently `#` placeholders).
- **Files to touch:** `src/components/layout/*`, `messages/vi.json`, `messages/en.json`.
- **Acceptance criteria:** No hardcoded Vietnamese strings left in layout components; mobile bottom sheet matches Stitch; manually tested at 360px, 768px, 1280px viewports.
- **Risk/notes:** Needed real contact info (phone, Zalo, Messenger) from the client before go-live.
- **Status: appears mostly done** — `src/lib/constants/site.ts` now has real contact info, address, and teacher bio.

---

## Phase 4 — Page implementation
- **Goal:** Fill in real (non-placeholder) content for every page across desktop/tablet/mobile, per the route mapping in `docs/design/00-stitch-design-integration-plan.md`.
- **Tasks:**
  1. Home (`/[locale]`): replace placeholder stats ("10,000+ students"...) with real numbers, or clearly mark them as illustrative if no official numbers exist yet.
  2. Courses (`/[locale]/courses`): move the hardcoded course list to Supabase (coordinate with Phase 6) or keep it static if there's no DB yet — but it must be real SEO content (detailed course descriptions, no placeholders).
  3. About (`/[locale]/about`): add Ms. Trần Hồng Ngọc's official profile (experience, certifications, teaching method) — needs input from the client.
  4. Contact (`/[locale]/contact`): wire the contact form into Supabase's `contact_submissions` (Phase 6) or an email service; use real contact info.
  5. Privacy/Terms: real legal content, not repeated "policy content coming soon" placeholders.
  6. Coming Soon, 404, Loading: keep the UI, just polish with the new tokens from Phase 2.
- **Files to touch:** every `src/app/[locale]/**/page.tsx`, `src/components/sections/*`, `messages/*.json`.
- **Acceptance criteria:** No "placeholder"/"pending official profile" text visible to end users (unless the client explicitly accepts keeping it temporarily); every page is responsive at all 3 required breakpoints.
- **Risk/notes:** This phase depends most heavily on **real content from the client** (Ruby HSK) — it can't be 100% finished by code alone.
- **Status: significant progress** — real contact info, teacher bio, and stats exist in `src/lib/constants/site.ts`; contact/about/courses page components have since been implemented (see recent commits).

---

## Phase 5 — SEO implementation
- **Goal:** Fully roll out technical SEO infrastructure (metadata, sitemap, robots, JSON-LD, OG/Twitter).
- **Tasks:** Full detail in `docs/seo/00-seo-implementation-plan.md`. Summary:
  1. Per-route `generateMetadata` (title template, description, canonical, VI/EN alternates).
  2. `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/manifest.ts`.
  3. JSON-LD: Organization, EducationalOrganization, Course (per course), FAQPage, BreadcrumbList.
  4. Create `public/` assets: favicon, apple-icon, 1200x630 default OG image.
  5. Proper alt text for every content-bearing image/icon.
- **Files to touch:** `src/app/sitemap.ts` (new), `src/app/robots.ts` (new), `src/app/manifest.ts` (new), every `page.tsx` (add `generateMetadata`), `src/lib/seo/*` (new helper, e.g. `jsonld.ts`), `public/*`.
- **Acceptance criteria:** Lighthouse SEO ≥ 95; `next build` generates a valid sitemap; Google Rich Results Test passes for JSON-LD; every page has canonical + VI/EN `hreflang`.
- **Risk/notes:** Needed the official `NEXT_PUBLIC_SITE_URL` (real domain) before setting `metadataBase` for production.
- **Status: done.** `sitemap.ts`, `robots.ts`, `manifest.ts`, per-route `generateMetadata`, and `src/lib/seo/jsonld.ts` all exist and are wired into the pages.

---

## Phase 6 — Supabase integration
- **Goal:** Connect real data for Courses/Testimonials/FAQ/Contact form, replacing static placeholders.
- **Tasks:** Full schema detail in `docs/database/00-supabase-schema-plan.md`. Summary:
  1. Use Supabase MCP (read-only) to check what tables the current project already has (once the MCP connection is approved).
  2. Propose migrations for: `courses`, `course_categories`, `teacher_profile`, `testimonials`, `faqs`, `contact_submissions`, `site_settings`.
  3. Write `src/lib/supabase/server.ts` (server client, for Server Components/Route Handlers) alongside the existing `client.ts`.
  4. Update `courses/page.tsx`, `about/page.tsx`, `contact/page.tsx` to fetch from Supabase once tables are ready.
  5. RLS: public read for public content tables, insert-only (no read) for `contact_submissions` from the client.
- **Files to touch:** `src/lib/supabase/server.ts` (new), `src/app/[locale]/courses/page.tsx`, `about/page.tsx`, `contact/page.tsx`, migration SQL (proposed, not run).
- **Acceptance criteria:** Migration reviewed and approved by the user before applying; no destructive query ever runs automatically; the contact form can write one test record.
- **Risk/notes:** **Never auto-run migrations.** Supabase MCP was "Pending approval" at the time — needed the user to run `claude` to approve before any `mcp__supabase__*` tool could be used.
- **Status: schema largely done.** `src/lib/supabase/types.ts` already lists `courses`, `course_categories`, `teacher_profile`, `testimonials`, `faqs`, `contact_submissions`, `newsletter_subscribers`, `site_settings`, `page_metadata` — confirm current RLS policies via a read-only MCP check before assuming this phase is fully closed.

---

## Phase 7 — Responsive / mobile acceptance
- **Goal:** Ensure mobile is fully complete for every required page per the original requirements.
- **Tasks:**
  1. Re-check every mobile page (Home, Courses, About, Contact, Privacy, Terms, 404, Coming Soon) at 360–430px viewports.
  2. Confirm the bottom nav doesn't cover page-end content (already has `.page-shell { padding-bottom: 96px }` — verify it's enough for long content).
  3. Confirm the More bottom sheet: focus trap, closes on outside tap (already works), closes on Esc (missing — add it).
  4. Confirm `FloatingContact` doesn't overlap the bottom nav (currently `bottom-28 md:bottom-6` — verify correctness).
  5. Confirm the tablet breakpoint (Home/Courses/About/Contact) per the tablet-specific requirements.
- **Files to touch:** `src/components/layout/mobile-bottom-nav.tsx` (add Esc handler), scattered CSS fine-tuning.
- **Acceptance criteria:** Manually tested in Chrome DevTools responsive mode at 360px/768px/1024px/1440px for every required page; no horizontal overflow; touch targets ≥ 44px.
- **Risk/notes:** Mostly manual QA, low code risk.

---

## Phase 8 — QA / lint / typecheck / build
- **Goal:** Ensure code quality before deploying.
- **Tasks:**
  1. `npm run lint`, `npm run typecheck`, `npm run build` must all pass clean.
  2. Check for leftover `console.log`/dead code.
  3. Basic a11y check: alt text, aria-label (some already present, e.g. `aria-label="Ruby HSK home"`), color contrast against the dark/light tokens.
- **Files to touch:** Whatever surfaces issues.
- **Acceptance criteria:** All 3 commands exit 0; no serious warnings.
- **Risk/notes:** No test runner in the current stack — if needed, this is the point to decide whether to add Playwright/Vitest (never add a new library without the user asking, per the rules).

---

## Phase 9 — Vercel deployment
- **Goal:** Deploy to production on Vercel.
- **Tasks:** Full detail in `docs/deploy/00-vercel-deployment-plan.md`. Summary:
  1. Connect the GitHub repo to a Vercel project.
  2. Declare production env vars: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
  3. Set the custom domain, redirect `/` → default locale (already handled by middleware).
  4. Verify the preview deployment before promoting to production.
- **Files to touch:** None — Vercel dashboard/CLI config only.
- **Acceptance criteria:** Preview URL works for both locales; the production domain returns 200 for `/`, `/vi`, `/en`.
- **Risk/notes:** This is a public, shared-system action — **needs explicit user confirmation before promoting to the real production domain**.

---

## Phase 10 — Post-deploy checklist
- **Goal:** Confirm production works correctly and is indexable.
- **Tasks:**
  1. Submit the sitemap to Google Search Console (single property, or per-locale properties if needed).
  2. Run the Rich Results Test against the real production URL for JSON-LD.
  3. Run Lighthouse/PageSpeed Insights against the real production URL (real Core Web Vitals, not localhost).
  4. Confirm `robots.txt`/`sitemap.xml` are reachable on the real domain.
  5. Monitor Vercel Analytics/Speed Insights (if enabled) for the first 1–2 weeks.
- **Files to touch:** None.
- **Acceptance criteria:** Sitemap accepted by Google with no errors; no page unexpectedly `noindex`ed.
- **Risk/notes:** Needs DNS already pointed at the real domain before submitting to Search Console.

---

## Recommended execution order

```
Phase 0 (done) → Phase 1 → Phase 2 → Phase 3 → Phase 4 ⇄ Phase 6 (in parallel, since Courses/About/Contact depend on both)
              → Phase 5 (can run in parallel with Phase 4, technically independent)
              → Phase 7 → Phase 8 → Phase 9 → Phase 10
```

Each phase originally required the user to say "OK, proceed with Phase N" before coding started, per the "do not start implementation yet" instruction in the source brief. Given the 2026-07-06 status notes above, several phases are now ahead of that gate — confirm actual state with a fresh audit rather than assuming the plan-time status still holds.
