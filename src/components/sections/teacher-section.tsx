'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { Teacher } from '@/lib/constants/site';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

interface TeacherSectionProps {
  locale?: string;
  bio?: string | null;
  certifications?: string[] | null;
}

export function TeacherSection({
  locale = 'vi',
  bio,
  certifications,
}: TeacherSectionProps) {
  const t = useTranslations('Home');
  const tAbout = useTranslations('About');
  // Prefer the bio from DB, fallback to i18n translation
  const displayBio = bio ?? tAbout('teacherQuote');

  return (
    <section className="app-section">
      <div className="app-container">
        <ScrollReveal className="overflow-hidden rounded-[var(--radius-3xl)] border border-[var(--color-surface-variant)] bg-[var(--color-surface-container-lowest)] shadow-[var(--shadow-coral)] flex flex-col lg:flex-row">
          {/* Teacher photo */}
          <div className="lg:w-2/5 h-80 lg:h-auto relative overflow-hidden bg-gradient-to-br from-[var(--color-primary-fixed)] via-[var(--color-surface-container-low)] to-[var(--color-secondary-fixed)] flex items-center justify-center min-h-[320px]">
            <img
              className="w-full h-full object-cover lg:absolute lg:inset-0 hover:scale-105 transition-transform duration-500"
              src="/teacher_portrait.png"
              alt="Ms. Tran Hong Ngoc"
            />
          </div>

          {/* Content */}
          <div className="lg:w-3/5 p-8 md:p-12 flex flex-col justify-center">
            <span className="text-label-sm uppercase tracking-wider text-[var(--color-primary)]">
              {t('teacherFounding')}
            </span>
            <h2 className="mt-2 text-headline-lg font-bold text-[var(--color-on-surface)]">
              {t('teacherTitle')}
            </h2>

            <p className="mt-4 text-body-lg italic text-[var(--color-on-surface-variant)]">
              {displayBio}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <p className="font-bold text-[var(--color-on-surface)]">
                  <AnimatedCounter value={Teacher.yearsExperience} suffix="+" delay={0.55} /> {t('teacherYears')}
                </p>
                <p className="text-label-lg text-[var(--color-on-surface-variant)]">
                  {t('teacherScope')}
                </p>
              </div>
              <div>
                <p className="font-bold text-[var(--color-on-surface)]">
                  {t('teacherDegree')}
                </p>
                <p className="text-label-lg text-[var(--color-on-surface-variant)]">
                  {t('teacherDegreeScope')}
                </p>
              </div>
            </div>

            {certifications && certifications.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <li
                    key={cert}
                    className="rounded-full bg-[var(--color-surface-container)] px-3 py-1 text-label-sm text-[var(--color-on-surface-variant)]"
                  >
                    {cert}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8">
              <Link href="/about" className="w-full md:w-auto block">
                <Button size="lg" className="w-full md:w-auto">
                  {t('teacherBtn')}
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
