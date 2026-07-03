# 00 — Master Implementation Plan: Ruby HSK Landing

> Tài liệu này tổng hợp toàn bộ roadmap triển khai, dựa trên kết quả audit tại
> [`docs/audit/00-current-state-audit.md`](../audit/00-current-state-audit.md).
> Các tài liệu con: [design](../design/00-stitch-design-integration-plan.md),
> [seo](../seo/00-seo-implementation-plan.md), [database](../database/00-supabase-schema-plan.md),
> [deploy](../deploy/00-vercel-deployment-plan.md).
>
> **Trạng thái: PLAN ONLY — chưa có phase nào được thực thi.** Mỗi phase cần xác nhận của user trước khi code.

## Nguyên tắc xuyên suốt tất cả các phase

- Không xoá file. Không đổi package manager (giữ npm). Không đổi database khi chưa được yêu cầu rõ.
- Không thêm UI library mới trừ khi có lý do mạnh (hiện tại Tailwind + SCSS + lucide-react là đủ).
- Mobile-first bắt buộc cho mọi component/layout mới.
- Component mới đặt trong `src/components` theo convention hiện có (xem quyết định ở audit mục 4).
- Mọi text hiển thị phải đi qua `next-intl` (`useTranslations`/`getTranslations`), không hard-code chuỗi VI cứng trong JSX như một số nơi hiện tại (footer, courses).
- Supabase MCP chỉ dùng ở chế độ đọc (read-only) trừ khi user yêu cầu rõ ràng chạy migration.

---

## Phase 0 — Baseline audit
**Trạng thái: ĐÃ HOÀN THÀNH** (xem `docs/audit/00-current-state-audit.md`)

- **Goal:** Hiểu toàn bộ hiện trạng code, cấu trúc, MCP, gap trước khi code.
- **Tasks:** Đọc package.json, next.config.ts, middleware.ts, src/app, src/i18n, messages, design-tokens.scss, components, .mcp.json, README, CLAUDE_PROMPT.md; kiểm tra kết nối MCP.
- **Files touched:** Không có (chỉ đọc).
- **Acceptance criteria:** Audit doc liệt kê đầy đủ mismatch, gap, quyết định treo.
- **Risk/notes:** MCP Supabase đang "Pending approval", MCP Stitch "Connected · tools fetch failed" — cả hai cần user xử lý trước Phase 2/6 để khai thác đầy đủ (xem Step 3 trong tài liệu này).

---

## Phase 1 — Architecture cleanup
- **Goal:** Dọn dẹp mismatch giữa tài liệu và code thật, chốt convention trước khi mở rộng.
- **Tasks:**
  1. Xác nhận với user: giữ `src/components` (khuyến nghị) hoặc đổi toàn bộ sang `src/components_v2`.
  2. Nếu giữ `src/components`: sửa `README.md`, `CLAUDE_PROMPT.md` để xoá nhắc tới `components_v2`.
  3. Xác nhận với user: chuyển `messages/` → `src/messages/` (khuyến nghị) hoặc giữ nguyên.
  4. Nếu chuyển: di chuyển 2 file JSON + sửa 1 import trong `src/i18n/request.ts`.
  5. Sửa README phần "Quick start" cho khớp npm thực tế (bỏ hướng dẫn `pnpm`).
  6. Tạo `public/` với favicon tạm (sẽ thay bằng asset thật ở Phase 2 khi có logo chính thức từ Stitch).
- **Files to touch:** `README.md`, `CLAUDE_PROMPT.md`, `src/i18n/request.ts`, `messages/*` (di chuyển), `public/favicon.ico` (mới).
- **Acceptance criteria:** `npm run dev`, `npm run typecheck`, `npm run lint` chạy sạch sau khi đổi; không còn tài liệu nhắc `components_v2`/`pnpm`.
- **Risk/notes:** Rủi ro thấp, thay đổi cơ học. Cần xác nhận user trước khi di chuyển `messages/` vì đây là quyết định cấu trúc.

---

## Phase 2 — Design tokens & base UI
- **Goal:** Đồng bộ `design-tokens.scss` và Tailwind theme với style "Ruby HSK Scholar / Luminous Education" trích xuất từ Stitch.
- **Tasks:**
  1. Dùng MCP Stitch để lấy design context các màn hình chính (xem chi tiết ở `docs/design/00-stitch-design-integration-plan.md`).
  2. Đối chiếu token hiện tại (`--color-primary: #804237`, `--color-secondary: #e78f65`...) với token Stitch, cập nhật nếu có sai khác.
  3. Bổ sung token còn thiếu: typography scale, spacing scale nếu Stitch định nghĩa riêng ngoài Tailwind default.
  4. Mở rộng `src/components/ui/` với các primitive còn thiếu nếu Stitch có (ví dụ: badge, input, card variant) — chỉ thêm khi có nhu cầu thực tế từ page.
  5. Cập nhật `LogoIcon` nếu Stitch có icon logo chính thức khác (giữ nguyên rule: icon-only, không text).
- **Files to touch:** `src/styles/design-tokens.scss`, `src/components/ui/*`, `src/components/logo/logo-icon.tsx`.
- **Acceptance criteria:** Token trong code khớp 1:1 với Stitch (màu, radius, shadow); Storybook không có (chấp nhận) nên acceptance = so sánh trực quan trang Home/Courses với screenshot Stitch.
- **Risk/notes:** Phụ thuộc MCP Stitch hoạt động được (đang lỗi "tools fetch failed" — cần fix trước khi phase này có thể tự động hoá; nếu không fix được, dùng ảnh chụp màn hình Stitch làm reference thủ công).

---

## Phase 3 — Layout components
- **Goal:** Hoàn thiện Header/Footer/MobileBottomNav/More bottom sheet đúng chuẩn Stitch, đa ngôn ngữ đầy đủ.
- **Tasks:**
  1. Header: giữ logo icon-only, kiểm tra spacing/breakpoint theo Stitch (desktop nav ẩn dưới `md`, đã đúng).
  2. Footer: chuyển các label hard-code ("Trang", "Học tiếng Trung", "Pháp lý") sang `useTranslations` (thêm key mới vào `messages/*.json`).
  3. Mobile bottom nav: giữ 4 item + nút "More" (đã có), kiểm tra icon/label khớp Stitch.
  4. More bottom sheet: hiện đã có sheet cơ bản (Privacy/Terms/Contact + toggles) — bổ sung item nếu Stitch design có nhiều mục hơn (ví dụ liên kết mạng xã hội, hotline).
  5. `FloatingContact`: cập nhật link Zalo/Messenger/Phone thật khi có thông tin chính thức (hiện là `#` placeholder).
- **Files to touch:** `src/components/layout/*`, `messages/vi.json`, `messages/en.json`.
- **Acceptance criteria:** Không còn chuỗi tiếng Việt hard-code trong component layout; mobile bottom sheet khớp Stitch; test tay trên viewport 360px, 768px, 1280px.
- **Risk/notes:** Cần nội dung liên hệ thật (số điện thoại, Zalo, Messenger) từ khách hàng trước khi go-live.

---

## Phase 4 — Page implementation
- **Goal:** Hoàn thiện nội dung thật (không placeholder) cho toàn bộ trang desktop/tablet/mobile theo mapping route ở `docs/design/00-stitch-design-integration-plan.md`.
- **Tasks:**
  1. Home (`/[locale]`): thay số liệu placeholder ("10.000+ Học viên"...) bằng số liệu thật hoặc đánh dấu rõ là ví dụ minh hoạ nếu chưa có số liệu chính thức.
  2. Courses (`/[locale]/courses`): chuyển danh sách khoá học cứng sang đọc từ Supabase (phối hợp Phase 6) hoặc giữ static nếu chưa có DB — nhưng phải là nội dung SEO thật (mô tả khoá học chi tiết, không placeholder).
  3. About (`/[locale]/about`): bổ sung hồ sơ chính thức cô Trần Hồng Ngọc (kinh nghiệm, chứng chỉ, phương pháp) — cần input từ khách hàng.
  4. Contact (`/[locale]/contact`): form liên hệ cần nối vào Supabase `contact_submissions` (Phase 6) hoặc dịch vụ email; thông tin liên hệ thật.
  5. Privacy/Terms: nội dung pháp lý thật, không phải placeholder lặp "Nội dung chính sách sẽ được cập nhật...".
  6. Coming Soon, 404, Loading: giữ nguyên UI, chỉ polish theo token mới từ Phase 2.
- **Files to touch:** toàn bộ `src/app/[locale]/**/page.tsx`, `src/components/sections/*`, `messages/*.json`.
- **Acceptance criteria:** Không còn text "placeholder", "cập nhật theo hồ sơ chính thức" hiển thị cho end-user (trừ khi khách hàng chấp nhận giữ tạm); mọi trang responsive đúng 3 breakpoint yêu cầu.
- **Risk/notes:** Đây là phase phụ thuộc nhiều nhất vào **nội dung thật từ khách hàng** (Ruby HSK) — không thể hoàn thành 100% chỉ bằng code.

---

## Phase 5 — SEO implementation
- **Goal:** Triển khai đầy đủ hạ tầng SEO kỹ thuật (metadata, sitemap, robots, JSON-LD, OG/Twitter).
- **Tasks:** Chi tiết đầy đủ tại `docs/seo/00-seo-implementation-plan.md`. Tóm tắt:
  1. `generateMetadata` riêng cho từng route (title template, description, canonical, alternates VI/EN).
  2. `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/manifest.ts`.
  3. JSON-LD: Organization, EducationalOrganization, Course (per course), FAQPage, BreadcrumbList.
  4. Tạo `public/` assets: favicon, apple-icon, OG default image 1200x630.
  5. Alt text chuẩn cho toàn bộ ảnh/icon có ý nghĩa nội dung.
- **Files to touch:** `src/app/sitemap.ts` (mới), `src/app/robots.ts` (mới), `src/app/manifest.ts` (mới), mỗi `page.tsx` (thêm `generateMetadata`), `src/lib/seo/*` (helper mới, ví dụ `jsonld.ts`), `public/*`.
- **Acceptance criteria:** Lighthouse SEO ≥ 95; `next build` sinh sitemap hợp lệ; Google Rich Results Test pass cho JSON-LD; mọi trang có canonical + `hreflang` VI/EN.
- **Risk/notes:** Cần `NEXT_PUBLIC_SITE_URL` chính thức (domain thật) trước khi set `metadataBase` production.

---

## Phase 6 — Supabase integration
- **Goal:** Kết nối dữ liệu thật cho Courses/Testimonials/FAQ/Contact form, thay placeholder tĩnh.
- **Tasks:** Chi tiết schema tại `docs/database/00-supabase-schema-plan.md`. Tóm tắt:
  1. Dùng Supabase MCP (read-only) để kiểm tra project hiện tại đã có bảng nào chưa (sau khi approve kết nối MCP).
  2. Đề xuất migration cho các bảng: `courses`, `course_categories`, `teacher_profile`, `testimonials`, `faqs`, `contact_submissions`, `site_settings`.
  3. Viết `src/lib/supabase/server.ts` (server client, dùng cho Server Components/Route Handlers) bên cạnh `client.ts` hiện có.
  4. Cập nhật `courses/page.tsx`, `about/page.tsx`, `contact/page.tsx` để fetch từ Supabase khi bảng đã sẵn sàng.
  5. RLS: public read cho content bảng công khai, insert-only (không read) cho `contact_submissions` từ client.
- **Files to touch:** `src/lib/supabase/server.ts` (mới), `src/app/[locale]/courses/page.tsx`, `about/page.tsx`, `contact/page.tsx`, migration SQL (đề xuất, chưa chạy).
- **Acceptance criteria:** Migration được review và approve bởi user trước khi apply; không có destructive query nào chạy tự động; contact form ghi được 1 record test.
- **Risk/notes:** **Không tự chạy migration.** MCP Supabase hiện "Pending approval" — cần user chạy `claude` để approve trước khi bất kỳ tool `mcp__supabase__*` nào dùng được.

---

## Phase 7 — Responsive / mobile acceptance
- **Goal:** Đảm bảo mobile hoàn chỉnh cho toàn bộ trang bắt buộc theo yêu cầu gốc.
- **Tasks:**
  1. Rà lại từng trang mobile (Home, Courses, About, Contact, Privacy, Terms, 404, Coming Soon) trên viewport 360–430px.
  2. Kiểm tra bottom nav không che nội dung cuối trang (đã có `.page-shell { padding-bottom: 96px }` — verify đủ với nội dung dài).
  3. Kiểm tra More bottom sheet: focus trap, đóng bằng tap ra ngoài (đã có), đóng bằng phím Esc (chưa có — bổ sung).
  4. Kiểm tra `FloatingContact` không đè lên bottom nav (hiện `bottom-28 md:bottom-6` — verify đúng).
  5. Kiểm tra tablet breakpoint (Home/Courses/About/Contact) theo yêu cầu riêng cho tablet.
- **Files to touch:** `src/components/layout/mobile-bottom-nav.tsx` (thêm Esc handler), CSS fine-tune rải rác.
- **Acceptance criteria:** Test tay bằng Chrome DevTools responsive mode ở 360px/768px/1024px/1440px cho mọi trang bắt buộc; không có overflow ngang; touch target ≥ 44px.
- **Risk/notes:** Đây là phase QA thủ công chủ yếu, ít rủi ro code.

---

## Phase 8 — QA / lint / typecheck / build
- **Goal:** Đảm bảo chất lượng code trước khi deploy.
- **Tasks:**
  1. `npm run lint`, `npm run typecheck`, `npm run build` phải pass sạch.
  2. Kiểm tra không có `console.log`/code chết còn sót.
  3. Kiểm tra a11y cơ bản: alt text, aria-label (đã có một số, ví dụ `aria-label="Ruby HSK home"`), contrast màu theo token dark/light.
- **Files to touch:** Tuỳ theo lỗi phát sinh.
- **Acceptance criteria:** 3 lệnh trên exit code 0; không warning nghiêm trọng.
- **Risk/notes:** Không có test runner trong stack hiện tại — nếu cần, đây là lúc quyết định có thêm Playwright/Vitest hay không (KHÔNG tự thêm library mới nếu user không yêu cầu, theo rule).

---

## Phase 9 — Vercel deployment
- **Goal:** Deploy production lên Vercel.
- **Tasks:** Chi tiết tại `docs/deploy/00-vercel-deployment-plan.md`. Tóm tắt:
  1. Kết nối repo GitHub với Vercel project.
  2. Khai báo env vars production: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
  3. Set custom domain, redirect `/` → locale mặc định (đã xử lý bằng middleware).
  4. Verify preview deployment trước khi promote production.
- **Files to touch:** Không có file code — chỉ Vercel dashboard/CLI config.
- **Acceptance criteria:** Preview URL hoạt động đúng cho cả 2 locale; production domain trả 200 cho `/`, `/vi`, `/en`.
- **Risk/notes:** Đây là hành động có ảnh hưởng hệ thống chia sẻ (deploy công khai) — **cần xác nhận user trước khi promote lên production domain thật**.

---

## Phase 10 — Post-deploy checklist
- **Goal:** Xác nhận production hoạt động đúng và SEO index được.
- **Tasks:**
  1. Submit sitemap lên Google Search Console cho cả domain (hoặc property riêng theo locale nếu cần).
  2. Kiểm tra Rich Results Test cho JSON-LD trên URL production thật.
  3. Chạy Lighthouse/PageSpeed Insights trên URL production (Core Web Vitals thật, không phải localhost).
  4. Kiểm tra `robots.txt`, `sitemap.xml` truy cập được qua domain thật.
  5. Theo dõi Vercel Analytics/Speed Insights (nếu bật) trong 1–2 tuần đầu.
- **Files to touch:** Không có.
- **Acceptance criteria:** Sitemap được Google chấp nhận không lỗi; không có trang nào bị `noindex` ngoài ý muốn.
- **Risk/notes:** Cần domain thật đã DNS trỏ đúng trước khi submit Search Console.

---

## Tổng hợp thứ tự thực thi khuyến nghị

```
Phase 0 (done) → Phase 1 → Phase 2 → Phase 3 → Phase 4 ⇄ Phase 6 (song song, Courses/About/Contact phụ thuộc cả 2)
              → Phase 5 (có thể làm song song với Phase 4 vì độc lập kỹ thuật)
              → Phase 7 → Phase 8 → Phase 9 → Phase 10
```

Mỗi phase cần user xác nhận "OK, tiến hành Phase N" trước khi bắt đầu code, theo đúng yêu cầu "Do not start implementation yet" ở tài liệu gốc.
