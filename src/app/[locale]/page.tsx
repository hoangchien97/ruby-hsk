import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { HomeHero } from '@/components/sections/hero';
import { LearningPaths } from '@/components/sections/learning-paths';
import { WhyRuby } from '@/components/sections/why-ruby';
import { TeacherSection } from '@/components/sections/teacher-section';
import { ReadyToLearn } from '@/components/sections/ready-to-learn';
import { buildFaqPageLD } from '@/lib/seo/jsonld';
import { createServerSupabaseClient } from '@/lib/supabase/server';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rubyhsk.vn';

import { getDbMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Home' });
  const path = '/';

  return getDbMetadata(locale, path, t('metaTitle'), t('sub'));
}

async function getFaqsLD(locale: string) {
  try {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase
      .from('faqs')
      .select('question_vi, question_en, answer_vi, answer_en')
      .eq('page_scope', 'home')
      .eq('is_published', true)
      .order('sort_order');
    if (!data?.length) return null;
    return buildFaqPageLD(
      data.map((f) => ({
        question: locale === 'vi' ? f.question_vi : f.question_en,
        answer: locale === 'vi' ? f.answer_vi : f.answer_en,
      })),
    );
  } catch {
    return null;
  }
}

async function getTeacherData() {
  try {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase
      .from('teacher_profile')
      .select('bio_vi, bio_en, certifications')
      .single();
    return data;
  } catch {
    return null;
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [faqLD, teacher] = await Promise.all([getFaqsLD(locale), getTeacherData()]);
  const isVi = locale === 'vi';

  return (
    <div className="page-shell">
      {faqLD && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }}
        />
      )}

      {/* Hero + Trust Stats */}
      <HomeHero locale={locale} />

      {/* HSK Learning Paths — Stitch 3-col bento */}
      <LearningPaths locale={locale} />

      {/* Why Ruby HSK — 2-col feature grid */}
      <WhyRuby locale={locale} />

      {/* Teacher Profile — Stitch wide card */}
      <TeacherSection
        locale={locale}
        bio={isVi ? teacher?.bio_vi : teacher?.bio_en}
        certifications={teacher?.certifications as string[] | null}
      />

      {/* Ready to Learn CTA section */}
      <ReadyToLearn />
    </div>
  );
}
