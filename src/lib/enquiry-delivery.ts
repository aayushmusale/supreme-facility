import type { EnquiryInput } from "./enquiry-schema";

/**
 * Where enquiries go. The real destination (email service or CRM) is NOT decided yet.
 * - ENQUIRY_DELIVERY=mock: development only. Logs a redacted summary, never personal data.
 * - Anything else / unset in production: fails safely, so the visitor sees an error instead of a false success.
 * Add the approved provider here once IT confirms it. Keep credentials in server-only env vars (never NEXT_PUBLIC_).
 */
export async function deliverEnquiry(enquiry: EnquiryInput): Promise<{ ok: boolean }> {
  const mode = process.env.ENQUIRY_DELIVERY;

  if (mode === "mock" && process.env.NODE_ENV !== "production") {
    console.info("[enquiry:mock] received", {
      service: enquiry.service,
      messageLength: enquiry.message.length,
      hasCompany: Boolean(enquiry.company),
    });
    return { ok: true };
  }

  console.error("[enquiry] no approved delivery destination configured");
  return { ok: false };
}
