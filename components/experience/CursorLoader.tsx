"use client";

import { Cursor } from "@/components/experience/Cursor";
import { useMediaQuery } from "@/lib/use-media-query";

// A real pointer on a wide screen: touch never gets a follower (INS-03, INS-19)
const FINE_DESKTOP = "(width >= 64rem) and (hover: hover) and (pointer: fine)";

export function CursorLoader({ label }: { label: string }) {
  return useMediaQuery(FINE_DESKTOP) ? <Cursor label={label} /> : null;
}
