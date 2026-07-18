---
name: seo
description: "Activate for any SEO-related task: generateMetadata, JSON-LD structured data, Open Graph, Twitter Card, canonical URLs, sitemap.xml, robots.txt, page titles, meta descriptions, heading hierarchy, image alt text, performance (Core Web Vitals), or reviewing the page_metadata database table."
---

# Next.js SEO Skill

## Purpose

Enforce search engine optimization (SEO) standards for the **Ruby HSK** web application. Since organic search is prime source of acquisition for a language school, this skill outlines rules for Metadata API, structured data, page speed, routing, and search crawl configurations.

---

## Metadata API

App Router uses the built-in Metadata API to manage `<head>` tags. Export either a static `metadata` object or an async `generateMetadata` function from pages or layouts.

### Static Metadata
Used for pages with no dynamic segments or translations:
```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Giới thiệu | Ruby HSK',
  description: 'Học tiếng Trung hiệu quả cùng Cô Trần Hồng Ngọc tại Hà Nội.',
};
```

### Dynamic Metadata (`generateMetadata`)
Used when metadata depends on dynamic parameters (like `locale`, `slug`) or data fetching:
```tsx
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getDbMetadata } from '@/lib/seo/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });
  
  // getDbMetadata fetches database configuration for '/about' or falls back
  return getDbMetadata(
    locale, 
    '/about', 
    t('metaTitle'),   // fallback title
    t('metaDesc')     // fallback description
  );
}
```

### Metadata Templates (Layout Level)
Set default titles and template patterns at layout levels, which propagates downward:
```tsx
// app/[locale]/layout.tsx
export const metadata: Metadata = {
  title: {
    template: '%s | Ruby HSK',
    default: 'Ruby HSK - Học Tiếng Trung HSK Uy Tín Tại Hà Nội',
  },
};
```

---

## OpenGraph

OpenGraph (OG) tags govern how pages appear when shared on platforms like Facebook, Zalo, LinkedIn, and Slack.

- **Title/Description**: Set `title` and `description` inside the `openGraph` object.
- **Images**: Maintain a ratio of `1.91:1` (ideally `1200x630px`).
- **URL**: Use absolute canonical URLs.
- **Type**: Use `website` for standard pages, `article` for blog posts, and `profile` for teachers.

```ts
const ogMetadata: Metadata = {
  openGraph: {
    title: 'Khóa học Tiếng Trung HSK | Ruby HSK',
    description: 'Lộ trình học tiếng Trung từ HSK 1 đến HSK 6 tinh gọn.',
    url: 'https://rubyhsk.vn/vi/courses',
    siteName: 'Ruby HSK',
    type: 'website',
    locale: 'vi_VN',
    images: [
      {
        url: 'https://rubyhsk.vn/images/og-courses.webp',
        width: 1200,
        height: 630,
        alt: 'Lớp học HSK tại Ruby HSK Hà Nội',
      },
    ],
  },
};
```

---

## Twitter Card

Optimize how links appear on X (formerly Twitter).

- Use `summary_large_image` for the rich card layout.
- If using `summary_large_image`, ensure the card image is matching `1200x630px`.

```ts
const twitterMetadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'Khóa học Tiếng Trung HSK | Ruby HSK',
    description: 'Chinh phục HSK cùng thạc sĩ Hán ngữ Trần Hồng Ngọc.',
    images: ['https://rubyhsk.vn/images/og-courses.webp'],
  },
};
```

---

## JSON-LD (Structured Data)

Structured Data helps search engines parse the semantics of the page content.
In Next.js, inject JSON-LD as a `<script>` tag inside your page component.

### Organization Schema (Site Shell)
Injected only once in the root localized layout `[locale]/layout.tsx`:
```tsx
import { buildOrganizationLD } from '@/lib/seo/jsonld';

export default function RootLocaleLayout({ children, params }) {
  const orgSchema = buildOrganizationLD();
  return (
    <html>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Breadcrumb Schema (All inner pages)
Must match active path naming and hierarchy:
```tsx
import { buildBreadcrumbLD } from '@/lib/seo/jsonld';

const breadcrumbSchema = buildBreadcrumbLD(locale, [
  { name: 'Trang chủ', item: '/' },
  { name: 'Khóa học', item: '/courses' }
]);
```

### Course / FAQ Schema (Page Specific)
Provide accurate prices, instructor details, FAQs matching visible text:
```tsx
const courseSchema = buildCourseLD({
  name: course.titleVi,
  description: course.descriptionVi,
  providerName: 'Ruby HSK',
  providerUrl: 'https://rubyhsk.vn',
  price: course.price_vnd,
  priceCurrency: 'VND',
});
```

---

## Canonical & Localization Alternates

To prevent duplicate content penalties and ensure search engines direct users to correct language variations, set up canonical links and localized `hreflang` alternates.

```ts
// alternates configuration returned by getDbMetadata
const alternates = {
  canonical: 'https://rubyhsk.vn/vi/courses',
  languages: {
    'vi-VN': 'https://rubyhsk.vn/vi/courses',
    'en-US': 'https://rubyhsk.vn/en/courses',
    'x-default': 'https://rubyhsk.vn/vi/courses',  // default locale fallback page
  },
};
```

---

## Robots

Next.js generates `robots.txt` programmatically using a `robots.ts` file in the root `app/` directory.

```ts
// src/app/robots.ts
import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',          // Disallow crawler access to dashboards
        '/api/',            // Disallow crawl of backend endpoints
        '/*/admin/',
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

---

## Sitemap

Generate a dynamic `sitemap.xml` file using `sitemap.ts` in the root `app/` directory. Next.js supports static route generation and dynamic database query mapping within `sitemap.ts`.

```ts
// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants/site';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ['', '/courses', '/about', '/contact'];
  const locales = ['vi', 'en'];

  // 1. Static routes across all locales
  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${SITE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: route === '' ? 1.0 : 0.8,
    }))
  );

  // 2. Fetch dynamic routes (e.g. course slugs) from Database
  const supabase = createServerSupabaseClient();
  const { data: courses } = await supabase
    .from('courses')
    .select('slug, updated_at')
    .eq('is_published', true);

  const dynamicEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    (courses ?? []).map((course) => ({
      url: `${SITE_URL}/${locale}/courses/${course.slug}`,
      lastModified: new Date(course.updated_at),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))
  );

  return [...staticEntries, ...dynamicEntries];
}
```

---

## ISR (Incremental Static Regeneration)

Incremental Static Regeneration permits updating static pages after build-time without redeploying.

- Use ISR on marketing components (Course list, FAQs) by declaring a `revalidate` timeline inside page routers.
- Set revalidation to reasonable business intervals to control DB overhead (e.g., 3600 seconds = 1 hour).

```tsx
// app/[locale]/courses/page.tsx
export const revalidate = 3600; // Recalculate this route every hour
```

To revalidate immediately upon admin modification, use Server Actions or Webhooks to fire:
```ts
import { revalidatePath } from 'next/cache';

async function updateCourseAction(id, data) {
  // Update Course in DB...
  revalidatePath('/[locale]/courses', 'layout'); // Clears cache for courses paths
}
```

---

## SSG (Static Site Generation)

For completely static structures that require high performance and low TTFB, pre-generate paths during build using `generateStaticParams`.

```tsx
// app/[locale]/courses/[slug]/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function generateStaticParams() {
  const supabase = createServerSupabaseClient();
  const { data: courses } = await supabase
    .from('courses')
    .select('slug')
    .eq('is_published', true);

  // Generate paths for both languages
  const locales = ['vi', 'en'];
  return locales.flatMap((locale) =>
    (courses ?? []).map((course) => ({
      locale,
      slug: course.slug,
    }))
  );
}
```

---

## Performance

Page speed directly affects search rankings (specifically mobile search).

1. **Defer heavy JavaScript**: Put non-critical trackers or maps in lazy components.
2. **Minimize Render Waterfall**: Fetch primary dashboard or course records in parallel.
3. **Use CSS Custom Variables**: Prevent flash of unstyled content or custom variables imports.
4. **Use Next/Dynamic**: Load interactive features (like leaf maps or accordions) dynamically.

```tsx
import dynamic from 'next/dynamic';

// Defer maps or client charts to improve TTI/TBT
const InteractiveMap = dynamic(
  () => import('@/components/contact/interactive-map'),
  { ssr: false, loading: () => <p className="h-64 animate-pulse bg-gray-200" /> }
);
```

---

## Core Web Vitals (CWV)

Focus on the main metrics tracked by Google PageSpeed Insights:

### 1. Largest Contentful Paint (LCP)
The time it takes to render the largest visible block of content.
* **Fix**: Mark above-the-fold images (banners, hero pictures) with the `priority` attribute.
* **Fix**: Ensure layout layouts do not block rendering on slow client requests.

### 2. Interaction to Next Paint (INP)
Measures user interaction latency until UI repaints.
* **Fix**: Ensure form submissions or buttons transition to a loading state within 100ms.
* **Fix**: Handle state transitions outside heavy component files.

### 3. Cumulative Layout Shift (CLS)
Measures unexpected layout shifts.
* **Fix**: Assign strict width/height or aspect ratios to graphics.
* **Fix**: Reserve size slots for client-loaded widgets (e.g. Google Maps placeholder size).
* **Fix**: Load fonts locally or via `next/font/google` to avoid layout adjustments during font swaps.

```tsx
// Keep layout stable while Google Map loads
<div className="relative h-[250px] md:h-[450px] w-full bg-surface-variant overflow-hidden rounded-2xl">
  <InteractiveMap />
</div>
```

---

## Image SEO

Images must look professional and act as keyword metadata anchors for crawls.

1. **Alternate Text**: Add custom `alt` strings referencing topic relevance:
   * ❌ `alt="ruby"`, `alt="Image_1"`
   * ✅ `alt="Cô Trần Hồng Ngọc giảng bài HSK 4 tại Ruby HSK"`
2. **Dimensions**: Set correct sizes properties to feed appropriate resolutions.
3. **Format**: Next.js automatically converts `.png`/`.jpg` to `.webp` or `.avif`. Use them to save storage.

```tsx
import Image from 'next/image';

<Image
  src="/images/logo.png"
  alt="Logo Trường Tiếng Trung Quốc Ruby HSK Hà Nội"
  width={120}
  height={120}
  sizes="(max-width: 768px) 80px, 120px"
  className="object-contain"
/>
```

---

## Internal Links

Semantic link navigation enables crawlers to analyze site architecture.

- **Next/Link**: Always use `<Link>` from `next/link`. Never use raw `<a>` tags for internal paths.
- **Prefetching**: Next.js pre-fetches linked routes when they enter the viewpoint. Preserve default `prefetch={true}` for primary navigation nodes.
- **Descriptive Text**: Make link content descriptive.
  * ❌ `Xem thêm` or `Click here`
  * ✅ `Tìm hiểu Lớp luyện thi HSK 3`
- If using wrapper nodes (interactive cards), wrap elements inside `<Link>` or supply an explicit `href`.

```tsx
import Link from 'next/link';

<Link 
  href={`/${locale}/courses/${course.slug}`} 
  aria-label={`Chi tiết khóa học ${course.titleVi}`}
  className="font-medium text-primary hover:underline"
>
  Chi tiết khóa học {course.titleVi} &rarr;
</Link>
```

---

## Checklist

**Before Publishing Pages/Changes:**

- [ ] **Metadata API**
  * `generateMetadata` exports on every page.
  * No hardcoded titles/descriptions. Fallback strings are retrieved from locale dictionary translation namespaces.
  * Canonical path matches structure path (e.g., `https://rubyhsk.vn/vi/courses`).

- [ ] **OpenGraph & Twitter Card**
  * Card values are set to `summary_large_image`.
  * OpenGraph image points to verified `.webp` asset. Dimensions are correct at `1.91:1`.

- [ ] **JSON-LD**
  * `buildBreadcrumbLD` is mounted on all hierarchy sub-pages.
  * `buildFaqPageLD` or similar schemas are mounted on matching components.
  * Values (phone, emails, address) match `src/lib/constants/site.ts` definitions.

- [ ] **Sitemap & Robots**
  * Dynamic sitemap returns correct routing entries including localization tags.
  * Static routes are listed inside `sitemap.ts` for all configured locales.
  * `robots.ts` disables public crawling of admin sections.

- [ ] **Caching & Performance**
  * Dynamic segments utilize `revalidate` constants where appropriate.
  * Custom dynamic layouts make database fetches concurrently via `Promise.all`.
  * Non-critical components are imported using `next/dynamic`.

- [ ] **Core Web Vitals & Media**
  * Images have explicit sizes parameters. Alt labels are descriptive.
  * Hero image / logo contains `priority={true}` parameter.
  * Page fonts are loaded only in root layout with `display: 'swap'`.
  * Inline elements use `lang="zh-Hans"` style if rendering Chinese characters.
