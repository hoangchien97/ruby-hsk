import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { buildBreadcrumbLD, buildCourseLD } from '@/lib/seo/jsonld';
import type { Tables } from '@/lib/supabase/types';
import { CoursesPageContent } from '@/components/courses/courses-page-content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rubyhsk.vn';

import { getDbMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Courses' });
  const path = '/courses';

  return getDbMetadata(locale, path, t('metaTitle'), t('sub'));
}

async function getCourses() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('courses')
      .select('id, slug, title_vi, title_en, description_vi, description_en, level_tag, duration_weeks, price_note, sort_order')
      .eq('is_published', true)
      .order('sort_order');
    if (error) throw error;
    return data ?? [];
  } catch {
    // Fallback tĩnh nếu DB không kết nối được
    return [
      { id: '1', slug: 'tieng-trung-so-cap', title_vi: 'Tiếng Trung Sơ Cấp Toàn Diện', title_en: 'Complete Beginner Chinese', description_vi: 'Xây dựng nền tảng phát âm chuẩn và từ vựng giao tiếp thường ngày.', description_en: 'Build a solid foundation in pronunciation and everyday vocabulary.', level_tag: 'HSK 1-2', duration_weeks: 16, price_note: 'Liên hệ để biết học phí', sort_order: 1 },
      { id: '2', slug: 'luyen-thi-hsk-3-4', title_vi: 'Trung Cấp & Luyện Thi HSK 3-4', title_en: 'Intermediate & HSK 3-4 Preparation', description_vi: 'Nâng cao đọc hiểu, nghe và viết. Luyện đề thi HSK 3-4 chuyên sâu.', description_en: 'Improve reading, listening and writing. Intensive HSK 3-4 exam practice.', level_tag: 'HSK 3-4', duration_weeks: 20, price_note: 'Liên hệ để biết học phí', sort_order: 2 },
      { id: '3', slug: 'tieng-trung-thuong-mai', title_vi: 'Tiếng Trung Thương Mại', title_en: 'Business Chinese', description_vi: 'Phát triển kỹ năng tiếng Trung trong môi trường công việc.', description_en: 'Develop Chinese skills for the workplace.', level_tag: 'HSK 4+', duration_weeks: 12, price_note: 'Liên hệ để biết học phí', sort_order: 3 },
      { id: '4', slug: 'hsk-5-6-nang-cao', title_vi: 'HSK 5-6 Nâng Cao', title_en: 'HSK 5-6 Advanced', description_vi: 'Hoàn thiện kỹ năng ngôn ngữ, phân tích học thuật.', description_en: 'Master advanced language skills and academic analysis.', level_tag: 'HSK 5-6', duration_weeks: 24, price_note: 'Liên hệ để biết học phí', sort_order: 4 },
    ] as Tables<'courses'>[];
  }
}

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Courses' });
  const courses = await getCourses();

  const breadcrumbLD = buildBreadcrumbLD(
    locale,
    t('breadcrumb'),
    '/courses',
  );
  const courseLDs = courses.map((c) =>
    buildCourseLD({
      slug: c.slug,
      titleVi: c.title_vi,
      titleEn: c.title_en,
      descriptionVi: c.description_vi ?? '',
      descriptionEn: c.description_en ?? '',
      locale,
    }),
  );

  return (
    <CoursesPageContent
      locale={locale}
      courses={courses}
      breadcrumbLD={breadcrumbLD}
      courseLDs={courseLDs}
    />
  );
}
