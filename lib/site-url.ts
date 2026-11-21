/*
 * Absolute origin for canonical, hreflang, OG and sitemap URLs.
 * Vercel sets VERCEL_PROJECT_PRODUCTION_URL on every build (previews included) and switches it
 * to the custom domain once one exists, so S16's domain needs no code change.
 * https://vercel.com/docs/environment-variables/system-environment-variables
 */
function resolveSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return new URL(explicit);

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) return new URL(`https://${production}`);

  return new URL(`http://localhost:${process.env.PORT ?? 3000}`);
}

export const siteUrl = resolveSiteUrl();
