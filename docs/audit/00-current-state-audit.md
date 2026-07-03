# 00 — Audit hiện trạng codebase Ruby HSK Landing

> Ngày audit: 2026-07-03. Audit thực hiện trên nhánh `main`, commit gần nhất `e90cef1 init project`.
> Mục tiêu: hiểu rõ toàn bộ hiện trạng trước khi lên plan triển khai, **không chỉnh sửa code trong bước này**.

## 1. Tổng quan stack thực tế

| Thành phần | Khai báo trong `package.json` | Ghi chú |
|---|---|---|
| Framework | `next@latest` (App Router) | dùng `next dev --turbopack` |
| Ngôn ngữ | TypeScript, `strict: true` | `tsconfig.json` chuẩn Next.js, alias `@/* -> ./src/*` |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) + SCSS (`sass`) | Tailwind v4 dùng cú pháp `@import "tailwindcss"` trong `globals.scss`, không có `tailwind.config.*` (Tailwind v4 config-less by default) |
| i18n | `next-intl@latest` | VI/EN, `localePrefix: 'always'` |
| Theme | `next-themes@latest` | class-based dark mode qua `@custom-variant dark` |
| Database | `@supabase/supabase-js@latest` | mới có client browser placeholder, **chưa có schema/bảng nào** |
| Icon | `lucide-react` | dùng trong nav, toggle, floating contact |
| Utils | `clsx` + `tailwind-merge` (hàm `cn()`) | |
| Package manager thực tế | **npm** (tồn tại `package-lock.json`) | README hướng dẫn `pnpm install` — **không khớp với lockfile thực tế** |

Không có: test runner, Storybook, CI config, `public/` (chưa có favicon/OG image/manifest icon), `tailwind.config.ts`.

## 2. Cấu trúc thư mục hiện tại

```
ruby-hsk-landing/
├─ messages/                     # message JSON cho next-intl — Ở ROOT, không nằm trong src/
│  ├─ en.json
│  └─ vi.json
├─ middleware.ts                 # next-intl middleware, matcher: '/', '/(vi|en)/:path*'
├─ next.config.ts                # withNextIntl plugin, images.remotePatterns mở toàn bộ https
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx              # RootLayout rỗng, chỉ return children (không có <html>)
│  │  ├─ not-found.tsx           # global 404 -> redirect('/vi')
│  │  ├─ globals.scss
│  │  └─ [locale]/
│  │     ├─ layout.tsx           # <html>, metadata tĩnh, Header/Footer/MobileNav/FloatingContact
│  │     ├─ not-found.tsx        # localized 404 UI
│  │     ├─ loading.tsx
│  │     ├─ page.tsx             # Home
│  │     ├─ about/page.tsx
│  │     ├─ contact/page.tsx
│  │     ├─ courses/page.tsx
│  │     ├─ privacy/page.tsx
│  │     ├─ terms/page.tsx
│  │     └─ coming-soon/page.tsx
│  ├─ components/                # ⚠️ thực tế dùng src/components, KHÔNG phải src/components_v2
│  │  ├─ layout/ (header, footer, mobile-bottom-nav, floating-contact, theme-toggle, language-toggle)
│  │  ├─ logo/logo-icon.tsx
│  │  ├─ sections/ (hero, cards)
│  │  ├─ providers/app-providers.tsx
│  │  ├─ legal/legal-page.tsx
│  │  ├─ loading/loading-logo.tsx
│  │  └─ ui/button.tsx
│  ├─ config/site.ts
│  ├─ i18n/ (routing.ts, navigation.ts, request.ts)
│  ├─ lib/ (utils.ts, supabase/client.ts)
│  └─ styles/design-tokens.scss
├─ .mcp.json                     # supabase MCP (project scope)
├─ .env.example
├─ CLAUDE_PROMPT.md              # prompt gốc dùng để sinh boilerplate
└─ README.md
```

### Phát hiện quan trọng (mismatch cần quyết định trước khi code)

1. **`src/components` vs `src/components_v2`** — `README.md` và `CLAUDE_PROMPT.md` đều ghi "Components are created in `src/components_v2`", nhưng toàn bộ code thực tế nằm trong `src/components`. Đây là tài liệu lỗi thời từ lúc sinh boilerplate, không phản ánh code thật. → Xem quyết định ở mục 4.
2. **Package manager** — README hướng dẫn `pnpm install` nhưng repo chỉ có `package-lock.json` (npm), không có `pnpm-lock.yaml`. → Theo đúng rule "không đổi package manager", ta giữ npm và sửa lại README cho khớp thực tế (chỉ sửa doc, không đổi lockfile).
3. **`messages/` ở root** — hợp lệ với next-intl nhưng không đồng bộ với convention "mọi thứ nằm trong `src/`" mà project đang theo (app, components, i18n, lib, config, styles). Xem phân tích ở mục 3.
4. **`RootLayout` (`src/app/layout.tsx`) không có `<html>`/`<body>`** — hợp lệ về kỹ thuật vì `[locale]/layout.tsx` là layout thực sự render `<html>`, nhưng cần lưu ý khi thêm `not-found.tsx` gốc hoặc route ngoài `[locale]` (ví dụ `sitemap.ts`, `robots.ts`, `manifest.ts` sẽ nằm ở `src/app/` gốc, không bị ảnh hưởng vì đó là file đặc biệt không qua layout).
5. **`src/app/not-found.tsx` (global) redirect cứng về `/vi`** — chưa detect locale từ header `accept-language`; chấp nhận được cho MVP nhưng nên ghi chú trong SEO/UX plan.
6. **Không có `public/`** — thiếu favicon, `apple-icon`, OG default image, dẫn tới thiếu sót SEO/manifest ngay từ đầu.
7. **Chưa có trang nào có `generateMetadata` riêng** — toàn bộ site chỉ có 1 `metadata` tĩnh ở `[locale]/layout.tsx`, dùng chung cho mọi trang, không có title/description riêng, không có `alternates`, `canonical`, OpenGraph, Twitter card.
8. **Chưa có `sitemap.ts`, `robots.ts`, `manifest.ts`** — cần bổ sung ở Phase 5.
9. **Supabase**: chỉ có `createBrowserSupabaseClient()` phía client, chưa có server client, chưa có bảng nào, `.env.example` chỉ có `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY` (chưa có `SUPABASE_SERVICE_ROLE_KEY` cho server-side, hợp lý vì chưa cần thiết ở giai đoạn public landing read-only).
10. **Nội dung nhiều trang đang là placeholder/hard-code** (ví dụ contact info "0000 000 000", "hello@rubyhsk.vn", danh sách khóa học cứng trong `courses/page.tsx`, nội dung legal là placeholder lặp lại cho mọi section) — cần thay bằng nội dung SEO thật hoặc Supabase data ở Phase 4/6.
11. **Header/Footer nav hard-code label tiếng Việt** ở một số nơi (footer: "Trang", "Học tiếng Trung", "Pháp lý") không đi qua `useTranslations` — không đồng bộ khi đổi sang EN.
12. **Toàn bộ trang tablet dùng chung route với desktop/mobile** (không có breakpoint riêng ở route level — đúng theo kỳ vọng, vì tablet/mobile/desktop trong yêu cầu là *responsive breakpoints của cùng 1 route*, không phải route riêng). Cần đảm bảo bằng CSS responsive, không phải bằng tách route.

## 3. `messages/` ở root vs `src/messages/`

### Hiện trạng
- `src/i18n/request.ts` import bằng đường dẫn tương đối: `../../messages/${locale}.json` → tức từ `src/i18n/` đi lên 2 cấp ra root, vào `messages/`.
- Đây là pattern hợp lệ và được chính next-intl dùng trong official example (`create-next-app` template của next-intl để `messages/` ở root).
- Không có công cụ nào khác (ESLint, Jest, Vercel build) phụ thuộc vào vị trí này ngoài `request.ts`.

### So sánh

| Tiêu chí | Giữ `messages/` ở root | Chuyển vào `src/messages/` |
|---|---|---|
| Tính hợp lệ kỹ thuật | ✅ Hoạt động bình thường | ✅ Hoạt động bình thường (chỉ đổi 1 import path) |
| Nhất quán với convention hiện tại (mọi logic nằm trong `src/`) | ❌ Lệch — `app`, `components`, `i18n`, `lib`, `config`, `styles` đều trong `src/`, chỉ `messages/` ở ngoài | ✅ Đồng bộ 100% với cấu trúc hiện tại |
| Quy ước phổ biến trong cộng đồng Next.js + next-intl | Cả hai đều phổ biến; nhiều boilerplate to lớn (có `src/`) đặt `messages` trong `src/` | Cũng phổ biến, đặc biệt khi project đã dùng `src/` triệt để |
| Chi phí thay đổi | Không cần thay đổi gì | Rất thấp — chỉ 1 dòng import + di chuyển 2 file JSON |
| Rủi ro | Không có | Gần như không có (không có tool ngoài phụ thuộc path cũ) |

### Khuyến nghị

**Nên chuyển `messages/` vào `src/messages/`** để nhất quán 100% với convention "toàn bộ source code nằm trong `src/`" mà project đang tuân theo. Đây là thay đổi rẻ, rủi ro thấp, và giúp cấu trúc dự án gọn hơn khi build/deploy (Vercel build root vẫn là repo root nhưng mọi source nằm gọn trong 1 thư mục `src/`, dễ set `include`/watch pattern nếu cần sau này).

**Danh sách file cần cập nhật nếu thực hiện di chuyển** (chỉ thực hiện khi được yêu cầu rõ ràng ở phase sau, KHÔNG làm ở bước audit này):

1. Di chuyển vật lý: `messages/en.json` → `src/messages/en.json`, `messages/vi.json` → `src/messages/vi.json`.
2. Sửa import trong `src/i18n/request.ts`:
   - Từ: `(await import(`../../messages/${locale}.json`)).default`
   - Thành: `(await import(`../messages/${locale}.json`)).default`
3. Không cần sửa file nào khác — không có nơi thứ 2 nào reference tới `messages/` (đã grep toàn repo, chỉ có 1 kết quả duy nhất tại `src/i18n/request.ts:11`).
4. Cập nhật `README.md` nếu README có nhắc tới đường dẫn `messages/` (hiện tại README không đề cập path cụ thể nên không cần sửa).

→ Đây là thay đổi **không bắt buộc** để hệ thống hoạt động, chỉ là dọn dẹp cấu trúc. Đề xuất thực hiện ở Phase 1 (Architecture cleanup) cùng lúc với quyết định `components` vs `components_v2`.

## 4. Quyết định `src/components` vs `src/components_v2`

- Code thực tế 100% dùng `src/components`. Không có bất kỳ file nào trong `src/components_v2`.
- `README.md` và `CLAUDE_PROMPT.md` là tài liệu **định hướng ban đầu**, đã lỗi thời so với code thực tế.
- Đổi tên toàn bộ `src/components` → `src/components_v2` không mang lại lợi ích kỹ thuật, chỉ gây rủi ro (phải sửa hàng chục import) để khớp với 1 dòng tài liệu cũ.

**Quyết định (ghi nhận, không tự động áp dụng — cần user xác nhận ở Phase 1):**
> Giữ nguyên `src/components` làm convention chính thức của project. Cập nhật `README.md` và `CLAUDE_PROMPT.md` để phản ánh đúng thực tế (xoá cụm "components_v2"), thay vì đổi tên thư mục code.

Rule của yêu cầu gốc: "If current project uses `src/components`, use it consistently." — codebase hiện dùng `src/components` nhất quán ở mọi nơi, nên tiếp tục dùng `src/components` cho toàn bộ component mới.

## 5. Kiểm tra tsconfig / alias

- `@/*` → `./src/*`: hoạt động tốt cho tất cả import hiện tại (`@/components/...`, `@/i18n/...`, `@/lib/...`).
- Không có alias riêng cho `messages` — nếu chuyển vào `src/messages`, có thể thêm alias `@/messages/*` nhưng không bắt buộc vì chỉ có 1 nơi import.

## 6. Rủi ro tổng thể trước khi triển khai tiếp

| Rủi ro | Mức độ | Ghi chú xử lý |
|---|---|---|
| Thiếu `public/` (favicon, OG image, manifest icons) | Trung bình | Xử lý ở Phase 2/5 |
| Metadata dùng chung toàn site | Cao (ảnh hưởng SEO trực tiếp) | Xử lý ở Phase 5 |
| Nội dung placeholder (liên hệ, khoá học, legal) | Cao (rủi ro pháp lý/SEO nội dung mỏng) | Cần nội dung thật từ khách hàng trước khi launch |
| MCP Supabase ở trạng thái "Pending approval" | Thấp — chặn tạm thời việc dùng MCP để inspect DB | Cần chạy `claude` để approve kết nối (xem Step 3) |
| MCP Stitch "Connected · tools fetch failed" | Trung bình — chặn việc dùng MCP để lấy design context tự động | Cần kiểm tra lại API key / endpoint Stitch (xem Step 3) |
| Package manager doc sai (pnpm vs npm thực tế) | Thấp | Sửa doc ở Phase 1, không đổi lockfile |

## 7. Kết luận audit

Codebase hiện tại là một **boilerplate đã chạy được** (dev server, routing i18n, theme, layout responsive cơ bản) nhưng **chưa sẵn sàng production** về mặt: SEO metadata, nội dung thật, design system hoàn chỉnh theo Stitch, và tích hợp Supabase thực sự (mới có placeholder). Không có gì trong hiện trạng cần phải xoá — toàn bộ có thể giữ và mở rộng dần theo các phase ở `docs/plan/00-master-implementation-plan.md`.
