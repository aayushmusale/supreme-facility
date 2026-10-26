import Image from "next/image";
import { Check } from "lucide-react";
import { AboutSectionNav } from "@/components/about/section-nav";
import { LeadershipGrid } from "@/components/about/leadership-grid";
import { ClosingCta } from "@/components/home/closing-cta";
import { JsonLd } from "@/components/page/json-ld";
import { PageHero } from "@/components/page/page-hero";
import { RelatedLinks } from "@/components/page/related-links";
import {
  aboutIntro,
  aboutOverview,
  coreStrengths,
  leaders,
  milestones,
  purpose,
  trainingImages,
  values,
  whyChooseUs,
} from "@/content/about";
import { company, mainNav } from "@/content/site";
import { pageMetadata, siteUrl } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Supreme Facility Management, part of the L. V. Shinde Group since 1983: our story, values, leadership team and milestones.",
  path: "/about-us/",
});

const sectionHeading = "font-display text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-balance";

const aboutMenu = mainNav.find((item) => item.kind === "menu" && item.label === "About");
const aboutLinks = aboutMenu?.kind === "menu" ? aboutMenu.items.filter((item) => item.href !== "/about-us/") : [];

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero
        breadcrumbs={[{ label: "About", href: "/about-us/" }]}
        title="Pioneering excellence in facility management"
        lead={aboutIntro}
        showActions={false}
      />
      <AboutSectionNav />

      <section id="overview" aria-labelledby="overview-title" className="scroll-mt-40 bg-white py-16 md:py-24">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="overview-title" className={sectionHeading}>
              Overview
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-pretty text-ink/80">
              {aboutOverview.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-line">
            <Image src={aboutOverview.image} alt={aboutOverview.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section id="core-values" aria-labelledby="values-title" className="scroll-mt-40 py-16 md:py-24">
        <div className="container-page">
          <h2 id="values-title" className={sectionHeading}>
            Core values
          </h2>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {purpose.map((item) => (
              <li key={item.title} className="rounded-3xl bg-oxblood p-8 text-white">
                <h3 className="font-medium text-gold">{item.title}</h3>
                <p className="mt-3 font-display text-2xl leading-snug font-semibold text-balance">{item.text}</p>
              </li>
            ))}
          </ul>
          <h3 className="mt-16 font-display text-2xl font-semibold">Our values</h3>
          <ul className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((value) => (
              <li key={value.title} className="border-t-2 border-brand-600 pt-5">
                <h4 className="font-display text-lg font-semibold">{value.title}</h4>
                <p className="mt-2 leading-relaxed text-muted">{value.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="leadership" aria-labelledby="leadership-title" className="scroll-mt-40 bg-white py-16 md:py-24">
        <div className="container-page">
          <h2 id="leadership-title" className={sectionHeading}>
            Leadership
          </h2>
          <LeadershipGrid leaders={leaders} />
        </div>
      </section>

      <section id="why-choose-us" aria-labelledby="why-title" className="scroll-mt-40 py-16 md:py-24">
        <div className="container-page">
          <h2 id="why-title" className={sectionHeading}>
            Why choose us
          </h2>
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((group) => (
              <li key={group.title} className="rounded-3xl border border-line bg-white p-7">
                <h3 className="font-display text-xl font-semibold">{group.title}</h3>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check aria-hidden className="mt-1 size-4 shrink-0 text-brand-600" strokeWidth={3} />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="milestones" aria-labelledby="milestones-title" className="scroll-mt-40 bg-white py-16 md:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
          <h2 id="milestones-title" className={`${sectionHeading} lg:sticky lg:top-44 lg:self-start`}>
            Key milestones
          </h2>
          <ol className="relative border-l-2 border-line">
            {milestones.map((milestone) => (
              <li key={milestone.year} className="relative pb-10 pl-8 last:pb-0">
                <span aria-hidden className="absolute top-1.5 -left-[0.45rem] size-3 rounded-full bg-brand-600 ring-4 ring-white" />
                <p className="font-display text-3xl font-semibold tracking-tight text-brand-700">{milestone.year}</p>
                <p className="mt-2 max-w-2xl leading-relaxed text-ink/80">{milestone.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="strengths-title" className="theme-dark bg-oxblood py-16 text-white md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <figure>
            <blockquote className="font-display text-[clamp(1.5rem,2.8vw,2.25rem)] leading-snug font-medium text-balance">
              “{coreStrengths.quote}”
            </blockquote>
            <figcaption className="mt-6 text-gold">{coreStrengths.quoteBy}</figcaption>
          </figure>
          <div>
            <h2 id="strengths-title" className="font-display text-2xl font-semibold">
              Core strengths
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-white/80">
              {coreStrengths.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="learning-title" className="py-16 md:py-24">
        <div className="container-page">
          <h2 id="learning-title" className={sectionHeading}>
            Focus on learning and development
          </h2>
          <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {trainingImages.map((image) => (
              <li key={image.src} className="relative aspect-square overflow-hidden rounded-2xl bg-line">
                <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RelatedLinks heading="More about Supreme" links={aboutLinks} />
      <ClosingCta />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: company.legalName,
          url: siteUrl,
          logo: `${siteUrl}${company.logo}`,
          foundingDate: "1983",
          slogan: company.tagline,
          telephone: company.phone.display,
          email: company.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Kohinoor World Tower T-3, 10th Floor, Office Nos. 1002 to 1005, Old Pune Mumbai Highway, Chinchwad East",
            addressLocality: "Pune",
            addressRegion: "Maharashtra",
            postalCode: "411019",
            addressCountry: "IN",
          },
          sameAs: company.socials.map((social) => social.href),
        }}
      />
    </main>
  );
}
