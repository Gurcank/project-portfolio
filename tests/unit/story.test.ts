import { describe, expect, it } from "vitest";

import { checkAboutLinks, checkPrinciples } from "@/lib/content/integrity";
import { hasMalformedChip, parseStory, storyChipSlugs, storyPlainText } from "@/lib/content/story";

const tapes = [
  { slug: "erasmusmap", respectful: false },
  { slug: "atamap", respectful: true },
];

const about = (story: string, notes: { after: string }[] = []) => [
  { locale: "tr", about: { story, notes } },
];

describe("parseStory", () => {
  it("splits text and chips, keeping punctuation in the text", () => {
    expect(parseStory("Bir harita [ErasmusMap](#erasmusmap), sonra.")).toEqual([
      { kind: "text", text: "Bir harita " },
      { kind: "chip", label: "ErasmusMap", slug: "erasmusmap" },
      { kind: "text", text: ", sonra." },
    ]);
  });

  it("reads a two-word label with Turkish letters", () => {
    expect(storyChipSlugs("bir belgesel [İklim Krizi](#iklim-krizi).")).toEqual(["iklim-krizi"]);
    expect(storyPlainText("bir belgesel [İklim Krizi](#iklim-krizi).")).toBe(
      "bir belgesel İklim Krizi.",
    );
  });
});

describe("broken chips fail the build", () => {
  it("flags link syntax the chip pattern doesn't match", () => {
    expect(hasMalformedChip("[ErasmusMap](erasmusmap)")).toBe(true);
    expect(hasMalformedChip("[ErasmusMap]")).toBe(true);
    expect(hasMalformedChip("a map [ErasmusMap](#erasmusmap).")).toBe(false);
  });

  it("rejects a chip to a tape that doesn't exist", () => {
    expect(() => checkAboutLinks(about("[Ghost](#ghost)"), tapes)).toThrow(/chip #ghost/);
  });

  it("rejects a note after a chip that isn't in the story", () => {
    expect(() =>
      checkAboutLinks(about("[ErasmusMap](#erasmusmap)", [{ after: "seeyournextstep" }]), tapes),
    ).toThrow(/no such chip/);
  });

  it("rejects a margin note on ATAMap (SPEC §6)", () => {
    expect(() => checkAboutLinks(about("[ATAMap](#atamap)", [{ after: "atamap" }]), tapes)).toThrow(
      /no margin note on atamap/,
    );
  });

  it("accepts real chips and an end note", () => {
    expect(() =>
      checkAboutLinks(
        about("[ErasmusMap](#erasmusmap) ve [ATAMap](#atamap).", [
          { after: "erasmusmap" },
          { after: "end" },
        ]),
        tapes,
      ),
    ).not.toThrow();
  });
});

describe("checkPrinciples", () => {
  const five = [1, 2, 3, 4, 5].map((order) => ({ order, project: "erasmusmap" }));

  it("needs exactly five principles with unique order", () => {
    expect(() => checkPrinciples(five)).not.toThrow();
    expect(() => checkPrinciples(five.slice(0, 4))).toThrow(/expected 5/);
    expect(() => checkPrinciples([...five.slice(0, 4), { order: 1, project: "atamap" }])).toThrow(
      /duplicate order/,
    );
  });
});
