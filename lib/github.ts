/*
 * GitHub activity for About (v3, R6), read once at build time from GitHub's public contributions
 * calendar, the same page github.com draws a profile's graph from. No token: it is public data about
 * the site owner's own account. Not an official API: if the page changes or can't be reached, this
 * returns null and the section simply doesn't appear; the build never fails because of it.
 */

export type Contributions = {
  total: number;
  /** weeks[week][weekday] = level 0–4, oldest week first */
  weeks: number[][];
};

const TIMEOUT_MS = 8000;

export async function getContributions(profileUrl: string): Promise<Contributions | null> {
  const user = new URL(profileUrl).pathname.split("/").filter(Boolean)[0];
  if (!user) return null;
  try {
    const response = await fetch(`https://github.com/users/${user}/contributions`, {
      cache: "force-cache",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) return null;
    const html = await response.text();
    return parseContributions(html);
  } catch {
    return null;
  }
}

/** Pure parser, unit-tested: day cells carry "contribution-day-component-{weekday}-{week}" and a level. */
export function parseContributions(html: string): Contributions | null {
  const weeks: number[][] = [];
  const cell = /id="contribution-day-component-(\d+)-(\d+)"[^>]*?data-level="(\d)"/g;
  for (const match of html.matchAll(cell)) {
    const [, weekday, week, level] = match.map(Number) as [number, number, number, number];
    (weeks[week] ??= [])[weekday] = level;
  }
  const total = Number(
    /([\d,]+)\s+contributions?\s+in the last year/.exec(html)?.[1]?.replace(/,/g, ""),
  );
  if (!weeks.length || !Number.isFinite(total)) return null;
  return { total, weeks: Array.from(weeks, (days) => days ?? []) };
}
