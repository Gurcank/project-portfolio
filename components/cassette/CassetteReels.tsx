"use client";

import {
  useMotionValue,
  useReducedMotionConfig,
  useTransform,
  type MotionValue,
} from "motion/react";
import * as m from "motion/react-m";

import { durationSeconds, easingPoints } from "@/lib/motion-tokens";

type CassetteReelsProps = {
  /** 0 → all tape on the left reel, 1 → all on the right. Omitted: an unplayed tape. */
  progress?: MotionValue<number>;
  /** Shared between the shelf cover and the player bar, so the reels fly from one to the other */
  layoutId?: string;
  className?: string;
};

// Radii in viewBox units: a full tape pack and the bare hub it winds on
const PACK = 9;
const HUB = 4.5;
// Three turns over a whole case study: enough to read as turning, slow enough not to whirl
const TURNS_PER_READ = 3;

/** The tape area is conserved, so a reel holding `share` of it has radius √(hub² + share·(pack² − hub²)). */
function packScale(share: number): number {
  return Math.sqrt(HUB ** 2 + share * (PACK ** 2 - HUB ** 2)) / PACK;
}

/**
 * The window of a tape: two reels, the tape moving from the left one to the right one as you read.
 * Decorative (reading progress is already the scroll position), so it is hidden from assistive tech.
 * Under reduced motion the reels stop turning; the tape amounts still follow the scroll, because they
 * show where you are rather than move on their own.
 */
export function CassetteReels({ progress, layoutId, className }: CassetteReelsProps) {
  const unplayed = useMotionValue(0);
  const played = progress ?? unplayed;
  // Follows MotionConfig, so D7's "pause motion" (reducedMotion="always") stops the reels too
  const reduceMotion = useReducedMotionConfig();

  const leftScale = useTransform(played, (share) => packScale(1 - share));
  const rightScale = useTransform(played, (share) => packScale(share));
  const rotate = useTransform(played, (share) => (reduceMotion ? 0 : share * 360 * TURNS_PER_READ));

  return (
    // layoutId sits on an HTML wrapper: Motion projects (measures and flies) HTML boxes, not SVG
    <m.div
      layoutId={layoutId}
      // The tape "playing": the slow token, same curve as every entrance on the site
      transition={{
        layout: { duration: durationSeconds("--duration-slow"), ease: easingPoints("--ease-out") },
      }}
      aria-hidden="true"
      className={className}
    >
      <svg viewBox="0 0 100 24" focusable="false" className="block w-full">
        <rect x="18" y="2" width="64" height="20" rx="10" className="fill-ink" />
        {[
          { cx: 30, scale: leftScale },
          { cx: 70, scale: rightScale },
        ].map(({ cx, scale }) => (
          <g key={cx} transform={`translate(${cx} 12)`}>
            {/* Light tape on the dark window: the amount on each reel is the progress, so it has to read */}
            <m.circle r={PACK} className="fill-line" style={{ scale }} />
            <m.g style={{ rotate }}>
              <circle r={HUB} strokeWidth="0.8" className="fill-paper stroke-ink" />
              {[0, 120, 240].map((angle) => (
                <rect
                  key={angle}
                  x="-0.8"
                  y={-HUB}
                  width="1.6"
                  height="2"
                  transform={`rotate(${angle})`}
                  className="fill-ink"
                />
              ))}
              <circle r="1.2" className="fill-ink" />
            </m.g>
          </g>
        ))}
      </svg>
    </m.div>
  );
}
