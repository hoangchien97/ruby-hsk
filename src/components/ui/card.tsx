import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'white' | 'surface' | 'glass' | 'primary';
    hover?: boolean;
}

/**
 * Card component — Stitch spec:
 * - white background, rounded-2xl, coral-tinted soft shadow
 * - hover: -translate-y-2 lift
 */
export function Card({ className, variant = 'white', hover = false, ...props }: CardProps) {
    return (
        <div
            className={cn(
                'rounded-[var(--radius-2xl)] border transition-all duration-300',
                // Variants
                variant === 'white' &&
                'bg-[var(--color-surface-container-lowest)] border-[var(--color-border)] coral-shadow',
                variant === 'surface' &&
                'bg-[var(--color-surface-container)] border-[var(--color-border)]',
                variant === 'glass' &&
                'glass-card',
                variant === 'primary' &&
                'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-xl',
                // Hover lift
                hover && 'hover:-translate-y-2 hover:shadow-xl',
                className,
            )}
            {...props}
        />
    );
}
