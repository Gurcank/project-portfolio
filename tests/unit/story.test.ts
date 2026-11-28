import { describe, expect, it } from "vitest";

import { checkAboutLinks, checkCredits, checkPrinciples } from "@/lib/content/integrity";
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

  it("needs three to nine principles with unique order", () => {
    expect(() => checkPrinciples(five)).not.toThrow();
    const nine = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((order) => ({ order, project: "atamap" }));
    expect(() => checkPrinciples(nine)).not.toThrow();
    expect(() => checkPrinciples(five.slice(0, 2))).toThrow(/expected 3–9/);
    expect(() => checkPrinciples([...nine, { order: 10, project: "atamap" }])).toThrow(
      /expected 3–9/,
    );
    expect(() => checkPrinciples([...five.slice(0, 4), { order: 1, project: "atamap" }])).toThrow(
      /duplicate order/,
    );
  });
});

describe("checkCredits", () => {
  const site = [
    { locale: "tr", credits: { groups: { font: "Fontlar", photo: "Fotoğraf" } } },
    { locale: "en", credits: { groups: { font: "Fonts", photo: "Photo" } } },
  ];
  const portrait = "https://gallica.bnf.fr/ark:/12148/btv1b9053984d";
  const font = {
    kind: "font",
    name: "Archivo",
    source: "https://fonts.google.com/specimen/Archivo",
  };
  const photo = { kind: "photo", name: "Portrait", source: portrait };

  it("accepts credited fonts and a credited portrait", () => {
    expect(() =>
      checkCredits({ credits: [font, photo], site, portraitSource: portrait, fonts: ["Archivo"] }),
    ).not.toThrow();
  });

  it("fails when the portrait has no matching photo credit", () => {
    expect(() =>
      checkCredits({ credits: [font], site, portraitSource: portrait, fonts: ["Archivo"] }),
    ).toThrow(/no photo credit for the portrait/);
  });

  it("fails when a loaded font is not credited", () => {
    expect(() => checkCredits({ credits: [font], site, fonts: ["Archivo", "Caveat"] })).toThrow(
      /font "Caveat" has no credit/,
    );
  });

  it("fails when a kind of credit has no group label", () => {
    const ai = { kind: "ai", name: "Claude", source: "https://www.anthropic.com/claude" };
    expect(() => checkCredits({ credits: [font, ai], site, fonts: ["Archivo"] })).toThrow(
      /no label for credit group "ai"/,
    );
  });
});
