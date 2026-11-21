import { describe, expect, it } from "vitest";

import { hasSingleEmphasis, splitEmphasis, splitLabel, stripEmphasis } from "@/lib/text";

describe("splitEmphasis", () => {
  it("splits one *word* into three parts", () => {
    expect(splitEmphasis("Bir *mesaj* uzağındayım")).toEqual([
      { text: "Bir ", emphasis: false },
      { text: "mesaj", emphasis: true },
      { text: " uzağındayım", emphasis: false },
    ]);
  });

  it("drops empty parts when the emphasis is at an edge", () => {
    expect(splitEmphasis("*Hakkımda*")).toEqual([{ text: "Hakkımda", emphasis: true }]);
  });

  it("returns plain text when there is no emphasis", () => {
    expect(splitEmphasis("Hakkımda")).toEqual([{ text: "Hakkımda", emphasis: false }]);
  });
});

describe("hasSingleEmphasis", () => {
  it.each([
    ["Bir *mesaj* uzağındayım", true],
    ["Hakkımda", false],
    ["*iki* *vurgu*", false],
    ["yarım *vurgu", false],
  ])("%s → %s", (value, expected) => {
    expect(hasSingleEmphasis(value)).toBe(expected);
  });
});

describe("stripEmphasis", () => {
  it("removes the markers only", () => {
    expect(stripEmphasis("I turn *tangible* things")).toBe("I turn tangible things");
  });
});

describe("splitLabel", () => {
  it("marks the ● part as status and drops the dot", () => {
    expect(
      splitLabel("PRODUCT MANAGER ADAYI · İSTANBUL · ● ŞUBAT 2027'DEN İTİBAREN MÜSAİT"),
    ).toEqual([
      { text: "PRODUCT MANAGER ADAYI", status: false },
      { text: "İSTANBUL", status: false },
      { text: "ŞUBAT 2027'DEN İTİBAREN MÜSAİT", status: true },
    ]);
  });
});
