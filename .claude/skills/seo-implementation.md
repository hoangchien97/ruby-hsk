# Skill: SEO Implementation

## Purpose
Triển khai hạ tầng SEO kỹ thuật đầy đủ cho 1 route hoặc toàn site.

## When to use
- Khi thêm page mới, hoặc audit/hoàn thiện SEO cho toàn site (Phase 5).

## Steps
1. Định nghĩa `generateMetadata` cho route: `title`, `description`.
2. Thêm `alternates.canonical` + `alternates.languages` (vi/en).
3. Thêm `openGraph` + `twitter` metadata.
4. Đảm bảo `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/manifest.ts` tồn tại và bao đúng route công khai (loại `coming-soon` khỏi sitemap).
5. Thêm JSON-LD phù hợp (`Organization`/`EducationalOrganization`, `Course`, `FAQPage`, `BreadcrumbList`) — chỉ khi nội dung thật đã có.
6. Kiểm tra heading hierarchy (1 H1/page) và internal link giữa các trang liên quan.
7. Chạy `npm run build`, kiểm tra sitemap sinh ra hợp lệ.

## Required checks
- Không nhồi từ khoá (xem danh sách từ khoá ở `.claude/rules/seo-rules.md`).
- Không nhúng JSON-LD với dữ liệu giả/placeholder.
- `NEXT_PUBLIC_SITE_URL` phải là domain thật khi build production.

## Output
- Metadata/schema code cập nhật + ghi chú vào `docs/seo/00-seo-implementation-plan.md` nếu có thay đổi phạm vi.
