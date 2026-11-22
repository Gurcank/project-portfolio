"use client";

import { useEffect, useState, type RefObject } from "react";

import { fillTemplate } from "@/lib/hash-route";

type TrackIndicatorProps = {
  slug: string;
  tracks: { id: string; title: string }[];
  /** "Şu an: {section}" — the same approved template as the page's indicator */
  template: string;
  /** The overlay panel: it scrolls, not the page */
  containerRef: RefObject<HTMLElement | null>;
};

/**
 * Inside a case study the indicator becomes "now playing": the track crossing 40% of the panel
 * (INS-07 merged with INS-28's NOW PLAYING). Hidden from assistive tech: the same information is in
 * the headings and the tracklist, so hearing it again would only repeat them.
 */
export function TrackIndicator({ slug, tracks, template, containerRef }: TrackIndicatorProps) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    setCurrent(null);
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting);
        const id = hit?.target.getAttribute("aria-labelledby")?.replace(`${slug}-`, "");
        if (id) setCurrent(id);
      },
      { root, rootMargin: "-40% 0% -60% 0%" },
    );
    for (const track of tracks) {
      const section = root.querySelector(`section[aria-labelledby="${slug}-${track.id}"]`);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [slug, tracks, containerRef]);

  const track = tracks.find((item) => item.id === current);
  if (!track) return null;

  return (
    <p
      aria-hidden="true"
      className="tape-indicator fixed bottom-4 left-4 z-(--z-indicator) inline-flex min-h-12 items-center rounded-full px-4 font-mono text-label tracking-wide uppercase shadow-lift"
    >
      {fillTemplate(template, { section: `${track.id} · ${track.title}` })}
    </p>
  );
}
