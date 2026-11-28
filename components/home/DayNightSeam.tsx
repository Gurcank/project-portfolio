import { PixelSprite } from "@/components/pixel/PixelSprite";
import { yinYang, yinYangPalette } from "@/components/pixel/sprites/symbols";

/*
 * Where sunset (About) turns into dusk (Colophon): the one blend where the text colour flips, so it gets
 * a text-free stretch of its own (v3) and the yin-yang sits in its middle, day and night meeting
 * (SPEC §8). It stays outside both sections on purpose: inside dusk its colours would invert and the
 * dark half would vanish.
 */
export function DayNightSeam() {
  return (
    <div aria-hidden="true" className="day-seam relative h-24 md:h-48">
      <PixelSprite
        grid={yinYang}
        palette={yinYangPalette}
        className="absolute top-1/2 left-1/2 z-(--z-content) hidden w-16 -translate-x-1/2 -translate-y-1/2 lg:block"
      />
    </div>
  );
}
