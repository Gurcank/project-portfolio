import { useSyncExternalStore } from "react";

import { MOTION_STORAGE_KEY } from "@/lib/motion-preference";

/*
 * The "pause motion" preference (WCAG 2.2.2, ADR-18). It lives on <html data-motion="paused">, which
 * tokens.css and every motion stylesheet already obey; this store keeps React (Motion's reducedMotion)
 * in step and remembers the choice. Storage can be missing or blocked: then motion simply runs.
 */

function readPaused(): boolean {
  return document.documentElement.dataset.motion === "paused";
}

const listeners = new Set<() => void>();

export function setMotionPaused(paused: boolean) {
  if (paused) document.documentElement.dataset.motion = "paused";
  else delete document.documentElement.dataset.motion;
  try {
    if (paused) localStorage.setItem(MOTION_STORAGE_KEY, "paused");
    else localStorage.removeItem(MOTION_STORAGE_KEY);
  } catch {
    // Private mode or blocked storage: the choice holds for this page only
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useMotionPaused(): boolean {
  return useSyncExternalStore(subscribe, readPaused, () => false);
}
