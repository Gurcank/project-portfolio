"use client";

import { setMotionPaused, useMotionPaused } from "@/lib/experience-store";
import type { SiteCopy } from "@/lib/content";

type MotionToggleProps = {
  labels: SiteCopy["microcopy"]["motion"];
  className?: string;
};

/**
 * "Pause motion / Resume motion" (WCAG 2.2.2). A real toggle button: aria-pressed tells screen readers
 * the state, and the label says what pressing it will do.
 */
export function MotionToggle({ labels, className }: MotionToggleProps) {
  const paused = useMotionPaused();
  return (
    <button
      type="button"
      aria-pressed={paused}
      onClick={() => setMotionPaused(!paused)}
      className={`inline-flex min-h-12 items-center gap-2 font-mono text-label tracking-wide uppercase underline-offset-4 hover:underline ${className ?? ""}`}
    >
      <span aria-hidden="true">{paused ? "▶" : "❚❚"}</span>
      {paused ? labels.resume : labels.pause}
    </button>
  );
}
