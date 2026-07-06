# Project Rules

- Ruby HSK Landing is a **public SEO website**, not a SaaS/dashboard/admin portal — it must not feel like an admin app.
- Ruby HSK currently has **one** lead instructor: **Ms. Trần Hồng Ngọc**. Do not build a grid/carousel implying multiple teachers.
- Required pages:
  - Home (`/[locale]`)
  - Courses (`/[locale]/courses`)
  - About (`/[locale]/about`)
  - Contact (`/[locale]/contact`)
  - Privacy Policy (`/[locale]/privacy`)
  - Terms of Service (`/[locale]/terms`)
  - 404 (`not-found.tsx`)
  - Coming Soon (`/[locale]/coming-soon`)
  - Loading screen (`loading.tsx`)
- Required breakpoints to check: **Desktop 1440**, **Tablet 768**, **Mobile 375**.
- Mobile must be 100% complete for every required page — never ship a stripped-down mobile version missing content.
- Do not copy a SaaS/dev-tool/admin-dashboard look — keep the warm, educational tone (see `ui-design-rules.md`).
- Never assume project structure — always read the actual files before editing (folder conventions may have changed; check decisions recorded in `docs/audit/`).
