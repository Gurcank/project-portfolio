"use client";

import { Cassette } from "@/components/cassette/Cassette";
import type { Project, ProjectCover } from "@/lib/content";
import { useTapeInPlayer } from "@/lib/case-study-route";
import { DESKTOP_SHELF, useMediaQuery } from "@/lib/use-media-query";

type CoverCassetteProps = {
  slug: string;
  color: Project["color"];
  catalog: string;
  title: string;
  image?: ProjectCover["image"];
};

/**
 * The tape on a shelf cover. When the deck takes it, the cover gives up its layoutId and turns
 * invisible (the card keeps its shape); when the deck ejects it, it takes the layoutId back and flies
 * home. Only on desktop: below lg the cover isn't rendered, so there is no box to fly from.
 */
export function CoverCassette({ slug, ...tape }: CoverCassetteProps) {
  const desktop = useMediaQuery(DESKTOP_SHELF);
  const inPlayer = useTapeInPlayer(slug);

  return (
    <Cassette
      slug={slug}
      {...tape}
      layoutId={desktop && !inPlayer ? `tape-${slug}` : undefined}
      className={inPlayer ? "invisible w-full" : "w-full"}
    />
  );
}
