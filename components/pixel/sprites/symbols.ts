import { pixelFill, type PixelGrid, type PixelPalette } from "@/components/pixel/pixel";

/*
 * Two symbols the user asked for (v2, 2026-11-27), 20 × 20, generated from circles so the curves are
 * even rather than hand-placed. Both are decor: aria-hidden through PixelSprite, desktop only.
 *
 * Yin-yang: day and night meeting, the page's own idea (SPEC §8). It draws in ink and paper, so on a dark
 * time of day it inverts with the section and stays a yin-yang.
 */
export const yinYangPalette: PixelPalette = { k: pixelFill.ink, o: pixelFill.paper };

export const yinYang: PixelGrid = [
  ".....kkkkkkkkkk.....",
  "....kkkkkkkkkkkk....",
  "...kkkkkkkkkkkkok...",
  "..kkkkkkkookkkkook..",
  ".kkkkkkkooookkkoook.",
  "kkkkkkkkkookkkkoookk",
  "kkkkkkkkkkkkkkkooook",
  "kkkkkkkkkkkkkkoooook",
  "kkkkkkkkkkkkkkoooook",
  "kkkkkkkkkkkkoooooook",
  "kkkkkkkkoooooooooook",
  "kkkkkkoooooooooooook",
  "kkkkkkoooooooooooook",
  "kkkkkooooooooooooook",
  "kkkkkooookkoooooookk",
  ".kkkkoookkkkooooook.",
  "..kkkooookkooooook..",
  "...kkoooooooooook...",
  "....kkooooooookk....",
  ".....kkkkkkkkkk.....",
];

/* Peace sign as a sticker: accent strokes on a paper disc. */
export const peacePalette: PixelPalette = { a: pixelFill.accent, o: pixelFill.paper };

export const peace: PixelGrid = [
  ".....aaaaaaaaaa.....",
  "....aaaaoaaoaaaa....",
  "...aaaoooaaoooaaa...",
  "..aaoooooaaoooooaa..",
  ".aaooooooaaooooooaa.",
  "aaaooooooaaooooooaaa",
  "aaoooooooaaoooooooaa",
  "aaoooooooaaoooooooaa",
  "aooooooooaaooooooooa",
  "aooooooooaaooooooooa",
  "aoooooooaaaaoooooooa",
  "aooooooaaaaaaooooooa",
  "aaooooaaaaaaaaooooaa",
  "aaoooaaaoaaoaaaoooaa",
  "aaaoaaaooaaooaaaoaaa",
  ".aaaaaoooaaoooaaaaa.",
  "..aaaooooaaooooaaa..",
  "...aaaoooaaoooaaa...",
  "....aaaaoaaoaaaa....",
  ".....aaaaaaaaaa.....",
];
