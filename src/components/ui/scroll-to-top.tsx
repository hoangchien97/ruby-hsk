'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * ScrollToTop — appears after the user scrolls 400px down.
 * Uses cubic-bezier easing for a premium, spring-like entrance.
 */
export function ScrollToTop() {
    const t = useTranslations('Common');
    const [visible, setVisible] = useState(false);

    const handleScroll = useCallback(() => {
        setVisible(window.scrollY > 400);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label={t('scrollToTop')}
            className={[
                // bottom-72 (288px) clears the FloatingContact stack (3×44px buttons
                // + gaps, starting at bottom-28/112px) so the two floating groups never overlap on mobile.
                'fixed bottom-72 right-5 md:bottom-8 md:right-8 z-50',
                'w-11 h-11 rounded-full',
                'bg-[var(--color-primary)] text-white',
                'shadow-[var(--shadow-button)]',
                'border border-white/20',
                'flex items-center justify-center',
                'hover:scale-110 active:scale-95',
                'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-primary)]/40',
                // Smoother cubic-bezier spring transition
                'transition-[opacity,transform,box-shadow] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
                visible
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-6 pointer-events-none',
            ].join(' ')}
        >
            <ArrowUp className="w-4 h-4 md:w-5 md:h-5 stroke-[2.5]" />
        </button>
    );
}
