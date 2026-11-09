"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { aboutIntro, aboutOverview } from "@/content/about";
import { SceneBoundary } from "@/components/day/SceneBoundary";
import { detectQuality } from "@/lib/day/quality";
import { aboutTimeline, sceneIndex, SCENE_LABELS } from "@/lib/about/path";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { useDesktop } from "@/lib/motion/use-desktop";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";
import { useWebglSupport } from "@/lib/motion/use-webgl-support";
import { cn } from "@/lib/utils";

// ssr:false: the scene touches WebGL on import. It is requested only once the stage is near the
// viewport and WebGL exists, so everyone else never downloads three.js for this section.
const AboutScene = dynamic(() => import("@/components/three/about-scene"), { ssr: false });

/**
 * SPLIT LAYOUT (3D on the left, copy on the right). Kept as a one-line revert for the full-background
 * version in company-intro.tsx: in src/app/page.tsx, import { CompanyIntroSplit as CompanyIntro }
 * from "@/components/home/company-intro-split".
 *
 * Homepage About section: "the Supreme operational universe", a miniature campus that the camera
 * tours as the visitor scrolls, beside the approved company copy.
 *
 *  - Desktop (>= 1024px): a tall track with a sticky stage. Plain CSS sticky, not a GSAP pin, so
 *    normal scrolling is never hijacked; ScrollTrigger only turns scroll position into progress.
 *  - Tablet and phone: normal flow. The scene is lighter and the same camera tour is scrubbed by
 *    the section passing through the viewport.
 *  - Reduced motion: the finished composition, rendered once and held still.
 *  - No WebGL, or the context is lost: the original photograph. All copy is in the DOM regardless.
 */
export function CompanyIntroSplit() {
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

  return (
    <section
      ref={section}
      id="company-intro"
      aria-labelledby="company-intro-title"
      className="bg-stone"
    >
      <div ref={track} className="lg:h-[440svh] motion-reduce:lg:h-auto">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center motion-reduce:lg:relative motion-reduce:lg:h-auto">
          <div className="container-page grid items-center gap-8 py-10 md:grid-cols-2 md:gap-10 lg:gap-16 lg:pt-24 lg:pb-8">
            {/* The stage: poster photograph underneath, the live 3D campus on top once ready */}
            <div
              ref={stage}
              className="relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-[#f7f5f2] md:aspect-[4/5] lg:aspect-auto lg:h-[min(76svh,46rem)]"
            >
              <Image
                src={aboutOverview.image}
                alt={aboutOverview.imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={cn("object-cover transition-opacity duration-700", ready && show3d && "opacity-0")}
              />
              <div aria-hidden className="absolute inset-0">
                {show3d && (
                  <SceneBoundary onError={() => setFailed(true)}>
                    <AboutScene
                      animate={!reduced}
                      lite={lite}
                      active={inView}
                      onReady={() => setReady(true)}
                      onContextLost={() => setFailed(true)}
                    />
                  </SceneBoundary>
                )}
              </div>

              {/* A quiet caption names the operation the camera is on. Decorative: the copy carries the content. */}
              {ready && show3d && !reduced && (
                <p
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute bottom-5 left-5 flex items-center gap-3 rounded-full bg-white/90 py-2 pr-4 pl-3 text-xs font-medium tracking-wide text-ink shadow-[0_8px_24px_-12px_rgb(40_8_16/0.4)] transition-[opacity,transform] duration-500",
                    label ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                  )}
                >
                  <span className="font-display text-brand-700 tabular-nums">0{scene + 1}</span>
                  <span>{label}</span>
                </p>
              )}
            </div>

            <div ref={copy}>
              <p className="text-sm font-medium tracking-[0.2em] text-brand-700 uppercase">About Supreme</p>
              <h2
                id="company-intro-title"
                className="mt-4 font-display text-h2 font-semibold tracking-[-0.03em] text-balance"
              >
                A one-stop partner, built over four decades.
              </h2>
              <p className="mt-5 max-w-[34rem] text-lg leading-[1.7] text-pretty text-ink/80">{aboutIntro}</p>
              <ButtonLink href="/about-us/" variant="outline" className="mt-8">
                About Supreme
                <ArrowUpRight aria-hidden className="size-4" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
