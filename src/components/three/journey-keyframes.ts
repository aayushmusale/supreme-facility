/**
 * Camera waypoints for the scroll-driven homepage journey (cinematic-journey.tsx).
 * Deliberately a plain data file with NO three.js/@react-three imports, so it can be
 * imported cheaply from anywhere (including lightweight, non-dynamically-loaded code)
 * without pulling the 3D bundle along with it — only building-scene.tsx (loaded via
 * next/dynamic) touches three.js itself.
 *
 * COUPLING NOTE: the "hero" keyframe's numbers must match building-scene.tsx's own
 * REST_POSITION/LOOK_AT (used for the simple, non-journey mode's resting camera), and
 * CORRIDOR_X below is derived from building-scene.tsx's TOWERS[0] and TOWERS[2]
 * footprints (hero tower: x=0, width=2.2 → right edge 1.1; second tower: x=3.3,
 * width=1.8 → left edge 2.4; midpoint 1.75). If either tower's position or width
 * changes in building-scene.tsx, recompute CORRIDOR_X here to match, or the "entry"
 * stage's camera path will drift off-center in the gap between them.
 */

export type CameraDriverState = { x: number; y: number; z: number; lookX: number; lookY: number; lookZ: number };
export type CameraKeyframe = CameraDriverState & { label: string };

const CORRIDOR_X = 1.75;

export const JOURNEY_KEYFRAMES: CameraKeyframe[] = [
  // Matches building-scene.tsx's REST_POSITION / LOOK_AT exactly — this is where the
  // mount-entrance leaves the camera, and where the scroll-driven journey picks up from.
  { label: "hero", x: 1.5, y: 3.2, z: 11, lookX: 0, lookY: 2.5, lookZ: 0 },
  // Drifts toward the gap between the hero tower and the second tower.
  { label: "approach", x: CORRIDOR_X - 0.6, y: 2.2, z: 6.5, lookX: CORRIDOR_X, lookY: 1.8, lookZ: -1 },
  // Passes between the two towers' real walls, low and close — the "entry" illusion,
  // built from the existing gap in the cluster rather than a modeled interior.
  { label: "entry", x: CORRIDOR_X, y: 1.4, z: -3, lookX: CORRIDOR_X, lookY: 1.6, lookZ: -8 },
  // Emerges on the far side to a fresh wide angle, different from the opening shot.
  { label: "services", x: -2.5, y: 4.5, z: -9, lookX: 0, lookY: 2, lookZ: 0 },
  // Rises to a near-overhead "operations" view over the whole cluster.
  { label: "operations", x: 0.5, y: 11, z: 4, lookX: 0, lookY: 0, lookZ: 0 },
  // Settles to a calm, grounded wide shot as the sequence hands off to normal scrolling.
  { label: "handoff", x: 0, y: 6, z: 13, lookX: 0, lookY: 2, lookZ: 0 },
];
