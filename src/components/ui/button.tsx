import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'ghost' | 'inverted';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
}

/** Pill-shaped button — Stitch Vibrant Academic Ivory spec */
export function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base — pill shape, font, transition
        'focus-ring inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:pointer-events-none',
        // Sizes — height-based scale, all meet the 44px mobile touch-target minimum
        size === 'sm' && 'h-11 px-5 text-label-sm',
        size === 'md' && 'h-12 px-6 text-label-lg',
        size === 'lg' && 'h-14 px-8 text-body-md',
        // Variants (matching Stitch)
        variant === 'primary' &&
        'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-[var(--shadow-soft)] hover:scale-105 hover:shadow-[var(--shadow-button)]',
        variant === 'secondary' &&
        'border-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent hover:bg-[var(--color-primary-fixed)]',
        variant === 'outlined' &&
        'border border-[var(--color-outline-variant)] text-[var(--color-on-surface-variant)] bg-[var(--color-surface-container-lowest)] hover:bg-[var(--color-surface-container)]',
        variant === 'ghost' &&
        'text-[var(--color-primary)] hover:bg-[var(--color-primary-fixed)]',
        // 'inverted' intentionally stays literal white — it's for buttons placed on a
        // saturated primary/coral gradient background (e.g. CTA banners), where the
        // button must read as a bright chip regardless of light/dark theme.
        variant === 'inverted' &&
        'bg-white text-[var(--color-primary)] hover:bg-[var(--color-primary-fixed)]',
        className,
      )}
      {...props}
    />
  );
}
