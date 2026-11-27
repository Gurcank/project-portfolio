import { pixelFill, type PixelGrid, type PixelPalette } from "@/components/pixel/pixel";

/*
 * Section icons for the dock (V2), 12 × 9 each so they share a baseline. They sit on the dark dock, so
 * they draw in paper. Decorative: the section name is always next to them as text.
 */
export const dockIconPalette: PixelPalette = { k: pixelFill.paper };

/** Selected work: a tape, two reels in its window */
const work: PixelGrid = [
  "kkkkkkkkkkkk",
  "k..........k",
  "k.kkkkkkkk.k",
  "k.k.kk.kk.kk",
  "k.kkkkkkkk.k",
  "k..........k",
  "k..kkkkkk..k",
  "k.k......k.k",
  "kkkkkkkkkkkk",
];

/** Principles: a compass, needle pointing north */
const principles: PixelGrid = [
  "....kkkk....",
  "..kk....kk..",
  ".k...kk...k.",
  "k....kk....k",
  "k...kkkk...k",
  "k....kk....k",
  ".k...kk...k.",
  "..kk....kk..",
  "....kkkk....",
];

/** About: a person */
const about: PixelGrid = [
  ".....kk.....",
  "....kkkk....",
  "....kkkk....",
  ".....kk.....",
  "............",
  "...kkkkkk...",
  "..kkkkkkkk..",
  "..kkkkkkkk..",
  "..kkkkkkkk..",
];

/** How this site was made: an open book */
const colophon: PixelGrid = [
  "kkkkk..kkkkk",
  "k...kkkk...k",
  "k.kk.kk.kk.k",
  "k....kk....k",
  "k.kk.kk.kk.k",
  "k....kk....k",
  "k.kk.kk.kk.k",
  "k....kk....k",
  "kkkkkkkkkkkk",
];

/** Contact: an envelope */
const contact: PixelGrid = [
  "kkkkkkkkkkkk",
  "kk........kk",
  "k.k......k.k",
  "k..k....k..k",
  "k...k..k...k",
  "k....kk....k",
  "k..........k",
  "k..........k",
  "kkkkkkkkkkkk",
];

export const dockIcons = { work, principles, about, colophon, contact } as const;
