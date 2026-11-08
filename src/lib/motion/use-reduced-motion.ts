"use client";

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Tracks the user's prefers-reduced-motion preference, including live
 * changes (e.g. they flip it in OS settings while the tab is open).
 *
 * Starts `true` — the safe, static default — until the real preference is
 * read on the client, so nothing ever assumes motion is allowed before it's
 * confirmed. This never causes a hydration mismatch: the value only ever
 * gates a client-side animation *effect*; it never changes server-rendered
 * markup or text, which stays identical and fully visible either way.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    setReduced(media.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
