import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ClosingCta } from "@/components/home/closing-cta";
import { PageHero } from "@/components/page/page-hero";
import { blogPosts } from "@/content/resources";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blogs",
  description: "Facility management insights, tips and best practices from Supreme Facility Management.",
  path: "/blogs/",
});

export default function BlogsPage() {
  return (
    <main id="main-content">
      <PageHero
        breadcrumbs={[{ label: "Resources", href: "/blogs/" }, { label: "Blogs", href: "/blogs/" }]}
        title="Insights from Supreme"
        lead="Trends, tips and best practices in facility management, housekeeping, security and more."
        showActions={false}
      />

      <section aria-labelledby="posts-title" className="bg-stone py-16 md:py-24">
        <div className="container-page">
          <h2 id="posts-title" className="sr-only">
            Latest posts
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
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
                  </div>
                  <p className="mt-4 text-sm text-muted">{post.date}</p>
                  <h3 className="mt-1 font-display text-lg leading-snug font-semibold group-hover:text-brand-700">
                    {post.title}
                    <ArrowUpRight aria-hidden className="ml-1.5 inline size-4 align-text-top" />
                    <span className="sr-only"> (opens on supremefacility.com in a new tab)</span>
                  </h3>
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-12 text-muted">
            Showing the most recent posts.{" "}
            <Link href="/contact-us/#enquiry" className="font-medium text-brand-700 underline underline-offset-4">
              Contact us
            </Link>{" "}
            if you're looking for a specific article.
          </p>
        </div>
      </section>

      <ClosingCta />
    </main>
  );
}
