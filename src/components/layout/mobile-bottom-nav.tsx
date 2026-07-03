'use client';

import { BookOpen, Home, Info, Mail, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { LanguageToggle } from './language-toggle';
import { ThemeToggle } from './theme-toggle';

export function MobileBottomNav() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = [
    { href: '/', label: t('home'), icon: Home },
    { href: '/courses', label: t('courses'), icon: BookOpen },
    { href: '/about', label: t('about'), icon: Info },
    { href: '/contact', label: t('contact'), icon: Mail }
  ];

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-50 h-16 bg-[var(--color-surface)] shadow-[0_-4px_10px_rgba(181,35,48,0.1)] md:hidden"
        style={{ borderTopLeftRadius: '1.25rem', borderTopRightRadius: '1.25rem' }}
      >
        <div className="flex h-full items-center justify-around px-4">
          {items.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-0.5 rounded-[var(--radius-xl)] px-4 py-1 text-[10px] font-bold transition-all ${active
                    ? 'bg-[var(--color-primary-container)]/20 text-[var(--color-primary)]'
                    : 'text-[var(--color-on-surface-variant)]'
                  }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex flex-col items-center justify-center gap-0.5 rounded-[var(--radius-xl)] px-4 py-1 text-[10px] font-bold text-[var(--color-on-surface-variant)]"
          >
            <MoreHorizontal className="h-5 w-5" />
            {t('more')}
          </button>
        </div>
      </nav>
      {open && <div className="fixed inset-0 z-[60] bg-black/30 md:hidden" onClick={() => setOpen(false)}>
        <div className="absolute inset-x-0 bottom-0 rounded-t-[2rem] border border-[var(--color-border)] bg-[var(--color-bg)] p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[var(--color-border)]" />
          <div className="grid gap-2 text-sm font-bold text-[var(--color-title)]">
            <Link href="/privacy" onClick={() => setOpen(false)}>{t('privacy')}</Link>
            <Link href="/terms" onClick={() => setOpen(false)}>{t('terms')}</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>{t('start')}</Link>
          </div>
          <div className="mt-5 flex items-center justify-between"><LanguageToggle /><ThemeToggle /></div>
        </div>
      </div>}
    </>
  );
}
