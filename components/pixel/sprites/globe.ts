import { pixelFill, type PixelGrid, type PixelPalette } from "@/components/pixel/pixel";

/*
 * The dock's globe (v4; replaces the yin-yang there, user 2026-11-28): a 16 × 16 pixel Earth that turns
 * as the reader scrolls, for someone who walks, travels and is writing this from Łódź. The continents
 * are a coarse world map (land "#", sea ".") wrapped onto a sphere in code, so every frame is the same
 * planet seen from a different longitude, and the round edge stays even.
 */

export const globePalette: PixelPalette = {
  k: pixelFill.ink, // rim
  s: pixelFill.sea,
  l: pixelFill.pine,
  o: pixelFill.paper, // the sun's glint, top left
};

// 32 longitudes × 16 latitudes, north at the top. Drawn small on purpose: at 28px only shapes read
const WORLD = [
  "................................",
  "......####.......#####..........",
  "..#########....##########.......",
  "..##########..###############...",
  "...########...##############....",
  "....######.....###########......",
  ".....####......#####.#####......",
  "......###.......####...##.......",
  ".......###.......###....#.......",
  ".......####......###......##....",
  "........###......##......####...",
  "........##.......#........##....",
  "........#......................#",
  "................................",
  "....................#######.....",
  "..............##################",
];

const SIZE = 16;
const CENTRE = (SIZE - 1) / 2;
// An even rim one pixel thick all the way round (no gaps at the flat sides), the sea inside it
const OUTER = 7.5;
const INNER = 6.4;
const MAP_WIDTH = WORLD[0]!.length;
const MAP_HEIGHT = WORLD.length;

export const GLOBE_FRAMES = 8;

function frame(index: number): PixelGrid {
  const turn = index / GLOBE_FRAMES;
  return Array.from({ length: SIZE }, (_, y) =>
    Array.from({ length: SIZE }, (_, x) => {
      const distance = Math.hypot(x - CENTRE, y - CENTRE);
      if (distance > OUTER) return ".";
      if (distance > INNER) return "k";
      const dx = (x - CENTRE) / INNER;
      const dy = (y - CENTRE) / INNER;
      if (x === 4 && y === 4) return "o";
      // Orthographic projection: the point on the sphere behind this pixel, then its longitude
      const latitude = Math.asin(dy);
      const longitude =
        Math.asin(Math.min(1, Math.max(-1, dx / Math.cos(latitude)))) / (2 * Math.PI) + turn;
      const column = Math.floor((((longitude % 1) + 1) % 1) * MAP_WIDTH);
      const row = Math.min(MAP_HEIGHT - 1, Math.floor((latitude / Math.PI + 0.5) * MAP_HEIGHT));
      return WORLD[row]![column] === "#" ? "l" : "s";
    }).join(""),
  );
}

export const globeFrames: readonly PixelGrid[] = Array.from({ length: GLOBE_FRAMES }, (_, index) =>
  frame(index),
);
