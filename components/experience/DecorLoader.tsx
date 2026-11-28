"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import type { DecorData } from "@/components/experience/DecorLayer";
import { useMediaQuery } from "@/lib/use-media-query";

// Its own chunk (ADR-18: PixelDecor, after idle): fetched only on wide screens, never on a phone
const DecorLayer = dynamic(() => import("@/components/experience/DecorLayer"), { ssr: false });

// From lg: the shelves and paintings sit inside the content (v3); the gutter pieces still only show
// from xl (DecorSlot), where the gutter is wide enough (SPEC §8)
const WIDE = "(width >= 64rem)";

/** Waits for the browser to be idle, so the first screen never waits on decor. */
function useIdle(): boolean {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    // Safari has no requestIdleCallback: a short timeout stands in
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setIdle(true), { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(() => setIdle(true), 1500);
    return () => window.clearTimeout(id);
  }, []);
  return idle;
}

export function DecorLoader(props: DecorData) {
  const wide = useMediaQuery(WIDE);
  const idle = useIdle();
  return wide && idle ? <DecorLayer {...props} /> : null;
}
