# i18n Rules

- Supported locales: `vi`, `en`. Default locale: `vi` (see `src/i18n/routing.ts`, `localePrefix: 'always'`).
- Use `next-intl` for all user-facing text (`useTranslations` in Client Components, `getTranslations` in Server Components).
- The VI/EN toggle (`LanguageToggle`) must **keep the current route** — use `router.replace(pathname, {locale})` from `@/i18n/navigation`, never redirect back to `/`.
- All end-user-facing content must go through a message key, **except** static brand text (e.g. "Ruby HSK", "HSK 1-6") which may be hardcoded.
- Message files: `src/messages/vi.json`, `src/messages/en.json` — organize keys by namespace/page (`Nav`, `Home`, `Courses`, `About`, `Contact`, `Legal`, `NotFound`, `ComingSoon`, ...).
- If `messages/` is ever relocated again, update the import in `src/i18n/request.ts` accordingly (it currently imports from `../messages/${locale}.json`, i.e. `src/messages/`).
- Do not hardcode Vietnamese strings in shared layout/section components (e.g. Footer/Courses have historically had some hardcoded strings — move these into message keys during refactors; see `docs/audit/00-current-state-audit.md` §2, finding #11).
