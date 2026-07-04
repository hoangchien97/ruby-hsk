import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';

interface SectionBadgeProps {
    children: ReactNode;
    icon?: ReactNode;
    className?: string;
}

/**
 * SectionBadge — pill-shaped badge used across section headers.
 * Example: "Chinh phục HSK cùng Ruby", "Lộ trình học tập chuyên sâu"
 */
export function SectionBadge({ children, icon, className }: SectionBadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-2 px-4 py-1.5 rounded-full',
                'bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)]',
                'font-bold text-label-lg',
                className,
            )}
        >
            {icon ?? <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />}
            {children}
        </span>
    );
}
