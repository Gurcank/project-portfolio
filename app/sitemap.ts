import type { MetadataRoute } from "next";

import { languageAlternates, localePath, locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/site-url";

// Hash routes (#atamap) are not separate URLs to crawlers; one entry per language page
export default function sitemap(): MetadataRoute.Sitemap {
  const absolute = (path: string) => new URL(path, siteUrl).href;
  const { tr, en } = languageAlternates();
  const languages = { tr: absolute(tr), en: absolute(en) };

  return locales.map((locale) => ({
    url: absolute(localePath(locale)),
    alternates: { languages },
  }));
}
