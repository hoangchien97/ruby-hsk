"use client";

import { useTranslations } from "next-intl";
import { Palette } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal, ScrollRevealItem } from "@/components/ui/scroll-reveal";

const GALLERY_IMAGES = [
  {
    key: "env1",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJbT2xGW9pOXPprqLgsgOhNIiGQjgSq6ODiOXFFL7vpUyYkiRGJ3J1BHls-2Hutk4OXyvyKciIiCemMgNkxbFmP4tkPyAIpRwVF_8gGzQ0bhAl6hCZQoEY6uwQxtopEJtlsa1olTjnf_wr3zU8K7AYKVO63D28k59H-3UeVS5Oup0CWe247uPZvaREULPP9Q2qvz7fD10B4E0AoBVFZAtrK4nKdyh_7_RUVjh37VKqCP97LUEI25DHU7cT-dRs-LTMZSRYhIlZPWI",
  },
  {
    key: "env2",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEKkSR78lZ91kO1FE0afretCmpX-aRglt9Fyi2g50cIRHtfCn72ZWK_SmFpRsHJViTll5MOm_oLCykyBgTsRVxu91bgNPPUgTf1KgYGPVT8wWIhOiogsYjTwVSz60HOGTAwlw-sgoJwmvlPiNpBxARcsPK2rU5BlrLlZ8OwfhwbaT78T8l3UuZ3ZrWQ7yL02Aq-C_jMtbSq68TptQ2Kubl1qkVdJN3cYIU1Vzi0AcqyWzYBt1tjAFQgJz2n3DIPlKW0tf-A2m5_AY",
  },
  {
    key: "env3",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAr0gOnpmdjB-BxMPbBmnyjdrFbrFGjUry96sHfPHtwpfiIW9ZZIAxIlWkrFlfqr0L9jsen_NU7-RPz2EMidHFCy9OO83WGQXnFzJh1P-K-G9NHOk1rQRGc0tKGkHyxjdpeWHCfuyJ5k9b6ORE1Ca4hmNmnzssEB0rmckb-3EkdUj4ElnBmK6U8sNEM4oLZFal_S2TSppEnhhrv-CCm56dP7LZRyBNnBWuAlcV7md8sdoGxD1tEh6XSrjH7hiwYpEDt8P6LwkYAQ5s",
  },
] as const;

/**
 * "Learning Environment" gallery section (About page).
 * Stitch's mockup shipped a 4th tile with a broken image URL — rendered here as
 * an icon placeholder tile instead of a fake photo. Swap in a real photo when available.
 */
export function AboutLearningEnvironmentSection() {
  const t = useTranslations("About");

  return (
    <section className="app-section">
      <div className="app-container">
        <ScrollReveal>
          <SectionHeader
            title={t("learningEnvTitle")}
            description={t("learningEnvDesc")}
            className="mb-8 md:mb-12"
          />
        </ScrollReveal>

        <ScrollReveal variant="stagger" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GALLERY_IMAGES.map(({ key, src }) => (
            <ScrollRevealItem key={key} className="space-y-3">
              <div className="aspect-video rounded-[var(--radius-2xl)] overflow-hidden shadow-[var(--shadow-soft)]">
                <img
                  src={src}
                  alt={t(`${key}Title`)}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-[var(--color-on-surface)]">
                  {t(`${key}Title`)}
                </h4>
                <p className="text-label-sm text-[var(--color-on-surface-variant)]">
                  {t(`${key}Desc`)}
                </p>
              </div>
            </ScrollRevealItem>
          ))}

          <ScrollRevealItem className="space-y-3">
            <div className="aspect-video rounded-[var(--radius-2xl)] bg-[var(--color-surface-container-low)] border border-[var(--color-surface-variant)] flex items-center justify-center">
              <Palette
                className="w-10 h-10 text-[var(--color-primary)]/40"
                aria-hidden="true"
              />
            </div>
            <div>
              <h4 className="font-bold text-[var(--color-on-surface)]">
                {t("env4Title")}
              </h4>
              <p className="text-label-sm text-[var(--color-on-surface-variant)]">
                {t("env4Desc")}
              </p>
            </div>
          </ScrollRevealItem>
        </ScrollReveal>
      </div>
    </section>
  );
}
