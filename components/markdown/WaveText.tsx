import { splitEmphasis } from "@/lib/text";

/*
 * A heading whose letters arrive in a short wave as it comes into view (v3; the Motion Text FX idea in our
 * own code). Screen readers get the plain sentence once (sr-only); the letters are a visual copy, hidden
 * from them, so nobody hears it spelled out. Keeps the one `*word*` italic accent of <Emphasis>.
 * The motion itself lives in styles/scroll.css and needs RevealObserver; without it the letters just sit.
 */
export function WaveText({ text }: { text: string }) {
  const parts = splitEmphasis(text);
  let letter = 0;
  return (
    <>
      <span className="sr-only">{parts.map((part) => part.text).join("")}</span>
      <span aria-hidden="true" className="wave" data-reveal="">
        {parts.flatMap((part, partIndex) =>
          part.text
            .split(/(\s+)/)
            .filter(Boolean)
            .map((chunk, chunkIndex) => {
              if (/^\s+$/.test(chunk)) return chunk;
              const letters = [...chunk].map((char, charIndex) => (
                <span
                  key={charIndex}
                  className="wave-letter"
                  style={{ ["--i" as string]: letter++ }}
                >
                  {char}
                </span>
              ));
              const key = `${partIndex}-${chunkIndex}`;
              // A word never breaks between its letters
              return part.emphasis ? (
                <em key={key} className="wave-word font-accent font-regular italic">
                  {letters}
                </em>
              ) : (
                <span key={key} className="wave-word">
                  {letters}
                </span>
              );
            }),
        )}
      </span>
    </>
  );
}
