'use client';

import { BookOpen, Home, Info, Mail, MoreHorizontal, ShieldCheck, FileText, Phone, Sparkles } from 'lucide-react';
import { useId, useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { LanguageToggle } from '@/components/layout/language-toggle';
import { Contact } from '@/lib/constants/site';

export function MobileBottomNav() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const locale = useLocale() as 'vi' | 'en';
  const sheetId = useId();

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Base navigation items for bottom bar
  const navItems = [
    { href: '/', label: t('home'), icon: Home },
    { href: '/courses', label: t('courses'), icon: BookOpen },
    { href: '/about', label: t('about'), icon: Info },
    { href: '/contact', label: t('contact'), icon: Mail }
  ];

  // Grid navigation links inside the drawer
  const drawerLinks = [
    { href: '/', label: t('home'), icon: Home },
    { href: '/courses', label: t('courses'), icon: BookOpen },
    { href: '/about', label: t('about'), icon: Info },
    { href: '/contact', label: t('contact'), icon: Mail },
    { href: '/privacy', label: t('privacy'), icon: ShieldCheck },
    { href: '/terms', label: t('terms'), icon: FileText }
  ];

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-50 min-h-16 bg-[var(--color-surface)] shadow-[0_-4px_10px_rgba(181,35,48,0.1)] rounded-t-[var(--radius-2xl)] md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="flex h-16 items-center justify-around px-2">
          {navItems.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-[var(--radius-xl)] px-3 py-1.5 text-label-sm font-bold transition-all ${active
                  ? 'bg-[var(--color-primary-container)]/20 !text-[var(--color-primary)] border border-[var(--color-primary)]/30'
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
            aria-expanded={open}
            aria-controls={sheetId}
            className="flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-[var(--radius-xl)] px-3 py-1.5 text-label-sm font-bold text-[var(--color-on-surface-variant)]"
          >
            <MoreHorizontal className="h-5 w-5" />
            {t('more')}
          </button>
        </div>
      </nav>

      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm transition-opacity duration-300 md:hidden ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Bottom Sheet Drawer */}
      <div
        id={sheetId}
        role="dialog"
        aria-modal="true"
        aria-label={t('more')}
        className={`fixed inset-x-0 bottom-0 z-[70] md:hidden transition-transform duration-300 ease-out transform ${open ? 'translate-y-0' : 'translate-y-full'
          }`}
      >
        {/* Pull Handle */}
        <button
          type="button"
          className="flex w-full justify-center py-3 cursor-pointer"
          onClick={() => setOpen(false)}
          aria-label={t('more')}
        >
          <span className="w-12 h-2 bg-[var(--color-outline-variant)]/40 rounded-full" />
        </button>

        {/* Sheet Content */}
        <div
          className="bg-[var(--color-bg)] rounded-t-[var(--radius-3xl)] border-t border-x border-[var(--color-surface-variant)] px-6 pt-2 shadow-[var(--shadow-soft)] max-h-[85vh] overflow-y-auto"
          style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
        >
          {/* Section: Navigation */}
          <div className="mb-6">
            <h3 className="text-label-lg font-bold text-[var(--color-on-surface-variant)] uppercase tracking-widest mb-3 ml-2">
              {t('navigation')}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {drawerLinks.map((link) => {
                const Icon = link.icon;
                const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-10 items-center gap-2 p-2.5 rounded-[var(--radius-xl)] border transition-all drawer-link-animated ${isActive
                      ? 'border-[var(--color-primary)]/30 text-[var(--color-primary)] bg-[var(--color-primary-container)]/20 active'
                      : 'border-[var(--color-outline-variant)]/10 text-[var(--color-on-surface)] bg-[var(--color-surface-container-low)] hover:bg-[var(--color-surface-container)]'
                      }`}
                  >
                    <div className={`p-1.5 rounded-[var(--radius-md)] flex items-center justify-center ${isActive ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)]'
                      }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className={`text-label-lg ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-on-surface)]'}`}>
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Section: Display settings */}
          <div className="mb-6">
            <h3 className="text-label-lg font-bold text-[var(--color-on-surface-variant)] uppercase tracking-widest mb-3 ml-2">
              {t('displaySettings')}
            </h3>
            <div className="bg-[var(--color-surface-container-lowest)] rounded-[var(--radius-3xl)] border border-[var(--color-surface-variant)] p-4 shadow-[var(--shadow-soft)] space-y-4">
              {/* Language Switch */}
              <div className="flex items-center justify-between">
                <span className="text-label-lg text-[var(--color-on-surface)]">
                  {t('language')}
                </span>
                <LanguageToggle />
              </div>

              <div className="h-px bg-[var(--color-surface-variant)]/50" />

              {/* Theme Toggle (Switch Style) */}
              <div className="flex items-center justify-between">
                <span className="text-label-lg text-[var(--color-on-surface)]">
                  {t('darkMode')}
                </span>
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Section: Student support */}
          <div className="mb-6">
            <h3 className="text-label-lg font-bold text-[var(--color-on-surface-variant)] uppercase tracking-widest mb-3 ml-2">
              {t('studentSupport')}
            </h3>
            <div className="flex justify-between gap-2">
              <a
                href={Contact.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex flex-col items-center justify-center min-h-10 p-3 rounded-[var(--radius-2xl)] border border-[var(--color-surface-variant)] bg-[var(--color-surface-container-lowest)] shadow-[var(--shadow-soft)] active:scale-95 transition-all text-center"
              >
                <div className="w-10 h-10 rounded-full bg-[#0068FF]/10 flex items-center justify-center mb-1.5">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
                    alt="Zalo"
                    className="w-5 h-5 object-contain"
                  />
                </div>
                <span className="text-label-sm font-bold text-[var(--color-on-surface)]">{t('zalo')}</span>
              </a>
              <a
                href={`https://m.me/rubyhsk`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex flex-col items-center justify-center min-h-10 p-3 rounded-[var(--radius-2xl)] border border-[var(--color-surface-variant)] bg-[var(--color-surface-container-lowest)] shadow-[var(--shadow-soft)] active:scale-95 transition-all text-center"
              >
                <div className="w-10 h-10 rounded-full bg-[#00B2FF]/10 flex items-center justify-center mb-1.5">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"
                    alt="Messenger"
                    className="w-5 h-5 object-contain"
                  />
                </div>
                <span className="text-label-sm font-bold text-[var(--color-on-surface)]">{t('messenger')}</span>
              </a>
              <a
                href={`tel:${Contact.phoneTel}`}
                className="flex-1 flex flex-col items-center justify-center min-h-10 p-3 rounded-[var(--radius-2xl)] border border-[var(--color-surface-variant)] bg-[var(--color-surface-container-lowest)] shadow-[var(--shadow-soft)] active:scale-95 transition-all text-center"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-1.5">
                  <Phone className="h-5 w-5 text-[var(--color-primary)]" />
                </div>
                <span className="text-label-sm font-bold text-[var(--color-on-surface)]">{t('consultation')}</span>
              </a>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--color-surface-container-low)] shadow-[var(--shadow-soft)] border border-[var(--color-surface-variant)] text-[var(--color-on-surface-variant)]">
              <Sparkles className="h-4 w-4 fill-current text-[var(--color-on-surface-variant)]" />
              <span className="text-body-md font-semibold italic">{t('quote')}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
