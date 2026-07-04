import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildBreadcrumbLD } from '@/lib/seo/jsonld';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rubyhsk.vn';

import { getDbMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Contact' });
  const path = '/contact';
  const title = locale === 'vi'
    ? 'Liên Hệ — Tư Vấn Khóa Học Tiếng Trung'
    : 'Contact — Chinese Course Consultation';

  return getDbMetadata(locale, path, title, t('sub'));
}

import { ContactPageContent } from '@/components/contact/contact-page-content';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const breadcrumbLD = buildBreadcrumbLD(
    locale,
    locale === 'vi' ? 'Liên hệ' : 'Contact',
    '/contact',
  );
  return <ContactPageContent locale={locale} breadcrumbLD={breadcrumbLD} />;
}
