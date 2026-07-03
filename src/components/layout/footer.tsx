import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LogoIcon } from '@/components/logo/logo-icon';
import { Contact, NavLinks } from '@/lib/constants/site';
import { Mail } from 'lucide-react';

export function Footer() {
  const t = useTranslations('Nav');
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[var(--color-surface-variant)] bg-[var(--color-surface-container-low)] py-16">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          {/* Brand */}
          <div className="max-w-xs space-y-4">
            <div className="flex items-center gap-3">
              <LogoIcon className="h-10 w-10" />
              <span className="text-headline-lg font-bold text-[var(--color-primary)]">Ruby HSK</span>
            </div>
            <p className="text-body-md text-[var(--color-on-surface-variant)]">
              Hành trình chinh phục HSK của bạn trở nên dễ dàng và thú vị hơn cùng đội ngũ giáo viên tận tâm.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              <a
                href={Contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--color-primary)] shadow-sm transition-transform hover:scale-110 coral-shadow"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a
                href={Contact.zalo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zalo"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--color-primary)] shadow-sm transition-transform hover:scale-110 coral-shadow"
              >
                <span className="text-xs font-black">Zalo</span>
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

          {/* Links */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:gap-20">
            <FooterGroup title="Học tập" links={[
              { label: 'Khóa học HSK 1-2', href: NavLinks.courses },
              { label: 'Khóa học HSK 3-4', href: NavLinks.courses },
              { label: 'Khóa học HSK 5-6', href: NavLinks.courses },
            ]} />
            <FooterGroup title="Cộng đồng" links={[
              { label: t('about'), href: NavLinks.about },
              { label: 'Đánh giá học viên', href: NavLinks.about },
              { label: t('contact'), href: NavLinks.contact },
            ]} />
            <FooterGroup title="Hỗ trợ" links={[
              { label: t('privacy'), href: NavLinks.privacy },
              { label: t('terms'), href: NavLinks.terms },
              { label: 'Liên hệ', href: NavLinks.contact },
            ]} />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-[var(--color-surface-variant)]/30 pt-8 text-center">
          <p className="text-label-lg text-[var(--color-on-surface-variant)]/60">
            © {year} Ruby HSK. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="space-y-4">
      <h4 className="text-title-md font-semibold text-[var(--color-on-surface)]">{title}</h4>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.href + l.label}>
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
