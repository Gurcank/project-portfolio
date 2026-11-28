/*
 * Words that brighten as the reader scrolls past them (v3; the ScrollRevealText idea in our own code).
 * Each word gets its place in the passage (--p, 0 → 1), and styles/scroll.css starts it a little later
 * the further along it is, so the light runs through the sentence with the scroll. Without scroll
 * timelines, with reduced motion or with motion paused, the text is simply at full strength.
 * The spaces stay real text between the word spans, so copying and reading aloud are unchanged.
 */

/** Splits `text` into word spans; `from` and `total` place it inside a longer passage. */
export function readWords(text: string, from = 0, total?: number) {
  const chunks = text.split(/(\s+)/).filter(Boolean);
  const count = total ?? chunks.filter((chunk) => !/^\s+$/.test(chunk)).length;
  let index = from;
  return chunks.map((chunk, key) => {
    if (/^\s+$/.test(chunk)) return chunk;
    const p = count > 1 ? index / (count - 1) : 0;
    index += 1;
    return (
      // Two decimals are plenty for a stagger, and every byte here is sent twice (HTML + RSC)
      <span key={key} className="read-word" style={{ ["--p" as string]: p.toFixed(2) }}>
        {chunk}
      </span>
    );
  });
}

/** Number of words in a string, to place several pieces of one passage on the same scale. */
export const wordCount = (text: string) => text.split(/\s+/).filter(Boolean).length;

export function ReadText({ text }: { text: string }) {
  return <>{readWords(text)}</>;
}
