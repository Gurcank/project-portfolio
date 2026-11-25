import { pixelFill, type PixelGrid, type PixelPalette } from "@/components/pixel/pixel";

/*
 * The walkman, 24 × 14 (SPEC §6, INS-12): a blue body, a window with two reels, a mustard label and
 * three buttons on top. Two reel frames: swapping them is how the reels "turn" when it plays.
 */

export const walkmanPalette: PixelPalette = {
  a: pixelFill.accent,
  b: pixelFill.midnight,
  w: pixelFill.ink,
  o: pixelFill.paper,
  k: pixelFill.ink,
  y: pixelFill.mustard,
};

const top = ["...aa..aa..aa...........", ".bbbbbbbbbbbbbbbbbbbbbb.", ".bbbbbbbbbbbbbbbbbbbbbb."];
const bottom = [
  ".bbwwwwwwwwwwwwwwwwwwbb.",
  ".bbbbbbbbbbbbbbbbbbbbbb.",
  ".bbyyyyyyyyyyyyyyyyyybb.",
  ".bbyyyyyyyyyyyyyyyyyybb.",
  ".bbbbbbbbbbbbbbbbbbbbbb.",
  ".bbbbbbbbbbbbbbbbbbbbbb.",
  "..bbbbbbbbbbbbbbbbbbbb..",
];

export const walkmanFrames: readonly PixelGrid[] = [
  [
    ...top,
    ".bbwwwwwwwwwwwwwwwwwwbb.",
    ".bbwwooowwwwwwwwooowwbb.",
    ".bbwwokowwwwwwwwokowwbb.",
    ".bbwwooowwwwwwwwooowwbb.",
    ...bottom,
  ],
  [
    ...top,
    ".bbwwwwwwwwwwwwwwwwwwbb.",
    ".bbwwkoowwwwwwwwkoowwbb.",
    ".bbwwooowwwwwwwwooowwbb.",
    ".bbwwookwwwwwwwwookwwbb.",
    ...bottom,
  ],
];
