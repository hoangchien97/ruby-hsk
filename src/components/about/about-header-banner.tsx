"use client";

import { useTranslations } from "next-intl";
import { SectionBadge } from "@/components/ui/section-badge";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

/**
 * About page stats:
 * Tách biệt số và đơn vị trước khi truyền vào AnimatedCounter:
 * - statYears (5+)      -> số 5 và hậu tố "+"
 * - statStudents (10k+) -> số 10 và hậu tố "k+"
 * - statPassRate (98%)  -> số 98 và hậu tố "%"
 */
const ABOUT_STATS_CONFIG = [
  { value: 5, suffix: "+", labelKey: "statYearsLabel" },
  { value: 10, suffix: "k+", labelKey: "statStudentsLabel" },
  { value: 98, suffix: "%", labelKey: "statPassRateLabel" },
] as const;

const HERO_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCT3jR_1t344lMF6ppu1RTo7eluMUxd2SiK-zz4zHOQ-JYIA-VWnpAe_RbE54TlR0f51bHU3LaF5oA-OzWAxlNeG2FoGaaetLf6_kN6XJDWaAF_Re1V64jdHW3jshdOS-LpNlxhTfIPbi-Nsths6PrcNit1r991P0jue5ZUx4Im_mF-Z2ha1DUyRpYD6_jLOryLPYpTUbXMuKfm-6HAjdO-DFGpXHe-mjBjeVX4AT4vOVZ01VNO2ixAJ0ueUZGO1W59YmUOpgYfeCs";

/**
 * About page header banner — two-column hero (text + portrait) on desktop,
 * the portrait collapses away below `lg`.
 */
export function AboutHeaderBanner() {
  const t = useTranslations("About");

  return (
    <section className="relative overflow-hidden app-section border-b border-[var(--color-surface-variant)]/40 bg-gradient-to-b from-[var(--color-surface-container-low)] to-[var(--color-bg)]">
      <div className="app-container relative z-10">
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-center">
          {/* Left: Copy + stats */}
          <ScrollReveal>
            <SectionBadge>{t("aboutBadge")}</SectionBadge>
            <h1 className="text-headline-lg-mobile md:text-display-lg font-bold text-[var(--color-on-background)] tracking-tight leading-[1.1] mb-6 mt-6">
              {t("title")}
            </h1>
            <p className="text-body-lg md:text-xl text-[var(--color-on-surface-variant)] leading-relaxed font-medium">
              {t("desc")}
            </p>

            {/* Stats bar */}
            <div className="mt-10 grid grid-cols-3 gap-4 pt-8 border-t border-[var(--color-primary)]/10 max-w-lg">
              {ABOUT_STATS_CONFIG.map(({ value, suffix, labelKey }) => (
                <div key={labelKey}>
                  <p className="text-headline-lg text-[var(--color-on-surface)] font-bold">
                    <AnimatedCounter value={value} suffix={suffix} delay={0.55} duration={1400} />
                  </p>
                  <p className="text-label-lg text-[var(--color-on-surface-variant)] uppercase font-semibold tracking-wide mt-1">
                    {t(labelKey)}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Right: Portrait */}
          <ScrollReveal delay={0.15} className="hidden lg:block relative">
            <div className="relative aspect-[4/5] rounded-[var(--radius-3xl)] overflow-hidden shadow-[var(--shadow-coral)]">
              <img
                src={HERO_IMAGE_URL}
                alt={t("heroImageAlt")}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--color-primary)]/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[var(--color-secondary-container)]/25 rounded-full blur-3xl -z-10" />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
