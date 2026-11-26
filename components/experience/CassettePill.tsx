"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "▶ Open" beside the cursor while it is over a tape on the shelf (INS-19, SPEC §8). Decorative: the
 * tape link already carries its full accessible name. Real pointers on desktop only (HomeView decides).
 */
export function CassettePill({ label }: { label: string }) {
  const pill = useRef<HTMLSpanElement>(null);
  const [over, setOver] = useState(false);

  useEffect(() => {
    function onMove(event: PointerEvent) {
      const onTape = (event.target as Element | null)?.closest?.(".shelf-spine") != null;
      setOver(onTape);
      if (onTape && pill.current) {
        // A transform, not top/left: moves on the compositor, no layout work on every pointer move
        pill.current.style.transform = `translate(${event.clientX + 16}px, ${event.clientY + 16}px)`;
      }
    }
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <span
      ref={pill}
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 left-0 z-(--z-cursor) rounded-full bg-ink px-3 py-1 font-mono text-label tracking-wide text-paper uppercase ${
        over ? "opacity-100" : "opacity-0"
      }`}
    >
      {label}
    </span>
  );
}
