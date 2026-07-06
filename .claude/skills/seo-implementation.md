# Skill: SEO Implementation

## Purpose
Roll out full technical SEO infrastructure for one route or the whole site.

## When to use
- When adding a new page, or auditing/completing SEO site-wide (Phase 5).

## Steps
1. Define `generateMetadata` for the route: `title`, `description`.
2. Add `alternates.canonical` + `alternates.languages` (vi/en).
3. Add `openGraph` + `twitter` metadata.
4. Make sure `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/manifest.ts` exist and cover the right public routes (exclude `coming-soon` from the sitemap).
5. Add the appropriate JSON-LD (`Organization`/`EducationalOrganization`, `Course`, `FAQPage`, `BreadcrumbList`) — only once real content exists.
6. Check heading hierarchy (one H1 per page) and internal links between related pages.
7. Run `npm run build` and check the generated sitemap is valid.

## Required checks
- No keyword stuffing (see the keyword list in `.claude/rules/seo-rules.md`).
- Never embed JSON-LD with fake/placeholder data.
- `NEXT_PUBLIC_SITE_URL` must be the real domain for production builds.

## Output
- Updated metadata/schema code + a note in `docs/seo/00-seo-implementation-plan.md` if the scope changed.
