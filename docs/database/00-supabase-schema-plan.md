# 00 — Proposed Supabase schema for Ruby HSK Landing

> **No migration was run as part of this document.** This is a schema proposal for user review.
> Supabase project ref at the time (from `.mcp.json`): `vqukxdeymnmweacovmup`.
>
> **2026-07-06 status note:** a completion report at the repo root (`phase5-6-completion-report.md.resolved`) confirms this migration has been **applied and seeded** on project `Ruby-HSK` (`vqukxdeymnmweacovmup`, `ap-south-1`): `course_categories` (4 rows), `courses` (4 rows), `teacher_profile` (Ms. Trần Hồng Ngọc's bio/certs/experience), `testimonials` (3 rows), `faqs` (4 rows), `site_settings` (phone/email/Zalo/Facebook/address), and `contact_submissions` (anon insert-only, no public SELECT, as designed). `src/lib/supabase/types.ts` also lists `newsletter_subscribers` and `page_metadata`. `legal_documents` was not created (legal content stayed static, per §2.8). Treat the tables/RLS in §2 below as implemented rather than merely proposed; still run a read-only Supabase MCP check (`list_tables`, or equivalent) before any further schema change, since this doc has not been re-verified against the live database since it was written.

## 1. Supabase MCP connection status (as of writing)

```
claude mcp list
supabase: https://mcp.supabase.com/mcp?project_ref=vqukxdeymnmweacovmup (HTTP) - ! Needs authentication
```

- Supabase MCP was added to `.mcp.json` (project scope) and approved at the project level, but the server requires an **OAuth login** (not a static API key) → no `mcp__supabase__*` tool was available (`ToolSearch` confirmed empty) until login completed.
- `claude mcp login supabase` was attempted — it opens an OAuth flow to `https://api.supabase.com/v1/oauth/authorize` (scopes: `organizations:read projects:read projects:write database:read database:write ...`) and requires **opening a browser to log in/authorize**, then redirects to `http://localhost:<port>/callback`.
- **This cannot be completed from an environment without an interactive terminal/browser** (e.g. running via an agent/CI). **The user needs to run the following command themselves**, in a real terminal (VS Code's integrated terminal or a system terminal that can open a browser):

  ```bash
  claude mcp login supabase
  ```

  Follow the on-screen instructions: a browser opens automatically (or copy the printed URL), log into Supabase, authorize the app, and the terminal will confirm success once you return.
- After logging in, run `claude mcp list` again to confirm the status changed to `✔ Connected`, then use the read tools (e.g. `list_tables`, `execute_sql` in SELECT mode) to check what tables the project already has before finalizing any migration.
- Until logged in, the schema below is a proposal based on business requirements (read from the existing `page.tsx` files + the original brief), **not yet confirmed against whether the Supabase project was empty or already had tables**.
- Required principle: **Supabase MCP is read-only** during audit/planning; never run `CREATE TABLE`/`ALTER`/`DROP` via MCP until the user explicitly confirms in Phase 6.

## 2. Proposed tables

### 2.1 `teacher_profile`
Teacher profile — currently just one lead teacher (Ms. Trần Hồng Ngọc), but modeled as a table so it can expand later.

| Field | Type | Note |
|---|---|---|
| `id` | `uuid` PK default `gen_random_uuid()` | |
| `slug` | `text` unique | for a teacher detail page URL, if one exists |
| `full_name` | `text` not null | "Trần Hồng Ngọc" |
| `title` | `text` | e.g. "Chinese teacher, HSK exam-prep specialist" |
| `bio_vi` | `text` | |
| `bio_en` | `text` | |
| `avatar_url` | `text` | |
| `years_experience` | `smallint` | |
| `certifications` | `text[]` | |
| `is_active` | `boolean` default `true` | |
| `created_at` / `updated_at` | `timestamptz` default `now()` | |

- **Index:** unique on `slug`.
- **RLS:** public read where `is_active = true`; write is admin-only (service role, or a dedicated role via Supabase Auth later).
- **Maps to:** `about/page.tsx`.

### 2.2 `course_categories`
Groups courses by HSK level (1-2, 3-4, 5-6, Conversation, ...).

| Field | Type | Note |
|---|---|---|
| `id` | `uuid` PK | |
| `slug` | `text` unique | e.g. `hsk-1-2` |
| `name_vi` / `name_en` | `text` | |
| `sort_order` | `smallint` default `0` | |

- **RLS:** public read; admin write.
- **Maps to:** the filter sidebar in `courses/page.tsx` (which used to hardcode `['Tất cả trình độ', 'HSK 1 - HSK 2', ...]`).

### 2.3 `courses`

| Field | Type | Note |
|---|---|---|
| `id` | `uuid` PK | |
| `slug` | `text` unique not null | for a future `/courses/[slug]` URL |
| `category_id` | `uuid` FK → `course_categories.id` | |
| `title_vi` / `title_en` | `text` not null | |
| `description_vi` / `description_en` | `text` | used for SEO + the `Course` JSON-LD description |
| `level_tag` | `text` | e.g. "HSK 3-4" shown as a badge |
| `cover_image_url` | `text` | |
| `duration_weeks` | `smallint` | |
| `price_note` | `text` | tuition may change/require a consultation, so free text instead of a fixed number |
| `is_published` | `boolean` default `true` | |
| `sort_order` | `smallint` default `0` | |
| `created_at` / `updated_at` | `timestamptz` default `now()` | |

- **Index:** unique `slug`; index on `category_id`; index on `is_published`.
- **RLS:** public read where `is_published = true`; admin write.
- **Maps to:** `courses/page.tsx` (replacing the hardcoded `const courses = [...]` list).

### 2.4 `testimonials`
No UI existed for this yet at the time, but it's a standard fixture for an education landing site — proposed for Home or About.

| Field | Type | Note |
|---|---|---|
| `id` | `uuid` PK | |
| `student_name` | `text` not null | |
| `content_vi` / `content_en` | `text` not null | |
| `rating` | `smallint` check `1..5` | |
| `avatar_url` | `text` | |
| `is_published` | `boolean` default `true` | |
| `sort_order` | `smallint` default `0` | |

- **RLS:** public read where `is_published = true`; admin write.
- **Maps to:** needs a new UI section in Phase 4 (Home or About) — no testimonial section existed in code at the time.

### 2.5 `faqs`
Needed for the `FAQPage` JSON-LD (Phase 5) and the FAQ UI (the `Home.faq` message key already existed but had no renderer at the time).

| Field | Type | Note |
|---|---|---|
| `id` | `uuid` PK | |
| `question_vi` / `question_en` | `text` not null | |
| `answer_vi` / `answer_en` | `text` not null | |
| `page_scope` | `text` | e.g. `home`, `courses` — to render the right FAQ per page |
| `sort_order` | `smallint` default `0` | |
| `is_published` | `boolean` default `true` | |

- **RLS:** public read where `is_published = true`; admin write.
- **Maps to:** Home (the `Home.faq` key existed in messages but had no component) or Courses.

### 2.6 `contact_submissions`
Data from the contact form (`contact/page.tsx` — at the time, the form didn't submit anywhere; it was static UI only).

| Field | Type | Note |
|---|---|---|
| `id` | `uuid` PK | |
| `full_name` | `text` not null | |
| `phone` | `text` not null | |
| `email` | `text` | |
| `goal` | `text` | maps to the "learning goal" textarea |
| `source_locale` | `text` | `vi`/`en` — which language version the visitor was on |
| `status` | `text` default `'new'` | `new` / `contacted` / `closed` |
| `created_at` | `timestamptz` default `now()` | |

- **Index:** index on `created_at` (sort/filter by time), index on `status`.
- **RLS:** **insert-only for `anon`** (the client may only `INSERT`, never `SELECT`/`UPDATE`/`DELETE`); reading/managing happens only via service role or a future admin dashboard.
- **Maps to:** `contact/page.tsx`.
- **Security note:** this table holds personal data (name, phone, email) — RLS must stay strict, no public read.

### 2.7 `site_settings`
Shared configuration (hotline, Zalo, Messenger, address, ...) — at the time hardcoded in `src/config/site.ts` and `floating-contact.tsx` (`#` placeholders).

| Field | Type | Note |
|---|---|---|
| `key` | `text` PK | e.g. `contact.phone`, `contact.zalo_url`, `contact.messenger_url`, `contact.email`, `address` |
| `value` | `text` | |
| `updated_at` | `timestamptz` default `now()` | |

- **RLS:** public read (this is public information); admin write.
- **Maps to:** `src/config/site.ts` (now `src/lib/constants/site.ts`), `FloatingContact`, `Footer`, the Contact sidebar — can keep a static fallback in code so the page doesn't go blank if the table is empty.

### 2.8 `legal_documents` (optional — only create if legal content needs versioning/audit history)

| Field | Type | Note |
|---|---|---|
| `id` | `uuid` PK | |
| `type` | `text` | `privacy` / `terms` |
| `locale` | `text` | `vi` / `en` |
| `version` | `text` | e.g. `2026-07-03` |
| `content_html` | `text` | |
| `published_at` | `timestamptz` | |

- **RLS:** public read for published documents; admin write.
- **Maps to:** `privacy/page.tsx`, `terms/page.tsx`.
- **Recommendation:** only create this table if Ruby HSK needs a change history for its terms; otherwise keep the content static in `messages/*.json` or a component — simpler, fewer tables. *(Not present in `src/lib/supabase/types.ts` as of 2026-07-06 — appears to still be static content.)*

## 3. Proposed migration order (once approved)

1. `course_categories` (no dependencies)
2. `courses` (depends on `course_categories`)
3. `teacher_profile`
4. `testimonials`
5. `faqs`
6. `site_settings`
7. `contact_submissions`
8. `legal_documents` (if needed)

## 4. RLS overview

| Table | Public SELECT | Public INSERT | Admin write |
|---|---|---|---|
| `course_categories` | ✅ | ❌ | ✅ (service role) |
| `courses` | ✅ (`is_published=true` only) | ❌ | ✅ |
| `teacher_profile` | ✅ (`is_active=true` only) | ❌ | ✅ |
| `testimonials` | ✅ (`is_published=true` only) | ❌ | ✅ |
| `faqs` | ✅ (`is_published=true` only) | ❌ | ✅ |
| `site_settings` | ✅ | ❌ | ✅ |
| `contact_submissions` | ❌ | ✅ (anon insert-only) | ✅ (read/update via service role) |
| `legal_documents` | ✅ (published only) | ❌ | ✅ |

## 5. Before running the real migration (Phase 6)

- [ ] User runs `claude mcp login supabase` themselves in a terminal with browser access to complete OAuth (cannot be done via an agent/non-interactive TTY).
- [ ] Use Supabase MCP's read tools (once approved) to check whether the current project already has tables with matching names, to avoid conflicts.
- [ ] User confirms the table list in §2 (in particular: is `legal_documents` needed, is `testimonials` needed from day one).
- [ ] Prepare `SUPABASE_SERVICE_ROLE_KEY` (not in `.env.example` at the time) if server-side writes are needed (e.g. processing `contact_submissions` via a Route Handler instead of directly from the client).
