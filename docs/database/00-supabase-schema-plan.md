# 00 — Đề xuất schema Supabase cho Ruby HSK Landing

> **Không có migration nào được chạy trong tài liệu này.** Đây là đề xuất schema để user review trước.
> Supabase project ref hiện tại (từ `.mcp.json`): `vqukxdeymnmweacovmup`.

## 1. Trạng thái kết nối MCP Supabase

```
claude mcp list
supabase: https://mcp.supabase.com/mcp?project_ref=vqukxdeymnmweacovmup (HTTP) - ! Needs authentication
```

- MCP Supabase đã được thêm vào `.mcp.json` (project scope) và đã được approve ở mức project, nhưng server yêu cầu **OAuth login** (không phải API key tĩnh) → chưa có tool `mcp__supabase__*` nào khả dụng (`ToolSearch` xác nhận rỗng) cho tới khi đăng nhập xong.
- Đã thử `claude mcp login supabase` — lệnh này mở OAuth flow tới `https://api.supabase.com/v1/oauth/authorize` (scope: `organizations:read projects:read projects:write database:read database:write ...`) và cần **mở trình duyệt để đăng nhập/authorize**, sau đó redirect về `http://localhost:<port>/callback`.
- **Việc này không thể hoàn tất từ môi trường chạy lệnh không có terminal tương tác/trình duyệt** (ví dụ chạy qua agent/CI). **User cần tự chạy lệnh sau trong terminal thật của mình** (VS Code integrated terminal hoặc terminal hệ thống, nơi có thể mở trình duyệt):

  ```bash
  claude mcp login supabase
  ```

  Làm theo hướng dẫn trên màn hình: trình duyệt sẽ tự mở (hoặc copy URL được in ra), đăng nhập Supabase, authorize app, quay lại terminal sẽ thấy xác nhận thành công.
- Sau khi login xong, chạy lại `claude mcp list` để xác nhận trạng thái đổi thành `✔ Connected`, sau đó có thể dùng các tool đọc (ví dụ `list_tables`, `execute_sql` ở chế độ SELECT) để kiểm tra project hiện đã có bảng nào chưa trước khi đề xuất migration cuối cùng.
- Cho tới khi đăng nhập xong, schema dưới đây là đề xuất dựa trên yêu cầu nghiệp vụ (đọc từ `page.tsx` hiện tại + yêu cầu gốc), **chưa xác nhận được project Supabase hiện tại rỗng hay đã có bảng**.
- Nguyên tắc bắt buộc: **Supabase MCP chỉ dùng ở chế độ đọc (read-only)** trong giai đoạn audit/plan; không chạy `CREATE TABLE`/`ALTER`/`DROP` qua MCP cho tới khi user xác nhận rõ ràng ở Phase 6.

## 2. Đề xuất bảng

### 2.1 `teacher_profile`
Hồ sơ giáo viên — hiện chỉ có 1 giáo viên chính (cô Trần Hồng Ngọc) nhưng thiết kế dạng bảng để mở rộng sau này.

| Field | Type | Note |
|---|---|---|
| `id` | `uuid` PK default `gen_random_uuid()` | |
| `slug` | `text` unique | dùng cho URL nếu có trang chi tiết giáo viên |
| `full_name` | `text` not null | "Trần Hồng Ngọc" |
| `title` | `text` | ví dụ "Giáo viên tiếng Trung, chuyên luyện thi HSK" |
| `bio_vi` | `text` | |
| `bio_en` | `text` | |
| `avatar_url` | `text` | |
| `years_experience` | `smallint` | |
| `certifications` | `text[]` | |
| `is_active` | `boolean` default `true` | |
| `created_at` / `updated_at` | `timestamptz` default `now()` | |

- **Index:** unique trên `slug`.
- **RLS:** public read cho `is_active = true`; write chỉ admin (service role hoặc role riêng qua Supabase Auth sau này).
- **Map tới page:** `about/page.tsx`.

### 2.2 `course_categories`
Nhóm khoá học theo cấp độ HSK (1-2, 3-4, 5-6, Giao tiếp...).

| Field | Type | Note |
|---|---|---|
| `id` | `uuid` PK | |
| `slug` | `text` unique | ví dụ `hsk-1-2` |
| `name_vi` / `name_en` | `text` | |
| `sort_order` | `smallint` default `0` | |

- **RLS:** public read; admin write.
- **Map tới page:** filter sidebar trong `courses/page.tsx` (hiện đang hard-code `['Tất cả trình độ', 'HSK 1 - HSK 2', ...]`).

### 2.3 `courses`

| Field | Type | Note |
|---|---|---|
| `id` | `uuid` PK | |
| `slug` | `text` unique not null | cho URL `/courses/[slug]` tương lai |
| `category_id` | `uuid` FK → `course_categories.id` | |
| `title_vi` / `title_en` | `text` not null | |
| `description_vi` / `description_en` | `text` | dùng cho SEO + JSON-LD `Course.description` |
| `level_tag` | `text` | ví dụ "HSK 3-4" hiển thị badge |
| `cover_image_url` | `text` | |
| `duration_weeks` | `smallint` | |
| `price_note` | `text` | vì học phí có thể thay đổi/theo tư vấn, dùng text tự do thay vì số cứng |
| `is_published` | `boolean` default `true` | |
| `sort_order` | `smallint` default `0` | |
| `created_at` / `updated_at` | `timestamptz` default `now()` | |

- **Index:** unique `slug`; index `category_id`; index `is_published`.
- **RLS:** public read cho `is_published = true`; admin write.
- **Map tới page:** `courses/page.tsx` (thay danh sách `const courses = [...]` hard-code hiện tại).

### 2.4 `testimonials`
Chưa có UI hiện tại nhưng nằm trong yêu cầu chuẩn landing SEO/education — đề xuất cho Home hoặc About.

| Field | Type | Note |
|---|---|---|
| `id` | `uuid` PK | |
| `student_name` | `text` not null | |
| `content_vi` / `content_en` | `text` not null | |
| `rating` | `smallint` check `1..5` | |
| `avatar_url` | `text` | |
| `is_published` | `boolean` default `true` | |
| `sort_order` | `smallint` default `0` | |

- **RLS:** public read cho `is_published = true`; admin write.
- **Map tới page:** cần bổ sung UI mới ở Phase 4 (Home hoặc About) — hiện chưa có section testimonial nào trong code.

### 2.5 `faqs`
Cần cho JSON-LD `FAQPage` (Phase 5) và UI FAQ (`t('faq')` key đã tồn tại trong `messages/vi.json` → `Home.faq` nhưng chưa có UI render).

| Field | Type | Note |
|---|---|---|
| `id` | `uuid` PK | |
| `question_vi` / `question_en` | `text` not null | |
| `answer_vi` / `answer_en` | `text` not null | |
| `page_scope` | `text` | ví dụ `home`, `courses` — để render đúng FAQ theo trang |
| `sort_order` | `smallint` default `0` | |
| `is_published` | `boolean` default `true` | |

- **RLS:** public read cho `is_published = true`; admin write.
- **Map tới page:** Home (key `Home.faq` đã có trong messages nhưng chưa có component) hoặc Courses.

### 2.6 `contact_submissions`
Dữ liệu từ form liên hệ (`contact/page.tsx` hiện tại form chưa submit đi đâu — chỉ là UI tĩnh).

| Field | Type | Note |
|---|---|---|
| `id` | `uuid` PK | |
| `full_name` | `text` not null | |
| `phone` | `text` not null | |
| `email` | `text` | |
| `goal` | `text` | tương ứng textarea "Mục tiêu học" |
| `source_locale` | `text` | `vi`/`en`, để biết khách xem bản ngôn ngữ nào |
| `status` | `text` default `'new'` | `new` / `contacted` / `closed` |
| `created_at` | `timestamptz` default `now()` | |

- **Index:** index `created_at` (sắp xếp/lọc theo thời gian), index `status`.
- **RLS:** **insert-only cho anon** (client chỉ được `INSERT`, không được `SELECT`/`UPDATE`/`DELETE`); đọc/quản lý chỉ qua service role hoặc dashboard admin sau này.
- **Map tới page:** `contact/page.tsx`.
- **Lưu ý bảo mật:** đây là bảng chứa dữ liệu cá nhân (họ tên, SĐT, email) — RLS phải chặt, không được để public read.

### 2.7 `site_settings`
Cấu hình chung (hotline, Zalo, Messenger, địa chỉ...) — hiện đang hard-code trong `src/config/site.ts` và `floating-contact.tsx` (`#` placeholder).

| Field | Type | Note |
|---|---|---|
| `key` | `text` PK | ví dụ `contact.phone`, `contact.zalo_url`, `contact.messenger_url`, `contact.email`, `address` |
| `value` | `text` | |
| `updated_at` | `timestamptz` default `now()` | |

- **RLS:** public read (đây là thông tin công khai); admin write.
- **Map tới page:** `src/config/site.ts`, `FloatingContact`, `Footer`, `Contact` sidebar — có thể giữ fallback tĩnh trong code nếu Supabase chưa có dữ liệu (tránh trang trắng khi DB rỗng).

### 2.8 `legal_documents` (tuỳ chọn — chỉ tạo nếu nội dung pháp lý cần version/audit theo thời gian)

| Field | Type | Note |
|---|---|---|
| `id` | `uuid` PK | |
| `type` | `text` | `privacy` / `terms` |
| `locale` | `text` | `vi` / `en` |
| `version` | `text` | ví dụ `2026-07-03` |
| `content_html` | `text` | |
| `published_at` | `timestamptz` | |

- **RLS:** public read cho document đã publish; admin write.
- **Map tới page:** `privacy/page.tsx`, `terms/page.tsx`.
- **Khuyến nghị:** chỉ tạo bảng này nếu Ruby HSK cần lưu lịch sử thay đổi điều khoản; nếu không, giữ nội dung tĩnh trong `messages/*.json` hoặc component là đủ (đơn giản hơn, ít bảng hơn).

## 3. Thứ tự migration đề xuất (khi được approve chạy)

1. `course_categories` (không phụ thuộc bảng khác)
2. `courses` (phụ thuộc `course_categories`)
3. `teacher_profile`
4. `testimonials`
5. `faqs`
6. `site_settings`
7. `contact_submissions`
8. `legal_documents` (nếu cần)

## 4. RLS tổng quan

| Bảng | Public SELECT | Public INSERT | Admin write |
|---|---|---|---|
| `course_categories` | ✅ | ❌ | ✅ (service role) |
| `courses` | ✅ (chỉ `is_published=true`) | ❌ | ✅ |
| `teacher_profile` | ✅ (chỉ `is_active=true`) | ❌ | ✅ |
| `testimonials` | ✅ (chỉ `is_published=true`) | ❌ | ✅ |
| `faqs` | ✅ (chỉ `is_published=true`) | ❌ | ✅ |
| `site_settings` | ✅ | ❌ | ✅ |
| `contact_submissions` | ❌ | ✅ (anon insert-only) | ✅ (đọc/update qua service role) |
| `legal_documents` | ✅ (chỉ đã publish) | ❌ | ✅ |

## 5. Việc cần làm trước khi chạy migration thật (Phase 6)

- [ ] User tự chạy `claude mcp login supabase` trong terminal có trình duyệt để hoàn tất OAuth (không thể thực hiện qua agent/không có TTY tương tác).
- [ ] Dùng tool đọc của MCP Supabase (sau khi approve) để kiểm tra project hiện tại đã có bảng/schema nào trùng tên chưa, tránh xung đột.
- [ ] User xác nhận danh sách bảng ở mục 2 (đặc biệt: có cần `legal_documents` không, có cần `testimonials` ngay từ đầu không).
- [ ] Chuẩn bị `SUPABASE_SERVICE_ROLE_KEY` (chưa có trong `.env.example` hiện tại) nếu cần server-side write (ví dụ xử lý `contact_submissions` từ Route Handler thay vì client trực tiếp).
