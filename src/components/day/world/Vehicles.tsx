"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { fract, pulse, smooth } from "@/lib/day/activity";
import { ROAD_CURVE } from "@/lib/day/layout";
import { skyState } from "@/lib/day/sky";
import { hourFromProgress, timeline } from "@/lib/day/timeline";
import { useQualitySettings } from "../quality-context";

/*
 * Buses and trucks. All instanced, all a pure function of the hour (scrub-safe).
 * Hidden vehicles are scaled to 0 rather than removed.
 */

const BAY_SLOTS = [-2.6, 2.6] as const; // x of the two buses that pull in and park at the bay
const BAY_Z = 12.0; // bus occupies z 11.5..12.5; walkers stay on the plaza side (z <= 10.8)
const LANE_OFFSET = 0.75; // +n is toward the loop's centre: traffic keeps left (India)
const RUNWAY = 14; // how far outside its parking spot a vehicle starts/ends

// Bay visits: [arrive start, arrive end, leave start, leave end] in hours.
const BAY_VISITS = [
  [5.0, 5.9, 7.2, 8.0], // morning commute
  [17.6, 18.8, 20.2, 21.0], // evening shift change
] as const;

// Dock trucks: final x (parked parallel to the dock face) and visit times. Truck 2 leaves
// first so truck 1 never has to reverse through it.
const TRUCKS = [
  { x: 8.8, visit: [14.0, 14.8, 17.6, 18.4] },
  { x: 11.4, visit: [14.4, 15.2, 16.9, 17.6] },
] as const;
const TRUCK_Z = -5.6;

const dummy = new THREE.Object3D();
const P = new THREE.Vector3();
const T = new THREE.Vector3();

/**
 * Writes one instance matrix. (lx,ly,lz) is the part's offset in the vehicle's local
 * frame; it is rotated by rotY and scaled by s, so a vehicle built from several
 * instanced parts stays together. s = 0 hides it.
 */
function put(
  mesh: THREE.InstancedMesh,
  i: number,
  x: number,
  z: number,
  rotY: number,
  s: number,
  lx: number,
  ly: number,
  lz: number,
) {
  const c = Math.cos(rotY);
  const sn = Math.sin(rotY);
  dummy.position.set(x + (lx * c + lz * sn) * s, ly * s, z + (-lx * sn + lz * c) * s);
  dummy.rotation.set(0, rotY, 0);
  dummy.scale.setScalar(s);
  dummy.updateMatrix();
  mesh.setMatrixAt(i, dummy.matrix);
}

/**
 * Progress through a visit: 0..1 arriving, 1..2 leaving, -1 when not present.
 * `delay` staggers vehicles so they don't move in lockstep.
 */
function visitQ(h: number, v: readonly number[], delay: number) {
  if (h <= v[0] + delay || h >= v[3] + delay) return -1;
  return smooth((h - v[0] - delay) / (v[1] - v[0])) + smooth((h - v[2] - delay) / (v[3] - v[2]));
}

export function Vehicles() {
  // Buses on the road loop depend on the quality tier; two more always park at the bay.
  const { loopBuses } = useQualitySettings();
  const busCount = loopBuses + BAY_SLOTS.length;
  const body = useRef<THREE.InstancedMesh>(null);
  const glass = useRef<THREE.InstancedMesh>(null);
  const stripe = useRef<THREE.InstancedMesh>(null);
  const lights = useRef<THREE.InstancedMesh>(null);
  const cab = useRef<THREE.InstancedMesh>(null);
  const trailer = useRef<THREE.InstancedMesh>(null);
  const lightMat = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(() => {
    const b = body.current;
    const g = glass.current;
    const st = stripe.current;
    const l = lights.current;
    const c = cab.current;
    const tr = trailer.current;
    if (!b || !g || !st || !l || !c || !tr) return;

    const h = hourFromProgress(timeline.progress);

    // --- buses circulating on the road loop ---
    const loopAct = Math.max(pulse(h, 4.9, 5.6, 8.0, 8.8), pulse(h, 17.4, 18.2, 21.0, 21.8));
    for (let i = 0; i < loopBuses; i++) {
      // 0.3 loops per hour; i / loopBuses spreads the buses evenly around the ring.
      const u = fract(h * 0.3 + i / loopBuses);
      ROAD_CURVE.getPointAt(u, P);
      ROAD_CURVE.getTangentAt(u, T);
      placeBus(b, g, st, l, i, P.x - T.z * LANE_OFFSET, P.z + T.x * LANE_OFFSET, Math.atan2(T.x, T.z), loopAct);
    }

    // --- buses that pull into the bay, wait, and leave ---
    for (let k = 0; k < BAY_SLOTS.length; k++) {
      const delay = k * 0.25;
      let q = visitQ(h, BAY_VISITS[0], delay);
      if (q < 0) q = visitQ(h, BAY_VISITS[1], delay);
      const x = q < 0 ? BAY_SLOTS[k] : BAY_SLOTS[k] + RUNWAY * (Math.min(q, 1) - 1) + RUNWAY * Math.max(q - 1, 0);
      placeBus(b, g, st, l, loopBuses + k, x, BAY_Z, Math.PI / 2, q < 0 ? 0 : 1);
    }

    // --- dock trucks: drive in from the east, park, reverse back out ---
    for (let k = 0; k < TRUCKS.length; k++) {
      const q = visitQ(h, TRUCKS[k].visit, 0);
      const x = TRUCKS[k].x + RUNWAY * (1 - Math.min(q, 1) + Math.max(q - 1, 0));
      const s = q < 0 ? 0 : 1;
      // Facing west (-x). Cab at the front, trailer behind it.
      put(c, k, x, TRUCK_Z, -Math.PI / 2, s, 0, 0.6, 1.45);
      put(tr, k, x, TRUCK_Z, -Math.PI / 2, s, 0, 0.75, -0.3);
    }

    for (const m of [b, g, st, l, c, tr]) m.instanceMatrix.needsUpdate = true;
    // Headlights come on with the window glow (dark hours).
    if (lightMat.current) lightMat.current.emissiveIntensity = skyState.windowGlow * 3;
  });

  return (
    // frustumCulled={false}: instance matrices change every frame, but an InstancedMesh's
    // bounding sphere is computed once (from the initial identity matrices), so vehicles
    // far from the origin would otherwise be culled.
    <group>
      <instancedMesh ref={body} args={[undefined, undefined, busCount]} frustumCulled={false} castShadow>
        <boxGeometry args={[1.05, 0.75, 2.6]} />
        <meshStandardMaterial color="#e8e0d0" roughness={0.5} metalness={0.1} />
      </instancedMesh>
      <instancedMesh ref={glass} args={[undefined, undefined, busCount]} frustumCulled={false}>
        <boxGeometry args={[1.09, 0.26, 2.1]} />
        <meshStandardMaterial color="#141a22" roughness={0.15} metalness={0.6} />
      </instancedMesh>
      <instancedMesh ref={stripe} args={[undefined, undefined, busCount]} frustumCulled={false}>
        <boxGeometry args={[1.07, 0.12, 2.62]} />
        <meshStandardMaterial color="#7a1f26" roughness={0.6} />
      </instancedMesh>
      <instancedMesh ref={lights} args={[undefined, undefined, busCount * 2]} frustumCulled={false}>
        <planeGeometry args={[0.22, 0.12]} />
        <meshStandardMaterial ref={lightMat} color="#fff2c8" emissive="#fff2c8" emissiveIntensity={0} />
      </instancedMesh>

      <instancedMesh ref={cab} args={[undefined, undefined, TRUCKS.length]} frustumCulled={false} castShadow>
        <boxGeometry args={[0.95, 0.95, 0.9]} />
        <meshStandardMaterial color="#c4343a" roughness={0.5} metalness={0.2} />
      </instancedMesh>
      <instancedMesh ref={trailer} args={[undefined, undefined, TRUCKS.length]} frustumCulled={false} castShadow>
        <boxGeometry args={[1.1, 1.3, 2.4]} />
        <meshStandardMaterial color="#cfc8bc" roughness={0.6} metalness={0.1} />
      </instancedMesh>
    </group>
  );
}

/** Places one bus (body, window band, stripe, and two headlights) at the given pose. */
function placeBus(
  b: THREE.InstancedMesh,
  g: THREE.InstancedMesh,
  st: THREE.InstancedMesh,
  l: THREE.InstancedMesh,
  i: number,
  x: number,
  z: number,
  rotY: number,
  s: number,
) {
  put(b, i, x, z, rotY, s, 0, 0.55, 0);
  put(g, i, x, z, rotY, s, 0, 0.68, -0.1);
  put(st, i, x, z, rotY, s, 0, 0.3, 0);
  // Headlight quads sit just proud of the front face (z = +1.31 local), facing forward.
  put(l, i * 2, x, z, rotY, s, -0.33, 0.4, 1.31);
  put(l, i * 2 + 1, x, z, rotY, s, 0.33, 0.4, 1.31);
}
