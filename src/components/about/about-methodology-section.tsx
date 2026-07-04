'use client';

import { useTranslations } from 'next-intl';
import { Target, Heart, CheckCircle2 } from 'lucide-react';
import { IconBox } from '@/components/ui/icon-box';
import { SectionHeader } from '@/components/ui/section-header';

const METHODS = [
    { key: 'method1', icon: Target },
    { key: 'method2', icon: Heart },
    { key: 'method3', icon: CheckCircle2 },
];

/**
 * Methodology section (About page).
 */
export function AboutMethodologySection() {
    const t = useTranslations('About');

    return (
        <section className="bg-[var(--color-surface-container-low)] border-y border-[var(--color-surface-variant)]/60 py-16 md:py-24">
            <div className="container max-w-[1400px] px-4 mx-auto">
                <SectionHeader
                    badge={t('methodologyBadge')}
                    title={t('methodsTitle')}
                    description={t('methodsDesc')}
                    className="mb-12"
                />

                <div className="grid gap-6 md:grid-cols-3">
                    {METHODS.map(({ key, icon }) => (
                        <div
                            key={key}
                            className="p-8 rounded-[2rem] bg-[var(--color-surface-container-lowest)] border border-[var(--color-surface-variant)] shadow-sm hover:-translate-y-1 transition-all duration-300"
                        >
                            <IconBox icon={icon} color="primary" className="mb-6" />
                            <h4 className="text-title-xl font-bold text-[var(--color-on-surface)] mb-3">
                                {t(`${key}Title`)}
                            </h4>
                            <p className="text-body-md text-[var(--color-on-surface-variant)] leading-relaxed">
                                {t(`${key}Desc`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
