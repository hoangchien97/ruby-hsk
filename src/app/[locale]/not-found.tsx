'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { LogoIcon } from '@/components/logo/logo-icon';
import { Home, ArrowLeft, BookOpen, GraduationCap, X, HelpCircle, PenTool } from 'lucide-react';
import { useLocale } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NotFound');
  const tCommon = useTranslations('Common');

  return (
    <main className="flex-grow flex items-center justify-center relative px-4 md:px-12 overflow-hidden py-10 md:py-16">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-[var(--color-secondary-container)]/20 rounded-full blur-3xl opacity-60" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[var(--color-primary-container)]/10 rounded-full blur-3xl opacity-60" />

      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
        {/* Mascot Visual Section */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <div className="relative animate-bounce-slow">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-white border border-[var(--color-surface-variant)] shadow-[var(--shadow-card)] flex items-center justify-center p-6 overflow-hidden">
              <div className="relative">
                <LogoIcon className="w-48 h-48 md:w-56 md:h-56 drop-shadow-2xl" />

                {/* Broken Card Overlay */}
                <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-[var(--radius-xl)] shadow-[var(--shadow-card)] border border-[var(--color-surface-variant)] rotate-12 flex flex-col items-center gap-1">
                  <div className="flex gap-1 items-center">
                    <div className="w-10 h-14 bg-[var(--color-surface-container)] border-2 border-dashed border-[var(--color-surface-variant)] rounded-[var(--radius-md)] flex items-center justify-center">
                      <X className="w-5 h-5 text-[var(--color-primary)]" />
                    </div>
                    <div className="w-1 h-14 bg-[var(--color-surface-variant)]/30 rounded-full" />
                    <div className="w-10 h-14 bg-[var(--color-surface-container)] border-2 border-dashed border-[var(--color-surface-variant)] rounded-[var(--radius-md)] flex items-center justify-center">
                      <span className="text-[var(--color-primary)] font-bold text-label-sm">汉</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-[var(--color-on-surface-variant)] uppercase tracking-wider">
                    {t('brokenPath')}
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Floating Items */}
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-[var(--color-secondary-container)] rounded-full flex items-center justify-center shadow-[var(--shadow-soft)]">
              <HelpCircle className="w-6 h-6 text-[var(--color-on-secondary-container)]" />
            </div>
            <div className="absolute top-1/2 -right-8 w-14 h-14 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center shadow-[var(--shadow-soft)] border border-[var(--color-primary)]/20">
              <PenTool className="w-6 h-6 text-[var(--color-primary)]" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-grow text-center md:text-left">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold text-label-lg mb-6">
            {t('error404')}
          </span>
          <h1 className="text-display-lg md:text-[40px] leading-tight text-[var(--color-on-surface)] mb-4">
            {t('title')}
          </h1>
          <p className="text-body-lg text-[var(--color-on-surface-variant)] mb-8 max-w-md">
            {t('sub')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/">
              <Button className="w-full sm:w-auto inline-flex items-center justify-center gap-2">
                <Home className="w-4.5 h-4.5" /> {tCommon('backHome')}
              </Button>
            </Link>
            <Button
              variant="secondary"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4.5 h-4.5" /> {t('goBack')}
            </Button>
          </div>

          {/* Quick Access Links */}
          <div className="mt-10 grid grid-cols-2 gap-4">
            <Link
              href="/courses"
              className="p-4 glass-card rounded-[var(--radius-xl)] flex items-center gap-3 hover:bg-white transition-all group"
            >
              <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-secondary-container)]/20 flex items-center justify-center text-[var(--color-secondary-container)] group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              <span className="text-label-sm font-bold text-[var(--color-on-surface)]">
                {t('coursesVocab')}
              </span>
            </Link>
            <Link
              href="/about"
              className="p-4 glass-card rounded-[var(--radius-xl)] flex items-center gap-3 hover:bg-white transition-all group"
            >
              <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-primary-container)]/20 flex items-center justify-center text-[var(--color-primary)] group-hover:scale-110 transition-transform">
                <GraduationCap className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              <span className="text-label-sm font-bold text-[var(--color-on-surface)]">
                {t('aboutTeacher')}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
