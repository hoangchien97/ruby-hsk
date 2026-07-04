'use client';

import { useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';
import { SectionBadge } from '@/components/ui/section-badge';

/**
 * About page header banner.
 */
export function AboutHeaderBanner() {
    const t = useTranslations('About');

    return (
        <section className="relative overflow-hidden pt-16 pb-12 md:pt-20 md:pb-16 border-b border-[var(--color-surface-variant)]/40 bg-gradient-to-b from-[var(--color-surface-container-low)] to-[var(--color-bg)]">
            <div className="container max-w-[1400px] px-4 mx-auto relative z-10">
                <div className="max-w-3xl">
                    <SectionBadge>{t('aboutBadge')}</SectionBadge>
                    <h1 className="text-display-md md:text-display-lg font-bold text-[var(--color-on-background)] tracking-tight leading-[1.1] mb-6 mt-6">
                        {t('title')}
                    </h1>
                    <p className="text-body-lg md:text-xl text-[var(--color-on-surface-variant)] leading-relaxed font-medium">
                        {t('desc')}
                    </p>
                </div>
            </div>
            <div className="absolute right-0 top-0 w-1/3 h-full bg-[var(--color-primary)]/5 blur-3xl rounded-full" />
        </section>
    );
}
