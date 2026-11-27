"use client";

import "@/components/experience/cursor.css";
import { useEffect, useRef, useState } from "react";

import { useMotionPaused } from "@/lib/experience-store";
import { useMediaQuery } from "@/lib/use-media-query";

type Mode = "idle" | "text" | "link" | "tape" | "leaf";

// What the pointer is over decides the follower's shape; the first match wins
const TAPE = ".shelf-spine, .works-wheel-card, .works-list a";
const LINK = "a, button, summary, [role='button'], label[for]";
const TEXT = "p, h1, h2, h3, h4, li, dd, dt, figcaption, blockquote, input, textarea";
const LEAF = "footer";

// Share of the remaining distance the ring closes each frame: it trails the pointer, never lags far
const FOLLOW = 0.22;
const TRAIL = 6;
const TRAIL_MS = 45;

function modeAt(target: Element | null): Mode {
  if (!target?.closest) return "idle";
  if (target.closest(TAPE)) return "tape";
  if (target.closest(LEAF)) return target.closest(LINK) ? "link" : "leaf";
  if (target.closest(LINK)) return "link";
  if (target.closest(TEXT)) return "text";
  return "idle";
}

/**
 * The cursor system (V7; grew out of the D9 "▶ Open" pill, INS-03/INS-19). The real cursor never goes
 * away; a follower sits beside it and changes with what it is over: a soft ring on the page, out of the
 * way over text (the I-beam is enough), a wider ring on links and buttons, the "▶ Open" pill on a tape,
 * and a short trail of leaves in the footer. Decor: hidden from assistive tech, never clickable. Real
 * pointers on wide screens only (CursorLoader). Reduced motion and "pause motion": no ring and no trail,
 * only the pill, which snaps to the pointer.
 */
export function Cursor({ label }: { label: string }) {
  const ring = useRef<HTMLSpanElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const leaves = useRef<(HTMLSpanElement | null)[]>([]);
  const [mode, setMode] = useState<Mode>("idle");
  const paused = useMotionPaused();
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const still = paused || reduce;

  useEffect(() => {
    const pointer = { x: -100, y: -100 };
    const at = { x: -100, y: -100 };
    const trail: { x: number; y: number }[] = [];
    let frame = 0;
    let lastDrop = 0;
    let current: Mode = "idle";

    const draw = (time: number) => {
      frame = 0;
      at.x = still ? pointer.x : at.x + (pointer.x - at.x) * FOLLOW;
      at.y = still ? pointer.y : at.y + (pointer.y - at.y) * FOLLOW;
      // A transform, not top/left: it moves on the compositor, with no layout work per frame
      if (ring.current) ring.current.style.transform = `translate(${at.x}px, ${at.y}px)`;
      if (pill.current) {
        pill.current.style.transform = `translate(${pointer.x + 16}px, ${pointer.y + 16}px)`;
      }
      if (!still && current === "leaf" && time - lastDrop > TRAIL_MS) {
        trail.unshift({ x: pointer.x, y: pointer.y });
        trail.length = Math.min(trail.length, TRAIL);
        lastDrop = time;
      }
      leaves.current.forEach((leaf, index) => {
        const spot = trail[index];
        if (!leaf) return;
        leaf.style.opacity = spot && current === "leaf" ? String(1 - index / TRAIL) : "0";
        if (spot) leaf.style.transform = `translate(${spot.x}px, ${spot.y}px)`;
      });
      const settled = Math.abs(pointer.x - at.x) + Math.abs(pointer.y - at.y) < 0.5;
      if (!settled || current === "leaf") frame = requestAnimationFrame(draw);
    };

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      const next = modeAt(event.target as Element | null);
      if (next !== current) {
        current = next;
        if (next !== "leaf") trail.length = 0;
        setMode(next);
      }
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const onLeave = () => {
      current = "idle";
      setMode("idle");
      pointer.x = pointer.y = -100;
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
    <div aria-hidden="true" data-cursor={mode} className="cursor-layer">
      {!still && <span ref={ring} className="cursor-ring" />}
      <span ref={pill} className="cursor-pill font-mono text-label tracking-wide uppercase">
        {label}
      </span>
      {!still &&
        Array.from({ length: TRAIL }, (_, index) => (
          <span
            key={index}
            ref={(node) => {
              leaves.current[index] = node;
            }}
            className="cursor-leaf"
          />
        ))}
    </div>
  );
}
