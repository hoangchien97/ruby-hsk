# Skill: Audit Project

## Purpose
Do a full audit of the project's current state before planning or coding, to avoid assuming an incorrect structure.

## When to use
- Before starting a new major phase.
- When docs (`README.md`, `CLAUDE.md`, `docs/`) are suspected to have drifted from the real code.
- When someone new joins, or work resumes after a long pause.

## Steps
1. Read `package.json` (scripts, dependencies), `next.config.ts`, `middleware.ts`.
2. Read `src/app/**` (route tree), `src/i18n/**`, `src/messages/*.json`.
3. Read `src/styles/design-tokens.scss`, `src/app/globals.scss`.
4. Read `src/components/**` (confirm the actual convention in use).
5. Read `src/lib/supabase/**`, `.mcp.json`.
6. Read the current `README.md` and `CLAUDE.md`, compare against the real code — list every mismatch.
7. Run `claude mcp list` to check MCP connection status.
8. Write the findings into a new audit file.

## Required checks
- Never assume folder names — always Glob/Read the real thing.
- Do not fix mismatches during the audit step itself — only record them.

## Output
- `docs/audit/YYYY-MM-DD-current-state.md` (use the real date of the audit).
