import "@/components/intro/intro.css";
import "@/components/experience/room.css";

import { PixelSprite } from "@/components/pixel/PixelSprite";
import { gridSize, type PixelGrid, type PixelPalette } from "@/components/pixel/pixel";
import { walkerPalette, walkerSitting } from "@/components/pixel/sprites/avatar";
import { lamp, morningWindow, roomPalette, windowPalette } from "@/components/pixel/sprites/room";
import type { SiteCopy } from "@/lib/content";

function Sprite({
  grid,
  palette,
  className = "",
}: {
  grid: PixelGrid;
  palette: PixelPalette;
  className?: string;
}) {
  return (
    <span
      className={`room-sprite block ${className}`}
      style={{ ["--cols" as string]: gridSize(grid).width }}
    >
      <PixelSprite grid={grid} palette={palette} className="w-full" />
    </span>
  );
}

/**
 * The once-per-session opening (SPEC §8; v3: a pixel room at dawn, as rich as the footer). The room is
 * dark; the sky in the window warms, the lamp comes on, the avatar sits down at the desk, while "A map.
 * A documentary. A handbook." pass and "Each one a product." stays. Then the curtain crumples like a
 * sheet of paper and the page is underneath (the CrumpledPaperReveal idea, our own CSS).
 * Decorative and short, so it is hidden from assistive tech and holds nothing focusable. Skipping is
 * handled by the pre-paint script (lib/intro-preference.ts), so this component ships no JavaScript.
 */
export function Intro({ copy }: { copy: SiteCopy["hero"]["intro"] }) {
  return (
    <div
      aria-hidden="true"
      className="intro fixed inset-0 z-(--z-cursor) flex-col items-center justify-center gap-8 bg-time-night text-ink-night"
    >
      <div className="intro-scene relative h-48 w-96">
        <div className="absolute top-0 left-24">
          <Sprite grid={morningWindow} palette={windowPalette} />
          {/* Night over the glass, lifting as the sun comes up */}
          <span className="intro-night absolute inset-0 bg-time-night" />
        </div>
        <span className="intro-lamp-light absolute right-6 bottom-3 h-32 w-32 bg-cassette-mustard" />
        <Sprite grid={lamp} palette={roomPalette} className="absolute right-12 bottom-3" />
        <Sprite
          grid={walkerSitting}
          palette={walkerPalette}
          className="intro-sitter absolute bottom-3 left-16"
        />
        <span className="absolute inset-x-0 bottom-0 h-3 bg-tape" />
      </div>

      <p className="flex items-center font-mono text-label tracking-wide text-ink-muted-night">
        <span>00</span>
        {/* One digit tall window over a 0–9 strip */}
        <span className="intro-counter-window inline-block">
          <span className="intro-digit flex flex-col">
            {Array.from({ length: 10 }, (_, digit) => (
              <span key={digit}>{digit}</span>
            ))}
          </span>
        </span>
      </p>
      <p className="grid text-center font-display text-display font-black font-stretch-condensed">
        {copy.words.map((word) => (
          <span key={word} className="intro-word">
            {word}
          </span>
        ))}
        <span className="intro-closing">{copy.closing}</span>
      </p>
      <p className="font-mono text-label tracking-wide text-ink-muted-night uppercase">
        {copy.skip}
      </p>
    </div>
  );
}
