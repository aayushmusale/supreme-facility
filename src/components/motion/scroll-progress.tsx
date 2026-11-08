"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";

/**
 * A thin brand-colored bar at the very top edge of the viewport (y=0),
 * tracking whole-page scroll progress. Sits above the header's own z-index
 * but inside the empty padding the floating header already leaves above its
 * pill (see site-header.tsx: `pt-3` before the bar begins), so it never
 * overlaps nav content or pointer targets.
 *
 * Reuses ScrollTrigger's own optimized scroll listener rather than adding a
 * second one, and writes progress straight to the DOM via gsap.set — not
 * React state — so it updates every scroll frame without a re-render.
 *
 * Hidden entirely under prefers-reduced-motion (it's decorative; the
 * scrollbar already shows progress).
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !barRef.current) return;

      gsap.set(barRef.current, { scaleX: 0 });

      const trigger = ScrollTrigger.create({
        start: 0,
        end: () => Math.max(document.documentElement.scrollHeight - window.innerHeight, 1),
        onUpdate: (self) => gsap.set(barRef.current, { scaleX: self.progress }),
      });

      // A route change can change the page height; recalculate against the new page.
      ScrollTrigger.refresh();

      return () => trigger.kill();
    },
    { dependencies: [reducedMotion, pathname] },
  );

  if (reducedMotion) return null;

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[2px]">
      <div ref={barRef} className="h-full origin-left bg-brand-600" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}



















// "use client";

// import { usePathname } from "next/navigation";
// import { useRef } from "react";
// import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
// import { useReducedMotion } from "@/lib/motion/use-reduced-motion";

// /**
//  * A thin brand-colored bar at the very top edge of the viewport (y=0),
//  * tracking whole-page scroll progress. Sits above the header's own z-index
//  * but inside the empty padding the floating header already leaves above its
//  * pill (see site-header.tsx: `pt-3` before the bar begins), so it never
//  * overlaps nav content or pointer targets.
//  *
//  * Reuses ScrollTrigger's own optimized scroll listener rather than adding a
//  * second one, and writes progress straight to the DOM via gsap.set — not
//  * React state — so it updates every scroll frame without a re-render.
//  *
//  * Hidden entirely under prefers-reduced-motion (it's decorative; the
//  * scrollbar already shows progress).
//  */
// export function ScrollProgress() {
//   const barRef = useRef<HTMLDivElement>(null);
//   const pathname = usePathname();
//   const reducedMotion = useReducedMotion();

//   useGSAP(
//     () => {
//       if (reducedMotion || !barRef.current) return;

//       gsap.set(barRef.current, { scaleX: 0 });

//       const trigger = ScrollTrigger.create({
//         start: 0,
//         end: () => Math.max(document.documentElement.scrollHeight - window.innerHeight, 1),
//         onUpdate: (self) => gsap.set(barRef.current, { scaleX: self.progress }),
//       });

//       // A route change can change the page height; recalculate against the new page.
//       ScrollTrigger.refresh();

//       return () => trigger.kill();
//     },
//     { dependencies: [reducedMotion, pathname] },
//   );

//   if (reducedMotion) return null;

//   return (
//     <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[2px]">
//       <div ref={barRef} className="h-full origin-left bg-brand-600" style={{ transform: "scaleX(0)" }} />
//     </div>
//   );
// }
