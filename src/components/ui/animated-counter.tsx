'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/** Props for the AnimatedCounter component */
export interface AnimatedCounterProps {
  /** The final target value of the counter (must be a clean number) */
  value: number;
  /** The starting value of the animation (defaults to 0) */
  from?: number;
  /** A string prefix before the formatted number (e.g. "+") */
  prefix?: string;
  /** A string suffix after the formatted number (e.g. "%" or "k+") */
  suffix?: string;
  /**
   * Animation duration in **milliseconds** (defaults to 1500).
   * Note: changed from seconds to ms for consistency with requestAnimationFrame.
   */
  duration?: number;
  /**
   * Delay before the counter starts, in **seconds** (defaults to 0).
   * Use this when the counter is inside a ScrollReveal to avoid animating
   * while the parent is still fading in (opacity: 0 → 1).
   * E.g. if parent ScrollReveal takes 0.5 s, set delay={0.55}.
   */
  delay?: number;
  /** Decimal precision (defaults to 0) */
  decimals?: number;
  /** Locale for formatting (defaults to "vi-VN") */
  locale?: string;
  /** Extra CSS classes */
  className?: string;
  /** Whether to animate only once when entering viewport (defaults to true) */
  once?: boolean;
  /** Viewport threshold to trigger the animation (defaults to 0.2) */
  threshold?: number;
  /** Custom Intl.NumberFormatOptions override */
  formatOptions?: Intl.NumberFormatOptions;
}

/**
 * AnimatedCounter — scroll-triggered count-up animation for numeric values.
 *
 * Architecture:
 * - useInView detects when the element enters the viewport.
 * - requestAnimationFrame drives the numeric tween (reliable, no FM internal state).
 * - SSR-safe: renders the final value on the server (no hydration mismatch, SEO-friendly).
 * - delay prop: wait N seconds before starting — prevents animating before a parent
 *   ScrollReveal has finished its own fade/scale-in animation.
 * - Respects prefers-reduced-motion: skips animation, shows final value instantly.
 */
export function AnimatedCounter({
  value,
  from = 0,
  prefix = '',
  suffix = '',
  duration = 1500,
  delay = 0,
  decimals = 0,
  locale = 'vi-VN',
  className = '',
  once = true,
  threshold = 0.2,
  formatOptions,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const shouldReduceMotion = useReducedMotion();

  const hasStarted = useRef(false);
  const rafId = useRef<number | null>(null);
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

  // SSR-safe: render final value on server so bots see the real number.
  // On client, animation will reset to `from` once it starts.
  const [count, setCount] = useState(value);

  useEffect(() => {
    // Only start once and only when the element is in the viewport
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;

    // Immediately show final value for reduced-motion users
    if (shouldReduceMotion) {
      setCount(value);
      return;
    }

    // ease-out-quart: fast start, gradual deceleration
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const startAnimation = () => {
      setCount(from); // reset to start value
      let startTime: number | null = null;

      const tick = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const current = from + (value - from) * easedProgress;
        setCount(current);

        if (progress < 1) {
          rafId.current = requestAnimationFrame(tick);
        } else {
          setCount(value); // pin to exact final value
        }
      };

      rafId.current = requestAnimationFrame(tick);
    };

    if (delay > 0) {
      timerId.current = setTimeout(startAnimation, delay * 1000);
    } else {
      startAnimation();
    }

    return () => {
      if (timerId.current) clearTimeout(timerId.current);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    ...formatOptions,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatter.format(Math.round(count))}
      {suffix}
    </span>
  );
}

/**
 * Utility to parse formatted statistic strings like "10k+", "95%", "5+" into
 * numeric value, prefix, and suffix.
 *
 * Examples:
 *   "10k+"  → { isNumeric: true, value: 10,  prefix: "", suffix: "k+" }
 *   "98%"   → { isNumeric: true, value: 98,  prefix: "", suffix: "%" }
 *   "5+"    → { isNumeric: true, value: 5,   prefix: "", suffix: "+" }
 *   "24/7"  → { isNumeric: false, value: 0,  prefix: "", suffix: "24/7" }
 */
export function parseStatString(valStr: string): {
  isNumeric: boolean;
  value: number;
  prefix: string;
  suffix: string;
} {
  // Matches any optional non-digit prefix, a continuous block of digits (with optional dots/commas), and any trailing non-digit suffix
  const match = valStr.match(/^([^\d]*)([\d.,]+)([^\d]*)$/);
  if (!match) {
    return { isNumeric: false, value: 0, prefix: '', suffix: valStr };
  }

  const prefix = match[1] ?? '';
  const numStr = match[2].replace(/,/g, '');
  const suffix = match[3] ?? '';

  // Explicit check to exclude standard date/ratio formats like "24/7" or "12/2026"
  if (suffix.startsWith('/')) {
    return { isNumeric: false, value: 0, prefix: '', suffix: valStr };
  }

  const numVal = parseFloat(numStr);
  if (isNaN(numVal)) {
    return { isNumeric: false, value: 0, prefix: '', suffix: valStr };
  }

  return { isNumeric: true, value: numVal, prefix, suffix };
}
