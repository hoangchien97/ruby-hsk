# 01 — Proposed `newsletter_subscribers` schema

> **No migration was run automatically as part of this document.** This is a schema proposal — the user needs to run the SQL below manually (via the Supabase SQL Editor, or Supabase MCP once `claude mcp login supabase` has been run and `mcp__supabase__*` tools are available) before the "Subscribe for offers" signup in the Footer actually works.

## 1. Background

The Footer has a "Subscribe for offers" block (email newsletter signup). This block has **no** matching file anywhere in `Stitch_Ruby_HSK_HTML/` — there's no official design reference for it; it's based only on a screenshot the user provided. The UI is already implemented in `src/components/layout/newsletter-form.tsx`, but the table to store emails **doesn't exist yet** on Supabase (checked via `src/lib/supabase/types.ts` — the current generated types only include: `contact_submissions`, `course_categories`, `courses`, `faqs`, `page_metadata`, `site_settings`, `teacher_profile`, `testimonials`).

Note: the current session has **no `mcp__supabase__*` tool available** (confirmed via `ToolSearch`) — this migration can't be run automatically. The user needs to run the SQL below manually.

## 2. Proposed `newsletter_subscribers` table

| Field | Type | Note |
|---|---|---|
| `id` | `uuid` PK default `gen_random_uuid()` | |
| `email` | `text` not null, unique | avoids duplicate signups |
| `source_locale` | `text` | `vi` / `en` — which language version the visitor signed up from |
| `status` | `text` default `'subscribed'` | `subscribed` / `unsubscribed` (soft-delete on unsubscribe) |
| `created_at` | `timestamptz` default `now()` | |

- **Index:** unique on `email`.
- **RLS:** same pattern as `contact_submissions` — **insert-only for `anon`**, no public `SELECT`/`UPDATE`/`DELETE`. Reading/managing happens via service role or a future admin dashboard.
- **Security:** email is personal data — never allow public read.

## 3. Proposed SQL migration (run manually, not auto-applied)

```sql
create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source_locale text,
  status text not null default 'subscribed',
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

create policy "Allow public insert"
  on public.newsletter_subscribers
  for insert
  to anon
  with check (true);

-- No SELECT/UPDATE/DELETE policy for anon/authenticated
-- => fully blocked by default (only the service role can read).
```

## 4. After running the migration

- [ ] Run `supabase gen types typescript` (or the MCP equivalent) to refresh `src/lib/supabase/types.ts` — the hand-added `newsletter_subscribers` entry currently in that file should be cross-checked against the real Supabase-generated types.
- [ ] Confirm `NewsletterForm` (`src/components/layout/newsletter-form.tsx`) inserts successfully in a real environment (not just via typecheck).
