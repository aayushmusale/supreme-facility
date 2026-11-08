"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";
import { useWebglSupport } from "@/lib/motion/use-webgl-support";
import { ButtonLink } from "@/components/ui/button";
import { smooth } from "@/lib/day/activity";
import { detectQuality } from "@/lib/day/quality";
import { activeStopIndex, DAY_STOPS, type DayStop } from "@/lib/day/stops";
import { END_HOUR, formatClock, hourFromProgress, START_HOUR, timeline } from "@/lib/day/timeline";
import { DayCanvas } from "./DayCanvas";
import { SceneBoundary } from "./SceneBoundary";
import { StaticFallback } from "./StaticFallback";

const SHOW_DEBUG = process.env.NODE_ENV !== "production";

// Indian digit grouping (e.g. 25,000 / 1,00,000).
const numberFormat = new Intl.NumberFormat("en-IN");

/** Hours a counter takes to count up after its stop begins. */
const COUNT_HOURS = 1.2;

/**
 * Counter value as a pure function of the hour, so it counts up on the way down and
 * back down on the way up with no tweens to stack or fight. Stat values are [CONFIRM].
 */
function counterText(stop: DayStop, hour: number): string {
  if (!stop.counter) return "";
  const k = smooth((hour - stop.hour) / COUNT_HOURS);
  return numberFormat.format(Math.round(stop.counter.value * k));
}

const stopLeftPercent = (stop: DayStop) => ((stop.hour - START_HOUR) / (END_HOUR - START_HOUR)) * 100;

/**
 * "The 24-Hour Campus": scroll position = time of day (5 AM → midnight).
 *
 * Pin mechanics follow the repo's existing pattern: plain CSS `position: sticky`
 * inside a tall track (no GSAP pin-spacer), with ScrollTrigger used only to turn
 * scroll position into a 0→1 `progress`. That value goes into the shared
 * `timeline` object (read by the 3D scene each frame) and straight into DOM text
 * and transforms via refs (clock, counters, timeline bar); React state changes only
 * when the active stop index changes.
 *
 * Reduced-motion / no-WebGL visitors (and the server render, since both hooks
 * default to "off") get StaticFallback: the same stops as a plain list with poster
 * cards. So does anyone whose browser drops the WebGL context mid-visit. All stop text
 * is in the DOM in every mode.
 */
export function DaySection() {
  const reducedMotion = useReducedMotion();
  const webglSupported = useWebglSupport();
  const [contextLost, setContextLost] = useState(false);
  const animated = !reducedMotion && webglSupported && !contextLost;

  return animated ? <PinnedDay onContextLost={() => setContextLost(true)} /> : <StaticFallback />;
}

function PinnedDay({ onContextLost }: { onContextLost: () => void }) {
  // PinnedDay only ever mounts on the client (the server and first client render show the static
  // version), so reading navigator/window in a lazy initializer cannot cause a hydration mismatch.
  const [quality] = useState(detectQuality);
  const trackRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const hourRef = useRef<HTMLSpanElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // Keep the three.js/R3F chunk and the WebGL context out of the page-load critical path (LCP,
  // main thread): the scene mounts ~2.5s after this component does, or sooner if the section
  // scrolls into view. The section starts only ~1 screen below the top, so a distance margin alone
  // can't defer it. It only renders frames while it is on screen. Both flags change on
  // observer/timer edges, never per scroll tick.
  const [near, setNear] = useState(false);
  const [everNear, setEverNear] = useState(false);
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setNear(entry.isIntersecting);
        if (entry.isIntersecting) setEverNear(true);
      },
      { rootMargin: "0px" },
    );
    observer.observe(el);
    const timer = window.setTimeout(() => setEverNear(true), 2500);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const sync = (progress: number) => {
        timeline.progress = progress;
        const hour = hourFromProgress(progress);

        // Everything below writes straight to the DOM: no re-render per scroll tick.
        if (clockRef.current) clockRef.current.textContent = formatClock(hour);
        if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
        for (let i = 0; i < DAY_STOPS.length; i++) {
          const el = counterRefs.current[i];
          if (el) el.textContent = counterText(DAY_STOPS[i], hour);
        }
        if (progressRef.current) progressRef.current.textContent = progress.toFixed(3);
        if (hourRef.current) hourRef.current.textContent = hour.toFixed(2);

        const idx = activeStopIndex(hour);
        setActive((prev) => (prev === idx ? prev : idx));
      };

      const trigger = ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom", // track is 700svh tall -> 600svh of scrolling while pinned
        scrub: true,
        onUpdate: (self) => sync(self.progress),
        onRefresh: (self) => sync(self.progress),
      });
      // Re-sync from the actual scroll position on mount (bfcache, reload mid-page).
      sync(trigger.progress);

      return () => {
        timeline.progress = 0;
      };
    },
    { scope: trackRef },
  );

  const current = DAY_STOPS[active];

  return (
    <>
      <div ref={trackRef} className="relative h-[700svh]" aria-labelledby="day-title" role="region">
        <div className="theme-dark sticky top-0 h-svh overflow-hidden bg-oxblood text-white">
          <div aria-hidden className="absolute inset-0">
            {everNear && (
              <SceneBoundary onError={onContextLost}>
                <DayCanvas quality={quality} active={near} onContextLost={onContextLost} />
              </SceneBoundary>
            )}
          </div>

          <div className="container-page relative flex h-full flex-col justify-between pt-20 pb-28 md:pt-24 md:pb-24">
            {/* Dark pills behind all overlay text so it stays readable (WCAG AA) over any sky colour. */}
            <div className="flex items-start justify-between gap-6">
              <div className="rounded-xl bg-oxblood/90 px-4 py-3">
                <h2 id="day-title" className="font-display text-lg font-semibold md:text-2xl">
                  The 24-hour campus
                </h2>
                <p className="mt-0.5 hidden text-sm text-white/80 sm:block">Scroll to move through one working day.</p>
              </div>
              <a
                href="#day-end"
                className="rounded-full bg-oxblood/90 px-4 py-2 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                Skip animation
              </a>
            </div>

            <div className="relative min-h-52 max-w-xl sm:min-h-64">
              {DAY_STOPS.map((stop, i) => (
                <StopPanel
                  key={stop.id}
                  stop={stop}
                  isActive={i === active}
                  counterRef={(el) => {
                    counterRefs.current[i] = el;
                  }}
                />
              ))}
            </div>
          </div>

          {/* Clock + day timeline. Decorative (the stop panels carry the content). */}
          <div aria-hidden className="container-page absolute inset-x-0 bottom-6">
            <div className="flex items-center gap-4 rounded-xl bg-oxblood/90 px-4 py-3">
              <span ref={clockRef} className="w-24 shrink-0 font-display text-lg font-semibold tabular-nums">
                5:00 AM
              </span>
              <div className="relative h-6 flex-1">
                <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded bg-white/20" />
                <span
                  ref={barRef}
                  className="absolute inset-x-0 top-1/2 h-0.5 origin-left -translate-y-1/2 rounded bg-gold"
                  style={{ transform: "scaleX(0)" }}
                />
                {DAY_STOPS.map((stop, i) => (
                  <span
                    key={stop.id}
                    className={`absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors ${
                      i <= active ? "bg-gold" : "bg-white/35"
                    }`}
                    style={{ left: `${stopLeftPercent(stop)}%` }}
                  />
                ))}
              </div>
              <span className="hidden shrink-0 text-sm text-white/80 sm:block">{current.timeLabel}</span>
            </div>
          </div>

          {/* Announces the current stop to screen readers as it changes while scrolling. */}
          <p aria-live="polite" className="sr-only">
            {current.headline} {current.body}
          </p>

          {SHOW_DEBUG && (
            <div
              aria-hidden
              className="absolute top-1/2 left-4 rounded bg-black/70 px-3 py-2 font-mono text-xs text-white"
            >
              <div>
                progress <span ref={progressRef}>0.000</span> · hour <span ref={hourRef}>5.00</span>
              </div>
              <div>
                {quality} · <span id="day-stats">…</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div id="day-end" />
    </>
  );
}

function Counter({ stop, counterRef }: { stop: DayStop; counterRef?: (el: HTMLSpanElement | null) => void }) {
  if (!stop.counter) return null;
  const { value, suffix, label } = stop.counter;
  return (
    <p className="mt-4 flex items-baseline gap-2">
      {/* Screen readers get the final figure; the animated digits are hidden from them. */}
      <span className="sr-only">
        {numberFormat.format(value)}
        {suffix} {label}
      </span>
      <span aria-hidden className="font-display text-4xl font-semibold text-gold tabular-nums">
        <span ref={counterRef}>{numberFormat.format(value)}</span>
        {suffix}
      </span>
      <span aria-hidden className="text-sm text-white/80">
        {label}
      </span>
    </p>
  );
}

function StopPanel({
  stop,
  isActive,
  counterRef,
}: {
  stop: DayStop;
  isActive: boolean;
  counterRef: (el: HTMLSpanElement | null) => void;
}) {
  return (
    <div
      // Inactive panels stay in the DOM (SEO / crawlers) but are hidden from AT and the tab order.
      aria-hidden={!isActive}
      inert={!isActive}
      className={`absolute inset-x-0 bottom-0 rounded-2xl bg-oxblood/90 p-5 shadow-xl sm:p-6 transition-[opacity,transform] duration-500 ${
        isActive ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <p className="text-sm font-medium text-gold">{stop.service}</p>
      <h3 className="mt-2 font-display text-xl font-semibold sm:text-2xl">{stop.headline}</h3>
      <p className="mt-2 text-sm text-white/90 sm:mt-3 sm:text-base">{stop.body}</p>
      <Counter stop={stop} counterRef={counterRef} />
      {stop.cta && (
        <ButtonLink href={stop.cta.href} variant="light" size="lg" className="mt-5">
          {stop.cta.label}
          <ArrowUpRight aria-hidden className="size-4" />
        </ButtonLink>
      )}
    </div>
  );
}
