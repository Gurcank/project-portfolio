"use client";

import { useEffect } from "react";

import { useActiveSection } from "@/lib/active-section";

/**
 * Background tone per section (INS-18): writes the section being read to <html data-tone>, and the
 * stylesheet picks the colour (globals.css, tokens.css). Draws nothing; if it never runs, the page
 * simply stays on paper.
 */
export function ToneController() {
  const section = useActiveSection();
  useEffect(() => {
    document.documentElement.dataset.tone = section;
  }, [section]);
  return null;
}
