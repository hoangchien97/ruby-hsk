import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface DividerProps extends HTMLAttributes<HTMLHRElement> {
    /** Visual spacing around the line */
    spacing?: 'sm' | 'md' | 'lg';
}

/**
 * Themed horizontal divider using design tokens.
 */
export function Divider({ className, spacing = 'md', ...props }: DividerProps) {
    return (
        <hr
            className={cn(
                'border-t border-[var(--color-surface-variant)]/40',
                spacing === 'sm' && 'my-4',
                spacing === 'md' && 'my-8',
                spacing === 'lg' && 'my-12',
                className,
            )}
            {...props}
        />
    );
}
