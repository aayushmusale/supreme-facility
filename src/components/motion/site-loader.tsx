"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/motion/gsap";
import { SupremeBus } from "@/components/home/journey/bus";
import { company } from "@/content/site";

/**
 * The Supreme curtain: one overlay used for both the first load and every page-to-page move.
 *
 *  - First load: the maroon curtain is in the server HTML, so it is there from the very first paint
 *    (no flash of unstyled page). A Supreme bus drives along a road line while a counter climbs; the
 *    run is held until the browser's own `load` event (or a 3.5 s ceiling) and lasts at least 1.5 s,
 *    then the curtain lifts away upward.
 *  - Navigation: clicking an internal link raises the curtain from the bottom while Next fetches the
 *    next route; once the new pathname is in (and the curtain has been seen for ~0.9 s), it lifts.
 *
 * It never gates real content: the page underneath is rendered and hydrating the whole time. Only
 * `clip-path` and `transform` animate (compositor-friendly), the bus is inline SVG (no request), and
 * `prefers-reduced-motion` visitors get no curtain at all. If the script fails, the CSS fallback in
 * globals.css (`animate-loader-fallback`) removes the first-load overlay by itself after 4.5 s.
 */

const SHOWN = "inset(0% 0% 0% 0%)";
const BELOW = "inset(100% 0% 0% 0%)";
const ABOVE = "inset(0% 0% 100% 0%)";
const MIN_COVER_MS = 900;

type Mode = "boot" | "idle" | "cover";

export function SiteLoader() {
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const bus = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(true);

  const s = useRef({
    mode: "boot" as Mode,
    p: { v: 0 },
    tween: null as gsap.core.Tween | null,
    covered: false,
    arrived: false,
    startedAt: 0,
    timers: [] as number[],
  });

  const paint = () => {
    const v = s.current.p.v;
    if (num.current) num.current.textContent = String(Math.round(v)).padStart(2, "0");
    if (fill.current) fill.current.style.transform = `scaleX(${v / 100})`;
    if (bus.current) bus.current.style.left = `${v}%`;
  };

  const climb = (to: number, duration: number, ease = "power2.out", onComplete?: () => void) => {
    s.current.tween?.kill();
    s.current.tween = gsap.to(s.current.p, { v: to, duration, ease, onUpdate: paint, onComplete });
  };

  const hide = () => {
    if (!root.current) return;
    gsap.set(root.current, { autoAlpha: 0, pointerEvents: "none" });
    s.current.mode = "idle";
    s.current.covered = false;
    s.current.arrived = false;
    setFallback(false);
  };

  /** Fill to 100, then lift the curtain upward. */
  const lift = () => {
    climb(100, 0.35, "power1.out", () => {
      gsap.to(root.current, { clipPath: ABOVE, duration: 0.85, ease: "power4.inOut", delay: 0.12, onComplete: hide });
    });
  };

  /** Lift once the curtain is fully up, the new route is in, and the curtain has been on screen long enough to be seen. */
  const settle = () => {
    const state = s.current;
    if (state.mode !== "cover" || !state.covered || !state.arrived) return;
    const wait = Math.max(0, MIN_COVER_MS - (performance.now() - state.startedAt));
    state.timers.push(window.setTimeout(lift, wait));
  };

  // First load.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const state = s.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Already hidden by html[data-skip-loader] (see layout.tsx); nothing to play.
      state.mode = "idle";
      return;
    }
    gsap.set(el, { clipPath: SHOWN });
    gsap.fromTo(logo.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" });
    climb(88, 1.5, "power2.out");

    const ready = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else {
        window.addEventListener("load", () => resolve(), { once: true });
        state.timers.push(window.setTimeout(resolve, 3500));
      }
    });
    const minimum = new Promise<void>((resolve) => state.timers.push(window.setTimeout(resolve, 1500)));
    Promise.all([ready, minimum]).then(lift);

    return () => {
      state.tween?.kill();
      state.timers.forEach(window.clearTimeout);
      gsap.killTweensOf(el);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Raise the curtain when an internal link is clicked.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const state = s.current;

    const onClick = (e: MouseEvent) => {
      if (state.mode !== "idle" || e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      state.mode = "cover";
      state.covered = false;
      state.arrived = false;
      state.startedAt = performance.now();
      state.p.v = 0;
      paint();
      setFallback(false);
      gsap.killTweensOf(root.current);
      gsap.set(root.current, { autoAlpha: 1, pointerEvents: "auto", clipPath: BELOW });
      gsap.set(logo.current, { autoAlpha: 1, y: 0 });
      gsap.to(root.current, {
        clipPath: SHOWN,
        duration: 0.55,
        ease: "power3.inOut",
        onComplete: () => {
          state.covered = true;
          settle();
        },
      });
      climb(86, 1.8, "power2.out");
      // Safety net: never trap the visitor if the route never changes (cancelled or failed navigation).
      state.timers.push(window.setTimeout(() => {
        if (state.mode === "cover") {
          state.arrived = true;
          state.covered = true;
          lift();
        }
      }, 6000));
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The new route has arrived.
  useEffect(() => {
    const state = s.current;
    if (state.mode !== "cover") return;
    state.arrived = true;
    settle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      ref={root}
      id="site-loader"
      aria-hidden="true"
      className={`theme-dark fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-oxblood text-white ${fallback ? "animate-loader-fallback" : ""}`}
    >
      {/* soft light and a faint road-grid, so the maroon has depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_42%,rgb(255_255_255/0.1),transparent_70%)]" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="relative flex w-[min(34rem,84vw)] flex-col items-center gap-9">
        <div ref={logo} className="flex flex-col items-center gap-4 opacity-0">
          <div className="rounded-2xl bg-white px-5 py-3 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.6)]">
            <Image src={company.logo} alt="" width={220} height={46} priority className="h-8 w-auto sm:h-9" />
          </div>
          <p className="text-center text-[0.66rem] font-medium tracking-[0.24em] text-balance text-white/70 uppercase sm:text-[0.7rem] sm:tracking-[0.3em]">{company.tagline}</p>
        </div>

        <div className="w-full">
          {/* the road, and the bus that drives it as the counter climbs */}
          <div className="relative h-[3.6rem]">
            <div ref={bus} className="absolute bottom-[0.55rem] left-0 w-[5.5rem] -translate-x-1/2 will-change-[left]">
              <SupremeBus className="block h-auto w-full drop-shadow-[0_8px_10px_rgb(0_0_0/0.35)]" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-white/20" />
            <div ref={fill} className="absolute inset-x-0 bottom-0 h-[3px] origin-left rounded-full bg-gold" style={{ transform: "scaleX(0)" }} />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-[0.7rem] font-medium tracking-[0.3em] text-white/60 uppercase">Loading</span>
            <span className="font-display text-3xl font-semibold tracking-[-0.03em] text-white tabular-nums">
              <span ref={num}>00</span>
              <span className="ml-0.5 text-base text-gold">%</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
