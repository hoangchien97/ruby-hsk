# Coding Standard

This document details the code guidelines and engineering principles for the **Ruby HSK** codebase. All new code, refactors, and pull requests must adhere to these standards.

---

## 1. TypeScript Rules

- **Use Strict Mode**: Strict type-checking is enabled. Never use `any` unless absolutely necessary (e.g., logging external payloads), and document the exception.
- **Type Declaration**: Use `type` for component props, API request/responses, and unions. Use `interface` primarily for class shapes or extensible library declarations.
- **Explicit Returns**: Always declare return types for public functions, repository helpers, and API handlers.
- **Avoid Type Casting**: Avoid type assertions (`as Type`) and non-null assertions (`!`). Use type guards (`isType`), narrow types using conditional logic, or handle `undefined` values safely.
- **No Implicit Any**: All variables, arguments, and return types must be fully typed.
- **Readonly Properties**: Mark configuration items or configurations that must not change as `readonly`.

```typescript
// ✅ Correct
type CourseProps = {
  id: string;
  duration: number;
};

export function calculateTotalHours(courses: CourseProps[]): number {
  return courses.reduce((acc, course) => acc + course.duration, 0);
}

// ❌ Incorrect
interface CourseProps {
  id: any;
}

export function calculateTotalHours(courses) {
  return courses.reduce((acc: any, c: any) => acc + c.duration, 0);
}
```

---

## 2. React Rules

- **Functional Components**: Author all components as functional components using standard exports (`export function Component() {}`). Do not use arrows for default component declarations.
- **Prop Typing**: Pass props as a single typed object. Destructure props in the function signature for clarity.
- **Hooks Discipline**:
  - Never call hooks conditionally.
  - Declare hook dependencies explicitly inside `useEffect`, `useMemo`, and `useCallback`.
  - Use custom hooks to isolate component lifecycle logic from presentation design.
- **Minimize State**: Avoid duplicating values in state if they can be calculated using props or existing state variables.
- **Key Attribute**: When rendering lists, specify a unique, stable primitive ID (e.g., database UUID) for the `key` prop. Never use index counters.
- **Client Boundary**: Keep client-interactive scripts separate. Use the strict `'use client'` directive only on file layers that require interactivity or active browser APIs.

```tsx
// ✅ Correct
type CardProps = {
  title: string;
  onSelect: () => void;
};

export function CourseCard({ title, onSelect }: CardProps) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <button onClick={onSelect}>Learn More</button>
    </div>
  );
}
```

---

## 3. Next.js Rules (App Router)

- **Layout/Page Hierarchy**: Use layouts (`layout.tsx`) for global, stateless structural shells (header, footer, navigation bar). Do not run heavy data queries inside layouts if they block children from rendering.
- **Metadata Configuration**: Every public page router must export a `generateMetadata` promise handler. Use the helper `getDbMetadata` to handle overrides and fallback configurations.
- **Dynamic Localization**: Register locale parameters using `setRequestLocale(locale)` at the start of page executions to allow Next.js route parsing optimization.
- **Data Fetching**: Fetch data inside Server Components. Do not call internal route handlers (`/api/courses`) from Server Pages; load repositories directly.
- **Internal Routes**: Always use paths specified in `src/lib/constants/site.ts` (`NavLinks`) instead of inline strings (like `href="/vi/courses"`).
- **Static Pre-generation**: Pages containing static content (like Course views) should implement `generateStaticParams` to pre-build files.

---

## 4. Tailwind & SCSS Rules

- **Design Tokens**: Do not use hardcoded hex values in component styling blocks. All colors, borders, shadows, and paddings must reference variables defined in `src/styles/design-tokens.scss`.
- **Mobile-First Padding**:
  - Main containers on mobile (`<768px`) must use exactly `px-4` (16px) with **0 horizontal margin**.
  - Grid adjustments and wide container constraints (`max-w-[1400px]`, `px-8`) apply only at `md` and `lg` viewport queries.
- **Responsive Primitives**: Select inputs, form controls, and search buttons must dynamically scale down on mobile platforms.
- **Tailwind Class Merging**: Always use the `cn(...)` utility helper to merge Tailwind inputs programmatically.

```tsx
// ✅ Correct
import { cn } from '@/lib/utils';

export function Button({ className, variant }) {
  return (
    <button 
      className={cn(
        "rounded-lg px-4 py-2 text-sm transition-colors",
        variant === "primary" ? "bg-primary text-white" : "bg-gray-100",
        className
      )}
    >
      Click
    </button>
  );
}
```

---

## 5. Naming Conventions

| Item | Case | Suffix / Pattern | Example |
|---|---|---|---|
| Folder Name | kebab-case / lowercase | — | `course-detail/` |
| Component File | kebab-case | `*-page-content.tsx` / component | `course-list.tsx` |
| Page / Layout File | lowercase | `page.tsx`, `layout.tsx` | `page.tsx` |
| Database Table | snake_case (plural) | — | `courses`, `feedback` |
| Database Column | snake_case | — | `title_vi`, `is_published` |
| Types / Interfaces | PascalCase | — | `CourseListItem` |
| Variables / Constants | camelCase / UPPER_CASE | — | `courseData`, `SITE_URL` |
| Repository Files | kebab-case | `*.repository.ts` | `courses.repository.ts` |
| Hooks | camelCase | `use*` prefix | `useAuthSession.ts` |

---

## 6. Comments & Documentation

- **JSDoc for Exported Functions**: Document complex utility hooks, helper functions, and database query procedures using structured JSDoc syntax.
- **Avoid Obvious Comments**: Do not write comments that reiterate what the code obviously does.
- **Contextual Comments**: Use comments (`// TODO`, `// FIXME`) to explain the "why" behind custom logic, third-party library workarounds, or schema limits.
- **Maintain Sync**: Update comments immediately when code functionality changes.

---

## 7. Error Handling

- **Error Boundaries**: Every page must collocate an client error boundary (`error.tsx`) to catch runtime failures without disabling the application layout.
- **Safe Database Returns**: Wrap all repository database queries in `try/catch` statements. Return default defaults (e.g., `[]`, `null`) on failure rather than allowing errors to propagate to the UI level.
- **Safe Parsing (Zod)**: Validate external payloads (form submissions, webhooks, search keys) using Zod schematics. Use `.safeParse(...)` so that validation errors can be processed systematically.

```typescript
// ✅ Correct
export async function getCourseData(id: string): Promise<Course | null> {
  try {
    const data = await db.query(id);
    return data;
  } catch (error) {
    console.error('Failed to load course details:', error);
    return null; // fallback safely
  }
}
```

---

## 8. Performance Standards

- **Interactive Dynamic Loading**: Lazy load heavy interactive tools (like Google Map components) using `next/dynamic` with `ssr: false` to reduce core bundle size.
- **Image Optimization**:
  - Always use `next/image` rather than standard `<img>` assets.
  - Supply appropriate `sizes` tags to prevent loading oversized image resolutions.
  - Add the `priority` attribute to above-the-fold assets (e.g., site logo, main hero graphic).
  - Define explicit width and height dimensions to maintain layout stability.
- **Waterfall Prevention**: Trigger unrelated database calls concurrently using `Promise.all`.
- **System Fonts**: Load resources through `next/font/google` and configure them for styling with the `display: 'swap'` parameter to avoid layout shifts.

---

## 9. Accessibility (a11y)

- **Semantic HTML**: Use semantic layout tags (`<main>`, `<section>`, `<header>`, `<nav>`, `<article>`) instead of nested standard `<div>` wrappers.
- **Label Associations**: Link Form inputs with descriptive label indicators using `htmlFor`.
- **Aria Attributes**: Include descriptive alt attributes on images and declare custom labels (`aria-label`) on interactive icon buttons.
- **Color Contrast**: Verify styling contrasts meet WCAG AA standards.
- **Keyboard Navigation**: Ensure custom dynamic menus, panels, and collapsible elements can be reached and exited using keyboard keys (Enter, Esc).

---

## 10. Security Rules

- **Database Policies (RLS)**: Keep Row Level Security enabled on all Supabase tables. Do not allow clients to bypass security filters.
- **Secret Separation**: Never prefix server secrets (like DB credentials, internal API keys) with the `NEXT_PUBLIC_` tag.
- **Strict Sanitization**: Never inject unescaped content using `dangerouslySetInnerHTML` unless parsing pre-sanitized database markdown.
- **Anti-automation**: Protect submit forms (such as contact inputs) against script execution using rate limits or verification tags.

---

## 11. Coding Standard Verification Checklist

Before pushing changes to production, verify:

- [ ] **TypeScript**
  * Strict mode parses successfully with 0 warnings.
  * Extraneous standard variables are typed and default `any` is eliminated.

- [ ] **React & Next.js**
  * Page files are clean server-side components.
  * Interactivity elements are locked behind isolated client boundary tags.
  * Custom translations match both `vi.json` and `en.json` dictionaries.

- [ ] **Styling & Presentation**
  * Spacings are built mobil-first, checking constraints on 390px layouts.
  * Layout features use SCSS variables. Hex values are not used.

- [ ] **Technical Performance**
  * Google PageSpeed LCP elements are loaded with `priority` flags.
  * Image alt details describe page-specific assets.
  * DB connections run through transactional connection routes (port 6543).
