'use client';

import { Heart, Star, BookOpen, CalendarCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import type { CourseRow } from '@/types/models';
import { COURSE_COVERS, COURSE_STATS, FALLBACK_COVER } from './course-constants';

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
  const stats = COURSE_STATS[c.slug];

  return (
    <div className="group bg-[var(--color-surface-container-lowest)] rounded-[var(--radius-3xl)] overflow-hidden shadow-[var(--shadow-soft)] border border-[var(--color-border)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
      {/* Cover */}
      <div className="relative h-56 w-full overflow-hidden bg-[var(--color-surface-container-low)]">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          alt={title ?? 'Course'}
          src={coverImg}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-[var(--color-primary)] px-4 py-1.5 rounded-full text-white text-xs font-extrabold uppercase tracking-wider shadow-[var(--shadow-soft)]">
            {c.level_tag ?? 'HSK'}
          </span>
        </div>
        <button
          onClick={onToggleFav}
          aria-label="Toggle favourite"
          className={`absolute top-4 right-4 h-10 w-10 bg-[var(--color-surface-container-lowest)]/90 backdrop-blur rounded-full flex items-center justify-center shadow-[var(--shadow-soft)] hover:scale-105 active:scale-95 transition-all ${isFav ? 'text-[var(--color-primary)]' : 'text-[var(--color-on-surface-variant)]/60 hover:text-[var(--color-primary)]'
            }`}
        >
          <Heart className="w-5 h-5 stroke-[2]" fill={isFav ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 md:p-8 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 mb-4">
          <h3 className="font-bold text-title-md text-[var(--color-on-surface)] group-hover:text-[var(--color-primary)] transition-colors leading-tight">
            {title}
          </h3>
        </div>

        <p className="text-[var(--color-on-surface-variant)] text-body-md mb-6 line-clamp-2 flex-grow">
          {desc}
        </p>

        {stats && (
          <div className="flex flex-wrap gap-4 pt-4 pb-2 border-t border-[var(--color-surface-variant)]/40">
            <div className="flex items-center gap-1.5 text-[var(--color-on-surface-variant)]">
              <BookOpen className="w-[18px] h-[18px]" />
              <span className="text-label-sm font-semibold">
                {stats.lectures} {t('lectures')}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[var(--color-on-surface-variant)]">
              <CalendarCheck className="w-[18px] h-[18px]" />
              <span className="text-label-sm font-semibold">
                {stats.sessions} {t('sessions')}
              </span>
            </div>
          </div>
        )}

        {/* <div className="flex items-center justify-end mt-auto pt-6">
                    <Link href={`/courses/${c.slug}`}>
                        <Button variant="secondary" className="px-5 py-2.5 rounded-[var(--radius-xl)] font-bold transition-all">
                            {t('details')}
                        </Button>
                    </Link>
                </div> */}
      </div>
    </div>
  );
}
