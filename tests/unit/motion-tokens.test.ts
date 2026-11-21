import { describe, expect, it } from "vitest";

import { parseCubicBezier, parseDuration } from "@/lib/motion-tokens";

describe("parseDuration", () => {
  it("reads ms and s tokens as seconds", () => {
    expect(parseDuration("450ms")).toBe(0.45);
    expect(parseDuration(" 0.25s ")).toBe(0.25);
  });

  it("treats reduced motion's 0ms and unreadable values as no motion", () => {
    expect(parseDuration("0ms")).toBe(0);
    expect(parseDuration("")).toBe(0);
    expect(parseDuration("var(--x)")).toBe(0);
  });
});

describe("parseCubicBezier", () => {
  it("reads the easing token's four points", () => {
    expect(parseCubicBezier("cubic-bezier(0.22, 1, 0.36, 1)")).toEqual([0.22, 1, 0.36, 1]);
  });

  it("falls back to linear when the token is missing or malformed", () => {
    expect(parseCubicBezier("")).toEqual([0, 0, 1, 1]);
    expect(parseCubicBezier("cubic-bezier(0.2, 1)")).toEqual([0, 0, 1, 1]);
  });
});
