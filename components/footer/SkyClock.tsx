"use client";

import { useEffect, useRef } from "react";

/** The visitor's hour, by name. Boundaries are rough on purpose: the sky only needs four moods. */
export function skyAt(hour: number): "dawn" | "day" | "dusk" | "night" {
  if (hour >= 5 && hour < 8) return "dawn";
  if (hour >= 8 && hour < 17) return "day";
  if (hour >= 17 && hour < 20) return "dusk";
  return "night";
}

/*
 * Sets the landscape's sky from the visitor's own clock (V8). The static HTML ships the night sky; this
 * only changes a data attribute after hydration, so there is no layout shift and no mismatch to repair.
 * Rendered as an empty span inside the scene and writes to its parent.
 */
export function SkyClock() {
  const marker = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const scene = marker.current?.parentElement;
    if (scene) scene.dataset.sky = skyAt(new Date().getHours());
  }, []);
  return <span ref={marker} hidden />;
}
