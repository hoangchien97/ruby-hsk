'use client';

import { useEffect, useState, useRef } from 'react';
import {
  useInView,
  useMotionValue,
  useMotionValueEvent,
  animate,
  useReducedMotion,
} from 'framer-motion';

/** Props for the AnimatedCounter component */
export interface AnimatedCounterProps {
  /** The final target value of the counter (can be a number or a string like "10k+", "95%") */
  value: number | string;
  /** The starting value of the animation (defaults to 0) */
  from?: number;
  /** A string prefix before the formatted number (e.g. "+") */
  prefix?: string;
  /** A string suffix after the formatted number (e.g. "%" or "+") */
  suffix?: string;
  /** The animation duration in seconds (defaults to 1.5) */
  duration?: number;
  /** Decimal precision (defaults to 0) */
  decimals?: number;
  /** Locale for formatting (defaults to "vi-VN") */
  locale?: string;
  /** Extra CSS classes */
  className?: string;
  /** Whether to animate only once when entering viewport (defaults to true) */
  once?: boolean;
  /** Viewport threshold to trigger the animation (defaults to 0.25) */
  threshold?: number;
  /** Custom Intl.NumberFormatOptions override */
  formatOptions?: Intl.NumberFormatOptions;
}

/**
 * Utility to parse formatted statistic strings like "10k+", "95%", "5+" into
 * numeric value, prefix, and suffix.
 */
export function parseStatString(valStr: string): {
  isNumeric: boolean;
  value: number;
  prefix: string;
  suffix: string;
} {
  const match = valStr.match(/^([^\d]*)([\d.,]+)([^\d]*)$/);
  if (!match) {
    return { isNumeric: false, value: 0, prefix: '', suffix: valStr };
  }

  const prefix = match[1] ?? '';
  const numVal = parseFloat(match[2].replace(/,/g, ''));
  const suffix = match[3] ?? '';

  if (isNaN(numVal)) {
    return { isNumeric: false, value: 0, prefix: '', suffix: valStr };
  }

  return { isNumeric: true, value: numVal, prefix, suffix };
}

/**
 * AnimatedCounter — scroll-triggered count-up animation.
 * Automatically handles both numeric values and formatted strings (e.g. "10k+", "95%").
 */
export function AnimatedCounter({
  value,
  from = 0,
  prefix = '',
  suffix = '',
  duration = 1.5,
  decimals = 0,
  locale = 'vi-VN',
  className = '',
  once = true,
  threshold = 0.25,
  formatOptions,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const shouldReduceMotion = useReducedMotion();

  // Parse target number, prefix, and suffix if value is a string
  const isString = typeof value === 'string';
  const parsed = isString
    ? parseStatString(value)
    : { isNumeric: true, value: Number(value), prefix: '', suffix: '' };

  const targetValue = parsed.isNumeric ? parsed.value : 0;
  const resolvedPrefix = prefix || parsed.prefix;
  const resolvedSuffix = suffix || parsed.suffix;

  const [isMounted, setIsMounted] = useState(false);
  const [displayValue, setDisplayValue] = useState(targetValue);
  const [hasAnimated, setHasAnimated] = useState(false);
  const motionValue = useMotionValue(from);

  // ── Mark as mounted on client ──────────────────────────────────────
  useEffect(() => {
    setIsMounted(true);
    if (parsed.isNumeric) {
      setDisplayValue(from); // reset to start position before animation
    }
  }, [from, parsed.isNumeric]);

  // ── Sync MotionValue → React state so the DOM actually updates ────
  useMotionValueEvent(motionValue, 'change', (latest) => {
    if (parsed.isNumeric) {
      setDisplayValue(latest);
    }
  });

  useEffect(() => {
    if (!isMounted || !isInView || hasAnimated || !parsed.isNumeric) return;

    // Immediately show final value for reduced-motion users
    if (shouldReduceMotion) {
      setDisplayValue(targetValue);
      setHasAnimated(true);
      return;
    }

    // Animate from `from` to `targetValue`
    motionValue.set(from);
    const controls = animate(motionValue, targetValue, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94], // ease-out-quart
    });

    controls.then(() => setHasAnimated(true));

    return () => controls.stop();
  }, [
    isMounted,
    isInView,
    targetValue,
    from,
    duration,
    shouldReduceMotion,
    hasAnimated,
    motionValue,
    parsed.isNumeric,
  ]);

  if (!parsed.isNumeric) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    ...formatOptions,
  });

  return (
    <span ref={ref} className={className}>
      {resolvedPrefix}
      {isMounted ? formatter.format(displayValue) : formatter.format(targetValue)}
      {resolvedSuffix}
    </span>
  );
}
