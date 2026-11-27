import { splitEmphasis } from "@/lib/text";

/** Renders `*word*` as the one Instrument Serif Italic accent a heading gets (SPEC §8 typography). */
export function Emphasis({ text }: { text: string }) {
  return splitEmphasis(text).map((part, index) =>
    part.emphasis ? (
      <em key={index} className="font-accent font-regular italic">
        {part.text}
      </em>
    ) : (
      part.text
    ),
  );
}
