import { BookOpen, Sparkles } from 'lucide-react';

export function LogoIcon({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center rounded-[var(--radius-xl)] bg-[var(--color-primary-fixed)] text-[var(--color-primary)] shadow-[var(--shadow-soft)] ${className}`} aria-label="Ruby HSK logo">
      <BookOpen className="h-1/2 w-1/2" strokeWidth={2.4} />
      <Sparkles className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-white p-0.5 text-[var(--color-primary-container)]" />
      <span className="sr-only">Ruby HSK</span>
    </div>
  );
}
