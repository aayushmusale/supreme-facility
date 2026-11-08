/**
 * Shared scroll state for "The 24-Hour Campus". ScrollTrigger writes
 * `timeline.progress` (0→1); the 3D scene reads it inside useFrame. It is a plain
 * mutable object on purpose: React state here would re-render on every scroll tick.
 */
export const timeline = { progress: 0 };

export const START_HOUR = 5;
export const END_HOUR = 24;

export const hourFromProgress = (p: number) => START_HOUR + p * (END_HOUR - START_HOUR);

/** 7.5 -> "07:30". Hour 24 renders as "00:00" (midnight). */
export function formatHour(hour: number): string {
  const total = Math.round(hour * 60) % (24 * 60);
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** 7.5 -> "7:30 AM", 24 -> "12:00 AM". */
export function formatClock(hour: number): string {
  const total = Math.round(hour * 60) % (24 * 60);
  const h24 = Math.floor(total / 60);
  const m = total % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${h24 < 12 ? "AM" : "PM"}`;
}
