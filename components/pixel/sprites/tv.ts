import { pixelFill, type PixelGrid, type PixelPalette } from "@/components/pixel/pixel";

/*
 * The little TV (v4; the CD player's job before it, which now sits on the About shelf): 16 × 14, a
 * petrol-green set with two mustard knobs and rabbit-ear antennas. Off, the screen is dark; on (while
 * this visit's pick is showing) it lights up with a small landscape: sea-blue sky, a pine hill, the sun.
 */

export const tvPalette: PixelPalette = {
  k: pixelFill.ink,
  b: pixelFill.petrol,
  n: pixelFill.mustard,
  s: pixelFill.sea,
  h: pixelFill.pine,
  o: pixelFill.paper,
};

export const tvOff: PixelGrid = [
  "...k.......k....",
  "....k.....k.....",
  ".....k...k......",
  "......k.k.......",
  "kkkkkkkkkkkkkkkk",
  "kbbbbbbbbbbbbbbk",
  "kbkkkkkkkkkbbbbk",
  "kbkkkkkkkkkbnnbk",
  "kbkkkkkkkkkbbbbk",
  "kbkkkkkkkkkbnnbk",
  "kbkkkkkkkkkbbbbk",
  "kbbbbbbbbbbbbbbk",
  "kkkkkkkkkkkkkkkk",
  ".kk..........kk.",
];

export const tvOn: PixelGrid = [
  "...k.......k....",
  "....k.....k.....",
  ".....k...k......",
  "......k.k.......",
  "kkkkkkkkkkkkkkkk",
  "kbbbbbbbbbbbbbbk",
  "kbssssssooobbbbk",
  "kbssssssooobnnbk",
  "kbsssshhsssbbbbk",
  "kbsshhhhhhsbnnbk",
  "kbhhhhhhhhhbbbbk",
  "kbbbbbbbbbbbbbbk",
  "kkkkkkkkkkkkkkkk",
  ".kk..........kk.",
];
