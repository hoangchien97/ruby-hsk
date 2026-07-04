import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getDbMetadata } from '@/lib/seo/metadata';
import { buildBreadcrumbLD } from '@/lib/seo/jsonld';
import { AboutPageContent } from '@/components/about/about-page-content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rubyhsk.vn';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'About' });
  const path = '/about';
  const title = locale === 'vi'
    ? 'Về Ruby HSK — Giáo viên Trần Hồng Ngọc'
    : 'About Ruby HSK — Teacher Tran Hong Ngoc';
  const desc = locale === 'vi'
    ? 'Tìm hiểu về Ruby HSK và cô Trần Hồng Ngọc — Thạc sĩ Hán ngữ với 10+ năm kinh nghiệm dạy tiếng Trung và luyện thi HSK.'
    : 'Learn about Ruby HSK and Ms. Tran Hong Ngoc — MA in Chinese with 10+ years of teaching and HSK preparation experience.';

  return getDbMetadata(locale, path, title, desc);
}

async function getTeacher() {
  try {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase
      .from('teacher_profile')
      .select('full_name, title, bio_vi, bio_en, years_experience, certifications')
      .eq('is_active', true)
      .single();
    return data ?? null;
  } catch {
    return null;
  }
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const teacher = await getTeacher();
  const breadcrumbLD = buildBreadcrumbLD(
    locale,
    locale === 'vi' ? 'Về Ruby HSK' : 'About',
    '/about',
  );

  return <AboutPageContent locale={locale} teacher={teacher} breadcrumbLD={breadcrumbLD} />;
}
