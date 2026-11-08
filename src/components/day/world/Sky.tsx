"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sampleSky, skyState, sunPosition } from "@/lib/day/sky";
import { hourFromProgress, timeline } from "@/lib/day/timeline";
import { useQualitySettings } from "../quality-context";

const SUN_LOW = new THREE.Color("#ff9a5a"); // warm sun near the horizon
const SUN_HIGH = new THREE.Color("#fff4e0"); // near-white overhead

/**
 * Background, fog, sun (with shadows), sky/ground bounce light and ambient, all a
 * pure function of `timeline.progress`. Everything is created once and mutated in
 * useFrame (no allocation, no setState).
 */
export function Sky() {
  const { shadows, shadowMapSize } = useQualitySettings();
  const bg = useRef<THREE.Color>(null);
  const fog = useRef<THREE.Fog>(null);
  const sun = useRef<THREE.DirectionalLight>(null);
  const hemi = useRef<THREE.HemisphereLight>(null);
  const ambient = useRef<THREE.AmbientLight>(null);
  const moon = useRef<THREE.DirectionalLight>(null);

  const skyColor = useMemo(() => new THREE.Color(), []);

  useFrame(() => {
    const hour = hourFromProgress(timeline.progress);
    sampleSky(hour, skyColor);

    bg.current?.copy(skyColor);
    fog.current?.color.copy(skyColor);

    if (sun.current) {
      const height = sunPosition(hour, sun.current.position);
      sun.current.intensity = skyState.sunIntensity * 2.4;
      sun.current.color.copy(SUN_LOW).lerp(SUN_HIGH, height);
    }
    // Sky-coloured light from above, dark oxblood bounce from below: this is what makes
    // surfaces facing away from the sun read as lit by the sky instead of flat grey.
    if (hemi.current) {
      hemi.current.color.copy(skyColor);
      hemi.current.intensity = 0.4 + 0.55 * skyState.daylight;
    }
    // Ambient floor so nothing goes pure black at night.
    if (ambient.current) ambient.current.intensity = 0.2 + 0.12 * skyState.daylight;
    // Cool moonlight: gives buses, people and walls readable form before dawn and after dusk,
    // and fades out as the sun takes over. No shadows (cheap).
    if (moon.current) moon.current.intensity = 0.9 * (1 - skyState.daylight);
  });

  return (
    <>
      <color ref={bg} attach="background" args={["#1b1030"]} />
      <fog ref={fog} attach="fog" args={["#1b1030", 40, 110]} />
      <ambientLight ref={ambient} intensity={0.1} />
      <hemisphereLight ref={hemi} args={["#1b1030", "#2a0d10", 0.3]} />
      <directionalLight ref={moon} color="#8fa6e8" position={[-10, 16, 12]} intensity={0.9} />
      <directionalLight
        ref={sun}
        intensity={0}
        castShadow={shadows}
        shadow-mapSize={[shadowMapSize, shadowMapSize]}
        shadow-camera-left={-32}
        shadow-camera-right={32}
        shadow-camera-top={32}
        shadow-camera-bottom={-32}
        shadow-camera-near={1}
        shadow-camera-far={60}
        shadow-bias={-0.0004}
        shadow-normalBias={0.05}
      />
    </>
  );
}
