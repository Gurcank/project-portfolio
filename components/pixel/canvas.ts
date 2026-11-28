import type { PixelGrid } from "@/components/pixel/pixel";

/*
 * A tiny drawing surface for sprites that are easier to build than to type (v3 room: paintings, sleeves,
 * round objects). It paints characters, not colours, so the result is an ordinary sprite grid and the
 * palette still decides every colour. Runs at build time or once per module load, never per frame.
 */
export class PixelCanvas {
  private readonly cells: string[][];

  constructor(
    readonly width: number,
    readonly height: number,
    fill = ".",
  ) {
    this.cells = Array.from({ length: height }, () => Array.from({ length: width }, () => fill));
  }

  set(x: number, y: number, char: string) {
    const col = Math.round(x);
    const row = Math.round(y);
    if (col < 0 || row < 0 || col >= this.width || row >= this.height) return this;
    this.cells[row]![col] = char;
    return this;
  }

  rect(x: number, y: number, w: number, h: number, char: string) {
    for (let row = y; row < y + h; row += 1)
      for (let col = x; col < x + w; col += 1) this.set(col, row, char);
    return this;
  }

  /** A filled disc; `ring` paints only the edge band of that thickness. */
  circle(cx: number, cy: number, r: number, char: string, ring = 0) {
    for (let row = Math.floor(cy - r); row <= Math.ceil(cy + r); row += 1)
      for (let col = Math.floor(cx - r); col <= Math.ceil(cx + r); col += 1) {
        const d = Math.hypot(col - cx, row - cy);
        if (d <= r && (!ring || d > r - ring)) this.set(col, row, char);
      }
    return this;
  }

  /** Paints every cell for which `pick` returns a character (and leaves the rest alone). */
  each(pick: (x: number, y: number, current: string) => string | null) {
    for (let row = 0; row < this.height; row += 1)
      for (let col = 0; col < this.width; col += 1) {
        const next = pick(col, row, this.cells[row]![col]!);
        if (next) this.cells[row]![col] = next;
      }
    return this;
  }

  /** Stamps a hand-typed grid at an offset; "." stays transparent. */
  stamp(grid: PixelGrid, x: number, y: number) {
    grid.forEach((line, row) =>
      [...line].forEach((char, col) => {
        if (char !== ".") this.set(x + col, y + row, char);
      }),
    );
    return this;
  }

  grid(): PixelGrid {
    return this.cells.map((row) => row.join(""));
  }
}

/** Mulberry32: a seeded sequence, so "random" pixels are identical on every build and every visit. */
export function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
