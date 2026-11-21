import { describe, expect, it } from "vitest";

import { findViolations } from "@/scripts/check-tokens";

const rulesFor = (source: string) => findViolations(source, "x.tsx").map((v) => v.rule);

describe("check:tokens", () => {
  it("rejects raw colors and px", () => {
    expect(rulesFor(`<div style={{ color: "#B8471F" }} />`)).toContain("raw hex color");
    expect(rulesFor(`color: rgb(0 0 0);`)).toContain("raw color function");
    expect(rulesFor(`margin: 12px;`)).toContain("raw px value");
  });

  it("rejects arbitrary values but allows variants and CSS-variable syntax", () => {
    expect(rulesFor(`className="w-[13px]"`)).toContain("Tailwind arbitrary value");
    expect(rulesFor(`className="data-[state=open]:opacity-100"`)).toEqual([]);
    expect(rulesFor(`className="px-(--gutter) z-(--z-overlay)"`)).toEqual([]);
  });

  it("allows only spacing steps on the 4px scale", () => {
    expect(rulesFor(`className="p-4 gap-6 mt-12 -mx-2"`)).toEqual([]);
    expect(rulesFor(`className="p-5"`)).toContain("spacing outside the 4px scale");
    expect(rulesFor(`className="gap-10"`)).toContain("spacing outside the 4px scale");
  });

  it("ignores section hashes that are not colors", () => {
    expect(rulesFor(`href="/#contact"`)).toEqual([]);
  });
});
