import { useSyncExternalStore } from "react";

/*
 * Client side of the case study route (ADR-11). The overlay and the shelf covers both read the hash
 * from here, so they switch in the same render: the shelf hands its tape to the deck in one commit.
 */

// Fired after our own pushState/replaceState, which (unlike a hash link) don't emit hashchange
export const ROUTE_EVENT = "case-study-route";

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  window.addEventListener(ROUTE_EVENT, onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(ROUTE_EVENT, onChange);
  };
}
const readHash = () => window.location.hash;
const readServerHash = () => "";

export function useLocationHash(): string {
  return useSyncExternalStore(subscribe, readHash, readServerHash);
}

/*
 * Where the open tape came from. Only a tape picked on the shelf flies into the deck:
 * a shared link or "next tape" has no visible cover to fly from. Module state, not React state:
 * it is written by the click handler right before the route changes and read during that render.
 */
let openedFromShelf = false;

export function markOpenSource(fromShelf: boolean) {
  openedFromShelf = fromShelf;
}

export function isOpenedFromShelf(): boolean {
  return openedFromShelf;
}

/*
 * Which tape is in the deck right now. Motion only flies a shared element when, in one
 * commit, one copy drops a layoutId and another takes it. The overlay content mounts a commit after the
 * route changes (Radix portal), so the hand-over can't ride on the hash: the deck claims the tape
 * here once it is mounted, and the cover and the player both switch in the render that follows.
 */
let playerSlug: string | null = null;
const playerListeners = new Set<() => void>();

export function setPlayerSlug(slug: string | null) {
  if (playerSlug === slug) return;
  playerSlug = slug;
  playerListeners.forEach((listener) => listener());
}

function subscribePlayer(onChange: () => void) {
  playerListeners.add(onChange);
  return () => {
    playerListeners.delete(onChange);
  };
}

/** Whether this tape is in the deck. A boolean per tape, so claiming one tape re-renders
 *  only that cover (and the player), not all seven: the swap happens inside the click's frame. */
export function useTapeInPlayer(slug: string): boolean {
  return useSyncExternalStore(
    subscribePlayer,
    () => playerSlug === slug,
    () => false,
  );
}
