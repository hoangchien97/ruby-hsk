'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import { Target, Sparkles, CheckCircle2, GraduationCap } from 'lucide-react';

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
    const bio = teacher
        ? (locale === 'vi' ? teacher.bio_vi : teacher.bio_en) ?? ''
        : 'Ruby HSK tập trung vào trải nghiệm học tiếng Trung có lộ trình, gần gũi và dễ áp dụng.';

    const methodItems =
        locale === 'vi'
            ? [
                'Học theo lộ trình chuẩn khung HSK',
                'Tập trung nền tảng phát âm và từ vựng',
                'Luyện tập đều đặn qua bài tập thực tế',
                'Ứng dụng trực tiếp vào giao tiếp và thi HSK',
            ]
            : [
                'Structured learning aligned with HSK framework',
                'Foundation-first: pronunciation and vocabulary',
                'Regular practice through real-world exercises',
                'Direct application to communication and HSK exams',
            ];

    const isVi = locale === 'vi';

    return (
        <div className="page-shell">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
            />

            {/* Page Header */}
            <section className="container pt-12 pb-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-secondary-container)] px-4 py-1 text-label-lg text-[var(--color-on-secondary-container)] font-bold mb-4">
                    <Sparkles className="w-4 h-4" /> {isVi ? 'Về chúng mình' : 'About Us'}
                </span>
                <h1 className="text-headline-lg md:text-[56px] font-bold text-[var(--color-on-background)] max-w-2xl leading-tight">
                    {t('title')}
                </h1>
                <p className="mt-4 max-w-2xl text-body-lg text-[var(--color-on-surface-variant)]">
                    {isVi
                        ? 'Cùng tìm hiểu về câu chuyện của Ruby HSK và phương pháp giúp bạn chinh phục tiếng Trung.'
                        : 'Learn about Ruby HSK\'s story and methodology to help you master Chinese.'}
                </p>
            </section>

            <section className="container pb-16">
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Teacher Profile Card */}
                    <Card variant="white" className="p-8 md:p-12">
                        <h2 className="text-display-sm font-bold text-[var(--color-primary)] mb-2">
                            {t('teacher')}
                        </h2>
                        {teacher && (
                            <p className="text-title-md font-semibold text-[var(--color-on-surface-variant)] mb-6">
                                {teacher.title}
                            </p>
                        )}

                        <p className="text-body-lg text-[var(--color-on-surface)] leading-relaxed mb-8">
                            {bio}
                        </p>

                        {teacher?.certifications && teacher.certifications.length > 0 && (
                            <div className="mb-8">
                                <h4 className="text-label-lg font-bold text-[var(--color-on-surface-variant)] uppercase tracking-wider mb-3">
                                    {isVi ? 'Chứng chỉ nổi bật' : 'Certifications'}
                                </h4>
                                <ul className="grid gap-3">
                                    {teacher.certifications.map((cert) => (
                                        <li
                                            key={cert}
                                            className="flex items-center gap-3 text-body-md text-[var(--color-on-surface)]"
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-[var(--color-tertiary)]" />
                                            {cert}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {teacher?.years_experience && (
                            <div className="inline-block rounded-[var(--radius-xl)] bg-[var(--color-primary-container)] px-4 py-2 mt-4">
                                <p className="text-label-lg font-bold text-[var(--color-primary)] flex items-center gap-2">
                                    <GraduationCap className="w-5 h-5" />
                                    {teacher.years_experience}+ {isVi ? 'năm kinh nghiệm giảng dạy' : 'years teaching experience'}
                                </p>
                            </div>
                        )}

                        <div className="mt-10">
                            <Link href="/contact">
                                <Button>
                                    {isVi ? 'Nhận tư vấn lộ trình' : 'Get a learning consultation'}
                                </Button>
                            </Link>
                        </div>
                    </Card>

                    {/* Methodology Info */}
                    <Card variant="surface" className="p-8 md:p-12 flex flex-col justify-center border-none">
                        <div className="mb-6">
                            <Target className="w-16 h-16 text-[var(--color-primary)]" />
                        </div>
                        <h3 className="text-display-sm font-bold text-[var(--color-on-surface)] mb-8">
                            {isVi ? 'Phương pháp giảng dạy' : 'Teaching methodology'}
                        </h3>
                        <ul className="grid gap-6">
                            {methodItems.map((item) => (
                                <li key={item} className="flex items-start gap-4 p-4 rounded-2xl bg-white coral-shadow transition-transform hover:-translate-y-1">
                                    <Sparkles className="w-6 h-6 shrink-0 text-[var(--color-tertiary)]" />
                                    <p className="text-body-lg font-medium text-[var(--color-on-surface)]">
                                        {item}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </section>
        </div>
    );
}
