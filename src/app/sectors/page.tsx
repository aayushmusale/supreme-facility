import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ClosingCta } from "@/components/home/closing-cta";
import { SectorMarquee } from "@/components/home/sector-marquee";
import { PageHero } from "@/components/page/page-hero";
import { services } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sectors We Serve",
  description:
    "Supreme Facility Management serves IT/ITES, engineering, automotive, healthcare, hospitality, public sector, education, logistics, retail, e-commerce, commercial buildings and corporate parks.",
  path: "/sectors/",
});

export default function SectorsPage() {
  return (
    <main id="main-content">
      <PageHero
        breadcrumbs={[{ label: "Sectors", href: "/sectors/" }]}
        title="Industries we cater to"
        lead="Facility management, transportation, food and production support for businesses across a wide range of industries."
      />

      {/* id="homeclient" keeps the footer "Clients" link from the old site working. */}
      <section id="homeclient" aria-labelledby="sector-grid-title" className="scroll-mt-28 bg-stone py-10 md:py-14">
        <h2 id="sector-grid-title" className="sr-only">
          Sectors
        </h2>
        <SectorMarquee />
      </section>

      <section aria-labelledby="sector-services-title" className="py-16 md:py-24">
        <div className="container-page">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 id="sector-services-title" className="font-display text-h2 font-semibold tracking-[-0.03em]">
              Services for every sector
            </h2>
            <p className="max-w-md text-pretty text-muted">
              Five service lines, one accountable partner, whichever industry you run.
            </p>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {services.map((service, i) => (
              <li key={service.href} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
                <Link
                  href={service.href}
                  className="group relative flex h-full min-h-72 flex-col justify-end overflow-hidden rounded-2xl bg-oxblood-2 p-6 text-white sm:min-h-80"
                >
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-oxblood via-oxblood/60 to-oxblood/10" />
                  <span aria-hidden className="absolute top-5 left-6 font-display text-sm font-semibold tracking-[0.2em] text-white/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative flex items-start justify-between gap-4 font-display text-xl font-semibold">
                    {service.title}
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/60 transition-colors group-hover:border-white group-hover:bg-white group-hover:text-oxblood">
                      <ArrowUpRight aria-hidden className="size-4" />
                    </span>
                  </span>
                  <span className="relative mt-2 line-clamp-2 text-sm leading-relaxed text-white/85">{service.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCta heading="Tell us about your industry" text="Share your sites and requirements, and the right team will contact you." />
    </main>
  );
}
