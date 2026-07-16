"use client";

import { useTranslations } from "next-intl";
import {
  GraduationCap,
  Award,
  Trophy,
  Sparkles,
  Clock,
  Users,
} from "lucide-react";
import type { TeacherProfile } from "@/types/models";

interface AboutTeacherSectionProps {
  teacher: TeacherProfile | null;
}

const ACHIEVEMENTS_CONFIG = [
  { key: "edu1", icon: GraduationCap },
  { key: "edu2", icon: Award },
  { key: "edu3", icon: Trophy },
  { key: "edu4", icon: Sparkles },
  { key: "edu5", icon: Clock },
  { key: "edu6", icon: Users },
];

const TEACHER_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA_HLR14qslYkcLobQ_5yQ8j8NpWtFzIdqU5CZ10zu9nRGGkwNKwNrVBjsyHdzI6YF5-jG7g5YGY5aqHgsWl-UPtpr_4OHDrAzGJ1-s4vUy7QtRrzfhs6cL_iIAoV5J_oDzgjapoypIoIm75UFy9p6xXbM4le3Ka-W_8TsFqxJKsfrLedPIAEw-pJzHOuhUgN74V8-kWGUzNQ9xJwNCZpiFMoPGdGdAMEF6ZZg0pyzhnHO-BTtygCOOuO_ze6AJrH3hXFu0hIaVMLU";

/**
 * Teacher Portrait & Academy Credentials section (About page).
 * Portrait sits left / content right, matching Stitch's about_new Teacher Spotlight layout.
 */
export function AboutTeacherSection({ teacher }: AboutTeacherSectionProps) {
  const t = useTranslations("About");

  return (
    <section className="app-section bg-[var(--color-surface-container-low)]">
      <div className="app-container">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          {/* Left: Portrait */}
          <div className="w-full lg:w-1/3 shrink-0">
            <div className="relative group max-w-sm mx-auto lg:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-container)] to-[var(--color-primary)] rounded-[var(--radius-3xl)] transform rotate-3 scale-105 opacity-20 group-hover:rotate-0 transition-transform duration-300" />
              <img
                src={TEACHER_IMAGE_URL}
                alt={t("introTeacher")}
                className="relative z-10 w-full aspect-square object-cover rounded-[var(--radius-3xl)] shadow-[var(--shadow-coral)]"
              />
            </div>
          </div>

          {/* Right: Intro + Achievement Grid + Quote */}
          <div className="w-full lg:w-2/3 space-y-8">
            <div>
              <span className="text-label-lg font-bold tracking-widest text-[var(--color-secondary)] uppercase">
                {t("foundingInstructor")}
              </span>
              <h2 className="text-headline-lg md:text-[40px] font-bold text-[var(--color-on-surface)] mt-2 mb-4">
                {t("introTeacher")}
              </h2>
              <p className="text-body-lg text-[var(--color-on-surface-variant)] leading-relaxed">
                {t("teacherBio")}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ACHIEVEMENTS_CONFIG.map(({ key, icon: Icon }) => (
                <div
                  key={key}
                  className="p-5 rounded-[var(--radius-xl)] bg-[var(--color-surface-container-lowest)] border border-l-4 border-[var(--color-primary)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-coral)] transition-all duration-300"
                >
                  <Icon className="w-6 h-6 text-[var(--color-primary)] mb-2" />
                  <p className="text-sm font-bold text-[var(--color-on-surface)] leading-tight">
                    {t(`${key}Title`)}
                  </p>
                  <p className="text-xs text-[var(--color-on-surface-variant)] mt-0.5 leading-snug">
                    {t(`${key}Desc`)}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-body-lg italic text-[var(--color-on-surface-variant)] leading-relaxed border-l-2 border-[var(--color-primary)]/20 pl-6 py-1">
              {t("teacherQuote")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
