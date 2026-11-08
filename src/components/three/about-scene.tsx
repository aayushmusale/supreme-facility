"use client";

import { createContext, Suspense, useContext, useEffect, useLayoutEffect, useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox, useTexture } from "@react-three/drei";
import { aboutTimeline, BUS_START_X, busX, sampleAboutCamera, smooth01 } from "@/lib/about/path";
import { mulberry32 } from "@/lib/day/layout";

/**
 * "The Supreme operational universe": a miniature corporate campus on a floating plate.
 * Everything is procedural (primitives + instancing), so there are no model downloads; the only
 * image assets are the company's own logo files, used as decals for signage and the bus livery.
 *
 * One canvas, one directional light with shadows, instanced trees/people/cars. Motion is a pure
 * function of the smoothed scroll progress, so scrubbing back is the exact reverse.
 *
 * Scale: 1 unit is roughly 2.3 m (a 7-floor tower is 10.5 units, a bus is 4.6 long).
 */

type Quality = { shadows: boolean; lite: boolean };
const QualityContext = createContext<Quality>({ shadows: true, lite: false });
const useQuality = () => useContext(QualityContext);

/** Smoothed progress shared by the rig and everything that moves. Written once per frame by CameraRig. */
const live = { s: 0 };

const MAROON = "#701325"; // the brand maroon, a step deeper so it does not blow out to red under sunlight

/* ------------------------------------------------------------------ materials */

function makeMaterials() {
  const std = (color: string, roughness = 0.85, metalness = 0.02) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });
  return {
    white: std("#f5f3ef", 0.78),
    slab: std("#fcfbf9", 0.7),
    concrete: std("#e3dfd8", 0.92),
    metal: std("#c7cacf", 0.35, 0.85),
    maroon: std(MAROON, 0.5, 0.1),
    lawn: std("#a8bd95", 1),
    paving: std("#e8e4dd", 0.95),
    sidewalk: std("#d8d3cb", 0.95),
    road: std("#62605e", 0.95),
    line: std("#f3f0ea", 0.9),
    plate: std("#f3f1ed", 0.9),
    plateBase: std("#cfcac3", 0.9),
    wood: std("#c9a47c", 0.7),
    trunk: std("#7b5d44", 1),
    black: std("#26272b", 0.6),
    yellow: std("#e8c24a", 0.55),
    glass: new THREE.MeshPhysicalMaterial({ color: "#9db4c4", roughness: 0.05, metalness: 0.5, clearcoat: 1, envMapIntensity: 1.7 }),
    glassDark: new THREE.MeshPhysicalMaterial({ color: "#3d4a55", roughness: 0.08, metalness: 0.6, clearcoat: 1, envMapIntensity: 1.4 }),
    lamp: new THREE.MeshStandardMaterial({ color: "#fff4d0", emissive: "#fff4d0", emissiveIntensity: 1.4 }),
    vegetation: std("#ffffff", 0.95),
    skin: std("#ffffff", 0.75),
    cloth: std("#ffffff", 0.85),
  };
}
type Mats = ReturnType<typeof makeMaterials>;
const MatsContext = createContext<Mats | null>(null);
function useMats() {
  const m = useContext(MatsContext);
  if (!m) throw new Error("MatsContext missing");
  return m;
}

/** The company's own wide logo, used as signage and bus livery. Colour space is set as it loads. */
function useLogo() {
  return useTexture("/sfm-sticky-logo-1.png", (t) => {
    const tex = (Array.isArray(t) ? t[0] : t) as THREE.Texture;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
  });
}

/* ------------------------------------------------------------------ small building blocks */

type V3 = readonly [number, number, number];

function Box({ p, s, m, ry = 0, cast = true }: { p: V3; s: V3; m: THREE.Material; ry?: number; cast?: boolean }) {
  const { shadows } = useQuality();
  return (
    <mesh position={p as unknown as THREE.Vector3Tuple} scale={s as unknown as THREE.Vector3Tuple} rotation-y={ry} material={m} castShadow={cast && shadows} receiveShadow={shadows}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}

type Item = { p: V3; s: V3; ry?: number };

/** Many boxes of one material as a single draw call. `items` must be referentially stable. */
function Boxes({ items, m, cast = true }: { items: readonly Item[]; m: THREE.Material; cast?: boolean }) {
  const { shadows } = useQuality();
  const ref = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const o = new THREE.Object3D();
    items.forEach((it, i) => {
      o.position.set(...it.p);
      o.scale.set(...it.s);
      o.rotation.set(0, it.ry ?? 0, 0);
      o.updateMatrix();
      mesh.setMatrixAt(i, o.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [items]);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, items.length]} material={m} castShadow={cast && shadows} receiveShadow={shadows}>
      <boxGeometry args={[1, 1, 1]} />
    </instancedMesh>
  );
}

function Cyl({ p, r, h, m, rot, seg = 20, cast = true }: { p: V3; r: number; h: number; m: THREE.Material; rot?: V3; seg?: number; cast?: boolean }) {
  const { shadows } = useQuality();
  return (
    <mesh position={p as unknown as THREE.Vector3Tuple} rotation={rot as unknown as THREE.Euler} material={m} castShadow={cast && shadows} receiveShadow={shadows}>
      <cylinderGeometry args={[r, r, h, seg]} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ ground */

const PLATE = { x: 25, z: 23, cz: 2 }; // plate is 25 x 23, centred at z = 2 (z -9.5 .. 13.5)

const LANE_DASHES: Item[] = Array.from({ length: 11 }, (_, i) => ({ p: [-11 + i * 2.2, 0.095, 10.5], s: [1.0, 0.02, 0.12] }));
const PARKING_LINES: Item[] = Array.from({ length: 5 }, (_, i) => ({ p: [7.6 + i * 1.12, 0.095, -5.6], s: [0.06, 0.02, 1.9] }));

function Ground() {
  const M = useMats();
  const { shadows } = useQuality();
  return (
    <group>
      <RoundedBox args={[PLATE.x, 0.6, PLATE.z]} radius={0.28} smoothness={3} position={[0, -0.3, PLATE.cz]} material={M.plate} castShadow={shadows} receiveShadow={shadows} />
      <RoundedBox args={[PLATE.x - 1.2, 0.4, PLATE.z - 1.2]} radius={0.2} smoothness={3} position={[0, -0.78, PLATE.cz]} material={M.plateBase} castShadow={shadows} />
      {/* lawn, then paving and roads on top of it */}
      <Box p={[0, 0.03, PLATE.cz]} s={[PLATE.x - 0.6, 0.06, PLATE.z - 0.6]} m={M.lawn} cast={false} />
      <Box p={[0, 0.07, 5.45]} s={[14, 0.04, 3.5]} m={M.paving} cast={false} />
      <Box p={[0, 0.07, 7.7]} s={[PLATE.x - 0.6, 0.05, 1]} m={M.sidewalk} cast={false} />
      <Box p={[0, 0.075, 10.5]} s={[PLATE.x - 0.6, 0.05, 4.6]} m={M.road} cast={false} />
      <Boxes items={LANE_DASHES} m={M.line} cast={false} />
      {/* paths to the cafeteria and the service yard */}
      <Box p={[-8.6, 0.07, 4.9]} s={[5, 0.04, 2.2]} m={M.paving} cast={false} />
      <Box p={[9.2, 0.07, 4.9]} s={[5.4, 0.04, 2.2]} m={M.paving} cast={false} />
      {/* parking */}
      <Box p={[9.6, 0.07, -6.1]} s={[6, 0.04, 4.6]} m={M.road} cast={false} />
      <Boxes items={PARKING_LINES} m={M.line} cast={false} />
    </group>
  );
}

/* ------------------------------------------------------------------ the tower and podium */

const FLOORS = 7;
const FLOOR_H = 1.5;
const TOWER_Z = -4;
const SLABS: Item[] = Array.from({ length: FLOORS + 1 }, (_, i) => ({ p: [0, i * FLOOR_H + 0.11, TOWER_Z], s: [9.2, 0.22, 6.2] }));
const MULLIONS: Item[] = [
  ...Array.from({ length: 9 }, (_, i) => ({ p: [-4.2 + i * 1.05, FLOORS * FLOOR_H * 0.5 + 0.1, TOWER_Z + 3.05] as V3, s: [0.09, FLOORS * FLOOR_H, 0.12] as V3 })),
  ...Array.from({ length: 9 }, (_, i) => ({ p: [-4.2 + i * 1.05, FLOORS * FLOOR_H * 0.5 + 0.1, TOWER_Z - 3.05] as V3, s: [0.09, FLOORS * FLOOR_H, 0.12] as V3 })),
  ...Array.from({ length: 6 }, (_, i) => ({ p: [4.45, FLOORS * FLOOR_H * 0.5 + 0.1, TOWER_Z - 2.5 + i] as V3, s: [0.12, FLOORS * FLOOR_H, 0.09] as V3 })),
  ...Array.from({ length: 6 }, (_, i) => ({ p: [-4.45, FLOORS * FLOOR_H * 0.5 + 0.1, TOWER_Z - 2.5 + i] as V3, s: [0.12, FLOORS * FLOOR_H, 0.09] as V3 })),
];
const COLUMNS: Item[] = Array.from({ length: 8 }, (_, i) => ({ p: [-5.5 + i * 1.57, 1.45, 3.75], s: [0.22, 2.9, 0.22] }));

function Tower() {
  const M = useMats();
  const logo = useLogo();
  const topY = FLOORS * FLOOR_H;
  return (
    <group>
      {/* glazed core, white floor slabs, mullions */}
      <Box p={[0, topY / 2 + 0.1, TOWER_Z]} s={[8.6, topY, 5.6]} m={M.glass} />
      <Boxes items={SLABS} m={M.slab} />
      <Boxes items={MULLIONS} m={M.metal} />
      {/* maroon fin, parapet and plant room */}
      <Box p={[-4.55, topY / 2 + 0.3, TOWER_Z + 3.1]} s={[0.5, topY + 0.4, 0.5]} m={M.maroon} />
      <Box p={[0, topY + 0.38, TOWER_Z]} s={[9.2, 0.55, 6.2]} m={M.white} />
      <Box p={[1.3, topY + 1.05, TOWER_Z - 0.9]} s={[4.2, 0.9, 2.6]} m={M.concrete} />
      <Box p={[-2.2, topY + 0.85, TOWER_Z + 0.4]} s={[1.6, 0.5, 1.2]} m={M.metal} />
      {/* signage: the company's own logo on a white panel */}
      <Box p={[0.4, topY - 1.25, TOWER_Z + 3.1]} s={[5.2, 1.05, 0.1]} m={M.slab} />
      <mesh position={[0.4, topY - 1.25, TOWER_Z + 3.17]}>
        <planeGeometry args={[4.9, 1.0]} />
        <meshBasicMaterial map={logo} transparent toneMapped={false} />
      </mesh>

      {/* podium / lobby */}
      <Box p={[0, 1.45, 1.5]} s={[12, 2.6, 4.4]} m={M.glass} />
      <Box p={[0, 3.1, 1.5]} s={[13, 0.32, 5.2]} m={M.slab} />
      <Boxes items={COLUMNS} m={M.white} />
      <Box p={[0, 1.15, 3.78]} s={[2.1, 2.2, 0.08]} m={M.glassDark} cast={false} />
      <Box p={[0, 2.72, 4.6]} s={[3.8, 0.14, 2.4]} m={M.maroon} />
      <Box p={[-1.7, 1.35, 5.55]} s={[0.14, 2.7, 0.14]} m={M.white} />
      <Box p={[1.7, 1.35, 5.55]} s={[0.14, 2.7, 0.14]} m={M.white} />
      {/* planters along the podium front */}
      <Box p={[-4.2, 0.28, 4.4]} s={[2.6, 0.5, 0.7]} m={M.concrete} />
      <Box p={[-4.2, 0.55, 4.4]} s={[2.4, 0.1, 0.55]} m={M.lawn} cast={false} />
      <Box p={[4.2, 0.28, 4.4]} s={[2.6, 0.5, 0.7]} m={M.concrete} />
      <Box p={[4.2, 0.55, 4.4]} s={[2.4, 0.1, 0.55]} m={M.lawn} cast={false} />
    </group>
  );
}

/* ------------------------------------------------------------------ cafeteria */

const TABLES: V3[] = [
  [-10.7, 0, 5.3],
  [-9.0, 0, 5.9],
  [-7.4, 0, 5.2],
];
const CHAIRS: Item[] = TABLES.flatMap(([x, , z]) => [
  { p: [x - 0.62, 0.33, z] as V3, s: [0.3, 0.05, 0.3] as V3 },
  { p: [x + 0.62, 0.33, z] as V3, s: [0.3, 0.05, 0.3] as V3 },
]);

function Cafeteria() {
  const M = useMats();
  return (
    <group position={[-9.2, 0, 1]}>
      <Box p={[0, 1.65, 0]} s={[6.4, 3.3, 4.6]} m={M.white} />
      <Box p={[0, 3.45, 0]} s={[7.0, 0.26, 5.2]} m={M.slab} />
      <Box p={[0, 1.3, 2.32]} s={[5.6, 2.1, 0.08]} m={M.glass} cast={false} />
      {/* food counter and pendant lamps seen through the glass */}
      <Box p={[0.4, 0.5, 1.0]} s={[3.4, 0.8, 0.7]} m={M.wood} />
      <Box p={[0.4, 0.95, 1.0]} s={[3.5, 0.1, 0.8]} m={M.white} />
      <Box p={[-2.2, 1.9, 1.7]} s={[0.1, 0.1, 0.1]} m={M.lamp} cast={false} />
      <Box p={[0.4, 1.9, 1.7]} s={[0.1, 0.1, 0.1]} m={M.lamp} cast={false} />
      <Box p={[2.2, 1.9, 1.7]} s={[0.1, 0.1, 0.1]} m={M.lamp} cast={false} />
      {/* maroon awning and band */}
      <Box p={[0, 2.95, 3.0]} s={[6.0, 0.1, 1.5]} m={M.maroon} />
      <Box p={[0, 3.3, 2.34]} s={[6.4, 0.5, 0.06]} m={M.maroon} cast={false} />
    </group>
  );
}

function Terrace() {
  const M = useMats();
  return (
    <group>
      {TABLES.map(([x, , z], i) => (
        <group key={i}>
          <Cyl p={[x, 0.3, z]} r={0.05} h={0.6} m={M.metal} seg={8} />
          <Cyl p={[x, 0.6, z]} r={0.46} h={0.05} m={M.white} />
          <Cyl p={[x, 1.2, z]} r={0.04} h={1.3} m={M.metal} seg={8} />
          <mesh position={[x, 1.82, z]} material={i === 1 ? M.white : M.maroon} castShadow>
            <coneGeometry args={[1.05, 0.32, 20]} />
          </mesh>
        </group>
      ))}
      <Boxes items={CHAIRS} m={M.metal} />
    </group>
  );
}

/* ------------------------------------------------------------------ housekeeping and maintenance */

function ServiceBay() {
  const M = useMats();
  return (
    <group position={[9.2, 0, 0.6]}>
      <Box p={[0, 1.5, 0]} s={[5.6, 3, 4]} m={M.concrete} />
      <Box p={[0, 3.12, 0]} s={[6.0, 0.24, 4.4]} m={M.slab} />
      <Box p={[0, 3.45, 0]} s={[5.6, 0.45, 4]} m={M.maroon} cast={false} />
      {/* roller door and a side window */}
      <Box p={[-0.6, 1.1, 2.03]} s={[2.8, 2.2, 0.08]} m={M.metal} cast={false} />
      {Array.from({ length: 6 }, (_, i) => (
        <Box key={i} p={[-0.6, 0.3 + i * 0.36, 2.09]} s={[2.8, 0.03, 0.03]} m={M.black} cast={false} />
      ))}
      <Box p={[1.9, 1.5, 2.03]} s={[1.1, 1.0, 0.08]} m={M.glass} cast={false} />
    </group>
  );
}

function Van() {
  const M = useMats();
  return (
    <group position={[10.6, 0, 5.9]}>
      <Box p={[0, 0.62, 0]} s={[1.9, 0.9, 0.85]} m={M.white} />
      <Box p={[0.78, 0.5, 0]} s={[0.55, 0.62, 0.84]} m={M.white} />
      <Box p={[0.9, 0.85, 0]} s={[0.4, 0.3, 0.86]} m={M.glassDark} cast={false} />
      <Box p={[-0.1, 0.42, 0]} s={[1.92, 0.12, 0.87]} m={M.maroon} cast={false} />
      {[-0.55, 0.65].flatMap((x) => [-0.4, 0.4].map((z) => <Cyl key={`${x}${z}`} p={[x, 0.17, z]} r={0.17} h={0.14} m={M.black} rot={[Math.PI / 2, 0, 0]} seg={12} />))}
    </group>
  );
}

/** Housekeeping trolley; its position is driven from the walker loop (see Trolley in useFrame). */
const trolley = { group: null as THREE.Group | null };
function HousekeepingTrolley() {
  const M = useMats();
  const ref = useRef<THREE.Group>(null);
  useEffect(() => {
    trolley.group = ref.current;
    return () => {
      trolley.group = null;
    };
  }, []);
  return (
    <group ref={ref} position={[9.6, 0, 4.5]}>
      <Box p={[0, 0.16, 0]} s={[0.78, 0.05, 0.42]} m={M.metal} />
      <Box p={[0, 0.5, 0]} s={[0.78, 0.05, 0.42]} m={M.metal} />
      {[-0.36, 0.36].flatMap((x) => [-0.18, 0.18].map((z) => <Box key={`${x}${z}`} p={[x, 0.33, z]} s={[0.03, 0.36, 0.03]} m={M.metal} cast={false} />))}
      <Cyl p={[-0.2, 0.66, 0]} r={0.13} h={0.26} m={M.yellow} seg={14} />
      <Box p={[0.18, 0.68, 0]} s={[0.3, 0.3, 0.3]} m={M.maroon} />
      <Box p={[0.4, 0.82, 0]} s={[0.04, 0.5, 0.44]} m={M.metal} cast={false} />
      {[-0.3, 0.3].flatMap((x) => [-0.2, 0.2].map((z) => <Cyl key={`${x}${z}`} p={[x, 0.07, z]} r={0.07} h={0.05} m={M.black} rot={[Math.PI / 2, 0, 0]} seg={10} cast={false} />))}
    </group>
  );
}

/* ------------------------------------------------------------------ bus, bus stop, cars */

function Bus() {
  const M = useMats();
  const { shadows } = useQuality();
  const group = useRef<THREE.Group>(null);
  const logo = useLogo();

  useFrame(() => {
    if (!group.current) return;
    group.current.position.x = busX(live.s);
  });

  return (
    <group ref={group} position={[BUS_START_X, 0, 9.5]}>
      <RoundedBox args={[4.6, 1.05, 1.15]} radius={0.12} smoothness={3} position={[0, 1.0, 0]} material={M.white} castShadow={shadows} receiveShadow={shadows} />
      <Box p={[0, 0.5, 0]} s={[4.62, 0.36, 1.17]} m={M.maroon} />
      <Box p={[0, 1.24, 0]} s={[4.3, 0.48, 1.18]} m={M.glassDark} cast={false} />
      <Box p={[0, 0.84, 0]} s={[4.62, 0.07, 1.19]} m={M.maroon} cast={false} />
      <Box p={[2.31, 1.15, 0]} s={[0.06, 0.62, 1.0]} m={M.glassDark} cast={false} />
      <Box p={[0, 1.58, 0]} s={[1.3, 0.14, 0.7]} m={M.metal} />
      {/* mullions in the window band */}
      {Array.from({ length: 9 }, (_, i) => (
        <Box key={i} p={[-1.8 + i * 0.45, 1.24, 0]} s={[0.05, 0.5, 1.2]} m={M.white} cast={false} />
      ))}
      {/* passenger door on the kerb side, headlights, wheels */}
      <Box p={[1.35, 0.82, -0.59]} s={[0.7, 1.1, 0.04]} m={M.glassDark} cast={false} />
      <Box p={[2.32, 0.7, -0.38]} s={[0.05, 0.12, 0.2]} m={M.lamp} cast={false} />
      <Box p={[2.32, 0.7, 0.38]} s={[0.05, 0.12, 0.2]} m={M.lamp} cast={false} />
      {[-1.5, 1.5].flatMap((x) => [-0.52, 0.52].map((z) => <Cyl key={`${x}${z}`} p={[x, 0.3, z]} r={0.3} h={0.24} m={M.black} rot={[Math.PI / 2, 0, 0]} seg={18} />))}
      {/* the company logo on both flanks of the skirt */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[-0.55, 0.5, 0.6 * side]} rotation-y={side === 1 ? 0 : Math.PI}>
          <planeGeometry args={[2.0, 0.41]} />
          <meshBasicMaterial map={logo} transparent toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function BusStop() {
  const M = useMats();
  return (
    <group position={[3.4, 0, 7.75]}>
      <Box p={[0, 1.55, 0]} s={[3.0, 0.09, 1.1]} m={M.maroon} />
      <Box p={[-1.4, 0.78, -0.45]} s={[0.07, 1.5, 0.07]} m={M.metal} cast={false} />
      <Box p={[1.4, 0.78, -0.45]} s={[0.07, 1.5, 0.07]} m={M.metal} cast={false} />
      <Box p={[0, 0.85, 0.5]} s={[2.9, 1.3, 0.04]} m={M.glass} cast={false} />
      <Box p={[0, 0.34, 0.3]} s={[1.8, 0.07, 0.3]} m={M.wood} />
    </group>
  );
}

const CAR_PARTS = { body: [1.3, 0.34, 0.62] as V3, cabin: [0.72, 0.3, 0.56] as V3 };
type Car = { x: number; z: number; ry: number; color: string; lane?: number; speed?: number; phase?: number };
const CARS: Car[] = [
  { x: 7.9, z: -6.1, ry: Math.PI / 2, color: "#f1efeb" },
  { x: 9.02, z: -6.2, ry: Math.PI / 2, color: "#454850" },
  { x: 11.26, z: -6.0, ry: Math.PI / 2, color: "#cfd2d6" },
  { x: 0, z: 11.55, ry: Math.PI, color: "#f1efeb", lane: 1, speed: 0.55, phase: 0.1 },
  { x: 0, z: 11.55, ry: Math.PI, color: "#6e1a27", lane: 1, speed: 0.55, phase: 0.62 },
];

function Cars() {
  const M = useMats();
  const { shadows } = useQuality();
  const body = useRef<THREE.InstancedMesh>(null);
  const cabin = useRef<THREE.InstancedMesh>(null);
  const colors = useMemo(() => CARS.map((c) => new THREE.Color(c.color)), []);
  const o = useMemo(() => new THREE.Object3D(), []);
  const place = (mesh: THREE.InstancedMesh, i: number, x: number, z: number, ry: number, lx: number, ly: number, lz: number, s: V3) => {
    const c = Math.cos(ry);
    const sn = Math.sin(ry);
    o.position.set(x + lx * c + lz * sn, ly, z - lx * sn + lz * c);
    o.rotation.set(0, ry, 0);
    o.scale.set(...s);
    o.updateMatrix();
    mesh.setMatrixAt(i, o.matrix);
  };

  useLayoutEffect(() => {
    colors.forEach((c, i) => body.current?.setColorAt(i, c));
    if (body.current?.instanceColor) body.current.instanceColor.needsUpdate = true;
  }, [colors]);

  useFrame(() => {
    const b = body.current;
    const c = cabin.current;
    if (!b || !c) return;
    CARS.forEach((car, i) => {
      let x = car.x;
      if (car.lane) x = THREE.MathUtils.lerp(11, -11, (live.s * (car.speed ?? 0.5) + (car.phase ?? 0)) % 1);
      place(b, i, x, car.z, car.ry, 0, 0.3, 0, CAR_PARTS.body);
      place(c, i, x, car.z, car.ry, -0.05, 0.6, 0, CAR_PARTS.cabin);
    });
    b.instanceMatrix.needsUpdate = true;
    c.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={body} args={[undefined, undefined, CARS.length]} frustumCulled={false} castShadow={shadows}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.35} metalness={0.4} />
      </instancedMesh>
      <instancedMesh ref={cabin} args={[undefined, undefined, CARS.length]} frustumCulled={false} material={M.glassDark}>
        <boxGeometry args={[1, 1, 1]} />
      </instancedMesh>
    </group>
  );
}

/* ------------------------------------------------------------------ trees */

const TREE_RECTS: readonly (readonly [number, number, number, number])[] = [
  [0, -4, 10, 7], [0, 1.5, 13, 5.5], [-9.2, 1, 7.4, 5.6], [9.2, 0.6, 6.6, 5], [0, 5.5, 15, 4.6], [-8.6, 5, 6, 3.2], [9.6, 4.9, 6.4, 3.2],
  [9.6, -6.1, 7, 5.5], [0, 10.5, 26, 6], [3.4, 7.7, 4, 2],
];

function buildTrees(count: number) {
  const rand = mulberry32(11);
  const out: { x: number; z: number; s: number; tone: number }[] = [];
  let guard = 0;
  while (out.length < count && guard++ < 800) {
    const x = (rand() - 0.5) * 23.6;
    const z = -9 + rand() * 17.2; // stays on the lawn side of the sidewalk
    const blocked = TREE_RECTS.some(([cx, cz, w, d]) => Math.abs(x - cx) < w / 2 + 0.8 && Math.abs(z - cz) < d / 2 + 0.8);
    if (blocked) continue;
    out.push({ x, z, s: 0.8 + rand() * 0.55, tone: rand() });
  }
  return out;
}

function Trees({ count }: { count: number }) {
  const { shadows } = useQuality();
  const M = useMats();
  const trees = useMemo(() => buildTrees(count), [count]);
  const trunk = useRef<THREE.InstancedMesh>(null);
  const crownA = useRef<THREE.InstancedMesh>(null);
  const crownB = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const o = new THREE.Object3D();
    const col = new THREE.Color();
    trees.forEach((t, i) => {
      o.rotation.set(0, i, 0);
      o.scale.setScalar(t.s);
      o.position.set(t.x, 0.4 * t.s, t.z);
      o.updateMatrix();
      trunk.current?.setMatrixAt(i, o.matrix);
      o.position.set(t.x, 1.3 * t.s, t.z);
      o.updateMatrix();
      crownA.current?.setMatrixAt(i, o.matrix);
      o.position.set(t.x, 1.95 * t.s, t.z);
      o.scale.setScalar(t.s * 0.7);
      o.updateMatrix();
      crownB.current?.setMatrixAt(i, o.matrix);
      col.set("#7a9b66").lerp(new THREE.Color("#5f8450"), t.tone);
      crownA.current?.setColorAt(i, col);
      crownB.current?.setColorAt(i, col);
    });
    for (const m of [trunk.current, crownA.current, crownB.current]) {
      if (!m) continue;
      m.instanceMatrix.needsUpdate = true;
      if (m.instanceColor) m.instanceColor.needsUpdate = true;
      m.computeBoundingSphere();
    }
  }, [trees]);

  return (
    <group>
      <instancedMesh ref={trunk} args={[undefined, undefined, trees.length]} material={M.trunk} castShadow={shadows}>
        <cylinderGeometry args={[0.07, 0.1, 0.8, 7]} />
      </instancedMesh>
      <instancedMesh ref={crownA} args={[undefined, undefined, trees.length]} material={M.vegetation} castShadow={shadows} receiveShadow={shadows}>
        <icosahedronGeometry args={[0.72, 1]} />
      </instancedMesh>
      <instancedMesh ref={crownB} args={[undefined, undefined, trees.length]} material={M.vegetation} castShadow={shadows}>
        <icosahedronGeometry args={[0.72, 1]} />
      </instancedMesh>
    </group>
  );
}

/* ------------------------------------------------------------------ people */

type Person = {
  x: number;
  z: number;
  /** Torso colour. */
  cloth: string;
  skin: number;
  /** Walk along a line between (x, z) and (x2, z2). `window` ties the walk to scroll progress; otherwise it loops gently. */
  to?: readonly [number, number];
  window?: readonly [number, number];
  speed?: number;
  phase?: number;
  seated?: boolean;
  ry?: number;
};

const SKINS = ["#e2b592", "#c98f6c", "#8e5b3d", "#f0cbac"];
const NAVY = "#2e3a52";
const CHARCOAL = "#34353b";
const GREY = "#8b8d94";
const WHITE = "#f1efeb";
const ORANGE = "#e2762e";

const PEOPLE: Person[] = [
  // queue at the bus stop
  { x: 2.7, z: 7.55, cloth: NAVY, skin: 0, ry: Math.PI },
  { x: 3.15, z: 7.6, cloth: WHITE, skin: 2, ry: Math.PI },
  { x: 4.2, z: 7.5, cloth: CHARCOAL, skin: 1, ry: Math.PI },
  // employees alighting and walking to the lobby (visible once the bus has stopped)
  { x: 4.6, z: 8.15, cloth: NAVY, skin: 3, to: [0.6, 4.4], window: [0.5, 0.72] },
  { x: 4.9, z: 8.2, cloth: GREY, skin: 1, to: [-0.4, 4.3], window: [0.52, 0.74] },
  { x: 5.2, z: 8.1, cloth: WHITE, skin: 0, to: [1.8, 4.5], window: [0.54, 0.74] },
  { x: 5.4, z: 8.25, cloth: CHARCOAL, skin: 2, to: [-1.4, 4.2], window: [0.56, 0.76] },
  // plaza walkers
  { x: -3.5, z: 5.6, cloth: NAVY, skin: 2, to: [3.0, 5.6], speed: 0.9, phase: 0.1 },
  { x: 3.5, z: 6.3, cloth: GREY, skin: 3, to: [-3.0, 6.3], speed: 0.7, phase: 0.4 },
  { x: -1.2, z: 4.5, cloth: WHITE, skin: 1, to: [1.4, 4.9], speed: 0.6, phase: 0.8 },
  // lunch: lobby -> cafeteria
  { x: -2.4, z: 4.3, cloth: NAVY, skin: 0, to: [-8.9, 3.9], window: [0.58, 0.76] },
  { x: -2.0, z: 4.6, cloth: WHITE, skin: 3, to: [-8.4, 4.0], window: [0.6, 0.78] },
  // seated at the terrace
  { x: -10.0, z: 5.3, cloth: MAROON, skin: 1, seated: true, ry: Math.PI / 2 },
  { x: -9.45, z: 5.9, cloth: WHITE, skin: 2, seated: true, ry: -Math.PI / 2 },
  { x: -8.0, z: 5.2, cloth: NAVY, skin: 0, seated: true, ry: Math.PI / 2 },
  { x: -6.8, z: 5.2, cloth: CHARCOAL, skin: 3, seated: true, ry: -Math.PI / 2 },
  // cafeteria staff behind the counter
  { x: -9.6, z: 1.7, cloth: MAROON, skin: 2, ry: 0 },
  { x: -8.2, z: 1.75, cloth: MAROON, skin: 0, ry: 0 },
  // housekeeping and maintenance
  { x: 8.7, z: 4.55, cloth: MAROON, skin: 1, to: [11.0, 4.55], speed: 0.8, phase: 0 },
  { x: 11.9, z: 4.4, cloth: ORANGE, skin: 2, to: [12.2, 6.6], speed: 0.5, phase: 0.3 },
  { x: 9.2, z: 3.4, cloth: ORANGE, skin: 3, ry: Math.PI },
  { x: 7.4, z: 5.6, cloth: MAROON, skin: 0, to: [7.4, 4.0], speed: 0.6, phase: 0.5 },
];

const pingPong = (v: number) => 1 - Math.abs(2 * (v - Math.floor(v)) - 1);

function People({ lite }: { lite: boolean }) {
  const { shadows } = useQuality();
  const M = useMats();
  const people = useMemo(() => (lite ? PEOPLE.filter((_, i) => i % 3 !== 2) : PEOPLE), [lite]);
  const legs = useRef<THREE.InstancedMesh>(null);
  const torso = useRef<THREE.InstancedMesh>(null);
  const head = useRef<THREE.InstancedMesh>(null);
  const o = useMemo(() => new THREE.Object3D(), []);
  const SC = 0.92;

  useLayoutEffect(() => {
    const c = new THREE.Color();
    people.forEach((p, i) => {
      torso.current?.setColorAt(i, c.set(p.cloth));
      head.current?.setColorAt(i, c.set(SKINS[p.skin]));
      legs.current?.setColorAt(i, c.set(p.cloth === MAROON || p.cloth === ORANGE ? "#2b2c31" : "#3a3c44"));
    });
    for (const m of [torso.current, head.current, legs.current]) if (m?.instanceColor) m.instanceColor.needsUpdate = true;
  }, [people]);

  useFrame(() => {
    const L = legs.current;
    const T = torso.current;
    const H = head.current;
    if (!L || !T || !H) return;
    const s = live.s;
    people.forEach((p, i) => {
      let x = p.x;
      let z = p.z;
      let ry = p.ry ?? 0;
      let vis = 1;
      let bob = 0;
      if (p.to) {
        let t: number;
        let dir = 1;
        if (p.window) {
          const [a, b] = p.window;
          t = smooth01((s - a) / (b - a));
          vis = s < a - 0.01 || t > 0.985 ? 0 : 1;
        } else {
          const v = s * (p.speed ?? 1) * 3 + (p.phase ?? 0);
          t = pingPong(v);
          dir = v - Math.floor(v) < 0.5 ? 1 : -1;
        }
        x = p.x + (p.to[0] - p.x) * t;
        z = p.z + (p.to[1] - p.z) * t;
        const dx = (p.to[0] - p.x) * dir;
        const dz = (p.to[1] - p.z) * dir;
        ry = Math.atan2(dx, dz);
        bob = Math.abs(Math.sin(s * 160 + i)) * 0.018 * (t > 0.01 && t < 0.99 ? 1 : 0);
      }
      const sit = p.seated ? 0.2 : 0;
      const k = vis * SC;
      o.rotation.set(0, ry, 0);
      o.scale.set(k, k * (p.seated ? 0.45 : 1), k);
      o.position.set(x, 0.14 * k + bob, z);
      o.updateMatrix();
      L.setMatrixAt(i, o.matrix);
      o.scale.setScalar(k);
      o.position.set(x, (0.47 - sit) * k + bob, z);
      o.updateMatrix();
      T.setMatrixAt(i, o.matrix);
      o.position.set(x, (0.73 - sit) * k + bob, z);
      o.updateMatrix();
      H.setMatrixAt(i, o.matrix);
    });
    L.instanceMatrix.needsUpdate = true;
    T.instanceMatrix.needsUpdate = true;
    H.instanceMatrix.needsUpdate = true;

    // The housekeeper pushes the trolley along with them.
    if (trolley.group) {
      const v = s * 0.8 * 3;
      const t = pingPong(v);
      const dir = v - Math.floor(v) < 0.5 ? 1 : -1;
      trolley.group.position.x = 8.7 + (11.0 - 8.7) * t - 0.55 * dir;
      trolley.group.position.z = 4.55;
      trolley.group.rotation.y = dir === 1 ? 0 : Math.PI;
    }
  });

  return (
    <group>
      <instancedMesh ref={legs} args={[undefined, undefined, people.length]} frustumCulled={false} material={M.cloth} castShadow={shadows}>
        <cylinderGeometry args={[0.085, 0.075, 0.3, 10]} />
      </instancedMesh>
      <instancedMesh ref={torso} args={[undefined, undefined, people.length]} frustumCulled={false} material={M.cloth} castShadow={shadows}>
        <cylinderGeometry args={[0.1, 0.12, 0.38, 12]} />
      </instancedMesh>
      <instancedMesh ref={head} args={[undefined, undefined, people.length]} frustumCulled={false} material={M.skin} castShadow={shadows}>
        <sphereGeometry args={[0.085, 14, 12]} />
      </instancedMesh>
    </group>
  );
}

/* ------------------------------------------------------------------ light, camera, canvas */

function Lights() {
  const { shadows } = useQuality();
  return (
    <>
      <hemisphereLight args={["#ffffff", "#d8d0c4", 0.6]} />
      <directionalLight
        position={[15, 24, 17]}
        intensity={2.1}
        color="#fff6ea"
        castShadow={shadows}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-22}
        shadow-camera-right={22}
        shadow-camera-top={22}
        shadow-camera-bottom={-22}
        shadow-camera-near={1}
        shadow-camera-far={70}
        shadow-bias={-0.0004}
        shadow-normalBias={0.04}
      />
      <Environment resolution={128} environmentIntensity={0.9}>
        <Lightformer form="rect" intensity={3.2} position={[0, 6, 4]} scale={[14, 4, 1]} />
        <Lightformer form="rect" intensity={1.8} position={[-8, 2, 0]} rotation-y={Math.PI / 2} scale={[6, 6, 1]} />
        <Lightformer form="rect" color="#ffe2bd" intensity={2.2} position={[8, 1, 3]} rotation-y={-Math.PI / 2} scale={[6, 6, 1]} />
        <Lightformer form="rect" intensity={1.2} position={[0, -3, 5]} scale={[10, 2, 1]} />
      </Environment>
      {/* soft contact shadow of the whole diorama on the page behind it */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -1.3, PLATE.cz]} receiveShadow>
        <planeGeometry args={[90, 90]} />
        <shadowMaterial opacity={0.16} />
      </mesh>
    </>
  );
}

function CameraRig({ animate, shift }: { animate: boolean; shift: number }) {
  const position = useMemo(() => new THREE.Vector3(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    live.s = animate ? aboutTimeline.progress : 1;
    invalidate();
  }, [animate, invalidate]);

  // Slide the whole picture sideways (a lens shift, not a camera move) so the campus sits in the
  // part of a full-width canvas that the copy card does not cover.
  const size = useThree((s) => s.size);
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  useEffect(() => {
    if (shift) camera.setViewOffset(size.width, size.height, -size.width * shift, 0, size.width, size.height);
    else camera.clearViewOffset();
    invalidate();
    return () => camera.clearViewOffset();
  }, [shift, size.width, size.height, camera, invalidate]);

  useFrame(({ camera, size }, dt) => {
    if (animate) live.s += (aboutTimeline.progress - live.s) * (1 - Math.exp(-dt * 5));
    const fit = sampleAboutCamera(live.s, position, target);
    // Poses are framed for a roughly square stage. A narrower frame pulls the wide shots back.
    const aspect = size.width / size.height;
    const full = Math.max(1, 1.32 / Math.pow(aspect, 0.85));
    const back = 1 + (full - 1) * fit;
    position.sub(target).multiplyScalar(back).add(target);
    camera.position.copy(position);
    camera.lookAt(target);
  });
  return null;
}

function World({ lite }: { lite: boolean }): ReactNode {
  return (
    <>
      <Ground />
      <Tower />
      <Cafeteria />
      <Terrace />
      <ServiceBay />
      <Van />
      <HousekeepingTrolley />
      <BusStop />
      <Bus />
      <Cars />
      <Trees count={lite ? 14 : 28} />
      <People lite={lite} />
    </>
  );
}

export default function AboutScene({
  animate,
  lite,
  shift = 0,
  active,
  onReady,
  onContextLost,
}: {
  /** False = render the final composition once and hold it (reduced motion). */
  animate: boolean;
  lite: boolean;
  /** Fraction of the canvas width to slide the picture to the right (0 = centred). */
  shift?: number;
  active: boolean;
  onReady: () => void;
  onContextLost: () => void;
}) {
  const quality = useMemo<Quality>(() => ({ shadows: !lite, lite }), [lite]);
  const mats = useMemo(() => makeMaterials(), []);
  useEffect(() => () => Object.values(mats).forEach((m) => m.dispose()), [mats]);

  return (
    <Canvas
      // Reduced motion keeps the loop too (the pose is simply held at the final composition); "demand"
      // mode did not reliably repaint after the lens shift and texture loads.
      frameloop={active ? "always" : "never"}
      shadows={quality.shadows ? "percentage" : false}
      dpr={lite ? [1, 1.25] : [1, 1.75]}
      camera={{ fov: 34, near: 0.5, far: 220, position: [24, 19, 30] }}
      gl={{ alpha: true, antialias: !lite, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (event) => {
          event.preventDefault();
          onContextLost();
        });
        onReady();
      }}
      style={{ pointerEvents: "none" }}
      className="!absolute inset-0"
    >
      <QualityContext.Provider value={quality}>
        <MatsContext.Provider value={mats}>
          <Lights />
          <CameraRig animate={animate} shift={shift} />
          <Suspense fallback={null}>
            <World lite={lite} />
          </Suspense>
        </MatsContext.Provider>
      </QualityContext.Provider>
    </Canvas>
  );
}
