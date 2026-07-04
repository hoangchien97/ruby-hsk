'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export function ReadyToLearn() {
    const t = useTranslations('ReadyToLearn');

    return (
        <section className="py-12 md:py-16 bg-[var(--color-bg)]">
            <div className="container px-4 mx-auto max-w-[1400px]">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#d32f2f] via-[#e65100] to-[#f57c00] px-6 py-12 md:py-16 text-center shadow-xl">
                    {/* Background decorative path or overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />

                    {/* Badge */}
                    <div className="relative z-10 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                        <Sparkles className="h-3.5 w-3.5 fill-current text-white animate-pulse" />
                        {t('badge')}
                    </div>

                    {/* Main Content */}
                    <div className="relative z-10 mt-6 max-w-3xl mx-auto">
                        <h2 className="text-display-sm md:text-headline-lg font-extrabold text-white leading-tight">
                            {t('title')}
                        </h2>
                        <p className="mt-4 text-body-lg text-white/90 max-w-xl mx-auto leading-relaxed">
                            {t('desc')}
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="relative z-10 mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md sm:max-w-xl mx-auto">
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto h-12 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 text-[15px] font-bold text-[#d32f2f] shadow-md hover:bg-neutral-50 transition-all hover:scale-105 active:scale-95 duration-200"
                        >
                            {t('btnRegister')}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/about"
                            className="w-full sm:w-auto h-12 inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-8 text-[15px] font-bold text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95 duration-200"
                        >
                            {t('btnTeacher')}
                        </Link>
                    </div>

                    {/* Divider line */}
                    <div className="relative z-10 my-10 max-w-2xl mx-auto h-[1px] bg-white/20" />

                    {/* Stats */}
                    <div className="relative z-10 grid grid-cols-3 gap-4 max-w-2xl mx-auto text-white">
                        <div className="flex flex-col items-center">
                            <span className="text-headline-md md:text-display-sm font-extrabold tracking-tight">
                                {t('statStudents')}
                            </span>
                            <span className="mt-1 text-label-md md:text-label-lg font-medium text-white/80">
                                {t('statStudentsLabel')}
                            </span>
                        </div>
                        <div className="flex flex-col items-center border-x border-white/10">
                            <span className="text-headline-md md:text-display-sm font-extrabold tracking-tight">
                                {t('statPassRate')}
                            </span>
                            <span className="mt-1 text-label-md md:text-label-lg font-medium text-white/80">
                                {t('statPassRateLabel')}
                            </span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-headline-md md:text-display-sm font-extrabold tracking-tight">
                                {t('statExperience')}
                            </span>
                            <span className="mt-1 text-label-md md:text-label-lg font-medium text-white/80">
                                {t('statExperienceLabel')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
