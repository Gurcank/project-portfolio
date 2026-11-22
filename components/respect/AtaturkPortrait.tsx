import Image from "next/image";

import type { Portrait } from "@/lib/content";

type AtaturkPortraitProps = {
  portrait: Portrait;
  /** Who, when, photographer and archive (CONTENT §6 caption), also the image's text alternative */
  caption: string;
};

/*
 * A verified public-domain photograph in a plain, fixed frame (SPEC §6, §9). No motion or hover props,
 * ever: the component takes data only, and nothing on the page animates it.
 * The caption is the alt text too, so screen readers hear it once (the visible copy is hidden from them).
 */
export function AtaturkPortrait({ portrait, caption }: AtaturkPortraitProps) {
  const { src, width, height, blurDataURL } = portrait.image;
  return (
    <figure className="flex flex-col gap-3">
      <Image
        src={src}
        width={width}
        height={height}
        placeholder="blur"
        blurDataURL={blurDataURL}
        alt={caption}
        // Matches the frame: 12rem column below lg, two of twelve columns above it
        sizes="(width >= 64rem) 14vw, 12rem"
        className="aspect-3/4 w-full rounded-sm border border-line object-cover"
      />
      <figcaption aria-hidden="true" className="font-mono text-label text-ink-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
