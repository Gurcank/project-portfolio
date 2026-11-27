import {
  Bricolage_Grotesque,
  Caveat,
  Fragment_Mono,
  Instrument_Sans,
  Instrument_Serif,
} from "next/font/google";

/*
 * v2 type (SPEC §8): Bricolage Grotesque for headings and the cassette spines (its width axis narrows to
 * 75%), Instrument Serif Italic for each heading's one accent word, Instrument Sans for body text,
 * Fragment Mono for labels. All first-screen faces are preloaded (ADR-15): without preload the hero
 * reflowed when they arrived (mobile Lighthouse CLS 0.177 in D1). Caveat sits far below the fold, so it
 * stays lazy.
 */
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-bricolage",
  display: "swap",
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif",
  display: "swap",
});

export const instrumentSans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const fragmentMono = Fragment_Mono({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-fragment-mono",
  display: "swap",
});

export const caveat = Caveat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-caveat",
  display: "swap",
  preload: false,
});

export const fontVariables = [bricolage, instrumentSerif, instrumentSans, fragmentMono, caveat]
  .map((font) => font.variable)
  .join(" ");
