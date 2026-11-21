"use client";

import { CassetteReels } from "@/components/cassette/CassetteReels";
import { useReelsInPlayer } from "@/lib/case-study-route";
import { DESKTOP_SHELF, useMediaQuery } from "@/lib/use-media-query";

/**
 * The reels on a shelf cover. When the player claims them they give up their layoutId and turn
 * invisible (the cover keeps its shape); when the player lets go they take it back and fly home.
 * Only on desktop: below lg the cover isn't rendered, so there is no box to fly from.
 */
export function CoverReels({ slug }: { slug: string }) {
  const desktop = useMediaQuery(DESKTOP_SHELF);
  const inPlayer = useReelsInPlayer(slug);

  return (
    <CassetteReels
      layoutId={desktop && !inPlayer ? `reels-${slug}` : undefined}
      className={inPlayer ? "invisible w-full" : "w-full"}
    />
  );
}
