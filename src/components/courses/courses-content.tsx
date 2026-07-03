'use client';

import { useTranslations } from 'next-intl';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/i18n/navigation';
import type { Tables } from '@/lib/supabase/types';
import {
    BookOpen,
    Sparkles,
    Star,
    Heart,
    ChevronLeft,
    ChevronRight,
    Gift,
    HelpCircle,
    Flame,
    Award,
    Filter,
    CheckCircle2,
    Tv
} from 'lucide-react';

export type CourseRow = Pick<
    Tables<'courses'>,
    'id' | 'slug' | 'title_vi' | 'title_en' | 'description_vi' | 'description_en' | 'level_tag' | 'duration_weeks' | 'price_note' | 'sort_order'
>;

export function CoursesContent({
    locale,
    courses,
    breadcrumbLD,
    courseLDs,
}: {
    locale: string;
    courses: CourseRow[];
    breadcrumbLD: object;
    courseLDs: object[];
}) {
    const t = useTranslations('Courses');
    const isVi = locale === 'vi';

    // State for filtering
    const [selectedLevel, setSelectedLevel] = useState<string>('all');
    const [selectedFormat, setSelectedFormat] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('newest');
    const [favorites, setFavorites] = useState<Record<string, boolean>>({});

    // Toggle favorite state
    const toggleFavorite = (slug: string) => {
        setFavorites((prev) => ({
            ...prev,
            [slug]: !prev[slug],
        }));
    };

    // Formats mapping
    const formats = [
        { key: 'all', vi: 'Tất cả', en: 'All' },
        { key: 'online', vi: 'Online', en: 'Online' },
        { key: 'video', vi: 'Video sẵn', en: 'Video' },
    ];

    // static avatars for design matching
    const avatars = [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD4fPOZ6z6CmoWXRBBBoih66Mzxw43Lqk_xGfIQzow4MdNWuSyJvC-ChNGy2jjpguIB91PuGr4A34YvmcCOU0HtJc--mXrI1xoMicHVSnfW2-cF50xMIZQqSAqa643tL2EdP_CNUfvoVwbWuXaiBzyDQiRquBFTp1M_UQUa3UV4aNjD48Ogw3nTYDoodm1iNrban0RXcfBucorpELcuUm4_2w6ymPC0-gF7QcekQEU16dNZTnUqDtpOBOyGhocC-coK8U2eh_u4Jlc',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDdCqh9Q0x77zLYs0IUXLcrq87LbvqE5hKFE4-01NYemsJe8JVmgdaLDcrMJdttXMK_aErbS5lCljC1SceB9vowg4y2BRg8Ia5cVwBi4_kodtXK0iukU7u97fKYYPyRJ_3C-s-OMeEBrm8xAESvdvyxhHPU1hoMpJMA9XyGptlxkXsWvaO023d1FJ2jZAA00COaUARROn5WTFuuMVI4c57SNKufokAmwDxSglj6Kc-AakRk_BFFMW5G_F3pWYK9VtRMUvja-VMze9o',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuACT33xlbhf8B5Tg0nDhH2C5g9zq12lZLCjyaOeX7025fPiHA-WtHS4prfbzyuE7Ddj7SZ_8BFFqIawI5Xg-i-STr0LjAhhfOqMbq2MF1u5nj-teMhdOanPmFr9a3sWm_cC8BhRoQ2kAsfCXzm63wbqn6anNNiCnnjbGu8fGrQ6XR-rSS6zP31xmYMMxiEId_pEeOF-5PyS8gOSCTOQwhkvBMsIZK9SnJ863GajofFvxOZk1WQEcdWcdAzFSN2-nk14D_iakJ5N9pM',
    ];

    // Compute counts dynamically
    const counts = useMemo(() => {
        const countsObj = {
            'all': courses.length,
            'hsk-1-2': courses.filter(c => c.level_tag === 'HSK 1-2').length,
            'hsk-3-4': courses.filter(c => c.level_tag === 'HSK 3-4' || c.level_tag === 'HSK 4+').length,
            'hsk-5-6': courses.filter(c => c.level_tag === 'HSK 5-6').length,
        };
        return countsObj;
    }, [courses]);

    // Handle course filtering of data list
    const filteredCourses = useMemo(() => {
        let result = [...courses];

        // 1. Level filter
        if (selectedLevel !== 'all') {
            if (selectedLevel === 'hsk-1-2') {
                result = result.filter(c => c.level_tag === 'HSK 1-2');
            } else if (selectedLevel === 'hsk-3-4') {
                result = result.filter(c => c.level_tag === 'HSK 3-4' || c.level_tag === 'HSK 4+');
            } else if (selectedLevel === 'hsk-5-6') {
                result = result.filter(c => c.level_tag === 'HSK 5-6');
            }
        }

        // 2. Format filter
        if (selectedFormat !== 'all') {
            // business Chinese is hybrid/offline, HSK 5-6 is online etc.
            if (selectedFormat === 'online') {
                result = result.filter(c => c.slug.includes('hsk') || c.slug.includes('cap'));
            } else if (selectedFormat === 'video') {
                result = result.filter(c => c.slug.includes('thuong-mai') || c.slug.includes('so-cap'));
            }
        }

        // 3. Sorting
        if (sortBy === 'price-asc') {
            // Sort by duration weeks as a proxy helper
            result.sort((a, b) => (a.duration_weeks ?? 0) - (b.duration_weeks ?? 0));
        } else if (sortBy === 'popular') {
            // Sort by reverse sort_order details
            result.sort((a, b) => (b.sort_order ?? 0) - (a.sort_order ?? 0));
        } else {
            // Default sort (newest) by sort_order
            result.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
        }

        return result;
    }, [courses, selectedLevel, selectedFormat, sortBy]);

    // Static mapping of beautiful background cover images for courses
    const courseCovers: Record<string, string> = {
        'tieng-trung-so-cap': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvBTDpKBKo3KwpzbOOJf6xz-axCjUgQh33SsZCNDz9tGu_Faj_EiNPO79Sdd2diH1dKQ74b4y5KlIUQz0QYdRoSpRlWsV7CjKLlIwqzt6sdVDx22u0FY-ha96yBBxquL-41vJAE5_WnKxBmtx7j37s2rL9j7ra8dR8MNcsLlVpp3yX-JpvYnH860OIuFWuOEyrcEf23X-E3Z832jtzuo9wz6KQCybLALhOkW6pn-o5CVVD-MW5nQ40S4y8lB9L6MOZPLS4LVGWK2E',
        'luyen-thi-hsk-3-4': 'https://lh3.googleusercontent.com/aida-public/AB6AXuA23Y3SFWaZP-Ro_dUvOyYG-X5IkTeRDuYfRGw9X3zZmykkS1NMQ5sG8tkzT_HokcHz_2AHCTppablTIFb5WLRShllqVnrmmLCCxTFKzcS2znbfo8PtUxeGNqeqvQBlluckFP13YenSGn_TXHaz5mRQags4U5pdC4KWo1zlwiF5gJ0W9Xbsx8VUGQ1EabmcsAqaOGHDyfXvOAy6vZrF137vzFGpQFzTy_KmVlS1O79DLf_jsJmBW6bo7bL_TuZPPJ9VzM7Zz9udC2E',
        'tieng-trung-thuong-mai': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxOJLYiku05WccysCZ_WUYIkPCNQHGOv7SNfxiCCk1gf5KQ_7SosySsu7uHbiPOY2F0ozfM-08H77LKU1xBZ8JtWnWyDsWPx1MAgz_8xBPRBQR0V6xmj6AhST57erNx1aGDSnmuTzfjz2-0aVZexI6nIjgiaPLkBg1SlwkBl1KrvFEWLgZBgmVrpOkzJUnGNMp3CTG0ISOPF_dGi7TbRN4CKJ254AynxJiqCTgI1ohuiVoaPWLr8TrvXLKYzVPU9hgExQEgMk2ONk',
        'hsk-5-6-nang-cao': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxOJLYiku05WccysCZ_WUYIkPCNQHGOv7SNfxiCCk1gf5KQ_7SosySsu7uHbiPOY2F0ozfM-08H77LKU1xBZ8JtWnWyDsWPx1MAgz_8xBPRBQR0V6xmj6AhST57erNx1aGDSnmuTzfjz2-0aVZexI6nIjgiaPLkBg1SlwkBl1KrvFEWLgZBgmVrpOkzJUnGNMp3CTG0ISOPF_dGi7TbRN4CKJ254AynxJiqCTgI1ohuiVoaPWLr8TrvXLKYzVPU9hgExQEgMk2ONk'
    };

    return (
        <div className="w-full">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
            />
            {courseLDs.map((ld, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
                />
            ))}

            {/* Hero Section */}
            <section className="container py-16 md:py-24 text-center md:text-left relative overflow-hidden">
                <div className="relative z-10 grid md:grid-cols-2 items-center gap-12 max-w-[1400px] mx-auto">
                    <div>
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] font-bold text-label-lg mb-6">
                            <Sparkles className="w-4.5 h-4.5 mr-2 text-[var(--color-primary)]" />
                            {t('badge')}
                        </span>
                        <h1 className="text-display-lg md:text-7xl font-extrabold text-[var(--color-on-background)] mb-6 leading-tight">
                            {isVi ? 'Khóa học tiếng Trung &' : 'Chinese courses &'} <br />
                            <span className="text-[var(--color-primary)]">{isVi ? 'luyện thi HSK' : 'HSK preparation'}</span>
                        </h1>
                        <p className="text-body-lg text-[var(--color-on-surface-variant)] mb-10 max-w-xl">
                            {isVi
                                ? 'Nâng cao trình độ tiếng Trung cùng Ruby HSK thông qua các bài giảng sinh động, giáo trình chuẩn hóa và môi trường học tập tương tác cao.'
                                : 'Improve your Chinese proficiency with Ruby HSK through engaging lectures, standardized curriculum, and a highly interactive learning environment.'}
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <div className="flex -space-x-3">
                                {avatars.map((av, idx) => (
                                    <div key={idx} className="w-10 h-10 rounded-full border-2 border-[var(--color-surface)] bg-slate-200 overflow-hidden shadow-sm">
                                        <img className="w-full h-full object-cover" alt="Student profile" src={av} />
                                    </div>
                                ))}
                                <div className="w-10 h-10 rounded-full border-2 border-[var(--color-surface)] bg-[var(--color-primary-container)] flex items-center justify-center text-[var(--color-primary)] text-xs font-bold shadow-sm">
                                    +2k
                                </div>
                            </div>
                            <p className="text-label-lg text-[var(--color-on-surface-variant)] self-center font-semibold">
                                {t('activeStudents')}
                            </p>
                        </div>
                    </div>
                    {/* Cozy study illustration: hidden on mobile */}
                    <div className="relative hidden md:block select-none">
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-[var(--color-secondary-container)]/20 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[var(--color-primary-container)]/10 rounded-full blur-3xl"></div>
                        <div className="relative bg-white rounded-[2rem] p-6 coral-shadow rotate-2 hover:rotate-0 transition-transform duration-500 max-w-lg ml-auto border border-[var(--color-surface-variant)]/45">
                            <img
                                className="rounded-2xl w-full h-[360px] object-cover"
                                alt="Cozy Chinese study space decoration"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbFBb82lRSeuobo6SrZytoFNjlhrQray2IQqy_ZcZCLp0DpbnIiCH-dV6bQDktYpJY59JWGHqJTjxovyolXpPIh6sohE8yfr5R7I2emBfoZZLPUbHQK2rS1FXvkjF6PleQXb7a13NwnSfjNQAr-ggHOUgHpScdSc6sEUuk-SEKmMP6_yIUkBz9k04Tbg1ObDoqYaXjRZMduQVEtxT-XUzYqos3WnhVoUu3SlCpg88DcUpBYeIYmrgsT013znmcv-8WqLo5N8lxorw"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Filters & List */}
            <section className="container pb-24">
                <div className="grid gap-8 lg:grid-cols-[280px_1fr] max-w-[1400px] mx-auto items-start">
                    {/* Sidebar Filters */}
                    <aside className="w-full space-y-6">
                        <Card variant="white" className="p-8 rounded-2xl coral-shadow border border-[var(--color-surface-variant)]/30">
                            <h3 className="text-title-md font-bold mb-6 flex items-center gap-2 text-[var(--color-on-surface)]">
                                <Filter className="w-5 h-5 text-[var(--color-primary)]" />
                                {t('filters')}
                            </h3>

                            {/* Checkbox filter for levels */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="hsk-filter"
                                        checked={selectedLevel === 'all'}
                                        onChange={() => setSelectedLevel('all')}
                                        className="w-5 h-5 rounded-full border-[var(--color-outline)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]/20 transition-all cursor-pointer"
                                    />
                                    <span className={`text-label-lg transition-colors ${selectedLevel === 'all' ? 'text-[var(--color-primary)] font-bold' : 'text-[var(--color-on-surface-variant)] group-hover:text-[var(--color-primary)]'}`}>
                                        {isVi ? 'Tất cả trình độ' : 'All levels'}
                                    </span>
                                </label>

                                <div className="space-y-3 pl-1">
                                    <label className="flex items-center justify-between cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="hsk-filter"
                                                checked={selectedLevel === 'hsk-1-2'}
                                                onChange={() => setSelectedLevel('hsk-1-2')}
                                                className="w-5 h-5 rounded-full border-[var(--color-outline)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]/20 cursor-pointer"
                                            />
                                            <span className={`text-label-lg transition-colors ${selectedLevel === 'hsk-1-2' ? 'text-[var(--color-primary)] font-bold' : 'text-[var(--color-on-surface-variant)] group-hover:text-[var(--color-primary)]'}`}>
                                                HSK 1 - HSK 2
                                            </span>
                                        </div>
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${selectedLevel === 'hsk-1-2' ? 'bg-[var(--color-primary-container)] text-[var(--color-primary)]' : 'bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)]'}`}>
                                            {counts['hsk-1-2']}
                                        </span>
                                    </label>

                                    <label className="flex items-center justify-between cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="hsk-filter"
                                                checked={selectedLevel === 'hsk-3-4'}
                                                onChange={() => setSelectedLevel('hsk-3-4')}
                                                className="w-5 h-5 rounded-full border-[var(--color-outline)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]/20 cursor-pointer"
                                            />
                                            <span className={`text-label-lg transition-colors ${selectedLevel === 'hsk-3-4' ? 'text-[var(--color-primary)] font-bold' : 'text-[var(--color-on-surface-variant)] group-hover:text-[var(--color-primary)]'}`}>
                                                HSK 3 - HSK 4
                                            </span>
                                        </div>
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${selectedLevel === 'hsk-3-4' ? 'bg-[var(--color-primary-container)] text-[var(--color-primary)]' : 'bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)]'}`}>
                                            {counts['hsk-3-4']}
                                        </span>
                                    </label>

                                    <label className="flex items-center justify-between cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="hsk-filter"
                                                checked={selectedLevel === 'hsk-5-6'}
                                                onChange={() => setSelectedLevel('hsk-5-6')}
                                                className="w-5 h-5 rounded-full border-[var(--color-outline)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]/20 cursor-pointer"
                                            />
                                            <span className={`text-label-lg transition-colors ${selectedLevel === 'hsk-5-6' ? 'text-[var(--color-primary)] font-bold' : 'text-[var(--color-on-surface-variant)] group-hover:text-[var(--color-primary)]'}`}>
                                                HSK 5 - HSK 6
                                            </span>
                                        </div>
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${selectedLevel === 'hsk-5-6' ? 'bg-[var(--color-primary-container)] text-[var(--color-primary)]' : 'bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)]'}`}>
                                            {counts['hsk-5-6']}
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Format Filter */}
                            <div className="mt-8 pt-8 border-t border-[var(--color-surface-variant)]/30">
                                <h3 className="text-title-md font-bold mb-4 text-[var(--color-on-surface)]">{t('teachingMode')}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {formats.map((f) => (
                                        <button
                                            key={f.key}
                                            onClick={() => setSelectedFormat(f.key)}
                                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${selectedFormat === f.key
                                                ? 'bg-[var(--color-primary)] text-white shadow-sm'
                                                : 'bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-variant)]'
                                                }`}
                                        >
                                            {isVi ? f.vi : f.en}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        {/* Promo Offer Combo Banner */}
                        <div className="bg-[var(--color-secondary-container)] p-8 rounded-2xl coral-shadow relative overflow-hidden group cursor-pointer border border-[#ffd57d]">
                            <div className="relative z-10">
                                <h4 className="text-title-md font-bold text-[var(--color-on-secondary-container)] mb-2">
                                    {t('promoTitle')}
                                </h4>
                                <p className="text-body-sm text-[var(--color-on-secondary-container)]/90 mb-6">
                                    {t('promoDesc')}
                                </p>
                                <Link href="/contact" className="inline-flex items-center gap-1.5 font-bold text-[var(--color-primary)] hover:underline">
                                    {t('promoAction')} <span className="text-lg">→</span>
                                </Link>
                            </div>
                            <div className="absolute -right-4 -bottom-4 opacity-15 group-hover:scale-110 transition-transform text-[80px] text-[var(--color-primary)]">
                                <Gift className="w-20 h-20 stroke-[1.25]" />
                            </div>
                        </div>
                    </aside>

                    {/* Main Courses list container */}
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                            <h2 className="text-headline-lg font-bold text-[var(--color-on-background)]">
                                {t('list')}
                            </h2>
                            <div className="flex items-center gap-3">
                                <span className="text-label-lg text-[var(--color-on-surface-variant)] shrink-0 font-medium">
                                    {t('sortBy')}:
                                </span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface)] border border-[var(--color-border)] rounded-xl text-label-lg font-semibold coral-shadow px-4 py-2 cursor-pointer focus:ring-2 focus:ring-[var(--color-primary)]/20"
                                >
                                    <option value="newest">{t('sortNewest')}</option>
                                    <option value="price-asc">{t('sortPriceAsc')}</option>
                                    <option value="popular">{t('sortPopular')}</option>
                                </select>
                            </div>
                        </div>

                        {/* Courses Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {filteredCourses.map((c) => {
                                const isFav = !!favorites[c.slug];
                                const coverImg = courseCovers[c.slug] ?? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvBTDpKBKo3KwpzbOOJf6xz-axCjUgQh33SsZCNDz9tGu_Faj_EiNPO79Sdd2diH1dKQ74b4y5KlIUQz0QYdRoSpRlWsV7CjKLlIwqzt6sdVDx22u0FY-ha96yBBxquL-41vJAE5_WnKxBmtx7j37s2rL9j7ra8dR8MNcsLlVpp3yX-JpvYnH860OIuFWuOEyrcEf23X-E3Z832jtzuo9wz6KQCybLALhOkW6pn-o5CVVD-MW5nQ40S4y8lB9L6MOZPLS4LVGWK2E';
                                return (
                                    <div
                                        key={c.id ?? c.slug}
                                        className="group bg-[var(--color-surface-container-lowest)] rounded-3xl overflow-hidden coral-shadow border border-[var(--color-border)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
                                    >
                                        <div className="relative h-56 w-full overflow-hidden bg-[var(--color-surface-container-low)]">
                                            <img
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                alt={locale === 'vi' ? c.title_vi : c.title_en}
                                                src={coverImg}
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-[var(--color-primary)] px-4 py-1.5 rounded-full text-white text-xs font-extrabold uppercase tracking-wider shadow-sm">
                                                    {c.level_tag ?? 'HSK'}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => toggleFavorite(c.slug)}
                                                className={`absolute top-4 right-4 h-10 w-10 bg-[var(--color-surface-container-lowest)]/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-all ${isFav ? 'text-[var(--color-primary)]' : 'text-[var(--color-on-surface-variant)]/60 hover:text-[var(--color-primary)]'
                                                    }`}
                                                aria-label="Add to favorites"
                                            >
                                                <Heart className="w-5 h-5 stroke-[2]" fill={isFav ? "currentColor" : "none"} />
                                            </button>
                                        </div>

                                        <div className="p-8 flex flex-col flex-1">
                                            <div className="flex justify-between items-start gap-2 mb-4">
                                                <h3 className="font-bold text-title-md text-[var(--color-on-surface)] group-hover:text-[var(--color-primary)] transition-colors leading-tight">
                                                    {locale === 'vi' ? c.title_vi : c.title_en}
                                                </h3>
                                                <div className="flex items-center gap-1.5 bg-[#fff7e5] px-2 py-0.5 rounded-lg border border-[#ffecbf]">
                                                    <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                                                    <span className="text-xs font-bold text-orange-700">5.0</span>
                                                </div>
                                            </div>

                                            <p className="text-[var(--color-on-surface-variant)] text-body-md mb-6 line-clamp-2 flex-grow">
                                                {locale === 'vi' ? c.description_vi : c.description_en}
                                            </p>

                                            <div className="flex items-center justify-between border-t border-[var(--color-surface-variant)]/30 pt-6 mt-auto">
                                                <div className="flex flex-col">
                                                    {c.duration_weeks && (
                                                        <span className="text-xs text-[var(--color-on-surface-variant)]/50 font-bold uppercase tracking-wider mb-0.5">
                                                            {c.duration_weeks} {isVi ? 'tuần học' : 'weeks'}
                                                        </span>
                                                    )}
                                                    <span className="text-title-md font-bold text-[var(--color-primary)] tracking-tight">
                                                        {c.price_note && c.price_note.toLowerCase().includes('liên hệ')
                                                            ? (isVi ? c.price_note : 'Contact for tuition info')
                                                            : (c.price_note ?? (isVi ? 'Liên hệ học phí' : 'Contact for tuition'))}
                                                    </span>
                                                </div>
                                                <Link href={`/courses/${c.slug}`}>
                                                    <Button variant="secondary" className="px-5 py-2.5 rounded-xl font-bold transition-all">
                                                        {isVi ? 'Chi tiết' : 'Details'}
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Upcoming course card: VIP Grammar */}
                            <div className="group bg-[var(--color-surface-container-low)] rounded-3xl overflow-hidden coral-shadow border-2 border-dashed border-[var(--color-primary)]/20 flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
                                <div className="w-20 h-20 bg-[var(--color-primary-container)]/30 rounded-full flex items-center justify-center mb-6">
                                    <Award className="w-10 h-10 text-[var(--color-primary)]" />
                                </div>
                                <h3 className="text-title-md font-bold text-[var(--color-on-background)] mb-4">
                                    {t('upcomingTitle')}
                                </h3>
                                <p className="text-[var(--color-on-surface-variant)] text-body-md max-w-xs mb-8">
                                    {t('upcomingDesc')}
                                </p>
                                <Link href="/contact">
                                    <Button variant="outlined" className="px-8 py-3 rounded-full hover:bg-[var(--color-primary)] hover:text-white transition-all">
                                        {t('notifyMe')}
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="mt-16 flex justify-center items-center gap-3">
                            <button className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--color-surface-container-lowest)] border border-[var(--color-border)] coral-shadow hover:text-[var(--color-primary)] text-[var(--color-on-surface)] transition-colors">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--color-primary)] text-white font-bold coral-shadow">1</button>
                            <button className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--color-surface-container-lowest)] border border-[var(--color-border)] coral-shadow hover:text-[var(--color-primary)] text-[var(--color-on-surface)] transition-colors font-bold">2</button>
                            <button className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--color-surface-container-lowest)] border border-[var(--color-border)] coral-shadow hover:text-[var(--color-primary)] text-[var(--color-on-surface)] transition-colors font-bold">3</button>
                            <button className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--color-surface-container-lowest)] border border-[var(--color-border)] coral-shadow hover:text-[var(--color-primary)] text-[var(--color-on-surface)] transition-colors">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
