import * as THREE from "three";

/**
 * Static world layout shared by the campus (Phase 3) and the motion layers
 * (vehicles, people, props in Phase 5), so roads, bays and buildings are defined
 * in exactly one place. Units are scene units (~metres); +z is toward the camera's
 * starting side, the bus bay is at the front, the dock and sheds are at the back.
 */

export type Tower = { id: string; cx: number; cz: number; w: number; d: number; h: number; color: string };

export const TOWERS: readonly Tower[] = [
  { id: "t1", cx: 0, cz: -2, w: 5, d: 5, h: 9, color: "#3a1216" },
  { id: "t2", cx: -6, cz: -5, w: 4, d: 4, h: 6, color: "#2f0f13" }, // carries the rooftop solar
  { id: "t3", cx: 6, cz: -4, w: 4, d: 4, h: 6.5, color: "#2f0f13" }, // carries the plant room kit
];

/** Axis-aligned footprints [cx, cz, w, d], used to keep trees out of buildings/paving. */
export const FOOTPRINTS: readonly (readonly [number, number, number, number])[] = [
  ...TOWERS.map((t) => [t.cx, t.cz, t.w, t.d] as const),
  [-9.5, -0.5, 6, 5], // cafeteria
  [9.5, -9.5, 6, 4], // loading dock building
  [10.5, -5.2, 5, 4.4], // dock apron
  [-11.5, -9, 9, 3.6], // production shed
  [-11.5, -6.2, 8, 2], // shed conveyor yard
  [0, 4, 12, 8], // plaza
  [0, 12.1, 10, 1.8], // bus bay (between the plaza and the road)
  [17.8, 17.5, 3, 4], // security booth
];

// Closed road loop across the FRONT of the campus (an ellipse, centre (0, 19), radii 15 x 4.5).
// Order from the towers outward: plaza (z 0-8) -> bus bay (z ~11-13) -> road (back run z ~13-16).
// Passengers only ever walk plaza <-> bay, so they never cross traffic.
export const ROAD_CENTER = { x: 0, z: 19 } as const;
export const ROAD_RX = 15;
export const ROAD_RZ = 4.5;
export const ROAD_WIDTH = 3;
export const ROAD_Y = 0.08;

export const ROAD_CURVE = new THREE.CatmullRomCurve3(
  Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    return new THREE.Vector3(
      ROAD_CENTER.x + Math.cos(a) * ROAD_RX,
      ROAD_Y,
      ROAD_CENTER.z + Math.sin(a) * ROAD_RZ,
    );
  }),
  true,
  "catmullrom",
  0.5,
);

/** Deterministic PRNG so the scene is identical on every load (and SSR-safe). */
export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function blocked(x: number, z: number, margin: number): boolean {
  for (const [cx, cz, w, d] of FOOTPRINTS) {
    if (Math.abs(x - cx) < w / 2 + margin && Math.abs(z - cz) < d / 2 + margin) return true;
  }
  // Keep trees off the road AND out of the loop's interior (approximate: normalised ellipse radius).
  const r = Math.hypot((x - ROAD_CENTER.x) / ROAD_RX, (z - ROAD_CENTER.z) / ROAD_RZ);
  return r < 1.2;
}

export type TreeSpot = { x: number; z: number; s: number };

/** ~40 tree positions: first a ring along the plaza edges, then scattered fill. */
export function buildTreeSpots(count = 40): TreeSpot[] {
  const rand = mulberry32(7);
  const spots: TreeSpot[] = [];
  const tryAdd = (x: number, z: number) => {
    if (spots.length >= count || blocked(x, z, 0.8)) return;
    spots.push({ x, z, s: 0.8 + rand() * 0.5 });
  };
  for (let z = 0.5; z <= 7.6; z += 1.8) {
    tryAdd(-6.9, z);
    tryAdd(6.9, z);
  }
  let guard = 0;
  while (spots.length < count && guard++ < 2000) {
    tryAdd(-26 + rand() * 52, -16 + rand() * 40);
  }
  return spots;
}
