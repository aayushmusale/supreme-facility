import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ClosingCta } from "@/components/home/closing-cta";
import { SectorGrid } from "@/components/home/sectors";
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
      <section id="homeclient" aria-labelledby="sector-grid-title" className="scroll-mt-28 bg-white py-16 md:py-24">
        <div className="container-page">
          <h2 id="sector-grid-title" className="sr-only">
            Sectors
          </h2>
          <SectorGrid linked={false} />
        </div>
      </section>

      <section aria-labelledby="sector-services-title" className="py-16 md:py-24">
        <div className="container-page">
          <h2 id="sector-services-title" className="font-display text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.08] font-semibold tracking-[-0.03em]">
            Services for every sector
          </h2>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.href}>
                <Link
                  href={service.href}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-colors hover:border-brand-600"
                >
                  <span className="flex items-start justify-between gap-4 font-display text-lg font-semibold group-hover:text-brand-700">
                    {service.title}
                    <ArrowUpRight aria-hidden className="mt-1 size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-muted">{service.summary}</span>
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
