"use client";

type TracklistSide = {
  label: string;
  tracks: { id: string; title: string; readingTime: string }[];
};

type TracklistProps = {
  slug: string;
  label: string;
  sides: TracklistSide[];
};

/**
 * Jumps within the overlay. Buttons, not hash links: the hash is the case study route (ADR-11),
 * so "#track" would close the tape. Focus moves to the track heading for screen readers.
 */
export function Tracklist({ slug, label, sides }: TracklistProps) {
  function jumpTo(trackId: string) {
    const heading = document.getElementById(`${slug}-${trackId}`);
    if (!heading) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    heading.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
    heading.focus({ preventScroll: true });
  }

  return (
    <nav aria-label={label} className="flex flex-col gap-6">
      {sides.map((side) => (
        <div key={side.label}>
          <p className="font-mono text-label tracking-wide text-ink-muted uppercase">
            {side.label}
          </p>
          <ol className="mt-2 flex flex-col">
            {side.tracks.map((track) => (
              <li key={track.id}>
                <button
                  type="button"
                  onClick={() => jumpTo(track.id)}
                  className="tape-track flex min-h-12 w-full items-baseline gap-3 border-b border-line px-2 py-2 text-left"
                >
                  <span className="font-mono text-label">{track.id}</span>
                  <span className="flex-1">{track.title}</span>
                  <span className="tape-track-time font-mono text-label text-ink-muted">
                    {track.readingTime}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </nav>
  );
}
