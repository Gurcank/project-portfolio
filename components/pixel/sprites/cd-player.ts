import { pixelFill, type PixelGrid, type PixelPalette } from "@/components/pixel/pixel";

/*
 * The CD player, 16 × 16 (V6; replaces the D7 walkman, same job): a round portable player seen from
 * above through its clear lid, the disc inside catching light in four colours. Each frame turns the
 * sheen a quarter, which is how the disc "spins" when it plays. Built from circles, not typed by hand,
 * so the round edge stays even.
 */

export const cdPlayerPalette: PixelPalette = {
  k: pixelFill.ink, // rim, spindle
  b: pixelFill.midnight, // body ring
  o: pixelFill.paper, // hub
  y: pixelFill.mustard,
  r: pixelFill.rose,
  p: pixelFill.petrol,
  l: pixelFill.line,
  a: pixelFill.accent, // play button on the rim
};

const SIZE = 16;
const CENTRE = (SIZE - 1) / 2;
const SHEEN = ["y", "l", "r", "p"] as const;

function frame(turn: number): PixelGrid {
  return Array.from({ length: SIZE }, (_, y) =>
    Array.from({ length: SIZE }, (_, x) => {
      const dx = x - CENTRE;
      const dy = y - CENTRE;
      const distance = Math.hypot(dx, dy);
      if (distance > 7.6) return ".";
      if (distance > 6.7) return x === SIZE - 3 && y === 2 ? "a" : "k";
      if (distance > 5.8) return "b";
      if (distance < 1.1) return "k";
      if (distance < 2.3) return "o";
      const quarter = Math.floor(((Math.atan2(dy, dx) / Math.PI + 1) * 2 + turn) % 4);
      return SHEEN[quarter]!;
    }).join(""),
  );
}

export const cdPlayerFrames: readonly PixelGrid[] = [frame(0), frame(1), frame(2), frame(3)];
