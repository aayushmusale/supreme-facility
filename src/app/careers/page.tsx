import { Mail, Plus } from "lucide-react";
import { ClosingCta } from "@/components/home/closing-cta";
import { PageHero } from "@/components/page/page-hero";
import { careersEmail, careersIntro, visibleJobs } from "@/content/careers";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Careers",
  description: "Build your career with Supreme Facility Management. See current openings and how to apply.",
  path: "/careers/",
});

const wp = "https://supremefacility.com/wp-content/uploads";

export default function CareersPage() {
  const openings = visibleJobs();

  return (
    <main id="main-content">
      <PageHero
        breadcrumbs={[{ label: "Careers", href: "/careers/" }]}
        title="Build your career with Supreme"
        lead="Grow with a company that has been creating better workplaces since 1983."
        image={`${wp}/2023/11/career-banner-1.jpg`}
        imageAlt="Supreme Facility Management team members at work"
        showActions={false}
      />

      <section aria-labelledby="why-join-title" className="bg-white py-16 md:py-24">
        <div className="container-page grid gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] md:gap-16">
          <h2 id="why-join-title" className="font-display text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.08] font-semibold tracking-[-0.03em]">
            Why Supreme Facility Management?
          </h2>
          <div className="space-y-5 text-lg leading-relaxed text-ink/80">
            {careersIntro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="openings" aria-labelledby="openings-title" className="scroll-mt-28 py-16 md:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.8fr)] lg:gap-16">
          <div>
            <h2 id="openings-title" className="font-display text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.08] font-semibold tracking-[-0.03em]">
              Current openings
            </h2>

            {openings.length === 0 ? (
              <div className="mt-8 rounded-3xl border border-line bg-white p-8">
                <p className="text-lg font-medium">There are no openings listed right now.</p>
                <p className="mt-2 text-muted">
                  We are always glad to hear from talented people. Email your CV to{" "}
                  <a href={`mailto:${careersEmail}`} className="font-medium text-brand-700 underline underline-offset-4">
                    {careersEmail}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <ul className="mt-8 space-y-4">
                {openings.map((job) => (
                  <li key={job.id} id={job.id} className="scroll-mt-28 rounded-3xl border border-line bg-white p-6 md:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-xl font-semibold md:text-2xl">{job.title}</h3>
                        <p className="mt-1 text-muted">{job.location}</p>
                      </div>
                      {!job.hrVerified && (
                        <span className="rounded-full bg-gold/20 px-3 py-1 text-sm font-medium text-ink">
                          Dev only: pending HR verification
                        </span>
                      )}
                    </div>
                    <p className="mt-4 leading-relaxed text-ink/80">{job.summary}</p>
                    {job.facts && (
                      <dl className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-3">
                        {job.facts.map((fact) => (
                          <div key={fact.label}>
                            <dt className="text-sm text-muted">{fact.label}</dt>
                            <dd className="font-medium">{fact.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    <details className="group mt-5 border-t border-line">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 pt-4 font-medium">
                        View role details<span className="sr-only"> for {job.title}</span>
                        <Plus aria-hidden className="size-5 text-brand-600 transition-transform duration-200 group-open:rotate-45" />
                      </summary>
                      <div className="mt-4 space-y-5">
                        {job.details.map((block) => (
                          <div key={block.heading}>
                            <h4 className="font-semibold">{block.heading}</h4>
                            <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed text-ink/80">
                              {block.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <a
                          href={`mailto:${careersEmail}?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
                          className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-600 px-5 font-medium text-white hover:bg-brand-700"
                        >
                          <Mail aria-hidden className="size-4" />
                          Apply by email
                        </a>
                      </div>
                    </details>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <aside aria-labelledby="apply-title" className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl bg-oxblood p-8 text-white theme-dark">
              <h2 id="apply-title" className="font-display text-2xl font-semibold">
                How to apply
              </h2>
              <ol className="mt-5 list-decimal space-y-3 pl-5 leading-relaxed text-white/85">
                <li>Email your latest CV with your expected CTC.</li>
                <li>Mention the position you are applying for in the subject line.</li>
                <li>Our HR team will contact shortlisted candidates.</li>
              </ol>
              <a
                href={`mailto:${careersEmail}`}
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 font-medium text-ink hover:bg-brand-50"
              >
                <Mail aria-hidden className="size-4" />
                {careersEmail}
              </a>
            </div>
          </aside>
        </div>
      </section>

      <ClosingCta
        heading="Life at Supreme"
        text="See how we celebrate diversity, safety and learning across our workforce."
        buttonHref="/diversity-and-inclusion/"
        buttonLabel="Diversity and inclusion"
      />
    </main>
  );
}
