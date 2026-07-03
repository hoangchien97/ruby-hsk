import {BookOpen, Sparkles} from 'lucide-react';

export function LogoIcon({className = 'h-10 w-10'}: {className?: string}) {
  return (
    <div className={`relative inline-flex items-center justify-center rounded-2xl bg-[#FCE8DE] text-[#804237] shadow-sm ${className}`} aria-label="Ruby HSK logo">
      <BookOpen className="h-1/2 w-1/2" strokeWidth={2.4} />
      <Sparkles className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-white p-0.5 text-[#E78F65]" />
      <span className="sr-only">Ruby HSK</span>
    </div>
  );
}
