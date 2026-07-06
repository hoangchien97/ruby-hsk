# Git Rules

- Never commit secrets in any form (API keys, service role keys, OAuth tokens...).
- Never commit `.env`/`.env.local`/`.env.*.local` (already in `.gitignore`).
- Never commit `.next/`, `node_modules/` (already in `.gitignore`).
- Never commit Claude private/local files: `.claude/settings.local.json` (already in `.gitignore`).
- Never commit `.mcp.json` while it contains a secret (it currently holds the Stitch API key — already added to `.gitignore`; if the secret is later split out of `.mcp.json`, this decision can be revisited).
- **Current package lock policy**: the project uses `npm` (`package-lock.json` exists on disk) but `package-lock.json` is ignored in `.gitignore` — this is a pre-existing decision, **do not change it** (don't delete the lockfile, don't switch to pnpm/yarn) without explicit user confirmation.
- Do not change the package manager without approval.
- When asked to create a commit: keep commits small and single-purpose, and write messages that explain "why" more than "what".
- When architecture/SEO/database changes, update the corresponding docs under `docs/` in the same change (don't let docs drift from code).
