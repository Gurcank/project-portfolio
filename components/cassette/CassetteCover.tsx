import { cassetteSurface } from "@/components/cassette/cassette-colors";
import type { Project } from "@/lib/content";

type CassetteCoverProps = {
  catalog: string;
  title: string;
  color: Project["color"];
};

/*
 * The typographic cover (ARCHITECTURE §6: "no cover image → typographic cover"): the front of a tape,
 * drawn in code: shell in the project colour, a paper label with the title, two reels in a window.
 * Decorative: the same title and catalog number are real text next to it, so it is hidden from assistive tech.
 */
export function CassetteCover({ catalog, title, color }: CassetteCoverProps) {
  return (
    <div
      aria-hidden="true"
      className={`flex aspect-video flex-col gap-3 rounded-md p-4 shadow-lift ${cassetteSurface[color]}`}
    >
      <div className="flex flex-1 flex-col justify-between rounded-sm bg-paper px-4 py-3 text-ink">
        <span className="font-mono text-label tracking-wide">{catalog}</span>
        <span className="text-h3 leading-tight font-black wrap-anywhere font-stretch-condensed">
          {title}
        </span>
      </div>
      <svg viewBox="0 0 100 24" className="w-full" focusable="false">
        <rect x="18" y="2" width="64" height="20" rx="10" className="fill-ink" />
        <circle cx="30" cy="12" r="7" className="fill-paper" />
        <circle cx="70" cy="12" r="7" className="fill-paper" />
        <circle cx="30" cy="12" r="2.5" className="fill-ink" />
        <circle cx="70" cy="12" r="2.5" className="fill-ink" />
      </svg>
    </div>
  );
}
