import { pixelFill, type PixelGrid, type PixelPalette } from "@/components/pixel/pixel";

/*
 * The mascot: a potted plant, 16 × 24 (SPEC §8, INS-26). Drawn in layers so it can grow: the pot and
 * stem are always there, five leaves open one by one as the page is read, and a flower opens in
 * Contact. Every layer is the full 24 rows, so they stack in one SVG without offsets.
 */

const WIDTH = 16;
const HEIGHT = 24;

/** Places `rows` from row `top` on an empty 16 × 24 grid. */
function place(rows: readonly string[], top: number): PixelGrid {
  return Array.from({ length: HEIGHT }, (_, y) => rows[y - top] ?? ".".repeat(WIDTH));
}

export const plantPalette: PixelPalette = {
  g: pixelFill.olive,
  p: pixelFill.petrol,
  k: pixelFill.inkMuted,
  r: pixelFill.rose,
  t: pixelFill.terracotta,
  o: pixelFill.rose,
  y: pixelFill.mustard,
};

export const plantBase = place(
  [
    ".......gg.......",
    ".......gg.......",
    ".......gg.......",
    ".......gg.......",
    ".......gg.......",
    ".......gg.......",
    ".......gg.......",
    ".......gg.......",
    ".......gg.......",
    ".......gg.......",
    ".......gg.......",
    "....kkkkkkkk....",
    "..rrrrrrrrrrrr..",
    "..tttttttttttt..",
    "...tttttttttt...",
    "...tttttttttt...",
    "....tttttttt....",
    "....tttttttt....",
  ],
  6,
);

const rightLeaf = ["..........pg....", ".........gggg...", ".........gg....."];
const leftLeaf = ["....gp..........", "...gggg.........", ".....gg........."];

/** Bottom to top, alternating sides: the order the leaves open in */
export const plantLeaves: readonly PixelGrid[] = [
  place(rightLeaf, 14),
  place(leftLeaf, 12),
  place(rightLeaf, 10),
  place(leftLeaf, 8),
  place(["......pggp......", ".......gg......."], 4),
];

export const plantFlower = place(
  [
    "......o..o......",
    ".....oooooo.....",
    ".....ooyyoo.....",
    ".....oooooo.....",
    "......o..o......",
  ],
  0,
);
