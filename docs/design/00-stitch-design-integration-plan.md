# 00 — Kế hoạch tích hợp thiết kế Stitch (Ruby HSK Scholar / Luminous Education)

## 1. Trạng thái kết nối MCP Stitch (kiểm tra ngày 2026-07-03)

```
claude mcp list
stitch: https://stitch.googleapis.com/mcp (HTTP) - ! Connected · tools fetch failed

claude mcp get stitch
Status: ! Connected · tools fetch failed
Issue: can't resolve reference #/$defs/ScreenInstance from id #
```

- Handshake HTTP thành công, API key (`X-Goog-Api-Key`) được server chấp nhận ở tầng transport — **đây không phải lỗi do key sai hoặc thiếu quyền**.
- Lỗi cụ thể `can't resolve reference #/$defs/ScreenInstance from id #` là lỗi **JSON Schema không hợp lệ do chính server Stitch trả về** khi Claude Code gọi `tools/list` — schema của (ít nhất) một tool tham chiếu `$ref: "#/$defs/ScreenInstance"` nhưng phần `$defs` tương ứng không tồn tại/không giải quyết được trong document schema đó. Đây là **lỗi phía server MCP của Stitch (Google)**, không phải lỗi cấu hình ở máy user.
- Hệ quả: **không có tool `mcp__stitch__*` nào khả dụng** trong session hiện tại (`ToolSearch` xác nhận namespace rỗng) cho tới khi Google sửa schema ở endpoint `https://stitch.googleapis.com/mcp`.
- **Việc không giải quyết được từ phía chúng ta:** đổi lại API key hoặc re-add server sẽ không sửa được lỗi này vì nguyên nhân không nằm ở key/auth mà ở schema server trả về.
- **Phương án tạm (không phụ thuộc MCP):**
  1. Theo dõi/report lỗi này cho phía Stitch (Google) nếu có kênh hỗ trợ.
  2. Thử lại định kỳ bằng `claude mcp get stitch` — nếu Google fix schema, `Status` sẽ đổi thành `✔ Connected` và tool sẽ tự xuất hiện qua `ToolSearch` mà không cần cấu hình lại.
  3. Trong lúc chờ: nếu user có sẵn ảnh chụp màn hình (screenshot) hoặc export từ Stitch, đưa trực tiếp vào chat để đọc bằng Read tool (hỗ trợ ảnh) — dùng làm nguồn đối chiếu thủ công cho Phase 2 thay vì gọi MCP.

## 2. Kế hoạch trích xuất design token (khi MCP Stitch hoạt động)

Với mỗi màn hình Stitch liên quan, gọi tool tương ứng (tên tool thực tế sẽ xác nhận lại khi `tools/list` thành công — dự kiến nhóm tool dạng `get_design_context`/`get_screenshot`/`inspect_screen` tương tự pattern MCP thiết kế khác) để trích xuất:

| Nhóm token | Cần lấy | Đối chiếu với file hiện tại |
|---|---|---|
| Colors | primary, secondary, tertiary, background, surface, border, muted, gold/accent, trạng thái dark mode | `src/styles/design-tokens.scss` (`:root` và `.dark`) |
| Typography | font family, scale (h1–h6, body, caption), font-weight, line-height | Hiện chỉ có `--font-sans`, chưa có type scale riêng — Tailwind default đang được dùng qua class (`text-4xl`, `font-black`...) |
| Spacing | spacing scale nếu Stitch có hệ riêng ngoài Tailwind default | Hiện dùng Tailwind spacing mặc định |
| Radius | xl/2xl/3xl | `--radius-xl/2xl/3xl` đã có, cần đối chiếu giá trị chính xác |
| Shadows | soft, button, card | `--shadow-soft`, `--shadow-button` đã có |
| Buttons | primary/secondary/ghost, state hover/active/disabled | `src/components/ui/button.tsx` |
| Cards | glass-card, feature card, course card | `.glass-card` (globals.scss), `FeatureGrid` (`sections/cards.tsx`), course card trong `courses/page.tsx` |
| Forms | input, textarea, checkbox, focus state | input/textarea hiện inline trong `contact/page.tsx`, chưa có component `Input`/`Textarea` tái sử dụng |
| Header | desktop nav, sticky behavior, logo icon-only | `src/components/layout/header.tsx` |
| Mobile bottom nav | 4 item + More, active state | `src/components/layout/mobile-bottom-nav.tsx` |
| Mobile more bottom sheet | animation, item list | phần `open && <div>...` trong `mobile-bottom-nav.tsx` |
| Legal layout | mục lục sticky + nội dung | `src/components/legal/legal-page.tsx` |
| Loading animation | icon bounce + dot pulse | `src/components/loading/loading-logo.tsx` |

**Cách làm việc:** với mỗi nhóm, lấy `get_design_context`/screenshot của node Stitch tương ứng, so sánh giá trị (hex, px, rem) với file code hiện tại, ghi lại diff, rồi mới áp dụng ở Phase 2 (không đổi code trong bước audit/plan này).

## 3. Mapping màn hình Stitch → route Next.js

| Màn hình Stitch | Route | File hiện tại |
|---|---|---|
| Home | `/[locale]` | `src/app/[locale]/page.tsx` |
| Courses | `/[locale]/courses` | `src/app/[locale]/courses/page.tsx` |
| About | `/[locale]/about` | `src/app/[locale]/about/page.tsx` |
| Contact | `/[locale]/contact` | `src/app/[locale]/contact/page.tsx` |
| Privacy Policy | `/[locale]/privacy` | `src/app/[locale]/privacy/page.tsx` |
| Terms of Service | `/[locale]/terms` | `src/app/[locale]/terms/page.tsx` |
| Coming Soon | `/[locale]/coming-soon` | `src/app/[locale]/coming-soon/page.tsx` |
| 404 | `not-found.tsx` | `src/app/[locale]/not-found.tsx` (localized) + `src/app/not-found.tsx` (global, redirect `/vi`) |
| Loading | `loading.tsx` + `LoadingLogo` | `src/app/[locale]/loading.tsx` + `src/components/loading/loading-logo.tsx` |
| Mobile bottom navigation | (component, không phải route riêng) | `src/components/layout/mobile-bottom-nav.tsx`, render trong `[locale]/layout.tsx` |
| Mobile more bottom sheet | (component, không phải route riêng) | phần sheet trong `mobile-bottom-nav.tsx` |

Không cần route riêng cho Tablet — tablet là breakpoint responsive của cùng route Home/Courses/About/Contact (theo đúng yêu cầu gốc, tablet chỉ có 4 trang, không có route riêng).

## 4. Nguyên tắc khi áp style từ Stitch vào code

1. Không đổi cấu trúc component chỉ vì Stitch trình bày khác — ưu tiên đổi token (màu/spacing/radius) trước, chỉ đổi cấu trúc DOM khi bố cục thực sự khác.
2. Logo header **luôn icon-only** — nếu Stitch có phiên bản có text, chỉ lấy phần icon.
3. Giữ đúng tông màu đã khai báo trong `CLAUDE_PROMPT.md`: `#804237, #E78F65, #191211, #F9F5F0` — đối chiếu để đảm bảo Stitch không lệch tông màu gốc; nếu Stitch cho tông khác, hỏi lại user trước khi đổi token gốc.
4. Không copy nguyên style "SaaS/dashboard" — đúng yêu cầu "Do not create a SaaS/coding/dashboard visual style", giữ tinh thần "ấm áp, giáo dục" (Luminous Education).

## 5. Việc cần làm ngay (trước khi Phase 2 code)

- [ ] Theo dõi lỗi schema `#/$defs/ScreenInstance` ở server Stitch — đây là lỗi bên Google, chờ fix hoặc report qua kênh hỗ trợ Stitch nếu có.
- [ ] Định kỳ chạy `claude mcp get stitch` để kiểm tra khi nào server hết lỗi (không cần re-add/đổi key).
- [ ] Sau khi MCP Stitch hoạt động, chạy lại `ToolSearch` để lấy đúng tên tool và bổ sung phần "cách gọi tool thực tế" vào tài liệu này.
- [ ] Trong lúc chờ, dùng ảnh chụp Stitch (paste trực tiếp vào chat) làm nguồn đối chiếu thủ công cho Phase 2.
