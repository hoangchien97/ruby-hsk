'use client';

import { useTranslations } from 'next-intl';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Link } from '@/i18n/navigation';
import { ChevronLeft, ChevronRight, Award } from 'lucide-react';
import type { CourseRow } from '@/types/models';
import { CoursesHero } from './courses-hero';
import { CourseMobileFilter } from './course-mobile-filter';
import { CourseFilters } from './course-filters';
import { CourseCard } from './course-card';

const HSK_LEVEL_KEYS = ['hsk-1', 'hsk-2', 'hsk-3', 'hsk-4', 'hsk-5', 'hsk-6'] as const;

export function CoursesPageContent({
    locale,
    courses,
    breadcrumbLD,
    courseLDs,
}: {
    locale: string;
    courses: CourseRow[];
    breadcrumbLD: object;
    courseLDs: object[];
}) {
    const t = useTranslations('Courses');

    const [selectedLevels, setSelectedLevels] = useState<string[]>(['all']);
    const [selectedFormat, setSelectedFormat] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('newest');
    const [favorites, setFavorites] = useState<Record<string, boolean>>({});

    // ── Level toggle ──────────────────────────────────────────────
    const handleLevelToggle = (level: string) => {
        if (level === 'all') {
            setSelectedLevels(['all']);
            return;
        }
        setSelectedLevels((prev) => {
            const next = prev.filter((l) => l !== 'all');
            if (next.includes(level)) {
                const filtered = next.filter((l) => l !== level);
                return filtered.length === 0 ? ['all'] : filtered;
            }
            return [...next, level];
        });
    };

    const toggleFavorite = (slug: string) =>
        setFavorites((prev) => ({ ...prev, [slug]: !prev[slug] }));

    // ── Computed counts per level ──────────────────────────────────
    const counts = useMemo(() => {
        const base: Record<string, number> = { all: courses.length };
        for (const key of HSK_LEVEL_KEYS) {
            const label = key.replace('hsk-', 'HSK ');
            base[key] = courses.filter((c) => c.level_tag === label).length;
        }
        return base;
    }, [courses]);

    // ── Filtered & sorted list ─────────────────────────────────────
    const filteredCourses = useMemo(() => {
        let result = [...courses];

        if (!selectedLevels.includes('all')) {
            result = result.filter((c) => {
                const tag = c.level_tag?.toLowerCase() ?? '';
                return selectedLevels.some((sel) => tag === sel.replace('hsk-', 'hsk '));
            });
        }

        if (selectedFormat !== 'all') {
            if (selectedFormat === 'online') {
                result = result.filter((c) => c.slug.includes('hsk') || c.slug.includes('cap'));
            } else if (selectedFormat === 'video') {
                result = result.filter((c) => c.slug.includes('thuong-mai') || c.slug.includes('so-cap'));
            }
        }

        if (sortBy === 'duration-asc') {
            result.sort((a, b) => (a.duration_weeks ?? 0) - (b.duration_weeks ?? 0));
        } else if (sortBy === 'popular') {
            result.sort((a, b) => (b.sort_order ?? 0) - (a.sort_order ?? 0));
        } else {
            result.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
        }

        return result;
    }, [courses, selectedLevels, selectedFormat, sortBy]);

    const formats = [
        { key: 'all', label: t('modeAll') },
        { key: 'online', label: t('modeOnline') },
        { key: 'video', label: t('modeVideo') },
    ];

    return (
        <div className="w-full">
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
            />
            {courseLDs.map((ld, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
                />
            ))}

            {/* Hero */}
            <CoursesHero />

            {/* Mobile Chip Filter */}
            <CourseMobileFilter selectedLevels={selectedLevels} onToggle={handleLevelToggle} />

            {/* Main content */}
            <section className="container pb-24 px-4 md:px-0">
                <div className="grid gap-8 lg:grid-cols-[280px_1fr] max-w-[1400px] mx-auto items-start">
                    {/* Sidebar Filters */}
                    <CourseFilters
                        selectedLevels={selectedLevels}
                        onLevelToggle={handleLevelToggle}
                        selectedFormat={selectedFormat}
                        onFormatChange={setSelectedFormat}
                        formats={formats}
                        counts={counts}
                    />

                    {/* Course List */}
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                            <h2 className="text-headline-lg font-bold text-[var(--color-on-background)]">
                                {t('list')}
                            </h2>
                            <div className="flex items-center gap-3">
                                <span className="text-label-lg text-[var(--color-on-surface-variant)] shrink-0 font-medium">
                                    {t('sortBy')}:
                                </span>
                                <Select
                                    value={sortBy}
                                    onChange={setSortBy}
                                    className="min-w-[180px] py-2"
                                    options={[
                                        { value: 'newest', label: t('sortNewest') },
                                        { value: 'duration-asc', label: t('sortDurationAsc') },
                                        { value: 'popular', label: t('sortPopular') },
                                    ]}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {filteredCourses.map((c) => (
                                <CourseCard
                                    key={c.id ?? c.slug}
                                    course={c}
                                    locale={locale}
                                    isFav={!!favorites[c.slug]}
                                    onToggleFav={() => toggleFavorite(c.slug)}
                                />
                            ))}

                            {/* Upcoming placeholder card */}
                            <div className="group bg-[var(--color-surface-container-low)] rounded-3xl overflow-hidden coral-shadow border-2 border-dashed border-[var(--color-primary)]/20 flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
                                <div className="w-20 h-20 bg-[var(--color-primary-container)]/30 rounded-full flex items-center justify-center mb-6">
                                    <Award className="w-10 h-10 text-[var(--color-primary)]" />
                                </div>
                                <h3 className="text-title-md font-bold text-[var(--color-on-background)] mb-4">
                                    {t('upcomingTitle')}
                                </h3>
                                <p className="text-[var(--color-on-surface-variant)] text-body-md max-w-xs mb-8">
                                    {t('upcomingDesc')}
                                </p>
                                <Link href="/contact">
                                    <Button variant="outlined" className="px-8 py-3 rounded-full hover:bg-[var(--color-primary)] hover:text-white transition-all">
                                        {t('notifyMe')}
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="mt-16 flex justify-center items-center gap-3">
                            <button
                                aria-label="Previous page"
                                className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--color-surface-container-lowest)] border border-[var(--color-border)] coral-shadow hover:text-[var(--color-primary)] text-[var(--color-on-surface)] transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--color-primary)] text-white font-bold coral-shadow">1</button>
                            <button className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--color-surface-container-lowest)] border border-[var(--color-border)] coral-shadow hover:text-[var(--color-primary)] text-[var(--color-on-surface)] transition-colors font-bold">2</button>
                            <button className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--color-surface-container-lowest)] border border-[var(--color-border)] coral-shadow hover:text-[var(--color-primary)] text-[var(--color-on-surface)] transition-colors font-bold">3</button>
                            <button
                                aria-label="Next page"
                                className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--color-surface-container-lowest)] border border-[var(--color-border)] coral-shadow hover:text-[var(--color-primary)] text-[var(--color-on-surface)] transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
