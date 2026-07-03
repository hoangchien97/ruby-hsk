'use client';

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(nextLocale: 'vi' | 'en') {
    router.replace(pathname, {locale: nextLocale});
  }

  return (
    <div className="inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-surface-glass)] p-1 text-xs font-bold">
      {(['vi', 'en'] as const).map((item) => (
        <button key={item} type="button" onClick={() => switchTo(item)} className={`rounded-full px-3 py-1.5 transition ${locale === item ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-primary)] hover:bg-[var(--color-peach)]'}`}>
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
