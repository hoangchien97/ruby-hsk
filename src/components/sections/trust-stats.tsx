'use client';

import { useTranslations } from 'next-intl';
import { Stats } from '@/lib/constants/site';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

/**
 * TrustStats — floating stats bar below the hero section.
 *
 * Tách biệt hoàn toàn phần số và phần đơn vị (hậu tố) để AnimatedCounter chạy chính xác:
 * - "10k+" -> số 10 và hậu tố "k+"
 * - "95%"  -> số 95 và hậu tố "%"
 * - "15+"  -> số 15 và hậu tố "+"
 * - "24/7" -> hiển thị tĩnh
 *
 * delay={0.6}: ScrollReveal scale-in takes ~0.5 s.
 * Counter starts AFTER parent is fully visible so users see the full count-up.
 */
export function TrustStats() {
  const t = useTranslations('Home');

  return (
    <section className="app-container relative -mt-10 md:-mt-16 z-20">
      <ScrollReveal
        variant="scale-in"
        className="rounded-[var(--radius-3xl)] border border-[var(--color-surface-variant)] bg-[var(--color-surface-container-low)] py-4 shadow-[var(--shadow-soft)] grid grid-cols-2 text-center md:grid-cols-4"
      >
        {Stats.map((stat, i) => {
          let numericValue: number | null = null;
          let suffix = '';

          if (stat.value.startsWith('10')) {
            numericValue = 10;
            suffix = 'k+';
          } else if (stat.value.startsWith('95')) {
            numericValue = 95;
            suffix = '%';
          } else if (stat.value.startsWith('15')) {
            numericValue = 15;
            suffix = '+';
          }

          return (
            <div
              key={stat.labelKey}
              className={`p-4 ${i > 0 ? 'border-l border-[var(--color-surface-variant)]' : ''}`}
            >
              <div className="text-display-lg text-[var(--color-primary)] font-bold">
                {numericValue !== null ? (
                  <AnimatedCounter
                    value={numericValue}
                    suffix={suffix}
                    delay={0.6}
                    duration={1400}
                  />
                ) : (
                  stat.value
                )}
              </div>
              <div className="mt-1 text-label-lg text-[var(--color-on-surface-variant)] font-semibold">
                {t(stat.labelKey)}
              </div>
            </div>
          );
        })}
      </ScrollReveal>
    </section>
  );
}
