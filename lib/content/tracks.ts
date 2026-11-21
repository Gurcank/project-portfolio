/*
 * Splits a case study body into its six tracks (CONTENT §1) and computes reading times.
 * Used by velite.config.ts, so a missing or misordered track fails the build.
 * Relative import paths only: Velite loads this file outside Next's alias resolution.
 */
import type { Locale } from "../i18n";

export const TRACK_IDS = ["A1", "A2", "A3", "B1", "B2", "B3"] as const;
export type TrackId = (typeof TRACK_IDS)[number];

export type Track = {
  id: TrackId;
  side: "A" | "B";
  title: string;
  markdown: string;
  words: number;
  readingTime: string;
};

// CONTENT §0: words per minute by language (Turkish is agglutinative: fewer, longer words)
const WORDS_PER_MINUTE: Record<Locale, number> = { tr: 180, en: 200 };
const ROUND_TO_SECONDS = 5;

const TRACK_HEADING = /^## ([AB][1-3]) · (.+)$/gm;

/** Words a reader sees: Markdown markers and list numbers are not words. */
export function countMarkdownWords(markdown: string): number {
  const plain = markdown
    .replace(/^\s*(\d+\.|[-*])\s+/gm, "")
    .replace(/[*_`#>]/g, " ")
    .trim();
  return plain ? plain.split(/\s+/).length : 0;
}

/** words → "m:ss", rounded to the nearest 0:05 (CONTENT §0) */
export function formatReadingTime(words: number, locale: Locale): string {
  const seconds = (words / WORDS_PER_MINUTE[locale]) * 60;
  const rounded = Math.max(
    ROUND_TO_SECONDS,
    Math.round(seconds / ROUND_TO_SECONDS) * ROUND_TO_SECONDS,
  );
  return `${Math.floor(rounded / 60)}:${String(rounded % 60).padStart(2, "0")}`;
}

export type ParsedTracks = { tracks: Track[]; words: number; readingTime: string };

/** Throws with a readable message when the body doesn't have exactly A1…B3, in order. */
export function parseTracks(body: string, locale: Locale): ParsedTracks {
  const headings = [...body.matchAll(TRACK_HEADING)];
  const ids = headings.map((match) => match[1]);
  if (ids.join() !== TRACK_IDS.join()) {
    throw new Error(
      `tracks must be ## ${TRACK_IDS.join(", ")} in order; found ${ids.join(", ") || "none"}`,
    );
  }

  const tracks = headings.map((match, index) => {
    const start = (match.index ?? 0) + match[0].length;
    const end = headings[index + 1]?.index ?? body.length;
    const markdown = body.slice(start, end).trim();
    const words = countMarkdownWords(markdown);
    const id = match[1] as TrackId;
    return {
      id,
      side: id[0] as Track["side"],
      title: (match[2] ?? "").trim(),
      markdown,
      words,
      readingTime: formatReadingTime(words, locale),
    };
  });

  const words = tracks.reduce((sum, track) => sum + track.words, 0);
  return { tracks, words, readingTime: formatReadingTime(words, locale) };
}
