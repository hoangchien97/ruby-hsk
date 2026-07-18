# Ruby HSK — Product & Technical Architecture

Welcome to the **Ruby HSK** repository. This document serves as the high-level onboarding runbook for senior developers. It details the system architecture, core design patterns, structural boundaries, and technical constraints of the project.

---

## 1. Context & Business Domain

**Ruby HSK** is a localized educational brand based in Hanoi, Vietnam, specialized in Mandarin Chinese language instruction aligned with the HSK classification system (HSK 1-6). 

- **Core Model**: Small classes, 1-on-1 tutoring, and conversational lessons.
- **Key Individuals**: The educational catalog and brand identity center around **one teacher: Cô Trần Hồng Ngọc (Ms. Ruby Tran)**. 
- **Audience**: Vietnamese native speakers. All site assets, content layouts, and functional databases are localized bilingually in **Vietnamese (Default)** and **English**.

---

## 2. Technical Stack

* **Framework**: Next.js (App Router with i18n middleware routing)
* **Language**: TypeScript (strict mode enabled)
* **Styling**: Vanilla SCSS (centralized design token variables) + Tailwind CSS (where utility support is needed)
* **Database & Auth**: Supabase (PostgreSQL with RLS policy enforcement)
* **Bilingual Localization**: `next-intl` (using dynamic request locale headers)
* **SEO**: Programmatic Metadata API + custom inline JSON-LD schemas + automated `sitemap.ts` and `robots.ts`

---

## 3. Directory Layout

A quick run-through of the directory structure:

```
src/
├── app/                  # Next.js App Router root layout and paths
│   ├── [locale]/         # Multilingual route shell
│   │   ├── courses/      # Course catalog path
│   │   ├── about/        # Brand and Teacher bio
│   │   └── contact/      # Contact forms, address map, FAQs
│   ├── api/              # Internal API points (webhook endpoints)
│   ├── globals.scss      # Main layout style rules importing variables
│   └── sitemap.ts        # Sitemap generation combining DB dynamic pathways
├── components/           # Component library
│   ├── ui/               # Primary components (buttons, links, inputs)
│   ├── layout/           # Global wrappers (headers, footers, shell)
│   └── [feature]/        # Feature-scoped client views (courses/, contact/)
├── i18n/                 # Localization middleware and pathname routers
├── lib/                  # Utilities, database connection utilities
│   ├── constants/        # Central brand definitions (site.ts is single source of truth)
│   └── supabase/         # Server and browser DB connection client wrappers
├── messages/             # Localization key files (vi.json, en.json)
├── styles/               # Styling entry points and HSL design tokens
└── types/                # System typescript definitions
```

---

## 4. Architectural Patterns

### The Container-Presentation Split (Server vs. Client)
To maximize rendering performance, SEO quality, and edge cache opportunities:
1. **Dynamic Pages (`page.tsx`)** act as **Async Server Components**. They fetch data directly from databases/APIs (avoiding internal API route calls) and retrieve translation hooks.
2. **Page Content Views (`*-page-content.tsx`)** operate as client components underneath a `'use client'` declaration. They handle element interactive layers, event loops, animations, and state inputs.
3. Server pages feed data to Presentation clients using **serializable props** only.

### Dual Client Supabase Integration
1. **Server Context**: Executed within server controllers (`page.tsx`, Route Handlers, Server Actions) via `createServerSupabaseClient()`. Retrieves tokens locally and honors row-level security (RLS).
2. **Browser Context**: Executed within interactive client views via `createBrowserSupabaseClient()`. Uses anonymous credentials to connect and submit requests (e.g. form entries).

### The Three-Layer SEO Model
Every route utilizes a three-tier SEO framework for performance:
1. **Database Override**: The database `page_metadata` table contains custom localized overrides indexed by `page_path`.
2. **Translation Fallback**: If no active row exists in the database, `getDbMetadata` falls back to translations (`metaTitle`/`metaDesc` variables inside the translation bundle).
3. **Structured Data (JSON-LD)**: Injected as raw `<script type="application/ld+json">` payloads in pages. The structures are generated programmatically using domain constants rather than hardcoded string components.

```
                  [generateMetadata call]
                            │
              Is page_path in page_metadata?
                 /                    \
              [Yes]                   [No]
               /                        \
    Load DB Title/Description  Load getTranslations() fallback
               \                        /
             Merge into Next.js Metadata object
```

### The i18n Rule
`next-intl` uses file translation definitions in `src/messages/`.
* `vi.json` is the **source of truth**.
* `en.json` contains identical object keys. Any change in translation layouts must maintain alignment between these files to prevent route compilation failures.

---

## 5. Coding & Styling Conventions

### Database Naming
* Tables and Columns are named in `snake_case` (e.g., `course_categories`, `is_published`).
* Multi-language fields append locale suffixes: `title_vi`, `title_en`.

### TypeScript Domain Names
* Classes, interfaces, and types are defined in `PascalCase` (e.g., `CourseListItem`).
* Properties utilize camelCase (e.g., `isPublished`) when parsed inside the frontend client layer.

### Spacing & Grid Rules (Mobile-First)
To optimize UX for mobile learners:
* **Horizontal Section Padding**: Mobile layouts use `px-4` (16px) with **0 horizontal margin**. Grids adjust to desktop containers (`max-w-[1400px]`, `px-8` padding) at `md` (768px) and `lg` breakpoints.
* **Component Scaling**: Input sizes, padding intervals, and typography sizes are scaled down on mobile viewports.

---

## 6. Critical Security & Performance System Boundaries

* **Row-Level Security (RLS)**: Enforced on all Supabase tables. No database query should execute client-side unless a secure policy governs access.
* **Connection Pooling**: Always connect to Supabase at runtime using the connection pooler endpoint (port `6543`). The direct connection port (`5432`) is restricted to migration pipelines (`DIRECT_URL`).
* **Waterfalls**: Sibling records are fetched concurrently. Always group database fetches in `Promise.all` inside Server Pages:
  ```ts
  const [courses, categories] = await Promise.all([
    getCourses(locale),
    getCategories(locale)
  ]);
  ```
* **No Barrel Re-exports**: Avoid using `index.ts` files inside common directories unless requested. Keep imports direct to preserve Next.js tree-shaking capabilities.
* **Interactive Elements Check**: Every page must implement dynamic error boundaries (`error.tsx`) and streaming templates (`loading.tsx`) to avoid display pauses.

---

## 7. Delivery & Deployment

- Local dev server is run with `npm run dev`.
- Production bundle verification is run with `npm run build`.
- Prisma migrations (if applied) require direct schema mapping updates using `DIRECT_URL`.
- Static output components are validated as responsive down to 390px.
