"use client";

import dynamic from "next/dynamic";

import { useMediaQuery } from "@/lib/use-media-query";

// Its own chunk, fetched only when the viewport is desktop (ROADMAP D7: no mascot code on a phone)
const Mascot = dynamic(() => import("@/components/experience/Mascot"), { ssr: false });

// xl, not lg: decor stays in the page gutter (SPEC §8), and only from xl is the gutter wide enough
const WIDE_GUTTER = "(width >= 80rem)";

/** Pixel decor is wide-desktop-only: below xl nothing renders and nothing is downloaded. */
export function MascotLoader() {
  return useMediaQuery(WIDE_GUTTER) ? <Mascot /> : null;
}
