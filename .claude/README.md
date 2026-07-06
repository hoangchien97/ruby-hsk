# `.claude/` — structure guide

This directory holds all of Claude Code's operating docs for the Ruby HSK Landing project, supplementing the root `CLAUDE.md` (the short, top-level file).

## Structure

- **`CLAUDE.md` (at the repo root, not inside `.claude/`)** — the short guide that's always loaded first. Contains the mission, stack, the most critical rules, folder conventions, commands, and workflow.
- **`rules/*.md`** — **always-on** constraints for the whole project: business rules, UI/design, SEO, i18n, Supabase, git. Read the relevant one before touching that area of the code.
- **`skills/*.md`** — reusable workflows for specific task types (audit, implement a page/component, convert from Stitch, SEO, Supabase schema, responsive QA, deploy). Each skill has a clear Purpose/Steps/Output.

> Note: there is no `prompts/` folder in this project. If pre-written phase prompts are added later, document them here.

## About `skills/supabase` and `skills/supabase-postgres-best-practices`

These two folders are **third-party skills** (from `supabase/agent-skills`, managed via `skills-lock.json` at the repo root, symlinked from `.agents/skills/`) — not skills authored by this project. Don't hand-edit their contents; if they need updating, use the skill-install mechanism instead.

## Principles

- **No secrets** in any file under `.claude/` (API keys, tokens, service role keys, ...).
- Private/local files (e.g. `settings.local.json`) are already declared in the root `.gitignore` — never commit them.
- `rules/` and `skills/` (aside from the third-party symlinks noted above) are committed to git — they're shared documentation for the whole team.
