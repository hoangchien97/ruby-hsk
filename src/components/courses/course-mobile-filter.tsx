'use client';

import { useTranslations } from 'next-intl';

interface CourseMobileFilterProps {
    selectedLevels: string[];
    onToggle: (key: string) => void;
}

export function CourseMobileFilter({
    selectedLevels,
    onToggle,
}: CourseMobileFilterProps) {
    const t = useTranslations('Courses');

    const chips = [
        { key: 'all', label: t('modeAll') },
        { key: 'hsk-1-2', label: 'HSK 1-2' },
        { key: 'hsk-3-4', label: 'HSK 3-4' },
        { key: 'hsk-5-6', label: 'HSK 5-6' },
    ];

    return (
        <section className="block md:hidden mb-6 px-2">
            <div className="flex gap-3 overflow-x-auto px-4 py-2 scrollbar-none">
                {chips.map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => onToggle(key)}
                        className={`flex-none px-6 py-2 rounded-full font-bold text-label-lg transition-all ${selectedLevels.includes(key)
                            ? 'bg-[var(--color-primary)] text-white shadow-[0_4px_10px_rgba(181,35,48,0.25)]'
                            : 'bg-white border border-[var(--color-border)] text-[var(--color-on-surface-variant)] hover:bg-[var(--color-primary-container)]/10'
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `.scrollbar-none::-webkit-scrollbar{display:none}.scrollbar-none{-ms-overflow-style:none;scrollbar-width:none}`,
            }} />
        </section>
    );
}
