import "@/components/intro/intro.css";

import type { SiteCopy } from "@/lib/content";

/**
 * The once-per-session opening (SPEC §8): a tape counter rolls while "A map. A documentary. A
 * handbook." pass, then "Each one a product." The page is rendered underneath; this is a curtain.
 * Decorative and short, so it is hidden from assistive tech; it holds nothing focusable. Skipping is
 * handled by the pre-paint script (lib/intro-preference.ts), so this component ships no JavaScript.
 */
export function Intro({ copy }: { copy: SiteCopy["hero"]["intro"] }) {
  return (
    <div
      aria-hidden="true"
      className="intro fixed inset-0 z-(--z-cursor) flex-col items-center justify-center gap-12 bg-paper text-ink"
    >
      <p className="flex items-center font-mono text-label tracking-wide text-ink-muted">
        <span>00</span>
        {/* One digit tall window over a 0–9 strip */}
        <span className="intro-counter-window inline-block">
          <span className="intro-digit flex flex-col">
            {Array.from({ length: 10 }, (_, digit) => (
              <span key={digit}>{digit}</span>
            ))}
          </span>
        </span>
      </p>
      <p className="grid text-center text-display font-black font-stretch-condensed">
        {copy.words.map((word) => (
          <span key={word} className="intro-word">
            {word}
          </span>
        ))}
        <span className="intro-closing">{copy.closing}</span>
      </p>
      <p className="font-mono text-label tracking-wide text-ink-muted uppercase">{copy.skip}</p>
    </div>
  );
}
