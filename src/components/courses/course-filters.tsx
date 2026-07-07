'use client';

import { useTranslations } from 'next-intl';
import { Filter, Gift } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';

interface CourseFiltersProps {
    selectedLevels: string[];
    onLevelToggle: (level: string) => void;
    selectedFormat: string;
    onFormatChange: (fmt: string) => void;
    formats: { key: string; label: string }[];
    counts: Record<string, number>;
}

export function CourseFilters({
    selectedLevels,
    onLevelToggle,
    selectedFormat,
    onFormatChange,
    formats,
    counts,
}: CourseFiltersProps) {
    const t = useTranslations('Courses');

    const levels = [
        { key: 'hsk-1-2', label: 'HSK 1 - HSK 2' },
        { key: 'hsk-3-4', label: 'HSK 3 - HSK 4' },
        { key: 'hsk-5-6', label: 'HSK 5 - HSK 6' },
    ];

    return (
        <aside className="hidden md:block w-full space-y-6">
            <Card variant="white" className="p-8 rounded-2xl coral-shadow border border-[var(--color-surface-variant)]/30">
                <h3 className="text-title-md font-bold mb-6 flex items-center gap-2 text-[var(--color-on-surface)]">
                    <Filter className="w-5 h-5 text-[var(--color-primary)]" />
                    {t('filters')}
                </h3>

                {/* Level checkboxes */}
                <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={selectedLevels.includes('all')}
                            onChange={() => onLevelToggle('all')}
                            className="w-5 h-5 rounded-[6px] accent-[var(--color-primary)] cursor-pointer"
                        />
                        <span
                            className={`text-label-lg font-semibold transition-colors ${selectedLevels.includes('all')
                                ? 'text-[var(--color-primary)] font-bold'
                                : 'text-[var(--color-on-surface-variant)] group-hover:text-[var(--color-primary)]'
                                }`}
                        >
                            {t('allLevels')}
                        </span>
                    </label>

                    <div className="space-y-3 pl-1">
                        {levels.map(({ key, label }) => (
                            <label key={key} className="flex items-center justify-between cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedLevels.includes(key)}
                                        onChange={() => onLevelToggle(key)}
                                        className="w-5 h-5 rounded-[6px] accent-[var(--color-primary)] cursor-pointer"
                                    />
                                    <span
                                        className={`text-label-lg font-semibold transition-colors ${selectedLevels.includes(key)
                                            ? 'text-[var(--color-primary)] font-bold'
                                            : 'text-[var(--color-on-surface-variant)] group-hover:text-[var(--color-primary)]'
                                            }`}
                                    >
                                        {label}
                                    </span>
                                </div>
                                <span
                                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${selectedLevels.includes(key)
                                        ? 'bg-[var(--color-primary-container)] text-[var(--color-primary)]'
                                        : 'bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)]'
                                        }`}
                                >
                                    {counts[key] ?? 0}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Format filter */}
                <div className="mt-8 pt-8 border-t border-[var(--color-surface-variant)]/30">
                    <h3 className="text-title-md font-bold mb-4 text-[var(--color-on-surface)]">
                        {t('teachingMode')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {formats.map((f) => (
                            <button
                                key={f.key}
                                onClick={() => onFormatChange(f.key)}
                                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${selectedFormat === f.key
                                    ? 'bg-[var(--color-primary)] text-white shadow-sm'
                                    : 'bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-variant)]'
                                    }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Promo Banner */}
            <div className="bg-[var(--color-secondary-container)] p-8 rounded-2xl coral-shadow relative overflow-hidden group cursor-pointer border border-[var(--color-secondary-fixed-dim)]">
                <div className="relative z-10">
                    <h4 className="text-title-md font-bold text-[var(--color-on-secondary-container)] mb-2">
                        {t('promoTitle')}
                    </h4>
                    <p className="text-body-sm text-[var(--color-on-secondary-container)]/90 mb-6">
                        {t('promoDesc')}
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 font-bold text-[var(--color-primary)] hover:underline"
                    >
                        {t('promoAction')} <span className="text-lg">→</span>
                    </Link>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-15 group-hover:scale-110 transition-transform">
                    <Gift className="w-20 h-20 stroke-[1.25] text-[var(--color-primary)]" />
                </div>
            </div>
        </aside>
    );
}
