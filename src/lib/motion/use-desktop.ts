"use client";

import { useEffect, useState } from "react";

const DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * Tracks whether the viewport is at least desktop-width (Tailwind's `lg`),
 * including live changes on resize. Starts `false` — the safe default — until
 * confirmed on the client, same hydration-safety convention as the other
 * motion hooks in this folder.
 */
export function useDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    setIsDesktop(media.matches);
    const onChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
}
