"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Instance, Instances, PerspectiveCamera } from "@react-three/drei";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";
import type { CameraDriverState } from "./journey-keyframes";

/**
 * Procedural architectural scene for the homepage hero: a small cluster of
 * commercial towers with lit windows, standing in for Supreme's many managed
 * sites. Built entirely from primitive geometry — no external model, no
 * texture downloads, no runtime CDN dependency (deliberately: see the
 * licensing note in the Milestone report for why, and for real licensed GLB
 * candidates to swap in later if a photoreal building is wanted instead).
 *
 * Entrance is two beats, tied together with one GSAP timeline so they read
 * as one deliberate movement rather than unrelated effects:
 *   1) the camera dollies in while the towers rise from the ground, staggered;
 *   2) once they've risen, the windows fade on together, like the site
 *      coming online.
 * Under prefers-reduced-motion, everything renders straight to its final,
 * static state — no camera move, no rise, no fade.
 */

const OXBLOOD = "#2a0d10";
const OXBLOOD_2 = "#3a1216";
const GOLD = "#d9ad5f";
const BRAND = "#c4343a";

type TowerDef = { x: number; z: number; width: number; depth: number; height: number; cols: number; rows: number };

// A loose, asymmetric cluster rather than a grid — reads as an organic site layout, not a city block.
const TOWERS: TowerDef[] = [
  { x: 0, z: 0, width: 2.2, depth: 2.2, height: 9, cols: 4, rows: 13 },
  { x: -3.6, z: -1.1, width: 1.6, depth: 1.6, height: 6, cols: 3, rows: 9 },
  { x: 3.3, z: -0.5, width: 1.8, depth: 1.8, height: 7.2, cols: 3, rows: 10 },
  { x: -1.9, z: 2.7, width: 1.3, depth: 1.3, height: 4.4, cols: 2, rows: 6 },
  { x: 2.2, z: 2.9, width: 1.4, depth: 1.4, height: 5.2, cols: 2, rows: 7 },
  { x: -4.8, z: 1.5, width: 1.1, depth: 1.1, height: 3.4, cols: 2, rows: 5 },
  { x: 5.0, z: 1.7, width: 1.2, depth: 1.2, height: 3.8, cols: 2, rows: 5 },
];

const REST_POSITION = { x: 1.5, y: 3.2, z: 11 };
const START_POSITION = { x: 3, y: 7, z: 17 };
const LOOK_AT = new THREE.Vector3(0, 2.5, 0);

/** Window positions on each tower's front (+z) face only — back/side faces stay plain, which is cheaper and isn't seen from the resting camera angle. */
function windowPositions(tower: TowerDef): [number, number, number][] {
  const positions: [number, number, number][] = [];
  const faceZ = tower.z + tower.depth / 2 + 0.02;
  const marginX = 0.3;
  const marginY = 0.5;
  const colSpread = tower.width - marginX * 2;
  const rowSpread = tower.height - marginY * 2;

  for (let row = 0; row < tower.rows; row++) {
    for (let col = 0; col < tower.cols; col++) {
      // Skip roughly 1 in 7 windows for an "occupied, not uniform" look rather than a perfect grid.
      if ((row * tower.cols + col) % 7 === 0) continue;
      const localX = tower.cols === 1 ? 0 : -colSpread / 2 + (colSpread * col) / (tower.cols - 1);
      const y = tower.rows === 1 ? tower.height / 2 : marginY + (rowSpread * row) / (tower.rows - 1);
      positions.push([tower.x + localX, y, faceZ]);
    }
  }
  return positions;
}

type CameraRigProps = {
  reducedMotion: boolean;
  /**
   * When provided, an external (scroll-driven) controller owns the camera from the
   * first frame on — CameraRig just reads it every frame via useFrame, instead of
   * running its own mount-triggered dolly-in and idle drift. Used by the homepage's
   * cinematic scroll journey; omitted entirely for the simple/fallback hero, which
   * keeps its existing self-contained behavior below completely unchanged.
   */
  driver?: RefObject<CameraDriverState>;
};

function CameraRig({ reducedMotion, driver }: CameraRigProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const idleReady = useRef(false);

  useGSAP(() => {
    const camera = cameraRef.current;
    if (!camera) return;

    if (driver) {
      // Just seed the first frame; useFrame below takes over every frame after this.
      const d = driver.current;
      camera.position.set(d.x, d.y, d.z);
      camera.lookAt(d.lookX, d.lookY, d.lookZ);
      return;
    }

    if (reducedMotion) {
      camera.position.set(REST_POSITION.x, REST_POSITION.y, REST_POSITION.z);
      camera.lookAt(LOOK_AT);
      return;
    }

    camera.position.set(START_POSITION.x, START_POSITION.y, START_POSITION.z);
    camera.lookAt(LOOK_AT);

    gsap.to(camera.position, {
      x: REST_POSITION.x,
      y: REST_POSITION.y,
      z: REST_POSITION.z,
      duration: 2.2,
      ease: "power2.out",
      onUpdate: () => camera.lookAt(LOOK_AT),
      onComplete: () => {
        idleReady.current = true;
      },
    });
  }, [reducedMotion, driver]);

  useFrame((state) => {
    const camera = cameraRef.current;
    if (!camera) return;

    if (driver) {
      const d = driver.current;
      camera.position.set(d.x, d.y, d.z);
      camera.lookAt(d.lookX, d.lookY, d.lookZ);
      return;
    }

    // Very slow, small idle drift once the entrance finishes — ambient life, not a loop you consciously notice.
    if (reducedMotion || !idleReady.current) return;
    const t = state.clock.elapsedTime;
    camera.position.y = REST_POSITION.y + Math.sin(t * 0.15) * 0.08;
    camera.lookAt(LOOK_AT);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault fov={36} near={0.1} far={100} />;
}

function Towers({ reducedMotion, onRisen }: { reducedMotion: boolean; onRisen: () => void }) {
  const groupRefs = useRef<(THREE.Group | null)[]>([]);

  useGSAP(() => {
    if (reducedMotion) {
      groupRefs.current.forEach((group) => group?.scale.set(1, 1, 1));
      onRisen();
      return;
    }

    groupRefs.current.forEach((group) => group?.scale.set(1, 0, 1));

    const timeline = gsap.timeline({ onComplete: onRisen });
    TOWERS.forEach((_, index) => {
      const group = groupRefs.current[index];
      if (!group) return;
      // Staggered, overlapping starts (0.12s apart) read as one cascading "rise," not separate pops.
      timeline.to(group.scale, { y: 1, duration: 1, ease: "power3.out" }, index * 0.12);
    });
  }, [reducedMotion]);

  return (
    <>
      {TOWERS.map((tower, index) => (
        <group
          key={index}
          ref={(element) => {
            groupRefs.current[index] = element;
          }}
          position={[tower.x, 0, tower.z]}
        >
          <mesh position={[0, tower.height / 2, 0]}>
            <boxGeometry args={[tower.width, tower.height, tower.depth]} />
            <meshStandardMaterial color={index === 0 ? OXBLOOD_2 : OXBLOOD} roughness={0.55} metalness={0.25} />
          </mesh>
        </group>
      ))}
    </>
  );
}

function WindowLights({
  materialRef,
  onReady,
}: {
  materialRef: RefObject<THREE.MeshStandardMaterial | null>;
  /** Fires as soon as the material exists (not gated behind the rise animation), so a scroll-driven
      caller can attach its own tweens to it even if the user scrolls fast, early. */
  onReady?: (material: THREE.MeshStandardMaterial) => void;
}) {
  const geometry = useMemo(() => new THREE.BoxGeometry(0.14, 0.2, 0.02), []);
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ color: GOLD, emissive: GOLD, emissiveIntensity: 0, roughness: 0.4, metalness: 0.1 }),
    [],
  );
  const positions = useMemo(() => TOWERS.flatMap(windowPositions), []);

  useEffect(() => {
    materialRef.current = material;
    onReady?.(material);
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material, materialRef, onReady]);

  return (
    <Instances geometry={geometry} material={material} limit={positions.length}>
      {positions.map((position, index) => (
        <Instance key={index} position={position} />
      ))}
    </Instances>
  );
}

type SceneProps = {
  driver?: RefObject<CameraDriverState>;
  onWindowMaterialReady?: (material: THREE.MeshStandardMaterial) => void;
};

function Scene({ driver, onWindowMaterialReady }: SceneProps) {
  const reducedMotion = useReducedMotion();
  const windowMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  const handleRisen = () => {
    const material = windowMaterialRef.current;
    if (!material) return;
    gsap.to(material, {
      emissiveIntensity: 1.3,
      duration: reducedMotion ? 0 : 1.1,
      ease: "power1.out",
    });
  };

  return (
    <>
      <color attach="background" args={[OXBLOOD]} />
      <fog attach="fog" args={[OXBLOOD, 10, 28]} />

      <CameraRig reducedMotion={reducedMotion} driver={driver} />

      <ambientLight intensity={0.35} color="#5a3a3d" />
      <directionalLight position={[6, 9, 4]} intensity={1.1} color="#fff4e6" />
      <pointLight position={[-6, 4, 3]} intensity={0.6} color={GOLD} distance={14} decay={2} />
      <pointLight position={[6, 3, -2]} intensity={0.5} color={BRAND} distance={14} decay={2} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color={OXBLOOD} roughness={0.8} metalness={0.1} />
      </mesh>

      <Towers reducedMotion={reducedMotion} onRisen={handleRisen} />
      <WindowLights materialRef={windowMaterialRef} onReady={onWindowMaterialReady} />
    </>
  );
}

/**
 * Default export so this can be `next/dynamic`-imported with `ssr: false`.
 * This file touches WebGL/`window` immediately on import and must never run
 * on the server.
 *
 * Two modes, both using the exact same scene/geometry/lighting:
 * - No props (simple hero): self-contained mount entrance + idle drift, as before.
 * - `driver` passed (cinematic scroll journey): an external ref supplies the camera's
 *   position/look-target every frame, driven by a scroll-scrubbed GSAP timeline that
 *   lives outside this Canvas — see cinematic-journey.tsx.
 */
export default function BuildingScene({ driver, onWindowMaterialReady }: SceneProps = {}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false }}
      className="absolute inset-0"
      style={{ pointerEvents: "none" }}
    >
      <Scene driver={driver} onWindowMaterialReady={onWindowMaterialReady} />
    </Canvas>
  );
}
