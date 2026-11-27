"use client";

import "@/components/experience/mascot.css";
import { useEffect, useState } from "react";

import { PixelSprite } from "@/components/pixel/PixelSprite";
import {
  walkerPalette,
  walkerStand,
  walkerStepA,
  walkerStepB,
  walkerWave,
} from "@/components/pixel/sprites/avatar";
import { useActiveSection } from "@/lib/active-section";
import { useMotionPaused } from "@/lib/experience-store";
import { useMediaQuery } from "@/lib/use-media-query";

// Pixels of scroll per step, and how long after the last scroll the walker stops and stands
const STRIDE = 48;
const REST_MS = 250;

/** How far down the page the reader is (0 → 1) and whether they are scrolling right now. */
function useWalk() {
  const [walk, setWalk] = useState({ progress: 0, step: 0, moving: false });
  useEffect(() => {
    let frame = 0;
    let rest = 0;
    const measure = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setWalk({
        progress: max > 0 ? Math.min(1, window.scrollY / max) : 0,
        step: Math.floor(window.scrollY / STRIDE) % 2,
        moving: true,
      });
      window.clearTimeout(rest);
      rest = window.setTimeout(() => setWalk((now) => ({ ...now, moving: false })), REST_MS);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      window.clearTimeout(rest);
    };
  }, []);
  return walk;
}

/** True once the footer's camp (V8) is on screen: there the sitting avatar takes over from the walker. */
function useAtCamp() {
  const [atCamp, setAtCamp] = useState(false);
  useEffect(() => {
    const camp = document.querySelector(".nature");
    if (!camp) return;
    const observer = new IntersectionObserver(([entry]) => setAtCamp(!!entry?.isIntersecting), {
      // Almost the whole camp: Contact sits just above it, and the walker waves there first
      threshold: 0.95,
    });
    observer.observe(camp);
    return () => observer.disconnect();
  }, []);
  return atCamp;
}

/**
 * The avatar's journey (V5, INS-20; replaces the D7 plant): a small pixel Gürcan walks down a trail in
 * the left gutter as the page is read, one step per stretch of scroll, stands when the reader stops and
 * waves in Contact. In the footer the camp scene takes over (V8). Decor: hidden from assistive tech and
 * never clickable. Loaded only on wide screens (MascotLoader), and not over the hero.
 * Reduced motion and "pause motion": it stands still at the foot of the trail.
 */
export default function Mascot() {
  const section = useActiveSection();
  const { progress, step, moving } = useWalk();
  const paused = useMotionPaused();
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const still = paused || reduce;
  const atCamp = useAtCamp();

  if (section === "top" || atCamp) return null;
  const waving = !still && section === "contact";
  const pose = still || !moving ? walkerStand : step ? walkerStepB : walkerStepA;

  return (
    <div
      aria-hidden="true"
      data-pose={waving ? "wave" : pose === walkerStand ? "stand" : "step"}
      className="mascot pointer-events-none fixed top-0 left-2 z-(--z-indicator)"
      style={{ ["--walk" as string]: still ? 1 : progress }}
    >
      <span className="mascot-trail" />
      <PixelSprite
        grid={waving ? walkerWave : pose}
        palette={walkerPalette}
        className="mascot-walker w-6"
      />
    </div>
  );
}
