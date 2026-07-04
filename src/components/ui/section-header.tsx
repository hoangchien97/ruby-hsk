import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
    badge?: string;
    title: string;
    description?: string;
    align?: 'left' | 'center';
}

/**
 * Reusable section header — badge + title + description.
 * Extracts the repeated pattern from about/methodology/courses page headers.
 */
export function SectionHeader({
    badge,
    title,
    description,
    align = 'left',
    className,
    ...props
}: SectionHeaderProps) {
    return (
        <div
            className={cn(
                align === 'center' && 'text-center mx-auto',
                align === 'center' ? 'max-w-2xl' : 'max-w-3xl',
                className,
            )}
            {...props}
        >
            {badge && (
                <span className="text-label-lg font-bold tracking-widest text-[var(--color-secondary)] uppercase block mb-2">
                    {badge}
                </span>
            )}
            <h2 className="text-headline-lg md:text-[40px] font-bold text-[var(--color-on-surface)] mb-4 leading-tight">
                {title}
            </h2>
            {description && (
                <p className="text-body-lg text-[var(--color-on-surface-variant)] leading-relaxed">
                    {description}
                </p>
            )}
        </div>
    );
}
