# Supabase Rules

- Supabase is the project's official database (current client: `src/lib/supabase/client.ts`).
- Always use **Supabase MCP in read-only mode** first to inspect the current schema/data — never guess the schema without checking it for real.
- **No destructive operations**: no `DROP TABLE`, no `TRUNCATE`, no bulk `DELETE`/`UPDATE` without a clear `WHERE`, and no migration ever runs automatically without explicit user confirmation.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the client/browser — server-side only (Route Handler/Server Action), never in a `NEXT_PUBLIC_*` variable.
- Tables holding personal data (`contact_submissions`, `newsletter_subscribers`): the client may only `INSERT` — never `SELECT`/`UPDATE`/`DELETE`. RLS must block public read.
- The contact form must validate input client-side before submitting (minimum email/phone format checks) — never trust unvalidated input.
- RLS (Row Level Security) must be designed **before** a table goes to production — default posture: public content tables (`courses`, `faqs`, `testimonials`, `teacher_profile`, `site_settings`) get public SELECT with admin-only write.
- Always write a **schema proposal doc** (`docs/database/`) before writing a real SQL migration — never migrate straight from an idea.
- Proposed schema details: `docs/database/00-supabase-schema-plan.md`.
