import type { Project } from "@/lib/content";

/*
 * Literal class names per cassette colour, so Tailwind can see them at build time.
 * Each pair is the background + its AA text colour from SPEC §8 (tokens.css: --color-on-cassette-*).
 */
/** The cassette shell drawn in SVG takes the same colour as a fill */
export const cassetteFill: Record<Project["color"], string> = {
  mustard: "fill-cassette-mustard",
  terracotta: "fill-cassette-terracotta",
  midnight: "fill-cassette-midnight",
  burgundy: "fill-cassette-burgundy",
  petrol: "fill-cassette-petrol",
  olive: "fill-cassette-olive",
  rose: "fill-cassette-rose",
};

export const cassetteSurface: Record<Project["color"], string> = {
  mustard: "bg-cassette-mustard text-on-cassette-mustard",
  terracotta: "bg-cassette-terracotta text-on-cassette-terracotta",
  midnight: "bg-cassette-midnight text-on-cassette-midnight",
  burgundy: "bg-cassette-burgundy text-on-cassette-burgundy",
  petrol: "bg-cassette-petrol text-on-cassette-petrol",
  olive: "bg-cassette-olive text-on-cassette-olive",
  rose: "bg-cassette-rose text-on-cassette-rose",
};
