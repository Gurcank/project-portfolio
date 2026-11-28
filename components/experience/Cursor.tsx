"use client";

import "@/components/experience/cursor.css";
import { useEffect, useRef, useState } from "react";

import { useMotionPaused } from "@/lib/experience-store";
import { useMediaQuery } from "@/lib/use-media-query";

/** What the pointer leaves behind, by where it is on the page. */
type Trail = "none" | "reel" | "step" | "pencil" | "star" | "leaf";

// Over a tape the pill says "▶ Open"; everywhere else the section decides the trail
const TAPE = ".shelf-spine";
const BY_SECTION: Record<string, Trail> = {
  work: "reel",
  principles: "step",
  about: "pencil",
  colophon: "star",
  contact: "star",
};

const TRAIL = 8;
const DROP_MS = 45;

function trailAt(target: Element | null): Trail {
  if (!target?.closest) return "none";
  if (target.closest("footer")) return "leaf";
  const section = target.closest("section[id]");
  return (section && BY_SECTION[section.id]) || "none";
}

/**
 * The cursor system (v3; grew out of the D9 "▶ Open" pill and the V7 follower). The pixel arrow is the
 * cursor everywhere, text included (globals.css); behind it each part of the room leaves its own short
 * trail: tape reels over the work, footprints along the principles, a pencil line over the story, star
 * dust once it is dusk, leaves in the footer. Over a tape the "▶ Open" pill rides beside it.
 * Decor: hidden from assistive tech, never clickable. Real pointers on wide screens only
 * (CursorLoader). Reduced motion and "pause motion": no trail, only the pill.
 */
export function Cursor({ label }: { label: string }) {
  const pill = useRef<HTMLSpanElement>(null);
  const marks = useRef<(HTMLSpanElement | null)[]>([]);
  const [trail, setTrail] = useState<Trail>("none");
  const [onTape, setOnTape] = useState(false);
  const paused = useMotionPaused();
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const still = paused || reduce;

  useEffect(() => {
    const pointer = { x: -100, y: -100 };
    const spots: { x: number; y: number }[] = [];
    let frame = 0;
    let lastDrop = 0;
    let moved = false;
    let current: Trail = "none";

    const draw = (time: number) => {
      frame = 0;
      // A transform, not top/left: it moves on the compositor, with no layout work per frame
      if (pill.current) {
        pill.current.style.transform = `translate(${pointer.x + 16}px, ${pointer.y + 16}px)`;
      }
      if (!still && current !== "none" && time - lastDrop > DROP_MS) {
        // Moving: a new mark at the pointer. Still: the trail draws back into the pointer and is gone
        if (moved) spots.unshift({ x: pointer.x, y: pointer.y });
        else spots.pop();
        spots.length = Math.min(spots.length, TRAIL);
        lastDrop = time;
        moved = false;
      }
      marks.current.forEach((mark, index) => {
        const spot = spots[index];
        if (!mark) return;
        mark.style.opacity = spot && current !== "none" ? String(1 - index / TRAIL) : "0";
        if (spot) mark.style.transform = `translate(${spot.x}px, ${spot.y}px)`;
      });
      if (spots.length) frame = requestAnimationFrame(draw);
    };

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      moved = true;
      const target = event.target as Element | null;
      const next = trailAt(target);
      if (next !== current) {
        current = next;
        spots.length = 0;
        setTrail(next);
      }
      setOnTape(!!target?.closest?.(TAPE));
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const onLeave = () => {
      current = "none";
      spots.length = 0;
      setTrail("none");
      setOnTape(false);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [still]);

  return (
    <div
      aria-hidden="true"
      data-cursor={onTape ? "tape" : trail}
      data-trail={trail}
      className="cursor-layer"
    >
      <span ref={pill} className="cursor-pill font-mono text-label tracking-wide uppercase">
        {label}
      </span>
      {!still &&
        Array.from({ length: TRAIL }, (_, index) => (
          <span
            key={index}
            ref={(node) => {
              marks.current[index] = node;
            }}
            className="cursor-mark"
          />
        ))}
    </div>
  );
}
