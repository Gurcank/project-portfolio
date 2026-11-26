"use client";

import { CassettePill } from "@/components/experience/CassettePill";
import { useMediaQuery } from "@/lib/use-media-query";

// Desktop shelf (spines + cover) and a real pointer: a touch screen never gets a pill (INS-19)
const FINE_DESKTOP = "(width >= 64rem) and (hover: hover) and (pointer: fine)";

export function CassettePillLoader({ label }: { label: string }) {
  return useMediaQuery(FINE_DESKTOP) ? <CassettePill label={label} /> : null;
}
