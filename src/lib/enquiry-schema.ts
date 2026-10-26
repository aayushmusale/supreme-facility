import { z } from "zod";
import { serviceValues } from "./enquiry-options";

/** Server-side validation for the enquiry form. Client-side checks are only a convenience. */
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(100, "Name is too long."),
  company: z.string().trim().max(150, "Company name is too long.").optional().or(z.literal("")),
  email: z.string().trim().max(254, "Email is too long.").email("Enter a valid email address, like name@company.com."),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[\d\s()-]{7,20}$/, "Enter a valid phone number, digits only, with country code if outside India."),
  service: z.enum(serviceValues as [string, ...string[]], { message: "Choose the service you are interested in." }),
  location: z.string().trim().max(120, "Location is too long.").optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a little more about your requirement (at least 10 characters).").max(2000, "Message is too long (2,000 characters maximum)."),
  consent: z.literal("on", { message: "Confirm that we can contact you about this enquiry." }),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
export type EnquiryField = keyof EnquiryInput;

export type EnquiryState = {
  status: "idle" | "error" | "success";
  message?: string;
  errors?: Partial<Record<EnquiryField, string>>;
  values?: Partial<Record<EnquiryField, string>>;
};
