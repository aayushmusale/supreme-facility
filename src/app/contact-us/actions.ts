"use server";

import { headers } from "next/headers";
import { deliverEnquiry } from "@/lib/enquiry-delivery";
import { enquirySchema, type EnquiryField, type EnquiryState } from "@/lib/enquiry-schema";
import { rateLimit } from "@/lib/rate-limit";

const FIELDS: EnquiryField[] = ["name", "company", "email", "phone", "service", "location", "message", "consent"];
const MIN_FILL_MS = 3000;

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const values = Object.fromEntries(
    FIELDS.map((field) => [field, String(formData.get(field) ?? "").slice(0, 2500)]),
  ) as Record<EnquiryField, string>;

  // Bot checks: hidden honeypot field must be empty, and the form must not be submitted instantly.
  const honeypot = String(formData.get("website") ?? "");
  const startedAt = Number(formData.get("startedAt") ?? 0);
  if (honeypot || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    // Pretend success so bots get no signal; nothing is delivered.
    return { status: "success" };
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimit(`enquiry:${ip}`, 5, 10 * 60 * 1000).allowed) {
    return {
      status: "error",
      message: "Too many enquiries were sent from your network. Please wait a few minutes, or call or email us directly.",
      values,
    };
  }

  const parsed = enquirySchema.safeParse(values);
  if (!parsed.success) {
    const errors: EnquiryState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as EnquiryField;
      if (field && !errors[field]) errors[field] = issue.message;
    }
    return { status: "error", message: "Some details need fixing. Check the highlighted fields.", errors, values };
  }

  try {
    const result = await deliverEnquiry(parsed.data);
    if (!result.ok) throw new Error("delivery failed");
  } catch {
    return {
      status: "error",
      message: "Your enquiry could not be sent. Please try again, or email info@supremefacility.com or call +91 20631 14400.",
      values,
    };
  }

  return { status: "success" };
}
