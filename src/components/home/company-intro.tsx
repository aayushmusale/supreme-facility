"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { aboutIntro } from "@/content/about";
import { services } from "@/content/site";
import { SceneBoundary } from "@/components/day/SceneBoundary";
import { detectQuality } from "@/lib/day/quality";
import { aboutTimeline, sceneIndex, SCENE_LABELS } from "@/lib/about/path";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { useDesktop } from "@/lib/motion/use-desktop";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";
import { useWebglSupport } from "@/lib/motion/use-webgl-support";
import { cn } from "@/lib/utils";

/** Which service the camera is on in each scene (index into `services`); null = the company as a whole. */
const SCENE_SERVICE = [null, 0, 2, 3, null] as const;

// ssr:false: the scene touches WebGL on import. It is requested only once the stage is near the
// viewport and WebGL exists, so everyone else never downloads three.js for this section.
const AboutScene = dynamic(() => import("@/components/three/about-scene"), { ssr: false });

/**
 * Homepage About section: "the Supreme operational universe", a miniature campus that fills the
 * section background while the camera tours it as the visitor scrolls, with the approved company
 * copy in a card in front.
 *
 * Revert to the earlier split layout (3D left, copy right) with one line in src/app/page.tsx:
 *   import { CompanyIntroSplit as CompanyIntro } from "@/components/home/company-intro-split";
 *
 *  - Desktop (>= 1024px): full-bleed stage behind the copy; a tall track with a sticky panel. Plain CSS sticky, not a GSAP pin, so
 *    normal scrolling is never hijacked; ScrollTrigger only turns scroll position into progress.
 *  - Tablet and phone: stacked (scene, then copy) in normal flow. The scene is lighter and the same camera tour is scrubbed by
 *    the section passing through the viewport.
 *  - Reduced motion: the finished composition, rendered once and held still.
 *  - No WebGL, or the context is lost: the original photograph. All copy is in the DOM regardless.
 */

/** The company introduction: the copy shown before the tour starts, after it ends, and on every device that does not run it. */
function Intro() {
  return (
    <>
      <h2
        id="company-intro-title"
        className="font-display text-h2 font-semibold tracking-[-0.03em] text-balance lg:text-[clamp(2rem,3vw,2.75rem)]"
      >
        A one-stop partner, built over four decades.
      </h2>
      <p className="mt-5 max-w-[34rem] text-lg leading-[1.7] text-pretty text-ink/80 lg:max-w-[28rem] lg:text-base lg:leading-[1.75] lg:text-ink/85">{aboutIntro}</p>
      <ButtonLink href="/about-us/" variant="outline" className="mt-8">
        About Supreme
        <ArrowUpRight aria-hidden className="size-4" />
      </ButtonLink>
    </>
  );
}

/** What the camera is looking at, in words: the approved service summary, plus a link to its page. */
function ServicePanel({ index, service }: { index: number; service: (typeof services)[number] }) {
  const includes = "includes" in service ? service.includes : null;
  return (
    <>
      <p className="text-xs font-semibold tracking-[0.18em] text-brand-700 uppercase tabular-nums">
        0{index + 1} / {service.title}
      </p>
      <h3 className="mt-3 font-display text-[clamp(1.9rem,2.8vw,2.5rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-balance">
        {service.title}
      </h3>
      <p className="mt-5 max-w-[28rem] text-base leading-[1.75] text-pretty text-ink/85">{service.summary}</p>
      {includes && (
        <ul className="mt-5 flex max-w-[28rem] flex-wrap gap-2">
          {includes.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="inline-flex h-8 items-center rounded-full border border-ink/10 bg-white px-3 text-[0.8rem] text-ink transition-colors hover:border-brand-700 hover:text-brand-700">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <ButtonLink href={service.href} variant="outline" className="mt-8">
        Explore {service.title.toLowerCase()}
        <ArrowUpRight aria-hidden className="size-4" />
      </ButtonLink>
    </>
  );
}

export function CompanyIntro() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  const reduced = useReducedMotion();
  const webgl = useWebglSupport();
  const desktop = useDesktop();
  // Only read when the 3D mounts (client-side, after near), so it never affects server markup.
  const [lowPower] = useState(() => typeof window !== "undefined" && detectQuality() === "lite");
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [scene, setScene] = useState(0);

  // Mount the canvas shortly before the stage arrives, and only render frames while it is visible.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      if (reduced || !section.current || !track.current || !stage.current) return;
      const onProgress = (p: number) => {
        aboutTimeline.progress = p;
        const idx = sceneIndex(p);
        setScene((current) => (current === idx ? current : idx));
      };

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const st = ScrollTrigger.create({
          trigger: track.current,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => onProgress(self.progress),
        });
        return () => st.kill();
      });
      mm.add("(max-width: 1023px)", () => {
        const st = ScrollTrigger.create({
          trigger: stage.current,
          start: "top 90%",
          end: "bottom 20%",
          onUpdate: (self) => onProgress(self.progress),
        });
        return () => st.kill();
      });

      // Scene 01: the stage settles into place, then the copy rises in a stagger.
      gsap.from(stage.current, {
        autoAlpha: 0,
        scale: 0.94,
        y: 24,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: section.current, start: "top 75%", once: true },
      });
      gsap.from(copy.current ? Array.from(copy.current.children) : [], {
        autoAlpha: 0,
        y: 22,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.12,
        delay: 0.2,
        scrollTrigger: { trigger: section.current, start: "top 70%", once: true },
      });

      return () => {
        mm.revert();
        aboutTimeline.progress = 0;
      };
    },
    { scope: section, dependencies: [reduced] },
  );

  const show3d = webgl && near && !failed;
  const lite = lowPower || !desktop;
  const label = SCENE_LABELS[scene];
  // The left copy follows the tour only where the scene is pinned beside it (desktop, motion on, 3D running).
  // Everywhere else every service is simply listed under the introduction, so nothing depends on scroll position.
  const interactive = desktop && !reduced && show3d;
  const activeService = interactive ? SCENE_SERVICE[scene] : null;

  return (
    <section
      ref={section}
      id="company-intro"
      aria-labelledby="company-intro-title"
      className="bg-stone"
    >
      <div ref={track} className="lg:h-[440svh] motion-reduce:lg:h-auto">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center motion-reduce:lg:relative motion-reduce:lg:h-auto motion-reduce:lg:min-h-svh">
          <div className="container-page grid items-center gap-8 py-10 md:gap-10 lg:block lg:py-0 lg:pt-16">
            {/* The stage: poster photograph underneath, the live 3D campus on top once ready */}
            <div
              ref={stage}
              className="relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-stone md:aspect-[16/10] lg:absolute lg:inset-0 lg:aspect-auto lg:rounded-none"
            >
              {/* <Image
                src={aboutOverview.image}
                alt={aboutOverview.imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={cn("object-cover transition-opacity duration-700", ready && show3d && "opacity-0")}
              /> */}
              <div aria-hidden className="absolute inset-0">
                {show3d && (
                  <SceneBoundary onError={() => setFailed(true)}>
                    <AboutScene
                      animate={!reduced}
                      lite={lite}
                      shift={desktop ? 0.2 : 0}
                      active={inView}
                      onReady={() => setReady(true)}
                      onContextLost={() => setFailed(true)}
                    />
                  </SceneBoundary>
                )}
              </div>

              {/* Desktop: the page colour fades in from the left, so the copy always has a clean backdrop
                  and the campus is never covered by a box; it simply emerges from the right. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 hidden w-[58%] bg-[linear-gradient(to_right,#f7f5f2_0%,#f7f5f2_68%,rgb(247_245_242/0.75)_82%,rgb(247_245_242/0)_100%)] lg:block"
              />

              {/* On desktop the stage is full-bleed: soften its lower edge into the Services section below. */}
              <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-28 bg-gradient-to-t from-stone to-transparent lg:block" />

              {/* A quiet caption names the operation the camera is on. Decorative: the copy carries the content. */}
              {ready && show3d && !reduced && (
                <p
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute bottom-5 left-5 lg:right-10 lg:bottom-10 lg:left-auto flex items-center gap-3 rounded-full bg-white/90 py-2 pr-4 pl-3 text-xs font-medium tracking-wide text-ink shadow-[0_8px_24px_-12px_rgb(40_8_16/0.4)] transition-[opacity,transform] duration-500",
                    label ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                  )}
                >
                  <span className="font-display text-brand-700 tabular-nums">0{scene + 1}</span>
                  <span>{label}</span>
                </p>
              )}
            </div>

            <div
              ref={copy}
              className="lg:relative lg:z-10 lg:max-w-[30rem]"
            >
              <p className="flex items-center gap-3 text-sm font-medium tracking-[0.2em] text-brand-700 uppercase">
                <span aria-hidden className="h-px w-8 bg-brand-700" />
                About Supreme
              </p>
              {interactive ? (
                <div className="mt-4 grid">
                  {/* One cell, several layers: the section keeps the height of its tallest panel, so nothing jumps. */}
                  <div
                    inert={activeService !== null}
                    className={cn(
                      "col-start-1 row-start-1 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none",
                      activeService === null ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
                    )}
                  >
                    <Intro />
                  </div>
                  {SCENE_SERVICE.map((svc, sceneIdx) =>
                    svc === null ? null : (
                      <div
                        key={svc}
                        inert={activeService !== svc}
                        className={cn(
                          "col-start-1 row-start-1 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none",
                          activeService === svc ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
                        )}
                      >
                        <ServicePanel index={sceneIdx} service={services[svc]} />
                      </div>
                    ),
                  )}
                </div>
              ) : (
                <div className="mt-4">
                  <Intro />
                  <ul className="mt-8 space-y-4 border-t border-line pt-6">
                    {services.map((service) => (
                      <li key={service.href}>
                        <Link href={service.href} className="group block">
                          <span className="flex items-center gap-1.5 font-display text-lg font-semibold tracking-[-0.01em] group-hover:text-brand-700">
                            {service.title}
                            <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                          <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-muted">{service.summary}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
