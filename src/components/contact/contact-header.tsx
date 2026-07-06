import { useTranslations } from 'next-intl';
import { MessageSquareMore } from 'lucide-react';

export function ContactHeader() {
  const t = useTranslations('Contact');

  return (
    <section className="container pt-12 pb-8">
      <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-secondary-container)] px-4 py-1 text-label-lg text-[var(--color-on-secondary-container)] font-bold mb-4">
        <MessageSquareMore className="w-4 h-4 text-[var(--color-primary)]" /> {t('consultationBadge')}
      </span>
      <h1 className="text-headline-lg md:text-[40px] font-bold text-[var(--color-on-background)] max-w-xl">
        {t('title')}
      </h1>
      <p className="mt-3 max-w-xl text-body-lg text-[var(--color-on-surface-variant)]">
        {t('sub')}
      </p>
    </section>
  );
}
