# Skill: Stitch → Code

## Purpose
Chuyển thiết kế Stitch (Ruby HSK Scholar) thành code Next.js/Tailwind/SCSS.

## When to use
- Khi cần đối chiếu hoặc implement 1 màn hình theo đúng thiết kế Stitch.

## Nguồn tham khảo
- Ưu tiên MCP Stitch (`mcp__stitch__*`) nếu đã kết nối được (`claude mcp get stitch` → `✔ Connected`).
- Nếu MCP còn lỗi (`tools fetch failed`), dùng export tĩnh tại `Stitch_Ruby_HSK_HTML/<screen>_<breakpoint>_light/code.html` + `screen.png`.
- **Chỉ dùng biến thể `ruby_hsk_scholar`** (`Stitch_Ruby_HSK_HTML/ruby_hsk_scholar/DESIGN.md`) — không dùng `vibrant_academic_ivory`.

## Steps
1. Xác định màn hình cần chuyển đổi → tìm thư mục export tương ứng (ví dụ `home_page_desktop_light`, `home_page_mobile_light`).
2. Đọc `code.html` để lấy cấu trúc/token thực tế (màu, spacing, radius, typography), đối chiếu với `ruby_hsk_scholar/DESIGN.md`.
3. Map màn hình → route Next.js (xem bảng mapping trong `docs/design/00-stitch-design-integration-plan.md`).
4. Xác định phần nào là component tái sử dụng (header, card, button...) — implement component trước (`implement-component.md`).
5. Implement phần nội dung riêng của page sau, dùng lại component vừa tạo/đã có.
6. Validate responsive theo đúng breakpoint trong `screen.png` (desktop/mobile) — nếu thiếu breakpoint tablet, suy ra từ token `spacing`/`rounded` trong DESIGN.md.

## Rules
- Không copy-paste nguyên `code.html` (HTML tĩnh từ Stitch) vào JSX — phải chuyển thành component React/Tailwind đúng convention project.
- Giữ đúng kiến trúc hiện tại (App Router, `src/components` convention) — không tạo cấu trúc mới song song.
- Giữ tinh thần Ruby HSK Scholar: ấm áp, học thuật, không dashboard.

## Output
- Component/page code khớp thiết kế + ghi chú diff (nếu có) vào `docs/design/00-stitch-design-integration-plan.md`.
