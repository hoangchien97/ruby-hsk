# i18n Rules

- Locale hỗ trợ: `vi`, `en`. Locale mặc định: `vi` (xem `src/i18n/routing.ts`, `localePrefix: 'always'`).
- Dùng `next-intl` cho toàn bộ text hiển thị (`useTranslations` ở Client Component, `getTranslations` ở Server Component).
- Toggle VI/EN (`LanguageToggle`) phải **giữ nguyên route hiện tại** — dùng `router.replace(pathname, {locale})` từ `@/i18n/navigation`, không redirect về `/`.
- Mọi content hiển thị cho end-user phải đi qua message key, **trừ** brand text tĩnh (ví dụ "Ruby HSK", "HSK 1-6") có thể hard-code.
- Message file: `src/messages/vi.json`, `src/messages/en.json` — tổ chức key theo namespace/page (`Nav`, `Home`, `Courses`, `About`, `Contact`, `Legal`, `NotFound`, `ComingSoon`...).
- Nếu di chuyển vị trí `messages/`, phải cập nhật import trong `src/i18n/request.ts` (hiện đang import `../messages/${locale}.json` — đã ở `src/messages/`, không phải root nữa).
- Không hard-code chuỗi tiếng Việt trong JSX của component layout/section dùng chung (ví dụ Footer/Courses hiện có một số chuỗi cứng — cần đưa vào message key khi refactor, xem `docs/audit/00-current-state-audit.md` mục 2, phát hiện #11).
