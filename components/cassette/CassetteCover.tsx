import Image from "next/image";

import { cassetteSurface } from "@/components/cassette/cassette-colors";
import { CoverReels } from "@/components/cassette/CoverReels";
import { ExperienceBoundary } from "@/components/experience/ExperienceBoundary";
import type { Project, ProjectCover } from "@/lib/content";

type CassetteCoverProps = {
  slug: string;
  catalog: string;
  title: string;
  color: Project["color"];
  /** The live site's screenshot; without one the label shows the title in type */
  image?: ProjectCover["image"];
};

/*
 * The front of a tape, drawn in code: shell in the project colour, a paper label, two reels in a window.
 * The label carries the project's screenshot, or its title in type when there is none (ARCHITECTURE §6).
 * Decorative: the same title and catalog number are real text next to it, so it is hidden from assistive tech.
 */
export function CassetteCover({ slug, catalog, title, color, image }: CassetteCoverProps) {
  const reels = (
    <ExperienceBoundary name="cover-reels">
      <CoverReels slug={slug} />
    </ExperienceBoundary>
  );

  if (image) {
    return (
      <div
        aria-hidden="true"
        className={`relative aspect-video rounded-md p-3 shadow-lift ${cassetteSurface[color]}`}
      >
        <div className="relative h-full rounded-sm bg-paper p-1">
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            placeholder="blur"
            blurDataURL={image.blurDataURL}
            alt=""
            // Shown from lg only, where the cover is at most about a quarter of the page wide
            sizes="(width >= 80rem) 24rem, 25vw"
            className="h-full w-full rounded-sm object-cover object-top"
          />
          <span className="absolute top-2 left-2 rounded-sm bg-paper px-2 font-mono text-label tracking-wide text-ink">
            {catalog}
          </span>
        </div>
        {/* As on a real tape, the reel window is cut through the label: the screenshot keeps the full
            label, and the reels stay where the player's flight (D3) starts from */}
        <div className="absolute bottom-6 left-1/2 w-3/5 -translate-x-1/2">{reels}</div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`flex aspect-video flex-col gap-3 rounded-md p-4 shadow-lift ${cassetteSurface[color]}`}
    >
      <div className="flex flex-1 flex-col justify-between rounded-sm bg-paper px-4 py-3 text-ink">
        <span className="font-mono text-label tracking-wide">{catalog}</span>
        <span className="text-h3 leading-tight font-black wrap-anywhere font-stretch-condensed">
          {title}
        </span>
      </div>
      {reels}
    </div>
  );
}
