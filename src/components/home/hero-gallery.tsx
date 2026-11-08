"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";

/**
 * Parallax photo wall behind the hero. Four columns of sector photography drift at different speeds
 * (and in opposing directions) as you scroll down the (several screens tall) hero, so the background feels layered
 * without a single line of WebGL. Decorative only: hidden from assistive tech, and static under
 * reduced motion.
 *
 * Pattern adapted from Skiper UI's "Parallax 002" (itself inspired by siena.film), rebuilt on this
 * site's `motion` package with next/image and the company's own sector photos. The page's existing
 * scroll setup is untouched, so no second smooth-scroll loop is added.
 */
// Company photography from /public. (The files are .jpg on disk, except career.jpeg.)
const photos = [
  "/career.jpeg",
  "/meeting.jpg",
  "/working_in_office.jpg",
  "/ets_bus.jpg",
  "/supply_chain.jpg",
  "/food_facility.jpg",
  "/ifm.jpg",
  "/logo.jpg",
];

// The hero is several screens tall, so each column holds enough photos to cover it. Photos are
// staggered per column (each column starts at a different point in the list) so neighbours never repeat side by side.
const PER_COLUMN = 14;
const columns = [
  { start: 0, travel: ["0%", "-22%"], className: "" },
  { start: 2, travel: ["-26%", "0%"], className: "" },
  { start: 4, travel: ["0%", "-30%"], className: "hidden md:flex" },
  { start: 6, travel: ["-20%", "0%"], className: "hidden md:flex" },
] as const;

function Column({
  indexes,
  travel,
  progress,
  className,
}: {
  indexes: readonly number[];
  travel: readonly [string, string];
  progress: MotionValue<number>;
  className: string;
}) {
  const reduced = useReducedMotion();
  const y = useTransform(
    progress,
    [0, 1],
    reduced ? [travel[0], travel[0]] : [...travel],
  );
  return (
    <motion.div
      style={{ y }}
      className={`-mt-[8%] flex w-1/2 flex-col gap-[2vw] will-change-transform md:w-1/4 ${className}`}
    >
      {indexes.map((i, row) => (
        <div
          key={row}
          className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-line"
        >
          <Image
            src={photos[i % photos.length]}
            alt=""
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="pointer-events-none object-cover"
          />
        </div>
      ))}
    </motion.div>
  );
}

export function HeroGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute inset-0 -z-30 flex gap-[2vw] overflow-hidden p-[2vw]"
    >
      {columns.map((column, i) => (
        <Column
          key={i}
          indexes={Array.from(
            { length: PER_COLUMN },
            (_, k) => column.start + k,
          )}
          travel={column.travel}
          progress={scrollYProgress}
          className={column.className}
        />
      ))}
    </div>
  );
}
