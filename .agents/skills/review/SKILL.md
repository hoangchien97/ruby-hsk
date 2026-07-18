---
name: review
description: "Activate this Skill after every task implementation to perform a comprehensive code review covering bugs, duplication, type-safety, lints, performance, a11y, SEO, security, rerenders, bundle size, and dead code."
---

# Code Review Skill

## Purpose

Enforce code quality standards by carrying out a rigorous code review process after **every** implementation. This skill serves as the blueprint for evaluating modifications prior to marking tasks as ready.

---

## Code Review Checklist & Inspection Guide

### 1. Bug Inspection
* **State Boundaries**: Ensure array outputs look for empty/null lists. Look out for `undefined` map calls causing exceptions:
  ```ts
  // ❌ Throws if items is null
  items.map(i => ...)
  // ✅ Safe boundary check
  (items ?? []).map(i => ...)
  ```
* **Date Parsing**: All dates must handle timezone normalization locally (e.g. UTC+7 for Vietnam).
* **Async Pitfalls**: Ensure error scopes handle database query dropouts rather than letting API loaders hang.

### 2. Duplicated Code
* **Shared Logic Extraction**: Look for repeated styling arrays or utility functions (e.g., matching pinyin tone parsers). Extract them into `src/lib/utils.ts` or scoped helper modules.
* **Reusable Primitives**: Confirm new views use existing UI components (`src/components/ui/`) rather than styling custom div buttons or inputs.
* **Translation Key Cleanups**: Consolidate redundant translation keys in `vi.json` and `en.json`.

### 3. Type Safety
* **No `any`**: Audit modified files for explicit or implicit `any` assignments.
* **Strict Checks**: Never use type assertions (`as Type`) or non-null assertions (`!`) to override compiler errors. Resolve underlying data shape declarations.
* **Prop Signatures**: React components must compile with strict prop types derived via `Prisma` payloads or explicit domains.

### 4. Lint Check
* Run `npm run build` or standard lint compiler validations first.
* **Unused Imports**: Ensure imported modules, types, or variables are deleted if they are not actively referenced in execution path.
* **Dependency Arrays**: All dependencies used inside `useEffect`, `useMemo`, and `useCallback` hooks must be explicitly listed in the tracking array.

### 5. Performance
* **Parallel DB Queries**: Ensure sibling query arrays use `Promise.all` instead of synchronous waterfall structures.
* **Layout Thrashing**: Never write manual DOM updates that trigger browser repaint waterfalls.
* **Dynamic Imports**: Import heavy interactive widgets (e.g., Leaflet Maps, dynamic Charts) with `next/dynamic` containing `ssr: false` to keep pages lightweight.

### 6. Accessibility (a11y)
* **Alt Attributes**: All `<Image>` tags must have descriptive alt strings.
* **Keyboard Navigation**: Users must be able to focus, select, and close interactive client UI (like contact dropdowns) using the Space, Enter, and Esc buttons respectively.
* **Semantic HTML**: Mark structure elements using `<header>`, `<main>`, `<section>`, `<nav>`, `<article>` tags. Avoid using nested collections of raw `<div>` layers.

### 7. SEO
* **Metadata API**: Verify the presence of `generateMetadata` exports on all new routes.
* **Canonical Path**: Check canonical definitions match the expected target route format.
* **JSON-LD Schema**: Ensure dynamic scripts pass standard properties matching database values (verify the single teacher details: Ms. Ruby Tran, 5 years experience).
* **Language tag**: Elements rendering Chinese characters must include `lang="zh-Hans"` for correct browser render.

### 8. Security
* **Supabase RLS**: Double-check that new tables have default Row-Level Security policies active.
* **Client Key Separation**: Do not prefix private, server-only environment attributes with `NEXT_PUBLIC_`.
* **Danger Avoidance**: Avoid using `dangerouslySetInnerHTML` unless parsing pre-authenticated database content. Use markdown compilers with clean sanitization rules.

### 9. Rerendering Isolation (React)
* **Minimize State Propagation**: Place complex state handles as close to the leaf components as possible. Do not hoist layout state changes containing large component trees.
* **Hook Wrappers**: Wrap heavy data computation routines or dynamic array mappings in `useMemo`. Wrap callbacks fed to child components in `useCallback`.
* **Clean Effects**: Always return clean-up event actions inside state `useEffect` observers (e.g., clear timers, detach listeners).

### 10. Bundle Size & Tree-Shaking
* **Explicit Imports**: Do not import components through global index barrel indexes if direct file imports are available.
* **Selective Packages**: Avoid adding external helper packages if native JavaScript arrays or calculations provide the same utility.
* **Asset Formats**: Check that public images use modern media extensions (`.webp`, `.avif`, `.svg`).

### 11. Dead Code Removal
* **Orphan Code cleanups**: Inspect codebase for declared constants, routes, interfaces, or variables that are not referenced anymore.
* **Commented Blocks**: Remove blocks of commented-out logic, obsolete markup experiments, or debugging console arrays.

---

## Code Review Protocol

### Step 1: Verification Commands
Run the validation build processes globally to verify changes are safe:
```bash
# Verify compilation and types
npm run build
```

### Step 2: The Code Diff Review
Open the code changes in your git tool or diff output. Go through each section of this skill sequentially:
1. **Locate Client boundaries**: Ensure client blocks ('use client') only handle visual state.
2. **Review DB connection pooler**: Confirm queries do not target the direct channel (port `5432`) at runtime.
3. **Verify Translation file shapes**: Check `en.json` matches keys present in `vi.json` exactly.

### Step 3: Actionable Fix list
If any area fails:
* Rectify issues inside files immediately.
* Do not mark task completed until type compilation builds with 0 critical warnings.

---

## When This Skill Should Automatically Activate

- At the completion of any implementation phase
- Before making Git commits or proposing pull requests
- When running final codebase audits or task validations
