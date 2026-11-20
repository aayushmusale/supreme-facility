import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { HeroSlideshow } from "@/components/home/hero-slideshow";
import { Archivo_Black } from "next/font/google";

// A static (non-variable) face: variable fonts carry overlapping contours that show up as stray
// inner lines when the letters are outlined with a text stroke.
const headline = Archivo_Black({ weight: "400", subsets: ["latin"], display: "swap" });

/**
 * Full-screen banner hero: the company's own photograph behind a headline set in two registers.
 * "Supreme Operational" is solid gold; "Excellence Model" is hollow, outlined in white, so the
 * photograph reads through the letters. A centred scroll button at the bottom jumps to the next section.
 */
export function BannerHero({ nextId = "company-intro" }: { nextId?: string }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-oxblood text-white"
    >
      <HeroSlideshow />
      {/* Even scrim so white outlined letters hold their edge on any part of the photo. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/55" />

      <div className="container-page flex flex-1 flex-col justify-center pt-28 pb-32 max-lg:pb-44 md:pt-32">
        <p className="font-display text-base font-medium tracking-[0.04em] text-white/90 sm:text-lg md:text-xl">
          Delivering Excellence Since 1983
        </p>
        <h1
          id="hero-title"
          className={`${headline.className} mt-4 text-[clamp(2.1rem,7.4vw,6.75rem)] leading-[1.02] tracking-[-0.01em] uppercase`}
        >
          <span className="block text-[#85182a] md:inline">Supreme Operational</span>{" "}
          <span className="block text-transparent [-webkit-text-stroke:1.5px_white] md:inline md:[-webkit-text-stroke:2px_white]">
            Excellence Model
          </span>
        </h1>
        <p className="mt-6 max-w-[38rem] text-base leading-relaxed text-pretty text-white/90 md:text-lg">
          Integrated facility management, supply chain, employee transportation, corporate food and production
          support, run by one partner across India.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/contact-us/#enquiry" variant="light" size="lg">
            Request a quote
            <ArrowUpRight aria-hidden className="size-4" />
          </ButtonLink>
          <ButtonLink href="/services/" variant="outline-light" size="lg">
            Our services
          </ButtonLink>
        </div>
      </div>

      <a
        href={`#${nextId}`}
        aria-label="Scroll down to the next section"
        className="group absolute inset-x-0 bottom-8 max-lg:bottom-28 max-[24rem]:hidden mx-auto flex w-fit flex-col items-center gap-3 rounded-full px-4 py-2 text-white/85 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:bottom-10"
      >
        <span className="text-xs font-medium tracking-[0.24em] uppercase">Scroll</span>
        <span className="flex size-11 items-center justify-center rounded-full border border-white/60 transition-colors duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
          <ArrowDown aria-hidden className="size-5 animate-bounce" />
        </span>
      </a>
    </section>
  );
}
