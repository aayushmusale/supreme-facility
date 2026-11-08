export type Quality = "full" | "lite";

export type QualitySettings = {
  /** Canvas pixel-ratio range. */
  dpr: [number, number];
  antialias: boolean;
  /** Sun shadows on/off, and their map resolution. */
  shadows: boolean;
  shadowMapSize: number;
  /** Buses circulating on the road loop (two more always park at the bay). */
  loopBuses: number;
  treeCount: number;
  /** Group sizes for the walking figures. */
  people: { housekeepers: number; arriving: number; leaving: number; supervisors: number };
};

export const QUALITY_SETTINGS: Record<Quality, QualitySettings> = {
  full: {
    dpr: [1, 1.5],
    antialias: true,
    shadows: true,
    shadowMapSize: 2048,
    loopBuses: 18,
    treeCount: 40,
    people: { housekeepers: 10, arriving: 8, leaving: 10, supervisors: 3 },
  },
  lite: {
    dpr: [1, 1.25],
    antialias: false,
    shadows: false,
    shadowMapSize: 1024,
    loopBuses: 8,
    treeCount: 20,
    people: { housekeepers: 5, arriving: 4, leaving: 5, supervisors: 2 },
  },
};

type NavigatorExt = Navigator & {
  deviceMemory?: number; // Chromium only; GB, capped at 8
  connection?: { saveData?: boolean };
};

/**
 * Picks a tier from cheap capability signals. Client-only (reads navigator/window), so call
 * it from an effect or a client-only initializer. `?quality=lite|full` overrides it for QA.
 * Anything that slips through as "full" on a weak device is caught at runtime by the
 * PerformanceMonitor in DayScene, which steps the resolution down.
 */
export function detectQuality(): Quality {
  const override = new URLSearchParams(window.location.search).get("quality");
  if (override === "lite" || override === "full") return override;

  const nav = navigator as NavigatorExt;
  const matches = (query: string) => window.matchMedia(query).matches;

  if (matches("(prefers-reduced-data: reduce)") || nav.connection?.saveData) return "lite";
  // Touch-first and not desktop-sized: phones and small tablets.
  if (matches("(pointer: coarse)") && window.innerWidth < 1024) return "lite";
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) return "lite";
  if (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 2) return "lite";
  return "full";
}
