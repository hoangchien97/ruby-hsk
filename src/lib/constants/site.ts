/**
 * Site-wide constants — Ruby HSK
 * Single source of truth for brand data, contact info, social links
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rubyhsk.vn';
export const SITE_NAME = 'Ruby HSK';
export const SITE_TAGLINE_VI = 'Học Tiếng Trung Thật Nhẹ Nhàng';
export const SITE_TAGLINE_EN = 'Learn Chinese, Effortlessly';

export const Contact = {
    phone: '0965 322 136',
    phoneTel: '0965322136',
    email: 'tranhongngoc19122001@gmail.com',
    zalo: 'https://zalo.me/0965322136',
    facebook: 'https://facebook.com/rubyhsk',
    address: 'Số 4 - Xóm Cầu Lão, Xã Ô Diên, Huyện Đan Phượng, Thành Phố Hà Nội, Việt Nam',
    addressEn: 'No. 4 - Cau Lao Road, O Dien Commune, Dan Phuong District, Hanoi City, Vietnam',
    replyTime: {
        vi: 'Phản hồi trong vòng 24 giờ làm việc',
        en: 'Response within 24 business hours',
    },
} as const;

export const Teacher = {
    name: 'Trần Hồng Ngọc',
    title: {
        vi: 'Giảng viên sáng lập · Cử nhân chất lượng cao ngành ngôn ngữ Trung Quốc',
        en: 'Founding Instructor · High-quality Bachelor of Chinese Language',
    },
    yearsExperience: 5,
    quote: {
        vi: 'Học tiếng Trung không chỉ là học ngôn ngữ, mà còn là khám phá một nền văn hóa phong phú. Tôi tin rằng mỗi học viên đều có thể thành công nếu được hướng dẫn đúng cách và có động lực phù hợp.',
        en: 'Learning Chinese is not just about the language, but also about discovering a rich culture. I believe that every student can succeed if they are guided correctly and have the right motivation.',
    },
} as const;

export const Stats = [
    { value: '10k+', labelKey: 'statStudentsLabel' },
    { value: '95%', labelKey: 'statPassRateLabel' },
    { value: '15%', labelKey: 'statCoursesLabel' },
    { value: '24/7', labelKey: 'statSupportLabel' },
] as const;

export const NavLinks = {
    home: '/',
    courses: '/courses',
    about: '/about',
    contact: '/contact',
    privacy: '/privacy',
    terms: '/terms',
} as const;

/** HSK level enum — dùng cho filter, badge */
export enum HskLevel {
    HSK_1_2 = 'HSK 1-2',
    HSK_3_4 = 'HSK 3-4',
    HSK_4_PLUS = 'HSK 4+',
    HSK_5_6 = 'HSK 5-6',
}

/** Course mode enum */
export enum CourseMode {
    ONLINE = 'online',
    OFFLINE = 'offline',
    HYBRID = 'hybrid',
}

/** Contact form submission status */
export enum SubmissionStatus {
    NEW = 'new',
    CONTACTED = 'contacted',
    ENROLLED = 'enrolled',
    CLOSED = 'closed',
}
