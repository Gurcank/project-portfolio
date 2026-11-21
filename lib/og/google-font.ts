/*
 * OG images need raw font files (TTF/OTF; Satori can't read WOFF2 or variable fonts).
 * Google Fonts serves a static TrueType instance for a fixed axis value, subset to `text`,
 * which keeps the download to a few KB. Pattern from Vercel's OG examples.
 */
export async function loadGoogleFont(family: string, text: string): Promise<ArrayBuffer | null> {
  const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`;
  try {
    const css = await (await fetch(url)).text();
    const source = /src: url\((.+?)\) format\('(opentype|truetype)'\)/.exec(css)?.[1];
    if (!source) return null;
    const response = await fetch(source);
    return response.ok ? response.arrayBuffer() : null;
  } catch {
    // Offline build: the image falls back to the bundled default font instead of failing the deploy
    return null;
  }
}
