export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tr";

// TR is served without a prefix so links on the CV skip a redirect (ADR-03).
const basePaths: Record<Locale, string> = { tr: "/", en: "/en" };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function otherLocale(locale: Locale): Locale {
  return locale === "tr" ? "en" : "tr";
}

/** Path for a locale, keeping a case-study or section hash: localePath("en", "atamap") → "/en#atamap" */
export function localePath(locale: Locale, hash?: string): string {
  const base = basePaths[locale];
  const cleanHash = hash?.replace(/^#/, "");
  return cleanHash ? `${base}#${cleanHash}` : base;
}

/** Value for Metadata `alternates.languages` (hreflang) */
export function languageAlternates(): Record<Locale | "x-default", string> {
  return { tr: basePaths.tr, en: basePaths.en, "x-default": basePaths[defaultLocale] };
}
