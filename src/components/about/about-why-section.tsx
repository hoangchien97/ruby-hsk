"use client";

import { useTranslations } from "next-intl";
import { BookOpen, GraduationCap, Laptop, ShieldCheck } from "lucide-react";
import { IconBox } from "@/components/ui/icon-box";

const WHY_ITEMS = [
  { key: "why1", icon: BookOpen },
  { key: "why2", icon: GraduationCap },
  { key: "why3", icon: Laptop },
  { key: "why4", icon: ShieldCheck },
];

/**
 * "Why Ruby HSK" section (About page).
 */
export function AboutWhySection() {
  const t = useTranslations("About");

  return (
    <section className="container max-w-[1400px] px-4 py-16 md:py-24 mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-headline-lg md:text-[40px] font-bold text-[var(--color-on-surface)] mb-4">
          {t("whyTitle")}
        </h2>
        <p className="text-body-lg block text-[var(--color-on-surface-variant)] font-medium">
          {t("whyDesc")}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {WHY_ITEMS.map(({ key, icon }) => (
          <div
            key={key}
            className="flex gap-6 p-8 rounded-[2.5rem] bg-[var(--color-surface-container-lowest)] border border-[var(--color-surface-variant)] shadow-sm hover:shadow-md transition-all duration-300"
          >
            <IconBox icon={icon} color="tertiary" />
            <div>
              <h4 className="text-title-md font-bold text-[var(--color-on-surface)] mb-2">
                {t(`${key}Title`)}
              </h4>
              <p className="text-body-md text-[var(--color-on-surface-variant)] leading-relaxed">
                {t(`${key}Desc`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
