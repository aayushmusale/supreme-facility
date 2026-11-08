import * as THREE from "three";

/**
 * Shared scroll state for the homepage About section. ScrollTrigger writes `progress` (0..1);
 * the 3D scene reads it every frame. A plain mutable object on purpose: React state here would
 * re-render on every scroll tick.
 */
export const aboutTimeline = { progress: 0 };

export type Vec3 = readonly [number, number, number];

type Key = {
  /** Scroll progress at which the camera reaches this pose. */
  p: number;
  position: Vec3;
  target: Vec3;
  /**
   * How much of the aspect-ratio pull-back applies at this pose (1 = full). Wide establishing
   * shots need it in a narrow frame; close-ups are already tight.
   */
  fit: number;
};

/**
 * The five scenes as camera poses. The camera dwells on each pose, then glides to the next
 * (see sampleAboutCamera), so scrubbing back is the exact reverse.
 *
 *  01 reveal         0.00 - 0.14  full composition
 *  02 campus         0.34         close on the tower
 *  03 transport      0.52         the bus arriving at the stop
 *  04 operations     0.70 / 0.82  cafeteria, then housekeeping and maintenance
 *  05 ecosystem      1.00         pull back to the complete campus
 */
export const CAMERA_KEYS: readonly Key[] = [
  { p: 0, position: [24, 19, 30], target: [-1.4, 1.6, 2.6], fit: 1 },
  { p: 0.14, position: [24, 19, 30], target: [-1.4, 1.6, 2.6], fit: 1 },
  { p: 0.34, position: [12, 9, 18], target: [0, 5, -2.5], fit: 0.55 },
  { p: 0.52, position: [9.5, 3.8, 18.5], target: [2, 1.2, 8.8], fit: 0.3 },
  { p: 0.7, position: [-2.5, 5, 13], target: [-8.8, 1.7, 1.6], fit: 0.3 },
  { p: 0.82, position: [4.5, 5, 12.5], target: [8.8, 1.7, 1.2], fit: 0.3 },
  { p: 1, position: [27, 22, 32], target: [-1.4, 1.4, 2.6], fit: 1 },
];

const A = new THREE.Vector3();
const B = new THREE.Vector3();

/** Camera pose as a pure function of progress. Allocation-free. Returns the aspect-fit weight. */
export function sampleAboutCamera(p: number, outPosition: THREE.Vector3, outTarget: THREE.Vector3): number {
  const last = CAMERA_KEYS.length - 1;
  if (p <= CAMERA_KEYS[0].p) {
    outPosition.set(...CAMERA_KEYS[0].position);
    outTarget.set(...CAMERA_KEYS[0].target);
    return CAMERA_KEYS[0].fit;
  }
  if (p >= CAMERA_KEYS[last].p) {
    outPosition.set(...CAMERA_KEYS[last].position);
    outTarget.set(...CAMERA_KEYS[last].target);
    return CAMERA_KEYS[last].fit;
  }
  let i = 0;
  while (i < last - 1 && p > CAMERA_KEYS[i + 1].p) i++;
  const k0 = CAMERA_KEYS[i];
  const k1 = CAMERA_KEYS[i + 1];
  const t = THREE.MathUtils.smootherstep((p - k0.p) / (k1.p - k0.p), 0, 1);
  A.set(...k0.position);
  B.set(...k1.position);
  outPosition.lerpVectors(A, B, t);
  A.set(...k0.target);
  B.set(...k1.target);
  outTarget.lerpVectors(A, B, t);
  return THREE.MathUtils.lerp(k0.fit, k1.fit, t);
}

/** Which of the five scenes (0..4) a progress value falls in. */
export function sceneIndex(p: number): number {
  if (p < 0.2) return 0;
  if (p < 0.43) return 1;
  if (p < 0.61) return 2;
  if (p < 0.9) return 3;
  return 4;
}

export const SCENE_LABELS: readonly (string | null)[] = [
  null,
  "Integrated facility management",
  "Employee transportation",
  "Corporate food · Housekeeping · Maintenance",
  "One partner, every operation",
];

export const smooth01 = (x: number) => THREE.MathUtils.smoothstep(x, 0, 1);

/** Where the Supreme bus is along the front road: arrives from the left and stops at the bus stop. */
export const BUS_START_X = -11;
export const BUS_STOP_X = 3.8;
export function busX(p: number): number {
  return THREE.MathUtils.lerp(BUS_START_X, BUS_STOP_X, smooth01((p - 0.26) / 0.34));
}
