'use client';

import { useTranslations } from 'next-intl';
import { LoadingLogo } from '@/components/loading/loading-logo';

export default function Loading() {
    const t = useTranslations('Common');
    return <LoadingLogo label={t('loading')} />;
}
