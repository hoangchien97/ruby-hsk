'use client';

import { useTranslations } from 'next-intl';
import { GraduationCap, Award, Trophy, Sparkles, Quote } from 'lucide-react';
import { IconBox } from '@/components/ui/icon-box';
import type { TeacherProfile } from '@/types/models';

interface AboutTeacherSectionProps {
    teacher: TeacherProfile | null;
}

const ACHIEVEMENTS_CONFIG = [
    { key: 'edu1', icon: GraduationCap, color: 'primary' as const },
    { key: 'edu2', icon: Award, color: 'tertiary' as const },
    { key: 'edu3', icon: Trophy, color: 'amber' as const },
    { key: 'edu4', icon: Sparkles, color: 'indigo' as const },
];

/**
 * Teacher Portrait & Academy Credentials section (About page).
 */
export function AboutTeacherSection({ teacher }: AboutTeacherSectionProps) {
    const t = useTranslations('About');

    return (
        <section className="container max-w-[1400px] px-4 py-16 md:py-24 mx-auto">
            <div className="grid gap-12 lg:grid-cols-12 items-start">
                {/* Left: Intro + Achievement Grid */}
                <div className="lg:col-span-7 space-y-8">
                    <div>
                        <span className="text-label-lg font-bold tracking-widest text-[var(--color-secondary)] uppercase">
                            {t('foundingInstructor')}
                        </span>
                        <h2 className="text-headline-lg md:text-[40px] font-bold text-[var(--color-on-surface)] mt-2 mb-4">
                            {t('introTeacher')}
                        </h2>
                        <p className="text-body-lg text-[var(--color-on-surface-variant)] leading-relaxed">
                            {t('teacherBio')}
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        {ACHIEVEMENTS_CONFIG.map(({ key, icon, color }) => (
                            <div
                                key={key}
                                className="p-6 rounded-[2rem] bg-[var(--color-surface-container-lowest)] border border-[var(--color-surface-variant)] shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                <IconBox icon={icon} color={color} className="mb-4" />
                                <h4 className="text-title-lg font-bold text-[var(--color-on-surface)] mb-2 leading-tight">
                                    {t(`${key}Title`)}
                                </h4>
                                <p className="text-body-md text-[var(--color-on-surface-variant)] leading-relaxed">
                                    {t(`${key}Desc`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Portrait + Quote */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-square rounded-[2.5rem] overflow-hidden bg-[var(--color-surface-container-low)] border border-[var(--color-surface-variant)] shadow-inner flex items-center justify-center p-8 group">
                        <img
                            className="w-48 h-48 sm:w-64 sm:h-64 object-contain group-hover:scale-105 transition-transform duration-500"
                            alt="Ruby HSK Mascot Teacher"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhsU2Z3ybUP4TdNm9JnFlzTcGsHf7DoQsVJWScgcRrSJO9h9MOa2GEJLiGRQFfoQn6_6SpAAn0R9LfUGAPKhwLRhuwWpgTwMQJJAnSZjspImTnZeW50hOORglqUFMF09KQ5XfDapMHxjZ7KxUYaWxoPvQIpMFmfMw2JrX2LSuUQLDJpnL_9-t6F-koMB4D7697AwTv62gon7HQpiBc29xZWU-puSjVGAFYtgdrRHmjURqk_sn82kIK6brLc1ZQEdrRaY1NgNkBTy8"
                        />
                        <div className="absolute bottom-6 left-6 right-6 bg-[var(--color-surface-glass)] backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center">
                            <span className="text-label-md font-bold text-[var(--color-primary)]">
                                {t('introTeacher')}
                            </span>
                            <p className="text-[11px] text-[var(--color-on-surface-variant)] font-semibold mt-0.5">
                                {t('methodologyBadge')}
                            </p>
                        </div>
                    </div>

                    <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[var(--color-primary-container)] to-[var(--color-surface-container-low)] border border-[var(--color-primary)]/20 shadow-sm relative overflow-hidden">
                        <Quote className="absolute right-6 top-6 w-16 h-16 text-[var(--color-primary)]/10 pointer-events-none" />
                        <p className="text-body-lg italic font-medium text-[var(--color-on-background)] leading-relaxed relative z-10">
                            {t('teacherQuote')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
