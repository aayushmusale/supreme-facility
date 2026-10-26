import { services } from "@/content/site";

/** Service choices for the enquiry form. Kept separate from the schema so the client bundle stays free of zod. */
export const serviceOptions = [
  ...services.map((service) => ({ value: service.href.replaceAll("/", ""), label: service.title })),
  { value: "other", label: "Other / not sure" },
];

export const serviceValues = serviceOptions.map((option) => option.value);
