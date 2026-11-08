"use client";

import { useLayoutEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { fract, lerp, pulse, ramp } from "@/lib/day/activity";
import { TOWERS } from "@/lib/day/layout";
import { hourFromProgress, timeline } from "@/lib/day/timeline";

/*
 * Stop-specific props. Each is a pure function of the hour and only "exists"
 * (non-zero scale / opacity) while its stop is relevant.
 */

const GOLD = "#d9ad5f";
const RED = new THREE.Color("#e03a3a");
const GREEN = new THREE.Color("#3ddc84");
const dummy = new THREE.Object3D();

const [t1, , t3] = TOWERS;

/** Stop 2: a bright band sweeps up the front glass of the main tower, like a facade wipe. */
function FacadeWipe() {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(() => {
    const h = hourFromProgress(timeline.progress);
    if (!mesh.current || !mat.current) return;
    mesh.current.position.y = lerp(0.6, t1.h - 0.4, ramp(h, 7.3, 9.6));
    mat.current.opacity = 0.32 * pulse(h, 7.2, 7.6, 9.4, 9.9);
  });
  return (
    <mesh ref={mesh} position={[t1.cx, 0.6, t1.cz + t1.d / 2 + 0.06]}>
      <planeGeometry args={[t1.w, 0.55]} />
      <meshBasicMaterial
        ref={mat}
        color="#ffffff"
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  );
}

/** Stop 3: spinning rooftop fan, glowing pipe overlay, fire panel turning green, pulsing BMS light. */
function PlantRoom() {
  const fan = useRef<THREE.Mesh>(null);
  const pipeMat = useRef<THREE.MeshStandardMaterial>(null);
  const fireMat = useRef<THREE.MeshStandardMaterial>(null);
  const bmsMat = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    const h = hourFromProgress(timeline.progress);
    const active = pulse(h, 9.2, 10.0, 12.6, 13.4);
    // Spin is tied to the hour (scrub-linked); it slows to a stop outside the window.
    if (fan.current) fan.current.rotation.y = h * 40 * (0.3 + 0.7 * active);
    if (pipeMat.current) pipeMat.current.emissiveIntensity = 0.3 + 1.7 * active;
    if (fireMat.current) {
      // Red until the check passes (~10:30), then green for the rest of the day.
      const k = ramp(h, 10.1, 10.9);
      fireMat.current.color.copy(RED).lerp(GREEN, k);
      fireMat.current.emissive.copy(fireMat.current.color);
    }
    // Tiny ambient pulse on elapsed time: allowed for status LEDs.
    if (bmsMat.current) bmsMat.current.emissiveIntensity = 1 + (0.4 + 0.6 * active) * Math.sin(state.clock.elapsedTime * 4);
  });

  const front = t3.cz + t3.d / 2;
  return (
    <group>
      <mesh ref={fan} position={[t3.cx - 1, t3.h + 1.34, t3.cz]}>
        <boxGeometry args={[0.8, 0.05, 0.12]} />
        <meshStandardMaterial color="#d0d0d0" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[t3.cx + 1.6, t3.h / 2, front + 0.06]}>
        <boxGeometry args={[0.1, t3.h, 0.08]} />
        <meshStandardMaterial ref={pipeMat} color={GOLD} emissive={GOLD} emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[t3.cx + 0.3, t3.h - 0.3, front + 0.06]}>
        <boxGeometry args={[2.6, 0.08, 0.08]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1} />
      </mesh>
      <mesh position={[t3.cx - 1.2, 1.5, front + 0.05]}>
        <boxGeometry args={[0.9, 0.7, 0.1]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      <mesh position={[t3.cx - 1.4, 1.6, front + 0.14]}>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial ref={fireMat} color="#e03a3a" emissive="#e03a3a" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[t3.cx - 1.0, 1.6, front + 0.14]}>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial ref={bmsMat} color={GOLD} emissive={GOLD} emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

const TRAYS = 30;
/** Where a tray is for u in 0..1: along the serving ledge, hops down to the long table, slides along it. */
function trayPose(u: number, out: THREE.Vector3) {
  if (u < 0.5) {
    out.set(-6.3, 0.93, lerp(-1.35, 0.35, u / 0.5));
  } else if (u < 0.62) {
    const k = (u - 0.5) / 0.12;
    out.set(lerp(-6.3, -5.35, k), lerp(0.93, 0.78, k), 0.35);
  } else {
    out.set(-5.35, 0.78, lerp(0.35, 2.7, (u - 0.62) / 0.38));
  }
}
const trayPos = new THREE.Vector3();

/** Stop 4: ~30 trays flow out of the cafeteria window and along a serving table. */
function Trays() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  useFrame(() => {
    const m = mesh.current;
    if (!m) return;
    const h = hourFromProgress(timeline.progress);
    const act = pulse(h, 11.8, 12.4, 14.0, 14.8);
    for (let i = 0; i < TRAYS; i++) {
      const u = fract(h * 0.6 + i / TRAYS);
      trayPose(u, trayPos);
      // Scale in as it leaves the window, out as it reaches the end of the table.
      const s = act * Math.min(1, u / 0.03) * Math.min(1, (1 - u) / 0.05);
      dummy.position.copy(trayPos);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  });
  return (
    <>
      <mesh position={[-5.35, 0.37, 1.4]}>
        <boxGeometry args={[0.6, 0.74, 3.4]} />
        <meshStandardMaterial color="#c9c0b8" roughness={0.6} />
      </mesh>
      <instancedMesh ref={mesh} args={[undefined, undefined, TRAYS]} frustumCulled={false}>
        <boxGeometry args={[0.2, 0.03, 0.28]} />
        <meshStandardMaterial color="#f1ece2" roughness={0.5} />
      </instancedMesh>
    </>
  );
}

const CRATES = 20;
const DOORS_X = [8.2, 10.8] as const;
/** Stop 5: crates shuttle between the parked trucks and the dock doors, both directions. */
function Crates() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const m = mesh.current;
    if (!m) return;
    const c = new THREE.Color();
    for (let i = 0; i < CRATES; i++) m.setColorAt(i, c.set(i % 2 ? "#a8763a" : "#b8863f"));
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, []);
  useFrame(() => {
    const m = mesh.current;
    if (!m) return;
    const h = hourFromProgress(timeline.progress);
    const act = pulse(h, 14.9, 15.3, 16.7, 17.1);
    for (let i = 0; i < CRATES; i++) {
      const inbound = i < CRATES / 2;
      const u = fract(h * 0.9 + i / CRATES);
      const k = inbound ? u : 1 - u; // 0 at the truck, 1 at the door
      dummy.position.set(DOORS_X[i % 2], lerp(0.95, 0.35, k), lerp(-6.25, -7.3, k));
      dummy.scale.setScalar(act * Math.min(1, u / 0.06) * Math.min(1, (1 - u) / 0.06));
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, CRATES]} frustumCulled={false} castShadow>
      <boxGeometry args={[0.4, 0.4, 0.4]} />
      <meshStandardMaterial roughness={0.8} />
    </instancedMesh>
  );
}

const ITEMS = 10;
const MACHINES_X = [-14, -11.5, -9] as const;
/** Stop 6: conveyor lights up, items travel along it, machine status lights come on. */
function ProductionLine() {
  const strip = useRef<THREE.MeshBasicMaterial>(null);
  const items = useRef<THREE.InstancedMesh>(null);
  const lamps = useRef<(THREE.MeshStandardMaterial | null)[]>([]);

  useFrame(() => {
    const h = hourFromProgress(timeline.progress);
    const act = pulse(h, 16.2, 16.9, 19.3, 20.0);
    if (strip.current) strip.current.opacity = 0.8 * act;
    for (const mat of lamps.current) if (mat) mat.emissiveIntensity = 2.2 * act;
    const m = items.current;
    if (!m) return;
    for (let i = 0; i < ITEMS; i++) {
      const u = fract(h * 0.8 + i / ITEMS);
      dummy.position.set(lerp(-14.8, -8.2, u), 0.78, -6.4);
      dummy.scale.setScalar(act);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <mesh position={[-11.5, 0.69, -6.4]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[7, 0.4]} />
        <meshBasicMaterial ref={strip} color={GOLD} transparent opacity={0} depthWrite={false} toneMapped={false} />
      </mesh>
      <instancedMesh ref={items} args={[undefined, undefined, ITEMS]} frustumCulled={false}>
        <boxGeometry args={[0.3, 0.2, 0.3]} />
        <meshStandardMaterial color="#c9c0b8" roughness={0.6} />
      </instancedMesh>
      {MACHINES_X.map((x, i) => (
        <mesh key={x} position={[x, 1.42, -6.4]}>
          <sphereGeometry args={[0.1, 10, 10]} />
          <meshStandardMaterial
            ref={(m) => {
              lamps.current[i] = m;
            }}
            color={i === 1 ? "#3ddc84" : GOLD}
            emissive={i === 1 ? "#3ddc84" : GOLD}
            emissiveIntensity={0}
          />
        </mesh>
      ))}
    </group>
  );
}

export function Props() {
  return (
    <group>
      <FacadeWipe />
      <PlantRoom />
      <Trays />
      <Crates />
      <ProductionLine />
    </group>
  );
}
