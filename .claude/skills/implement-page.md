# Skill: Implement Page

## Purpose
Implement hoặc refactor một route/page cụ thể trong `src/app/[locale]/**`.

## When to use
- Tạo page mới, hoặc chỉnh nội dung/layout page đã có (Home, Courses, About, Contact, Privacy, Terms, 404, Coming Soon).

## Steps
1. Đọc design reference tương ứng trong `Stitch_Ruby_HSK_HTML/<screen>_desktop_light/` và `<screen>_mobile_light/` (nếu có).
2. Đọc message keys hiện có cho page đó trong `src/messages/vi.json` + `en.json` — bổ sung key thiếu, không hard-code text mới.
3. Đọc component dùng chung đã có (`src/components/layout/**`, `src/components/ui/**`, `src/components/sections/**`) trước khi viết component mới.
4. Implement mobile-first: viết CSS/class mobile trước, mở rộng breakpoint `md`/`lg` sau.
5. Thêm `generateMetadata` (title, description, canonical, alternates vi/en) — xem `.claude/rules/seo-rules.md`.
6. Kiểm tra đủ 3 breakpoint: 375 / 768 / 1440.
7. Chạy `npm run typecheck` và `npm run build` sau khi hoàn tất.

## Rules
- Không tạo teacher profile giả — chỉ cô Trần Hồng Ngọc.
- Dùng design token, không hard-code hex color.
- Nội dung phải SEO-friendly (không placeholder khi page được coi là "hoàn thành").

## Output
- Page code cập nhật + message keys cập nhật + metadata đầy đủ.
