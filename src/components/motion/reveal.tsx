"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";

const DIRECTION_SIGN: Record<string, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Which way the content moves in from. "up" = starts below, settles upward. Default "up". */
  direction?: keyof typeof DIRECTION_SIGN;
  /** Travel distance in pixels. Default 16 — restrained on purpose. */
  distance?: number;
  /** Seconds. Default 0.8. */
  duration?: number;
  /** Seconds, before the animation starts. Default 0. */
  delay?: number;
  /** "mount" plays immediately (above-the-fold content like the hero). "scroll" plays once, the first time it enters the viewport. Default "scroll". */
  trigger?: "mount" | "scroll";
  /** ScrollTrigger "start" value, only used when trigger="scroll". Default "top 85%". */
  start?: string;
  /** Seconds between each direct child, if set — animates children individually instead of the whole block at once. */
  stagger?: number;
};

/**
 * Subtle, restrained entrance animation: opacity + a small positional shift,
 * nothing else — no bounce, no scale, no rotation.
 *
 * Children render fully visible in the markup always. The hidden-then-shown
 * state is applied and removed entirely inside this effect, so if JavaScript
 * never runs (or prefers-reduced-motion is on), the content is already there,
 * in its final position, and readable — nothing depends on the animation to
 * be seen.
 */
export function Reveal({
  children,
  className,
  direction = "up",
  distance = 16,
  duration = 0.8,
  delay = 0,
  trigger = "scroll",
  start = "top 85%",
  stagger,
}: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !containerRef.current) return;

      const sign = DIRECTION_SIGN[direction] ?? DIRECTION_SIGN.up;
      const targets =
        typeof stagger === "number"
          ? gsap.utils.toArray<HTMLElement>(containerRef.current.children)
          : containerRef.current;

      gsap.from(targets, {
        autoAlpha: 0,
        x: sign.x ? sign.x * distance : undefined,
        y: sign.y ? sign.y * distance : undefined,
        duration,
        delay,
        ease: "power2.out",
        stagger,
        clearProps: "opacity,visibility,transform",
        ...(trigger === "scroll"
          ? { scrollTrigger: { trigger: containerRef.current, start, once: true } }
          : {}),
      });
    },
    {
      scope: containerRef,
      dependencies: [reducedMotion, direction, distance, duration, delay, trigger, start, stagger],
    },
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

















// "use client";

// import { useRef, type ReactNode } from "react";
// import { gsap, useGSAP } from "@/lib/motion/gsap";
// import { useReducedMotion } from "@/lib/motion/use-reduced-motion";

// const DIRECTION_SIGN: Record<string, { x: number; y: number }> = {
//   up: { x: 0, y: 1 },
//   down: { x: 0, y: -1 },
//   left: { x: 1, y: 0 },
//   right: { x: -1, y: 0 },
//   none: { x: 0, y: 0 },
// };

// type RevealProps = {
//   children: ReactNode;
//   className?: string;
//   /** Which way the content moves in from. "up" = starts below, settles upward. Default "up". */
//   direction?: keyof typeof DIRECTION_SIGN;
//   /** Travel distance in pixels. Default 16 — restrained on purpose. */
//   distance?: number;
//   /** Seconds. Default 0.8. */
//   duration?: number;
//   /** Seconds, before the animation starts. Default 0. */
//   delay?: number;
//   /** "mount" plays immediately (above-the-fold content like the hero). "scroll" plays once, the first time it enters the viewport. Default "scroll". */
//   trigger?: "mount" | "scroll";
//   /** ScrollTrigger "start" value, only used when trigger="scroll". Default "top 85%". */
//   start?: string;
//   /** Seconds between each direct child, if set — animates children individually instead of the whole block at once. */
//   stagger?: number;
// };

// /**
//  * Subtle, restrained entrance animation: opacity + a small positional shift,
//  * nothing else — no bounce, no scale, no rotation.
//  *
//  * Children render fully visible in the markup always. The hidden-then-shown
//  * state is applied and removed entirely inside this effect, so if JavaScript
//  * never runs (or prefers-reduced-motion is on), the content is already there,
//  * in its final position, and readable — nothing depends on the animation to
//  * be seen.
//  */
// export function Reveal({
//   children,
//   className,
//   direction = "up",
//   distance = 16,
//   duration = 0.8,
//   delay = 0,
//   trigger = "scroll",
//   start = "top 85%",
//   stagger,
// }: RevealProps) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const reducedMotion = useReducedMotion();

//   useGSAP(
//     () => {
//       if (reducedMotion || !containerRef.current) return;

//       const sign = DIRECTION_SIGN[direction] ?? DIRECTION_SIGN.up;
//       const targets =
//         typeof stagger === "number"
//           ? gsap.utils.toArray<HTMLElement>(containerRef.current.children)
//           : containerRef.current;

//       gsap.from(targets, {
//         autoAlpha: 0,
//         x: sign.x ? sign.x * distance : undefined,
//         y: sign.y ? sign.y * distance : undefined,
//         duration,
//         delay,
//         ease: "power2.out",
//         stagger,
//         clearProps: "opacity,visibility,transform",
//         ...(trigger === "scroll"
//           ? { scrollTrigger: { trigger: containerRef.current, start, once: true } }
//           : {}),
//       });
//     },
//     {
//       scope: containerRef,
//       dependencies: [reducedMotion, direction, distance, duration, delay, trigger, start, stagger],
//     },
//   );

//   return (
//     <div ref={containerRef} className={className}>
//       {children}
//     </div>
//   );
// }
