'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LogoIcon } from '@/components/logo/logo-icon';
import { Link } from '@/i18n/navigation';
import { Stats } from '@/lib/constants/site';

interface HomeHeroProps {
  locale?: string;
}

export function HomeHero({ locale = 'vi' }: HomeHeroProps) {
  const t = useTranslations('Home');
  const isVi = locale === 'vi';

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-16 pb-32">
        <div className="container grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Left: Copy */}
          <div className="z-10">
            <Badge variant="secondary" className="mb-4">
              {isVi ? '✨ Chào mừng bạn đến với Ruby HSK' : '✨ Welcome to Ruby HSK'}
            </Badge>

            <h1 className="mt-4 text-[2.5rem] font-bold leading-tight text-[var(--color-on-background)] md:text-[3rem]">
              {t('title')}
              <br />
              <span className="italic text-[var(--color-primary)]">{t('subtitle')}</span>
            </h1>

            <p className="mt-5 max-w-lg text-body-lg text-[var(--color-on-surface-variant)]">
              {t('sub')}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg">
                  {isVi ? 'Bắt đầu học ngay' : 'Start learning'}
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="secondary" size="lg">
                  {isVi ? 'Lộ trình học tập' : 'Learning roadmap'}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Mascot */}
          <div className="relative">
            {/* Decorative blurs */}
            <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-[var(--color-secondary-fixed)] opacity-20 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 h-80 w-80 rounded-full bg-[var(--color-primary-fixed)] opacity-30 blur-3xl" />

            {/* Mascot container */}
            <div className="relative z-10 flex justify-center">
              <div className="relative">
                <LogoIcon className="animate-bounce-slow h-56 w-56 md:h-72 md:w-72 drop-shadow-2xl" />
                <span className="absolute left-0 top-4 rounded-full bg-white px-4 py-2 text-xl font-black text-[var(--color-primary)] shadow-md">
                  你好
                </span>
                <span className="absolute bottom-4 right-0 rounded-full bg-white px-4 py-2 text-base font-black text-[var(--color-primary)] shadow-md">
                  HSK 6
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Stats bar — floats below hero ── */}
      <TrustStats locale={locale} />
    </>
  );
}

function TrustStats({ locale }: { locale: string }) {
  const isVi = locale === 'vi';
  return (
    <section className="container relative -mt-16 z-20 rounded-[var(--radius-3xl)] border border-[var(--color-surface-variant)] bg-[var(--color-surface-container-low)] py-4 shadow-sm">
      <div className="grid grid-cols-2 text-center md:grid-cols-4">
        {Stats.map((stat, i) => (
          <div
            key={stat.value}
            className={`p-4 ${i > 0 ? 'border-l border-[var(--color-surface-variant)]' : ''}`}
          >
            <div className="text-display-lg text-[var(--color-primary)] font-bold">
              {stat.value}
            </div>
            <div className="mt-1 text-label-lg text-[var(--color-on-surface-variant)]">
              {isVi ? stat.labelVi : stat.labelEn}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
