import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClosingCta } from "@/components/home/closing-cta";
import { ContentSections } from "@/components/page/content-sections";
import { FaqList } from "@/components/page/faq-list";
import { IntroBlock } from "@/components/page/intro-block";
import { JsonLd } from "@/components/page/json-ld";
import { PageHero } from "@/components/page/page-hero";
import { RelatedLinks } from "@/components/page/related-links";
import { allServicePages, getServicePage, getSiblingPages } from "@/content/pages";
import { company, services } from "@/content/site";
import { serviceValues } from "@/lib/enquiry-options";
import { pageMetadata, siteUrl } from "@/lib/seo";

/**
 * Root-level content pages, matching the live site's URLs (e.g. /supply-chain-solutions/).
 * Only slugs listed in content are generated; anything else returns 404.
 * Static folders such as /services/ and /about-us/ take priority over this route.
 */
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allServicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};
  return pageMetadata({
    title: page.seo.title,
    description: page.seo.description,
    path: `/${page.slug}/`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  const path = `/${page.slug}/`;
  const isCompanyPage = page.kind === "company";
  const isSubPage = Boolean(page.trail?.length);
  const parent = page.trail?.at(-1);

  // Pre-select the matching service in the enquiry form. IFM sub-pages map to Integrated Facility Management.
  const serviceKey = serviceValues.includes(page.slug)
    ? page.slug
    : page.trail?.[0]?.href === "/integrated-facility-management/"
      ? "integrated-facility-management"
      : undefined;
  const enquiryHref = serviceKey ? `/contact-us/?service=${serviceKey}#enquiry` : "/contact-us/#enquiry";

  const related = isCompanyPage
    ? {
        heading: "More about Supreme",
        links: [
          { label: "About SFM", href: "/about-us/" },
          ...getSiblingPages(page).map((sibling) => ({ label: sibling.name, href: `/${sibling.slug}/` })),
        ],
      }
    : isSubPage
    ? {
        heading: `More from ${parent?.label ?? "this service"}`,
        links: getSiblingPages(page).map((sibling) => ({ label: sibling.name, href: `/${sibling.slug}/` })),
      }
    : {
        heading: "Explore our other services",
        links: services.filter((service) => service.href !== path).map((service) => ({ label: service.title, href: service.href })),
      };

  return (
    <main id="main-content">
      <PageHero
        breadcrumbs={[
          ...(isCompanyPage ? [] : [{ label: "Services", href: "/services/" }]),
          ...(page.trail ?? []),
          { label: page.name, href: path },
        ]}
        title={page.title}
        lead={page.lead}
        image={page.heroImage}
        imageAlt={page.heroAlt}
      />
      <IntroBlock heading={page.intro.heading} paragraphs={page.intro.paragraphs} />
      <ContentSections sections={page.sections} />
      <FaqList faqs={page.faqs} />
      <RelatedLinks heading={related.heading} links={related.links} />
      <ClosingCta heading={page.cta.heading} text={page.cta.text} buttonHref={page.ctaHref ?? enquiryHref} buttonLabel={page.ctaLabel} />
      {!isCompanyPage && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: page.name,
            description: page.seo.description,
            url: `${siteUrl}${path}`,
            areaServed: { "@type": "Country", name: "India" },
            provider: { "@type": "Organization", name: company.legalName, url: siteUrl },
          }}
        />
      )}
    </main>
  );
}
