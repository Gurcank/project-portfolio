// The only entry point to generated content: swapping Velite for another tool touches this folder alone (ADR-09).
import {
  caseStudies,
  profile,
  projects,
  site,
  type CaseStudy,
  type Profile,
  type Project,
  type SiteCopy,
} from "#content";

import type { Locale } from "@/lib/i18n";

export type { CaseStudy, Profile, Project, SiteCopy };
export type { Track, TrackId } from "./tracks";

/** A project with its case study in one language and the tape that follows it on the shelf. */
export type ProjectView = Project & { study: CaseStudy; next: Project["slug"] };
export type ProjectSlug = Project["slug"];

export function getSiteCopy(locale: Locale): SiteCopy {
  const copy = site.find((entry) => entry.locale === locale);
  // Velite's prepare step already fails the build on a missing language; this guards the type
  if (!copy) throw new Error(`content/site/${locale}.yaml is missing`);
  return copy;
}

export function getProfile(): Profile {
  return profile;
}

/** Public path of the CV for a language, or undefined when that language has no CV yet. */
export function getCvHref(locale: Locale): string | undefined {
  return profile.cv[locale];
}

/** Shelf order; the last tape's "next" wraps to the first so the overlay never dead-ends. */
export function getProjects(locale: Locale): ProjectView[] {
  const ordered = [...projects].sort((a, b) => a.order - b.order);
  return ordered.map((project, index) => {
    const study = caseStudies.find(
      (entry) => entry.slug === project.slug && entry.locale === locale,
    );
    if (!study) throw new Error(`content/projects/${project.slug}/${locale}.md is missing`);
    const next = ordered[(index + 1) % ordered.length] ?? project;
    return { ...project, study, next: next.slug };
  });
}
