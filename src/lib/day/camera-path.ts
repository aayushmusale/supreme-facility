import * as THREE from "three";
import { DAY_STOPS } from "./stops";

const LAST = DAY_STOPS.length - 1;

// Smooth curves through every stop's pose. "centripetal" avoids the loops/overshoot a
// uniform Catmull-Rom can produce when keyframes are unevenly spaced.
const positionCurve = new THREE.CatmullRomCurve3(
  DAY_STOPS.map((s) => new THREE.Vector3(...s.camera.position)),
  false,
  "centripetal",
);
const targetCurve = new THREE.CatmullRomCurve3(
  DAY_STOPS.map((s) => new THREE.Vector3(...s.camera.target)),
  false,
  "centripetal",
);

/**
 * Fraction of each gap between stops spent travelling. The camera dwells at stop i
 * for the first (1 - MOVE_FRACTION) of the gap, then glides, arriving at stop i+1
 * exactly when its panel appears.
 */
const MOVE_FRACTION = 0.6;

/** Continuous position along the stops: 0 = stop 1, 1 = stop 2 ... LAST = final stop. */
export function stopParam(hour: number): number {
  if (hour <= DAY_STOPS[0].hour) return 0;
  if (hour >= DAY_STOPS[LAST].hour) return LAST;
  let i = 0;
  while (i < LAST - 1 && hour >= DAY_STOPS[i + 1].hour) i++;
  const a = DAY_STOPS[i].hour;
  const b = DAY_STOPS[i + 1].hour;
  const t = (hour - a) / (b - a);
  const m = THREE.MathUtils.clamp((t - (1 - MOVE_FRACTION)) / MOVE_FRACTION, 0, 1);
  return i + THREE.MathUtils.smootherstep(m, 0, 1);
}

/**
 * Camera pose as a pure function of `hour` (so scrubbing backward is the exact
 * reverse). Writes into the provided vectors; allocation-free.
 */
export function sampleCamera(hour: number, outPosition: THREE.Vector3, outTarget: THREE.Vector3) {
  const u = stopParam(hour) / LAST;
  positionCurve.getPoint(u, outPosition);
  targetCurve.getPoint(u, outTarget);
  // Tiny idle drift, keyed to the hour (not elapsed time) so it stays scrub-deterministic.
  outPosition.y += Math.sin(hour * 2.1) * 0.06;
}
