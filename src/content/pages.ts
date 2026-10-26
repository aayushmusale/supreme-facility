import { companyPages } from "./company-pages";
import { ifmPages } from "./ifm-services";
import { servicePages, type ServicePage } from "./services";

/** Every root-level content page served by app/[slug]. */
export const allServicePages: ServicePage[] = [...servicePages, ...ifmPages, ...companyPages];

export function getServicePage(slug: string) {
  return allServicePages.find((page) => page.slug === slug);
}

/** Pages that share the same parent (e.g. all hard services), excluding the page itself. */
export function getSiblingPages(page: ServicePage) {
  const parent = page.trail?.at(-1)?.href;
  if (!parent) return [];
  return allServicePages.filter((other) => other.slug !== page.slug && other.trail?.at(-1)?.href === parent);
}
