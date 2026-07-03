# Skill: Supabase Schema Plan

## Purpose
Đề xuất/điều chỉnh schema Supabase một cách an toàn, không phá dữ liệu hiện có.

## When to use
- Trước khi thêm bảng mới hoặc thay đổi bảng hiện có.

## Steps
1. Dùng MCP Supabase ở chế độ đọc (`list_tables`/tương đương) để kiểm tra schema hiện tại — không đoán.
2. Đối chiếu với đề xuất trong `docs/database/00-supabase-schema-plan.md` (bảng: `courses`, `course_categories`, `teacher_profile`, `testimonials`, `faqs`, `contact_submissions`, `site_settings`, `legal_documents`).
3. Đề xuất field/index/RLS cho bảng cần thêm/sửa.
4. Viết SQL migration **dạng draft** (chưa chạy) — đặt trong doc hoặc file `.sql` chưa apply.
5. Trình bày draft cho user, chờ xác nhận rõ ràng trước khi apply.
6. Nếu được approve, apply migration qua MCP hoặc Supabase dashboard — luôn kiểm tra lại bằng câu lệnh đọc sau khi apply.

## Required checks
- **Không tự chạy** `CREATE TABLE`/`ALTER`/`DROP` khi chưa có xác nhận rõ ràng của user.
- Không xoá bảng/dữ liệu hiện có.
- RLS phải được định nghĩa cùng lúc với bảng — không để bảng public read/write mặc định.
- Bảng chứa dữ liệu cá nhân (`contact_submissions`) → chỉ insert-only cho anon.

## Output
- Migration draft (SQL) + cập nhật `docs/database/00-supabase-schema-plan.md`.
