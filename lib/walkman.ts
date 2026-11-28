/*
 * The walkman's pick (SPEC §6, ROADMAP D7): a random film or song, never the same one twice in a row.
 * Pure, so the rule is tested without a browser; the component passes Math.random.
 */

export type WalkmanItem = {
  /** What is shown: a film's title, or "Artist — Title" for a song */
  title: string;
  year: string;
  kind: "film" | "song";
  /** The title's language, so an English name on the Turkish page is read with the right voice */
  lang: "tr" | "en";
};

/**
 * Index of the next item, or null for an empty list (the component then shows the empty state).
 * With two or more items the previous one is skipped; a one-item list can only repeat.
 */
export function pickNext(
  count: number,
  previous: number | null,
  random: () => number,
): number | null {
  if (count === 0) return null;
  if (count === 1 || previous === null) return Math.floor(random() * count);
  // Draw from the other count - 1 items, then step over the previous index
  const draw = Math.floor(random() * (count - 1));
  return draw >= previous ? draw + 1 : draw;
}

// The visit's pick (v4): drawn on first read and kept for the life of the page, so every reader of it
// (two TVs, re-renders) sees the same one until the next load
let visitPick: { count: number; index: number | null } | undefined;

/** This page load's pick, drawn once; a different list length (tests) draws again. */
export function drawVisitPick(count: number, random: () => number): number | null {
  if (visitPick?.count !== count) visitPick = { count, index: pickNext(count, null, random) };
  return visitPick.index;
}
