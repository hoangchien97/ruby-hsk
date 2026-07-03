# UI / Design Rules

## Design system nguồn
- Theo phong cách **Ruby HSK Scholar / Luminous Education**.
- Nguồn tham khảo chính thức: `Stitch_Ruby_HSK_HTML/ruby_hsk_scholar/DESIGN.md` + các thư mục `*_page_*` (mỗi thư mục có `code.html` + `screen.png`).
- **KHÔNG dùng** biến thể `Stitch_Ruby_HSK_HTML/vibrant_academic_ivory/` — bảng màu (coral đỏ #FF5A5F...) không khớp brand mandate.

## Design tokens (bắt buộc)
- Primary: `#804237`
- Secondary: `#E78F65`
- Tertiary: `#191211`
- Neutral: `#F9F5F0`
- Token hiện có tại `src/styles/design-tokens.scss` (`--color-primary`, `--color-secondary`...) — đối chiếu với `ruby_hsk_scholar/DESIGN.md` trước khi thêm token mới; không tự ý đổi giá trị hex đã chốt ở trên khi chưa hỏi user.
- Không dùng màu random ngoài token — mọi màu trong component phải trỏ về CSS variable hoặc Tailwind token.

## Phong cách hình ảnh
- Warm, academic, "cute nhưng không trẻ con" — glassmorphism nhẹ (`.glass-card` hiện có), bo góc mềm, shadow tint theo màu primary (không dùng shadow đen thuần).
- Không dùng visual mạnh kiểu dashboard/coding tool (không neon, không dark-terminal look).

## Header
- Logo **chỉ icon**, không kèm text thương hiệu (`LogoIcon` hiện tại đúng chuẩn — giữ pattern `aria-label` + `sr-only` text cho a11y).

## Mobile bottom navigation (bắt buộc 5 item)
1. Trang chủ
2. Khóa học
3. Về Ruby
4. Liên hệ
5. Thêm (More)

## More bottom sheet (bắt buộc chứa)
- Link pháp lý (Privacy, Terms)
- Link liên hệ nhanh / CTA bắt đầu học
- Toggle VI/EN
- Theme icon toggle
- (Khi có) shortcut liên hệ Zalo/Messenger/Phone

## Theme switch
- Chỉ **1 icon button duy nhất** (Sun/Moon), không dropdown, không 3 lựa chọn light/dark/system hiển thị riêng.

## Cấm
- Không dùng màu ngoài token.
- Không style kiểu SaaS/dashboard/admin.
- Không thêm UI library mới (component primitive) khi chưa được duyệt — ưu tiên mở rộng `src/components/ui/`.
