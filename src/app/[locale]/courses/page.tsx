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
      .select('id, slug, title_vi, title_en, description_vi, description_en, level_tag, duration_weeks, sort_order')
      .eq('is_published', true)
      .order('sort_order');
    if (error) throw error;
    return data ?? [];
  } catch {
    // Fallback tĩnh nếu DB không kết nối được — 6 khóa học theo từng cấp độ HSK 1-6
    return [
      { id: '1', slug: 'hsk-1', title_vi: 'HSK 1 – Tiếng Trung Cho Người Mới Bắt Đầu', title_en: 'HSK 1 – Chinese for Absolute Beginners', description_vi: 'Nhập môn tiếng Trung dành cho người mới, khởi đầu từ con số 0 với chào hỏi và giao tiếp cơ bản.', description_en: 'An introductory course for total beginners — greetings and basic communication from zero.', level_tag: 'HSK 1', duration_weeks: 12, sort_order: 1 },
      { id: '2', slug: 'hsk-2', title_vi: 'HSK 2 – Giao Tiếp Tiếng Trung Cơ Bản', title_en: 'HSK 2 – Basic Chinese Communication', description_vi: 'Giao tiếp cơ bản trong cuộc sống hàng ngày với từ vựng và mẫu câu thường gặp.', description_en: 'Everyday basic communication with common vocabulary and sentence patterns.', level_tag: 'HSK 2', duration_weeks: 12, sort_order: 2 },
      { id: '3', slug: 'hsk-3', title_vi: 'HSK 3 – Tiếng Trung Trung Cấp', title_en: 'HSK 3 – Intermediate Chinese', description_vi: 'Trình độ trung cấp với giao tiếp nâng cao và kỹ năng viết cho các tình huống thường gặp.', description_en: 'Intermediate level with advanced communication and writing skills for everyday situations.', level_tag: 'HSK 3', duration_weeks: 14, sort_order: 3 },
      { id: '4', slug: 'hsk-4', title_vi: 'HSK 4 – Sẵn Sàng Du Học Và Làm Việc', title_en: 'HSK 4 – Ready for Study Abroad & Work', description_vi: 'Chuẩn bị cho du học và môi trường công việc, giao tiếp tự tin trong các tình huống phức tạp.', description_en: 'Prepares you for study abroad and professional environments — confident communication in complex situations.', level_tag: 'HSK 4', duration_weeks: 14, sort_order: 4 },
      { id: '5', slug: 'hsk-5', title_vi: 'HSK 5 – Tiếng Trung Cao Cấp', title_en: 'HSK 5 – Advanced Chinese', description_vi: 'Trình độ cao cấp, có thể đọc báo, xem phim và giao tiếp chuyên nghiệp bằng tiếng Trung.', description_en: 'Advanced proficiency — read news, watch films, and communicate professionally in Chinese.', level_tag: 'HSK 5', duration_weeks: 16, sort_order: 5 },
      { id: '6', slug: 'hsk-6', title_vi: 'HSK 6 – Trình Độ Chuyên Gia', title_en: 'HSK 6 – Expert Level', description_vi: 'Đạt trình độ gần như người bản ngữ, hiểu toàn diện trong các tình huống phức tạp.', description_en: 'Achieve near-native fluency with comprehensive understanding across complex scenarios.', level_tag: 'HSK 6', duration_weeks: 16, sort_order: 6 },
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
