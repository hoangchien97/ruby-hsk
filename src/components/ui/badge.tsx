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
                'inline-flex items-center gap-1 rounded-full px-3 py-1 text-label-sm font-bold uppercase tracking-wider',
                variant === 'primary' &&
                'bg-[var(--color-primary)] text-[var(--color-on-primary)]',
                variant === 'secondary' &&
                'bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)]',
                variant === 'tertiary' &&
                'bg-[var(--color-tertiary)] text-[var(--color-on-tertiary)]',
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
