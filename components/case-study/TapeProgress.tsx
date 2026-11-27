"use client";

import "@/components/cassette/cassette.css";
import { useReducedMotionConfig, useScroll } from "motion/react";
import { useEffect, useLayoutEffect, useState, type RefObject } from "react";

import { Cassette } from "@/components/cassette/Cassette";
import type { Project, ProjectCover } from "@/lib/content";
import { isOpenedFromShelf, setPlayerSlug, useTapeInPlayer } from "@/lib/case-study-route";
import { durationSeconds } from "@/lib/motion-tokens";
import { DESKTOP_SHELF, useMediaQuery } from "@/lib/use-media-query";

type TapeProgressProps = {
  slug: string;
  color: Project["color"];
  catalog: string;
  title: string;
  image?: ProjectCover["image"];
  /** False while the overlay plays its closing animation: the tape is ejected at the start of it */
  playing: boolean;
  /** The overlay panel: it scrolls, not the page */
  containerRef: RefObject<HTMLElement | null>;
};

/**
 * The tape deck in the overlay's bar (V2b, SPEC §8). Picked on the shelf, the whole cassette flies off
 * its cover into the slot; anywhere else it drops in from above. Then the door shuts, PLAY goes down and
 * the reels turn, the tape passing from left to right as the reader scrolls. On closing the door opens
 * and the tape flies home. The deck is decor: hidden from assistive tech, its keys are not controls.
 */
export function TapeProgress({
  slug,
  color,
  catalog,
  title,
  image,
  playing,
  containerRef,
}: TapeProgressProps) {
  const { scrollYProgress } = useScroll({ container: containerRef });
  const desktop = useMediaQuery(DESKTOP_SHELF);
  const claimed = useTapeInPlayer(slug);
  // Even at 0ms a layout animation paints its first frame at the cover's size: under reduced motion
  // the tape is simply in the deck already
  const reduceMotion = useReducedMotionConfig();
  const [landed, setLanded] = useState(false);
  const [flies] = useState(() => isOpenedFromShelf());
  // Ejecting starts the moment the tape stops, without waiting for an effect
  const seated = playing && landed;

  // Claim the cover's tape once mounted (layout effect: the swap renders before the first paint);
  // let go when the tape stops, so it flies back while the panel fades out
  useLayoutEffect(() => {
    if (!playing || !desktop || reduceMotion || !isOpenedFromShelf()) return;
    setPlayerSlug(slug);
    return () => setPlayerSlug(null);
  }, [playing, desktop, reduceMotion, slug]);

  // The door shuts and PLAY goes down once the tape has landed: after the flight, or after the drop
  useEffect(() => {
    if (!playing) return;
    const travel = reduceMotion
      ? 0
      : durationSeconds(flies ? "--duration-slow" : "--duration-base");
    const timer = setTimeout(() => setLanded(true), travel * 1000);
    return () => {
      clearTimeout(timer);
      setLanded(false);
    };
  }, [playing, reduceMotion, flies]);

  return (
    <div
      aria-hidden="true"
      data-deck={seated ? "playing" : "loading"}
      className="flex items-center gap-2 rounded-md bg-ink p-1 shadow-lift"
    >
      <div className="relative rounded-sm bg-tape-window/30 p-1">
        <Cassette
          slug={slug}
          color={color}
          catalog={catalog}
          title={title}
          image={image}
          sizes="6rem"
          progress={scrollYProgress}
          spinning={seated}
          layoutId={claimed ? `tape-${slug}` : undefined}
          className={`w-20 md:w-28 ${!claimed && !reduceMotion ? "tape-drop" : ""}`}
        />
        <span className="tape-deck-door" data-closed={seated} />
      </div>
      <div className="flex flex-col gap-1 font-mono text-label text-paper">
        <span
          className="tape-deck-key grid size-6 place-items-center rounded-sm bg-paper/15"
          data-down={seated}
        >
          ▶
        </span>
        <span className="grid size-6 place-items-center rounded-sm bg-paper/15">■</span>
      </div>
    </div>
  );
}
