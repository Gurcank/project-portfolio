/*
 * Tiny parsers for the two inline conventions in content/ (CONTENT §0):
 * `*word*` marks the single Instrument Serif Italic emphasis, ` · ` separates mono label parts.
 */

export type TextPart = { text: string; emphasis: boolean };

const EMPHASIS = /\*([^*]+)\*/;

/** "Bir *mesaj* uzağındayım" → [{Bir }, {mesaj, emphasis}, { uzağındayım}] */
export function splitEmphasis(value: string): TextPart[] {
  const match = EMPHASIS.exec(value);
  if (!match || match.index === undefined) return [{ text: value, emphasis: false }];

  const before = value.slice(0, match.index);
  const after = value.slice(match.index + match[0].length);
  return [
    { text: before, emphasis: false },
    { text: match[1] ?? "", emphasis: true },
    { text: after, emphasis: false },
  ].filter((part) => part.text.length > 0);
}

/** True when the string has exactly one `*emphasis*` and no stray asterisks. */
export function hasSingleEmphasis(value: string): boolean {
  const asterisks = value.split("*").length - 1;
  return asterisks === 2 && EMPHASIS.test(value);
}

/** Visible text without emphasis markers, for length budgets and plain-text contexts (meta, OG). */
export function stripEmphasis(value: string): string {
  return value.replaceAll("*", "");
}

/** Words as a reader counts them, for the CONTENT §0 budgets (buttons ≤ 3, errors ≤ 15). */
export function countWords(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

export type LabelPart = { text: string; status: boolean };

const STATUS_DOT = "●";

/** Mono label parts; a part starting with ● is the availability status (the dot itself is decor). */
export function splitLabel(value: string): LabelPart[] {
  return value
    .split(" · ")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) =>
      part.startsWith(STATUS_DOT)
        ? { text: part.slice(STATUS_DOT.length).trim(), status: true }
        : { text: part, status: false },
    );
}
