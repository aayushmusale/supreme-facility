import { ClosingCta } from "@/components/home/closing-cta";
import { RoleBoard } from "@/components/careers/role-board";
import { WhyJoin } from "@/components/careers/why-join";
import { PageHero } from "@/components/page/page-hero";
import { careersEmail, careersIntro, visibleJobs } from "@/content/careers";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Careers",
  description: "Build your career with Supreme Facility Management. See current openings and how to apply.",
  path: "/careers/",
});

export default function CareersPage() {
  const openings = visibleJobs();

  return (
    <main id="main-content">
      <PageHero
        breadcrumbs={[{ label: "Careers", href: "/careers/" }]}
        title="Build your career with Supreme"
        lead="Grow with a company that has been creating better workplaces since 1983."
        image="/career.jpeg"
        imageAlt="Supreme Facility Management team members at work"
        showActions={false}
      />

      <WhyJoin paragraphs={careersIntro} />

      <RoleBoard jobs={openings} email={careersEmail} />

      <ClosingCta
        heading="Life at Supreme"
        text="See how we celebrate diversity, safety and learning across our workforce."
        buttonHref="/diversity-and-inclusion/"
        buttonLabel="Diversity and inclusion"
      />
    </main>
  );
}
