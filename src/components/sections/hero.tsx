'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/i18n/navigation';
import { Stats } from '@/lib/constants/site';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HomeHeroProps {
  locale?: string;
}

export function HomeHero({ locale = 'vi' }: HomeHeroProps) {
  const t = useTranslations('Home');
  const isVi = locale === 'vi';

  // Slideshow image content
  const heroImages = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDbFBb82lRSeuobo6SrZytoFNjlhrQray2IQqy_ZcZCLp0DpbnIiCH-dV6bQDktYpJY59JWGHqJTjxovyolXpPIh6sohE8yfr5R7I2emBfoZZLPUbHQK2rS1FXvkjF6PleQXb7a13NwnSfjNQAr-ggHOUgHpScdSc6sEUuk-SEKmMP6_yIUkBz9k04Tbg1ObDoqYaXjRZMduQVEtxT-XUzYqos3WnhVoUu3SlCpg88DcUpBYeIYmrgsT013znmcv-8WqLo5N8lxorw',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBvBTDpKBKo3KwpzbOOJf6xz-axCjUgQh33SsZCNDz9tGu_Faj_EiNPO79Sdd2diH1dKQ74b4y5KlIUQz0QYdRoSpRlWsV7CjKLlIwqzt6sdVDx22u0FY-ha96yBBxquL-41vJAE5_WnKxBmtx7j37s2rL9j7ra8dR8MNcsLlVpp3yX-JpvYnH860OIuFWuOEyrcEf23X-E3Z832jtzuo9wz6KQCybLALhOkW6pn-o5CVVD-MW5nQ40S4y8lB9L6MOZPLS4LVGWK2E',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA23Y3SFWaZP-Ro_dUvOyYG-X5IkTeRDuYfRGw9X3zZmykkS1NMQ5sG8tkzT_HokcHz_2AHCTppablTIFb5WLRShllqVnrmmLCCxTFKzcS2znbfo8PtUxeGNqeqvQBlluckFP13YenSGn_TXHaz5mRQags4U5pdC4KWo1zlwiF5gJ0W9Xbsx8VUGQ1EabmcsAqaOGHDyfXvOAy6vZrF137vzFGpQFzTy_KmVlS1O79DLf_jsJmBW6bo7bL_TuZPPJ9VzM7Zz9udC2E'
  ];

  const avatars = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD4fPOZ6z6CmoWXRBBBoih66Mzxw43Lqk_xGfIQzow4MdNWuSyJvC-ChNGy2jjpguIB91PuGr4A34YvmcCOU0HtJc--mXrI1xoMicHVSnfW2-cF50xMIZQqSAqa643tL2EdP_CNUfvoVwbWuXaiBzyDQiRquBFTp1M_UQUa3UV4aNjD48Ogw3nTYDoodm1iNrban0RXcfBucorpELcuUm4_2w6ymPC0-gF7QcekQEU16dNZTnUqDtpOBOyGhocC-coK8U2eh_u4Jlc',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDdCqh9Q0x77zLYs0IUXLcrq87LbvqE5hKFE4-01NYemsJe8JVmgdaLDcrMJdttXMK_aErbS5lCljC1SceB9vowg4y2BRg8Ia5cVwBi4_kodtXK0iukU7u97fKYYPyRJ_3C-s-OMeEBrm8xAESvdvyxhHPU1hoMpJMA9XyGptlxkXsWvaO023d1FJ2jZAA00COaUARROn5WTFuuMVI4c57SNKufokAmwDxSglj6Kc-AakRk_BFFMW5G_F3pWYK9VtRMUvja-VMze9o',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuACT33xlbhf8B5Tg0nDhH2C5g9zq12lZLCjyaOeX7025fPiHA-WtHS4prfbzyuE7Ddj7SZ_8BFFqIawI5Xg-i-STr0LjAhhfOqMbq2MF1u5nj-teMhdOanPmFr9a3sWm_cC8BhRoQ2kAsfCXzm63wbqn6anNNiCnnjbGu8fGrQ6XR-rSS6zP31xmYMMxiEId_pEeOF-5PyS8gOSCTOQwhkvBMsIZK9SnJ863GajofFvxOZk1WQEcdWcdAzFSN2-nk14D_iakJ5N9pM'
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-16 pb-32">
        {/* Mobile Background Slideshow */}
        <div className="absolute inset-0 md:hidden z-0 pointer-events-none">
          {heroImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-20 z-10' : 'opacity-0 z-0'
                }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/50 z-20" />
        </div>

        <div className="container relative z-10 max-w-[1400px] px-4 mx-auto grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Left: Copy */}
          <div className="z-10">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] font-bold text-label-lg mb-6">
              <Sparkles className="w-4.5 h-4.5 mr-2 text-[var(--color-primary)]" />
              {t('badge')}
            </span>

            <h1 className="text-display-lg md:text-7xl font-extrabold text-[var(--color-on-background)] mb-6 leading-tight">
              {isVi ? 'Học Tiếng Trung' : 'Study Chinese'} <br />
              <span className="text-[var(--color-primary)]">{isVi ? 'Thật Nhẹ Nhàng' : 'Soft & Natural'}</span>
            </h1>

            <p className="text-body-lg text-[var(--color-on-surface-variant)] mb-10 max-w-xl">
              {t('sub')}
            </p>

            <div className="mt-8 grid grid-cols-2 md:flex md:flex-wrap gap-3 md:gap-4 mb-8">
              <Link href="/contact" className="w-full md:w-auto">
                <Button className="w-full rounded-full h-12 md:h-14 px-4 md:px-8 text-[13px] md:text-base font-bold bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-lg shadow-[var(--color-primary)]/20 hover:scale-105 transition-transform">
                  {isVi ? 'Bắt đầu học ngay' : 'Start learning'}
                </Button>
              </Link>
              <Link href="/courses" className="w-full md:w-auto">
                <Button variant="secondary" className="w-full rounded-full h-12 md:h-14 px-4 md:px-8 text-[13px] md:text-base font-bold transition-colors">
                  {isVi ? 'Lộ trình học tập' : 'Learning roadmap'}
                </Button>
              </Link>
            </div>

            {/* Active Students Counter */}
            <div className="flex flex-wrap gap-4">
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
                {isVi ? 'Tham gia cùng 2.000+ học viên độc lập' : 'Join 2,000+ active students'}
              </p>
            </div>
          </div>

          {/* Right: Slideshow */}
          <div className="relative hidden md:block">
            {/* Decorative blurs */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[var(--color-secondary-container)]/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[var(--color-primary-container)]/10 rounded-full blur-3xl"></div>

            {/* Carousel Frame */}
            <div className="relative bg-white rounded-[2rem] p-6 coral-shadow rotate-2 hover:rotate-0 transition-transform duration-500 max-w-lg ml-auto border border-[var(--color-surface-variant)]/45 z-10 group">
              <div className="relative rounded-2xl w-full h-[360px] overflow-hidden bg-slate-100">
                {/* Images */}
                {heroImages.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Ruby HSK slide ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                      }`}
                  />
                ))}

                {/* Left/Right Controls on hover */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[var(--color-on-surface)] flex items-center justify-center blur-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-neutral-300/40 shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[var(--color-on-surface)] flex items-center justify-center blur-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-neutral-300/40 shadow-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Bottom Dots indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                  {heroImages.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentSlide
                        ? 'bg-[var(--color-primary)] w-6'
                        : 'bg-white/60 hover:bg-white'
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Stats bar ── */}
      <TrustStats locale={locale} />
    </>
  );
}

function TrustStats({ locale }: { locale: string }) {
  const isVi = locale === 'vi';
  return (
    <section className="container max-w-[1400px] px-4 mx-auto relative -mt-16 z-20">
      <div className="rounded-[2.5rem] border border-[var(--color-surface-variant)] bg-[var(--color-surface-container-low)] py-4 shadow-sm grid grid-cols-2 text-center md:grid-cols-4">
        {Stats.map((stat, i) => (
          <div
            key={stat.value}
            className={`p-4 ${i > 0 ? 'border-l border-[var(--color-surface-variant)]' : ''}`}
          >
            <div className="text-display-lg text-[var(--color-primary)] font-bold">
              {stat.value}
            </div>
            <div className="mt-1 text-label-lg text-[var(--color-on-surface-variant)] font-semibold">
              {isVi ? stat.labelVi : stat.labelEn}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
