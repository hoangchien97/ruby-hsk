# Skill: Implement Page

## Purpose
Implement or refactor a specific route/page under `src/app/[locale]/**`.

## When to use
- Creating a new page, or editing content/layout on an existing one (Home, Courses, About, Contact, Privacy, Terms, 404, Coming Soon).

## Steps
1. Read the matching design reference under `Stitch_Ruby_HSK_HTML/<screen>_desktop_light/` and `<screen>_mobile_light/` (if present).
2. Read the existing message keys for that page in `src/messages/vi.json` + `en.json` — add missing keys, never hardcode new text.
3. Read existing shared components (`src/components/layout/**`, `src/components/ui/**`, `src/components/sections/**`) before writing a new component.
4. Implement mobile-first: write mobile CSS/classes first, then extend to `md`/`lg` breakpoints.
5. Add `generateMetadata` (title, description, canonical, vi/en alternates) — see `.claude/rules/seo-rules.md`.
6. Check all 3 breakpoints: 375 / 768 / 1440.
7. Run `npm run typecheck` and `npm run build` once done.

## Rules
- Never fabricate a teacher profile — only Ms. Trần Hồng Ngọc.
- Use design tokens, never hardcode hex colors.
- Content must be SEO-friendly (no placeholders once a page is considered "done").

## Output
- Updated page code + updated message keys + complete metadata.
