import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';

export type IconBoxSize = 'sm' | 'md' | 'lg';
export type IconBoxColor = 'primary' | 'secondary' | 'tertiary' | 'amber' | 'indigo' | 'custom';

interface IconBoxProps extends HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  size?: IconBoxSize;
  color?: IconBoxColor;
}

const sizeMap: Record<IconBoxSize, { box: string; icon: string }> = {
  sm: { box: 'w-10 h-10 rounded-[var(--radius-xl)]', icon: 'w-5 h-5' },
  md: { box: 'w-12 h-12 rounded-[var(--radius-2xl)]', icon: 'w-6 h-6' },
  lg: { box: 'w-14 h-14 rounded-[var(--radius-2xl)]', icon: 'w-7 h-7' },
};

const colorMap: Record<Exclude<IconBoxColor, 'custom'>, string> = {
  primary: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
  secondary: 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]',
  tertiary: 'bg-[var(--color-tertiary)]/10 text-[var(--color-tertiary)]',
  amber: 'bg-amber-500/10 text-amber-600',
  indigo: 'bg-indigo-500/10 text-indigo-600',
};

/**
 * Icon container box — consistent size + tinted background.
 * Frequently used in feature grids, methodology cards, etc.
 */
export function IconBox({ icon: Icon, size = 'md', color = 'primary', className, ...props }: IconBoxProps) {
  const s = sizeMap[size];
  return (
    <div
      className={cn(
        'flex items-center justify-center shrink-0',
        s.box,
        color !== 'custom' && colorMap[color],
        className,
      )}
      {...props}
    >
      <Icon className={s.icon} />
    </div>
  );
}
