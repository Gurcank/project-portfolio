import { useCallback, useSyncExternalStore } from "react";

/** Live `matchMedia` result; false on the server and in the first hydration pass. */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

// Same edge as the lg breakpoint in tokens.css: the shelf shows covers from here up
export const DESKTOP_SHELF = "(width >= 64rem)";
