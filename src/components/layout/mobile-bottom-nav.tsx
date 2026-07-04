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
            <div className="flex justify-between gap-3">
              <a
                href={Contact.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex flex-col items-center justify-center p-4 rounded-3xl shadow-sm border-0 active:scale-95 transition-all text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#0068FF]/10 flex items-center justify-center mb-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
                    alt="Zalo"
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <span className="text-[13px] font-bold text-[var(--color-on-surface)]">{t('zalo')}</span>
              </a>
              <a
                href={`https://m.me/rubyhsk`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex flex-col items-center justify-center p-4 rounded-3xl shadow-sm border-0 active:scale-95 transition-all text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#00B2FF]/10 flex items-center justify-center mb-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"
                    alt="Messenger"
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <span className="text-[13px] font-bold text-[var(--color-on-surface)]">{t('messenger')}</span>
              </a>
              <a
                href={`tel:${Contact.phoneTel}`}
                className="flex-1 flex flex-col items-center justify-center p-4 rounded-3xl shadow-sm border-0 active:scale-95 transition-all text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-2">
                  <Phone className="h-6 w-6 text-[var(--color-primary)]" />
                </div>
                <span className="text-[13px] font-bold text-[var(--color-on-surface)]">{t('consultation')}</span>
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
