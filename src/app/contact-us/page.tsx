import { MapPin } from "lucide-react";
import { Channels } from "@/components/contact/channels";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { PageHero } from "@/components/page/page-hero";
import { mapsUrl, otherOffices } from "@/content/contact";
import { company } from "@/content/site";
import { serviceValues } from "@/lib/enquiry-options";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact Supreme Facility Management for facility management, supply chain, employee transportation, corporate food and production support services.",
  path: "/contact-us/",
});

type Props = { searchParams: Promise<{ service?: string | string[] }> };

export default async function ContactPage({ searchParams }: Props) {
  const { service } = await searchParams;
  const requested = typeof service === "string" ? service : undefined;
  const defaultService = requested && serviceValues.includes(requested) ? requested : undefined;

  const channels = [
    { icon: "phone" as const, label: "Call us", value: company.phone.display, href: company.phone.href, action: "Call now", copy: company.phone.display },
    { icon: "mail" as const, label: "Email us", value: company.email, href: `mailto:${company.email}`, action: "Write to us", copy: company.email },
    { icon: "chat" as const, label: "WhatsApp", value: "Chat with our team", href: company.whatsapp, action: "Start a chat", external: true },
  ];

  return (
    <main id="main-content">
      <PageHero
        breadcrumbs={[{ label: "Contact Us", href: "/contact-us/" }]}
        title="Let's talk about your sites"
        lead="Book an appointment by visiting or calling us, or send an enquiry and the right team will contact you."
        showActions={false}
        image="/contact-us-bg.jpg"
        imageAlt=""
        overlay="side"
      />

      <section aria-labelledby="enquiry-title" className="py-16 md:py-24">
        <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-16">
          <div className="space-y-10 lg:sticky lg:top-28 lg:self-start">
            <div>
              <h2 className="font-display text-2xl font-semibold">Reach us directly</h2>
              <div className="mt-6">
                <Channels channels={channels} />
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold">Registered office</h2>
              <address className="mt-4 flex gap-3 leading-relaxed not-italic text-ink">
                <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-brand-700" />
                <span>
                  <span className="block font-medium text-ink">{company.legalName}</span>
                  {company.address.join(" ")}
                </span>
              </address>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex font-medium text-brand-700 underline-offset-4 hover:underline"
              >
                Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold">Our other offices</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {otherOffices.map((city) => (
                  <li key={city} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[0.95rem]">
                    <MapPin aria-hidden className="size-3.5 text-brand-700" />
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div id="enquiry" className="scroll-mt-28">
            <h2 id="enquiry-title" className="font-display text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.08] font-semibold tracking-[-0.03em]">
              Request a quote
            </h2>
            <p className="mt-3 mb-8 text-lg text-muted">Fields marked * are required.</p>
            <EnquiryForm defaultService={defaultService} />
          </div>
        </div>
      </section>
    </main>
  );
}
