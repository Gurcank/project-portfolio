"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import type { SiteCopy } from "@/lib/content";
import { DESKTOP_SHELF, useMediaQuery } from "@/lib/use-media-query";

// Its own chunk, fetched on desktop only and after the page has loaded (ADR-18: HeroDesk after idle)
const DeskScene = dynamic(() => import("@/components/hero/DeskScene"), { ssr: false });

/** True once the page has loaded and the browser is idle: the hero name (LCP) never waits on the desk. */
function useAfterLoad(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let idle = 0;
    const schedule = () => {
      // Safari has no requestIdleCallback: a short timeout stands in
      if (typeof window.requestIdleCallback === "function") {
        idle = window.requestIdleCallback(() => setReady(true), { timeout: 2000 });
      } else idle = window.setTimeout(() => setReady(true), 500);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idle);
      window.clearTimeout(idle);
    };
  }, []);
  return ready;
}

export function HeroDeskLoader({ desk }: { desk: SiteCopy["hero"]["desk"] }) {
  const desktop = useMediaQuery(DESKTOP_SHELF);
  const ready = useAfterLoad();
  return desktop && ready ? <DeskScene desk={desk} /> : null;
}
