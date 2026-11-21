"use client";

import { useReducedMotionConfig, useScroll } from "motion/react";
import { useLayoutEffect, type RefObject } from "react";

import { CassetteReels } from "@/components/cassette/CassetteReels";
import { isOpenedFromShelf, setPlayerSlug, useReelsInPlayer } from "@/lib/case-study-route";
import { DESKTOP_SHELF, useMediaQuery } from "@/lib/use-media-query";

type TapeProgressProps = {
  slug: string;
  /** False while the overlay plays its closing animation: the reels fly home at the start of it */
  playing: boolean;
  /** The overlay panel: it scrolls, not the page */
  containerRef: RefObject<HTMLElement | null>;
};

/**
 * The player's reels (SPEC §8): they turn and pass the tape from left to right as the reader scrolls
 * the case study. Scroll-driven only, never on their own, so no pause control is needed (WCAG 2.2.2).
 */
export function TapeProgress({ slug, playing, containerRef }: TapeProgressProps) {
  const { scrollYProgress } = useScroll({ container: containerRef });
  const desktop = useMediaQuery(DESKTOP_SHELF);
  const claimed = useReelsInPlayer(slug);
  // Even at 0ms a layout animation paints its first frame at the cover's size: under reduced motion
  // the reels simply stay where they are
  const reduceMotion = useReducedMotionConfig();

  // Claim the cover's reels once mounted (layout effect: the swap renders before the first paint);
  // let go when the tape stops, so they fly back while the panel fades out
  useLayoutEffect(() => {
    if (!playing || !desktop || reduceMotion || !isOpenedFromShelf()) return;
    setPlayerSlug(slug);
    return () => setPlayerSlug(null);
  }, [playing, desktop, reduceMotion, slug]);

  return (
    <CassetteReels
      layoutId={claimed ? `reels-${slug}` : undefined}
      progress={scrollYProgress}
      className="w-24 md:w-32"
    />
  );
}
