# Ruby HSK Next.js Boilerplate

Base boilerplate for a SEO-friendly Chinese learning / HSK center website.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- SCSS support
- next-intl: VI/EN routing and messages
- next-themes: light/dark theme icon switch
- Supabase client placeholder
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
pnpm install
cp .env.example .env.local
pnpm dev
```

Open `http://localhost:3000/vi`.

## Notes

- Components are created in `src/components_v2`.
- Public landing content is static-ready and SEO-oriented.
- Supabase is configured as a placeholder for database usage.
# ruby-hsk
