import { useSyncExternalStore } from "react";

/*
 * Which section of the page the reader is in (INS-07 indicator, INS-18 background tone). One observer
 * for everyone who asks: it starts with the first subscriber and stops with the last.
 * "In" means the section crosses an invisible line 40% down the viewport, where the eye usually reads.
 */

export const sectionIds = ["top", "work", "principles", "about", "colophon", "contact"] as const;
export type SectionId = (typeof sectionIds)[number];

let current: SectionId = "top";
const listeners = new Set<() => void>();
let observer: IntersectionObserver | null = null;

function start() {
  observer = new IntersectionObserver(
    (entries) => {
      const hit = entries.find((entry) => entry.isIntersecting);
      const id = sectionIds.find((section) => section === hit?.target.id);
      if (!id || id === current) return;
      current = id;
      listeners.forEach((listener) => listener());
    },
    // A zero-height band at 40% of the viewport: exactly one section crosses it at a time
    { rootMargin: "-40% 0% -60% 0%" },
  );
  for (const id of sectionIds) {
    const element = document.getElementById(id);
    if (element) observer.observe(element);
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!observer) start();
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      observer?.disconnect();
      observer = null;
    }
  };
}

export function useActiveSection(): SectionId {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => "top",
  );
}
