import { describe, expect, it } from "vitest";

import { gridSize, pixelRects, pixelFill, type PixelGrid } from "@/components/pixel/pixel";
import {
  plantBase,
  plantFlower,
  plantLeaves,
  plantPalette,
} from "@/components/pixel/sprites/plant";
import { walkmanFrames, walkmanPalette } from "@/components/pixel/sprites/walkman";

const sprites: [string, PixelGrid, Record<string, string>][] = [
  ["plant base", plantBase, plantPalette],
  ["plant flower", plantFlower, plantPalette],
  ...plantLeaves.map((leaf, i): [string, PixelGrid, Record<string, string>] => [
    `leaf ${i + 1}`,
    leaf,
    plantPalette,
  ]),
  ...walkmanFrames.map((frame, i): [string, PixelGrid, Record<string, string>] => [
    `walkman ${i + 1}`,
    frame,
    walkmanPalette,
  ]),
];

describe("pixelRects", () => {
  it("merges a run of one colour into one rect", () => {
    expect(pixelRects(["aab.a"], { a: pixelFill.ink, b: pixelFill.paper })).toEqual([
      { x: 0, y: 0, width: 2, fill: "fill-ink" },
      { x: 2, y: 0, width: 1, fill: "fill-paper" },
      { x: 4, y: 0, width: 1, fill: "fill-ink" },
    ]);
  });

  it("refuses a character that isn't in the palette", () => {
    expect(() => pixelRects(["z"], { a: pixelFill.ink })).toThrow(/not in the palette/);
  });
});

describe.each(sprites)("%s", (_, grid, palette) => {
  it("is a clean rectangle: every row the same width", () => {
    const { width } = gridSize(grid);
    for (const row of grid) expect(row).toHaveLength(width);
  });

  it("only uses palette colours, and every colour is a site token class", () => {
    expect(() => pixelRects(grid, palette as never)).not.toThrow();
    for (const fill of Object.values(palette)) expect(Object.values(pixelFill)).toContain(fill);
  });
});

it("plant layers stack: same size as the base", () => {
  const base = gridSize(plantBase);
  for (const layer of [...plantLeaves, plantFlower]) expect(gridSize(layer)).toEqual(base);
});
