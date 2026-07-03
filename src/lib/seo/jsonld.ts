/**
 * JSON-LD structured data helpers for Ruby HSK Landing
 * Dùng cho SEO / Google Rich Results
 *
 * Usage:
 *   import { buildOrganizationLD, buildBreadcrumbLD } from '@/lib/seo/jsonld';
 *   <script type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationLD()) }}
 *   />
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rubyhsk.vn';

export interface CourseLD {
    slug: string;
    titleVi: string;
    titleEn: string;
    descriptionVi: string;
    descriptionEn: string;
    locale: string;
}

export interface FaqItem {
    question: string;
    answer: string;
}

/** Organization schema — nhúng vào [locale]/layout.tsx */
export function buildOrganizationLD() {
    return {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: 'Ruby HSK',
        alternateName: 'Trung tâm tiếng Trung Ruby HSK',
        url: SITE_URL,
        logo: `${SITE_URL}/icon-512.png`,
        description:
            'Trung tâm dạy tiếng Trung và luyện thi HSK cùng cô Trần Hồng Ngọc. Lộ trình HSK 1-6, lớp nhỏ, phương pháp học nhẹ nhàng và hiệu quả.',
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'VN',
            addressLocality: 'TP. Hồ Chí Minh',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            telephone: '+84901234567',
            email: 'hello@rubyhsk.vn',
            availableLanguage: ['Vietnamese', 'English'],
        },
        sameAs: [
            'https://facebook.com/rubyhsk',
            'https://zalo.me/rubyhsk',
        ],
        employee: {
            '@type': 'Person',
            name: 'Trần Hồng Ngọc',
            jobTitle: 'Giáo viên tiếng Trung & Chuyên gia luyện thi HSK',
            description:
                'Thạc sĩ Hán ngữ học với hơn 10 năm kinh nghiệm giảng dạy tiếng Trung và luyện thi HSK.',
        },
    };
}

/** Course schema — nhúng trong trang Courses hoặc trang chi tiết khoá học */
export function buildCourseLD(course: CourseLD) {
    const title = course.locale === 'vi' ? course.titleVi : course.titleEn;
    const description =
        course.locale === 'vi' ? course.descriptionVi : course.descriptionEn;
    return {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: title,
        description,
        url: `${SITE_URL}/${course.locale}/courses#${course.slug}`,
        provider: {
            '@type': 'EducationalOrganization',
            name: 'Ruby HSK',
            url: SITE_URL,
        },
        courseMode: ['online', 'onsite'],
        inLanguage: 'vi',
        teaches: title,
    };
}

/** FAQPage schema */
export function buildFaqPageLD(faqs: FaqItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

/** BreadcrumbList schema — dùng cho các trang con (không phải Home) */
export function buildBreadcrumbLD(
    locale: string,
    currentName: string,
    currentPath: string,
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: locale === 'vi' ? 'Trang chủ' : 'Home',
                item: `${SITE_URL}/${locale}`,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: currentName,
                item: `${SITE_URL}/${locale}${currentPath}`,
            },
        ],
    };
}

/** JsonLd helper component (use as inline script in page.tsx) */
export function jsonLdScript(data: object): string {
    return JSON.stringify(data);
}
