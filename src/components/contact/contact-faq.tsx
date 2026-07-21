'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export function ContactFaq() {
  const t = useTranslations('Contact');
  const [openIds, setOpenIds] = useState<string[]>(['q1']);

  const faqKeys = ['q1', 'q2', 'q3', 'q4'];

  const toggleId = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="app-section pt-0">
      <div className="app-container">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* FAQ Section Header */}
          <ScrollReveal className="text-center space-y-3">
            <h2 className="text-headline-lg md:text-display-sm text-[var(--color-on-surface)]">
              {t('faqTitle')}
            </h2>
            <p className="text-body-lg text-[var(--color-on-surface-variant)] max-w-xl mx-auto">
              {t('faqSub')}
            </p>
          </ScrollReveal>

          {/* FAQ List */}
          <ScrollReveal className="space-y-4">
            {faqKeys.map((key) => {
              const answerKey = `a${key.slice(1)}`;
              const isOpen = openIds.includes(key);

              return (
                <div
                  key={key}
                  className={cn(
                    'border border-[var(--color-surface-variant)] rounded-[var(--radius-2xl)] bg-[var(--color-surface-container-low)] overflow-hidden transition-all duration-300 shadow-[var(--shadow-soft)]',
                    isOpen && 'border-[var(--color-outline-variant)] shadow-[var(--shadow-card)]'
                  )}
                >
                  <button
                    onClick={() => toggleId(key)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 transition-colors duration-200"
                    aria-expanded={isOpen}
                  >
                    <span className="text-body-lg font-bold text-[var(--color-on-surface)] transition-colors hover:text-[var(--color-primary)] duration-200">
                      {t(`faqs.${key}` as any)}
                    </span>
                    <ChevronDown
                      className={cn(
                        'w-5 h-5 text-[var(--color-on-surface-variant)] transition-transform duration-300 shrink-0 ml-4',
                        isOpen && 'rotate-180 text-[var(--color-primary)]'
                      )}
                    />
                  </button>

                  <div
                    className={cn(
                      'grid transition-[grid-template-rows] duration-300 ease-in-out',
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 text-body-md text-[var(--color-on-surface-variant)] leading-relaxed">
                        {t(`faqs.${answerKey}` as any)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
