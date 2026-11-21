"use client";

import { useEffect, useState } from "react";

import { analyticsEvents } from "@/lib/analytics";

type CopyState = "idle" | "copied" | "failed";

type CopyEmailButtonProps = {
  email: string;
  /** id of the element showing the address; selected for the user when the clipboard is refused */
  targetId: string;
  labels: { copyEmail: string; copied: string; copyFailed: string };
};

// Long enough to read "Copied", short enough that a second click doesn't feel stuck
const RESET_AFTER_MS = 2000;

function selectText(elementId: string) {
  const element = document.getElementById(elementId);
  const selection = window.getSelection();
  if (!element || !selection) return;
  const range = document.createRange();
  range.selectNodeContents(element);
  selection.removeAllRanges();
  selection.addRange(range);
}

export function CopyEmailButton({ email, targetId, labels }: CopyEmailButtonProps) {
  const [state, setState] = useState<CopyState>("idle");

  useEffect(() => {
    if (state !== "copied") return;
    const timer = window.setTimeout(() => setState("idle"), RESET_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      // Clipboard can be blocked by permissions or an insecure context; the address stays selectable
      selectText(targetId);
      setState("failed");
    }
  }

  return (
    <span className="inline-flex flex-col gap-2">
      <button
        type="button"
        onClick={copy}
        data-umami-event={analyticsEvents.contactEmailClick}
        data-umami-event-method="copy"
        className="inline-flex min-h-12 items-center rounded-sm border border-ink px-4 font-mono text-label tracking-wide uppercase transition-colors duration-(--duration-fast) hover:bg-ink hover:text-paper"
      >
        {state === "copied" ? labels.copied : labels.copyEmail}
      </button>
      <span role="status" className={state === "failed" ? "text-small text-ink-muted" : "sr-only"}>
        {state === "copied" ? labels.copied : state === "failed" ? labels.copyFailed : ""}
      </span>
    </span>
  );
}
