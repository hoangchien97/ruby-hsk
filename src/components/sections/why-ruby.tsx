'use client';

import { useTranslations } from 'next-intl';
import { Heart, Lightbulb, Calendar, Trophy, BookCheck, Users } from 'lucide-react';

interface WhyRubyProps {
    locale?: string;
}

export function WhyRuby({ locale = 'vi' }: WhyRubyProps) {
    const t = useTranslations('Home');

    const features = [
        {
            icon: Heart,
            title: t('featureDedicationTitle'),
            desc: t('featureDedicationDesc'),
        },
        {
            icon: Lightbulb,
            title: t('featureClarityTitle'),
            desc: t('featureClarityDesc'),
        },
        {
            icon: Calendar,
            title: t('featureFlexibilityTitle'),
            desc: t('featureFlexibilityDesc'),
        },
        {
            icon: Trophy,
            title: t('featureCommitmentTitle'),
            desc: t('featureCommitmentDesc'),
        },
    ];

    const reasonBullets = [
        {
            icon: BookCheck,
            title: t('bulletExclusiveTitle'),
            desc: t('bulletExclusiveDesc'),
        },
        {
            icon: Users,
            title: t('bulletSmallClassTitle'),
            desc: t('bulletSmallClassDesc'),
        },
    ];

    return (
        <section className="bg-[var(--color-surface-container)] py-16">
            <div className="container px-4 mx-auto max-w-[1400px]">
                <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                    {/* Left: 2×2 feature grid */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {features.map((f) => {
                            const Icon = f.icon;
                            return (
                                <div
                                    key={f.title}
                                    className="rounded-[var(--radius-2xl)] border border-[var(--color-surface-variant)] bg-[var(--color-surface-container-lowest)] p-6 shadow-sm flex flex-col items-center text-center sm:items-start sm:text-left gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-title-md font-semibold text-[var(--color-on-surface)]">
                                            {f.title}
                                        </h4>
                                        <p className="mt-1 text-label-lg text-[var(--color-on-surface-variant)] leading-relaxed">
                                            {f.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right: Why text + bullets */}
                    <div>
                        <h2 className="text-headline-lg text-[var(--color-on-surface)] font-bold">
                            {t('whyTitle')}{' '}
                            <span className="text-[var(--color-primary)] font-bold">Ruby HSK?</span>
                        </h2>
                        <p className="mt-4 max-w-lg text-body-lg text-[var(--color-on-surface-variant)]">
                            {t('whyDesc')}
                        </p>
                        <div className="mt-8 space-y-5">
                            {reasonBullets.map((b) => {
                                const Icon = b.icon;
                                return (
                                    <div key={b.title} className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h5 className="font-semibold text-[var(--color-on-surface)]">
                                                {b.title}
                                            </h5>
                                            <p className="mt-0.5 text-label-lg text-[var(--color-on-surface-variant)]">
                                                {b.desc}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
