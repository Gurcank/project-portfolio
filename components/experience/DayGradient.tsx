"use client";

import { useEffect } from "react";

type Time = "morning" | "noon" | "afternoon" | "sunset" | "dusk" | "night";

// smoothstep(t) = t²(3 − 2t) at five points: neither end of a transition shows an edge
const CURVE = [0, 0.25, 0.5, 0.75, 1].map((t) => [t, t * t * (3 - 2 * t)] as const);

const ground = (time: Time) => `var(--color-time-${time})`;

/** Five stops easing from one time's ground to the next between two page offsets (px). */
function ease(from: Time, to: Time, start: number, end: number): string[] {
  return CURVE.map(([t, mix]) => {
    const colour =
      mix === 0
        ? ground(from)
        : mix === 1
          ? ground(to)
          : `color-mix(in oklab, ${ground(to)} ${(mix * 100).toFixed(1)}%, ${ground(from)})`;
    return `${colour} ${Math.round(start + (end - start) * t)}px`;
  });
}

const box = (element: Element | null) => {
  if (!element) return null;
  const rect = element.getBoundingClientRect();
  const top = rect.top + window.scrollY;
  const inner = element.firstElementChild ?? element;
  const style = getComputedStyle(inner);
  return {
    top,
    bottom: top + rect.height,
    height: rect.height,
    // Where the section's words start and end: its padding is the only text-free part
    contentTop: top + parseFloat(style.paddingTop),
    contentBottom: top + rect.height - parseFloat(style.paddingBottom),
  };
};

/**
 * The day as one long gradient behind the whole page (v3; replaces the per-section bands of V1, which
 * read as sharp edges). Light-to-light hours blend over most of two sections, from 60% of one to 40% of
 * the next, so the change starts long before the seam. Sunset to dusk is where the text turns light, so
 * that one blend stays in the text-free seam between About's last line and Colophon's first.
 *
 * Positions come from the real section boxes and are recomputed when the page resizes. Without script
 * the sections keep their own bands (globals.css), so the day still reads.
 */
export function DayGradient() {
  useEffect(() => {
    const root = document.documentElement;
    const paint = () => {
      const [hero, work, principles, about, colophon, contact] = [
        "top",
        "work",
        "principles",
        "about",
        "colophon",
        "contact",
      ].map((id) => box(document.getElementById(id)));
      const footer = box(document.querySelector("footer"));
      if (!hero || !work || !principles || !about || !colophon || !contact || !footer) return;
      const at = (section: NonNullable<typeof hero>, share: number) =>
        section.top + section.height * share;
      const stops = [
        // The first stop sits at the very top of the page
        `${ground("morning")} 0%`,
        ...ease("morning", "noon", at(hero, 0.6), at(work, 0.15)),
        ...ease("noon", "afternoon", at(work, 0.6), at(principles, 0.4)),
        ...ease("afternoon", "sunset", at(principles, 0.6), at(about, 0.3)),
        ...ease("sunset", "dusk", about.contentBottom, colophon.contentTop),
        ...ease("dusk", "night", at(contact, 0.5), at(footer, 0.4)),
      ];
      document.body.style.backgroundImage = `linear-gradient(in oklab to bottom, ${stops.join(", ")})`;
      root.dataset.day = "";
    };
    paint();
    const observer = new ResizeObserver(paint);
    observer.observe(document.body);
    return () => {
      observer.disconnect();
      document.body.style.backgroundImage = "";
      delete root.dataset.day;
    };
  }, []);
  return null;
}
