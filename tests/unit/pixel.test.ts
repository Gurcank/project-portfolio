import { existsSync, readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import {
  gridSize,
  pixelFill,
  pixelPaths,
  pixelRects,
  type PixelGrid,
} from "@/components/pixel/pixel";
import {
  plantBase,
  plantFlower,
  plantLeaves,
  plantPalette,
} from "@/components/pixel/sprites/plant";
import { stampPalette, stampSprites } from "@/components/pixel/sprites/stamps";
import { toolSlug } from "@/components/about/tool-slug";
import {
  avatarPalette,
  avatarPortrait,
  walkerPalette,
  walkerSitting,
  walkerStand,
  walkerStepA,
  walkerStepB,
  walkerWave,
} from "@/components/pixel/sprites/avatar";
import { cdPlayerFrames, cdPlayerPalette } from "@/components/pixel/sprites/cd-player";
import { globeFrames, globePalette } from "@/components/pixel/sprites/globe";
import { envelopeClosed, envelopeOpen, envelopePalette } from "@/components/pixel/sprites/symbols";
import { tvOff, tvOn, tvPalette } from "@/components/pixel/sprites/tv";

const sprites: [string, PixelGrid, Record<string, string>][] = [
  ["plant base", plantBase, plantPalette],
  ["plant flower", plantFlower, plantPalette],
  ...plantLeaves.map((leaf, i): [string, PixelGrid, Record<string, string>] => [
    `leaf ${i + 1}`,
    leaf,
    plantPalette,
  ]),
  ...cdPlayerFrames.map((frame, i): [string, PixelGrid, Record<string, string>] => [
    `cd player ${i + 1}`,
    frame,
    cdPlayerPalette,
  ]),
  // v4
  ...globeFrames.map((frame, i): [string, PixelGrid, Record<string, string>] => [
    `globe ${i + 1}`,
    frame,
    globePalette,
  ]),
  ["tv off", tvOff, tvPalette],
  ["tv on", tvOn, tvPalette],
  ["envelope closed", envelopeClosed, envelopePalette],
  ["envelope open", envelopeOpen, envelopePalette],
  ["avatar portrait", avatarPortrait, avatarPalette],
  ["walker stand", walkerStand, walkerPalette],
  ["walker step A", walkerStepA, walkerPalette],
  ["walker step B", walkerStepB, walkerPalette],
  ["walker wave", walkerWave, walkerPalette],
  ["walker sitting", walkerSitting, walkerPalette],
  ...Object.entries(stampSprites).map(
    ([name, grid]): [string, PixelGrid, Record<string, string>] => [
      `stamp ${name}`,
      grid,
      stampPalette,
    ],
  ),
];

describe("pixelRects", () => {
  it("merges a run of one colour into one rect", () => {
    expect(pixelRects(["aab.a"], { a: pixelFill.ink, b: pixelFill.paper })).toEqual([
      { x: 0, y: 0, width: 2, fill: "fill-ink" },
      { x: 2, y: 0, width: 1, fill: "fill-paper" },
      { x: 4, y: 0, width: 1, fill: "fill-ink" },
    ]);
  });

  it("draws one path per colour from the same runs", () => {
    expect(pixelPaths(["aab.a", ".a"], { a: pixelFill.ink, b: pixelFill.paper })).toEqual([
      { fill: "fill-ink", d: "M0 0h2v1h-2zM4 0h1v1h-1zM1 1h1v1h-1z" },
      { fill: "fill-paper", d: "M2 0h1v1h-1z" },
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

it("every stamp is 16 × 18 and the list matches velite.config.ts", () => {
  for (const grid of Object.values(stampSprites))
    expect(gridSize(grid)).toEqual({ width: 16, height: 18 });
  expect(Object.keys(stampSprites)).toEqual([
    "lycian",
    "dilek",
    "kaz",
    "alps",
    "fethiye",
    "datca",
    "blacksea",
  ]);
});

it("the walker frames share one size, so swapping them never jumps", () => {
  for (const grid of [walkerStepA, walkerStepB, walkerWave])
    expect(gridSize(grid)).toEqual(gridSize(walkerStand));
  expect(gridSize(walkerStand)).toEqual({ width: 12, height: 16 });
});

it("every tool named in the content has a logo", () => {
  for (const locale of ["tr", "en"]) {
    const yaml = readFileSync(`content/site/${locale}.yaml`, "utf8");
    const line = /\n {4}items: \[([^\]]+)\]/.exec(yaml.slice(yaml.indexOf("  tools:")))?.[1];
    expect(line, locale).toBeTruthy();
    for (const name of line!.split(",").map((item) => item.trim()))
      expect(existsSync(`public/tools/${toolSlug(name)}.svg`), name).toBe(true);
  }
});
