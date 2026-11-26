import { getProfile, getSiteCopy } from "@/lib/content";
import { localePath, type Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site-url";

/** schema.org Person for the page's owner; every value comes from content, nothing is typed here. */
export function personJsonLd(locale: Locale) {
  const { name, linkedin, github } = getProfile();
  const { meta } = getSiteCopy(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url: new URL(localePath(locale), siteUrl).href,
    description: meta.description,
    sameAs: [linkedin, github],
  };
}
