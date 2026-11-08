"use client";

import dynamic from "next/dynamic";
import { useDesktop } from "@/lib/motion/use-desktop";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";
import { useWebglSupport } from "@/lib/motion/use-webgl-support";

// ssr:false is required here (this file is itself a Client Component, so this is the
// supported place for it) — BuildingScene touches WebGL/window on import and must
// never attempt to run on the server. No loading UI is passed: the existing
// photo + gradient treatment already painted behind this in simple-hero.tsx is the
// fallback, so there's nothing to show while the 3D bundle loads — no blank gap, no spinner.
const BuildingScene = dynamic(() => import("./building-scene"), { ssr: false });

/**
 * Decides whether to render the simple (non-journey) 3D hero scene at all, and
 * only pays for it when the answer is yes. Renders nothing — letting the
 * photo/gradient fallback in simple-hero.tsx show through — unless all three
 * hold: WebGL is supported, the viewport is desktop-width, and motion is
 * allowed. Mobile and reduced-motion visitors never download the three.js/R3F
 * bundle at all, since the dynamic import itself is gated behind this check.
 */
export function HeroCanvas() {
  const reducedMotion = useReducedMotion();
  const webglSupported = useWebglSupport();
  const isDesktop = useDesktop();

  if (reducedMotion || !webglSupported || !isDesktop) return null;

  return <BuildingScene />;
}




// "use client";

// import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";
// import { useReducedMotion } from "@/lib/motion/use-reduced-motion";
// import { useWebglSupport } from "@/lib/motion/use-webgl-support";

// const DESKTOP_QUERY = "(min-width: 1024px)";

// // ssr:false is required here (this file is itself a Client Component, so this is the
// // supported place for it) — BuildingScene touches WebGL/window on import and must
// // never attempt to run on the server. No loading UI is passed: the existing
// // photo + gradient treatment already painted behind this in hero.tsx is the fallback,
// // so there's nothing to show while the 3D bundle loads — no blank gap, no spinner.
// const BuildingScene = dynamic(() => import("../three/building-scene"), { ssr: false });

// /**
//  * Decides whether to render the 3D hero at all, and only pays for it when the
//  * answer is yes. Renders nothing — letting the photo/gradient fallback in
//  * hero.tsx show through — unless all three hold: WebGL is supported, the
//  * viewport is desktop-width, and motion is allowed. Mobile and
//  * reduced-motion visitors never download the three.js/R3F bundle at all,
//  * since the dynamic import itself is gated behind this check.
//  */
// export function HeroCanvas() {
//   const reducedMotion = useReducedMotion();
//   const webglSupported = useWebglSupport();
//   const [isDesktop, setIsDesktop] = useState(false);

//   useEffect(() => {
//     const media = window.matchMedia(DESKTOP_QUERY);
//     setIsDesktop(media.matches);
//     const onChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
//     media.addEventListener("change", onChange);
//     return () => media.removeEventListener("change", onChange);
//   }, []);

//   if (reducedMotion || !webglSupported || !isDesktop) return null;

//   return <BuildingScene />;
// }
