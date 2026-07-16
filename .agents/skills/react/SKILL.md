---
name: react
description: "Activate for any React-specific task: component authoring, hooks (useState, useEffect, useMemo, useCallback, useRef, useContext), event handling, conditional rendering, lists and keys, forms, portals, refs, context, and component composition patterns. Also triggers on: 'use client', props design, component splitting decisions, performance (memo, lazy, Suspense), and any Client Component in this Next.js project."
---

# React Skill

## Purpose

Guide correct React patterns for **client-side components** in this project. This project uses React as embedded in Next.js App Router — Server Components are covered by the `nextjs` skill. This skill focuses on **`'use client'` components**, hooks, and interactivity patterns.

---

## Best Practices

### Component Design

- One component per file. Named export only (`export function MyComponent`). No default exports.
- Props interface defined inline directly above the function:
  ```tsx
  interface Props {
    locale: string;
    items: CourseItem[];
    onSelect?: (id: string) => void;
  }

  export function CourseList({ locale, items, onSelect }: Props) {
    ...
  }
  ```
- Keep components small and focused. If a component has more than ~150 lines of JSX, split it.
- Prefer composition over configuration — pass children or sub-components rather than adding more props.

### Hooks

#### useState
```tsx
// ✅ group related state
const [isOpen, setIsOpen] = useState(false);
const [selectedId, setSelectedId] = useState<string | null>(null);

// ❌ avoid storing derived data in state — compute it
const [filteredItems, setFilteredItems] = useState(items); // ❌ use useMemo instead
```

#### useMemo
Use for expensive derivations — filtering, sorting, mapping large arrays:
```tsx
const filtered = useMemo(
  () => items.filter(item => item.categoryId === selectedCategory),
  [items, selectedCategory]
);
```

#### useCallback
Use when passing stable function references to child components to avoid re-renders:
```tsx
const handleSelect = useCallback((id: string) => {
  setSelectedId(id);
}, []);
```

#### useEffect
- Avoid if possible — prefer event handlers or SSR data.
- Always specify a dependency array. Empty array `[]` = run once on mount.
- Always clean up subscriptions, timers, and event listeners:
  ```tsx
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  ```

#### useRef
```tsx
// DOM access
const inputRef = useRef<HTMLInputElement>(null);
// Mutable value without re-render
const timerRef = useRef<ReturnType<typeof setTimeout>>();
```

### Forms

No form library used. Controlled components with `useState`:

```tsx
const [value, setValue] = useState('');
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  if (!value.trim()) { setError(t('required')); return; }
  setLoading(true);
  try {
    await supabase.from('contact_submissions').insert({ ... });
    // show success
  } catch {
    setError(t('submitError'));
  } finally {
    setLoading(false);
  }
}
```

### Lists and Keys

```tsx
// ✅ stable, unique key from data
{courses.map(course => <CourseCard key={course.id} course={course} />)}

// ❌ never use array index as key for dynamic lists
{courses.map((course, i) => <CourseCard key={i} course={course} />)}
```

### Conditional Rendering

```tsx
// ✅ short-circuit for optional sections
{teacher && <TeacherSection teacher={teacher} />}

// ✅ ternary for binary states
{isLoading ? <Spinner /> : <Content />}

// ❌ avoid complex ternary nesting — use early returns instead
```

### Performance

- `React.memo` — only when a component re-renders frequently with the same props. Don't apply pre-emptively.
- `React.lazy` + `Suspense` — for code-splitting heavy Client Components (modals, rich editors).
- Avoid anonymous functions in JSX render when the component re-renders frequently:
  ```tsx
  // ❌ creates new function reference every render
  <Button onClick={() => handleAction(item.id)}>

  // ✅ stable handler
  const handleClick = useCallback(() => handleAction(item.id), [item.id]);
  <Button onClick={handleClick}>
  ```

---

## Coding Rules

- TypeScript for all props. No `any`. Use types from `src/types/models.ts`.
- All text visible to users must come from `useTranslations()` — no hardcoded strings in Client Components.
- Use `cn()` from `@/lib/utils` for conditional classNames — never string concatenation.
- All Tailwind classes must be statically analyzable — no dynamic string construction: `text-${color}-500` ❌.
- Form inputs must have `id` + matching `htmlFor` on label.
- Icon-only interactive elements must have `aria-label`.

---

## Do

- ✅ Use named exports for all components.
- ✅ Define props interface inline above the component.
- ✅ Use `useMemo` for filtering/sorting arrays.
- ✅ Use `useCallback` for handlers passed to children.
- ✅ Clean up `useEffect` side effects.
- ✅ Use stable keys from data IDs in lists.
- ✅ Use `cn()` for conditional class merging.
- ✅ Use `useTranslations()` for all user-visible text.

## Don't

- ❌ Don't use default exports.
- ❌ Don't use array index as React list key.
- ❌ Don't store derived data in state — compute it with `useMemo`.
- ❌ Don't create anonymous functions in JSX for hot paths.
- ❌ Don't add `useTranslations` or `useLocale` in Server Components.
- ❌ Don't use dynamic Tailwind class strings (`text-${x}-500`).
- ❌ Don't add `React.memo` without profiling first.
- ❌ Don't forget to return cleanup from `useEffect`.

---

## Examples

### Client Component with filter state

```tsx
'use client';
import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface Props {
  locale: string;
  items: CourseItem[];
}

export function CourseList({ locale, items }: Props) {
  const t = useTranslations('Courses');
  const [selected, setSelected] = useState<string>('all');

  const filtered = useMemo(
    () => selected === 'all' ? items : items.filter(i => i.categoryId === selected),
    [items, selected]
  );

  return (
    <div className="flex flex-col gap-4">
      <select
        value={selected}
        onChange={e => setSelected(e.target.value)}
        className={cn('border rounded-lg px-3 py-2', 'focus:ring-2 focus:ring-primary')}
      >
        <option value="all">{t('filterAll')}</option>
      </select>
      {filtered.map(item => (
        <CourseCard key={item.id} item={item} locale={locale} />
      ))}
    </div>
  );
}
```

### Toggle / Accordion pattern

```tsx
'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Accordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        onClick={() => setOpen(prev => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span>{question}</span>
        <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
      </button>
      {open && <p className="pb-4 text-body-sm">{answer}</p>}
    </div>
  );
}
```

---

## When This Skill Should Automatically Activate

- Any file with `'use client'` directive
- Questions about React hooks (`useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`)
- Component design, props, composition patterns
- Form handling, controlled inputs, validation
- Lists, keys, conditional rendering
- Performance: `React.memo`, `lazy`, `Suspense`
- Event handlers, browser APIs inside components
