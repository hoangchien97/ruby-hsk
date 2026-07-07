'use client';

import { Heart, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import type { CourseRow } from '@/types/models';
import { COURSE_COVERS, FALLBACK_COVER } from './course-constants';

interface CourseCardProps {
    course: CourseRow;
    locale: string;
    isFav: boolean;
    onToggleFav: () => void;
}

export function CourseCard({
    course: c,
    locale,
    isFav,
    onToggleFav,
}: CourseCardProps) {
    const t = useTranslations('Courses');
    const isVi = locale === 'vi';
    const coverImg = COURSE_COVERS[c.slug] ?? FALLBACK_COVER;
    const title = isVi ? c.title_vi : c.title_en;
    const desc = isVi ? c.description_vi : c.description_en;
    const priceDisplay =
        c.price_note && c.price_note.toLowerCase().includes('liên hệ')
            ? isVi ? c.price_note : 'Contact for tuition info'
            : c.price_note ?? t('contactTuition');

    return (
        <div className="group bg-[var(--color-surface-container-lowest)] rounded-3xl overflow-hidden coral-shadow border border-[var(--color-border)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
            {/* Cover */}
            <div className="relative h-56 w-full overflow-hidden bg-[var(--color-surface-container-low)]">
                <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={title ?? 'Course'}
                    src={coverImg}
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-[var(--color-primary)] px-4 py-1.5 rounded-full text-white text-xs font-extrabold uppercase tracking-wider shadow-sm">
                        {c.level_tag ?? 'HSK'}
                    </span>
                </div>
                <button
                    onClick={onToggleFav}
                    aria-label="Toggle favourite"
                    className={`absolute top-4 right-4 h-10 w-10 bg-[var(--color-surface-container-lowest)]/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-all ${isFav ? 'text-[var(--color-primary)]' : 'text-[var(--color-on-surface-variant)]/60 hover:text-[var(--color-primary)]'
                        }`}
                >
                    <Heart className="w-5 h-5 stroke-[2]" fill={isFav ? 'currentColor' : 'none'} />
                </button>
            </div>

            {/* Body */}
            <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start gap-2 mb-4">
                    <h3 className="font-bold text-title-md text-[var(--color-on-surface)] group-hover:text-[var(--color-primary)] transition-colors leading-tight">
                        {title}
                    </h3>
                    <div className="flex items-center gap-1.5 bg-[var(--color-secondary-container)]/15 px-2 py-0.5 rounded-lg border border-[var(--color-secondary-container)]/40 shrink-0">
                        <Star className="w-4 h-4 text-[var(--color-secondary)] fill-[var(--color-secondary-fixed-dim)]" />
                        <span className="text-xs font-bold text-[var(--color-secondary)]">5.0</span>
                    </div>
                </div>

                <p className="text-[var(--color-on-surface-variant)] text-body-md mb-6 line-clamp-2 flex-grow">
                    {desc}
                </p>

                <div className="flex items-center justify-between border-t border-[var(--color-surface-variant)]/30 pt-6 mt-auto">
                    <div className="flex flex-col">
                        {c.duration_weeks && (
                            <span className="text-xs text-[var(--color-on-surface-variant)]/50 font-bold uppercase tracking-wider mb-0.5">
                                {c.duration_weeks} {t('weeks')}
                            </span>
                        )}
                        <span className="text-title-md font-bold text-[var(--color-primary)] tracking-tight">
                            {priceDisplay}
                        </span>
                    </div>
                    <Link href={`/courses/${c.slug}`}>
                        <Button variant="secondary" className="px-5 py-2.5 rounded-xl font-bold transition-all">
                            {t('details')}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
