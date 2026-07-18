'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const pages = React.useMemo(() => {
    const arr = [];
    for (let i = 1; i <= totalPages; i++) {
      arr.push(i);
    }
    return arr;
  }, [totalPages]);

  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex justify-center items-center gap-2 md:gap-3", className)}
    >
      <button
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="w-10 h-10 md:w-12 md:h-12 rounded-[var(--radius-xl)] flex items-center justify-center bg-[var(--color-surface-container-lowest)] border border-[var(--color-border)] shadow-[var(--shadow-button)] hover:text-[var(--color-primary)] text-[var(--color-on-surface)] disabled:opacity-50 disabled:pointer-events-none transition-colors"
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => onPageChange(page)}
            className={cn(
              "w-10 h-10 md:w-12 md:h-12 rounded-[var(--radius-xl)] flex items-center justify-center font-bold transition-all shadow-[var(--shadow-button)] text-sm md:text-base",
              isActive
                ? "bg-[var(--color-primary)] text-white"
                : "bg-[var(--color-surface-container-lowest)] border border-[var(--color-border)] hover:text-[var(--color-primary)] text-[var(--color-on-surface)]"
            )}
          >
            {page}
          </button>
        );
      })}

      <button
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="w-10 h-10 md:w-12 md:h-12 rounded-[var(--radius-xl)] flex items-center justify-center bg-[var(--color-surface-container-lowest)] border border-[var(--color-border)] shadow-[var(--shadow-button)] hover:text-[var(--color-primary)] text-[var(--color-on-surface)] disabled:opacity-50 disabled:pointer-events-none transition-colors"
      >
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
      </button>
    </nav>
  );
}
