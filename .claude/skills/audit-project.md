# Skill: Audit Project

## Purpose
Audit toàn diện hiện trạng project trước khi lên plan hoặc code, tránh giả định sai cấu trúc.

## When to use
- Trước khi bắt đầu 1 phase lớn mới.
- Khi nghi ngờ tài liệu (`README.md`, `CLAUDE.md`, `docs/`) đã lệch so với code thật.
- Khi có người mới join hoặc resume project sau thời gian dài không code.

## Steps
1. Đọc `package.json` (scripts, dependencies), `next.config.ts`, `middleware.ts`.
2. Đọc `src/app/**` (route tree), `src/i18n/**`, `src/messages/*.json`.
3. Đọc `src/styles/design-tokens.scss`, `src/app/globals.scss`.
4. Đọc `src/components/**` (xác nhận convention thật đang dùng).
5. Đọc `src/lib/supabase/**`, `.mcp.json`.
6. Đọc `README.md`, `CLAUDE_PROMPT.md`, `CLAUDE.md` hiện có, so sánh với code thật — liệt kê mismatch.
7. Chạy `claude mcp list` để kiểm tra trạng thái kết nối MCP.
8. Ghi kết quả vào file audit mới.

## Required checks
- Không giả định tên thư mục — luôn Glob/Read thật.
- Không tự sửa mismatch trong bước audit — chỉ ghi nhận.

## Output
- `docs/audit/YYYY-MM-DD-current-state.md` (dùng ngày thật của lần audit).
