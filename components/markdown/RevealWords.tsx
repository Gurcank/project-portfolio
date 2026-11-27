import { splitEmphasis } from "@/lib/text";

/*
 * The hero role line, one span per word so it can arrive word by word (V5, INS-18; styles/scroll.css).
 * Same `*word*` emphasis as <Emphasis>. Spaces stay real text between the spans, so copying the line
 * and reading it aloud are unchanged.
 */
export function RevealWords({ text }: { text: string }) {
  let word = 0;
  return splitEmphasis(text).flatMap((part, partIndex) =>
    part.text
      .split(/(\s+)/)
      .filter(Boolean)
      .map((chunk, chunkIndex) => {
        if (/^\s+$/.test(chunk)) return chunk;
        const style = { ["--word" as string]: word++ };
        const key = `${partIndex}-${chunkIndex}`;
        return part.emphasis ? (
          <em key={key} className="reveal-word font-accent font-regular italic" style={style}>
            {chunk}
          </em>
        ) : (
          <span key={key} className="reveal-word" style={style}>
            {chunk}
          </span>
        );
      }),
  );
}
