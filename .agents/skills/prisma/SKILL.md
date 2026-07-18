---
name: prisma
description: "Activate when working with Prisma ORM: schema design, migrations (prisma migrate dev/reset/status), Prisma Client queries, relations, indexes, seeding, or generating types. Note: this project currently uses Supabase directly (not Prisma). Use this skill only if Prisma is explicitly added to the project."
---

# Prisma + Supabase Skill

## Purpose

Guide correct usage of **Prisma ORM on top of Supabase (PostgreSQL)**. This combination gives you:
- Prisma's type-safe query builder and schema migration system
- Supabase's hosted Postgres, RLS, Auth, and Realtime
- Auto-generated TypeScript types from the schema

> **Project Note:** ruby-hsk currently uses Supabase directly with auto-generated types (`lib/supabase/types.ts`). This skill applies when Prisma is **explicitly added**. For raw Supabase usage, use the `supabase` skill.

---

## Setup — Prisma + Supabase

```bash
npm install prisma @prisma/client
npx prisma init
```

`prisma/schema.prisma`:
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")           // Supabase pooler (Transaction mode) — port 6543
  directUrl = env("DIRECT_URL")            // Direct connection — port 5432 (for migrations)
}

generator client {
  provider = "prisma-client-js"
}
```

`.env.local`:
```
# Transaction pooler (port 6543) — use for runtime queries
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection (port 5432) — use for migrations
DIRECT_URL="postgresql://postgres.[project-ref]:[password]@aws-[region].pooler.supabase.com:5432/postgres"
```

> ⚠️ **Never use the direct URL at runtime** — always the pooler (port 6543) for app queries. Migrations must use `DIRECT_URL` because PgBouncer transaction mode does not support DDL.

---

## Schema

### Conventions

```prisma
model Course {
  // IDs — use cuid() for app-generated, uuid() for Supabase-compatible
  id          String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid

  // Bilingual content — _vi / _en suffix pairs
  titleVi     String    @map("title_vi")
  titleEn     String    @map("title_en")
  descriptionVi String? @map("description_vi")
  descriptionEn String? @map("description_en")

  // Status flags
  isPublished Boolean   @default(false) @map("is_published")
  sortOrder   Int       @default(0)     @map("sort_order")

  // Soft delete
  deletedAt   DateTime? @map("deleted_at")

  // Timestamps
  createdAt   DateTime  @default(now())     @map("created_at")
  updatedAt   DateTime  @updatedAt          @map("updated_at")

  // Relations
  categoryId  String    @map("category_id") @db.Uuid
  category    CourseCategory @relation(fields: [categoryId], references: [id])

  @@index([isPublished, sortOrder])
  @@index([categoryId])
  @@index([deletedAt])              // for soft delete filtering
  @@map("courses")                  // exact Supabase table name
}
```

### Key Rules

- **`@map`** — DB column stays `snake_case`; Prisma model field is `camelCase`.
- **`@@map`** — table name matches Supabase exactly.
- **`@db.Uuid`** — required when Supabase table uses UUID type.
- **`@default(dbgenerated(...))`** — use for Supabase server-side defaults (e.g. `gen_random_uuid()`, `now()`).
- Always add `createdAt` + `updatedAt` to every content model.
- Always add `deletedAt DateTime?` for soft-deletable models.

---

## Migrations

```bash
# Apply schema changes and generate migration file
npx prisma migrate dev --name add_courses_table

# Apply pending migrations in production (no prompt, no generate)
npx prisma migrate deploy

# Reset dev DB (drops all data — dev only)
npx prisma migrate reset

# Check migration status
npx prisma migrate status

# Regenerate Prisma Client after schema change (without a migration)
npx prisma generate

# Pull existing Supabase schema into Prisma schema (initial setup)
npx prisma db pull

# Open Prisma Studio (visual DB browser)
npx prisma studio
```

### Migration Workflow

```
1. Edit schema.prisma
2. npx prisma migrate dev --name descriptive_name
   → generates migration SQL in prisma/migrations/
   → applies migration to dev DB
   → runs prisma generate
3. Review generated SQL in prisma/migrations/[timestamp]_name/migration.sql
4. Commit schema.prisma + migrations/ together
5. CI/CD runs: npx prisma migrate deploy (production)
```

> **Never edit migration SQL files manually.** If you need to tweak a migration, roll it back and re-generate.

---

## Client Singleton

```ts
// src/lib/db.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

> **Always import the singleton.** Never call `new PrismaClient()` in components, API routes, or Server Actions — each invocation opens a new DB connection.

---

## Relations

```prisma
model CourseCategory {
  id      String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  nameVi  String   @map("name_vi")
  nameEn  String   @map("name_en")
  courses Course[]

  @@map("course_categories")
}

model Course {
  categoryId String         @map("category_id") @db.Uuid
  category   CourseCategory @relation(fields: [categoryId], references: [id], onDelete: Restrict)
  ...
}
```

### Querying Relations

```ts
// include — full relation objects
const courses = await prisma.course.findMany({
  include: { category: true },
});

// select — granular field picking (preferred for performance)
const courses = await prisma.course.findMany({
  select: {
    id: true,
    titleVi: true,
    titleEn: true,
    category: { select: { nameVi: true, nameEn: true } },
  },
});

// ❌ never include deeply nested relations without select
const bad = await prisma.course.findMany({ include: { category: { include: { courses: true } } } });
```

---

## Queries

### Standard Public Query Pattern

```ts
// Always filter published + not deleted
const courses = await prisma.course.findMany({
  where: {
    isPublished: true,
    deletedAt: null,          // soft delete filter
  },
  select: {
    id: true,
    titleVi: true,
    titleEn: true,
    slug: true,
    mode: true,
    category: { select: { nameVi: true, nameEn: true } },
  },
  orderBy: { sortOrder: 'asc' },
});
```

### findUnique vs findFirst

```ts
// findUnique — only for @id or @unique fields → throws if args invalid
const course = await prisma.course.findUnique({ where: { id } });

// findFirst — for any field combination + adds ordering
const course = await prisma.course.findFirst({
  where: { slug, isPublished: true, deletedAt: null },
});
```

### Create / Update / Upsert

```ts
// create
const submission = await prisma.contactSubmission.create({
  data: { name, email, message, locale },
});

// update
await prisma.course.update({
  where: { id },
  data: { titleVi: newTitle, updatedAt: new Date() },
});

// upsert — create or update
await prisma.siteSetting.upsert({
  where: { key: 'maintenance_mode' },
  update: { value: 'true' },
  create: { key: 'maintenance_mode', value: 'true' },
});
```

---

## Pagination

### Cursor-based (preferred for large sets)

```ts
interface CursorPage<T> {
  items: T[];
  nextCursor: string | null;
}

async function getCourses(cursor?: string, take = 12): Promise<CursorPage<Course>> {
  const items = await prisma.course.findMany({
    where: { isPublished: true, deletedAt: null },
    orderBy: { sortOrder: 'asc' },
    take: take + 1,                      // fetch one extra to detect next page
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    select: { id: true, titleVi: true, titleEn: true, slug: true },
  });

  const hasNext = items.length > take;
  if (hasNext) items.pop();

  return {
    items,
    nextCursor: hasNext ? items[items.length - 1].id : null,
  };
}
```

### Offset-based (for paginated admin tables)

```ts
async function getCoursesPage(page: number, pageSize = 20) {
  const [total, items] = await Promise.all([
    prisma.course.count({ where: { deletedAt: null } }),
    prisma.course.findMany({
      where: { deletedAt: null },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return { items, total, totalPages: Math.ceil(total / pageSize) };
}
```

---

## Transactions

```ts
// Sequential — each operation uses result of previous
const result = await prisma.$transaction(async (tx) => {
  const submission = await tx.contactSubmission.create({ data: formData });
  await tx.auditLog.create({ data: { action: 'contact_submit', refId: submission.id } });
  return submission;
});

// Batch — run independent operations in one round-trip
await prisma.$transaction([
  prisma.course.update({ where: { id: 'a' }, data: { sortOrder: 1 } }),
  prisma.course.update({ where: { id: 'b' }, data: { sortOrder: 2 } }),
]);
```

> Use `$transaction` whenever two writes must succeed or fail together.

---

## Indexes

```prisma
model Course {
  // Columns frequently used in WHERE
  @@index([isPublished, deletedAt])     // public content filter
  @@index([categoryId])                 // relation filter
  @@index([slug])                       // slug lookup (also add @unique if slugs are unique)

  // Columns used in ORDER BY
  @@index([sortOrder])
  @@index([createdAt])

  // Composite for common combined queries
  @@index([isPublished, sortOrder, deletedAt])
}
```

### Rules

- Every FK column gets an index (Prisma does NOT auto-create FK indexes in Postgres).
- Every column used in `WHERE` with high cardinality gets an index.
- `createdAt` and `updatedAt` get indexes only if you frequently query by time range.
- **Don't over-index** — each index slows down writes. Index what you query, not everything.

---

## Performance

```ts
// ✅ select only needed fields
const titles = await prisma.course.findMany({
  select: { id: true, titleVi: true, slug: true },
});

// ❌ never select * on large tables
const all = await prisma.course.findMany();

// ✅ parallel fetches — never waterfall for unrelated queries
const [courses, categories] = await Promise.all([
  prisma.course.findMany({ where: { isPublished: true, deletedAt: null } }),
  prisma.courseCategory.findMany(),
]);

// ✅ count without loading records
const total = await prisma.course.count({ where: { isPublished: true } });

// ✅ use findFirst instead of findMany + [0] when you only need one record
const latest = await prisma.course.findFirst({ orderBy: { createdAt: 'desc' } });
```

---

## Repository Pattern

Encapsulate all Prisma calls behind typed repository functions. Never call `prisma.*` directly in Server Components or Server Actions.

```ts
// src/lib/repositories/courses.repository.ts
import { prisma } from '@/lib/db';
import type { CourseListItem } from '@/types/models';

export async function getPublishedCourses(locale: string): Promise<CourseListItem[]> {
  try {
    const rows = await prisma.course.findMany({
      where: { isPublished: true, deletedAt: null },
      select: {
        id: true,
        titleVi: true,
        titleEn: true,
        slug: true,
        mode: true,
        category: { select: { nameVi: true, nameEn: true } },
      },
      orderBy: { sortOrder: 'asc' },
    });

    return rows.map(row => ({
      id: row.id,
      title: locale === 'vi' ? row.titleVi : row.titleEn,
      slug: row.slug,
      mode: row.mode,
      category: locale === 'vi' ? row.category.nameVi : row.category.nameEn,
    }));
  } catch {
    return [];
  }
}

export async function getCourseBySlug(slug: string): Promise<CourseDetail | null> {
  try {
    return await prisma.course.findFirst({
      where: { slug, isPublished: true, deletedAt: null },
      include: { category: true },
    });
  } catch {
    return null;
  }
}
```

**Usage in Server Component:**
```tsx
// app/[locale]/courses/page.tsx
const courses = await getPublishedCourses(locale);
```

---

## Type Safety

### Domain Types from Prisma

```ts
// src/types/models.ts
import type { Prisma } from '@prisma/client';

// Derive types from select shapes — never use full model types in props
export type CourseListItem = Prisma.CourseGetPayload<{
  select: {
    id: true;
    titleVi: true;
    titleEn: true;
    slug: true;
    mode: true;
    category: { select: { nameVi: true; nameEn: true } };
  };
}>;

export type CourseDetail = Prisma.CourseGetPayload<{
  include: { category: true };
}>;
```

### Rules

- Never pass raw `Prisma.Course` (full model) as component props — components should receive only the fields they need.
- Use `Prisma.XxxGetPayload<{...}>` to derive prop types from query shapes.
- Never use `any` — if Prisma types are complex, use `satisfies` or type assertions with comments.

---

## Error Handling

```ts
import { Prisma } from '@prisma/client';

async function safeCreate(data: ContactData) {
  try {
    return await prisma.contactSubmission.create({ data });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      switch (e.code) {
        case 'P2002':
          // Unique constraint violation
          return { error: 'duplicate' };
        case 'P2003':
          // Foreign key constraint violation
          return { error: 'invalid_reference' };
        case 'P2025':
          // Record not found (update/delete on non-existent row)
          return { error: 'not_found' };
      }
    }
    if (e instanceof Prisma.PrismaClientValidationError) {
      // Schema validation failed — bug in query code
      console.error('Prisma validation:', e.message);
    }
    return null;
  }
}
```

**Common Prisma error codes:**

| Code | Meaning |
|---|---|
| `P2002` | Unique constraint violation |
| `P2003` | Foreign key constraint failed |
| `P2025` | Record not found |
| `P2016` | Query interpretation error |
| `P1001` | Cannot reach DB server |

---

## Soft Delete

All deletable content uses soft delete via `deletedAt DateTime?`.

```ts
// repositories/courses.repository.ts

// Soft delete — set deletedAt timestamp
export async function softDeleteCourse(id: string) {
  return prisma.course.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
}

// Restore
export async function restoreCourse(id: string) {
  return prisma.course.update({
    where: { id },
    data: { deletedAt: null },
  });
}

// Hard delete (admin only — confirm with user)
export async function hardDeleteCourse(id: string) {
  return prisma.course.delete({ where: { id } });
}
```

### Global Soft Delete Filter

Always include `deletedAt: null` in public queries. Never show soft-deleted records to users.

```ts
// ✅ correct public query
where: { isPublished: true, deletedAt: null }

// ❌ missing soft delete filter — may show deleted content
where: { isPublished: true }
```

Consider a Prisma middleware to enforce this automatically if soft delete is used widely:

```ts
prisma.$use(async (params, next) => {
  if (params.model === 'Course' && params.action === 'findMany') {
    params.args.where = { deletedAt: null, ...params.args.where };
  }
  return next(params);
});
```

---

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Model name | PascalCase singular | `CourseCategory` |
| Model field | camelCase | `titleVi`, `isPublished` |
| DB table (`@@map`) | snake_case plural | `course_categories` |
| DB column (`@map`) | snake_case | `title_vi`, `is_published` |
| Migration name | snake_case descriptive | `add_courses_table`, `add_soft_delete_to_courses` |
| Repository file | `*.repository.ts` | `courses.repository.ts` |
| Repository function | verb + noun | `getPublishedCourses`, `softDeleteCourse` |
| Domain type | PascalCase + suffix | `CourseListItem`, `CourseDetail` |

---

## Checklist

**Before writing a query:**
- [ ] Using the singleton `prisma` from `@/lib/db` (not `new PrismaClient()`)
- [ ] `select` only the fields the consumer needs (no select *)
- [ ] `where` includes `deletedAt: null` for soft-deletable models
- [ ] `where` includes `isPublished: true` for public content
- [ ] Parallel `Promise.all` for unrelated fetches (no waterfall)

**Before writing a migration:**
- [ ] `DATABASE_URL` uses pooler port 6543 (runtime)
- [ ] `DIRECT_URL` uses port 5432 (migrations)
- [ ] Migration name is descriptive: `add_feature_to_table`
- [ ] Reviewed generated SQL in `prisma/migrations/`
- [ ] Run `prisma generate` after schema changes
- [ ] `schema.prisma` + `migrations/` committed together

**Before writing a model:**
- [ ] `@map` on every field (snake_case DB, camelCase TS)
- [ ] `@@map` set to the exact Supabase table name
- [ ] `@db.Uuid` on UUID fields
- [ ] `createdAt` + `updatedAt` on content models
- [ ] `deletedAt DateTime?` on soft-deletable models
- [ ] FK columns have `@@index`
- [ ] Frequently queried columns have `@@index`

**Type safety:**
- [ ] Component props use `Prisma.XxxGetPayload<{...}>` types from `src/types/models.ts`
- [ ] No raw `Prisma.Course` full model types in props
- [ ] No `any` in repository return types

**Error handling:**
- [ ] All repository functions wrapped in `try/catch`
- [ ] Returns `null` or `[]` on failure (never throws to UI)
- [ ] `Prisma.PrismaClientKnownRequestError` checked for writes
