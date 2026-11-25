"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

import { useMotionPaused } from "@/lib/experience-store";

// Loaded after hydration: nothing animates on first paint, the features are only needed on a click
const loadFeatures = () => import("./motion-features").then((module) => module.default);

/**
 * One Motion context for the page (ADR-06): `m` components only (strict), features fetched lazily,
 * and transform/layout animations switched off when the OS asks for reduced motion.
 * The "pause motion" control (D7) turns them off for everyone: reducedMotion "always".
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const paused = useMotionPaused();
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion={paused ? "always" : "user"}>{children}</MotionConfig>
    </LazyMotion>
  );
}
