'use client';

import { useTranslations } from 'next-intl';
import { Stats } from '@/lib/constants/site';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

/**
 * TrustStats — floating stats bar below the hero section.
 * Animates the stats using AnimatedCounter which handles both numeric/string values.
 */
export function TrustStats() {
  const t = useTranslations('Home');

  return (
    <section className="app-container relative -mt-10 md:-mt-16 z-20">
      <ScrollReveal
        variant="scale-in"
        className="rounded-[var(--radius-3xl)] border border-[var(--color-surface-variant)] bg-[var(--color-surface-container-low)] py-4 shadow-[var(--shadow-soft)] grid grid-cols-2 text-center md:grid-cols-4"
      >
        {Stats.map((stat, i) => (
          <div
            key={stat.labelKey}
            className={`p-4 ${i > 0 ? 'border-l border-[var(--color-surface-variant)]' : ''}`}
          >
            <div className="text-display-lg text-[var(--color-primary)] font-bold">
              <AnimatedCounter value={stat.value} />
            </div>
            <div className="mt-1 text-label-lg text-[var(--color-on-surface-variant)] font-semibold">
              {t(stat.labelKey)}
            </div>
          </div>
        ))}
      </ScrollReveal>
    </section>
  );
}
