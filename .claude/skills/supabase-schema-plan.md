# Skill: Supabase Schema Plan

## Purpose
Propose/adjust the Supabase schema safely, without breaking existing data.

## When to use
- Before adding a new table or changing an existing one.

## Steps
1. Use Supabase MCP in read-only mode (`list_tables` or equivalent) to check the current schema — never guess.
2. Cross-check against the proposal in `docs/database/00-supabase-schema-plan.md` (tables: `courses`, `course_categories`, `teacher_profile`, `testimonials`, `faqs`, `contact_submissions`, `newsletter_subscribers`, `site_settings`, `legal_documents`).
3. Propose fields/indexes/RLS for any table to add/change.
4. Write the SQL migration as a **draft** (not run yet) — in a doc or an unapplied `.sql` file.
5. Present the draft to the user and wait for explicit confirmation before applying.
6. If approved, apply the migration via MCP or the Supabase dashboard — always re-verify with a read query afterward.

## Required checks
- **Never run** `CREATE TABLE`/`ALTER`/`DROP` without explicit user confirmation.
- Never delete existing tables/data.
- RLS must be defined at the same time as the table — never leave a table with default public read/write.
- Tables holding personal data (`contact_submissions`, `newsletter_subscribers`) → insert-only for anon.

## Output
- Migration draft (SQL) + updated `docs/database/00-supabase-schema-plan.md`.
