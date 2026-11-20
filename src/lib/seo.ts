import type { Metadata } from "next";

export const siteUrl = "https://supremefacility.com";

/** Indexing stays OFF until launch. Set ALLOW_INDEXING=true only in the approved production environment. */
export const allowIndexing = process.env.ALLOW_INDEXING === "true";

/** Default share card (src/app/opengraph-image.tsx). A page that sets its own openGraph must name it explicitly. */
const defaultShareImage = { url: "/opengraph-image/", width: 1200, height: 630 };

type PageMetaInput = { title: string; description: string; path: string; image?: string };

export function pageMetadata({ title, description, path, image }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      images: image ? [{ url: image }] : [defaultShareImage],
    },
  };
}
