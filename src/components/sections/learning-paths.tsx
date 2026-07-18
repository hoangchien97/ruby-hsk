'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Card } from '@/components/ui/card';
import { SectionBadge } from '@/components/ui/section-badge';
import { Target, GraduationCap, Star, Check } from 'lucide-react';
import type { ComponentType } from 'react';

// ── Types ──────────────────────────────────────────────────────────
interface LearningPath {
  level: string;
  title: string;
  desc: string;
  bullet1: string;
  bullet2: string;
  icon: ComponentType<{ className?: string }>;
  featured?: boolean;
  color: 'default' | 'primary' | 'tertiary';
  linkLabel: string;
}

// ── Main component ─────────────────────────────────────────────────
export function LearningPaths({ locale = 'vi' }: { locale?: string }) {
  const t = useTranslations('Home');

  const paths: LearningPath[] = [
    {
      level: 'HSK 1-2',
      title: t('pathHsk12Title'),
      desc: t('pathHsk12Desc'),
      bullet1: t('pathHsk12Bullet1'),
      bullet2: t('pathHsk12Bullet2'),
      icon: Target,
      color: 'default',
      linkLabel: t('details'),
    },
    {
      level: 'HSK 3-4',
      title: t('pathHsk34Title'),
      desc: t('pathHsk34Desc'),
      bullet1: t('pathHsk34Bullet1'),
      bullet2: t('pathHsk34Bullet2'),
      icon: GraduationCap,
      featured: true,
      color: 'primary',
      linkLabel: t('exploreNow'),
    },
    {
      level: 'HSK 5-6',
      title: t('pathHsk56Title'),
      desc: t('pathHsk56Desc'),
      bullet1: t('pathHsk56Bullet1'),
      bullet2: t('pathHsk56Bullet2'),
      icon: Star,
      color: 'tertiary',
      linkLabel: t('details'),
    },
  ];

  return (
    <section className="app-section">
      <div className="app-container">
        <div className="mb-10 text-center">
          <h2 className="text-headline-lg text-[var(--color-on-surface)]">
            {t('roadmap')}
          </h2>
          <p className="mt-2 text-body-md text-[var(--color-on-surface-variant)]">
            {t('roadmapDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {paths.map((path) => (
            <LearningPathCard key={path.level} path={path} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Card sub-component ─────────────────────────────────────────────
function LearningPathCard({ path }: { path: LearningPath }) {
  const Icon = path.icon;

  // Featured (primary) card — dark background
  if (path.featured) {
    return (
      <div className="relative overflow-hidden rounded-[var(--radius-2xl)] bg-[var(--color-primary)] p-8 text-[var(--color-on-primary)] shadow-[var(--shadow-button)] transition-all duration-300 hover:-translate-y-2">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--radius-xl)] bg-white/20 text-[var(--color-on-primary)]">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-headline-lg font-bold">{path.title}</h3>
        <p className="mt-2 text-body-md text-white/80">{path.desc}</p>
        <ul className="mt-4 space-y-2">
          {[path.bullet1, path.bullet2].map((b) => (
            <li key={b} className="flex items-center gap-2 text-label-lg">
              <Check className="h-4 w-4 text-[var(--color-secondary-fixed-dim)] shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <Link
          href="/courses"
          className="mt-6 inline-flex items-center gap-1 font-bold text-[var(--color-secondary-fixed-dim)] hover:underline"
        >
          {path.linkLabel}
        </Link>
      </div>
    );
  }

  // Standard card
  const iconBg = path.color === 'tertiary' ? 'bg-[var(--color-tertiary)]/10' : 'bg-[var(--color-primary)]/10';
  const iconColor = path.color === 'tertiary' ? 'text-[var(--color-tertiary)]' : 'text-[var(--color-primary)]';
  const checkColor = path.color === 'tertiary' ? 'text-[var(--color-tertiary)]' : 'text-[var(--color-primary)]';
  const linkColor = path.color === 'tertiary' ? 'text-[var(--color-tertiary)]' : 'text-[var(--color-primary)]';

  return (
    <Card hover className="group relative overflow-hidden p-8">
      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--radius-xl)] ${iconBg} ${iconColor}`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-headline-lg font-bold text-[var(--color-on-surface)]">{path.title}</h3>
      <p className="mt-2 text-body-md text-[var(--color-on-surface-variant)]">{path.desc}</p>
      <ul className="mt-4 space-y-2">
        {[path.bullet1, path.bullet2].map((b) => (
          <li key={b} className="flex items-center gap-2 text-label-lg text-[var(--color-on-surface-variant)]">
            <Check className={`h-4 w-4 ${checkColor} shrink-0`} />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/courses"
        className={`mt-6 inline-flex items-center gap-1 font-bold ${linkColor} hover:underline`}
      >
        {path.linkLabel}
      </Link>
    </Card>
  );
}
