'use client';

import { BookOpen, Home, Info, Mail, MoreHorizontal, ShieldCheck, FileText, Phone, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { LanguageToggle } from '@/components/layout/language-toggle';
import { Contact } from '@/lib/constants/site';

export function MobileBottomNav() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const locale = useLocale() as 'vi' | 'en';

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
      {/* Bottom Nav Bar */}
      <nav
        className="fixed inset-x-0 bottom-0 z-50 h-16 bg-[var(--color-surface)] shadow-[0_-4px_10px_rgba(181,35,48,0.1)] md:hidden"
        style={{ borderTopLeftRadius: '1.25rem', borderTopRightRadius: '1.25rem' }}
      >
        <div className="flex h-full items-center justify-around px-2">
          {navItems.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-0.5 rounded-[var(--radius-xl)] px-3 py-1.5 text-[10px] font-bold transition-all ${active
                  ? 'bg-[var(--color-primary-container)]/20 text-[var(--color-on-surface-variant)]'
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
            className="flex flex-col items-center justify-center gap-0.5 rounded-[var(--radius-xl)] px-3 py-1.5 text-[10px] font-bold text-[var(--color-on-surface-variant)]"
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
      />

      {/* Bottom Sheet Drawer */}
      <div
        className={`fixed inset-x-0 bottom-0 z-[70] md:hidden transition-transform duration-300 ease-out transform ${open ? 'translate-y-0' : 'translate-y-full'
          }`}
      >
        {/* Pull Handle */}
        <div className="flex justify-center mb-2" onClick={() => setOpen(false)}>
          <div className="w-12 h-1.5 bg-[var(--color-outline-variant)]/40 rounded-full cursor-pointer" />
        </div>

        {/* Sheet Content */}
        <div className="bg-[var(--color-bg)] rounded-t-[2.5rem] border-t border-x border-[var(--color-surface-variant)] px-6 pt-6 pb-6 shadow-2xl max-h-[85vh] overflow-y-auto">
          {/* Section: Điều hướng (Navigation) */}
          <div className="mb-6">
            <h3 className="text-label-lg font-bold text-[var(--color-on-surface-variant)] uppercase tracking-widest mb-3 ml-2">
              {t('navigation')}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {drawerLinks.map((link) => {
                const Icon = link.icon;
                const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 p-4 rounded-2xl border transition-all drawer-link-animated ${isActive
                      ? 'border-[var(--color-primary)]/30 text-[var(--color-primary)] bg-[var(--color-primary-container)]/5 active'
                      : 'border-[var(--color-outline-variant)]/10 text-[var(--color-on-surface)] bg-[var(--color-surface-container-low)] hover:bg-[var(--color-surface-container)]'
                      }`}
                  >
                    <div className={`p-2 rounded-xl flex items-center justify-center ${isActive ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'bg-gray-100 dark:bg-gray-800 text-[var(--color-on-surface-variant)]'
                      }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`text-[15px] font-bold ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-on-surface)]'}`}>
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Section: Cài đặt hiển thị */}
          <div className="mb-6">
            <h3 className="text-label-lg font-bold text-[var(--color-on-surface-variant)] uppercase tracking-widest mb-3 ml-2">
              {t('displaySettings')}
            </h3>
            <div className="bg-[var(--color-surface-container-lowest)] rounded-3xl border border-[var(--color-surface-variant)] p-4 shadow-sm space-y-4">
              {/* Language Switch */}
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[14px] text-[var(--color-on-surface)]">
                  {t('language')}
                </span>
                <div className="scale-90 origin-right">
                  <LanguageToggle />
                </div>
              </div>

              <div className="h-px bg-[var(--color-surface-variant)]/50" />

              {/* Theme Toggle (Switch Style) */}
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[14px] text-[var(--color-on-surface)]">
                  {t('darkMode')}
                </span>
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Section: Hỗ trợ học viên */}
          <div className="mb-6">
            <h3 className="text-label-lg font-bold text-[var(--color-on-surface-variant)] uppercase tracking-widest mb-3 ml-2">
              {t('studentSupport')}
            </h3>
            <div className="flex gap-3">
              <a
                href={Contact.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex flex-col items-center justify-center p-3 rounded-2xl bg-[var(--color-surface-container-lowest)] border border-[var(--color-surface-variant)] shadow-sm active:scale-95 transition-transform"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0068FF]/10 flex items-center justify-center mb-2">
                  <svg viewBox="0 0 460.1 460.1" className="w-5 h-5" fill="#0068FF"><path d="M57.1 270.3C18.6 230.9 0 186.2 0 136.3 0 61.1 82.2 0 183.5 0c101.4 0 183.6 61.1 183.6 136.3 0 75.3-82.2 136.3-183.6 136.3-11.8 0-23.4-1.1-34.7-3.1L57.1 270.3z" /><path fill="#fff" d="M124.9 95.8c-3.1 0-5.7 2.6-5.7 5.7v35.8H91c-3.1 0-5.7 2.6-5.7 5.7v18.7c0 3.1 2.6 5.7 5.7 5.7h28.2v18.4c0 3.1 2.6 5.7 5.7 5.7h18.8c3.1 0 5.7-2.6 5.7-5.7v-18.4h26.7v18.4c0 3.1 2.6 5.7 5.7 5.7h18.8c3.1 0 5.7-2.6 5.7-5.7v-18.4h37.4v-18.7c0-3.1-2.6-5.7-5.7-5.7h-37.4V95.8H124.9zm67.1 35.8v18.7h-37.4v-18.7h37.4z" /></svg>
                </div>
                <span className="text-[12px] font-bold text-[var(--color-on-surface)]">{t('zalo')}</span>
              </a>
              <a
                href={`https://m.me/rubyhsk`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex flex-col items-center justify-center p-3 rounded-2xl bg-[var(--color-surface-container-lowest)] border border-[var(--color-surface-variant)] shadow-sm active:scale-95 transition-transform"
              >
                <div className="w-10 h-10 rounded-xl bg-[#00B2FF]/10 flex items-center justify-center mb-2">
                  <svg viewBox="0 0 128 128" className="w-5 h-5 fill-[#00B2FF]"><path d="M64 12C34.42 12 10.43 33.82 10.43 60.74c0 15.22 8.04 28.84 20.65 37.89-.3.92-.85 2.62-1.92 5.39-.77 1.99-2.06 4.88-3.92 8.76-1.57 3.28-1.02 5.06-1.02 5.06s1.61.9 4.89.9c2.81 0 6.64-1.03 11.51-3.08 4.67-1.97 7.78-3.41 9.94-4.5 4.35 1.13 8.94 1.74 13.72 1.74 29.58 0 53.57-21.82 53.57-48.74S93.58 12 64 12zm8.01 49.33-11.75 12.56-11.39-11.96-22.18 11.96 24.36-25.96 11.96-12.82 11.18 11.75 22.38-11.75-24.56 26.22z" /></svg>
                </div>
                <span className="text-[12px] font-bold text-[var(--color-on-surface)]">{t('messenger')}</span>
              </a>
              <a
                href={`tel:${Contact.phoneTel}`}
                className="flex-1 flex flex-col items-center justify-center p-3 rounded-2xl bg-[var(--color-surface-container-lowest)] border border-[var(--color-surface-variant)] shadow-sm active:scale-95 transition-transform"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-2">
                  <Phone className="h-5 w-5 text-[var(--color-primary)]" />
                </div>
                <span className="text-[12px] font-bold text-[var(--color-on-surface)]">{t('consultation')}</span>
              </a>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--color-surface-container-low)] shadow-sm border border-[var(--color-surface-variant)] text-[#6d4c41]">
              <Sparkles className="h-4 w-4 fill-current text-[#6d4c41]" />
              <span className="font-semibold text-[15px] italic">Càng học càng thông tuệ</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
