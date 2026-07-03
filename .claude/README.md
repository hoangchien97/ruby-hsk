# `.claude/` — Hướng dẫn cấu trúc

Thư mục này chứa toàn bộ tài liệu vận hành Claude Code cho project Ruby HSK Landing, bổ trợ cho `CLAUDE.md` ở root (file gốc, ngắn gọn).

## Cấu trúc

- **`CLAUDE.md` (ở root, không nằm trong `.claude/`)** — hướng dẫn ngắn, luôn được nạp đầu tiên. Chứa mission, stack, rule tối quan trọng, folder convention, command, workflow.
- **`rules/*.md`** — quy tắc **luôn áp dụng** (always-on constraints) cho toàn project: quy tắc nghiệp vụ, UI/design, SEO, i18n, Supabase, git. Đọc trước khi code bất kỳ phần nào liên quan.
- **`skills/*.md`** — workflow tái sử dụng cho từng loại tác vụ cụ thể (audit, implement page/component, chuyển đổi từ Stitch, SEO, schema Supabase, QA responsive, deploy). Mỗi skill có Purpose/Steps/Output rõ ràng.
- **`prompts/*.md`** — prompt soạn sẵn cho các phase lớn của project (master plan, Stitch audit, design system, build pages, SEO checklist, Supabase checklist, deploy checklist). Dùng làm điểm bắt đầu khi mở phase mới.

## Lưu ý về `skills/supabase` và `skills/supabase-postgres-best-practices`

Hai thư mục này là **skill bên thứ ba** (từ `supabase/agent-skills`, quản lý qua `skills-lock.json` ở root, symlink tới `.agents/skills/`) — không phải skill do project này tự viết. Không sửa nội dung bên trong hai thư mục đó; nếu cần cập nhật, dùng cơ chế cài skill tương ứng, không sửa tay.

## Nguyên tắc

- **Không chứa secret** trong bất kỳ file nào ở `.claude/` (API key, token, service role key...).
- File private/local (ví dụ `settings.local.json`) đã được khai báo trong `.gitignore` ở root — không commit các file này.
- `rules/`, `skills/`, `prompts/` (trừ symlink bên thứ ba nói trên) đều được commit vào git — đây là tài liệu chia sẻ cho cả team.
