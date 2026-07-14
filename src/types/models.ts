/**
 * Domain-level interfaces derived from Supabase generated types.
 * Use these in components & pages instead of raw Tables<'...'>.
 */
import type { Tables } from '@/lib/supabase/types';

// ── Course ──────────────────────────────────────────────────────────
export type CourseRow = Pick<
    Tables<'courses'>,
    | 'id'
    | 'slug'
    | 'title_vi'
    | 'title_en'
    | 'description_vi'
    | 'description_en'
    | 'level_tag'
    | 'duration_weeks'
    | 'sort_order'
>;

// ── Course Category ─────────────────────────────────────────────────
export type CourseCategoryRow = Pick<
    Tables<'course_categories'>,
    'id' | 'name_vi' | 'name_en' | 'slug' | 'sort_order'
>;

// ── Teacher Profile ─────────────────────────────────────────────────
export interface TeacherProfile {
    full_name: string;
    title: string | null;
    bio_vi: string | null;
    bio_en: string | null;
    years_experience: number | null;
    certifications: string[] | null;
    avatar_url?: string | null;
}

// ── Contact Submission ──────────────────────────────────────────────
export interface ContactSubmission {
    full_name: string;
    phone: string;
    email?: string | null;
    goal?: string | null;
    source_locale?: string | null;
}

// ── Testimonial ─────────────────────────────────────────────────────
export type TestimonialRow = Pick<
    Tables<'testimonials'>,
    'id' | 'student_name' | 'content_vi' | 'content_en' | 'rating' | 'avatar_url'
>;

// ── FAQ ─────────────────────────────────────────────────────────────
export type FaqRow = Pick<
    Tables<'faqs'>,
    'id' | 'question_vi' | 'question_en' | 'answer_vi' | 'answer_en' | 'page_scope'
>;

// ── Page Metadata ───────────────────────────────────────────────────
export type PageMetadataRow = Pick<
    Tables<'page_metadata'>,
    'id' | 'page_name' | 'page_path' | 'title' | 'description' | 'og_image'
>;

// ── Site Settings ───────────────────────────────────────────────────
export type SiteSettingRow = Tables<'site_settings'>;
