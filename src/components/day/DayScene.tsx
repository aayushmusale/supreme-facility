"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import { sampleCamera } from "@/lib/day/camera-path";
import { QUALITY_SETTINGS, type Quality } from "@/lib/day/quality";
import { DAY_STOPS } from "@/lib/day/stops";
import { hourFromProgress, timeline } from "@/lib/day/timeline";
import { QualityProvider } from "./quality-context";
import { Campus } from "./world/Campus";
import { People } from "./world/People";
import { Props } from "./world/Props";
import { Sky } from "./world/Sky";
import { Vehicles } from "./world/Vehicles";

const [startPose] = DAY_STOPS;

/**
 * Drives the camera along the keyframed path as a pure function of the hour, so the
 * move between stops is a continuous glide and scrubbing backward is its exact reverse.
 */
function CameraRig() {
  const position = useMemo(() => new THREE.Vector3(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ camera, size }) => {
    sampleCamera(hourFromProgress(timeline.progress), position, target);
    // The poses are framed for a landscape screen. In portrait the horizontal field of view is
    // much narrower, so pull the camera back along its line of sight: ~1x at 16:10, ~1.9x on a
    // phone (capped, so the scene doesn't shrink to nothing).
    const aspect = size.width / size.height;
    const back = Math.min(2.1, Math.max(1, Math.sqrt(1.6 / aspect)));
    position.sub(target).multiplyScalar(back).add(target);
    camera.position.copy(position);
    camera.lookAt(target);
  });
  return null;
}

/**
 * Development only: writes draw calls, triangles and fps into the debug overlay (#day-stats)
 * twice a second, to check the performance budget (< ~100 calls, < ~150k / ~60k triangles).
 * Direct DOM writes, so it never causes a React render.
 */
function DevStats() {
  const accumRef = useRef({ frames: 0, time: 0 });
  useFrame(({ gl }, delta) => {
    const accum = accumRef.current;
    accum.frames++;
    accum.time += delta;
    if (accum.time < 0.5) return;
    const el = document.getElementById("day-stats");
    if (el) {
      const { calls, triangles } = gl.info.render;
      el.textContent = `${Math.round(accum.frames / accum.time)} fps · ${calls} calls · ${(triangles / 1000).toFixed(1)}k tris`;
    }
    accum.frames = 0;
    accum.time = 0;
  });
  return null;
}

type DaySceneProps = {
  quality: Quality;
  active: boolean;
  onContextLost: () => void;
};

/** Sky/light engine, campus, camera path, and the motion layer, tuned by quality tier. */
export default function DayScene({ quality, active, onContextLost }: DaySceneProps) {
  const settings = QUALITY_SETTINGS[quality];
  // If the frame rate stays low, drop to the lowest pixel ratio. State changes only on
  // PerformanceMonitor's decline event, never per frame.
  const [degraded, setDegraded] = useState(false);

  return (
    <Canvas
      // No frames at all while the section is far off-screen (saves CPU/GPU/battery).
      frameloop={active ? "always" : "never"}
      // "percentage" = PCFShadowMap; three r18x removed PCFSoftShadowMap and warns if it is requested.
      shadows={settings.shadows ? "percentage" : false}
      dpr={degraded ? [1, 1] : settings.dpr}
      gl={{ antialias: settings.antialias, powerPreference: "high-performance" }}
      // near/far tightened from the defaults to keep depth precision for thin ground slabs.
      camera={{ fov: 35, near: 0.5, far: 300, position: [...startPose.camera.position] }}
      style={{ pointerEvents: "none" }}
      onCreated={({ gl, setFrameloop }) => {
        gl.domElement.addEventListener("webglcontextlost", (event) => {
          // preventDefault tells the browser we handle it. Stop the render loop FIRST: drawing
          // against a lost context throws, and React hasn't unmounted the canvas yet.
          event.preventDefault();
          setFrameloop("never");
          onContextLost();
        });
      }}
    >
      <QualityProvider value={settings}>
        <PerformanceMonitor onDecline={() => setDegraded(true)} flipflops={3} onFallback={() => setDegraded(true)} />
        <Sky />
        <Campus />
        <Vehicles />
        <People />
        <Props />
        <CameraRig />
        {process.env.NODE_ENV !== "production" && <DevStats />}
      </QualityProvider>
    </Canvas>
  );
}
