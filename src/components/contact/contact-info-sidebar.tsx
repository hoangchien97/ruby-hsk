'use client';

import { useTranslations } from 'next-intl';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Contact as SiteContact } from '@/lib/constants/site';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export function ContactInfoSidebar({ locale }: { locale: string }) {
  const t = useTranslations('Contact');

  return (
    <ScrollReveal className="flex flex-col gap-4 h-full">
      {/* Hotline Card */}
      <a
        href={`tel:${SiteContact.phoneTel}`}
        className="bg-[var(--color-surface-glass)] backdrop-blur-md p-4 md:p-6 lg:p-8 rounded-[var(--radius-3xl)] flex items-start gap-3 md:gap-4 hover:translate-y-[-4px] transition-transform shadow-[var(--shadow-coral)] border border-l-4 border-[var(--color-primary)]"
      >
        <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-[var(--color-primary)]/10 rounded-[var(--radius-xl)] lg:rounded-[var(--radius-2xl)] flex items-center justify-center text-[var(--color-primary)] shrink-0">
          <Phone className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </div>
        <div>
          <p className="text-label-sm text-[var(--color-on-surface-variant)] uppercase tracking-wider mb-1">
            {t('labelPhone')}
          </p>
          <p className="text-body-md font-bold text-[var(--color-on-surface)]">
            {SiteContact.phone}
          </p>
          <p className="text-label-sm text-[var(--color-on-surface-variant)] mt-2">
            {t('labelPhoneSub')}
          </p>
        </div>
      </a>

      {/* Email Card */}
      <a
        href={`mailto:${SiteContact.email}`}
        className="bg-[var(--color-surface-glass)] backdrop-blur-md p-4 md:p-6 lg:p-8 rounded-[var(--radius-3xl)] flex items-start gap-3 md:gap-4 hover:translate-y-[-4px] transition-transform shadow-[var(--shadow-coral)] border border-l-4 border-[var(--color-tertiary)]"
      >
        <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-[var(--color-tertiary)]/10 rounded-[var(--radius-xl)] lg:rounded-[var(--radius-2xl)] flex items-center justify-center text-[var(--color-tertiary)] shrink-0">
          <Mail className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-label-sm text-[var(--color-on-surface-variant)] uppercase tracking-wider mb-1">
            {t('labelEmail')}
          </p>
          <p className="text-body-md font-bold text-[var(--color-on-surface)] truncate">
            {SiteContact.email}
          </p>
          <p className="text-label-sm text-[var(--color-on-surface-variant)] mt-2">
            {t('labelEmailSub')}
          </p>
        </div>
      </a>

      {/* Address Card */}
      <div className="bg-[var(--color-surface-glass)] backdrop-blur-md p-4 md:p-6 lg:p-8 rounded-[var(--radius-3xl)] flex items-start gap-3 md:gap-4 hover:translate-y-[-4px] transition-transform shadow-[var(--shadow-coral)] border border-l-4 border-[var(--color-secondary)]">
        <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-[var(--color-secondary)]/10 rounded-[var(--radius-xl)] lg:rounded-[var(--radius-2xl)] flex items-center justify-center text-[var(--color-secondary)] shrink-0">
          <MapPin className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </div>
        <div>
          <p className="text-label-sm text-[var(--color-on-surface-variant)] uppercase tracking-wider mb-1">
            {t('labelAddress')}
          </p>
          <p className="text-body-md font-bold text-[var(--color-on-surface)] leading-snug">
            {locale === 'vi' ? SiteContact.address : SiteContact.addressEn}
          </p>
          <p className="text-label-sm text-[var(--color-on-surface-variant)] mt-2">
            {t('labelAddressSub')}
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
}
