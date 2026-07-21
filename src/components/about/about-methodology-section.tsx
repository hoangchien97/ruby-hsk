"use client";

import { useTranslations } from "next-intl";
import { Target, Heart, CheckCircle2 } from "lucide-react";
import { IconBox } from "@/components/ui/icon-box";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal, ScrollRevealItem } from "@/components/ui/scroll-reveal";

const METHODS = [
  { key: "method1", icon: Target },
  { key: "method2", icon: Heart },
  { key: "method3", icon: CheckCircle2 },
];

/**
 * Methodology section (About page).
 */
export function AboutMethodologySection() {
  const t = useTranslations("About");

  return (
    <section className="bg-[var(--color-surface-container-low)] border-y border-[var(--color-surface-variant)]/60 app-section">
      <div className="app-container">
        <ScrollReveal>
          <SectionHeader
            badge={t("methodologyBadge")}
            title={t("methodsTitle")}
            description={t("methodsDesc")}
            className="mb-8 md:mb-12"
          />
        </ScrollReveal>

        <ScrollReveal variant="stagger" className="grid gap-6 md:grid-cols-3">
          {METHODS.map(({ key, icon }) => (
            <ScrollRevealItem key={key}>
              <div className="p-8 rounded-[var(--radius-3xl)] bg-[var(--color-surface-container-lowest)] border border-[var(--color-surface-variant)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-coral)] hover:-translate-y-1 transition-all duration-300">
                <IconBox icon={icon} color="primary" className="mb-6" />
                <h4 className="text-title-md font-bold text-[var(--color-on-surface)] mb-3">
                  {t(`${key}Title`)}
                </h4>
                <p className="text-body-md text-[var(--color-on-surface-variant)] leading-relaxed">
                  {t(`${key}Desc`)}
                </p>
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
