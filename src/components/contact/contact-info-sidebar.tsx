import { useTranslations } from 'next-intl';
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react';
import { Contact as SiteContact } from '@/lib/constants/site';

export function ContactInfoSidebar({ locale }: { locale: string }) {
  const t = useTranslations('Contact');

  return (
    <div className="flex flex-col gap-6 h-full justify-between">
      {/* Hotline Card */}
      <a
        href={`tel:${SiteContact.phoneTel}`}
        className="glass-card p-6 rounded-[2rem] flex items-start gap-4 hover:translate-y-[-4px] transition-all cursor-pointer shadow-[var(--shadow-card)]"
      >
        <div className="w-14 h-14 bg-[var(--color-primary)]/10 rounded-2xl flex items-center justify-center text-[var(--color-primary)] shrink-0">
          <Phone className="w-6 h-6" />
        </div>
        <div>
          <p className="text-label-sm text-[var(--color-on-surface-variant)] uppercase tracking-wider mb-1">
            {t('labelPhone')}
          </p>
          <p className="text-title-md font-bold text-[var(--color-on-surface)]">
            {SiteContact.phone}
          </p>
          <p className="text-xs text-[var(--color-on-surface-variant)] mt-2">
            {t('labelPhoneSub')}
          </p>
        </div>
      </a>

      {/* Email Card */}
      <a
        href={`mailto:${SiteContact.email}`}
        className="glass-card p-6 rounded-[2rem] flex items-start gap-4 hover:translate-y-[-4px] transition-all cursor-pointer shadow-[var(--shadow-card)] border-l-4 border-[var(--color-tertiary)]"
      >
        <div className="w-14 h-14 bg-[var(--color-tertiary)]/10 rounded-2xl flex items-center justify-center text-[var(--color-tertiary)] shrink-0">
          <Mail className="w-6 h-6" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-label-sm text-[var(--color-on-surface-variant)] uppercase tracking-wider mb-1">
            {t('labelEmail')}
          </p>
          <p className="text-title-md font-bold text-[var(--color-on-surface)] truncate">
            {SiteContact.email}
          </p>
          <p className="text-xs text-[var(--color-on-surface-variant)] mt-2">
            {t('labelEmailSub')}
          </p>
        </div>
      </a>

      {/* Social / Quick connect Card */}
      <div className="glass-card p-6 rounded-[2rem] flex flex-col gap-4 shadow-[var(--shadow-card)] justify-center">
        <div>
          <p className="text-label-sm text-[var(--color-on-surface-variant)] uppercase tracking-wider mb-1">
            {t('labelQuickConnect')}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <a
            href={SiteContact.zalo}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0068ff]/10 p-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#0068ff]/20 transition-all text-[#0068ff] font-semibold"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span className="text-sm">Zalo</span>
          </a>
          <a
            href={SiteContact.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1877f2]/10 p-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#1877f2]/20 transition-all text-[#1877f2] font-semibold"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="text-sm">Facebook</span>
          </a>
        </div>
      </div>


      {/* Address Card */}
      <div className="glass-card p-6 rounded-[2rem] flex items-start gap-4 hover:translate-y-[-4px] transition-all cursor-pointer shadow-[var(--shadow-card)] border-l-4 border-[var(--color-peach)]">
        <div className="w-14 h-14 bg-[var(--color-primary-fixed)] rounded-2xl flex items-center justify-center text-[var(--color-primary)] shrink-0">
          <MapPin className="w-6 h-6" />
        </div>
        <div>
          <p className="text-label-sm text-[var(--color-on-surface-variant)] uppercase tracking-wider mb-1">
            {t('labelAddress')}
          </p>
          <p className="text-body-md font-bold text-[var(--color-on-surface)] leading-snug">
            {locale === 'vi' ? SiteContact.address : SiteContact.addressEn}
          </p>
          <p className="text-xs text-[var(--color-on-surface-variant)] mt-2">
            {t('labelAddressSub')}
          </p>
        </div>
      </div>
    </div>
  );
}
