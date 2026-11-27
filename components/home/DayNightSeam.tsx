import { PixelSprite } from "@/components/pixel/PixelSprite";
import { yinYang, yinYangPalette } from "@/components/pixel/sprites/symbols";

/*
 * Where sunset (About) turns into dusk (Colophon): a yin-yang sits on the seam, in the middle of the band where one ground becomes the other, day
 * and night meeting (SPEC §8). Zero height, so it marks the exact edge without moving the page. It stays
 * outside both sections on purpose: inside dusk its colours would invert and the dark half would vanish.
 */
export function DayNightSeam() {
  return (
    <div aria-hidden="true" className="relative hidden lg:block">
      <PixelSprite
        grid={yinYang}
        palette={yinYangPalette}
        className="absolute top-12 left-1/2 z-(--z-content) w-16 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
