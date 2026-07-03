import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
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
        description: locale === 'vi'
            ? 'Chính sách bảo mật của Ruby HSK — cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn.'
            : 'Ruby HSK Privacy Policy — how we collect, use, and protect your information.',
        alternates: {
            canonical: `/${locale}${path}`,
            languages: { vi: `/vi${path}`, en: `/en${path}` },
        },
        robots: { index: true, follow: false },
    };
}

export default async function PrivacyPage() {
    const t = await getTranslations('Legal');
    return (
        <LegalPage
            title={t('privacy')}
            sections={[
                'Thông tin chúng tôi thu thập',
                'Mục đích sử dụng thông tin',
                'Bảo mật dữ liệu',
                'Chia sẻ thông tin',
                'Cookies và công nghệ theo dõi',
                'Quyền của người dùng',
                'Thời gian lưu trữ dữ liệu',
                'Liên hệ về bảo mật',
            ]}
        />
    );
}

