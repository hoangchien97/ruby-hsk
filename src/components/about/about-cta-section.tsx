"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

/**
 * CTA Banner section (About page) — gradient primary background.
 */
export function AboutCtaSection() {
  const t = useTranslations("About");

  return (
    <section className="app-section">
      <div className="app-container">
        <ScrollReveal variant="scale-in" className="p-8 md:p-16 rounded-[var(--radius-3xl)] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-container)] border border-[var(--color-primary)]/20 shadow-[var(--shadow-coral)] overflow-hidden relative text-center">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-headline-lg md:text-display-sm font-bold text-white mb-4">
              {t("ctaTitle")}
            </h2>
            <p className="text-body-lg text-white/90 mb-8 leading-relaxed font-medium">
              {t("ctaDesc")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  variant="inverted"
                  className="w-full rounded-full h-12 md:h-14 px-6 md:px-8 text-[13px] md:text-base font-bold"
                >
                  {t("ctaBtnConsult")}
                </Button>
              </Link>
              <Link href="/courses" className="w-full sm:w-auto">
                <Button className="w-full rounded-full h-12 md:h-14 px-6 md:px-8 text-[13px] md:text-base font-bold bg-transparent border-2 border-white/60 hover:border-white hover:bg-white/10 text-white">
                  {t("ctaBtnCourses")}
                </Button>
              </Link>
            </div>
          </div>

          {/* Decorative mesh */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
        </ScrollReveal>
      </div>
    </section>
  );
}
