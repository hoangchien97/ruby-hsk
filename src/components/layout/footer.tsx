import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LogoIcon } from '@/components/logo/logo-icon';
import { Contact, NavLinks } from '@/lib/constants/site';
import { Mail, Phone, MapPin } from 'lucide-react';
import { NewsletterForm } from './newsletter-form';

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Nav');
  const tContact = useTranslations('Contact');
  const year = new Date().getFullYear();

  const courseLinks = [
    { label: t('linkHsk12'), href: NavLinks.courses },
    { label: t('linkHsk34'), href: NavLinks.courses },
    { label: t('linkHsk56'), href: NavLinks.courses },
    { label: t('linkAllCourses'), href: NavLinks.courses },
  ];

  const faqLinks = [
    { label: tContact('faqs.q1'), href: NavLinks.contact },
    { label: tContact('faqs.q2'), href: NavLinks.contact },
    { label: tContact('faqs.q3'), href: NavLinks.contact },
    { label: tContact('faqs.q4'), href: NavLinks.contact },
  ];

  return (
    <footer className="w-full border-t border-[var(--color-surface-variant)] bg-[var(--color-surface-container-low)] py-16">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-3 max-w-xs space-y-4">
            <div className="flex items-center gap-3">
              <LogoIcon className="h-10 w-10" />
              <span className="text-headline-lg font-bold text-[var(--color-primary)]">Ruby HSK</span>
            </div>
            <p className="text-body-md text-[var(--color-on-surface-variant)]">
              {t('tagline')}
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              <a
                href={Contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--color-primary)] shadow-sm transition-transform hover:scale-110 coral-shadow"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={Contact.zalo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zalo"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-110 coral-shadow overflow-hidden p-0"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
                  alt="Zalo"
                  className="w-6 h-6 object-contain"
                />
              </a>
              <a
                href={`mailto:${Contact.email}`}
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--color-primary)] shadow-sm transition-transform hover:scale-110 coral-shadow"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Khóa học */}
          <div className="md:col-span-2">
            <FooterGroup title={tNav('courses')} links={courseLinks} />
          </div>

          {/* Liên hệ */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-title-md font-semibold text-[var(--color-on-surface)]">{tNav('contact')}</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${Contact.phoneTel}`}
                  className="flex items-center gap-2 text-label-lg text-[var(--color-on-surface-variant)] transition-colors hover:text-[var(--color-primary)]"
                >
                  <Phone className="h-4 w-4 text-[var(--color-primary)] shrink-0" />
                  {Contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${Contact.email}`}
                  className="flex items-center gap-2 text-label-lg text-[var(--color-on-surface-variant)] transition-colors hover:text-[var(--color-primary)]"
                >
                  <Mail className="h-4 w-4 text-[var(--color-primary)] shrink-0" />
                  {Contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-label-lg text-[var(--color-on-surface-variant)]">
                <MapPin className="h-4 w-4 text-[var(--color-primary)] shrink-0 mt-0.5" />
                <span>{locale === 'vi' ? Contact.address : Contact.addressEn}</span>
              </li>
            </ul>
          </div>

          {/* Đăng ký nhận ưu đãi */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-title-md font-semibold text-[var(--color-on-surface)]">{t('newsletterTitle')}</h4>
            <p className="text-label-lg text-[var(--color-on-surface-variant)]">{t('newsletterDesc')}</p>
            <NewsletterForm locale={locale} />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-[var(--color-surface-variant)]/30 pt-8 text-center">
          <p className="text-label-lg text-[var(--color-on-surface-variant)]/60">
            {t('copyright', { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── FooterGroup sub-component ──────────────────────────────────────
function FooterGroup({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="space-y-4">
      <h4 className="text-title-md font-semibold text-[var(--color-on-surface)]">{title}</h4>
      <ul className="space-y-3">
        {links.map((l, idx) => (
          <li key={l.href + idx}>
            <Link
              href={l.href}
              className="text-label-lg text-[var(--color-on-surface-variant)] transition-colors hover:text-[var(--color-primary)]"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
