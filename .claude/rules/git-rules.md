# Git Rules

- Không commit secret dưới bất kỳ hình thức nào (API key, service role key, OAuth token...).
- Không commit `.env`/`.env.local`/`.env.*.local` (đã có trong `.gitignore`).
- Không commit `.next/`, `node_modules/` (đã có trong `.gitignore`).
- Không commit file Claude private/local: `.claude/settings.local.json` (đã có trong `.gitignore`).
- Không commit `.mcp.json` khi file này chứa secret (hiện tại chứa API key Stitch — đã được thêm vào `.gitignore`; nếu sau này tách secret ra khỏi `.mcp.json`, có thể xem lại quyết định này).
- **Package lock policy hiện tại**: project dùng `npm` (có `package-lock.json` trên disk) nhưng `package-lock.json` đang bị ignore trong `.gitignore` — đây là quyết định có sẵn từ trước, **không tự đổi** (không xoá lockfile, không đổi sang pnpm/yarn) khi chưa được user xác nhận rõ ràng.
- Không đổi package manager khi chưa được duyệt.
- Khi được yêu cầu tạo commit: commit nhỏ, tập trung một mục đích, message rõ "why" hơn "what".
- Khi thay đổi kiến trúc/SEO/database, cập nhật tài liệu tương ứng trong `docs/` cùng lúc (không để doc lệch code).
