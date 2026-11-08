# The 24-Hour Campus

A pinned, scroll-driven 3D section on the homepage. **Scroll position = time of day (5 AM → midnight).** Each of 8 stops shows one Supreme service at work on a procedural corporate campus. Mounted in `src/app/page.tsx` as `<DaySection />`, directly under the hero.

## How it works

One number drives everything: `timeline.progress` (0→1), written by ScrollTrigger in `DaySection.tsx` and read by the 3D scene every frame. The hour is `5 + progress × 19`. Sky, lights, window glow, camera, vehicles, people and props are all **pure functions of the hour**, so scrolling backward is the exact reverse and nothing runs on a timer (apart from tiny ambient motion such as tree sway and LED pulses).

- The pin is CSS `position: sticky` inside a 700svh track (the same pattern the old hero used), not GSAP's pin.
- React state changes only when the active stop changes. The clock, counters and timeline bar are written straight to the DOM.
- 3D rules: no `setState` and no allocation inside `useFrame`; everything repeated is instanced; animated instanced meshes set `frustumCulled={false}`.

## Files

| Path | What it is |
|---|---|
| `components/day/DaySection.tsx` | Pinned section, HTML panels, clock, counters, skip link, capability gating |
| `components/day/DayCanvas.tsx` / `DayScene.tsx` | Lazy (`ssr: false`) R3F canvas, camera rig, quality, context-loss handling |
| `components/day/SceneBoundary.tsx` | Error boundary: any WebGL failure swaps in the static version |
| `components/day/StaticFallback.tsx` | Non-animated version with poster cards (also what the server renders) |
| `components/day/world/*` | `Sky`, `Campus`, `Vehicles`, `People`, `Props` |
| `lib/day/stops.ts` | **The 8 stops: copy, counters, CTA, camera poses, poster colours** |
| `lib/day/layout.ts` | Towers, footprints, road loop: the one place the world layout lives |
| `lib/day/sky.ts` | Sky/sun/glow keyframes and samplers |
| `lib/day/camera-path.ts` | Smooth camera path through the stop poses |
| `lib/day/quality.ts` | `full` / `lite` tiers and device detection |
| `lib/day/activity.ts` | Fade-window helpers (`pulse`, `ramp`, `smooth`) |

## Common edits

- **Change copy, stats, CTA link:** `lib/day/stops.ts`. Stats are marked `[CONFIRM]`; do not ship them unverified.
- **Retune a camera view:** edit that stop's `camera: { position, target }` in `stops.ts`. The world is about 40 units across; the main tower is 9 tall.
- **Move or add a building:** `lib/day/layout.ts` (footprints keep trees clear) and `world/Campus.tsx`. Re-check people vs buses if you touch the road or bay (see Gotchas).
- **Change when something happens:** each event's time window is a `pulse(hour, a0, a1, b0, b1)` call in `Vehicles.tsx`, `People.tsx` or `Props.tsx`.

## Quality tiers

`detectQuality()` picks **lite** on touch devices under 1024px wide, 4 GB or less of device memory, 2 or fewer cores, or data-saver mode; otherwise **full**. Lite uses a lower pixel ratio, no antialiasing or shadows, and fewer buses, trees and people. A PerformanceMonitor drops the pixel ratio further if frames stay slow.

For QA, force a tier with `?quality=lite` or `?quality=full`. In development builds a debug box (left edge of the screen) shows progress, hour, tier, fps, draw calls and triangles.

Measured in headless Chrome (software rendering, so ignore fps): full is 57–96 draw calls and about 28k triangles; lite is 29–57 calls and about 10k triangles.

## Loading and performance

- **Deferred mount.** The 3D chunk (about 570 KB uncompressed) and the WebGL context are not part of page load. The scene mounts 2.5 s after the pinned section does, or sooner if the section scrolls into view (IntersectionObserver, 0 margin). The section starts only about one screen below the top, so a distance margin cannot defer it.
- **Paused when off-screen.** The canvas uses `frameloop="never"` while the section is not visible, and resumes on return.
- **Lighthouse (mobile profile, production build, software WebGL):** with WebGL disabled (static cards) the homepage scores 100 (LCP 0.9 s, TBT about 50 ms). With the 3D scene it scores 73-91; LCP and CLS are unchanged and the whole difference is Total Blocking Time (about 380-1,550 ms) from scene start-up, which is inflated by software rendering. Re-measure on real hardware. An `requestIdleCallback` start was tried and made no difference, so it was not kept.

## Fallbacks

`StaticFallback` is used for: `prefers-reduced-motion`, no WebGL, a WebGL context lost mid-visit, and the server render. All stop text is in the DOM in every mode. Inactive panels in the pinned mode are `inert` and `aria-hidden` (a live region announces the current stop).

## Gotchas

- **The road loop must stay in front of the bay.** Order from the towers outward is plaza → bus bay → road. An earlier layout ran the road through the plaza and buses drove through pedestrians. After any layout change, check that no walker's path intersects a bus footprint.
- **Lost context:** drawing against a lost WebGL context throws and used to unmount the whole page. The render loop is stopped on `webglcontextlost` and `SceneBoundary` catches the rest. Keep both.
- **`PCFSoftShadowMap` is removed in this three.js;** the canvas uses `shadows="percentage"`.
- Camera poses are framed for landscape; `CameraRig` pulls the camera back in portrait.

## Not done / open

- Bloom, stars, street lamps and soft bus headlight beams were deliberately left out.
- Not tested on real GPUs, real phones, Safari, Firefox or Edge. Lighthouse not yet compared with the old homepage.
- Stats (25,000 passengers, 6,200 meals, 500 vehicles) and all 8 headlines are placeholders pending company approval.
