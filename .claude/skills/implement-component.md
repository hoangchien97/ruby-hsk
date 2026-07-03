# Skill: Implement Component

## Purpose
Xây dựng component UI tái sử dụng trong `src/components/**`.

## When to use
- Cần 1 UI primitive/pattern mới dùng ở nhiều nơi (button variant, card, form field, badge...).

## Steps
1. Kiểm tra component tương đương đã tồn tại chưa (`src/components/ui/`, `src/components/sections/`, `src/components/layout/`) — ưu tiên mở rộng props hơn tạo file mới trùng chức năng.
2. Định nghĩa props rõ ràng bằng TypeScript (interface/type, không dùng `any`).
3. Dùng design token (`var(--color-*)`, `var(--radius-*)`, `var(--shadow-*)`) — không hard-code hex.
4. Đảm bảo hoạt động đúng ở cả light/dark (kiểm tra `.dark` override trong `design-tokens.scss`).
5. Mobile-first: base style cho mobile, `md:`/`lg:` override sau.
6. Thêm accessible label/state: `aria-label` cho icon-only, `aria-hidden` cho icon trang trí, focus state dùng class `.focus-ring` đã có.
7. Đặt trong đúng subfolder theo chức năng (`ui/`, `layout/`, `sections/`, `logo/`, `legal/`, `loading/`, `providers/`).

## Output
- Component mới/cập nhật trong `src/components/**`, kèm ví dụ sử dụng ngắn nếu component phức tạp.
