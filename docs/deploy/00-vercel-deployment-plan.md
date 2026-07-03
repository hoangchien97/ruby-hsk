# 00 — Kế hoạch deploy Vercel cho Ruby HSK Landing

> Không có hành động deploy thực tế nào được thực hiện trong tài liệu này — đây là kế hoạch, cần user xác nhận trước khi thực thi (deploy là hành động ảnh hưởng hệ thống chia sẻ/công khai).

## 1. Điều kiện tiên quyết trước khi deploy

- [ ] Phase 1–8 (architecture cleanup → QA/build) đã hoàn tất và `npm run build` chạy sạch cục bộ.
- [ ] Có domain thật (hoặc dùng domain `*.vercel.app` tạm cho giai đoạn preview).
- [ ] Có project Supabase thật (đã có sẵn: project ref `vqukxdeymnmweacovmup`) với schema đã được review ở `docs/database/00-supabase-schema-plan.md`.
- [ ] Có đủ nội dung thật (không placeholder) cho các trang bắt buộc, theo Phase 4.

## 2. Kết nối repo với Vercel

1. Import repository GitHub vào Vercel (Next.js framework preset — Vercel tự nhận diện App Router).
2. Root Directory: giữ mặc định (repo root), vì `package.json` nằm ở root.
3. Build command: mặc định `next build` (khớp với `"build": "next build"` trong `package.json`).
4. Install command: **giữ `npm install`** — không đổi sang `pnpm`/`yarn` (đúng rule "không đổi package manager"; đồng thời khớp với `package-lock.json` thực tế, không phải hướng dẫn `pnpm` sai trong README hiện tại).
5. Node.js version: dùng version LTS mà Vercel mặc định hỗ trợ cho Next.js mới nhất (kiểm tra `engines` trong `package.json` nếu cần pin cứng — hiện chưa có `engines`, có thể bổ sung ở Phase 1 nếu muốn khoá version).

## 3. Environment variables (Production + Preview)

| Key | Nguồn | Bắt buộc trước khi deploy production |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | domain thật (ví dụ `https://rubyhsk.vn`) | ✅ — dùng cho `metadataBase`, sitemap, canonical |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project settings | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project settings | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase project settings (nếu Phase 6 cần server client) | Chỉ cần nếu có Route Handler xử lý `contact_submissions`/admin phía server |

- Set riêng cho **Production** và **Preview** environment trong Vercel dashboard — Preview có thể dùng cùng Supabase project (bảng public read không rủi ro) nhưng cân nhắc Supabase project riêng cho Preview nếu có ghi dữ liệu test qua `contact_submissions`.
- Không commit giá trị thật vào `.env.example` (hiện tại `.env.example` chỉ có key rỗng — đúng chuẩn, giữ nguyên).

## 4. Domain & routing

- Middleware hiện tại (`middleware.ts`) đã xử lý redirect locale qua matcher `['/', '/(vi|en)/:path*']` — không cần cấu hình redirect thêm ở Vercel.
- Set custom domain trong Vercel → domain provider (CNAME/A record theo hướng dẫn Vercel).
- Xác nhận `www` vs non-`www` redirect theo quyết định của khách hàng (Vercel hỗ trợ redirect domain phụ → domain chính).

## 5. Preview → Production flow

1. Mọi PR/branch tạo Preview Deployment tự động (Vercel default).
2. Review Preview URL cho **cả 2 locale** (`/vi`, `/en`) trước khi merge — đặc biệt kiểm tra:
   - Header/Footer/MobileNav hiển thị đúng ngôn ngữ.
   - Theme toggle light/dark không lỗi hydration (đã có `mounted` guard trong `ThemeToggle`, giữ nguyên pattern này).
   - Form Contact không lỗi console (kể cả khi chưa nối Supabase thật ở Preview).
3. Merge vào `main` → Production Deployment.
4. **Chỉ promote domain chính thức sau khi user xác nhận rõ ràng** — đây là hành động công khai, cần confirm trước khi thực hiện.

## 6. Kiểm tra sau khi deploy (liên kết với Phase 10)

- [ ] `https://<domain>/` redirect đúng về locale mặc định (`vi`).
- [ ] `https://<domain>/sitemap.xml` và `/robots.txt` truy cập được (sau khi Phase 5 hoàn tất).
- [ ] `https://<domain>/vi` và `/en` trả 200, không lỗi hydration trên console.
- [ ] Ảnh/OG preview hiển thị đúng khi share link (Facebook/Zalo debugger).
- [ ] Lighthouse chạy trên URL production thật (không phải localhost) để có số Core Web Vitals chính xác.

## 7. Rollback plan

- Vercel giữ lịch sử deployment — nếu production lỗi, dùng "Instant Rollback" về deployment trước đó ngay trên dashboard, không cần revert git.
- Không dùng `git push --force`/`git reset --hard` để rollback — luôn rollback qua Vercel dashboard hoặc tạo commit revert mới.
