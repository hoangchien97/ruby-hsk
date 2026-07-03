# Ruby HSK Landing — Claude Guide

## Project Mission
Xây dựng website landing SEO-friendly, mobile-first cho Ruby HSK — trung tâm dạy tiếng Trung và luyện thi HSK, hiện có một giáo viên chính: **cô Trần Hồng Ngọc**.

## Stack
Next.js App Router · TypeScript · Tailwind CSS · SCSS · next-intl (VI/EN) · next-themes (light/dark) · Supabase · Vercel · MCP Stitch · MCP Supabase

## Non-Negotiable Rules
- Đây là **website SEO công khai**, không phải SaaS/dashboard/admin portal.
- Mobile-first cho mọi trang và component.
- Header logo **chỉ icon**, không kèm text.
- Toggle VI/EN phải giữ nguyên route hiện tại.
- Theme switch chỉ 1 icon button duy nhất.
- Mobile bắt buộc có bottom navigation + More bottom sheet.
- Ruby HSK chỉ có **một** giáo viên chính (cô Trần Hồng Ngọc) — không tạo grid nhiều giáo viên giả.
- Chỉ dùng màu trong design tokens, không random màu ngoài token.
- Không chạy Supabase operation destructive (DROP/TRUNCATE/xoá dữ liệu) khi chưa được xác nhận rõ.
- Không commit secret (API key, service role key, `.env`).
- Không thêm UI library mới khi chưa được duyệt.

Chi tiết đầy đủ nằm ở `.claude/rules/*.md` — luôn áp dụng các rule đó song song với file này.

## Folder Conventions
- App routes: `src/app/[locale]/**` (App Router, i18n qua segment `[locale]`)
- Components: `src/components/**` (convention chính thức, KHÔNG dùng `src/components_v2`)
- i18n logic: `src/i18n/` (`routing.ts`, `navigation.ts`, `request.ts`) — messages tại `src/messages/{vi,en}.json`
- Styles/tokens: `src/styles/design-tokens.scss` + `src/app/globals.scss`
- Supabase client: `src/lib/supabase/` (`client.ts` hiện có; `server.ts` sẽ bổ sung khi cần Server Component/Route Handler)
- Tài liệu plan/audit: `docs/{audit,plan,design,seo,database,deploy}/`
- Design reference từ Stitch: `Stitch_Ruby_HSK_HTML/` — **dùng biến thể `ruby_hsk_scholar`** (khớp bảng màu bắt buộc #804237/#E78F65/#191211/#F9F5F0), **không dùng** `vibrant_academic_ivory` (bảng màu khác, không đúng brand).

## Commands
```
npm install       # cài dependencies
npm run dev       # dev server (Turbopack)
npm run typecheck # tsc --noEmit
npm run lint      # next lint
npm run build     # production build
npm run start     # chạy bản build
```

## Required Workflow
1. Đọc file liên quan trước khi sửa (không giả định cấu trúc).
2. Lập plan ngắn cho thay đổi.
3. Làm bước nhỏ nhất, an toàn nhất trước.
4. Chạy `typecheck`/`build` khi thay đổi có ảnh hưởng build.
5. Cập nhật `docs/` khi thay đổi kiến trúc/SEO/database.

## MCP Usage
- **Stitch MCP**: trích xuất design context, mapping screen → route, tokens, component inventory. (Nếu server báo lỗi schema, xem `docs/design/00-stitch-design-integration-plan.md`.)
- **Supabase MCP**: kiểm tra schema, đề xuất migration. **Chỉ read-only** trừ khi user xác nhận rõ ràng chạy migration.

## Output Style
- Ưu tiên viết tài liệu bằng tiếng Việt.
- Thay đổi tập trung, đúng phạm vi yêu cầu — không over-engineering.
- Giữ UI đồng nhất với style Ruby HSK Scholar / Luminous Education (ấm áp, học thuật, không giống dashboard/SaaS).
