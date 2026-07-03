import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {LogoIcon} from '@/components/logo/logo-icon';

export function Footer() {
  const t = useTranslations('Nav');
  return (
    <footer className="mt-20 border-t border-[var(--color-border)] bg-[var(--color-surface-glass)] py-10">
      <div className="container grid gap-8 md:grid-cols-4">
        <div><LogoIcon /><p className="mt-4 text-sm text-[var(--color-muted)]">Ruby HSK - Chinese learning and HSK preparation with a warm, structured pathway.</p></div>
        <div><h3 className="font-bold text-[var(--color-title)]">Trang</h3><div className="mt-3 grid gap-2 text-sm text-[var(--color-muted)]"><Link href="/">{t('home')}</Link><Link href="/courses">{t('courses')}</Link><Link href="/about">{t('about')}</Link><Link href="/contact">{t('contact')}</Link></div></div>
        <div><h3 className="font-bold text-[var(--color-title)]">Học tiếng Trung</h3><div className="mt-3 grid gap-2 text-sm text-[var(--color-muted)]"><span>HSK 1-2</span><span>HSK 3-4</span><span>HSK 5-6</span><span>Tiếng Trung giao tiếp</span></div></div>
        <div><h3 className="font-bold text-[var(--color-title)]">Pháp lý</h3><div className="mt-3 grid gap-2 text-sm text-[var(--color-muted)]"><Link href="/privacy">{t('privacy')}</Link><Link href="/terms">{t('terms')}</Link></div></div>
      </div>
    </footer>
  );
}
