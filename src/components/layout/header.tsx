'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { LogoIcon } from '@/components/logo/logo-icon';
import { LanguageToggle } from './language-toggle';
import { ThemeToggle } from './theme-toggle';
import { NavLinks } from '@/lib/constants/site';

/**
 * Header — Stitch spec:
 *   - Sticky top-0, full width, glass-nav (ivory/85% + blur)
 *   - Logo icon-only + horizontal nav (hidden on mobile)
 *   - Language toggle + Theme toggle + CTA "Bắt đầu học"
 *   - Active link: coral underline border-b-2
 */
export function Header() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const nav = [
    { href: NavLinks.home, label: t('home') },
    { href: NavLinks.courses, label: t('courses') },
    { href: NavLinks.about, label: t('about') },
    { href: NavLinks.contact, label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-surface-variant)] bg-[var(--color-surface-glass)] shadow-[var(--shadow-soft)] backdrop-blur-md">
      <div className="app-container flex h-16 md:h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="Ruby HSK home" className="shrink-0">
          <LogoIcon className="h-12 w-12 transition-transform hover:rotate-6" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-label-lg font-bold transition-colors py-1 nav-link-animated ${isActive
                  ? 'text-[var(--color-primary)] active'
                  : 'text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)]'
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Language toggle — pill style */}
          <LanguageToggle />

          {/* Theme toggle */}
          <ThemeToggle />

          {/* CTA button — hidden on mobile (bottom nav handles it) */}
          {/* <Link href={NavLinks.contact} className="hidden md:inline-flex">
            <Button size="md">{t('start')}</Button>
          </Link> */}
        </div>
      </div>
    </header>
  );
}
