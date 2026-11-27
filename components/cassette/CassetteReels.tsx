"use client";

import {
  useMotionValue,
  useReducedMotionConfig,
  useTransform,
  type MotionValue,
} from "motion/react";
import * as m from "motion/react-m";

type CassetteReelsProps = {
  /** 0 → all tape on the left reel, 1 → all on the right. Omitted: an unplayed tape. */
  progress?: MotionValue<number>;
  /** The tape is playing in the deck: the hubs turn on their own, slowly (cassette.css) */
  spinning?: boolean;
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
 * The window of a tape: two reels behind smoked plastic, the brown tape passing from the left one to the
 * right one as you read. Decorative (reading progress is already the scroll position), so hidden from
 * assistive tech. Under reduced motion the hubs stop turning; the tape amounts still follow the scroll,
 * because they show where you are rather than move on their own.
 */
export function CassetteReels({ progress, spinning = false, className }: CassetteReelsProps) {
  const unplayed = useMotionValue(0);
  const played = progress ?? unplayed;
  // Follows MotionConfig, so D7's "pause motion" (reducedMotion="always") stops the reels too
  const reduceMotion = useReducedMotionConfig();

  const leftScale = useTransform(played, (share) => packScale(1 - share));
  const rightScale = useTransform(played, (share) => packScale(share));
  const rotate = useTransform(played, (share) => (reduceMotion ? 0 : share * 360 * TURNS_PER_READ));

  return (
    <div aria-hidden="true" className={className}>
      <svg viewBox="0 0 100 24" focusable="false" className="block w-full">
        <rect x="18" y="2" width="64" height="20" rx="10" className="fill-tape-window" />
        {/* The tape between the reels, along the bottom of the window */}
        <rect x="30" y="18.6" width="40" height="1.2" className="fill-tape" />
        {[
          { cx: 30, scale: leftScale },
          { cx: 70, scale: rightScale },
        ].map(({ cx, scale }) => (
          <g key={cx} transform={`translate(${cx} 12)`}>
            <m.circle r={PACK} className="cassette-pack fill-tape" style={{ scale }} />
            <g className={spinning ? "reel-spin" : undefined}>
              <m.g style={{ rotate }}>
                <circle r={HUB} strokeWidth="0.8" className="fill-paper stroke-ink" />
                {/* Six teeth, as on a real hub */}
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                  <rect
                    key={angle}
                    x="-0.6"
                    y={-HUB}
                    width="1.2"
                    height="1.8"
                    transform={`rotate(${angle})`}
                    className="fill-ink"
                  />
                ))}
                <circle r="1.2" className="fill-ink" />
              </m.g>
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
