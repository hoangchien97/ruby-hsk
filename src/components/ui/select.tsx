import { cn } from '@/lib/utils';
import type { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
}

/**
 * Select — Stitch Vibrant Academic Ivory design system
 * Matches Input field styling: coral focus ring, rounded-2xl, border-outline-variant
 */
export function Select({ label, error, id, className, options, ...props }: SelectProps) {
    return (
        <div className="grid gap-1.5">
            {label && (
                <label htmlFor={id} className="text-label-lg text-[var(--color-on-surface)] font-semibold">
                    {label}
                </label>
            )}
            <select
                id={id}
                className={cn(
                    'w-full rounded-[var(--radius-2xl)] border border-[var(--color-outline-variant)]',
                    'bg-white dark:bg-black/20 px-4 py-3 text-body-md text-[var(--color-on-surface)]',
                    'transition-all focus:border-[var(--color-primary)] focus:outline-none',
                    'focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-primary)_20%,transparent)]',
                    'cursor-pointer appearance-none',
                    error && 'border-[var(--color-error)] focus:ring-[var(--color-error-container)]',
                    className,
                )}
                {...props}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-label-sm text-[var(--color-error)]">{error}</p>}
        </div>
    );
}
