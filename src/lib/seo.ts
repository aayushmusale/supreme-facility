import type { Metadata } from "next";

export const siteUrl = "https://supremefacility.com";

/** Indexing stays OFF until launch. Set ALLOW_INDEXING=true only in the approved production environment. */
export const allowIndexing = process.env.ALLOW_INDEXING === "true";

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
      ...(image ? { images: [{ url: image }] } : {}),
    },
  };
}
