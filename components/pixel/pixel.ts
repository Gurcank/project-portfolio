/*
 * Pixel sprites written as character grids (ADR-08): one string per row, one character per pixel,
 * "." for empty. A palette maps characters to fill classes built from the colour tokens, so a colour
 * outside the palette can't be written. Runs of the same character in a row merge into one <rect>.
 */

/** Fill classes for the site's tokens (literal names, so Tailwind sees them at build time). */
export const pixelFill = {
  ink: "fill-ink",
  inkMuted: "fill-ink-muted",
  paper: "fill-paper",
  pattern: "fill-pattern",
  line: "fill-line",
  accent: "fill-accent",
  mustard: "fill-cassette-mustard",
  olive: "fill-cassette-olive",
  petrol: "fill-cassette-petrol",
  midnight: "fill-cassette-midnight",
  rose: "fill-cassette-rose",
  terracotta: "fill-cassette-terracotta",
} as const;

export type PixelFill = (typeof pixelFill)[keyof typeof pixelFill];
export type PixelGrid = readonly string[];
export type PixelPalette = Readonly<Record<string, PixelFill>>;
export type PixelRect = { x: number; y: number; width: number; fill: PixelFill };

export function gridSize(grid: PixelGrid): { width: number; height: number } {
  return { width: Math.max(...grid.map((row) => row.length)), height: grid.length };
}

/** Horizontal runs of one colour, row by row. Unknown characters fail loudly in dev and tests. */
export function pixelRects(grid: PixelGrid, palette: PixelPalette): PixelRect[] {
  const rects: PixelRect[] = [];
  grid.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const char = row[x]!;
      let end = x + 1;
      while (end < row.length && row[end] === char) end += 1;
      if (char !== ".") {
        const fill = palette[char];
        if (!fill) throw new Error(`pixel: "${char}" is not in the palette`);
        rects.push({ x, y, width: end - x, fill });
      }
      x = end;
    }
  });
  return rects;
}
