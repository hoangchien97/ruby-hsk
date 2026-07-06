# Ruby HSK Landing

SEO-friendly, mobile-first landing site for Ruby HSK — a Chinese-language and HSK exam-prep center.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- SCSS support
- next-intl: VI/EN routing and messages
- next-themes: light/dark theme icon switch
- Supabase: content tables (courses, FAQs, testimonials, teacher profile, site settings) + contact/newsletter form submissions
- Mobile-first responsive layout

## Pages

- `/[locale]` Home
- `/[locale]/courses`
- `/[locale]/about`
- `/[locale]/contact`
- `/[locale]/privacy`
- `/[locale]/terms`
- `/[locale]/coming-soon`
- 404 Not Found
- Loading screen

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000/vi`.

## Notes

- Components live in `src/components` (do not use `src/components_v2`).
- Public landing content is static-ready and SEO-oriented.
- See `CLAUDE.md` and `.claude/rules/*.md` for the full set of project conventions and rules.
