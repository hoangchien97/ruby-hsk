import { useTranslations } from 'next-intl';
import { SectionBadge } from '@/components/ui/section-badge';

const CONTACT_HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDhsU2Z3ybUP4TdNm9JnFlzTcGsHf7DoQsVJWScgcRrSJO9h9MOa2GEJLiGRQFfoQn6_6SpAAn0R9LfUGAPKhwLRhuwWpgTwMQJJAnSZjspImTnZeW50hOORglqUFMF09KQ5XfDapMHxjZ7KxUYaWxoPvQIpMFmfMw2JrX2LSuUQLDJpnL_9-t6F-koMB4D7697AwTv62gon7HQpiBc29xZWU-puSjVGAFYtgdrRHmjURqk_sn82kIK6brLc1ZQEdrRaY1NgNkBTy8';

export function ContactHeader() {
  const t = useTranslations('Contact');

  return (
    <>
      {/* ── Desktop: copy left, floating mascot right ────────────── */}
      <section className="app-section pb-0 hidden md:block">
        <div className="app-container relative z-10 grid md:grid-cols-2 items-center gap-12">
          {/* Left: copy */}
          <div>
            <SectionBadge className="mb-4">{t('consultationBadge')}</SectionBadge>
            <h1 className="text-headline-lg md:text-display-sm text-[var(--color-primary)] max-w-xl tracking-tight">
              {t('title')}
            </h1>
            <p className="mt-3 max-w-xl text-body-lg text-[var(--color-on-surface-variant)] leading-relaxed">
              {t('sub')}
            </p>
          </div>

          {/* Right: floating mascot */}
          <div className="relative flex justify-center lg:justify-end select-none group">
            <div className="absolute inset-0 bg-[var(--color-primary)]/20 rounded-full blur-3xl scale-125 -z-10 animate-pulse" />
            <img
              className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              alt="Ruby HSK Scholar Mascot"
              src={CONTACT_HERO_IMAGE}
            />
          </div>
        </div>
      </section>

      {/* ── Mobile: copy only ────────────────────────────────────── */}
      <section className="app-section pb-0 block md:hidden">
        <div className="app-container">
          <SectionBadge className="mb-4">{t('consultationBadge')}</SectionBadge>
          <h1 className="text-headline-lg font-bold text-[var(--color-primary)] tracking-tight leading-tight">
            {t('title')}
          </h1>
          <p className="mt-3 text-body-lg text-[var(--color-on-surface-variant)] leading-relaxed">
            {t('sub')}
          </p>
        </div>
      </section>
    </>
  );
}
