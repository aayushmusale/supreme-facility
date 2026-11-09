import { Cpu, ShieldCheck, Users, Workflow, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Homepage differentiators as a bento grid: one tall legacy card with a bus render, and four
 * compact cards. Figures (40+ years, 150+ clients, 7+ states, 98% retention) are the same ones
 * on /about-us/ and carry the same pending-confirmation flag in src/content/about.ts.
 */

const features: {
  number: string;
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
  className: string;
}[] = [
  {
    number: "02",
    label: "Our people",
    title: "Experienced & capable team",
    description: "Experience across India's geographies and industry verticals.",
    icon: Users,
    className: "lg:col-span-3",
  },
  {
    number: "03",
    label: "Innovation",
    title: "Technology advantage",
    description: "Real-time tracking, digital solutions and complete data analytics.",
    icon: Cpu,
    className: "lg:col-span-4",
  },
  {
    number: "04",
    label: "Our model",
    title: "Unique business model",
    description: "Client-specific offerings with flexible, activity-based delivery.",
    icon: Workflow,
    className: "lg:col-span-3",
  },
  {
    number: "05",
    label: "Trust & governance",
    title: "Statutory compliance",
    description: "HR support, compliance monitoring and labour-risk mitigation.",
    icon: ShieldCheck,
    className: "lg:col-span-4",
  },
];

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-choose-title" className="section-py">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium tracking-[0.2em] text-brand-700 uppercase">Why Supreme</p>
          <h2 id="why-choose-title" className="mt-4 font-display text-h2 font-semibold tracking-[-0.03em] text-balance">
            What sets us apart
          </h2>
          <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.7] text-muted">
            Built on experience. Powered by people. Driven by technology.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:auto-rows-[13.75rem] lg:grid-cols-12">
          {/* 01: tall legacy card */}
          <Reveal className="md:col-span-2 lg:col-span-5 lg:row-span-2">
            {/*
              Layering: the card clips only its own background layer (rounded corners), so the bus,
              which sits in a separate layer above it, can pop out past the lower and right edges.
            */}
            <article className="group relative isolate h-full min-h-[26rem] rounded-3xl p-7 pb-60 md:p-9 md:pb-9 lg:min-h-0">
              {/* 1 and 2: clipped background and the sweeping maroon road ribbons */}
              <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden rounded-3xl bg-[linear-gradient(155deg,#f9eff1_0%,#f5e9eb_50%,#efdde0_100%)]">
                <svg viewBox="0 0 520 456" preserveAspectRatio="none" className="absolute inset-0 size-full">
                  <defs>
                    <linearGradient id="legacy-ribbon-a" x1="0" y1="1" x2="1" y2="0">
                      <stop offset="0" stopColor="#85182a" stopOpacity="0" />
                      <stop offset="0.45" stopColor="#85182a" stopOpacity="0.16" />
                      <stop offset="1" stopColor="#85182a" stopOpacity="0.05" />
                    </linearGradient>
                    <linearGradient id="legacy-ribbon-b" x1="0" y1="1" x2="1" y2="0">
                      <stop offset="0" stopColor="#a8283d" stopOpacity="0" />
                      <stop offset="0.5" stopColor="#a8283d" stopOpacity="0.11" />
                      <stop offset="1" stopColor="#a8283d" stopOpacity="0.03" />
                    </linearGradient>
                  </defs>
                  <path d="M-20 470 C 130 380, 250 330, 330 250 S 470 110, 560 90 L 560 150 C 480 180, 400 260, 330 330 S 160 470, 60 500 Z" fill="url(#legacy-ribbon-a)" />
                  <path d="M60 500 C 200 440, 300 410, 390 330 S 500 230, 560 215 L 560 262 C 500 280, 450 340, 390 395 S 260 490, 180 510 Z" fill="url(#legacy-ribbon-b)" />
                </svg>
              </div>

              {/* 3: the copy */}
              <div className="relative z-10">
                <p className="text-xs font-semibold tracking-[0.18em] text-brand-700 uppercase">01 / Our legacy</p>
                <h3 className="mt-5 font-display text-3xl font-semibold tracking-[-0.02em] text-balance">
                  A legacy of excellence.
                </h3>
                <div className="mt-10">
                  <span className="font-display text-7xl font-bold tracking-tighter text-brand-700 tabular-nums md:text-8xl">
                    40+
                  </span>
                  <p className="text-lg font-medium">Years of experience</p>
                </div>
                <p className="mt-5 max-w-[13rem] text-sm leading-relaxed text-muted md:max-w-xs lg:max-w-[10.5rem]">
                  150+ clients, 7+ states and a 98% client retention rate.
                </p>
              </div>

              {/* 4 and 5: the Supreme staff bus, a static transparent render in front of everything. On desktop it pops out past the lower edge and slightly past the right edge; below that it stays inside the card. */}
              <div className="pointer-events-none absolute right-2 bottom-3 z-20 w-[17rem] animate-rise transition-transform duration-700 group-hover:-translate-y-1 group-hover:scale-[1.03] md:right-6 md:bottom-4 md:w-[22rem] lg:right-0 lg:-bottom-10 lg:w-[18.5rem]">
                <Image
                  src="/supreme-bus.webp"
                  alt="A Supreme employee transportation bus, cream and blue, with SUPREME on the front"
                  width={963}
                  height={744}
                  sizes="(min-width: 768px) 22rem, 17rem"
                  className="h-auto w-full"
                />
              </div>
            </article>
          </Reveal>

          {/* 02 to 05 */}
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.number} delay={0.05 * (i + 1)} className={cn("h-full", feature.className)}>
                <article className="group relative h-full min-h-[13.75rem] overflow-hidden rounded-3xl border border-line bg-white p-6 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-brand-700 hover:shadow-xl md:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-brand-700 uppercase">
                      {feature.number} / {feature.label}
                    </p>
                    <Icon aria-hidden size={23} strokeWidth={1.5} className="shrink-0 text-brand-700" />
                  </div>

                  <div className="relative z-10 mt-9">
                    <h3 className="font-display text-xl font-semibold tracking-[-0.015em] text-balance">{feature.title}</h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-pretty text-muted">{feature.description}</p>
                  </div>

                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
