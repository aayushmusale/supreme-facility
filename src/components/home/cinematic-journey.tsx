"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { ArrowUpRight, Eye, HandCoins, ShieldCheck } from "lucide-react";
import type * as THREE from "three";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { ButtonLink } from "@/components/ui/button";
import { company, services, servicesIntro, stats, valueProposition } from "@/content/site";
import { JOURNEY_KEYFRAMES, type CameraDriverState } from "@/components/three/journey-keyframes";

// Dynamic + ssr:false: this is the one heavy chunk (three.js/R3F) in the whole journey;
// everything else in this file is plain DOM/GSAP, so only this import pulls in the 3D bundle.
const BuildingScene = dynamic(() => import("@/components/three/building-scene"), { ssr: false });

const valueIcons = [Eye, ShieldCheck, HandCoins];
const operationsStats = stats.filter((stat) =>
  ["States", "Clients Served", "Vehicle Fleet", "Employees"].includes(stat.label),
);

const [heroKeyframe, approach, entry, servicesKf, operations, handoff] = JOURNEY_KEYFRAMES;

/**
 * The scroll-driven homepage opening: Hero → Approach → Entry → Services →
 * Operations → Handoff, as one continuous camera move through the existing
 * building scene, with text panels staged at each beat. Desktop + motion +
 * WebGL only — see hero.tsx, which renders SimpleHero (the already-approved,
 * static version) for every other visitor, so no one is forced through a
 * long pinned sequence who can't comfortably use it.
 *
 * Mechanics: the "pin" is plain CSS `position: sticky` (not GSAP's own pin),
 * which is simpler and more robust for a single full-viewport pin like this
 * — no pin-spacer, nothing for a resize to get wrong. ScrollTrigger is used
 * purely to turn scroll position through the tall track into a 0→1 progress
 * value (`scrub`), which drives ONE GSAP timeline controlling the camera (via
 * a plain ref object read every frame inside the Canvas — see
 * building-scene.tsx's `driver` prop) and every text panel's fade, together,
 * so they move as one choreographed sequence rather than separate effects.
 * `scrub` ties animation 1:1 to the user's own scroll input in both
 * directions — nothing is forced to play out on a timer, so this isn't
 * scroll-hijacking: scrolling fast moves through it fast, and scrolling back
 * up reverses it exactly, with no special-casing needed.
 */
export function CinematicJourney() {
  const trackRef = useRef<HTMLDivElement>(null);
  const heroPanelRef = useRef<HTMLDivElement>(null);
  const approachPanelRef = useRef<HTMLDivElement>(null);
  const entryPanelRef = useRef<HTMLDivElement>(null);
  const servicesPanelRef = useRef<HTMLDivElement>(null);
  const operationsPanelRef = useRef<HTMLDivElement>(null);

  // Plain object, not React state: useFrame inside the Canvas reads this every frame.
  // Using state here would mean a React re-render on every scroll tick — exactly what
  // the project's own performance rules say to avoid.
  const cameraDriver = useRef<CameraDriverState>({ ...heroKeyframe });
  const windowMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  // Derived from gsap.timeline()'s own return type rather than referencing gsap's
  // namespace types directly, which keeps this correct regardless of exactly how
  // the installed gsap version's type definitions are structured.
  const timelineRef = useRef<ReturnType<typeof gsap.timeline> | null>(null);

  useGSAP(
    () => {
      if (!trackRef.current) return;

      const toVars = (kf: CameraDriverState) => ({
        x: kf.x,
        y: kf.y,
        z: kf.z,
        lookX: kf.lookX,
        lookY: kf.lookY,
        lookZ: kf.lookZ,
        // Linear within each scrubbed segment — scrub itself supplies the feel of easing;
        // a non-linear ease here can feel like a stutter if the user reverses mid-segment.
        ease: "none",
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      timelineRef.current = timeline;

      // Camera: five segments, each a fraction of the 0–1 scrubbed range.
      timeline
        .to(cameraDriver.current, { ...toVars(approach), duration: 0.22 }, 0)
        .to(cameraDriver.current, { ...toVars(entry), duration: 0.2 }, 0.22)
        .to(cameraDriver.current, { ...toVars(servicesKf), duration: 0.2 }, 0.42)
        .to(cameraDriver.current, { ...toVars(operations), duration: 0.2 }, 0.62)
        .to(cameraDriver.current, { ...toVars(handoff), duration: 0.18 }, 0.82);

      // Text panels, positioned on the SAME timeline so they're locked to the camera beats.
      timeline
        .to(heroPanelRef.current, { opacity: 0, duration: 0.08 }, 0)
        .set(heroPanelRef.current, { pointerEvents: "none" }, 0.08)
        .fromTo(approachPanelRef.current, { opacity: 0 }, { opacity: 1, duration: 0.06 }, 0.14)
        .to(approachPanelRef.current, { opacity: 0, duration: 0.06 }, 0.3)
        .fromTo(entryPanelRef.current, { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.38)
        .to(entryPanelRef.current, { opacity: 0, duration: 0.05 }, 0.54)
        .fromTo(servicesPanelRef.current, { opacity: 0 }, { opacity: 1, duration: 0.06 }, 0.6)
        .to(servicesPanelRef.current, { opacity: 0, duration: 0.06 }, 0.78)
        .fromTo(operationsPanelRef.current, { opacity: 0 }, { opacity: 1, duration: 0.06 }, 0.8)
        .to(operationsPanelRef.current, { opacity: 0, duration: 0.04 }, 0.96);

      return () => {
        timelineRef.current = null;
      };
    },
    { scope: trackRef },
  );

  // The window-light material is created inside the Canvas, asynchronously relative to
  // this component's own mount — so its "operations" light-up tween is added to the
  // already-running timeline once it becomes available, rather than required up front.
  const handleWindowMaterialReady = (material: THREE.MeshStandardMaterial) => {
    windowMaterialRef.current = material;
    const timeline = timelineRef.current;
    if (!timeline) return;
    timeline
      .to(material, { emissiveIntensity: 2.2, duration: 0.15, ease: "none" }, 0.75)
      .to(material, { emissiveIntensity: 1.3, duration: 0.15, ease: "none" }, 0.95);
  };

  return (
    // ~5.5 screens of scroll "runway" for five camera moves (~1.1 screens each) — long enough to
    // feel deliberate, short enough not to feel like a trap. Tune after visual review.
    <div ref={trackRef} className="relative h-[550vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div aria-hidden className="absolute inset-0">
          <BuildingScene driver={cameraDriver} onWindowMaterialReady={handleWindowMaterialReady} />
        </div>
        {/* Unifying tint over the canvas across the whole sequence — same treatment the simple hero uses. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-oxblood/35 from-0% via-transparent via-40% to-oxblood/70 to-100%"
        />

        <div className="relative z-10 flex h-full items-center">
          <div className="container-page">
            {/* HERO */}
            <div ref={heroPanelRef} className="max-w-xl">
              <p className="font-medium text-gold">{company.tagline}</p>
              <h1 className="mt-5 font-display text-display font-semibold tracking-[-0.035em] text-balance text-white">
                Delivering excellence through the Supreme Operational Excellence Model
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-white/75">
                Integrated facility management, supply chain, employee transportation, corporate food and
                production support services for businesses across 14+ states in India.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="#services" variant="light" size="lg">
                  Explore our services
                </ButtonLink>
                <ButtonLink href="/contact-us/#enquiry" variant="outline-light" size="lg">
                  Request a quote
                  <ArrowUpRight aria-hidden className="size-4" />
                </ButtonLink>
              </div>
            </div>

            {/* APPROACH */}
            <div ref={approachPanelRef} className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-0">
              <div className="container-page">
                <div className="max-w-md">
                  <p className="text-sm font-medium tracking-[0.2em] text-gold uppercase">What we stand for</p>
                  <ul className="mt-5 space-y-3">
                    {valueProposition.map((item) => (
                      <li key={item} className="font-display text-2xl font-semibold text-white md:text-3xl">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* ENTRY — deliberately minimal: this beat is carried by the camera move, not text. */}
            <div ref={entryPanelRef} className="pointer-events-none absolute inset-x-0 bottom-16 opacity-0">
              <div className="container-page">
                <p className="font-display text-xl font-medium text-white/85">{company.tagline}</p>
              </div>
            </div>

            {/* SERVICES */}
            <div ref={servicesPanelRef} className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-0">
              <div className="container-page">
                <div className="max-w-lg">
                  <p className="text-sm font-medium tracking-[0.2em] text-gold uppercase">What we do</p>
                  <p className="mt-4 text-xl leading-relaxed text-pretty text-white">{servicesIntro}</p>
                  <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-white/80">
                    {services.map((service) => (
                      <li key={service.href}>{service.title}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* OPERATIONS */}
            <div ref={operationsPanelRef} className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-0">
              <div className="container-page">
                <p className="text-sm font-medium tracking-[0.2em] text-gold uppercase">At scale</p>
                <dl className="mt-5 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
                  {operationsStats.map((stat) => (
                    <div key={stat.label}>
                      <dd className="font-display text-4xl font-semibold text-white md:text-5xl">
                        {stat.value}
                        {stat.suffix}
                      </dd>
                      <dt className="mt-1 text-sm text-white/70">{stat.label}</dt>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
