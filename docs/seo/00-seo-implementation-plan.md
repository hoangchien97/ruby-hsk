# 00 — SEO implementation plan for Ruby HSK Landing

> State when written: the site had a single static `metadata` object shared by every page in `src/app/[locale]/layout.tsx`.
> No `sitemap.ts`, `robots.ts`, `manifest.ts`, no JSON-LD, no `public/` assets yet.
>
> **2026-07-06 status note:** most of this plan has since been implemented — `sitemap.ts`, `robots.ts`, `manifest.ts` exist, all 6 route pages have their own `generateMetadata`, and `src/lib/seo/jsonld.ts` is wired into Home/About/Contact/Courses. Treat the checklists below as a reference for verifying completeness, not as a from-scratch task list.

## 1. `metadataBase` and title template

```ts
// src/app/[locale]/layout.tsx (guidance, as originally proposed)
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Ruby HSK - Học tiếng Trung & luyện thi HSK',
    template: '%s | Ruby HSK'
  }
};
```

- `NEXT_PUBLIC_SITE_URL` must be the real domain in production (Phase 9) — never let `localhost` leak into a production build.

## 2. Per-page metadata (`generateMetadata`)

Every route under `src/app/[locale]/*/page.tsx` needs its own `generateMetadata`, at minimum: `title`, `description`, `alternates.canonical`, `alternates.languages` (vi/en), `openGraph`, `twitter`.

| Route | Suggested title (VI) | Primary keyword |
|---|---|---|
| `/[locale]` | Ruby HSK – Học tiếng Trung & luyện thi HSK cùng cô Trần Hồng Ngọc | học tiếng Trung, trung tâm tiếng Trung |
| `/[locale]/courses` | Khóa học tiếng Trung & luyện thi HSK 1-6 | khóa học HSK, luyện thi HSK |
| `/[locale]/about` | Về Ruby HSK – Giáo viên Trần Hồng Ngọc | trung tâm tiếng Trung, giáo viên tiếng Trung |
| `/[locale]/contact` | Liên hệ tư vấn khóa học tiếng Trung | tư vấn học tiếng Trung |
| `/[locale]/privacy` | Chính sách bảo mật | (no keyword optimization needed; consider `noindex` if content stays thin) |
| `/[locale]/terms` | Điều khoản sử dụng | (same as above) |
| `/[locale]/coming-soon` | Sắp ra mắt | (should be `noindex` — temporary page) |

### Standard pattern for a route

```ts
export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Courses'});
  const path = '/courses';
  return {
    title: t('title'),
    description: t('sub'),
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {vi: `/vi${path}`, en: `/en${path}`}
    },
    openGraph: {title: t('title'), description: t('sub'), url: `/${locale}${path}`, locale, type: 'website'},
    twitter: {card: 'summary_large_image', title: t('title'), description: t('sub')}
  };
}
```

Apply the same pattern to every route.

## 3. `sitemap.ts` (`src/app/sitemap.ts`)

- List every public route × 2 locales (`vi`, `en`).
- Never include `coming-soon` (temporary page) or the 404 page in the sitemap.
- Use `routing.locales` from `src/i18n/routing.ts` to avoid duplicating the locale list.
- `lastModified` comes from build time, or from `site_settings`/a CMS later if available.

## 4. `robots.ts` (`src/app/robots.ts`)

- Allow everything, disallow `/api/*` if an internal route handler is added later.
- Point `sitemap` at `${siteUrl}/sitemap.xml`.

## 5. `manifest.ts` (`src/app/manifest.ts`)

- `name`/`short_name`: "Ruby HSK".
- `theme_color`: `#b52330` (matches the Vibrant Academic Ivory primary color).
- Icons: need real assets from Stitch (Phase 2) before finalizing.

## 6. JSON-LD

Add a `src/lib/seo/jsonld.ts` helper that generates the following schemas, embedded via `<script type="application/ld+json">` in the relevant layout/page:

| Schema | Where to embed | Main content |
|---|---|---|
| `Organization` | `[locale]/layout.tsx` (site-wide) | name, url, logo, sameAs (Zalo/Facebook once available) |
| `EducationalOrganization` (extends `LocalBusiness`) | Home or About | name, address (if there's a physical address), teacher (`employee` → `Person` for Ms. Trần Hồng Ngọc) |
| `Course` | Each item on the Courses page (ideally once the `courses` Supabase table is live) | name, description, provider (Organization), hasCourseInstance if there's a schedule |
| `FAQPage` | Home (needs an FAQ UI section) or Courses | real Q&A, never placeholder |
| `BreadcrumbList` | Every sub-page (Courses, About, Contact, Privacy, Terms) | Home > current page |

Never embed `Course`/`FAQPage` with fake data — only once real content exists (to avoid violating Google's structured-data content-matching guidelines).

## 7. Keyword-driven content strategy

| Target keyword | Primary page | On-page handling |
|---|---|---|
| học tiếng Trung | Home | H1 uses the phrase naturally, never stuffed |
| luyện thi HSK | Courses | Title + H1 + per-level (HSK 1-6) description |
| khóa học HSK | Courses | Each course card gets its own URL/slug once detail pages exist (`/courses/[slug]`) |
| tiếng Trung giao tiếp | Home ("Communication" feature) + Courses (if there's a dedicated course) | Content describes real communication scenarios |
| học tiếng Trung cho người mới bắt đầu | Courses (beginner level) | Emphasize "for beginners" in the beginner course description |
| trung tâm tiếng Trung | About, Home footer | Emphasize the "Ruby HSK" brand + service area (needs real info) |

Principle: write naturally for the reader first — keywords should only appear naturally in H1/description/alt text, never stuffed.

## 8. Alt text strategy

- Every content-bearing `<Image>`/icon (not decorative) needs alt text describing the content, naturally including a keyword where relevant (e.g. teacher photo: `alt="Cô Trần Hồng Ngọc giảng dạy tiếng Trung tại Ruby HSK"`).
- Purely decorative icons (lucide-react inside a button) keep `aria-hidden` or skip alt text since the parent element already has `aria-label` (already correct in `ThemeToggle`, `FloatingContact`).
- `LogoIcon` already has `aria-label="Ruby HSK logo"` + `<span className="sr-only">Ruby HSK</span>` — keep this pattern for every icon-only component.

## 9. Internal linking strategy

- Header/Footer/MobileNav already link fully between Home/Courses/About/Contact/Privacy/Terms — keep as is.
- To add: Home → Courses (already via the "View courses" button), Courses → About (add a "Meet the teacher" CTA), About → Contact (has "Get a study-plan consultation" copy but wasn't wrapped in a `Link` — needs an `href`).
- Once per-course detail pages (`/courses/[slug]`) exist, add breadcrumbs + a link back to `/courses`.

## 10. Performance / Core Web Vitals checklist

| Item | State at the time | To do |
|---|---|---|
| Font loading | `next/font/google` (Noto Sans) with `display: swap` | Already correct, keep as is |
| Images | `next.config.ts` allows `remotePatterns` for all `https://**` | Once real images exist, prefer `next/image` with `sizes`/`priority` for above-the-fold (hero) images |
| CLS | No real images yet, so unmeasured | Set `width`/`height` or `fill` + a fixed-ratio container once images are added |
| LCP | Hero uses a gradient + icon, no heavy image | Keep it light; use `priority` for a hero image if one is added |
| JS bundle | Every page is a Server Component except the `'use client'` parts (ThemeToggle, LanguageToggle, MobileBottomNav, AppProviders) | Keep the "minimal client components" approach |
| Turbopack dev | Already using `next dev --turbopack` | No change needed |

## 11. Before writing Phase 5 code

- [x] Real domain to set `NEXT_PUBLIC_SITE_URL` in production. *(rubyhsk.vn is already referenced as the default in `sitemap.ts`/`robots.ts`)*
- [ ] Real FAQ content (no FAQ UI section exists yet) before embedding the `FAQPage` schema.
- [ ] Official photos/logo (Phase 2, from Stitch) before finalizing `manifest.ts` icons and the default OG image.
