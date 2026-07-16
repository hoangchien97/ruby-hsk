import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { LogoIcon } from '@/components/logo/logo-icon';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ComingSoon' });
  return {
    title: t('title'),
    robots: { index: false, follow: false },
  };
}

export default async function ComingSoonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('ComingSoon');
  const tCommon = await getTranslations('Common');
  return (
    <section className="app-section min-h-[65vh] flex items-center justify-center">
      <div className="app-container flex justify-center">
        <div className="glass-card max-w-xl rounded-[2rem] p-10 text-center">
          <LogoIcon className="mx-auto h-20 w-20" />
          <h1 className="mt-6 text-4xl font-black text-[var(--color-title)]">{t('title')}</h1>
          <p className="mt-4 text-[var(--color-muted)]">{t('sub')}</p>
          <Link href="/">
            <Button className="mt-6">{tCommon('backHome')}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
