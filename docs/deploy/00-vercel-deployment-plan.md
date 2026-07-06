# 00 — Vercel deployment plan for Ruby HSK Landing

> No actual deployment action is taken in this document — this is a plan, and it requires user confirmation before execution (deployment is a public, shared-system action).

## 1. Prerequisites before deploying

- [ ] Phases 1–8 (architecture cleanup → QA/build) are complete and `npm run build` runs clean locally.
- [ ] A real domain exists (or use a temporary `*.vercel.app` domain for the preview stage).
- [ ] A real Supabase project exists (already provisioned: project ref `vqukxdeymnmweacovmup`) with a schema reviewed per `docs/database/00-supabase-schema-plan.md`.
- [ ] Real (non-placeholder) content exists for every required page, per Phase 4.

## 2. Connecting the repo to Vercel

1. Import the GitHub repository into Vercel (Next.js framework preset — Vercel auto-detects the App Router).
2. Root Directory: keep the default (repo root), since `package.json` is at the root.
3. Build command: default `next build` (matches `"build": "next build"` in `package.json`).
4. Install command: **keep `npm install`** — do not switch to `pnpm`/`yarn` (per the "never change the package manager" rule; it also matches the real `package-lock.json`, not the outdated `pnpm` instructions the README used to have).
5. Node.js version: use whichever LTS version Vercel defaults to for the latest Next.js (check `engines` in `package.json` if a hard pin is ever needed — there isn't one today; add it in Phase 1 if you want to lock a version).

## 3. Environment variables (Production + Preview)

| Key | Source | Required before deploying to production |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | real domain (e.g. `https://rubyhsk.vn`) | ✅ — used for `metadataBase`, sitemap, canonical URLs |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project settings | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project settings | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase project settings (if Phase 6 needs a server client) | Only needed if a Route Handler processes `contact_submissions`/admin data server-side |

- Set these separately for **Production** and **Preview** environments in the Vercel dashboard — Preview can share the same Supabase project (public-read tables carry no risk) but consider a separate Supabase project for Preview if test data gets written to `contact_submissions`.
- Never commit real values into `.env.example` (it currently only has empty keys — correct, keep it that way).

## 4. Domain & routing

- The existing middleware (`middleware.ts`) already handles locale redirects via the matcher `['/', '/(vi|en)/:path*']` — no extra redirect config needed on Vercel.
- Set the custom domain in Vercel → the domain provider (CNAME/A record per Vercel's instructions).
- Confirm the `www` vs non-`www` decision with the client (Vercel supports redirecting a secondary domain to the primary one).

## 5. Preview → Production flow

1. Every PR/branch gets an automatic Preview Deployment (Vercel default).
2. Review the Preview URL for **both locales** (`/vi`, `/en`) before merging — check in particular:
   - Header/Footer/MobileNav render in the correct language.
   - Theme toggle light/dark has no hydration errors (already has a `mounted` guard in `ThemeToggle` — keep this pattern).
   - The Contact form has no console errors (even before it's wired to real Supabase in Preview).
3. Merging into `main` triggers a Production Deployment.
4. **Only promote the official domain after explicit user confirmation** — this is a public action and needs sign-off first.

## 6. Post-deploy checks (ties into Phase 10)

- [ ] `https://<domain>/` redirects correctly to the default locale (`vi`).
- [ ] `https://<domain>/sitemap.xml` and `/robots.txt` are reachable (once Phase 5 is complete).
- [ ] `https://<domain>/vi` and `/en` return 200, no hydration errors in the console.
- [ ] OG image/preview renders correctly when sharing a link (Facebook/Zalo debugger).
- [ ] Run Lighthouse against the real production URL (not localhost) for accurate Core Web Vitals.

## 7. Rollback plan

- Vercel keeps deployment history — if production breaks, use "Instant Rollback" to the previous deployment directly from the dashboard, no git revert needed.
- Never use `git push --force`/`git reset --hard` to roll back — always roll back via the Vercel dashboard or a new revert commit.
