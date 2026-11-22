/*
 * Cross-file content rules a single schema can't see (ARCHITECTURE §3). velite.config.ts calls them in
 * prepare; throwing stops the build, so the live site stays on the previous version.
 */
import { storyChipSlugs } from "./story";

/** Chips and margin notes point at tapes: a broken one fails the build (ROADMAP D4 acceptance). */
export function checkAboutLinks(
  copies: { locale: string; about: { story: string; notes: { after: string }[] } }[],
  projectList: { slug: string; respectful: boolean }[],
) {
  const problems: string[] = [];
  const known = new Set(projectList.map((p) => p.slug));
  const respectful = new Set(projectList.filter((p) => p.respectful).map((p) => p.slug));
  for (const { locale, about } of copies) {
    const chips = storyChipSlugs(about.story);
    for (const slug of chips) {
      if (!known.has(slug)) problems.push(`site/${locale}.yaml: chip #${slug} is not a tape`);
    }
    for (const { after } of about.notes) {
      if (after !== "end" && !chips.includes(after)) {
        problems.push(`site/${locale}.yaml: note after "${after}" has no such chip in the story`);
      }
      // SPEC §6: no margin notes on ATAMap
      if (respectful.has(after)) problems.push(`site/${locale}.yaml: no margin note on ${after}`);
    }
  }
  if (problems.length > 0) throw new Error(`content/site:\n  ${problems.join("\n  ")}`);
}

export function checkPrinciples(list: { order: number; project: string }[]) {
  const orders = list.map((principle) => principle.order);
  if (list.length !== 5)
    throw new Error(`content/principles.yaml: expected 5, found ${list.length}`);
  if (new Set(orders).size !== orders.length) {
    throw new Error("content/principles.yaml: duplicate order");
  }
}
