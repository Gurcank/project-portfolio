import type { Metadata } from "next";

import { getProfile, getSiteCopy } from "@/lib/content";
import { languageAlternates, localePath, type Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site-url";

const ogLocale: Record<Locale, string> = { tr: "tr_TR", en: "en_US" };

/** Same shape for both root layouts; only the copy and the canonical path differ. */
export function buildMetadata(locale: Locale): Metadata {
  const { meta } = getSiteCopy(locale);
  const { name } = getProfile();
  const path = localePath(locale);

  return {
    metadataBase: siteUrl,
    title: meta.title,
    description: meta.description,
    authors: [{ name }],
    alternates: { canonical: path, languages: languageAlternates() },
    openGraph: {
      type: "website",
      url: path,
      siteName: name,
      title: meta.title,
      description: meta.description,
      locale: ogLocale[locale],
      alternateLocale: Object.entries(ogLocale)
        .filter(([key]) => key !== locale)
        .map(([, value]) => value),
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}
