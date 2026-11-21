/*
 * Motion needs numbers, the design system keeps durations and easings as CSS tokens (styles/tokens.css).
 * Reading them at animation time keeps one source of truth, and inherits the token overrides for
 * reduced motion and "pause motion" (both set every duration to 0ms).
 */

type DurationToken = "--duration-fast" | "--duration-base" | "--duration-slow";
type EasingToken = "--ease-out" | "--ease-in-out";
export type CubicBezier = [number, number, number, number];

const LINEAR: CubicBezier = [0, 0, 1, 1];

/** "450ms" / "0.45s" → seconds; 0 when unreadable (no motion is the safe fallback). */
export function parseDuration(value: string): number {
  const match = /^([\d.]+)(ms|s)$/.exec(value.trim());
  if (!match) return 0;
  const amount = Number(match[1]);
  return match[2] === "ms" ? amount / 1000 : amount;
}

/** "cubic-bezier(0.22, 1, 0.36, 1)" → [0.22, 1, 0.36, 1]; linear when unreadable. */
export function parseCubicBezier(value: string): CubicBezier {
  const points = /cubic-bezier\(([^)]+)\)/.exec(value)?.[1]?.split(",").map(Number);
  return points?.length === 4 && points.every(Number.isFinite) ? (points as CubicBezier) : LINEAR;
}

function readToken(name: string): string {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name);
}

export const durationSeconds = (name: DurationToken) => parseDuration(readToken(name));
export const easingPoints = (name: EasingToken) => parseCubicBezier(readToken(name));
