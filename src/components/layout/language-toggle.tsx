'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export function LanguageToggle() {
  const locale = useLocale() as 'vi' | 'en';
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(nextLocale: 'vi' | 'en') {
    if (nextLocale === locale) return;
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div className="inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-surface-glass)] p-1 text-xs font-bold shadow-sm">
      {(['vi', 'en'] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => switchTo(item)}
          className={`rounded-full px-3 py-1.5 transition ${locale === item
            ? 'bg-[var(--color-primary)] text-white'
            : 'text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10'
            }`}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
