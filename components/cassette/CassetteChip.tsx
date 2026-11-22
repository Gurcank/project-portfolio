import { cassetteSurface } from "@/components/cassette/cassette-colors";
import type { Project } from "@/lib/content";

type CassetteChipProps = {
  slug: string;
  color: Project["color"];
  /** What the chip shows: a project name in a sentence, or "GK-02 Novera Mobility" beside a principle */
  label: string;
  /** Approved template "{project} case study'sini aç" (CONTENT §8) */
  openLabel: string;
};

/**
 * A project chip (INS-05): a small label in the tape's colour that opens its case study, like the tape on
 * the shelf. A real link to the hash, so it works before hydration and the overlay counts it as "chip".
 * The visible label is part of the accessible name (WCAG 2.5.3), same as the shelf's spines.
 */
export function CassetteChip({ slug, color, label, openLabel }: CassetteChipProps) {
  const [before = "", after = ""] = openLabel.split("{project}");
  return (
    <a
      href={`#${slug}`}
      data-case-source="chip"
      // box-decoration-clone: a chip that wraps keeps its colour and padding on both lines
      className={`rounded-sm box-decoration-clone px-2 py-1 font-bold underline-offset-4 hover:underline ${cassetteSurface[color]}`}
    >
      <span className="sr-only">{before}</span>
      {label}
      <span className="sr-only">{after}</span>
    </a>
  );
}
