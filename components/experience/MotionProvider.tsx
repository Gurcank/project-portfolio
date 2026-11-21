"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Loaded after hydration: nothing animates on first paint, the features are only needed on a click
const loadFeatures = () => import("./motion-features").then((module) => module.default);

/**
 * One Motion context for the page (ADR-06): `m` components only (strict), features fetched lazily,
 * and transform/layout animations switched off when the OS asks for reduced motion.
 * D7's "pause motion" control will flip reducedMotion to "always".
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
