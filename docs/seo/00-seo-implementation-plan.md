# 00 — Kế hoạch triển khai SEO cho Ruby HSK Landing

> Hiện trạng: site chỉ có 1 `metadata` tĩnh dùng chung cho mọi trang tại `src/app/[locale]/layout.tsx`.
> Chưa có `sitemap.ts`, `robots.ts`, `manifest.ts`, chưa có JSON-LD, chưa có `public/` assets.

## 1. `metadataBase` và title template

```ts
// src/app/[locale]/layout.tsx (định hướng, chưa áp dụng)
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Ruby HSK - Học tiếng Trung & luyện thi HSK',
    template: '%s | Ruby HSK'
  }
};
```

- `NEXT_PUBLIC_SITE_URL` phải là domain thật khi lên production (Phase 9), không để `localhost` lọt vào build production.

## 2. Metadata theo từng trang (`generateMetadata`)

Mỗi route trong `src/app/[locale]/*/page.tsx` cần `generateMetadata` riêng (hiện tại **không có route nào có**), tối thiểu gồm: `title`, `description`, `alternates.canonical`, `alternates.languages` (vi/en), `openGraph`, `twitter`.

| Route | Title đề xuất (VI) | Từ khoá chính |
|---|---|---|
| `/[locale]` | Ruby HSK – Học tiếng Trung & luyện thi HSK cùng cô Trần Hồng Ngọc | học tiếng Trung, trung tâm tiếng Trung |
| `/[locale]/courses` | Khóa học tiếng Trung & luyện thi HSK 1-6 | khóa học HSK, luyện thi HSK |
| `/[locale]/about` | Về Ruby HSK – Giáo viên Trần Hồng Ngọc | trung tâm tiếng Trung, giáo viên tiếng Trung |
| `/[locale]/contact` | Liên hệ tư vấn khóa học tiếng Trung | tư vấn học tiếng Trung |
| `/[locale]/privacy` | Chính sách bảo mật | (không cần tối ưu từ khoá, `noindex` có thể xem xét nếu nội dung mỏng) |
| `/[locale]/terms` | Điều khoản sử dụng | (tương tự) |
| `/[locale]/coming-soon` | Sắp ra mắt | (nên `noindex` — trang tạm) |

### Ví dụ pattern chuẩn cho 1 route

```ts
export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Courses'});
  const path = '/courses';
  return {
    title: t('title'),
    description: t('sub'),
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {vi: `/vi${path}`, en: `/en${path}`}
    },
    openGraph: {title: t('title'), description: t('sub'), url: `/${locale}${path}`, locale, type: 'website'},
    twitter: {card: 'summary_large_image', title: t('title'), description: t('sub')}
  };
}
```

Áp dụng pattern tương tự cho từng route ở Phase 5.

## 3. `sitemap.ts` (mới — `src/app/sitemap.ts`)

- Liệt kê toàn bộ route công khai × 2 locale (`vi`, `en`).
- Không đưa `coming-soon` vào sitemap (trang tạm), không đưa 404.
- Dùng `routing.locales` từ `src/i18n/routing.ts` để tránh lặp danh sách locale.
- `lastModified` lấy từ thời điểm build hoặc từ `site_settings`/CMS nếu có sau này (Phase 6).

## 4. `robots.ts` (mới — `src/app/robots.ts`)

- Allow toàn bộ, disallow `/api/*` nếu sau này có route handler nội bộ.
- Trỏ `sitemap: `${siteUrl}/sitemap.xml``.

## 5. `manifest.ts` (mới — `src/app/manifest.ts`)

- `name`/`short_name`: "Ruby HSK".
- `theme_color`: `#804237` (light) — cân nhắc `#191211` cho dark nếu hỗ trợ `manifest` theo theme.
- Icons: cần asset thật từ Stitch (Phase 2) trước khi hoàn thiện — hiện chưa có `public/`.

## 6. JSON-LD

Thêm helper `src/lib/seo/jsonld.ts` sinh các schema sau, nhúng qua `<script type="application/ld+json">` trong từng layout/page:

| Schema | Vị trí nhúng | Nội dung chính |
|---|---|---|
| `Organization` | `[locale]/layout.tsx` (toàn site) | name, url, logo, sameAs (Zalo/Facebook khi có) |
| `EducationalOrganization` (mở rộng `LocalBusiness`) | Home hoặc About | name, address (nếu có địa chỉ vật lý), teacher (`employee` → `Person` cho cô Trần Hồng Ngọc) |
| `Course` | Mỗi item trong Courses (per-course, lý tưởng là khi có bảng `courses` ở Supabase — Phase 6) | name, description, provider (Organization), hasCourseInstance nếu có lịch khai giảng |
| `FAQPage` | Home (section FAQ hiện chưa có UI — cần bổ sung ở Phase 4) hoặc Courses | Q&A thật, không placeholder |
| `BreadcrumbList` | Mọi trang con (Courses, About, Contact, Privacy, Terms) | Home > Trang hiện tại |

Không nhúng `Course`/`FAQPage` với dữ liệu giả — chỉ nhúng khi nội dung thật đã có (tránh vi phạm Google structured data guideline về nội dung không khớp trang).

## 7. Chiến lược nội dung SEO theo từ khoá

| Từ khoá mục tiêu | Trang chính | Gợi ý xử lý on-page |
|---|---|---|
| học tiếng Trung | Home | H1 chứa cụm từ tự nhiên, không nhồi từ khoá |
| luyện thi HSK | Courses | Title + H1 + mô tả từng cấp độ HSK 1-6 |
| khóa học HSK | Courses | Mỗi course card có URL/slug riêng nếu có trang chi tiết sau này (`/courses/[slug]`) |
| tiếng Trung giao tiếp | Home (feature "Giao tiếp") + Courses (nếu có khoá riêng) | Nội dung mô tả rõ tình huống giao tiếp thực tế |
| học tiếng Trung cho người mới bắt đầu | Courses (khoá Sơ Cấp) | Nhấn "cho người mới bắt đầu" trong description khoá Sơ Cấp |
| trung tâm tiếng Trung | About, Home footer | Nhấn thương hiệu "Ruby HSK" + địa bàn hoạt động (cần thông tin thật) |

Nguyên tắc: viết nội dung tự nhiên cho người đọc trước, từ khoá chỉ xuất hiện tự nhiên trong H1/description/alt text — không nhồi từ khoá (keyword stuffing).

## 8. Alt text strategy

- Mọi `<Image>`/icon có ý nghĩa nội dung (không phải decorative) phải có `alt` mô tả đúng nội dung + có thể chứa từ khoá tự nhiên (ví dụ ảnh giáo viên: `alt="Cô Trần Hồng Ngọc giảng dạy tiếng Trung tại Ruby HSK"`).
- Icon thuần trang trí (lucide-react trong button) giữ `aria-hidden` hoặc không cần alt vì đã có `aria-label` ở phần tử cha (đã áp dụng đúng ở `ThemeToggle`, `FloatingContact`).
- `LogoIcon` hiện có `aria-label="Ruby HSK logo"` + `<span className="sr-only">Ruby HSK</span>` — giữ nguyên pattern này cho mọi icon-only component.

## 9. Internal linking strategy

- Header/Footer/MobileNav đã link đầy đủ giữa Home/Courses/About/Contact/Privacy/Terms — giữ nguyên.
- Bổ sung: Home → Courses (đã có qua Button "Xem khóa học"), Courses → About (nên thêm CTA "Tìm hiểu giáo viên"), About → Contact (đã có "Nhận tư vấn lộ trình" nhưng chưa link — cần bọc `Link` quanh Button đó, hiện tại chỉ là `<Button>` không có `href`).
- Khi có trang chi tiết khoá học riêng (`/courses/[slug]`) ở giai đoạn sau, thêm breadcrumb + link ngược về `/courses`.

## 10. Performance / Core Web Vitals checklist

| Mục | Hiện trạng | Việc cần làm |
|---|---|---|
| Font loading | `next/font/google` (Noto_Sans) với `display: swap` | Đã tối ưu đúng cách, giữ nguyên |
| Images | `next.config.ts` cho phép `remotePatterns` toàn `https://**` | Khi có ảnh thật, ưu tiên `next/image` với `sizes`/`priority` cho ảnh above-the-fold (hero) |
| CLS | Chưa có ảnh thật nên chưa đo được | Đặt `width`/`height` hoặc `fill` + container tỉ lệ cố định khi thêm ảnh |
| LCP | Hero section dùng gradient + icon, không có ảnh nặng | Giữ nguyên nhẹ; nếu thêm ảnh giáo viên/khoá học, dùng `priority` cho ảnh hero |
| JS bundle | Toàn bộ page hiện là Server Component trừ phần `'use client'` (ThemeToggle, LanguageToggle, MobileBottomNav, AppProviders) | Giữ nguyên tinh thần "client component tối thiểu" |
| Turbopack dev | Đã dùng `next dev --turbopack` | Không cần đổi |

## 11. Việc cần làm trước khi Phase 5 code

- [ ] Có domain thật để set `NEXT_PUBLIC_SITE_URL` production.
- [ ] Có nội dung FAQ thật (hiện chưa có section FAQ nào trên UI) trước khi nhúng `FAQPage` schema.
- [ ] Có ảnh/logo chính thức (Phase 2, từ Stitch) trước khi tạo `manifest.ts` icons và OG default image.
