import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export type BadgeVariant = 'primary' | 'secondary' | 'tertiary' | 'surface' | 'outline';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
}

/**
 * Pill badge — Stitch spec: fully rounded, uppercase, bold, small
 * Used for HSK level tags, course categories
 */
export function Badge({ className, variant = 'primary', ...props }: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider',
                variant === 'primary' &&
                'bg-[var(--color-primary)] text-white',
                variant === 'secondary' &&
                'bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)]',
                variant === 'tertiary' &&
                'bg-[var(--color-tertiary)] text-white',
                variant === 'surface' &&
                'bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)]',
                variant === 'outline' &&
                'border border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent',
                className,
            )}
            {...props}
        />
    );
}
