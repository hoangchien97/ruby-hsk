---
name: nextjs
description: "Activate for any Next.js App Router task: creating pages/layouts, data fetching, metadata, routing, middleware, image optimization, SSR/SSG/ISR strategies, Turbopack, next.config.ts, or any file inside src/app/. Also triggers on: Server Components, Client Components, 'use client', generateMetadata, generateStaticParams, next/image, next/font, next/link, loading.tsx, error.tsx, not-found.tsx."
---

# Next.js App Router Skill

## Purpose

Authoritative reference for **Next.js App Router** patterns. Covers all major building blocks: rendering models, caching, routing files, metadata, middleware, image/font optimization, and environment variables.

---

## Folder Structure

```
src/
└── app/
    ├── globals.scss             # Global styles (imported once here)
    ├── layout.tsx               # Root layout — wraps all routes
    ├── page.tsx                 # Home page (/)
    ├── not-found.tsx            # Global 404
    ├── error.tsx                # Global error boundary ('use client')
    ├── loading.tsx              # Global loading UI
    ├── robots.ts                # robots.txt generator
    ├── sitemap.ts               # sitemap.xml generator
    ├── manifest.ts              # Web App Manifest
    │
    ├── [locale]/                # Dynamic i18n segment
    │   ├── layout.tsx           # Locale shell (header, footer, providers)
    │   ├── page.tsx             # /vi or /en home page
    │   ├── loading.tsx          # Locale-level loading UI
    │   ├── error.tsx            # Locale-level error ('use client')
    │   │
    │   ├── courses/
    │   │   ├── page.tsx         # /courses listing
    │   │   ├── loading.tsx      # /courses suspense fallback
    │   │   └── [slug]/
    │   │       ├── page.tsx     # /courses/[slug] detail
    │   │       └── not-found.tsx
    │   │
    │   └── contact/
    │       └── page.tsx
    │
    └── api/                     # Route Handlers (only if needed)
        └── webhook/
            └── route.ts
```

**Rules:**
- One `layout.tsx` per segment level. Layouts wrap child routes without re-rendering on navigation.
- `page.tsx` makes a route publicly accessible. A folder without `page.tsx` becomes a layout-only segment.
- Collocate components inside `app/` only if they are route-specific. Shared components go in `src/components/`.
- Prefix private folders with `_` (e.g. `_components/`) to opt them out of routing.
- Use Route Groups `(group)/` to organize routes without affecting the URL path.

---

## Server Components

Every file in `app/` is a **Server Component** by default.

### What you can do in a Server Component
- `async/await` directly in the component body
- Access environment variables (`process.env.MY_SECRET`)
- Query databases directly (no API layer needed)
- Import server-only libraries (Node.js APIs, secrets)
- Render large dependency trees without shipping JS to the client

### What you cannot do
- Use React hooks (`useState`, `useEffect`, `useRef`, etc.)
- Access browser APIs (`window`, `document`, `localStorage`)
- Add event handlers (`onClick`, `onChange`)
- Use `useTranslations()` from next-intl — use `getTranslations()` instead

### Minimal Server Component

```tsx
// app/[locale]/courses/page.tsx
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { CoursesPageContent } from '@/components/courses/courses-page-content';

type Props = { params: Promise<{ locale: string }> };

export default async function CoursesPage({ params }: Props) {
  const { locale } = await params;          // ← await params in Next.js 15+
  setRequestLocale(locale);                 // ← MUST be first line for next-intl

  const t = await getTranslations({ locale, namespace: 'Courses' });
  const supabase = createServerSupabaseClient();

  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .eq('is_published', true)
    .order('sort_order');

  return <CoursesPageContent locale={locale} courses={courses ?? []} />;
}
```

### Best Practices
- Keep Server Components async. Fetch data at the top, pass results as props to children.
- Use `Promise.all([...])` for parallel fetches — never sequential awaits for unrelated queries.
- Return `null` or an empty fallback if a DB query fails. Never throw errors to the UI.
- Avoid prop-drilling more than two levels deep — if needed, consider React Context (in a Client boundary) or restructure.

---

## Client Components

Add `'use client'` at the top of the file. This marks the component and all its imports as a Client Component tree.

### When to use `'use client'`
- React hooks (`useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`)
- Event handlers (`onClick`, `onChange`, `onSubmit`)
- Browser APIs (`window`, `localStorage`, `navigator`)
- `useTranslations`, `useLocale`, `useRouter`, `usePathname` from next-intl

### Minimize the Client boundary

```tsx
// ❌ wrong — makes the entire section client-rendered for one button
'use client';
export function CoursesSection({ courses }) {
  const [open, setOpen] = useState(false);
  return (
    <section>
      <h2>Courses</h2>                      {/* static — could be server */}
      {courses.map(c => <CourseCard key={c.id} course={c} />)}  {/* static */}
      <FilterButton open={open} setOpen={setOpen} />  {/* needs state */}
    </section>
  );
}

// ✅ correct — isolate the interactive part
// courses-section.tsx (Server Component)
export function CoursesSection({ courses }) {
  return (
    <section>
      <h2>Courses</h2>
      {courses.map(c => <CourseCard key={c.id} course={c} />)}
      <FilterButton />   {/* Client Component imported here is fine */}
    </section>
  );
}

// filter-button.tsx
'use client';
export function FilterButton() {
  const [open, setOpen] = useState(false);
  return <button onClick={() => setOpen(o => !o)}>Filter</button>;
}
```

### Passing Server data to Client Components

```tsx
// ✅ pass serializable data as props
<CoursesPageContent courses={courses} locale={locale} />

// ❌ you cannot pass functions, class instances, or non-serializable objects
<CoursesPageContent supabase={supabaseClient} />  // ❌
```

---

## Metadata

### generateMetadata (async, per page)

```tsx
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getDbMetadata } from '@/lib/seo/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Courses' });
  return getDbMetadata(locale, '/courses', t('metaTitle'), t('metaDesc'));
}
```

### Static metadata (for simple pages)

```tsx
export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
};
```

### Metadata object shape

```ts
const metadata: Metadata = {
  title: { default: 'Ruby HSK', template: '%s | Ruby HSK' },
  description: '...',
  openGraph: {
    title: '...',
    description: '...',
    url: 'https://rubyhsk.vn/vi/courses',
    siteName: 'Ruby HSK',
    images: [{ url: '/og-courses.jpg', width: 1200, height: 630 }],
    type: 'website',
    locale: 'vi_VN',
  },
  twitter: {
    card: 'summary_large_image',
    title: '...',
    description: '...',
  },
  alternates: {
    canonical: 'https://rubyhsk.vn/vi/courses',
    languages: {
      vi: 'https://rubyhsk.vn/vi/courses',
      en: 'https://rubyhsk.vn/en/courses',
    },
  },
  robots: { index: true, follow: true },
};
```

### Rules
- Every `page.tsx` exports `generateMetadata` — no exceptions.
- `layout.tsx` metadata serves as the default for all child routes (use `title.template`).
- Do not hardcode meta strings — always via `getTranslations` + `getDbMetadata`.
- `generateMetadata` is deduplicated: the same fetch inside it and inside the page uses the same cache entry.

---

## Route Handlers

Route Handlers replace `pages/api/` in App Router. Use only when absolutely necessary — prefer direct Supabase queries in Server Components.

```ts
// app/api/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate webhook signature
  const signature = request.headers.get('x-signature');
  if (!isValidSignature(body, signature)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Process...
  return NextResponse.json({ received: true });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  return NextResponse.json({ id });
}
```

### Dynamic Route Handler

```ts
// app/api/courses/[slug]/route.ts
type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  // ...
}
```

### Rules
- Always return `NextResponse.json(...)` — not raw `Response`.
- Validate inputs before processing. Return 400 for bad requests, 401/403 for auth failures.
- Do not call Route Handlers from Server Components — query data directly.
- Do not use Route Handlers for page data fetching — use Server Components instead.

---

## Middleware

`middleware.ts` at the project root runs before every request.

```ts
// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/((?!_next|_vercel|.*\\..*).*)',  // all paths except static assets
  ],
};
```

### Custom middleware with next-intl

```ts
import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  // custom logic before locale redirect
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    // auth check
    const token = request.cookies.get('auth-token');
    if (!token) return NextResponse.redirect(new URL('/login', request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)', '/api/(.*)'],
};
```

### Rules
- Keep middleware lightweight — it runs on every request, including static assets if not filtered.
- The `matcher` config is critical — always exclude `_next/static`, `_next/image`, and file extensions.
- Cannot use Node.js APIs in middleware — it runs on the Edge runtime.
- Middleware executes before caching — don't do heavy computation here.

---

## Caching

Next.js App Router has four cache layers:

| Cache | Scope | Duration | Invalidation |
|---|---|---|---|
| Request Memoization | Single request/render | Cleared per request | Automatic |
| Data Cache | Persistent (server) | Until revalidated | `revalidatePath`, `revalidateTag` |
| Full Route Cache | Persistent (server) | Until revalidated | `revalidatePath` |
| Router Cache | Client-side (browser) | 30s (dynamic) / 5min (static) | Navigation or `router.refresh()` |

### fetch() cache options

```ts
// Static — cached indefinitely (default for fetch in Server Components)
fetch('https://api.example.com/data');

// Revalidate on interval (ISR-style)
fetch('https://api.example.com/data', { next: { revalidate: 3600 } }); // 1 hour

// Force dynamic — no cache
fetch('https://api.example.com/data', { cache: 'no-store' });

// Tag for on-demand revalidation
fetch('https://api.example.com/data', { next: { tags: ['courses'] } });
```

### Route-level cache control

```ts
// Force all fetches in this route to be dynamic (no caching)
export const dynamic = 'force-dynamic';

// Revalidate all cached data in this route every N seconds
export const revalidate = 3600;

// Force static generation (error if any dynamic data)
export const dynamic = 'force-static';
```

> **This project uses Supabase SDK (not fetch).** Supabase queries are not cached by Next.js automatically. All pages are effectively dynamic. Use `export const revalidate = N` at the page level to opt into ISR if needed.

---

## Revalidation

### Time-based (ISR)

```ts
// app/[locale]/courses/page.tsx
export const revalidate = 3600; // rebuild page every 1 hour

export default async function CoursesPage() {
  // data fetched at build/revalidation time
}
```

### On-demand revalidation

```ts
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret');
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { path, tag } = await request.json();

  if (path) revalidatePath(path);
  if (tag) revalidateTag(tag);

  return NextResponse.json({ revalidated: true });
}
```

### In Server Actions

```ts
'use server';
import { revalidatePath } from 'next/cache';

export async function updateCourse(id: string, data: CourseData) {
  await prisma.course.update({ where: { id }, data });
  revalidatePath('/courses');
  revalidatePath(`/courses/${data.slug}`);
}
```

---

## Dynamic Routes

### Single segment

```
app/[locale]/courses/[slug]/page.tsx
```

```tsx
type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  // Pre-generate known slugs at build time
  const { data: courses } = await supabase.from('courses').select('slug, locale');
  return courses?.map(c => ({ locale: c.locale, slug: c.slug })) ?? [];
}

export default async function CourseDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  // ...
}
```

### Catch-all segment

```
app/[locale]/blog/[...slug]/page.tsx  → /blog/2024/post-title
app/[locale]/blog/[[...slug]]/page.tsx → /blog AND /blog/2024/post-title
```

### Rules
- In Next.js 15+, `params` is always a `Promise` — always `await params`.
- `generateStaticParams` at build time → static pages (faster, cacheable).
- Without `generateStaticParams`, dynamic routes render on demand.
- Call `notFound()` from `next/navigation` when a slug doesn't exist:

```tsx
import { notFound } from 'next/navigation';

const course = await getCourseBySlug(slug);
if (!course) notFound();
```

---

## Loading UI

`loading.tsx` creates an automatic Suspense boundary for the route segment.

```tsx
// app/[locale]/courses/loading.tsx
export default function CoursesLoading() {
  return (
    <div className="container px-4 md:px-8 py-12">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-surface-variant mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-64 animate-pulse rounded-2xl bg-surface-variant" />
        ))}
      </div>
    </div>
  );
}
```

### Rules
- Add `loading.tsx` for every route segment that fetches data.
- Match the skeleton layout to the actual page structure (same grid, same heights).
- The `loading.tsx` shell is streamed immediately while data loads.

---

## Error Handling

`error.tsx` must be a Client Component. It catches errors thrown during rendering.

```tsx
// app/[locale]/courses/error.tsx
'use client';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CoursesError({ error, reset }: Props) {
  const t = useTranslations('Common');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container px-4 py-12 text-center">
      <h2 className="text-headline-lg mb-4">{t('errorTitle')}</h2>
      <p className="text-body-md text-on-surface-variant mb-6">{t('errorDesc')}</p>
      <button onClick={reset} className="btn-primary">
        {t('tryAgain')}
      </button>
    </div>
  );
}
```

### not-found.tsx

```tsx
// app/[locale]/courses/[slug]/not-found.tsx
import Link from 'next/link';

export default function CourseNotFound() {
  return (
    <div className="container px-4 py-12 text-center">
      <h1 className="text-display-sm mb-4">Không tìm thấy khóa học</h1>
      <Link href="/courses">← Xem tất cả khóa học</Link>
    </div>
  );
}
```

### Rules
- `error.tsx` must be `'use client'` — it receives an `Error` prop.
- `error.tsx` does **not** catch errors in `layout.tsx` — use a parent `error.tsx` for that.
- Call `notFound()` (from `next/navigation`) for missing resources — do not throw manually.
- Never show raw error messages to the user — log them server-side, show a friendly message.

---

## Suspense

Use `<Suspense>` for fine-grained loading states within a page.

```tsx
// Wrap slow components individually
import { Suspense } from 'react';

export default async function HomePage() {
  return (
    <main>
      <HeroSection />         {/* fast — no DB fetch */}
      <Suspense fallback={<FaqSkeleton />}>
        <FaqSection />        {/* slow — DB fetch inside */}
      </Suspense>
      <Suspense fallback={<TeacherSkeleton />}>
        <TeacherSection />    {/* slow — DB fetch inside */}
      </Suspense>
    </main>
  );
}
```

### Rules
- `useSearchParams()` must be wrapped in `<Suspense>` — Next.js throws a build error otherwise.
- Prefer `loading.tsx` for full-page loading; use `<Suspense>` for sub-section loading.
- Streaming with `<Suspense>` reduces Time To First Byte (TTFB) for the page shell.

---

## Image Optimization

```tsx
import Image from 'next/image';

// ✅ known dimensions
<Image
  src="/teacher-photo.jpg"
  alt="Cô Trần Hồng Ngọc — Giáo viên tiếng Trung"
  width={400}
  height={400}
  priority           // add for above-the-fold images (LCP element)
  className="rounded-full object-cover"
/>

// ✅ fill (parent must have position: relative + fixed size)
<div className="relative h-64 w-full">
  <Image
    src="/hero-bg.jpg"
    alt="Ruby HSK classroom"
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
    className="object-cover"
  />
</div>

// ✅ responsive sizes
<Image
  src={course.image_url}
  alt={course.titleVi}
  width={800}
  height={450}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

### Configuration (`next.config.ts`)

```ts
const config: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: '**' },    // allow all external images (current setting)
    ],
    formats: ['image/avif', 'image/webp'],
  },
};
```

### Rules
- **Always use `next/image`** — never raw `<img>`.
- Always provide meaningful `alt` text — never empty or `"image"`.
- Use `priority` on the Largest Contentful Paint (LCP) image (hero, teacher photo).
- Provide `sizes` prop when using `fill` or when the image width changes at breakpoints.
- Prefer `.webp` or `.avif` sources — `next/image` converts automatically.
- Local images in `public/` can use static import (auto-provides width/height):

```tsx
import teacherPhoto from '@/public/teacher.jpg';
<Image src={teacherPhoto} alt="..." />
```

---

## Fonts

Already configured in `app/[locale]/layout.tsx`. **Do not add new font instances in components.**

```tsx
// app/[locale]/layout.tsx
import { Noto_Sans } from 'next/font/google';

const notoSans = Noto_Sans({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export default function LocaleLayout({ children }) {
  return (
    <html lang={locale} className={notoSans.variable}>
      ...
    </html>
  );
}
```

Use the font in CSS via the variable — already in `design-tokens.scss`:
```scss
--font-sans: var(--font-sans, 'Noto Sans', system-ui, sans-serif);
```

### Adding a new font

```tsx
import { Noto_Serif } from 'next/font/google';

const notoSerif = Noto_Serif({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '700'],
  variable: '--font-serif',
  display: 'swap',
});

// Add variable to <html> className
<html className={`${notoSans.variable} ${notoSerif.variable}`}>
```

### Rules
- Only load fonts in `layout.tsx` — not in individual components.
- Use `display: 'swap'` to prevent invisible text during font load.
- Specify only the weights and subsets you actually use — each adds to bundle size.
- Never use `@import url(...)` for Google Fonts — always `next/font/google`.

---

## Environment Variables

### Naming rules

| Prefix | Accessible in | Use for |
|---|---|---|
| `NEXT_PUBLIC_` | Browser + Server | Public values (site URL, anon keys) |
| _(no prefix)_ | Server only | Secrets (service role keys, API secrets) |

### This project's required env vars

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=https://rubyhsk.vn

# Server-only (never NEXT_PUBLIC_)
SUPABASE_SERVICE_ROLE_KEY=eyJ...
REVALIDATE_SECRET=your-secret-token
```

### Usage

```ts
// Server Component or server code — all env vars available
const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Client Component — only NEXT_PUBLIC_ vars available
const url = process.env.NEXT_PUBLIC_SITE_URL;

// ❌ this returns undefined in the browser
const secret = process.env.SUPABASE_SERVICE_ROLE_KEY; // in 'use client'
```

### Type-safe env validation (recommended)

```ts
// src/lib/env.ts
function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
}

export const env = {
  supabaseUrl: requireEnv('NEXT_PUBLIC_SUPABASE_URL'),
  supabaseAnonKey: requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rubyhsk.vn',
};
```

### Rules
- **Never commit `.env.local`** — add to `.gitignore`.
- **Never prefix secrets with `NEXT_PUBLIC_`** — they'll be in the browser bundle.
- Add all required env vars to `.env.example` (with placeholder values) for documentation.
- Access `SITE_URL` via `SITE_URL` constant in `lib/constants/site.ts` — not directly from `process.env` in components.

---

## Best Practices

1. **Default to Server Components.** Move to Client only when you need hooks or interactivity.
2. **Parallel data fetching.** Use `Promise.all([...])` for sibling queries — never waterfall.
3. **Fail gracefully.** Wrap DB calls in `try/catch`, return `null`/`[]`, render fallback UI.
4. **`await params` always.** In Next.js 15+, `params` and `searchParams` are Promises.
5. **`setRequestLocale` first.** Must be the first call in every Server Component page with a `locale` param.
6. **Every page exports `generateMetadata`.** Never leave a page without metadata.
7. **`loading.tsx` per segment.** Prevents the entire layout from blocking on data.
8. **`error.tsx` per segment.** Prevents a section failure from crashing the whole app.
9. **`notFound()` for missing resources.** Returns a proper 404, stops rendering.
10. **`priority` on LCP images.** Prevents the hero image from being deprioritized.
11. **`sizes` on responsive images.** Tells the browser which size to download.
12. **Fonts only in `layout.tsx`.** One instance, one CSS variable, used everywhere.
13. **Never expose secrets.** Only `NEXT_PUBLIC_` vars in Client Components.
14. **Use `revalidate` for quasi-static content.** Courses, FAQs, teacher data rarely change — a 1h revalidation window is fine.

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| `const { locale } = params` (no await) | `const { locale } = await params` |
| Forgetting `setRequestLocale(locale)` | First line of every page; causes missing-locale errors |
| `useTranslations()` in a Server Component | Use `getTranslations()` (async, server-only) |
| `getTranslations()` in a Client Component | Use `useTranslations()` (hook, client-only) |
| Supabase query inside a `'use client'` component | Move query to the Server Component parent, pass as prop |
| `<img>` instead of `<Image>` | Always `next/image` |
| No `alt` on `<Image>` | Required, descriptive text — not empty |
| No `priority` on hero image | LCP score drops; add `priority` to above-the-fold images |
| `useSearchParams()` without `<Suspense>` | Wrap in `<Suspense fallback={...}>` |
| Waterfall: `await A; await B;` | `const [a, b] = await Promise.all([A, B])` |
| Missing `generateMetadata` on a page | Every page must export it |
| Missing `loading.tsx` for data-heavy routes | Add per-segment `loading.tsx` |
| Missing `error.tsx` | App crashes on DB error; add per-segment `error.tsx` |
| `NEXT_PUBLIC_` prefix on a secret | Strip prefix; only readable server-side |
| `new PrismaClient()` / `new SupabaseClient()` per request | Use the singleton factory from `@/lib/supabase/server` |
| Importing server-only modules in Client Components | Use `server-only` package or move to Server Component |

---

## Checklist

**Every new page (`page.tsx`):**
- [ ] File is an `async` Server Component (no `'use client'`)
- [ ] `const { locale } = await params` (not `params.locale`)
- [ ] `setRequestLocale(locale)` is the first statement
- [ ] Exports `generateMetadata` using `getDbMetadata`
- [ ] Parallel `Promise.all` for multiple DB queries
- [ ] All DB calls wrapped in `try/catch` with `null` fallback
- [ ] Returns a single `*-page-content` component with data as props
- [ ] At least one JSON-LD `<script>` tag injected

**Every new route segment:**
- [ ] `loading.tsx` created with skeleton matching the page layout
- [ ] `error.tsx` created (must be `'use client'`)
- [ ] `not-found.tsx` created if route has dynamic segment (`[slug]`)
- [ ] Route added to `sitemap.ts` for all locales

**Every Client Component:**
- [ ] `'use client'` directive at the top
- [ ] No DB queries inside — all data received as props
- [ ] Uses `useTranslations()` for all user-visible strings
- [ ] Uses `cn()` for conditional class composition

**Images:**
- [ ] All `<img>` replaced with `next/image`
- [ ] All images have descriptive `alt` text
- [ ] Above-the-fold image has `priority` prop
- [ ] Responsive images have `sizes` prop

**Fonts:**
- [ ] No new `next/font` instances in components
- [ ] New font registered in `layout.tsx` and exposed as CSS variable

**Environment variables:**
- [ ] No secrets prefixed with `NEXT_PUBLIC_`
- [ ] All new env vars documented in `.env.example`
- [ ] `SITE_URL` imported from `lib/constants/site.ts` — not from `process.env` directly

**Caching / Revalidation:**
- [ ] Quasi-static pages (courses, FAQs) have `export const revalidate = N`
- [ ] On-demand revalidation calls `revalidatePath` after mutations
