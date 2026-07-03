import {cn} from '@/lib/utils';
import type {ButtonHTMLAttributes} from 'react';

export function Button({className, variant = 'primary', ...props}: ButtonHTMLAttributes<HTMLButtonElement> & {variant?: 'primary' | 'secondary' | 'ghost'}) {
  return <button className={cn(
    'focus-ring inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition active:scale-[0.98]',
    variant === 'primary' && 'bg-[var(--color-primary)] text-white shadow-[var(--shadow-button)] hover:bg-[var(--color-primary-hover)]',
    variant === 'secondary' && 'border border-[var(--color-border)] bg-[var(--color-surface-glass)] text-[var(--color-primary)] hover:bg-[var(--color-peach)]',
    variant === 'ghost' && 'text-[var(--color-primary)] hover:bg-[var(--color-peach)]',
    className
  )} {...props} />;
}
