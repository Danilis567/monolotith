'use client';

import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import type { ReactNode } from 'react';

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/**
 * Unclipped plate container: preserves immediate full visibility across SSR,
 * fast scroll, deep anchor jumps, and `prefers-reduced-motion: reduce`.
 */
export function PlateCurtain({
  children,
  className,
}: {
  children: ReactNode;
  priority?: boolean;
  delay?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

/**
 * Structural hairline drafting rule spanning the full grid axis immediately
 * without scroll-triggered scale traps.
 */
export function HairlineDraw({
  className,
  thick = false,
}: {
  className?: string;
  thick?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        display: 'block',
        inlineSize: '100%',
        blockSize: thick ? '2px' : '1px',
        backgroundColor: thick ? 'var(--border-structural)' : 'var(--border-hairline)',
      }}
    />
  );
}

/**
 * Restrained low-amplitude GPU transform parallax for the hero echo wordmark.
 */
export function HeroEchoParallax({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 750], [0, 28]);

  if (prefersReduced) {
    return (
      <div aria-hidden="true" className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      className={className}
      style={{ y, willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
}
