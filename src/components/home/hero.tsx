import { SimpleHero } from "./simple-hero";

/**
 * The scroll-driven CinematicJourney was replaced by "The 24-Hour Campus"
 * (components/day/DaySection.tsx), which now sits directly below the hero in
 * page.tsx. The hero itself is just the static, server-rendered SimpleHero.
 */
export function Hero() {
  return <SimpleHero />;
}










// import { HeroCanvas } from "@/components/three/hero-canvas";
// import Image from "next/image";
// import { ArrowUpRight, Eye, HandCoins, ShieldCheck } from "lucide-react";
// import { Reveal } from "@/components/motion/reveal";
// import { ButtonLink } from "@/components/ui/button";
// import { company, valueProposition } from "@/content/site";
// import { PillarRing } from "./pillar-ring";

// const valueIcons = [Eye, ShieldCheck, HandCoins];

// export function Hero() {
//   return (
//     <section aria-labelledby="hero-title" className="theme-dark relative isolate overflow-hidden bg-oxblood text-white">
//       {/* TEMPORARY stock photo: replace with company photography */}
//       <Image
//         src="https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=2200&q=80"
//         alt=""
//         fill
//         priority
//         sizes="100vw"
//         className="-z-30 object-cover opacity-25 mix-blend-luminosity"
//       />
//       <div aria-hidden className="absolute inset-0 -z-30">
//       <HeroCanvas />
//       </div>
//       <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-to-b from-oxblood/55 from-0% via-oxblood/90 via-65% to-oxblood to-100%" />
//       <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_65%)]" />
//       {/* Spotlight (Aceternity-style), gradient only: no blur filter, cheap to paint */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute -top-1/3 -left-1/4 -z-10 h-[150%] w-[95%] -rotate-[24deg] animate-spotlight bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--color-glow)_16%,transparent),transparent_60%)]"
//       />

//       <div className="container-page grid items-center gap-12 pt-32 pb-14 md:pt-40 lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:pb-20">
//         <Reveal trigger="mount" stagger={0.12} duration={0.9}>
//           <p className="font-medium text-gold">{company.tagline}</p>
//           <h1
//             id="hero-title"
//             className="mt-5 font-display text-display font-semibold tracking-[-0.035em] text-balance"
//           >
//             Delivering excellence through the Supreme Operational Excellence Model
//           </h1>
//           <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-white/75">
//             Integrated facility management, supply chain, employee transportation, corporate food and production
//             support services for businesses across 14+ states in India.
//           </p>
//           <div className="mt-9 flex flex-wrap gap-3">
//             <ButtonLink href="#services" variant="light" size="lg">
//               Explore our services
//             </ButtonLink>
//             <ButtonLink href="/contact-us/" variant="outline-light" size="lg">
//               Request a quote
//               <ArrowUpRight aria-hidden className="size-4" />
//             </ButtonLink>
//           </div>
//         </Reveal>

//         <Reveal trigger="mount" delay={0.45} duration={1} direction="none">
//           <PillarRing />
//         </Reveal>
//       </div>

//       {/* Decorative only — purely duplicates native scrollability, so it's hidden from the accessibility tree.
//           Bounce uses Tailwind's built-in animate-bounce, which already respects the sitewide
//           prefers-reduced-motion override in globals.css. Hidden below lg: the hero already wraps
//           taller than one screen on narrow viewports, so a scroll hint there is redundant. */}
//       <div aria-hidden="true" className="absolute inset-x-0 bottom-8 hidden justify-center lg:flex">
//         <div className="flex flex-col items-center gap-2 text-white/60">
//           <span className="text-xs font-medium tracking-[0.2em] uppercase">Scroll</span>
//           <span className="h-8 w-px animate-bounce bg-white/40" />
//         </div>
//       </div>

//       <div className="border-t border-white/10 bg-oxblood/60">
//         <div className="container-page grid gap-6 py-8 md:grid-cols-[auto_1fr_1fr_1fr] md:items-center md:gap-10">
//           <h2 className="font-display text-lg font-semibold text-white/90 md:max-w-[9rem] md:leading-snug">Our value proposition</h2>
//           {valueProposition.map((item, index) => {
//             const Icon = valueIcons[index] ?? Eye;
//             return (
//               <div key={item} className="flex items-center gap-4 md:border-l md:border-white/10 md:pl-8">
//                 <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-gold">
//                   <Icon aria-hidden className="size-5" strokeWidth={1.75} />
//                 </span>
//                 <p className="font-medium text-white">{item}</p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
















// import Image from "next/image";
// import { ArrowUpRight, Eye, HandCoins, ShieldCheck } from "lucide-react";
// import { Reveal } from "@/components/motion/reveal";
// import { ButtonLink } from "@/components/ui/button";
// import { company, valueProposition } from "@/content/site";
// import { PillarRing } from "./pillar-ring";

// const valueIcons = [Eye, ShieldCheck, HandCoins];

// export function Hero() {
//   return (
//     <section aria-labelledby="hero-title" className="theme-dark relative isolate overflow-hidden bg-oxblood text-white">
//       {/* TEMPORARY stock photo: replace with company photography */}
//       <Image
//         src="https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=2200&q=80"
//         alt=""
//         fill
//         priority
//         sizes="100vw"
//         className="-z-30 object-cover opacity-25 mix-blend-luminosity"
//       />
//       <div aria-hidden className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgb(42_13_16/0.55)_0%,rgb(42_13_16/0.9)_65%,var(--color-oxblood)_100%)]" />
//       <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_65%)]" />
//       {/* Spotlight (Aceternity-style), gradient only: no blur filter, cheap to paint */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute -top-1/3 -left-1/4 -z-10 h-[150%] w-[95%] -rotate-[24deg] animate-spotlight bg-[radial-gradient(ellipse_at_center,rgb(255_228_200/0.16),transparent_60%)]"
//       />

//       <div className="container-page grid items-center gap-12 pt-32 pb-14 md:pt-40 lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:pb-20">
//         <Reveal trigger="mount" stagger={0.18} duration={1.4} distance={36}>
//           <p className="font-medium text-gold">{company.tagline}</p>
//           <h1
//             id="hero-title"
//             className="mt-5 font-display text-[clamp(2.4rem,5.6vw,4.6rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance"
//           >
//             Delivering excellence through the Supreme Operational Excellence Model
//           </h1>
//           <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-white/75">
//             Integrated facility management, supply chain, employee transportation, corporate food and production
//             support services for businesses across 14+ states in India.
//           </p>
//           <div className="mt-9 flex flex-wrap gap-3">
//             <ButtonLink href="#services" variant="light" size="lg">
//               Explore our services
//             </ButtonLink>
//             <ButtonLink href="/contact-us/" variant="outline-light" size="lg">
//               Request a quote
//               <ArrowUpRight aria-hidden className="size-4" />
//             </ButtonLink>
//           </div>
//         </Reveal>

//         <Reveal trigger="mount" delay={0.6} duration={1.4} direction="none">
//           <PillarRing />
//         </Reveal>
//       </div>

//       {/* Decorative only — purely duplicates native scrollability, so it's hidden from the accessibility tree.
//           Bounce uses Tailwind's built-in animate-bounce, which already respects the sitewide
//           prefers-reduced-motion override in globals.css. Hidden below lg: the hero already wraps
//           taller than one screen on narrow viewports, so a scroll hint there is redundant. */}
//       <div aria-hidden="true" className="absolute inset-x-0 bottom-8 hidden justify-center lg:flex">
//         <div className="flex flex-col items-center gap-2 text-white/60">
//           <span className="text-xs font-medium tracking-[0.2em] uppercase">Scroll</span>
//           <span className="h-8 w-px animate-bounce bg-white/40" />
//         </div>
//       </div>

//       <div className="border-t border-white/10 bg-oxblood/60">
//         <div className="container-page grid gap-6 py-8 md:grid-cols-[auto_1fr_1fr_1fr] md:items-center md:gap-10">
//           <h2 className="font-display text-lg font-semibold text-white/90 md:max-w-[9rem] md:leading-snug">Our value proposition</h2>
//           {valueProposition.map((item, index) => {
//             const Icon = valueIcons[index] ?? Eye;
//             return (
//               <div key={item} className="flex items-center gap-4 md:border-l md:border-white/10 md:pl-8">
//                 <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-gold">
//                   <Icon aria-hidden className="size-5" strokeWidth={1.75} />
//                 </span>
//                 <p className="font-medium text-white">{item}</p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }








// import Image from "next/image";
// import { ArrowUpRight, Eye, HandCoins, ShieldCheck } from "lucide-react";
// import { Reveal } from "@/components/motion/reveal";
// import { ButtonLink } from "@/components/ui/button";
// import { company, valueProposition } from "@/content/site";
// import { PillarRing } from "./pillar-ring";

// const valueIcons = [Eye, ShieldCheck, HandCoins];

// export function Hero() {
//   return (
//     <section aria-labelledby="hero-title" className="theme-dark relative isolate overflow-hidden bg-oxblood text-white">
//       {/* TEMPORARY stock photo: replace with company photography */}
//       <Image
//         src="https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=2200&q=80"
//         alt=""
//         fill
//         priority
//         sizes="100vw"
//         className="-z-30 object-cover opacity-25 mix-blend-luminosity"
//       />
//       <div aria-hidden className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgb(42_13_16/0.55)_0%,rgb(42_13_16/0.9)_65%,var(--color-oxblood)_100%)]" />
//       <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_65%)]" />
//       {/* Spotlight (Aceternity-style), gradient only: no blur filter, cheap to paint */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute -top-1/3 -left-1/4 -z-10 h-[150%] w-[95%] -rotate-[24deg] animate-spotlight bg-[radial-gradient(ellipse_at_center,rgb(255_228_200/0.16),transparent_60%)]"
//       />

//       <div className="container-page grid items-center gap-12 pt-32 pb-14 md:pt-40 lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:pb-20">
//         <Reveal trigger="mount" stagger={0.12} duration={0.9}>
//           <p className="font-medium text-gold">{company.tagline}</p>
//           <h1
//             id="hero-title"
//             className="mt-5 font-display text-[clamp(2.4rem,5.6vw,4.6rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance"
//           >
//             Delivering excellence through the Supreme Operational Excellence Model
//           </h1>
//           <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-white/75">
//             Integrated facility management, supply chain, employee transportation, corporate food and production
//             support services for businesses across 14+ states in India.
//           </p>
//           <div className="mt-9 flex flex-wrap gap-3">
//             <ButtonLink href="#services" variant="light" size="lg">
//               Explore our services
//             </ButtonLink>
//             <ButtonLink href="/contact-us/" variant="outline-light" size="lg">
//               Request a quote
//               <ArrowUpRight aria-hidden className="size-4" />
//             </ButtonLink>
//           </div>
//         </Reveal>

//         <Reveal trigger="mount" delay={0.45} duration={1} direction="none">
//           <PillarRing />
//         </Reveal>
//       </div>

//       {/* Decorative only — purely duplicates native scrollability, so it's hidden from the accessibility tree.
//           Bounce uses Tailwind's built-in animate-bounce, which already respects the sitewide
//           prefers-reduced-motion override in globals.css. Hidden below lg: the hero already wraps
//           taller than one screen on narrow viewports, so a scroll hint there is redundant. */}
//       <div aria-hidden="true" className="absolute inset-x-0 bottom-8 hidden justify-center lg:flex">
//         <div className="flex flex-col items-center gap-2 text-white/60">
//           <span className="text-xs font-medium tracking-[0.2em] uppercase">Scroll</span>
//           <span className="h-8 w-px animate-bounce bg-white/40" />
//         </div>
//       </div>

//       <div className="border-t border-white/10 bg-oxblood/60">
//         <div className="container-page grid gap-6 py-8 md:grid-cols-[auto_1fr_1fr_1fr] md:items-center md:gap-10">
//           <h2 className="font-display text-lg font-semibold text-white/90 md:max-w-[9rem] md:leading-snug">Our value proposition</h2>
//           {valueProposition.map((item, index) => {
//             const Icon = valueIcons[index] ?? Eye;
//             return (
//               <div key={item} className="flex items-center gap-4 md:border-l md:border-white/10 md:pl-8">
//                 <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-gold">
//                   <Icon aria-hidden className="size-5" strokeWidth={1.75} />
//                 </span>
//                 <p className="font-medium text-white">{item}</p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }















// import Image from "next/image";
// import { ArrowUpRight, Eye, HandCoins, ShieldCheck } from "lucide-react";
// import { ButtonLink } from "@/components/ui/button";
// import { company, valueProposition } from "@/content/site";
// import { PillarRing } from "./pillar-ring";

// const valueIcons = [Eye, ShieldCheck, HandCoins];

// export function Hero() {
//   return (
//     <section aria-labelledby="hero-title" className="theme-dark relative isolate overflow-hidden bg-oxblood text-white">
//       {/* TEMPORARY stock photo: replace with company photography */}
//       <Image
//         src="https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=2200&q=80"
//         alt=""
//         fill
//         priority
//         sizes="100vw"
//         className="-z-30 object-cover opacity-25 mix-blend-luminosity"
//       />
//       <div aria-hidden className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgb(42_13_16/0.55)_0%,rgb(42_13_16/0.9)_65%,var(--color-oxblood)_100%)]" />
//       <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_65%)]" />
//       {/* Spotlight (Aceternity-style), gradient only: no blur filter, cheap to paint */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute -top-1/3 -left-1/4 -z-10 h-[150%] w-[95%] -rotate-[24deg] animate-spotlight bg-[radial-gradient(ellipse_at_center,rgb(255_228_200/0.16),transparent_60%)]"
//       />

//       <div className="container-page grid items-center gap-12 pt-32 pb-14 md:pt-40 lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:pb-20">
//         <div>
//           <p className="animate-rise font-medium text-gold">{company.tagline}</p>
//           <h1
//             id="hero-title"
//             className="mt-5 animate-rise font-display text-[clamp(2.4rem,5.6vw,4.6rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance [animation-delay:90ms]"
//           >
//             Delivering excellence through the Supreme Operational Excellence Model
//           </h1>
//           <p className="mt-6 max-w-xl animate-rise text-lg leading-relaxed text-pretty text-white/75 [animation-delay:180ms]">
//             Integrated facility management, supply chain, employee transportation, corporate food and production
//             support services for businesses across 14+ states in India.
//           </p>
//           <div className="mt-9 flex animate-rise flex-wrap gap-3 [animation-delay:260ms]">
//             <ButtonLink href="#services" variant="light" size="lg">
//               Explore our services
//             </ButtonLink>
//             <ButtonLink href="/contact-us/" variant="outline-light" size="lg">
//               Request a quote
//               <ArrowUpRight aria-hidden className="size-4" />
//             </ButtonLink>
//           </div>
//         </div>

//         <div className="animate-rise [animation-delay:340ms]">
//           <PillarRing />
//         </div>
//       </div>

//       <div className="border-t border-white/10 bg-oxblood/60">
//         <div className="container-page grid gap-6 py-8 md:grid-cols-[auto_1fr_1fr_1fr] md:items-center md:gap-10">
//           <h2 className="font-display text-lg font-semibold text-white/90 md:max-w-[9rem] md:leading-snug">Our value proposition</h2>
//           {valueProposition.map((item, index) => {
//             const Icon = valueIcons[index] ?? Eye;
//             return (
//               <div key={item} className="flex items-center gap-4 md:border-l md:border-white/10 md:pl-8">
//                 <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-gold">
//                   <Icon aria-hidden className="size-5" strokeWidth={1.75} />
//                 </span>
//                 <p className="font-medium text-white">{item}</p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
