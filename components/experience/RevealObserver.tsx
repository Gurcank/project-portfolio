"use client";

import { useEffect } from "react";

/**
 * Marks [data-reveal] elements with data-in the first time they come into view (v3 landing animations).
 * It also sets <html data-reveal>, and only then do the hidden starting states apply (styles/scroll.css),
 * so without script, or if this fails, every word is simply there.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.in = "";
          observer.unobserve(entry.target);
        }
      },
      // A little inside the screen, so the reader sees the movement rather than its end
      { rootMargin: "0% 0% -10% 0%" },
    );
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    root.dataset.reveal = "";
    return () => {
      observer.disconnect();
      delete root.dataset.reveal;
    };
  }, []);
  return null;
}
