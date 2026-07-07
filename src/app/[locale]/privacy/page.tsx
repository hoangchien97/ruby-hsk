import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LegalPage } from '@/components/legal/legal-page';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Legal' });
    const path = '/privacy';
    return {
        title: t('privacy'),
        description: t('privacyDesc'),
        alternates: {
            canonical: `/${locale}${path}`,
            languages: { vi: `/vi${path}`, en: `/en${path}` },
        },
        robots: { index: true, follow: false },
    };
}

export default async function PrivacyPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('Legal');
    return (
        <LegalPage
            title={t('privacy')}
            tocLabel={t('tocLabel')}
            placeholderText={t('placeholderContent')}
            sections={t.raw('privacySections')}
        />
    );
}

