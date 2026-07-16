# AGENTS.md — Ruby HSK

> Concise reference for AI coding agents working on this repo.
> Read this before touching any file.

---

## Project Overview

**Ruby HSK** is a public-facing, SEO-first landing site for a Vietnamese Chinese-language school.
- **Not** a SaaS, dashboard, or admin portal.
- Mobile-first. Bilingual: Vietnamese (`vi`, default) / English (`en`).
- One instructor: **Ms. Trần Hồng Ngọc**. Never fabricate a multi-teacher grid.
- Live URL: `https://rubyhsk.vn`

---

## Tech Stack

| Concern | Technology |
|---|---|
| Framework | Next.js (latest) — App Router |
| Language | TypeScript (strict) |
| Package Manager | npm |
| Dev Server | Turbopack (`npm run dev`) |
| Styling | Tailwind CSS v4 + SCSS (`design-tokens.scss`) |
| i18n | next-intl — locales `['vi', 'en']`, `defaultLocale: 'vi'` |
| Theming | next-themes — class-based dark mode (`.dark`) |
| Database | Supabase (PostgreSQL) |
| Icons | lucide-react |
| Class utility | `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge) |
| Font | Noto Sans — loaded via `next/font/google` in `[locale]/layout.tsx` |
| Deployment | Vercel |

---

## Folder Structure

```
src/
├── app/
│   ├── [locale]/           # All routes live here
│   │   ├── layout.tsx      # Shell: providers, header, footer, nav
│   │   ├── page.tsx        # Home (SSR)
│   │   ├── about/page.tsx
│   │   ├── courses/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy/page.tsx
│   │   └── terms/page.tsx
│   ├── globals.scss         # Global styles + token imports
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── layout/              # Header, Footer, MobileBottomNav, toggles
│   ├── sections/            # Home page sections (hero, teacher, etc.)
│   ├── about/               # About sub-components
│   ├── courses/             # Courses sub-components
│   ├── contact/             # Contact sub-components
│   ├── ui/                  # Atomic primitives (Button, Card, Input, Select…)
│   ├── logo/
│   └── providers/           # AppProviders wrapper
├── i18n/
│   ├── routing.ts           # Locale list + prefix config
│   ├── navigation.ts        # Locale-aware Link, usePathname, useRouter
│   └── request.ts           # next-intl server config
├── lib/
│   ├── constants/site.ts    # SITE_URL, Contact, Teacher, NavLinks, Stats, enums
│   ├── seo/
│   │   ├── jsonld.ts        # JSON-LD schema builders
│   │   └── metadata.ts      # getDbMetadata() — DB-driven Next.js Metadata
│   ├── supabase/
│   │   ├── client.ts        # createBrowserSupabaseClient()
│   │   ├── server.ts        # createServerSupabaseClient()
│   │   └── types.ts         # Auto-generated DB types (do not edit manually)
│   └── utils.ts             # cn() helper
├── messages/
│   ├── vi.json              # Vietnamese strings (source of truth for keys)
│   └── en.json              # English strings (must mirror vi.json keys exactly)
├── styles/
│   └── design-tokens.scss   # CSS custom properties — single source of truth
└── types/
    └── models.ts            # Domain-level TS types (Pick<> from DB types)
```

**Key rule:** Components go in `src/components/**`. Never use `src/components_v2` or similar.

---

## Architecture

### Page Pattern (mandatory for every route)

```
[locale]/page.tsx          ← async Server Component ONLY
  1. setRequestLocale(locale)
  2. await getTranslations({ locale, namespace: '...' })
  3. fetch DB data (await Promise.all([...]))
  4. build JSON-LD (from lib/seo/jsonld.ts builders)
  5. return <XxxPageContent locale={locale} data={...} breadcrumbLD={...} />

src/components/xxx/xxx-page-content.tsx  ← layout shell, may be 'use client'
  ├── sub-components for each visual section
  └── passes locale + data as props downward
```

**Never** put Supabase queries in Client Components. All DB reads are server-side.

### Data Flow

```
Supabase DB → createServerSupabaseClient() → page.tsx (SSR)
  → props → XxxPageContent → sub-components (render only)

Contact form write: createBrowserSupabaseClient() → contact_submissions.insert()
```

No SWR, no React Query, no `useEffect`-based fetching. All data is SSR props.

### Server / Client Boundary

- `page.tsx` files are always Server Components.
- Add `'use client'` only when the component uses React hooks or event handlers.
- Prefer isolating interactivity to small leaf components, not entire page shells.

---

## Coding Standards

- TypeScript only. No `any` — use proper types from `src/types/models.ts` or `lib/supabase/types.ts`.
- Named exports everywhere. No default exports for components.
- Props: inline interface directly above the component function.
- `async/await` for all async code.
- Catch Supabase errors gracefully — return `null` fallbacks, never throw to the user.
- `setRequestLocale(locale)` must be the **first line** in every async Server Component that receives `locale`.
- Always call `useTranslations()` in Client Components. Use `getTranslations()` in Server Components. Never mix them.

---

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Files | kebab-case | `contact-page-content.tsx` |
| Components | PascalCase named export | `export function ContactPageContent()` |
| Variables / functions | camelCase | `const breadcrumbLD` |
| DB table columns | snake_case | `title_vi`, `is_published` |
| Translation keys | PascalCase namespace, camelCase key | `"Contact": { "mapTitle": "..." }` |
| CSS classes | kebab-case | `.page-shell`, `.coral-shadow` |
| Constants | UPPER_SNAKE for module-level | `SITE_URL`, `HERO_IMAGES` |

**Translation key namespaces:**

| Namespace | Use |
|---|---|
| `Nav` | Navigation labels, drawer labels |
| `Common` | Reusable cross-page strings |
| `Home`, `Courses`, `About`, `Contact` | Page-specific strings |
| `ContactForm` | Form labels, validation messages |
| `Footer` | Footer-only strings |
| `Legal` | Privacy / Terms content |
| `SiteMeta` | Root layout metadata |

**i18n message files** — `src/messages/`

- `vi.json` is the **source of truth** for all translation keys. Add new keys here first.
- `en.json` must mirror **every key** in `vi.json` exactly — same namespaces, same key names, same nesting depth.
- Never add a key to only one file. If `vi.json` gets `"Contact": { "mapTitle": "..." }`, `en.json` must get the same key.
- Never put HTML markup inside translation strings (e.g. `<span>` tags). Use separate keys for styled sub-strings.
- Keep keys camelCase and descriptive: `"submitBtn"` not `"btn1"`.
- After editing message files, verify the dev server shows no `next-intl` missing-key warnings.

---

## UI Rules

### Design Tokens (mandatory)
All colors, radii, shadows, and spacing come from CSS variables defined in `src/styles/design-tokens.scss`.

```scss
/* ✅ correct */
color: var(--color-primary);
border-radius: var(--radius-2xl);
box-shadow: var(--shadow-card);

/* ❌ wrong */
color: #b52330;
border-radius: 24px;
```

**Core palette:**
- Primary (CTA, active): `var(--color-primary)` → `#b52330` coral red
- Secondary (accents): `var(--color-secondary-container)` → `#ffd167` gold
- Tertiary (success): `var(--color-tertiary)` → `#006c4f` mint
- Background: `var(--color-bg)` → `#fdf9f4` ivory

---

### Mobile-First Layout (critical — majority of users are on mobile)

This site is used **primarily on mobile**. Every spacing, size, and layout decision must be made mobile-first and then scaled up for tablet/desktop.

#### Section Padding

```
mobile  (<768px):  px-4 (16px) only — NO horizontal margin on sections or images
tablet  (≥768px):  px-6 or px-8 allowed
desktop (≥1024px): px-8 to px-12 allowed, centered with .container / max-w-[1400px]
```

- **Sections must use `px-4` on mobile.** Never add `mx-4`, `ml-4`, `mr-4`, or any horizontal margin to a full-width section on mobile.
- **Images inside sections must have no horizontal margin on mobile.** Use `w-full` and let padding from the parent container provide the inset.
- **Vertical padding between sections:** `py-12` on mobile → `py-16 md:py-20 lg:py-24` on larger screens.

```tsx
// ✅ correct section pattern
<section className="py-12 md:py-20">
  <div className="container px-4 md:px-8">
    ...
  </div>
</section>

// ❌ wrong — margin on mobile
<section className="mx-4 py-12">
  ...
</section>
```

#### Element Sizing — Mobile Must Be Smaller

Every dimension must be explicitly smaller on mobile. Apply the responsive scale: **mobile base → `md:` tablet → `lg:` desktop**.

| Element | Mobile | Tablet (md) | Desktop (lg) |
|---|---|---|---|
| Section heading (`h2`) | `.text-headline-lg-mobile` (28px) | `.text-headline-lg` (32px) | `.text-display-sm` (40px) |
| Body text | `.text-body-sm` (14px) | `.text-body-md` (16px) | `.text-body-lg` (18px) |
| Button size prop | `size="sm"` (h-11) | `size="md"` (h-12) | `size="lg"` (h-14) |
| Icon size | `h-4 w-4` | `h-5 w-5` | `h-6 w-6` |
| Card padding | `p-4` | `p-5` | `p-6` |
| Avatar / image circle | `w-10 h-10` | `w-12 h-12` | `w-14 h-14` |
| Gap between grid items | `gap-4` | `gap-6` | `gap-8` |
| Section badge | small, `text-label-sm` | `text-label-lg` | `text-label-lg` |

**Rule: if a size value only appears once with no `md:` or `lg:` variant, question it — it probably needs responsive variants.**

```tsx
// ✅ correct — explicit scale at each breakpoint
<h2 className="text-headline-lg-mobile md:text-headline-lg lg:text-display-sm">
<Button size="sm" className="md:hidden" />
<Button size="md" className="hidden md:inline-flex lg:hidden" />
<Button size="lg" className="hidden lg:inline-flex" />

// Simpler alternative: use className overrides
<Button className="h-11 md:h-12 lg:h-14 px-5 md:px-6 lg:px-8">

// ✅ correct icon sizing
<Icon className="h-4 w-4 md:h-5 md:w-5" />

// ❌ wrong — single fixed size, ignores mobile
<Icon className="h-6 w-6" />
<h2 className="text-display-sm">
```

#### Input / Select Components
- Mobile: always use the default (small) size — compact height, `text-body-sm`.
- Pass smaller `className` overrides for mobile, larger for `md:` and up.

#### Consistency Across Sections and Screens
- All sections on the **same page** must use the **same horizontal padding** at each breakpoint.
- If one section uses `px-4 md:px-8`, all sections on that page must too — never mix `px-4` with `px-6` on the same page.
- Vertical spacing between sections must be uniform. Pick one scale (e.g. `py-12 md:py-20`) and apply it consistently across the entire page.
- Gap between cards/grid items must be the same across all grids on the same page.

---

### Container Width
Use the `.container` CSS class (defined in `globals.scss`) or the `<Container>` React component (`src/components/ui/container.tsx`).
Default max-width: **1400px**. Do not hardcode `max-w-[1400px]` inline unless inside a component that can't accept the Container.

Always pair `.container` with responsive padding:
```tsx
<div className="container px-4 md:px-8">
```

### Typography Scale
Use semantic class names from `globals.scss`, not raw font-size utilities:

| Class | Size | Use |
|---|---|---|
| `.text-display-lg` | 48px | Hero H1 (desktop) |
| `.text-display-sm` | 40px | Section H2 (desktop) |
| `.text-headline-lg` | 32px | Section H2 (tablet) |
| `.text-headline-lg-mobile` | 28px | Section H2 (mobile) |
| `.text-title-md` | 20px | Card title |
| `.text-body-lg` | 18px | Body (desktop) |
| `.text-body-md` | 16px | Body (tablet) |
| `.text-body-sm` | 14px | Body (mobile), captions |
| `.text-label-lg` | 14px 600 | Labels, nav items |
| `.text-label-sm` | 12px 500 | Badges, small caps |

### Component Primitives (use these, don't reinvent)
- `<Button variant="primary|secondary|outlined|ghost|inverted" size="sm|md|lg">`
- `<Container size="default|narrow|wide">`
- `<Card>`, `<Badge>`, `<Input>`, `<Select>`, `<SectionHeader>`, `<SectionBadge>`, `<Divider>`, `<IconBox>`

### Touch Targets
- Minimum interactive element height: `min-h-11` (44px) on mobile.
- Bottom nav (`MobileBottomNav`) handles mobile navigation — do not add secondary mobile menus.
- Bottom padding on `.page-shell`: accounts for the 64px bottom nav bar on mobile via `pb-[calc(64px+env(safe-area-inset-bottom))]`.

### Dark Mode
All color usage via CSS variables automatically supports dark mode through the `.dark` class overrides in `design-tokens.scss`. No manual dark mode conditionals in components.

### Do Not Add
A new UI library (e.g. shadcn, Radix, Chakra) without explicit user approval.

---

## State Management

No external state library. Use React built-ins only:
- `useState` for local UI state (open/closed, selected filter, form values)
- `useMemo` for derived/computed values
- `useEffect` for side effects (scroll lock, timers, intervals)

If a state need feels global, question it first — this is a landing site, not an app.

---

## API Convention

There are **no API routes** (`app/api/`). All data access is:
1. **Reads:** `createServerSupabaseClient()` in Server Components
2. **Writes:** `createBrowserSupabaseClient()` in Client Components (contact form only)

When adding writes from the client, ensure the Supabase table has appropriate RLS policies.

**Supabase client selection:**

```ts
// Server Component or Route Handler
import { createServerSupabaseClient } from '@/lib/supabase/server';
const supabase = createServerSupabaseClient();

// Client Component (mutations only)
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
const supabase = createBrowserSupabaseClient();
```

---

## Database Convention

### Tables

| Table | Purpose |
|---|---|
| `courses` | Course listings |
| `course_categories` | HSK level categories |
| `faqs` | FAQs by `page_scope` (`'home'`, `'contact'`) |
| `testimonials` | Student reviews |
| `teacher_profile` | Single teacher record (`is_active = true`) |
| `contact_submissions` | Lead form submissions |
| `page_metadata` | DB-driven SEO metadata per page path |
| `site_settings` | Key-value site config |
| `newsletter_subscribers` | Email signups |

### Query Conventions
- Always filter with `is_published = true` or `is_active = true` for public content.
- Always include `.order('sort_order')` on ordered lists.
- Use `Pick<Tables<'table_name'>, ...>` types from `src/types/models.ts` — never use raw `Tables<>` in component props.
- Wrap all queries in `try/catch { return null }` — DB failures degrade gracefully.

### Bilingual Columns
Content tables use `_vi` / `_en` suffix pairs: `title_vi`, `title_en`, `bio_vi`, `bio_en`, etc.
Select the correct column based on `locale`:
```ts
const title = locale === 'vi' ? row.title_vi : row.title_en;
```

### SEO Metadata Pattern
Every page's `generateMetadata()` must use:
```ts
return getDbMetadata(locale, '/page-path', t('metaTitle'), t('metaDesc'));
```
This queries `page_metadata` by `page_path` with `is_active = true` and falls back to static strings.

---

## Error Handling

- Supabase queries: wrap in `try/catch`, return `null` on failure. Never throw errors to the UI.
- Components receiving nullable data: render a sensible fallback (hide section, show placeholder text).
- Form submissions: show inline error messages using translation keys in `ContactForm.*`.
- Do not add `console.log` — use `console.error` only for real errors.

---

## Testing

There is currently **no test suite**. Do not add test frameworks without user approval. If asked to add tests, prefer Vitest + React Testing Library.

---

## Performance

- All pages are SSR Server Components by default — do not convert to client unnecessarily.
- Use `Promise.all([...])` for parallel Supabase fetches in page.tsx.
- Images: use `next/image` with known dimensions when possible. External images allowed via `remotePatterns: [{ hostname: '**' }]` in `next.config.ts`.
- Fonts: already optimized via `next/font/google` with `display: 'swap'`.
- Do not add client-side data fetching (SWR, React Query) — use SSR.

---

## SEO

### Mandatory for every new page

1. `generateMetadata()` calling `getDbMetadata(locale, path, fallbackTitle, fallbackDesc)`
2. `setRequestLocale(locale)` at top of page function
3. At least one JSON-LD script using a builder from `lib/seo/jsonld.ts`
4. A `BreadcrumbList` JSON-LD for all non-home pages via `buildBreadcrumbLD()`
5. A single `<h1>` per page
6. `alt` text on all meaningful images

### JSON-LD Builders (use these, do not write raw schema)
```ts
buildOrganizationLD()        // already in [locale]/layout.tsx
buildBreadcrumbLD(locale, name, path)
buildFaqPageLD(faqs)
buildCourseLD(course)
```

### Constants
Always import `SITE_URL` from `src/lib/constants/site.ts`. Never re-declare it.

---

## Accessibility

- Interactive elements: minimum touch target `min-h-11` (44px).
- `aria-label` on icon-only buttons (theme toggle, close buttons, slideshow controls).
- `aria-expanded` / `aria-controls` / `role="dialog"` on drawer / bottom sheet components.
- Proper heading hierarchy: one `<h1>` per page, then `<h2>`, `<h3>`.
- Use semantic HTML: `<nav>`, `<header>`, `<footer>`, `<main>`, `<section>`, `<article>`.
- Focus ring: use `.focus-ring` CSS class (already defined in `globals.scss`).

---

## Security

- **Never commit** `.env.local` or any file containing API keys.
- **Never expose** `SUPABASE_SERVICE_ROLE_KEY` to the browser or client code.
- The server Supabase client currently uses the anon key — this is correct for public reads. If you need elevated permissions, add a separate server-only client using `SUPABASE_SERVICE_ROLE_KEY` (not `NEXT_PUBLIC_*`).
- Before running any destructive Supabase operation (`DROP`, `TRUNCATE`, bulk `DELETE`): stop and confirm with the user explicitly.
- Client-side Supabase inserts (contact form) rely on Supabase RLS policies — verify RLS is correctly configured before adding new client-side writes.

---

## Git Workflow

- Commit messages: imperative, lowercase, brief. `fix: broken contact form validation`, `feat: add newsletter signup section`.
- Do not commit build artifacts (`.next/`) or environment files.
- Do not commit `phase*-report.md` or similar work artifacts to the repo root — put them in `docs/`.

---

## Things AI Should NEVER Do

- ❌ Add a second teacher or multi-teacher grid — there is one instructor.
- ❌ Hardcode hex colors in components — always use `var(--color-*)`.
- ❌ Hardcode `siteUrl` inline — import `SITE_URL` from `lib/constants/site.ts`.
- ❌ Use `useTranslations()` in a Server Component.
- ❌ Use `getTranslations()` in a Client Component.
- ❌ Put Supabase queries inside Client Components.
- ❌ Add `any` types — use proper types from `models.ts` or `lib/supabase/types.ts`.
- ❌ Create `src/components_v2/` or any parallel component folder.
- ❌ Add a new UI library without explicit user approval.
- ❌ Run destructive DB operations without explicit user confirmation.
- ❌ Commit secrets, `.env` files, or service role keys.
- ❌ Fabricate contact info, phone numbers, or addresses — use `lib/constants/site.ts`.
- ❌ Write raw hex in JSON-LD — contact data must match `Contact` in `site.ts`.
- ❌ Install packages with unpinned `latest` — specify a version.
- ❌ Add `mx-*` or horizontal margin to full-width sections on mobile — use `px-4` padding only.
- ❌ Add horizontal margin to images inside sections on mobile — they must be full-width with parent padding.
- ❌ Use a single fixed size for icons, buttons, headings, or spacing — always add `md:` and `lg:` variants.
- ❌ Mix different horizontal padding values across sections on the same page.
- ❌ Add a translation key to only one message file — both `vi.json` and `en.json` must be updated together.
- ❌ Put HTML markup (e.g. `<span>`) inside translation string values.

---

## Checklist Before Finishing Any Task

**General**
- [ ] `npm run typecheck` passes with zero errors
- [ ] No raw hex values added to components
- [ ] No `console.log` statements added
- [ ] No Supabase queries inside `'use client'` components

**Page / Route**
- [ ] Any new page has `generateMetadata()` using `getDbMetadata()`
- [ ] Any new page has `setRequestLocale(locale)` as the first statement
- [ ] Any new page has at least one JSON-LD `<script>` tag
- [ ] `NavLinks` constant updated in `lib/constants/site.ts` if a new route was added

**i18n**
- [ ] Both `vi.json` and `en.json` updated with identical key structure for any new strings
- [ ] No translation string contains raw HTML markup

**Accessibility / SEO**
- [ ] All new images have `alt` text
- [ ] One `<h1>` per page, correct heading hierarchy

**Mobile UI (verify in browser at 390px width)**
- [ ] All sections use `px-4` horizontal padding on mobile — no horizontal margin
- [ ] No images have horizontal margin on mobile — full-width within padded parent
- [ ] All headings use mobile-sized class (e.g. `text-headline-lg-mobile`) with `md:` scale-up
- [ ] All icons use `h-4 w-4` on mobile with `md:h-5 md:w-5` or larger on bigger screens
- [ ] Buttons use `size="sm"` or equivalent small height on mobile
- [ ] Horizontal padding is consistent across all sections on the same page
- [ ] Vertical spacing between sections is uniform across the page
- [ ] Bottom nav is visible and not overlapping content
- [ ] Touch targets are at least 44px tall (`min-h-11`)

**Dark Mode**
- [ ] Dark mode not broken (no hardcoded light-only colors outside token system)
