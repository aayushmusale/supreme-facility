import Image from "next/image";
import { ArrowUpRight, PlayCircle } from "lucide-react";
import { ClosingCta } from "@/components/home/closing-cta";
import { PageHero } from "@/components/page/page-hero";
import { engagementPosts, linkedinFollowUrl } from "@/content/resources";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Employee Engagement",
  description: "Celebrations, recognition, training and team moments from across Supreme Facility Management.",
  path: "/employee-engagement/",
});

export default function EmployeeEngagementPage() {
  return (
    <main id="main-content">
      <PageHero
        breadcrumbs={[{ label: "Resources", href: "/blogs/" }, { label: "Employee Engagement", href: "/employee-engagement/" }]}
        title="Life at Supreme"
        lead="Celebrations, recognition, training and team moments from across Supreme Facility Management, as shared on LinkedIn."
        showActions={false}
      />

      <section aria-labelledby="posts-title" className="bg-stone py-16 md:py-24">
        <div className="container-page">
          <h2 id="posts-title" className="sr-only">
            Celebrating our people
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {engagementPosts.map((post) => (
              <li key={post.href}>
                <a href={post.href} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-line">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    {post.hasVideo && (
                      <span aria-hidden className="absolute inset-0 flex items-center justify-center bg-oxblood/20">
                        <PlayCircle className="size-12 text-white drop-shadow" strokeWidth={1.5} />
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-sm font-medium text-brand-700">{post.tag}</p>
                  <h3 className="mt-1 font-display text-lg leading-snug font-semibold group-hover:text-brand-700">{post.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{post.summary}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-700">
                    View on LinkedIn
                    <ArrowUpRight aria-hidden className="size-3.5" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href={linkedinFollowUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex h-11 items-center gap-2 rounded-full bg-brand-600 px-5 font-medium text-white hover:bg-brand-800"
          >
            Follow us on LinkedIn
            <ArrowUpRight aria-hidden className="size-4" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </section>

      <ClosingCta
        heading="Build your career with Supreme"
        text="See current openings and how to apply."
        buttonHref="/careers/"
        buttonLabel="View careers"
      />
    </main>
  );
}
