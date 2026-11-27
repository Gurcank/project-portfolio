import { pixelFill, type PixelGrid, type PixelPalette } from "@/components/pixel/pixel";

/*
 * The pixel avatar (V3). Drawn from Gürcan's portrait: `scripts/make-avatar.ts` snapped the photo to
 * these colours, then the grid was cleaned by hand (straight fringe, short sides, black collared shirt
 * with one button). The photo itself is not in the repo.
 */

export const avatarPalette: PixelPalette = {
  k: pixelFill.ink, // hair, brows, eyes, shirt
  m: pixelFill.inkMuted, // collar edge, so the shirt reads as a shirt on black
  s: pixelFill.skin,
  d: pixelFill.skinShade,
  r: pixelFill.rose, // lips
  p: pixelFill.paper, // shirt button
};

/** Head and shoulders, 32 × 28: the hero portrait. */
export const avatarPortrait: PixelGrid = [
  "...........kkkkkkkkkk...........",
  ".........kkkkkkkkkkkkkk.........",
  "........kkkkkkkkkkkkkkkk........",
  ".......kkkkkkkkkkkkkkkkkk.......",
  ".......kkkkkkkkkkkkkkkkkk.......",
  ".......kkkkkkkkkkkkkkkkkk.......",
  ".......kksssssssssssssskk.......",
  ".......kdssssssssssssssdk.......",
  ".......kdskkksssssskkksdk.......",
  "......sddsskksssssskkssdds......",
  "......sddssssssddssssssdds......",
  "........dsssssddddsssssd........",
  "........dssssssssssssssd........",
  "........dsssssrrrrsssssd........",
  "........dssssssssssssssd........",
  ".........dssssssssssssd.........",
  "..........ddssssssssdd..........",
  "............dssssssd............",
  "............dssssssd............",
  "............dssssssd............",
  ".......kkkkkdssssssdkkkkk.......",
  ".....kkkkkkkmssssssmkkkkkkk.....",
  "...kkkkkkkkkkmssssmkkkkkkkkkk...",
  "..kkkkkkkkkkkkmssmkkkkkkkkkkkk..",
  ".kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk.",
  "kkkkkkkkkkkkkkkpkkkkkkkkkkkkkkkk",
  "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
  "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
];

/*
 * The small walker, 12 × 16, for the scroll journey (V5) and the footer camp (V8). Two steps and a
 * wave; the trousers are midnight so the legs read apart from the black shirt.
 */
export const walkerPalette: PixelPalette = {
  ...avatarPalette,
  b: pixelFill.midnight,
};

const walkerTop = [
  "...kkkkkk...",
  "..kkkkkkkk..",
  "..kssssssk..",
  "..skksskks..",
  "..ssssssss..",
  "...ssrrss...",
  "....dssd....",
  "..kkkkkkkk..",
];

export const walkerStand: PixelGrid = [
  ...walkerTop,
  ".kkkkpkkkkk.",
  ".skkkkkkkks.",
  ".s.kkkkkk.s.",
  "...bbbbbb...",
  "...bb..bb...",
  "...bb..bb...",
  "...bb..bb...",
  "..kkk..kkk..",
];

export const walkerStepA: PixelGrid = [
  ...walkerTop,
  ".kkkkpkkkkk.",
  "skkkkkkkkks.",
  "s..kkkkkk..s",
  "...bbbbbb...",
  "..bb....bb..",
  "..bb....bb..",
  ".bb......bb.",
  ".kk......kk.",
];

export const walkerStepB: PixelGrid = [
  ...walkerTop,
  ".kkkkpkkkkk.",
  ".skkkkkkkkks",
  ".s.kkkkkk..s",
  "...bbbbbb...",
  "....bbbb....",
  "....bbbb....",
  "....bbbb....",
  "...kk..kk...",
];

export const walkerWave: PixelGrid = [
  ...walkerTop.slice(0, 7),
  "..kkkkkkkk.s",
  ".kkkkpkkkkks",
  ".skkkkkkkk..",
  ".s.kkkkkk...",
  "...bbbbbb...",
  "...bb..bb...",
  "...bb..bb...",
  "...bb..bb...",
  "..kkk..kkk..",
];

/** Sitting by the fire (V8), 12 × 12: knees up, hands out to the warmth. */
export const walkerSitting: PixelGrid = [
  "...kkkkkk...",
  "..kkkkkkkk..",
  "..kssssssk..",
  "..skksskks..",
  "..ssssssss..",
  "...ssrrss...",
  "....dssd....",
  "..kkkkkkkk..",
  ".kkkkpkkkkss",
  ".kkkkkkkk...",
  ".bbbbbbbbb..",
  ".kkk....kkk.",
];
