import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { company } from "@/content/site";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

type PageHeroProps = {
  breadcrumbs: Crumb[];
  title: string;
  lead?: string;
  image?: string;
  imageAlt?: string;
  showActions?: boolean;
};

export function PageHero({ breadcrumbs, title, lead, image, imageAlt = "", showActions = true }: PageHeroProps) {
  return (
    <section className="theme-dark relative isolate overflow-hidden bg-oxblood text-white">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_20%_20%,black,transparent_70%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/2 -left-1/4 -z-10 h-[160%] w-[80%] -rotate-[24deg] animate-spotlight bg-[radial-gradient(ellipse_at_center,rgb(255_228_200/0.13),transparent_60%)]"
      />

      <div className={`container-page grid items-center gap-10 pt-32 pb-14 md:pt-36 md:pb-20 ${image ? "lg:grid-cols-[1.15fr_1fr] lg:gap-14" : ""}`}>
        <div className="animate-rise">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.2rem,4.8vw,3.9rem)] leading-[1.04] font-semibold tracking-[-0.035em] text-balance">
            {title}
          </h1>
          {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-white/75">{lead}</p>}
          {showActions && (
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact-us/#enquiry" variant="light" size="lg">
                Request a quote
                <ArrowUpRight aria-hidden className="size-4" />
              </ButtonLink>
              <ButtonLink href={company.phone.href} variant="outline-light" size="lg">
                Call {company.phone.display}
              </ButtonLink>
            </div>
          )}
        </div>

        {image && (
          <div className="relative aspect-[4/3] animate-rise overflow-hidden rounded-[1.75rem] [animation-delay:120ms]">
            <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}
