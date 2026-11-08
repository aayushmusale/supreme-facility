import * as THREE from "three";

type Key = { h: number; sky: THREE.Color; sun: number; glow: number };
const mk = (h: number, sky: string, sun: number, glow: number): Key => ({
  h,
  sky: new THREE.Color(sky),
  sun,
  glow,
});

// Keyframes from the spec. Midday is tinted toward a warm-neutral pale blue (not the
// spec's generic #9ec9e8) to stay on-brand next to the oxblood/gold palette.
const KEYS: readonly Key[] = [
  mk(5, "#1b1030", 0.0, 1.0), // pre-dawn
  mk(7, "#f0a070", 0.6, 0.4), // sunrise
  mk(12, "#b4cbd6", 1.2, 0.0), // midday
  mk(17, "#f0a070", 0.7, 0.2), // golden hour
  mk(19, "#2a1430", 0.1, 1.0), // dusk
  mk(24, "#0b0610", 0.0, 1.2), // deep night
];

/**
 * Mutable output of the sampler. Shared module-level object: the scene mutates it
 * once per frame (in Sky.tsx) and other components (windows, vehicle lights) read it,
 * so nothing is allocated per frame and nothing goes through React state.
 */
export const skyState = {
  sunIntensity: 0,
  windowGlow: 1,
  /** 0 (night) → 1 (full day); drives ambient level and sun colour. */
  daylight: 0,
};

/**
 * Samples the keyframes at `hour`: writes the sky/fog colour into `out` and the
 * scalar values into `skyState`. Allocation-free.
 */
export function sampleSky(hour: number, out: THREE.Color) {
  let i = 0;
  while (i < KEYS.length - 2 && hour > KEYS[i + 1].h) i++;
  const k0 = KEYS[i];
  const k1 = KEYS[i + 1];
  const t = THREE.MathUtils.clamp((hour - k0.h) / (k1.h - k0.h), 0, 1);
  out.copy(k0.sky).lerp(k1.sky, t);
  skyState.sunIntensity = THREE.MathUtils.lerp(k0.sun, k1.sun, t);
  skyState.windowGlow = THREE.MathUtils.lerp(k0.glow, k1.glow, t);
  skyState.daylight = THREE.MathUtils.clamp(skyState.sunIntensity / 1.2, 0, 1);
}

const SUN_RADIUS = 12;

/**
 * Sun on a semicircular arc: east (-x) at 6:00, overhead at 12:00, west (+x) at 18:00.
 * Clamped, so before 6 and after 18 it rests on the horizon (intensity is ~0 there anyway).
 */
export function sunPosition(hour: number, out: THREE.Vector3) {
  const angle = THREE.MathUtils.clamp((hour - 6) / 12, 0, 1) * Math.PI;
  out.set(-Math.cos(angle) * SUN_RADIUS, Math.sin(angle) * SUN_RADIUS + 1, 6);
  return Math.sin(angle); // 0 at horizon → 1 overhead
}
