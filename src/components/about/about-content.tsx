'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import {
    Sparkles,
    Award,
    BookOpen,
    MapPin,
    CheckCircle2,
    GraduationCap,
    Heart,
    Quote,
    Target,
    Trophy,
    ShieldCheck,
    Laptop
} from 'lucide-react';

export function AboutContent({
    locale,
    teacher,
    breadcrumbLD,
}: {
    locale: string;
    teacher: {
        full_name: string;
        title: string | null;
        bio_vi: string | null;
        bio_en: string | null;
        years_experience: number | null;
        certifications: string[] | null;
    } | null;
    breadcrumbLD: object;
}) {
    const t = useTranslations('About');
    const isVi = locale === 'vi';

    // Achievement cards data based on localized strings
    const achievements = [
        {
            title: t('edu1Title'),
            desc: t('edu1Desc'),
            icon: GraduationCap,
            color: 'text-[var(--color-primary)] bg-[var(--color-primary)]/10',
        },
        {
            title: t('edu2Title'),
            desc: t('edu2Desc'),
            icon: Award,
            color: 'text-[var(--color-tertiary)] bg-[var(--color-tertiary)]/10',
        },
        {
            title: t('edu3Title'),
            desc: t('edu3Desc'),
            icon: Trophy,
            color: 'text-amber-600 bg-amber-500/10',
        },
        {
            title: t('edu4Title'),
            desc: t('edu4Desc'),
            icon: Sparkles,
            color: 'text-indigo-600 bg-indigo-500/10',
        },
    ];

    // Methodology items
    const methodologies = [
        {
            title: t('method1Title'),
            desc: t('method1Desc'),
            icon: Target,
        },
        {
            title: t('method2Title'),
            desc: t('method2Desc'),
            icon: Heart,
        },
        {
            title: t('method3Title'),
            desc: t('method3Desc'),
            icon: CheckCircle2,
        },
    ];

    // Why Ruby HSK items
    const whyItems = [
        {
            title: t('why1Title'),
            desc: t('why1Desc'),
            icon: BookOpen,
        },
        {
            title: t('why2Title'),
            desc: t('why2Desc'),
            icon: GraduationCap,
        },
        {
            title: t('why3Title'),
            desc: t('why3Desc'),
            icon: Laptop,
        },
        {
            title: t('why4Title'),
            desc: t('why4Desc'),
            icon: ShieldCheck,
        },
    ];

    return (
        <div className="page-shell bg-[var(--color-bg)]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
            />

            {/* Header Banner */}
            <section className="relative overflow-hidden pt-16 pb-12 md:pt-20 md:pb-16 border-b border-[var(--color-surface-variant)]/40 bg-gradient-to-b from-[var(--color-surface-container-low)] to-[var(--color-bg)]">
                <div className="container max-w-[1400px] px-4 mx-auto relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)]/10 px-4 py-1.5 text-label-md text-[var(--color-primary)] font-bold mb-6">
                            <Sparkles className="w-4 h-4" /> {isVi ? 'ABOUT RUBY HSK' : 'ABOUT US'}
                        </span>
                        <h1 className="text-display-md md:text-display-lg font-bold text-[var(--color-on-background)] tracking-tight leading-[1.1] mb-6">
                            {t('title')}
                        </h1>
                        <p className="text-body-lg md:text-xl text-[var(--color-on-surface-variant)] leading-relaxed font-medium">
                            {t('desc')}
                        </p>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute right-0 top-0 w-1/3 h-full bg-[var(--color-primary)]/5 blur-3xl rounded-full" />
            </section>

            {/* Section: Teacher Portrait & Academy Credentials */}
            <section className="container max-w-[1400px] px-4 py-16 md:py-24 mx-auto">
                <div className="grid gap-12 lg:grid-cols-12 items-start">
                    {/* Left Column: Mascot Emblem & Achievements Grid */}
                    <div className="lg:col-span-7 space-y-8">
                        <div>
                            <span className="text-label-lg font-bold tracking-widest text-[var(--color-secondary)] uppercase">
                                {isVi ? 'GIẢNG VIÊN SÁNG LẬP' : 'FOUNDING INSTRUCTOR'}
                            </span>
                            <h2 className="text-headline-lg md:text-[40px] font-bold text-[var(--color-on-surface)] mt-2 mb-4">
                                {t('introTeacher')}
                            </h2>
                            <p className="text-body-lg text-[var(--color-on-surface-variant)] leading-relaxed">
                                {t('teacherBio')}
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            {achievements.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={index}
                                        className="p-6 rounded-[2rem] bg-[var(--color-surface-container-lowest)] border border-[var(--color-surface-variant)] shadow-sm hover:shadow-md transition-all duration-300"
                                    >
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${item.color}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <h4 className="text-title-lg font-bold text-[var(--color-on-surface)] mb-2 leading-tight">
                                            {item.title}
                                        </h4>
                                        <p className="text-body-md text-[var(--color-on-surface-variant)] leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column: Quotes & Portrait Mockup */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Visual Mascot Frame */}
                        <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-square rounded-[2.5rem] overflow-hidden bg-[var(--color-surface-container-low)] border border-[var(--color-surface-variant)] shadow-inner flex items-center justify-center p-8 group">
                            <img
                                className="w-48 h-48 sm:w-64 sm:h-64 object-contain group-hover:scale-105 transition-transform duration-500"
                                alt="Ruby HSK Mascot Teacher"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhsU2Z3ybUP4TdNm9JnFlzTcGsHf7DoQsVJWScgcRrSJO9h9MOa2GEJLiGRQFfoQn6_6SpAAn0R9LfUGAPKhwLRhuwWpgTwMQJJAnSZjspImTnZeW50hOORglqUFMF09KQ5XfDapMHxjZ7KxUYaWxoPvQIpMFmfMw2JrX2LSuUQLDJpnL_9-t6F-koMB4D7697AwTv62gon7HQpiBc29xZWU-puSjVGAFYtgdrRHmjURqk_sn82kIK6brLc1ZQEdrRaY1NgNkBTy8"
                            />
                            <div className="absolute bottom-6 left-6 right-6 bg-[var(--color-surface-glass)] backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center">
                                <span className="text-label-md font-bold text-[var(--color-primary)] font-bold">Cô Trần Hồng Ngọc</span>
                                <p className="text-[11px] text-[var(--color-on-surface-variant)] font-semibold mt-0.5">Thạc sĩ Giáo dục Hán ngữ Quốc tế</p>
                            </div>
                        </div>

                        {/* Premium Quote Block */}
                        <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[var(--color-primary-container)] to-[var(--color-surface-container-low)] border border-[var(--color-primary)]/20 shadow-sm relative overflow-hidden">
                            <Quote className="absolute right-6 top-6 w-16 h-16 text-[var(--color-primary)]/10 pointer-events-none" />
                            <p className="text-body-lg italic font-medium text-[var(--color-on-background)] leading-relaxed relative z-10">
                                {t('teacherQuote')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: Methodology detail */}
            <section className="bg-[var(--color-surface-container-low)] border-y border-[var(--color-surface-variant)]/60 py-16 md:py-24">
                <div className="container max-w-[1400px] px-4 mx-auto">
                    <div className="max-w-3xl mb-12">
                        <span className="text-label-lg font-bold tracking-widest text-[var(--color-secondary)] uppercase">
                            {isVi ? 'PHƯƠNG PHÁP & KINH NGHIỆM' : 'METHODOLOGY & EXPERIENCE'}
                        </span>
                        <h2 className="text-headline-lg md:text-[40px] font-bold text-[var(--color-on-surface)] mt-2 mb-4">
                            {t('methodsTitle')}
                        </h2>
                        <p className="text-body-lg text-[var(--color-on-surface-variant)] leading-relaxed">
                            {t('methodsDesc')}
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {methodologies.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={index}
                                    className="p-8 rounded-[2rem] bg-[var(--color-surface-container-lowest)] border border-[var(--color-surface-variant)] shadow-sm hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mb-6">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-title-xl font-bold text-[var(--color-on-surface)] mb-3">
                                        {item.title}
                                    </h4>
                                    <p className="text-body-md text-[var(--color-on-surface-variant)] leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Section: Why Choose Ruby HSK */}
            <section className="container max-w-[1400px] px-4 py-16 md:py-24 mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-headline-lg md:text-[40px] font-bold text-[var(--color-on-surface)] mb-4">
                        {t('whyTitle')}
                    </h2>
                    <p className="text-body-lg text-[var(--color-on-surface-variant)] font-medium">
                        {t('whyDesc')}
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {whyItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className="flex gap-6 p-8 rounded-[2.5rem] bg-[var(--color-surface-container-lowest)] border border-[var(--color-surface-variant)] shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-[var(--color-tertiary)]/10 text-[var(--color-tertiary)] flex items-center justify-center shrink-0">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-title-xl font-bold text-[var(--color-on-surface)] mb-2">
                                        {item.title}
                                    </h4>
                                    <p className="text-body-md text-[var(--color-on-surface-variant)] leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Section: CTA Banner */}
            <section className="container max-w-[1400px] px-4 pb-20 mx-auto">
                <div className="p-8 md:p-16 rounded-[3rem] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-container)] border border-[var(--color-primary)]/20 shadow-xl overflow-hidden relative text-center">
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-headline-lg md:text-display-sm font-bold text-white mb-4">
                            {isVi ? 'Bắt đầu hành trình tiếng Trung của bạn' : 'Start your Chinese learning journey'}
                        </h2>
                        <p className="text-body-lg text-white/90 mb-8 leading-relaxed font-medium">
                            {isVi
                                ? 'Đăng ký ngay hôm nay để nhận lộ trình tư vấn cá nhân hóa MIỄN PHÍ cùng đội ngũ giảng viên thạc sĩ.'
                                : 'Sign up today to receive a FREE personalized learning roadmap with our master level team.'}
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/contact">
                                <Button className="w-full sm:w-auto bg-white text-[var(--color-primary)] hover:bg-neutral-100 font-bold px-8 py-6 rounded-full text-base">
                                    {isVi ? 'Nhận tư vấn miễn phí' : 'Get free consultation'}
                                </Button>
                            </Link>
                            <Link href="/courses">
                                <Button className="w-full sm:w-auto bg-transparent border-2 border-white/60 hover:border-white hover:bg-white/10 text-white font-bold px-8 py-6 rounded-full text-base">
                                    {isVi ? 'Xem danh sách khóa học' : 'Explore all courses'}
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Decorative mesh */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
                </div>
            </section>
        </div>
    );
}
