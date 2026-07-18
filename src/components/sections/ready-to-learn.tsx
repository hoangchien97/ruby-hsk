'use client';

import { useTranslations } from 'next-intl';
import { Gem } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export function ReadyToLearn() {
  const t = useTranslations('ReadyToLearn');

  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-br from-[var(--color-surface-container-low)] via-[var(--color-bg)] to-[var(--color-primary-fixed)]/10">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div
          className="relative bg-white dark:bg-[var(--color-surface-container-low)] rounded-3xl p-6 py-12 md:p-16 text-center shadow-[0_20px_50px_-12px_rgba(181,35,48,0.12)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border border-[var(--color-outline-variant)] dark:border-[var(--color-primary)]/20 transition-all duration-300"
        >
          {/* Floating Diamond Badge */}
          <div
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-white dark:bg-[var(--color-surface-container-low)] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(181,35,48,0.12)] border border-[var(--color-outline-variant)] dark:border-[var(--color-primary)]/30"
          >
            <div className="w-14 h-14 bg-[var(--color-primary-fixed)] dark:bg-[var(--color-primary)]/20 rounded-full flex items-center justify-center">
              <Gem className="text-[var(--color-primary)] w-7 h-7 fill-[var(--color-primary)]" />
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-[2.25rem] font-bold text-[var(--color-on-background)] mt-4 mb-6 leading-tight tracking-tight">
            {t('title')}
          </h2>
          <p className="text-base md:text-lg text-[var(--color-on-surface-variant)] mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('desc')}
          </p>

          {/* CTAs — using Button component, same style as hero */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                className="w-full rounded-full h-12 md:h-14 px-6 md:px-8 text-[13px] md:text-base font-bold
                                    bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20
                                    hover:scale-105 transition-transform"
              >
                {t('btnRegister')}
              </Button>
            </Link>
            <Link href="/about" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                className="w-full rounded-full h-12 md:h-14 px-6 md:px-8 text-[13px] md:text-base font-bold transition-colors"
              >
                {t('btnMore')}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Glowing effect backgrounds */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary)] opacity-[0.07] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-secondary)] opacity-[0.07] rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
