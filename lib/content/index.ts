// The only entry point to generated content: swapping Velite for another tool touches this folder alone (ADR-09).
import { profile, site, type Profile, type SiteCopy } from "#content";

import type { Locale } from "@/lib/i18n";

export type { Profile, SiteCopy };

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
