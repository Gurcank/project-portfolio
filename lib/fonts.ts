import { Archivo, Caveat, Fraunces, Geist_Mono } from "next/font/google";

// Only the display face is preloaded: it renders the LCP element (hero name) — ADR-15.
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
  preload: false,
});

export const geistMono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
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
