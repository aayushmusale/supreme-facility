"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";

const SLIDES = ["/ETS.jpeg", "/Hospitality.jpeg", "/ifm.jpg", "/meeting.jpg", "/supply_chain.jpg"];

/** How long each photograph stays still, then how long the slide to the next one takes. */
const HOLD_MS = 2000;
const SLIDE_MS = 800;

// The strip is the five photographs plus a copy of the first, so the last slide moves left onto
// the first one and the loop never visibly rewinds.
const STRIP = [...SLIDES, SLIDES[0]];
const LAST = STRIP.length - 1;

/**
 * Full-bleed background that auto-scrolls left through the company's photographs: each one holds
 * for three seconds, then the strip slides to the next. With reduced motion the first photograph
 * stays still. Purely decorative, so the images carry no alt text.
 */
export function HeroSlideshow() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  // Only the first photograph is needed at load. The rest are fetched once the page has settled, so
  // they never compete with it (or the headline) for bandwidth. The first slide change is at least
  // HOLD_MS away, which is well after this.
  const [rest, setRest] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const t = window.setTimeout(() => setRest(true), 1200);
    return () => window.clearTimeout(t);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;

    // Count the slide time on top of the hold, so each photograph is still for the full three seconds.
    const timer = window.setTimeout(
      () => {
        if (index < LAST) {
          setIndex(index + 1);
          return;
        }
        // On the copy of the first photograph, which has just held for its full time: jump back to the
        // real one with no transition (it looks identical), then, once the jump has painted, turn the
        // transition back on and slide on to the second photograph, so the first is not shown twice.
        setAnimate(false);
        setIndex(0);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            setAnimate(true);
            setIndex(1);
          }),
        );
      },
      HOLD_MS + SLIDE_MS,
    );

    return () => window.clearTimeout(timer);
  }, [index, animate, reduced]);

  // Back to the first photograph if motion is switched off while the strip is mid-way.
  const shown = reduced ? 0 : index;

  return (
    <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
      <div
        className="flex h-full will-change-transform"
        style={{
          transform: `translate3d(-${shown * 100}%, 0, 0)`,
          transition: animate && !reduced ? `transform ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)` : "none",
        }}
      >
        {STRIP.map((src, i) => (
          <div key={`${src}-${i}`} className="relative h-full w-full shrink-0">
            {(i === 0 || rest) && (
              <Image
                src={src}
                alt=""
                fill
                sizes="100vw"
                priority={i === 0}
                loading={i === 0 ? undefined : "eager"}
                fetchPriority={i === 0 ? "high" : "low"}
                className="object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
