import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    /** Narrow variant caps at 900px instead of 1400px */
    size?: 'default' | 'narrow' | 'wide';
}

/**
 * Responsive container — consistent max-width + px across all pages.
 * Single source of truth for page gutters.
 */
export function Container({ className, size = 'default', ...props }: ContainerProps) {
    return (
        <div
            className={cn(
                'mx-auto w-full px-4',
                size === 'narrow' && 'max-w-[900px]',
                size === 'default' && 'max-w-[1400px]',
                size === 'wide' && 'max-w-[1600px]',
                className,
            )}
            {...props}
        />
    );
}
