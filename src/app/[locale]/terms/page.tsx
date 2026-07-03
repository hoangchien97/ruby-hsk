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
    const path = '/terms';
    return {
        title: t('terms'),
        description: locale === 'vi'
            ? 'Điều khoản sử dụng của Ruby HSK — quy định khi tham gia các khóa học tiếng Trung.'
            : 'Ruby HSK Terms of Service — rules when enrolling in Chinese language courses.',
        alternates: {
            canonical: `/${locale}${path}`,
            languages: { vi: `/vi${path}`, en: `/en${path}` },
        },
        robots: { index: true, follow: false },
    };
}

export default async function TermsPage() {
    const t = await getTranslations('Legal');
    return (
        <LegalPage
            title={t('terms')}
            sections={[
                'Chấp nhận điều khoản',
                'Dịch vụ của Ruby HSK',
                'Tài khoản người dùng',
                'Đăng ký khóa học',
                'Thanh toán và hoàn phí',
                'Quy định học tập',
                'Quyền sở hữu nội dung',
                'Giới hạn trách nhiệm',
                'Thay đổi điều khoản',
                'Liên hệ',
            ]}
        />
    );
}

