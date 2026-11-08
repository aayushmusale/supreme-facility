import * as THREE from "three";

/** Smoothstep of x, clamped to 0..1. */
export const smooth = (x: number) => {
  const c = THREE.MathUtils.clamp(x, 0, 1);
  return c * c * (3 - 2 * c);
};

/** 0 → 1 as `hour` goes from a to b. */
export const ramp = (hour: number, a: number, b: number) => smooth((hour - a) / (b - a));

/**
 * Activity window as a pure function of the hour: fades in over [a0, a1], holds at 1,
 * fades out over [b0, b1]. Used to gate scene events (and scale instances to 0 when idle),
 * so everything is deterministic under scrubbing.
 */
export const pulse = (hour: number, a0: number, a1: number, b0: number, b1: number) =>
  ramp(hour, a0, a1) * (1 - ramp(hour, b0, b1));

/** Triangle wave 0→1→0 with period 1 (for back-and-forth walks). */
export const pingPong = (v: number) => 1 - Math.abs(2 * (v - Math.floor(v)) - 1);

export const fract = (v: number) => v - Math.floor(v);

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
