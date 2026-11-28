import { describe, expect, it } from "vitest";

import { drawVisitPick, pickNext } from "@/lib/walkman";

describe("pickNext", () => {
  it("returns null for an empty list (empty state)", () => {
    expect(pickNext(0, null, () => 0.5)).toBeNull();
  });

  it("never repeats the previous item when there is a choice", () => {
    let previous: number | null = null;
    for (let i = 0; i < 500; i++) {
      const next = pickNext(7, previous, Math.random);
      expect(next).not.toBe(previous);
      expect(next).toBeGreaterThanOrEqual(0);
      expect(next).toBeLessThan(7);
      previous = next;
    }
  });

  it("can still reach every item, including the first and the last", () => {
    expect(pickNext(5, 2, () => 0)).toBe(0);
    expect(pickNext(5, 2, () => 0.999)).toBe(4);
    expect(pickNext(5, 0, () => 0)).toBe(1);
    expect(pickNext(5, 4, () => 0.999)).toBe(3);
  });

  it("a one-item list repeats, because it has to", () => {
    expect(pickNext(1, 0, () => 0.7)).toBe(0);
  });
});

describe("drawVisitPick (v4: one pick per page load)", () => {
  it("draws once and keeps the same pick for the rest of the visit", () => {
    let draws = 0;
    const random = () => {
      draws += 1;
      return 0.42;
    };
    const first = drawVisitPick(30, random);
    expect(drawVisitPick(30, () => 0.99)).toBe(first);
    expect(draws).toBe(1);
  });

  it("is null for an empty list (the TV shows its empty state)", () => {
    expect(drawVisitPick(0, () => 0.5)).toBeNull();
  });
});
