'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { ReactNode, ElementType } from 'react';

/**
 * Entrance animation variants used across all scroll-reveal components.
 * Slides content upward and fades it in.
 */
export const REVEAL_VARIANTS = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/** Staggered container — children animate in sequence */
export const STAGGER_CONTAINER = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

/** Individual staggered child item */
export const STAGGER_ITEM = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/** Scale-in variant — suitable for cards and stat blocks */
export const SCALE_IN = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

interface ScrollRevealProps {
  children: ReactNode;
  /** Extra CSS classes applied to the wrapper element */
  className?: string;
  /**
   * Which animation variant to apply.
   * - `fade-up`   — slide up + fade (default)
   * - `stagger`   — stagger children via STAGGER_CONTAINER
   * - `scale-in`  — gentle scale + fade
   */
  variant?: 'fade-up' | 'stagger' | 'scale-in';
  /**
   * Fraction of the element that must be visible to trigger.
   * Defaults to 0.15 so most sections animate before they're fully in view.
   */
  amount?: number;
  /** Animate only once (default true) */
  once?: boolean;
  /** Override the animation delay in seconds */
  delay?: number;
  /** Which HTML element to render as. Defaults to "div". */
  as?: ElementType;
}

/**
 * ScrollReveal — wraps any section or group of elements with a scroll-triggered
 * entrance animation powered by Framer Motion.
 *
 * Usage:
 * ```tsx
 * <ScrollReveal>
 *   <p>This slides in when it enters the viewport.</p>
 * </ScrollReveal>
 *
 * <ScrollReveal variant="stagger">
 *   <Card />
 *   <Card />
 *   <Card />
 * </ScrollReveal>
 * ```
 */
export function ScrollReveal({
  children,
  className = '',
  variant = 'fade-up',
  amount = 0.15,
  once = true,
  delay,
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once, amount });

  const variants =
    variant === 'stagger'
      ? STAGGER_CONTAINER
      : variant === 'scale-in'
        ? SCALE_IN
        : REVEAL_VARIANTS;

  const MotionTag = motion(Tag as ElementType);

  // When a delay is specified, merge it into the variant's visible transition
  const resolvedVariants =
    delay !== undefined
      ? {
          ...variants,
          visible: {
            ...(variants as { visible: { transition?: object } }).visible,
            transition: {
              ...((variants as { visible: { transition?: object } }).visible
                ?.transition ?? {}),
              delay,
            },
          },
        }
      : variants;

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={resolvedVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </MotionTag>
  );
}

/**
 * ScrollRevealItem — child item for use inside a ScrollReveal with variant="stagger".
 * Each child staggers in after the previous one.
 */
export function ScrollRevealItem({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const MotionTag = motion(Tag as ElementType);
  return (
    <MotionTag className={className} variants={STAGGER_ITEM}>
      {children}
    </MotionTag>
  );
}
