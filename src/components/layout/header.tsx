import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {LogoIcon} from '@/components/logo/logo-icon';
import {LanguageToggle} from './language-toggle';
import {ThemeToggle} from './theme-toggle';
import {Button} from '@/components/ui/button';

export function Header() {
  const t = useTranslations('Nav');
  const nav = [
    {href: '/', label: t('home')},
    {href: '/courses', label: t('courses')},
    {href: '/about', label: t('about')},
    {href: '/contact', label: t('contact')}
  ];

  return (
    <header className="sticky top-4 z-40 px-4">
      <div className="container flex items-center justify-between rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface-glass)] px-4 py-3 shadow-sm backdrop-blur-xl">
        <Link href="/" aria-label="Ruby HSK home"><LogoIcon /></Link>
        <nav className="hidden items-center gap-7 text-sm font-bold text-[var(--color-muted)] md:flex">
          {nav.map((item) => <Link key={item.href} href={item.href} className="hover:text-[var(--color-primary)]">{item.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <Link href="/contact" className="hidden md:inline-flex"><Button>{t('start')}</Button></Link>
        </div>
      </div>
    </header>
  );
}
