'use client';

import { useTranslations } from 'next-intl';
import { Stats } from '@/lib/constants/site';

/**
 * TrustStats — floating stats bar below the hero section.
 * Extracted from hero.tsx for easier maintenance.
 */
export function TrustStats({ locale }: { locale: string }) {
    const t = useTranslations('Home');
    const isVi = locale === 'vi';

    return (
        <section className="container max-w-[1400px] px-4 mx-auto relative -mt-16 z-20">
            <div className="rounded-[2.5rem] border border-[var(--color-surface-variant)] bg-[var(--color-surface-container-low)] py-4 shadow-sm grid grid-cols-2 text-center md:grid-cols-4">
                {Stats.map((stat, i) => (
                    <div
                        key={stat.value}
                        className={`p-4 ${i > 0 ? 'border-l border-[var(--color-surface-variant)]' : ''}`}
                    >
                        <div className="text-display-lg text-[var(--color-primary)] font-bold">
                            {stat.value}
                        </div>
                        <div className="mt-1 text-label-lg text-[var(--color-on-surface-variant)] font-semibold">
                            {isVi ? stat.labelVi : stat.labelEn}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
