"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Counter } from "@/components/ui/counter";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";
import { MilestoneArt } from "./journey/art";
import { SupremeBus } from "./journey/bus";
import { figure, LAST, milestones, stopParam, stopX } from "./journey/data";

/**
 * "The Supreme Journey": a Supreme staff bus drives a roadside timeline of seven milestones.
 *
 *  - Desktop (>= 1024px): a tall track with a sticky stage (plain CSS sticky, so scrolling is never
 *    hijacked). ScrollTrigger turns scroll position into one number; `render` moves the bus, spins
 *    the wheels, slides the road and the two skyline layers, and tells React only when the active
 *    milestone changes (never per frame).
 *  - Phone and tablet (< 1024px): a vertical route with a small bus that rides down it as the list
 *    scrolls past, all seven figures visible in normal flow.
 *  - Reduced motion: the same vertical list with a still bus; no scrubbing, figures shown final.
 *
 * Every figure is in the DOM in every mode (the road labels are visually hidden until passed, not
 * removed), so screen readers and no-JS visitors get all seven.
 */

/** Soft two-layer skyline as repeating SVG backgrounds (no image requests). */
const svgUrl = (svg: string) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
const FAR = svgUrl(
  `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="160" viewBox="0 0 640 160"><g fill="#e7dfd8">` +
    `<rect x="0" y="70" width="46" height="90"/><rect x="52" y="40" width="38" height="120"/><rect x="96" y="86" width="60" height="74"/><rect x="164" y="24" width="34" height="136"/><rect x="204" y="62" width="52" height="98"/><rect x="262" y="96" width="70" height="64"/><rect x="340" y="34" width="40" height="126"/><rect x="386" y="78" width="48" height="82"/><rect x="442" y="50" width="36" height="110"/><rect x="484" y="90" width="64" height="70"/><rect x="556" y="58" width="44" height="102"/><rect x="606" y="84" width="34" height="76"/></g></svg>`,
);
const MID = svgUrl(
  `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="90" viewBox="0 0 480 90"><g fill="#dcd2c6">` +
    `<rect x="10" y="44" width="70" height="46" rx="3"/><rect x="150" y="30" width="60" height="60" rx="3"/><rect x="300" y="50" width="84" height="40" rx="3"/></g><g fill="#c7d1bd">` +
    `<circle cx="112" cy="58" r="22"/><rect x="109" y="70" width="6" height="20"/><circle cx="244" cy="62" r="18"/><rect x="241" y="72" width="6" height="18"/><circle cx="420" cy="56" r="24"/><rect x="417" y="70" width="6" height="20"/><circle cx="470" cy="64" r="16"/></g></svg>`,
);
const DASH = "repeating-linear-gradient(90deg, #f3efe8 0 34px, transparent 34px 80px)";

export function Scale() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const busWrap = useRef<HTMLDivElement>(null);
  const busIn = useRef<HTMLDivElement>(null);
  const road = useRef<HTMLDivElement>(null);
  const dashes = useRef<HTMLDivElement>(null);
  const far = useRef<HTMLDivElement>(null);
  const mid = useRef<HTMLDivElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const mBus = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const sceneEl = scene.current;
        const bus = busWrap.current;
        if (!sceneEl || !bus || !track.current) return;
        const wheels = bus.querySelectorAll(".bus-wheel");
        let stageW = 0;
        let busW = 0;
        let lastT = 0;
        let current = 0;

        const measure = () => {
          stageW = sceneEl.clientWidth;
          busW = bus.offsetWidth;
        };
        const render = (p: number) => {
          const t = stopParam(p);
          const dist = t * stageW * 0.8;
          const speed = Math.min(1, Math.abs(t - lastT) * 60);
          lastT = t;
          gsap.set(bus, { x: stopX(t) * stageW - busW / 2, y: Math.sin(dist / 11) * 1.1 * speed });
          const spin = (dist / (busW * 0.047)) * 57.3;
          wheels.forEach((w) => gsap.set(w, { rotation: spin, svgOrigin: `${w.getAttribute("data-cx")} 162` }));
          if (dashes.current) dashes.current.style.backgroundPositionX = `${-dist}px`;
          if (far.current) far.current.style.backgroundPositionX = `${-dist * 0.1}px`;
          if (mid.current) mid.current.style.backgroundPositionX = `${-dist * 0.32}px`;
          if (bar.current) bar.current.style.transform = `scaleX(${t / LAST})`;
          const idx = Math.min(LAST, Math.floor(t + 0.02));
          if (idx !== current) {
            current = idx;
            setActive(idx);
          }
        };

        measure();
        const st = ScrollTrigger.create({
          trigger: track.current,
          start: "top top",
          end: "bottom bottom",
          onRefresh: (self) => {
            measure();
            render(self.progress);
          },
          onUpdate: (self) => render(self.progress),
        });
        render(0);

        // Scene 01: the intro rises in, the road draws itself, the bus drives in from the left.
        const enter = gsap.timeline({ scrollTrigger: { trigger: section.current, start: "top 70%", once: true } });
        enter
          .from(intro.current ? Array.from(intro.current.children) : [], { autoAlpha: 0, y: 22, duration: 0.8, ease: "power2.out", stagger: 0.12 }, 0)
          .from(road.current, { scaleX: 0, transformOrigin: "left center", duration: 1.1, ease: "power2.inOut" }, 0.1)
          .from(sceneEl.querySelectorAll("[data-fade]"), { autoAlpha: 0, duration: 0.9, stagger: 0.05 }, 0.2)
          .from(busIn.current, { x: () => -stageW * 0.6, duration: 1.3, ease: "power3.out" }, 0.3);

        return () => {
          st.kill();
          enter.kill();
          gsap.set([bus, ...wheels], { clearProps: "all" });
        };
      });

      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        const ol = list.current;
        const bus = mBus.current;
        if (!ol || !bus) return;
        const BUS_LEN = 120;
        const st = ScrollTrigger.create({
          trigger: ol,
          start: "top 65%",
          end: "bottom 65%",
          onUpdate: (self) => gsap.set(bus, { y: self.progress * (ol.offsetHeight - BUS_LEN) }),
        });
        return () => {
          st.kill();
          gsap.set(bus, { clearProps: "all" });
        };
      });

      return () => mm.revert();
    },
    { scope: section },
  );

  // The big readout counts up whenever the bus arrives at a new milestone.
  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    const m = milestones[active];
    const state = { v: 0 };
    const tween = gsap.to(state, {
      v: m.value,
      duration: 0.9,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = figure(m, Math.round(state.v));
      },
    });
    el.textContent = figure(m, 0);
    return () => {
      tween.kill();
      el.textContent = figure(m);
    };
  }, [active]);

  const current = milestones[active];

  return (
    <section ref={section} aria-label="Our scale and presence" className="bg-stone">
      {/* ---------------- Desktop: pinned horizontal journey ---------------- */}
      <div ref={track} className="hidden h-[520svh] lg:block lg:motion-reduce:hidden">
        <div className="sticky top-0 h-svh overflow-hidden">
          <div className="container-page relative z-20 flex items-end justify-between gap-10 pt-24">
            <div ref={intro} className="max-w-md">
              <p className="text-sm font-medium tracking-[0.2em] text-brand-700 uppercase">Our scale &amp; presence</p>
              <h2 className="mt-3 font-display text-h2 font-semibold tracking-[-0.03em] text-balance">
                Our Scale and Presence
              </h2>
              <p className="mt-3 max-w-sm text-[1.0625rem] leading-relaxed text-muted">
                Sites, people, vehicles and meals we manage every day for clients across India.
              </p>
              <Link href="/sectors/" className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:underline">
                See the industries we cater to
                <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* The readout: the figure for the stop the bus is at. Decorative; the road labels carry the text. */}
            <div aria-hidden className="w-[min(26rem,40%)] text-right">
              <p className="text-xs font-semibold tracking-[0.2em] text-brand-700 uppercase tabular-nums">
                {String(active + 1).padStart(2, "0")} / {String(milestones.length).padStart(2, "0")} · {current.title}
              </p>
              <p className="mt-2 font-display text-[clamp(3rem,6.4vw,5.5rem)] leading-none font-semibold tracking-[-0.04em] text-brand-700 tabular-nums">
                <span ref={numRef}>{figure(current)}</span>
              </p>
              <p className="mt-2 text-lg font-medium text-ink">{current.label}</p>
              <div className="mt-4 ml-auto h-[3px] w-full overflow-hidden rounded-full bg-black/10">
                <div ref={bar} className="h-full origin-left rounded-full bg-brand-700" style={{ transform: "scaleX(0)" }} />
              </div>
            </div>
          </div>

          <div ref={scene} className="absolute inset-x-0 bottom-0 h-[62%]">
            <div ref={far} data-fade className="absolute inset-x-0 bottom-[50%] h-[44%] bg-repeat-x opacity-80" style={{ backgroundImage: FAR, backgroundSize: "auto 100%", backgroundPosition: "bottom left" }} />
            <div ref={mid} data-fade className="absolute inset-x-0 bottom-[50%] h-[22%] bg-repeat-x" style={{ backgroundImage: MID, backgroundSize: "auto 100%", backgroundPosition: "bottom left" }} />

            {/* ground, kerb, road */}
            <div className="absolute inset-x-0 bottom-0 h-[50%] bg-[#ece6dd]" />
            <div className="absolute inset-x-0 bottom-[48%] h-[2.5%] bg-[#d3cbbf]" />
            <div ref={road} className="absolute inset-x-0 bottom-[24%] h-[24%] bg-[linear-gradient(#4b494d,#37353a)] shadow-[inset_0_6px_8px_-6px_rgb(0_0_0/0.5)]">
              <div ref={dashes} className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 opacity-80" style={{ backgroundImage: DASH }} />
              <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
            </div>

            {/* milestones: art on the roadside, a marker, and a label that appears once the bus has been there */}
            <ol className="absolute inset-0">
              {milestones.map((m, i) => {
                const state = i === active ? "active" : i < active ? "passed" : "upcoming";
                return (
                  <li key={m.index} className="absolute inset-y-0" style={{ left: `${stopX(i) * 100}%` }}>
                    <MilestoneArt
                      art={m.art}
                      className={cn(
                        "absolute bottom-[50.5%] left-0 w-[clamp(5rem,9vw,8.5rem)] -translate-x-1/2 transition-[opacity,transform] duration-700",
                        state === "active" ? "scale-100 opacity-100" : state === "passed" ? "scale-95 opacity-60" : "scale-90 opacity-25",
                      )}
                    />
                    <span
                      aria-hidden
                      className={cn(
                        "absolute bottom-[48%] left-0 size-3 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-[#f7f5f2] transition-[background-color,box-shadow] duration-500",
                        state === "upcoming" ? "bg-[#b9b1a6]" : "bg-brand-700",
                        state === "active" && "shadow-[0_0_0_6px_rgb(133_24_42/0.18)]",
                      )}
                    />
                    <div
                      className={cn(
                        "absolute bottom-[4%] left-0 w-[clamp(6rem,11vw,10rem)] -translate-x-1/2 text-center transition-[opacity,transform] duration-500",
                        state === "upcoming" ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100",
                      )}
                    >
                      <p className={cn("font-display font-semibold tracking-[-0.02em] tabular-nums", state === "active" ? "text-[clamp(1.1rem,1.8vw,1.6rem)] text-brand-700" : "text-[clamp(0.95rem,1.4vw,1.2rem)] text-ink/70")}>
                        {figure(m)}
                      </p>
                      <p className={cn("mt-0.5 text-[0.78rem] leading-snug", state === "active" ? "text-ink" : "text-muted")}>{m.label}</p>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* the bus: outer = scroll position, inner = the entrance from the left */}
            <div ref={busWrap} className="absolute bottom-[26%] left-0 w-[clamp(15rem,23vw,24rem)] will-change-transform">
              <div ref={busIn}>
                <SupremeBus className="block h-auto w-full drop-shadow-[0_10px_8px_rgb(0_0_0/0.18)]" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ---------------- Phone, tablet, reduced motion: vertical route ---------------- */}
      <div className="section-py lg:hidden lg:motion-reduce:block">
        <div className="container-page">
          <p className="text-sm font-medium tracking-[0.2em] text-brand-700 uppercase">Our scale &amp; presence</p>
          <h2 className="mt-3 font-display text-h2 font-semibold tracking-[-0.03em] text-balance">Our Scale and Presence</h2>
          <p className="mt-3 max-w-md text-[1.0625rem] leading-relaxed text-muted">
            Sites, people, vehicles and meals we manage every day for clients across India.
          </p>

          <ol ref={list} className="relative mt-10 pl-[4.5rem] sm:pl-24">
            {/* the route: a vertical road with a dashed centre line */}
            <div aria-hidden className="absolute top-0 bottom-0 left-4 w-5 rounded-full bg-[#3b393d] sm:left-6">
              <div className="absolute inset-y-2 left-1/2 w-[2px] -translate-x-1/2 bg-[repeating-linear-gradient(#f3efe8_0_10px,transparent_10px_22px)] opacity-70" />
            </div>
            <div ref={mBus} aria-hidden className="absolute top-0 left-[2.8rem] z-10 h-[38px] w-[120px] origin-top-left rotate-90 sm:left-[3.3rem] motion-reduce:hidden">
              <SupremeBus className="block h-full w-full" />
            </div>

            {milestones.map((m) => (
              <li key={m.index} className="relative flex items-center gap-4 pb-9 last:pb-0">
                <span aria-hidden className="absolute top-1/2 -left-[2.55rem] size-3 -translate-y-1/2 rounded-full border-2 border-[#f7f5f2] bg-brand-700 sm:-left-[4.1rem]" />
                <MilestoneArt art={m.art} className="hidden h-20 w-24 shrink-0 min-[420px]:block" />
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] text-brand-700 uppercase tabular-nums">
                    {String(m.index + 1).padStart(2, "0")} · {m.title}
                  </p>
                  <p className="mt-1 font-display text-[clamp(2rem,9vw,2.75rem)] leading-none font-semibold tracking-[-0.03em] text-ink">
                    <Counter value={m.value} suffix={m.suffix} />
                    {m.unit}
                  </p>
                  <p className="mt-1 text-sm leading-snug text-muted">{m.label}</p>
                </div>
              </li>
            ))}
          </ol>

          <Link href="/sectors/" className="group mt-10 inline-flex items-center gap-1.5 font-medium text-brand-700 hover:underline">
            See the industries we cater to
            <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
