"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";
import { company } from "@/content/site";

const SESSION_KEY = "sfm-loader-played";

// Both the SVG viewBox and the bus's CSS offset-path use these exact same coordinates, in a
// fixed 300×140 box (not responsive — deliberately: offset-path's coordinates are plain CSS
// pixels, not percentages, so the box has to be a fixed size for the two to line up).
const ROUTE_D = "M 20 110 C 80 110, 100 30, 150 30 C 200 30, 220 110, 280 110";

function BusIcon() {
  return (
    <svg viewBox="0 0 54 30" className="h-7 w-[3.25rem] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
      <rect x="2" y="6" width="50" height="20" rx="6" fill="var(--color-gold)" />
      <rect x="6" y="10" width="10" height="7" rx="1.5" fill="var(--color-oxblood)" />
      <rect x="19" y="10" width="10" height="7" rx="1.5" fill="var(--color-oxblood)" />
      <rect x="32" y="10" width="10" height="7" rx="1.5" fill="var(--color-oxblood)" />
      {/* Simplified employee silhouettes: just enough suggestion, not a literal illustration. */}
      <circle cx="11" cy="13.5" r="1.6" fill="var(--color-gold)" opacity="0.85" />
      <circle cx="24" cy="13.5" r="1.6" fill="var(--color-gold)" opacity="0.85" />
      <circle cx="37" cy="13.5" r="1.6" fill="var(--color-gold)" opacity="0.85" />
      <circle cx="12" cy="27" r="3.4" fill="var(--color-ink)" />
      <circle cx="42" cy="27" r="3.4" fill="var(--color-ink)" />
    </svg>
  );
}

/**
 * Brief, branded loading sequence: wordmark, then a small bus travelling a
 * curved route that draws itself in as it goes, then a fade into the page —
 * which is already fully server-rendered underneath this the entire time.
 * This component never delays or gates real content; it's a decorative
 * overlay in front of it, nothing more.
 *
 * Shown or skipped entirely is decided BEFORE this component ever runs, by a
 * tiny synchronous inline script in layout.tsx (reduced motion, or already
 * played this tab session) — see the comment there. This component only
 * handles the case where the loader is actually going to play.
 *
 * Reliability: `animate-loader-fallback` (globals.css) is a plain CSS
 * animation on the root element from the very first paint, with a 4.5s
 * delay, that forces the overlay invisible and non-interactive entirely on
 * its own, independent of this component's JavaScript. If the GSAP code
 * below throws or never runs, the page is still guaranteed reachable within
 * 4.5s with no action needed from the visitor.
 */
export function SiteLoader() {
  const reducedMotion = useReducedMotion();
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const busRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef<SVGPathElement>(null);

  const markPlayed = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Storage can be unavailable (private browsing, disabled) — fine either way; worst
      // case the loader plays again next visit. It's brief and never blocks anything.
    }
  };

  useGSAP(
    () => {
      if (reducedMotion) {
        markPlayed();
        setDone(true);
        return;
      }

      try {
        gsap.set(busRef.current, { offsetDistance: "0%" });
        gsap.set(routeRef.current, { strokeDashoffset: 100 });

        gsap
          .timeline({
            defaults: { ease: "power2.out" },
            onComplete: () => {
              markPlayed();
              setDone(true);
            },
          })
          .fromTo(logoRef.current, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5 })
          .to(
            [busRef.current, routeRef.current],
            { duration: 1.1, ease: "power1.inOut", offsetDistance: "100%", strokeDashoffset: 0 },
            "+=0.1",
          )
          .to({}, { duration: 0.25 }) // a brief, deliberate hold before the fade
          .to(rootRef.current, { autoAlpha: 0, duration: 0.4 });
      } catch {
        // If anything above throws — e.g. an unsupported CSS feature on an older browser —
        // fall through immediately rather than leaving the visitor waiting on a broken
        // timeline. (The CSS fallback on the root element would also catch this on its own,
        // at 4.5s; this just makes the common failure case resolve instantly instead.)
        markPlayed();
        setDone(true);
      }
    },
    { dependencies: [reducedMotion] },
  );

  if (done) return null;

  return (
    <div
      ref={rootRef}
      id="site-loader"
      aria-hidden="true"
      className="animate-loader-fallback theme-dark fixed inset-0 z-[100] flex items-center justify-center bg-oxblood"
    >
      <div className="flex flex-col items-center gap-10">
        <div ref={logoRef} className="rounded-xl bg-white px-5 py-3 opacity-0">
          <Image src={company.logo} alt="" width={220} height={46} priority className="h-8 w-auto sm:h-9" />
        </div>

        <div className="relative h-[140px] w-[300px]">
          <svg viewBox="0 0 300 140" className="absolute inset-0 h-full w-full" fill="none">
            <path
              ref={routeRef}
              d={ROUTE_D}
              pathLength={100}
              stroke="var(--color-gold)"
              strokeOpacity={0.55}
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray={100}
            />
          </svg>
          <div ref={busRef} className="absolute top-0 left-0" style={{ offsetPath: `path("${ROUTE_D}")`, offsetRotate: "0deg" }}>
            <BusIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
