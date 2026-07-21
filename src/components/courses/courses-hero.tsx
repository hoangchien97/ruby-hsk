'use client';

import { useTranslations } from 'next-intl';
import { SectionBadge } from '@/components/ui/section-badge';
import { AVATARS, FALLBACK_COVER } from './course-constants';
import { motion } from 'framer-motion';

// ── Courses hero text animation variants ──────────────────────────
const heroTextVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export function CoursesHero() {
  const t = useTranslations('Courses');

  return (
    <>
      {/* ── Desktop Hero ─────────────────────────────────────── */}
      <section className="app-section hidden md:block relative overflow-hidden">
        <div className="app-container relative z-10 grid md:grid-cols-2 items-center gap-12">
          {/* Left: staggered entrance */}
          <div>
            <motion.div
              custom={0}
              variants={heroTextVariants}
              initial="hidden"
              animate="visible"
            >
              <SectionBadge className="mb-6">{t('badge')}</SectionBadge>
            </motion.div>

            <motion.h1
              custom={0.12}
              variants={heroTextVariants}
              initial="hidden"
              animate="visible"
              className="text-display-lg md:text-7xl font-extrabold text-[var(--color-on-background)] mb-6 leading-tight"
            >
              {t('heroLine1')} <br />
              <span className="text-[var(--color-primary)]">{t('heroLine2')}</span>
            </motion.h1>

            <motion.p
              custom={0.26}
              variants={heroTextVariants}
              initial="hidden"
              animate="visible"
              className="text-body-lg text-[var(--color-on-surface-variant)] mb-10 max-w-xl"
            >
              {t('heroDesc')}
            </motion.p>

            {/* Active students */}
            <motion.div
              custom={0.4}
              variants={heroTextVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4 justify-center md:justify-start"
            >
              <div className="flex -space-x-3">
                {AVATARS.map((av, idx) => (
                  <div
                    key={idx}
                    className="w-10 h-10 rounded-full border-2 border-[var(--color-surface)] bg-slate-200 overflow-hidden shadow-[var(--shadow-soft)]"
                  >
                    <img className="w-full h-full object-cover" alt="Student profile" src={av} />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-[var(--color-surface)] bg-[var(--color-primary-container)] flex items-center justify-center text-[var(--color-primary)] text-xs font-bold shadow-[var(--shadow-soft)]">
                  +2k
                </div>
              </div>
              <p className="text-label-lg text-[var(--color-on-surface-variant)] self-center font-semibold">
                {t('activeStudents')}
              </p>
            </motion.div>
          </div>


          {/* Hero illustration */}
          <div className="relative hidden md:block select-none">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[var(--color-secondary-container)]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[var(--color-primary-container)]/10 rounded-full blur-3xl" />
            <div className="relative bg-[var(--color-surface-container-lowest)] rounded-[var(--radius-3xl)] p-6 shadow-[var(--shadow-coral)] rotate-2 hover:rotate-0 transition-transform duration-500 max-w-lg ml-auto border border-[var(--color-surface-variant)]/45">
              <img
                className="rounded-[var(--radius-2xl)] w-full h-[360px] object-cover"
                alt="Cozy Chinese study space"
                src={FALLBACK_COVER}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Hero ──────────────────────────────────────── */}
      <section className="app-section block md:hidden">
        <div className="app-container">
          <h1
            className="text-display-sm font-extrabold text-[var(--color-on-surface)] tracking-tight leading-tight"
            dangerouslySetInnerHTML={{ __html: t.raw('mobileHeroTitleHtml') }}
          />
          <p className="text-[var(--color-on-surface-variant)] mt-2 text-body-md">
            {t('mobileHeroSub')}
          </p>
        </div>
      </section>
    </>
  );
}
