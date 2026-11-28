"use client";

import { useEffect, useId, useState, useSyncExternalStore } from "react";

import { PixelSprite } from "@/components/pixel/PixelSprite";
import { tvOff, tvOn, tvPalette } from "@/components/pixel/sprites/tv";
import type { SiteCopy } from "@/lib/content";
import { fillTemplate } from "@/lib/hash-route";
import { drawVisitPick, type WalkmanItem } from "@/lib/walkman";

type FilmTvProps = {
  items: WalkmanItem[];
  labels: SiteCopy["microcopy"]["walkman"];
  /**
   * "fixed": bottom-right, inside the page gutter, shown from xl (the gutter is too narrow below it);
   * "inline": in the footer, below xl. Both are in the page and CSS shows one: no swap on hydration,
   * and the hidden one is out of the accessibility tree.
   */
  placement: "fixed" | "inline";
};

const subscribeNever = () => () => {};

/**
 * This visit's pick: drawn once per page load in the browser, so F5 or a new visit brings a new one and
 * both TVs on the page agree. Undefined on the server and in the hydration pass: a random title in the
 * server HTML would differ from the browser's, and that mismatch once made React re-render the whole
 * root and drop the pre-paint attributes on <html> (v3, the dock clock).
 */
function useVisitPick(count: number): number | null | undefined {
  return useSyncExternalStore(
    subscribeNever,
    () => drawVisitPick(count, Math.random),
    () => undefined,
  );
}

/**
 * The little TV (v4; INS-12, the walkman and then the CD player before it): it holds one film or song
 * for this visit. Press it to see the pick, press again (or Escape) to put it away. Not decor: a real
 * button with its own name and an expanded state; the pick is announced politely when it appears.
 */
export function FilmTv({ items, labels, placement }: FilmTvProps) {
  const [open, setOpen] = useState(false);
  const index = useVisitPick(items.length);
  const panelId = useId();
  const fixed = placement === "fixed";

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const item = index === undefined || index === null ? null : items[index];
  const [before = "", after = ""] = labels.result.split("{title}");
  const values = item ? { year: item.year, kind: labels.kinds[item.kind] } : undefined;

  return (
    <div
      className={
        fixed
          ? "fixed right-2 bottom-4 z-(--z-indicator) hidden xl:block"
          : "flex flex-wrap items-center gap-4 xl:hidden"
      }
    >
      {/* Polite live region: the pick is read once when it appears, without interrupting */}
      <div
        id={panelId}
        aria-live="polite"
        className={
          open
            ? `film-ticket rounded-sm bg-ink px-4 py-3 text-paper ${
                fixed ? "absolute right-full bottom-0 mr-3 w-max max-w-prose" : ""
              }`
            : "sr-only"
        }
      >
        {open && (
          <>
            <p className="border-b border-paper pb-1 font-mono text-label tracking-wide uppercase">
              {labels.heading}
            </p>
            <p className="mt-1 font-mono text-label tracking-wide">
              {index === null && labels.empty}
              {item && values && (
                <>
                  {fillTemplate(before, values)}
                  <span lang={item.lang}>{item.title}</span>
                  {fillTemplate(after, values)}
                </>
              )}
            </p>
          </>
        )}
      </div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={labels.label}
        aria-expanded={open}
        aria-controls={panelId}
        className={`rounded-sm p-1 transition-transform duration-(--duration-fast) hover:-translate-y-1 ${
          fixed ? "" : "order-first"
        }`}
      >
        <PixelSprite grid={open ? tvOn : tvOff} palette={tvPalette} className="w-12" />
      </button>
    </div>
  );
}
