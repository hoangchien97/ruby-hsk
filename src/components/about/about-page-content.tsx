'use client';

import type { TeacherProfile } from '@/types/models';
import { AboutHeaderBanner } from './about-header-banner';
import { AboutTeacherSection } from './about-teacher-section';
import { AboutMethodologySection } from './about-methodology-section';
import { AboutWhySection } from './about-why-section';
import { AboutCtaSection } from './about-cta-section';

export function AboutPageContent({
    locale,
    teacher,
    breadcrumbLD,
}: {
    locale: string;
    teacher: TeacherProfile | null;
    breadcrumbLD: object;
}) {
    return (
        <div className="page-shell bg-[var(--color-bg)]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
            />

            {/* Header Banner */}
            <AboutHeaderBanner />

            {/* Section: Teacher Portrait & Academy Credentials */}
            <AboutTeacherSection teacher={teacher} />

            {/* Section: Methodology detail */}
            <AboutMethodologySection />

            {/* Section: Why Choose Ruby HSK */}
            <AboutWhySection />

            {/* Section: CTA Banner */}
            <AboutCtaSection />
        </div>
    );
}
