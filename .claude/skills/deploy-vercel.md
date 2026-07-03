# Skill: Deploy Vercel

## Purpose
Chuẩn bị và thực hiện deploy an toàn lên Vercel.

## When to use
- Trước khi deploy preview hoặc promote production.

## Steps
1. Chạy `npm run typecheck` — phải pass sạch.
2. Chạy `npm run lint` — phải pass sạch.
3. Chạy `npm run build` — phải pass sạch, kiểm tra sitemap/robots sinh ra đúng.
4. Kiểm tra env vars cần thiết đã khai báo trên Vercel (Production + Preview): `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (nếu dùng server client).
5. Kiểm tra không có secret nào trong code/commit (`git diff`, `git log` gần nhất).
6. Kiểm tra `.gitignore` đã chặn đúng file private/local.
7. Deploy Preview trước — review cả 2 locale (`/vi`, `/en`) trên Preview URL.
8. Chỉ promote Production sau khi user xác nhận rõ ràng (đây là hành động công khai, ảnh hưởng domain thật).

## Required checks
- Không tự động promote production mà chưa hỏi.
- Không đổi package manager trong Vercel install command khi chưa được duyệt (giữ `npm install`).

## Output
- `docs/deploy/vercel-deploy-checklist.md` (nếu cần ghi nhận checklist theo lần deploy cụ thể) hoặc cập nhật `docs/deploy/00-vercel-deployment-plan.md`.
