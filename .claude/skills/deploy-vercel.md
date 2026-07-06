# Skill: Deploy Vercel

## Purpose
Prepare for and safely perform a Vercel deployment.

## When to use
- Before a preview deploy, or before promoting to production.

## Steps
1. Run `npm run typecheck` — must pass clean.
2. Run `npm run lint` — must pass clean.
3. Run `npm run build` — must pass clean; check the sitemap/robots generate correctly.
4. Confirm the required env vars are set on Vercel (Production + Preview): `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (if a server client is in use).
5. Confirm there are no secrets in the code/commits (`git diff`, recent `git log`).
6. Confirm `.gitignore` correctly excludes private/local files.
7. Deploy to Preview first — review both locales (`/vi`, `/en`) on the Preview URL.
8. Only promote to Production after explicit user confirmation (this is a public action affecting the real domain).

## Required checks
- Never auto-promote to production without asking.
- Never change the Vercel install command's package manager without approval (keep `npm install`).

## Output
- `docs/deploy/vercel-deploy-checklist.md` (if a per-deploy checklist is needed) or an updated `docs/deploy/00-vercel-deployment-plan.md`.
