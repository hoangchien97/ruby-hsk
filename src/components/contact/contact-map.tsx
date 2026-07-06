'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { School, ExternalLink, Check, Copy } from 'lucide-react';
import { Contact as SiteContact } from '@/lib/constants/site';

export function ContactMap({ locale }: { locale: string }) {
  const t = useTranslations('Contact');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const addressText = locale === 'vi' ? SiteContact.address : SiteContact.addressEn;
    navigator.clipboard.writeText(addressText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="container pb-16">
      <div className="rounded-[2.5rem] overflow-hidden shadow-[var(--shadow-card)] h-[550px] relative border border-[var(--color-outline-variant)]/30 group">
        {/* Iframe element */}
        <iframe
          src="https://maps.google.com/maps?cid=10357135247248641986&output=embed&hl=vi"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full grayscale-[15%] contrast-[110%] brightness-[95%]"
        />

        {/* Floating Info Panel */}
        <div className="absolute bottom-6 left-6 z-10 glass-card p-6 md:p-8 rounded-[2rem] max-w-sm border-l-8 border-[var(--color-primary)] shadow-2xl transition-all duration-300 md:translate-y-2 group-hover:translate-y-0 select-none">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
              <School className="w-5 h-5" />
            </div>
            <p className="text-title-md text-[var(--color-primary)] font-bold">
              {t('mapTitle')}
            </p>
          </div>

          <p className="text-body-md text-[var(--color-on-surface)] mb-5 leading-relaxed font-semibold">
            {locale === 'vi' ? SiteContact.address : SiteContact.addressEn}
          </p>

          <div className="flex gap-3">
            <a
              href="https://maps.google.com/maps?cid=10357135247248641986"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--color-primary)] text-[var(--color-on-primary)] px-4 py-2.5 rounded-xl text-label-lg font-semibold flex items-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-md cursor-pointer"
            >
              <span>{t('mapDirections')}</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={handleCopy}
              className="bg-white/80 dark:bg-black/20 text-[var(--color-primary)] border border-[var(--color-primary)]/20 px-4 py-2.5 rounded-xl text-label-lg font-semibold hover:bg-[var(--color-primary)]/5 active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  <span>{t('mapSaved')}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{t('mapSaveAddress')}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
