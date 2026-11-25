"use client";

import { useEffect, useRef, useState } from "react";

import { PixelSprite } from "@/components/pixel/PixelSprite";
import { walkmanFrames, walkmanPalette } from "@/components/pixel/sprites/walkman";
import type { SiteCopy } from "@/lib/content";
import { useMotionPaused } from "@/lib/experience-store";
import { fillTemplate } from "@/lib/hash-route";
import { useMediaQuery } from "@/lib/use-media-query";
import { pickNext, type WalkmanItem } from "@/lib/walkman";

type WalkmanProps = {
  items: WalkmanItem[];
  labels: SiteCopy["microcopy"]["walkman"];
  /**
   * "fixed": bottom-right, inside the page gutter, shown from xl (the gutter is too narrow below it);
   * "inline": in the footer, below xl. Both are in the page and CSS shows one: no swap on hydration,
   * and the hidden one is out of the accessibility tree.
   */
  placement: "fixed" | "inline";
};

// The reels turn for a moment when it plays: enough to say "pressed", short of a loop
const SPIN_FRAMES = 6;
const FRAME_MS = 100;
// The fixed walkman's suggestion floats over the page, so it leaves after a while (already announced)
const BUBBLE_MS = 8000;

/**
 * The walkman (SPEC §6, INS-12): press it for a random film or song from my list, never the same twice
 * in a row. Not decor: a real button with its own name, and the suggestion is announced politely.
 */
export function Walkman({ items, labels, placement }: WalkmanProps) {
  const [index, setIndex] = useState<number | null>(null);
  const [empty, setEmpty] = useState(false);
  const [frame, setFrame] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const spin = useRef<number | undefined>(undefined);
  const bubble = useRef<number | undefined>(undefined);
  const paused = useMotionPaused();
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(
    () => () => {
      window.clearInterval(spin.current);
      window.clearTimeout(bubble.current);
    },
    [],
  );

  function play() {
    const next = pickNext(items.length, index, Math.random);
    setEmpty(next === null);
    setIndex(next);
    setShowBubble(true);
    window.clearTimeout(bubble.current);
    if (placement === "fixed")
      bubble.current = window.setTimeout(() => setShowBubble(false), BUBBLE_MS);
    if (paused || reduce) return;
    window.clearInterval(spin.current);
    let step = 0;
    spin.current = window.setInterval(() => {
      step += 1;
      setFrame(step % 2);
      if (step >= SPIN_FRAMES) window.clearInterval(spin.current);
    }, FRAME_MS);
  }

  const item = index === null ? null : items[index];
  const [before = "", after = ""] = labels.result.split("{title}");
  const visible = showBubble && (item || empty);
  const fixed = placement === "fixed";

  return (
    <div
      className={
        fixed
          ? "fixed right-2 bottom-4 z-(--z-indicator) hidden xl:block"
          : "flex flex-wrap items-center gap-4 xl:hidden"
      }
    >
      {/* Polite live region: read once, without interrupting; visually a small label beside the walkman */}
      <p
        aria-live="polite"
        className={
          visible
            ? `rounded-sm bg-ink px-3 py-2 font-mono text-label tracking-wide text-paper ${
                fixed ? "absolute right-full bottom-0 mr-2 w-max max-w-prose" : ""
              }`
            : "sr-only"
        }
      >
        {empty && labels.empty}
        {item && (
          <>
            {fillTemplate(before, { year: item.year, kind: labels.kinds[item.kind] })}
            <span lang={item.lang}>{item.title}</span>
            {fillTemplate(after, { year: item.year, kind: labels.kinds[item.kind] })}
          </>
        )}
      </p>
      <button
        type="button"
        onClick={play}
        aria-label={labels.label}
        className={`rounded-sm p-1 transition-transform duration-(--duration-fast) hover:-translate-y-1 ${
          fixed ? "" : "order-first"
        }`}
      >
        <PixelSprite grid={walkmanFrames[frame]!} palette={walkmanPalette} className="w-12" />
      </button>
    </div>
  );
}
