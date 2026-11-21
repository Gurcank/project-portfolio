/*
 * The URL hash is the case study route (ADR-11): "#atamap" opens that tape, anything else is a
 * section anchor or nothing. Pure functions only; the overlay owns history and event wiring.
 */

/** "#atamap" → "atamap" when it names a tape, otherwise null (unknown hashes are ignored). */
export function projectFromHash<Slug extends string>(
  hash: string,
  slugs: readonly Slug[],
): Slug | null {
  const value = decodeURIComponent(hash.replace(/^#/, ""));
  return slugs.find((slug) => slug === value) ?? null;
}

/** Fills "{name}" placeholders in approved microcopy templates. */
export function fillTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}
