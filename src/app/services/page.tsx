import Link from "next/link";
import { ClosingCta } from "@/components/home/closing-cta";
import { Services } from "@/components/home/services";
import { PageHero } from "@/components/page/page-hero";
import { ifmMenu, servicesIntro } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Services",
  description:
    "Integrated facility management, supply chain, employee transportation, corporate food and production support services from Supreme Facility Management.",
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <main id="main-content">
      <PageHero breadcrumbs={[{ label: "Services", href: "/services/" }]} title="Explore our range of services" lead={servicesIntro} />
      <Services showHeading={false} />

      <section aria-labelledby="ifm-index-title" className="py-16 md:py-24">
        <div className="container-page">
          <h2 id="ifm-index-title" className="font-display text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.08] font-semibold tracking-[-0.03em]">
            Inside integrated facility management
          </h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {ifmMenu.groups.map((group) => (
              <div key={group.href}>
                <Link href={group.href} className="font-display text-xl font-semibold hover:text-brand-700">
                  {group.label}
                </Link>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-muted transition-colors hover:text-brand-700">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="font-display text-xl font-semibold">More within IFM</p>
              <ul className="mt-4 space-y-2.5">
                {ifmMenu.more.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-muted transition-colors hover:text-brand-700">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta />
    </main>
  );
}
