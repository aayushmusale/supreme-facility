"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";
import { cn } from "@/lib/utils";

type PinnedSectionProps = {
  children: ReactNode;
  /** How long the section stays pinned, as a multiple of the viewport height. 200 = scroll two screens' worth while pinned. Default 200. */
  lengthVh?: number;
  className?: string;
  /** Below this viewport width, the section is never pinned. Default 1024 (Tailwind's `lg`). */
  minDesktopWidth?: number;
};

/**
 * Reusable foundation for a desktop-only pinned scroll sequence: pins
 * `children` in the viewport while the page scrolls through a track
 * `lengthVh` tall, then releases it.
 *
 * NOT wired into any homepage section yet (Milestone 1 scope). Milestone 2's
 * Services/Scale sequences build their own staged timelines on top of this —
 * this component only owns the pinning mechanics, deliberately, so it isn't
 * designed against content it hasn't seen yet.
 *
 * Pins only at >= minDesktopWidth and only when motion is allowed. Below
 * that width, or under prefers-reduced-motion, this is a plain wrapper and
 * children sit in normal document flow — identical content either way, just
 * without the pin.
 */
export function PinnedSection({ children, lengthVh = 200, className, minDesktopWidth = 1024 }: PinnedSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !trackRef.current || !pinRef.current) return;

      const mm = gsap.matchMedia();
      mm.add(`(min-width: ${minDesktopWidth}px)`, () => {
        const trigger = ScrollTrigger.create({
          trigger: trackRef.current,
          pin: pinRef.current,
          start: "top top",
          end: "bottom bottom",
          pinSpacing: true,
        });
        // gsap's own matchMedia cleanup convention: returning a function here
        // is what gets called when this query stops matching or on revert.
        return () => trigger.kill();
      });

      return () => mm.revert();
    },
    { scope: trackRef, dependencies: [reducedMotion, lengthVh, minDesktopWidth] },
  );

  return (
    <div ref={trackRef} className={cn("relative", className)} style={!reducedMotion ? { minHeight: `${lengthVh}vh` } : undefined}>
      <div ref={pinRef} className="overflow-hidden">
        {children}
      </div>
    </div>
  );
}











// "use client";

// import { useRef, type ReactNode } from "react";
// import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
// import { useReducedMotion } from "@/lib/motion/use-reduced-motion";
// import { cn } from "@/lib/utils";

// type PinnedSectionProps = {
//   children: ReactNode;
//   /** How long the section stays pinned, as a multiple of the viewport height. 200 = scroll two screens' worth while pinned. Default 200. */
//   lengthVh?: number;
//   className?: string;
//   /** Below this viewport width, the section is never pinned. Default 1024 (Tailwind's `lg`). */
//   minDesktopWidth?: number;
// };

// /**
//  * Reusable foundation for a desktop-only pinned scroll sequence: pins
//  * `children` in the viewport while the page scrolls through a track
//  * `lengthVh` tall, then releases it.
//  *
//  * NOT wired into any homepage section yet (Milestone 1 scope). Milestone 2's
//  * Services/Scale sequences build their own staged timelines on top of this —
//  * this component only owns the pinning mechanics, deliberately, so it isn't
//  * designed against content it hasn't seen yet.
//  *
//  * Pins only at >= minDesktopWidth and only when motion is allowed. Below
//  * that width, or under prefers-reduced-motion, this is a plain wrapper and
//  * children sit in normal document flow — identical content either way, just
//  * without the pin.
//  */
// export function PinnedSection({ children, lengthVh = 200, className, minDesktopWidth = 1024 }: PinnedSectionProps) {
//   const trackRef = useRef<HTMLDivElement>(null);
//   const pinRef = useRef<HTMLDivElement>(null);
//   const reducedMotion = useReducedMotion();

//   useGSAP(
//     () => {
//       if (reducedMotion || !trackRef.current || !pinRef.current) return;

//       const mm = gsap.matchMedia();
//       mm.add(`(min-width: ${minDesktopWidth}px)`, () => {
//         const trigger = ScrollTrigger.create({
//           trigger: trackRef.current,
//           pin: pinRef.current,
//           start: "top top",
//           end: "bottom bottom",
//           pinSpacing: true,
//         });
//         // gsap's own matchMedia cleanup convention: returning a function here
//         // is what gets called when this query stops matching or on revert.
//         return () => trigger.kill();
//       });

//       return () => mm.revert();
//     },
//     { scope: trackRef, dependencies: [reducedMotion, lengthVh, minDesktopWidth] },
//   );

//   return (
//     <div ref={trackRef} className={cn("relative", className)} style={!reducedMotion ? { minHeight: `${lengthVh}vh` } : undefined}>
//       <div ref={pinRef} className="overflow-hidden">
//         {children}
//       </div>
//     </div>
//   );
// }
