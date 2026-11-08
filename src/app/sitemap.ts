import type { MetadataRoute } from "next";
import { allServicePages } from "@/content/pages";
import { siteUrl } from "@/lib/seo";

/** Lists only pages that exist in this build. Add new routes here as phases ship. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/about-us/", "/services/", "/sectors/", "/contact-us/", "/careers/", "/investor/", "/blogs/", "/employee-engagement/", ...allServicePages.map((page) => `/${page.slug}/`)];
  return paths.map((path) => ({ url: `${siteUrl}${path}` }));
}
