/*
 * The About story is plain text with project chips written as Markdown links to a tape's hash:
 * "…a map for Erasmus cities [ErasmusMap](#erasmusmap), …" (ARCHITECTURE §3). Parsed here so the
 * build (velite.config.ts) and the page read the same structure.
 */

export type StorySegment =
  { kind: "text"; text: string } | { kind: "chip"; label: string; slug: string };

const CHIP = /\[([^\]]+)\]\(#([a-z0-9-]+)\)/g;

export function parseStory(story: string): StorySegment[] {
  const segments: StorySegment[] = [];
  let cursor = 0;
  for (const match of story.matchAll(CHIP)) {
    const [whole, label = "", slug = ""] = match;
    if (match.index > cursor)
      segments.push({ kind: "text", text: story.slice(cursor, match.index) });
    segments.push({ kind: "chip", label, slug });
    cursor = match.index + whole.length;
  }
  if (cursor < story.length) segments.push({ kind: "text", text: story.slice(cursor) });
  return segments;
}

/** The story as a reader sees it: chip labels in place, link syntax gone (used for word budgets). */
export function storyPlainText(story: string): string {
  return parseStory(story)
    .map((segment) => (segment.kind === "chip" ? segment.label : segment.text))
    .join("");
}

/** Slugs the story links to, in order. */
export function storyChipSlugs(story: string): string[] {
  return parseStory(story).flatMap((segment) => (segment.kind === "chip" ? [segment.slug] : []));
}

/**
 * Link-like text the chip pattern didn't match ("[ErasmusMap](erasmusmap)", "[Label]") would render as
 * raw brackets on the page; the build treats it as a broken chip.
 */
export function hasMalformedChip(story: string): boolean {
  return /[[\]]/.test(story.replace(CHIP, ""));
}
