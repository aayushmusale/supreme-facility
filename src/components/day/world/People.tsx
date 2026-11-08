"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { fract, lerp, pingPong, pulse } from "@/lib/day/activity";
import { mulberry32 } from "@/lib/day/layout";
import type { QualitySettings } from "@/lib/day/quality";
import { skyState } from "@/lib/day/sky";
import { hourFromProgress, timeline } from "@/lib/day/timeline";
import { useQualitySettings } from "../quality-context";

/*
 * Simple instanced figures (capsule body + sphere head). The capsule is symmetric
 * about the vertical axis, so people need no facing rotation. Positions are pure
 * functions of the hour.
 */

enum Kind {
  Housekeeper,
  Arriving, // bus bay -> lobby, morning
  Leaving, // lobby -> bus bay, evening
  Supervisor,
  Guard,
}

type Person = {
  kind: Kind;
  phase: number; // 0..1 offset so a group doesn't move in lockstep
  a: number; // meaning depends on kind (see useFrame)
  b: number;
  rx: number;
  rz: number;
  dir: number;
};

const BODY_COLORS: Record<Kind, readonly string[]> = {
  [Kind.Housekeeper]: ["#d9ad5f"], // gold vest
  [Kind.Arriving]: ["#3b4a5a", "#5a3b3b", "#2f3b34", "#4a4a55", "#6b5a45"],
  [Kind.Leaving]: ["#3b4a5a", "#5a3b3b", "#2f3b34", "#4a4a55", "#6b5a45"],
  [Kind.Supervisor]: ["#ececec"], // hi-vis white
  [Kind.Guard]: ["#1f2a44"],
};
const SKIN = ["#e0b08c", "#c68e66", "#a56b45", "#7a4a2e"];

const BODY_Y = 0.32;
const HEAD_Y = 0.78;

const BEAM_LENGTH = 2.6;
// Soft light cone: the silhouette fades out (no hard outline) and the beam thins toward its far end.
const BEAM_VERTEX = /* glsl */ `
  varying float vAlong;
  varying vec3 vNormalV;
  varying vec3 vViewDir;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vAlong = clamp(position.z / ${BEAM_LENGTH.toFixed(1)}, 0.0, 1.0);
    vNormalV = normalize(normalMatrix * normal);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;
const BEAM_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vAlong;
  varying vec3 vNormalV;
  varying vec3 vViewDir;
  void main() {
    float facing = abs(dot(normalize(vNormalV), normalize(vViewDir)));
    float edge = pow(facing, 1.8);
    float along = pow(1.0 - vAlong, 1.7) * smoothstep(0.0, 0.06, vAlong);
    gl_FragColor = vec4(uColor, uOpacity * edge * along);
  }
`;

const dummy = new THREE.Object3D();

function buildPeople(counts: QualitySettings["people"]): Person[] {
  const { housekeepers: HOUSEKEEPERS, arriving: ARRIVING, leaving: LEAVING, supervisors: SUPERVISORS } = counts;
  const rand = mulberry32(42);
  const people: Person[] = [];
  for (let i = 0; i < HOUSEKEEPERS; i++) {
    people.push({
      kind: Kind.Housekeeper,
      phase: i / HOUSEKEEPERS,
      a: 0.5 + (i % 2) * 0, // loop centre x
      b: 4, // loop centre z
      rx: 3.2 + (i % 3) * 0.9,
      rz: 2.2 + (i % 3) * 0.7,
      dir: i % 2 ? 1 : -1,
    });
  }
  for (let i = 0; i < ARRIVING; i++) {
    people.push({ kind: Kind.Arriving, phase: i / ARRIVING, a: (rand() - 0.5) * 6, b: (rand() - 0.5) * 2.4, rx: 0, rz: 0, dir: 1 });
  }
  for (let i = 0; i < LEAVING; i++) {
    people.push({ kind: Kind.Leaving, phase: i / LEAVING, a: (rand() - 0.5) * 6, b: (rand() - 0.5) * 2.4, rx: 0, rz: 0, dir: 1 });
  }
  for (let i = 0; i < SUPERVISORS; i++) {
    people.push({ kind: Kind.Supervisor, phase: i / SUPERVISORS, a: -14.6 + i * 0.4, b: -8.3 + i * 0.3, rx: 0, rz: 0, dir: 1 });
  }
  people.push({ kind: Kind.Guard, phase: 0, a: 0, b: 4, rx: 7.4, rz: 6.2, dir: 1 });
  return people;
}

export function People() {
  const counts = useQualitySettings().people;
  const people = useMemo(() => buildPeople(counts), [counts]);
  const bodies = useRef<THREE.InstancedMesh>(null);
  const heads = useRef<THREE.InstancedMesh>(null);
  const cone = useRef<THREE.Mesh>(null);
  const coneMat = useRef<THREE.ShaderMaterial>(null);
  const coneUniforms = useMemo(() => ({ uColor: { value: new THREE.Color("#ffe6b0") }, uOpacity: { value: 0 } }), []);

  // Per-instance colours are static: set once.
  useLayoutEffect(() => {
    const b = bodies.current;
    const hd = heads.current;
    if (!b || !hd) return;
    const color = new THREE.Color();
    const rand = mulberry32(99);
    people.forEach((p, i) => {
      const palette = BODY_COLORS[p.kind];
      b.setColorAt(i, color.set(palette[Math.floor(rand() * palette.length)]));
      hd.setColorAt(i, color.set(SKIN[Math.floor(rand() * SKIN.length)]));
    });
    if (b.instanceColor) b.instanceColor.needsUpdate = true;
    if (hd.instanceColor) hd.instanceColor.needsUpdate = true;
  }, [people]);

  // Light-cone geometry: apex at the origin, opening toward local +z.
  const coneGeometry = useMemo(() => {
    const g = new THREE.ConeGeometry(0.6, BEAM_LENGTH, 20, 1, true);
    g.translate(0, -BEAM_LENGTH / 2, 0);
    g.rotateX(-Math.PI / 2);
    return g;
  }, []);
  useLayoutEffect(() => () => coneGeometry.dispose(), [coneGeometry]);

  useFrame(() => {
    const b = bodies.current;
    const hd = heads.current;
    if (!b || !hd) return;
    const h = hourFromProgress(timeline.progress);

    const housekeeping = pulse(h, 6.8, 7.4, 9.8, 10.6);
    // Windows sit strictly inside the time the bay buses are parked (they arrive by ~6.15
    // and start leaving at 7.2; evening: arrive by ~19.05, leave from 20.2), so nobody
    // is ever walking while a bus is still gliding in or out.
    const arriving = pulse(h, 6.15, 6.5, 6.9, 7.15);
    const leaving = pulse(h, 19.1, 19.4, 19.9, 20.15);
    const supervising = pulse(h, 16.4, 17.0, 19.0, 19.6);
    const night = pulse(h, 20.5, 21.5, 99, 100);

    for (let i = 0; i < people.length; i++) {
      const p = people[i];
      let x = 0;
      let z = 0;
      let s = 0;
      switch (p.kind) {
        case Kind.Housekeeper: {
          // Slow loops around the plaza in front of the lobby.
          const ang = (p.phase + p.dir * h * 0.38) * Math.PI * 2;
          x = p.a + Math.cos(ang) * p.rx;
          z = p.b + Math.sin(ang) * p.rz;
          s = housekeeping;
          break;
        }
        case Kind.Arriving: {
          // Bus bay (z ~ 12) -> lobby door (z ~ 1), repeating while the window is open.
          const u = fract(h * 0.7 + p.phase);
          x = lerp(p.a, p.b, u);
          z = lerp(10.8, 1.2, u);
          s = arriving * (u < 0.96 ? 1 : 0);
          break;
        }
        case Kind.Leaving: {
          const u = fract(h * 0.7 + p.phase);
          x = lerp(p.b, p.a, u);
          z = lerp(1.2, 10.8, u);
          s = leaving * (u < 0.96 ? 1 : 0);
          break;
        }
        case Kind.Supervisor: {
          // Back and forth along the conveyor yard.
          x = lerp(p.a, p.a + 6.2, pingPong(h * 0.5 + p.phase));
          z = p.b + 3.0;
          s = supervising;
          break;
        }
        case Kind.Guard: {
          const ang = h * 1.7;
          x = p.a + Math.cos(ang) * p.rx;
          z = p.b + Math.sin(ang) * p.rz;
          s = night;
          // The cone follows the guard, pointing along the direction of travel, tilted down.
          const c = cone.current;
          if (c) {
            c.position.set(x, 0.75, z);
            c.rotation.set(0.3, Math.atan2(-Math.sin(ang), Math.cos(ang)), 0);
            c.visible = s > 0.01;
          }
          if (coneMat.current) coneMat.current.uniforms.uOpacity.value = 0.5 * s * Math.min(1, skyState.windowGlow);
          break;
        }
      }

      // Little walking bob keyed to the hour.
      const bob = s > 0 ? Math.abs(Math.sin(h * 70 + p.phase * 12)) * 0.04 : 0;
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(s);
      dummy.position.set(x, (BODY_Y + bob) * s, z);
      dummy.updateMatrix();
      b.setMatrixAt(i, dummy.matrix);
      dummy.position.set(x, (HEAD_Y + bob) * s, z);
      dummy.updateMatrix();
      hd.setMatrixAt(i, dummy.matrix);
    }
    b.instanceMatrix.needsUpdate = true;
    hd.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={bodies} args={[undefined, undefined, people.length]} frustumCulled={false} castShadow>
        <capsuleGeometry args={[0.11, 0.42, 4, 8]} />
        <meshStandardMaterial roughness={0.8} />
      </instancedMesh>
      <instancedMesh ref={heads} args={[undefined, undefined, people.length]} frustumCulled={false}>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial roughness={0.7} />
      </instancedMesh>
      <mesh ref={cone} geometry={coneGeometry} visible={false} rotation-order="YXZ">
        <shaderMaterial
          ref={coneMat}
          uniforms={coneUniforms}
          vertexShader={BEAM_VERTEX}
          fragmentShader={BEAM_FRAGMENT}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
