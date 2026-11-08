import { Eye, HandCoins, ShieldCheck } from "lucide-react";
import { valueProposition } from "@/content/site";
import { HeroGallery } from "./hero-gallery";

const valueIcons = [Eye, ShieldCheck, HandCoins];

export function SimpleHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[200svh] flex-col overflow-hidden bg-white text-ink"
    >
      {/* Parallax photo wall, shown clear: no scrim, tint or blend over the photos. The copy sits on
          solid white panels instead, so it stays readable without touching the background. */}
      <HeroGallery />

      {/* The photo wall is the hero: nothing sits in front of it. The h1 stays for screen readers and
          search, and the strip below carries the value proposition. */}
      <h1 id="hero-title" className="sr-only">
        Supreme Facility Management: delivering excellence through the Supreme
        Operational Excellence Model
      </h1>
      {/* <div aria-hidden className="flex-1" />

      <div className="border-t border-ink/10 bg-white">
        <div className="container-page grid gap-6 py-8 md:grid-cols-[auto_1fr_1fr_1fr] md:items-center md:gap-10">
          <h2 className="font-display text-lg font-semibold text-ink md:max-w-[9rem] md:leading-snug">
            Our value proposition
          </h2>
          {valueProposition.map((item, index) => {
            const Icon = valueIcons[index] ?? Eye;
            return (
              <div
                key={item}
                className="flex items-center gap-4 md:border-l md:border-ink/10 md:pl-8"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                </span>
                <p className="font-medium text-ink">{item}</p>
              </div>
            );
          })}
        </div>
      </div> */}
    </section>
  );
}
