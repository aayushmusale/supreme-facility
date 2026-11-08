"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  buildTreeSpots,
  ROAD_CURVE,
  ROAD_WIDTH,
  TOWERS,
  type Tower,
} from "@/lib/day/layout";
import { pulse } from "@/lib/day/activity";
import { skyState } from "@/lib/day/sky";
import { useQualitySettings } from "../quality-context";
import { hourFromProgress, timeline } from "@/lib/day/timeline";
import { makeAsphalt, makePaving, makeRoad } from "@/lib/day/textures";

const GOLD = "#d9ad5f";

type BoxProps = {
  pos: readonly [number, number, number];
  size: readonly [number, number, number];
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
  roughness?: number;
  metalness?: number;
  map?: THREE.Texture;
};

/** Plain box; `pos` is the box centre. Geometry/material are owned (and disposed) by R3F. */
function Box({
  pos,
  size,
  color,
  emissive,
  emissiveIntensity = 1,
  roughness = 0.85,
  metalness = 0.05,
  map,
}: BoxProps) {
  return (
    <mesh position={[pos[0], pos[1], pos[2]]}>
      <boxGeometry args={[size[0], size[1], size[2]]} />
      <meshStandardMaterial
        color={color}
        map={map}
        roughness={roughness}
        metalness={metalness}
        emissive={emissive ?? "#000000"}
        emissiveIntensity={emissive ? emissiveIntensity : 0}
      />
    </mesh>
  );
}

/** Flat ribbon along the closed road curve. Built once; disposed on unmount. */
function Road() {
  const roadMap = useMemo(() => makeRoad(1), []);
  useEffect(() => () => roadMap.dispose(), [roadMap]);
  const geometry = useMemo(() => {
    const SEGMENTS = 160;
    const half = ROAD_WIDTH / 2;
    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    // Whole number of texture tiles around the loop (one tile ~ 2 road widths), so the dashes close up.
    const tiles = Math.round(ROAD_CURVE.getLength() / (ROAD_WIDTH * 2));
    const p = new THREE.Vector3();
    const t = new THREE.Vector3();
    // SEGMENTS + 1 vertex pairs: the last pair duplicates the first position but carries
    // u = tiles, so texture coordinates run cleanly across the seam instead of smearing back to 0.
    for (let i = 0; i <= SEGMENTS; i++) {
      const f = i / SEGMENTS;
      ROAD_CURVE.getPointAt(f % 1, p);
      ROAD_CURVE.getTangentAt(f % 1, t);
      // Normal in the ground plane; left = +n, right = -n.
      const nx = -t.z;
      const nz = t.x;
      positions.push(p.x + nx * half, p.y, p.z + nz * half, p.x - nx * half, p.y, p.z - nz * half);
      uvs.push(f * tiles, 0, f * tiles, 1);
      if (i < SEGMENTS) {
        const a = i * 2;
        const next = a + 2;
        // Winding gives an upward-facing normal (counter-clockwise seen from above).
        indices.push(a, next, a + 1, a + 1, next, next + 1);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    g.setIndex(indices);
    g.computeVertexNormals();
    return g;
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#6a5a5c" map={roadMap} roughness={0.95} />
    </mesh>
  );
}

const WIN_W = 0.55;
const WIN_H = 0.7;
const COL_STEP = 0.9;
const ROW_STEP = 1.1;
const FIRST_ROW = 1.4;

/** Matrices for every window on a tower's four faces. Every 7th is left dark ("unoccupied"). */
function windowMatrices(towers: readonly Tower[]): THREE.Matrix4[] {
  const out: THREE.Matrix4[] = [];
  const dummy = new THREE.Object3D();
  let n = 0;
  for (const t of towers) {
    const faces = [
      { rotY: 0, width: t.w, nx: 0, nz: 1, off: t.d / 2 },
      { rotY: Math.PI, width: t.w, nx: 0, nz: -1, off: t.d / 2 },
      { rotY: Math.PI / 2, width: t.d, nx: 1, nz: 0, off: t.w / 2 },
      { rotY: -Math.PI / 2, width: t.d, nx: -1, nz: 0, off: t.w / 2 },
    ];
    for (const f of faces) {
      const cols = Math.max(1, Math.floor((f.width - 0.6) / COL_STEP) + 1);
      for (let c = 0; c < cols; c++) {
        const u = (c - (cols - 1) / 2) * COL_STEP; // offset along the face
        for (let y = FIRST_ROW; y < t.h - 0.6; y += ROW_STEP) {
          if (n++ % 7 === 6) continue;
          // Sit 0.02 proud of the wall (avoids z-fighting) and slide along the face.
          // Columns are centred, so the slide direction's sign doesn't matter.
          dummy.position.set(
            t.cx + f.nx * (f.off + 0.02) + Math.abs(f.nz) * u,
            y,
            t.cz + f.nz * (f.off + 0.02) + Math.abs(f.nx) * u,
          );
          dummy.rotation.set(0, f.rotY, 0);
          dummy.updateMatrix();
          out.push(dummy.matrix.clone());
        }
      }
    }
  }
  return out;
}

/**
 * The campus, built entirely from primitives. Windows are static and sit on the
 * (also static) tower walls, so unlike the hero scene they can never float away
 * from their parent geometry. All windows share ONE emissive material whose
 * intensity follows `skyState.windowGlow`.
 */
export function Campus() {
  const windowMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1c1418", // dark glass by day
        emissive: new THREE.Color(GOLD),
        emissiveIntensity: 0,
      }),
    [],
  );
  useEffect(() => () => windowMat.dispose(), [windowMat]);

  // Animated through a ref (not the memoised value directly), as the React lint rules require.
  const windowMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  useLayoutEffect(() => {
    windowMatRef.current = windowMat;
  }, [windowMat]);
  useFrame(() => {
    if (windowMatRef.current) windowMatRef.current.emissiveIntensity = skyState.windowGlow * 1.8;
  });

  // --- procedural surface textures (disposed with the component) ---
  const textures = useMemo(
    () => ({
      ground: makeAsphalt(60, 60),
      plaza: makePaving(6, 4),
      bay: makePaving(5, 1),
      apron: makePaving(2.5, 2.2),
    }),
    [],
  );
  useEffect(
    () => () => Object.values(textures).forEach((t) => t.dispose()),
    [textures],
  );

  // Everything casts/receives shadows except the glowing window glass (cheap, and avoids
  // thin quads shadowing their own walls).
  const groupRef = useRef<THREE.Group>(null);
  useLayoutEffect(() => {
    groupRef.current?.traverse((o) => {
      if (!(o instanceof THREE.Mesh) || o.material === windowMat) return;
      o.castShadow = true;
      o.receiveShadow = true;
    });
  }, [windowMat]);

  // --- instanced windows ---
  const windows = useMemo(() => windowMatrices(TOWERS), []);
  const windowRef = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const mesh = windowRef.current;
    if (!mesh) return;
    windows.forEach((m, i) => mesh.setMatrixAt(i, m));
    mesh.instanceMatrix.needsUpdate = true;
  }, [windows]);

  // --- instanced trees (trunk + crown share matrices' x/z/scale) ---
  const { treeCount } = useQualitySettings();
  const trees = useMemo(() => buildTreeSpots(treeCount), [treeCount]);
  const trunkRef = useRef<THREE.InstancedMesh>(null);
  const crownRef = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const trunk = trunkRef.current;
    const crown = crownRef.current;
    if (!trunk || !crown) return;
    const d = new THREE.Object3D();
    trees.forEach((tr, i) => {
      d.position.set(tr.x, 0.4 * tr.s, tr.z);
      d.scale.setScalar(tr.s);
      d.updateMatrix();
      trunk.setMatrixAt(i, d.matrix);
      d.position.set(tr.x, 1.55 * tr.s, tr.z);
      d.updateMatrix();
      crown.setMatrixAt(i, d.matrix);
    });
    trunk.instanceMatrix.needsUpdate = true;
    crown.instanceMatrix.needsUpdate = true;
  }, [trees]);

  // Crowns sway about the trunk base. Ambient motion on elapsed time (allowed: tiny and cheap),
  // a little stronger while the landscaping crew is on site (stop 2).
  const swayDummy = useMemo(() => new THREE.Object3D(), []);
  useFrame((state) => {
    const crown = crownRef.current;
    if (!crown) return;
    const h = hourFromProgress(timeline.progress);
    const amp = 0.025 + 0.035 * pulse(h, 7.0, 7.6, 9.8, 10.6);
    const time = state.clock.elapsedTime;
    for (let i = 0; i < trees.length; i++) {
      const tr = trees[i];
      const rz = Math.sin(time * 1.3 + i * 1.7) * amp;
      const rx = Math.cos(time * 1.1 + i * 0.9) * amp;
      const y = 1.55 * tr.s;
      swayDummy.position.set(tr.x - y * Math.sin(rz), y, tr.z + y * Math.sin(rx));
      swayDummy.rotation.set(rx, 0, rz);
      swayDummy.scale.setScalar(tr.s);
      swayDummy.updateMatrix();
      crown.setMatrixAt(i, swayDummy.matrix);
    }
    crown.instanceMatrix.needsUpdate = true;
  });

  // --- instanced rooftop solar panels on T2 ---
  const solarRef = useRef<THREE.InstancedMesh>(null);
  const t2 = TOWERS[1];
  useLayoutEffect(() => {
    const mesh = solarRef.current;
    if (!mesh) return;
    const d = new THREE.Object3D();
    let i = 0;
    for (let ix = 0; ix < 3; ix++) {
      for (let iz = 0; iz < 2; iz++) {
        d.position.set(t2.cx - 1.2 + ix * 1.2, t2.h + 0.35, t2.cz - 0.9 + iz * 1.6);
        d.rotation.set(-0.4, 0, 0); // tilt toward the sun
        d.updateMatrix();
        mesh.setMatrixAt(i++, d.matrix);
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [t2]);

  const [t1, , t3] = TOWERS;

  return (
    <group ref={groupRef}>
      {/* ground (oversized so its edge is lost in the fog), plaza, road, bus bay */}
      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry args={[400, 400]} />
        <meshStandardMaterial color="#4a2a2c" map={textures.ground} roughness={0.95} />
      </mesh>
      <Box pos={[0, 0.025, 4]} size={[12, 0.05, 8]} color="#8a6a68" map={textures.plaza} roughness={0.7} />
      <Box pos={[0, 0.045, 12.1]} size={[10, 0.05, 1.8]} color="#9a7a76" map={textures.bay} roughness={0.7} />
      <Road />

      {/* towers (flat boxes; walls) */}
      {TOWERS.map((t) => (
        <Box key={t.id} pos={[t.cx, t.h / 2, t.cz]} size={[t.w, t.h, t.d]} color={t.color} roughness={0.4} metalness={0.35} />
      ))}
      {/* lobby glass at the base of T1 (shares the window material) */}
      <mesh position={[0, 1, t1.cz + t1.d / 2 + 0.03]} material={windowMat}>
        <planeGeometry args={[3.4, 1.6]} />
      </mesh>
      {/* T1 roof cap */}
      <Box pos={[0, t1.h + 0.15, t1.cz]} size={[t1.w + 0.2, 0.3, t1.d + 0.2]} color="#52201f" />

      {/* instanced windows (one draw call, one shared material) */}
      <instancedMesh ref={windowRef} args={[undefined, undefined, windows.length]} material={windowMat}>
        <planeGeometry args={[WIN_W, WIN_H]} />
      </instancedMesh>

      {/* bus bay shelter */}
      <mesh position={[0, 2.3, 10.9]}>
        <boxGeometry args={[8, 0.08, 1.2]} />
        <meshStandardMaterial color="#9fb3bd" transparent opacity={0.4} roughness={0.2} metalness={0.3} />
      </mesh>
      <Box pos={[-3.9, 1.15, 10.9]} size={[0.1, 2.3, 0.1]} color="#8a8a8a" />
      <Box pos={[3.9, 1.15, 10.9]} size={[0.1, 2.3, 0.1]} color="#8a8a8a" />

      {/* cafeteria block with serving window */}
      <Box pos={[-9.5, 1.25, -0.5]} size={[6, 2.5, 5]} color="#7a4a40" />
      <Box pos={[-9.5, 2.6, -0.5]} size={[6.2, 0.2, 5.2]} color="#52201f" />
      <mesh position={[-6.47, 1.35, -0.5]} rotation-y={Math.PI / 2} material={windowMat}>
        <planeGeometry args={[1.8, 0.9]} />
      </mesh>
      <Box pos={[-6.35, 0.85, -0.5]} size={[0.3, 0.1, 2]} color="#c9c0b8" />

      {/* plant room kit on T3's roof + pipe overlay + status indicators */}
      <Box pos={[t3.cx - 1, t3.h + 0.5, t3.cz]} size={[1.2, 1, 1.2]} color="#8a8a8a" />
      <mesh position={[t3.cx + 0.8, t3.h + 0.6, t3.cz - 0.6]}>
        <cylinderGeometry args={[0.55, 0.55, 1.2, 12]} />
        <meshStandardMaterial color="#9a9a9a" />
      </mesh>
      <mesh position={[t3.cx + 0.8, t3.h + 0.6, t3.cz + 0.8]}>
        <cylinderGeometry args={[0.55, 0.55, 1.2, 12]} />
        <meshStandardMaterial color="#9a9a9a" />
      </mesh>
      {/* fan housing + blades */}
      <mesh position={[t3.cx - 1, t3.h + 1.15, t3.cz]}>
        <cylinderGeometry args={[0.45, 0.45, 0.3, 10]} />
        <meshStandardMaterial color="#555555" />
      </mesh>

      {/* loading dock: building, bay doors, apron, crate stack */}
      <Box pos={[9.5, 1.5, -9.5]} size={[6, 3, 4]} color="#5a4a4a" />
      <Box pos={[8.2, 1.1, -7.47]} size={[1.8, 2.2, 0.06]} color="#1a1214" />
      <Box pos={[10.8, 1.1, -7.47]} size={[1.8, 2.2, 0.06]} color="#1a1214" />
      <Box pos={[10.5, 0.025, -5.2]} size={[5, 0.05, 4.4]} color="#8a6a68" map={textures.apron} roughness={0.7} />

      {/* production shed: body, front glass, conveyor strip, machine blocks */}
      <Box pos={[-11.5, 1.25, -9]} size={[9, 2.5, 3.6]} color="#4b3b3d" />
      <Box pos={[-11.5, 2.6, -9]} size={[9.2, 0.2, 3.8]} color="#2a0d10" />
      <mesh position={[-11.5, 1.4, -7.17]} material={windowMat}>
        <planeGeometry args={[6, 0.8]} />
      </mesh>
      <Box pos={[-11.5, 0.6, -6.4]} size={[7, 0.15, 0.6]} color="#2b2b2b" emissive={GOLD} emissiveIntensity={0.15} />
      <Box pos={[-14, 0.7, -6.4]} size={[1, 1.2, 1]} color="#6a6a72" />
      <Box pos={[-11.5, 0.7, -6.4]} size={[1, 1.2, 1]} color="#6a6a72" />
      <Box pos={[-9, 0.7, -6.4]} size={[1, 1.2, 1]} color="#6a6a72" />

      {/* gate + security booth */}
      <Box pos={[17.8, 0.9, 17.5]} size={[1.6, 1.8, 1.6]} color="#3a1216" />
      <Box pos={[17.8, 1.9, 17.5]} size={[2, 0.15, 2]} color="#2a0d10" />
      <Box pos={[17.8, 1.0, 19.3]} size={[0.1, 0.1, 3]} color="#c4343a" />

      {/* instanced rooftop solar (T2) */}
      <instancedMesh ref={solarRef} args={[undefined, undefined, 6]}>
        <boxGeometry args={[1.1, 0.06, 1.3]} />
        <meshStandardMaterial color="#1a2a3a" metalness={0.4} roughness={0.35} />
      </instancedMesh>

      {/* instanced trees */}
      <instancedMesh ref={trunkRef} args={[undefined, undefined, trees.length]}>
        <cylinderGeometry args={[0.1, 0.14, 0.8, 6]} />
        <meshStandardMaterial color="#3b2a22" />
      </instancedMesh>
      <instancedMesh ref={crownRef} args={[undefined, undefined, trees.length]} frustumCulled={false}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial color="#4b6b45" />
      </instancedMesh>
    </group>
  );
}
