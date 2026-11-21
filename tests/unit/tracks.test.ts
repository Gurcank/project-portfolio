import { describe, expect, it } from "vitest";

import { countMarkdownWords, formatReadingTime, parseTracks } from "@/lib/content/tracks";
import { fillTemplate, projectFromHash } from "@/lib/hash-route";

const body = ["A1", "A2", "A3", "B1", "B2", "B3"]
  .map((id) => `## ${id} · Title ${id}\nOne two three four.`)
  .join("\n\n");

describe("countMarkdownWords", () => {
  it("ignores list numbers, bullets and emphasis markers", () => {
    expect(countMarkdownWords("1. **Şehir = NUTS 3.** *Seçtim:* nokta\n- iki üç")).toBe(8);
  });

  it("counts an empty track as zero", () => {
    expect(countMarkdownWords("  ")).toBe(0);
  });
});

describe("formatReadingTime", () => {
  it.each([
    [180, "tr", "1:00"],
    [200, "en", "1:00"],
    [390, "tr", "2:10"],
    [1, "tr", "0:05"],
  ] as const)("%i words in %s → %s", (words, locale, expected) => {
    expect(formatReadingTime(words, locale)).toBe(expected);
  });
});

describe("parseTracks", () => {
  it("splits six tracks in order with sides and times", () => {
    const parsed = parseTracks(body, "tr");
    expect(parsed.tracks.map((track) => `${track.side}:${track.id}`)).toEqual([
      "A:A1",
      "A:A2",
      "A:A3",
      "B:B1",
      "B:B2",
      "B:B3",
    ]);
    expect(parsed.tracks[0]).toMatchObject({
      title: "Title A1",
      markdown: "One two three four.",
      words: 4,
    });
    expect(parsed.words).toBe(24);
  });

  it("rejects a missing track", () => {
    expect(() => parseTracks(body.replace("## B2 · Title B2", "Plain line"), "en")).toThrow(
      /found A1, A2, A3, B1, B3/,
    );
  });

  it("rejects tracks out of order", () => {
    const swapped = body
      .replace("## A1", "## X1")
      .replace("## A2", "## A1")
      .replace("## X1", "## A2");
    expect(() => parseTracks(swapped, "en")).toThrow(/in order/);
  });
});

describe("projectFromHash", () => {
  const slugs = ["erasmusmap", "atamap"] as const;

  it("finds a tape", () => expect(projectFromHash("#atamap", slugs)).toBe("atamap"));
  it("ignores section anchors", () => expect(projectFromHash("#contact", slugs)).toBeNull());
  it("ignores an empty hash", () => expect(projectFromHash("", slugs)).toBeNull());
});

describe("fillTemplate", () => {
  it("fills named placeholders and leaves unknown ones", () => {
    expect(fillTemplate("Sıradaki kaset: {project} {x}", { project: "ATAMap" })).toBe(
      "Sıradaki kaset: ATAMap {x}",
    );
  });
});
