import { Archivo, Caveat, Fraunces, Geist_Mono } from "next/font/google";

/*
 * Preload every face the first screen uses (ADR-15): Archivo for the name (LCP), Fraunces Italic for the
 * role's one accent word, Geist Mono for the role/city/availability label. Without preload the last two
 * arrived after first paint, the hero reflowed and pushed Contact down (mobile Lighthouse CLS 0.177).
 * Caveat only appears in margin notes far below the fold, so it stays lazy.
 */
export const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  style: "italic",
  variable: "--font-fraunces",
  display: "swap",
});

export const geistMono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const caveat = Caveat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-caveat",
  display: "swap",
  preload: false,
});

export const fontVariables = [archivo, fraunces, geistMono, caveat]
  .map((font) => font.variable)
  .join(" ");
