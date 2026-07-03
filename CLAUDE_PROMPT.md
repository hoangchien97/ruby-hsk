# Prompt for Claude Code

You are a senior Next.js architect. Build a production-ready base boilerplate for Ruby HSK, a SEO-friendly website for a Chinese learning / HSK center. The current center has one main teacher: Trần Hồng Ngọc.

## Required stack target

- Next.js App Router
- TypeScript
- Tailwind CSS
- SCSS
- next-intl for i18n with VI/EN routes
- next-themes for light/dark theme
- Supabase database integration placeholder
- Mobile-first responsive CSS

## Pages

Desktop:
- Home
- Courses
- About
- Contact
- Privacy Policy
- Terms of Service
- 404
- Coming Soon
- Loading screen

Tablet:
- Home
- Courses
- About
- Contact

Mobile:
- Home
- Courses
- About
- Contact
- Privacy Policy
- Terms of Service
- 404
- Coming Soon
- Mobile bottom navigation
- Mobile more bottom sheet
- Loading screen

## Important rules

- Mobile version must be complete.
- Mobile pages must include header, full content, compact/footer, bottom navigation, and contact quick actions when applicable.
- Header logo is icon-only.
- Add VI/EN language toggle.
- Add single icon light/dark theme toggle.
- Use `src/components` for new components.
- Use Supabase only as database client placeholder for now.
- Use SEO metadata per page where possible.
- Follow Ruby HSK Scholar color tone: #804237, #E78F65, #191211, #F9F5F0.
- Do not create a SaaS/coding/dashboard visual style.
