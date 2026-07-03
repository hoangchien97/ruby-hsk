# Supabase Rules

- Supabase là database chính thức của project (client hiện tại: `src/lib/supabase/client.ts`).
- Luôn dùng **MCP Supabase ở chế độ đọc (read-only)** trước để inspect schema/dữ liệu hiện có — không đoán schema khi chưa kiểm tra thật.
- **Không chạy operation destructive**: không `DROP TABLE`, không `TRUNCATE`, không `DELETE`/`UPDATE` hàng loạt không có `WHERE` rõ ràng, không migration nào chạy tự động mà chưa được user xác nhận rõ ràng.
- Không expose `SUPABASE_SERVICE_ROLE_KEY` ra client/browser — chỉ dùng ở server (Route Handler/Server Action), không đưa vào biến `NEXT_PUBLIC_*`.
- Bảng chứa dữ liệu cá nhân (`contact_submissions`): client chỉ được `INSERT`, không được `SELECT`/`UPDATE`/`DELETE` — RLS phải chặn public read.
- Form liên hệ phải validate input phía client trước khi gửi (định dạng SĐT/email tối thiểu) — không trust input mù.
- RLS (Row Level Security) phải được thiết kế **trước khi** đưa bảng lên production — mặc định: bảng content công khai (`courses`, `faqs`, `testimonials`, `teacher_profile`, `site_settings`) → public SELECT, admin-only write.
- Luôn viết **schema proposal doc** (`docs/database/`) trước khi viết SQL migration thật — không migrate thẳng từ ý tưởng.
- Chi tiết schema đề xuất: `docs/database/00-supabase-schema-plan.md`.
