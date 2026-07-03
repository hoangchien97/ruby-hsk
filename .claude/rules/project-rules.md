# Project Rules

- Ruby HSK Landing là **website SEO công khai**, không phải SaaS/dashboard/admin portal — không mang vibe ứng dụng quản trị.
- Ruby HSK hiện có **một** giáo viên chính: **cô Trần Hồng Ngọc**. Không tạo grid/carousel nhiều giáo viên giả định.
- Trang bắt buộc:
  - Home (`/[locale]`)
  - Courses (`/[locale]/courses`)
  - About (`/[locale]/about`)
  - Contact (`/[locale]/contact`)
  - Privacy Policy (`/[locale]/privacy`)
  - Terms of Service (`/[locale]/terms`)
  - 404 (`not-found.tsx`)
  - Coming Soon (`/[locale]/coming-soon`)
  - Loading screen (`loading.tsx`)
- Breakpoint bắt buộc kiểm tra: **Desktop 1440**, **Tablet 768**, **Mobile 375**.
- Mobile phải hoàn chỉnh 100% cho mọi trang bắt buộc — không để phiên bản mobile là bản rút gọn thiếu nội dung.
- Không copy phong cách SaaS/coding tool/admin dashboard — giữ tinh thần giáo dục, ấm áp (xem `ui-design-rules.md`).
- Không giả định cấu trúc project — luôn đọc file thật trước khi sửa (folder convention có thể đã đổi theo quyết định trong `docs/audit/`).
