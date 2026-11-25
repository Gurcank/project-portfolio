"use client";

import "@/components/experience/mascot.css";
import { useEffect, useState } from "react";

import { PixelLayer } from "@/components/pixel/PixelSprite";
import { gridSize } from "@/components/pixel/pixel";
import {
  plantBase,
  plantFlower,
  plantLeaves,
  plantPalette,
} from "@/components/pixel/sprites/plant";
import { useActiveSection } from "@/lib/active-section";
import { useMotionPaused } from "@/lib/experience-store";
import { useMediaQuery } from "@/lib/use-media-query";

// Reduced motion and "pause motion" keep one still pose (SPEC §8): the plant half grown, no flower
const STILL_LEAVES = 3;

/** How far down the page the reader is, 0 → 1, updated at most once a frame. */
function useReadProgress(): number {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return progress;
}

/**
 * The mascot (SPEC §8, INS-20 + INS-26): a potted plant above the section indicator that opens a leaf
 * as the page is read and flowers in Contact. Decor, so hidden from assistive tech and never clickable.
 * Loaded only on desktop (MascotLoader), and not over the hero, where the first screen stays clean.
 */
export default function Mascot() {
  const section = useActiveSection();
  const progress = useReadProgress();
  const paused = useMotionPaused();
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const still = paused || reduce;

  if (section === "top") return null;
  const { width, height } = gridSize(plantBase);
  const leaves = still ? STILL_LEAVES : Math.round(progress * plantLeaves.length);
  const flowering = !still && section === "contact";

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      className="mascot pointer-events-none fixed bottom-24 left-2 z-(--z-indicator) w-12"
    >
      <PixelLayer grid={plantBase} palette={plantPalette} />
      {plantLeaves.map((leaf, i) => (
        <PixelLayer
          key={i}
          grid={leaf}
          palette={plantPalette}
          className={i < leaves ? "mascot-part is-open" : "mascot-part"}
        />
      ))}
      <PixelLayer
        grid={plantFlower}
        palette={plantPalette}
        className={flowering ? "mascot-part is-open" : "mascot-part"}
      />
    </svg>
  );
}
