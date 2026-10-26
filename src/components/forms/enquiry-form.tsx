"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitEnquiry } from "@/app/contact-us/actions";
import { serviceOptions } from "@/lib/enquiry-options";
import type { EnquiryField, EnquiryState } from "@/lib/enquiry-schema";
import { cn } from "@/lib/utils";

const initialState: EnquiryState = { status: "idle" };

const inputClass =
  "mt-2 block w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-brand-600 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 aria-[invalid=true]:border-brand-600 aria-[invalid=true]:bg-brand-50";

type FieldProps = {
  name: EnquiryField;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: (props: { id: string; "aria-invalid": boolean; "aria-describedby"?: string }) => ReactNode;
};

function Field({ name, label, required, error, hint, children }: FieldProps) {
  const id = `enquiry-${name}`;
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className="font-medium">
        {label}
        {required ? <span className="text-brand-700"> *</span> : <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      {children({ id, "aria-invalid": Boolean(error), "aria-describedby": describedBy })}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-brand-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function EnquiryForm({ defaultService }: { defaultService?: string }) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  const startedAtRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const errors = state.errors ?? {};
  const values = state.values ?? {};

  useEffect(() => {
    // Timestamp for the "submitted too fast" bot check. Set once after hydration.
    if (startedAtRef.current && !startedAtRef.current.value) startedAtRef.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    if (state.status === "error") summaryRef.current?.focus();
    if (state.status === "success") successRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="rounded-3xl border border-line bg-white p-8 md:p-10">
        <CheckCircle2 aria-hidden className="size-10 text-brand-600" />
        <h3 className="mt-4 font-display text-2xl font-semibold">Enquiry sent</h3>
        <p className="mt-3 max-w-md leading-relaxed text-muted">
          Thank you. Our team has received your enquiry and will contact you using the details you provided.
        </p>
      </div>
    );
  }

  const errorEntries = Object.entries(errors) as [EnquiryField, string][];

  return (
    <form action={formAction} noValidate className="rounded-3xl border border-line bg-white p-6 sm:p-8 md:p-10">
      {state.status === "error" && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mb-8 rounded-2xl border border-brand-200 bg-brand-50 p-5 text-ink focus:outline-none"
        >
          <p className="font-semibold">{state.message}</p>
          {errorEntries.length > 0 && (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
              {errorEntries.map(([field, message]) => (
                <li key={field}>
                  <a href={`#enquiry-${field}`} className="underline underline-offset-2">
                    {message}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Bot traps: hidden from people and assistive technology. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="enquiry-website">Website</label>
        <input id="enquiry-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedAtRef} type="hidden" name="startedAt" defaultValue="" />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="name" label="Full name" required error={errors.name}>
          {(props) => <input {...props} name="name" type="text" autoComplete="name" required defaultValue={values.name} className={inputClass} />}
        </Field>
        <Field name="company" label="Company" error={errors.company}>
          {(props) => <input {...props} name="company" type="text" autoComplete="organization" defaultValue={values.company} className={inputClass} />}
        </Field>
        <Field name="email" label="Work email" required error={errors.email}>
          {(props) => <input {...props} name="email" type="email" autoComplete="email" required defaultValue={values.email} className={inputClass} />}
        </Field>
        <Field name="phone" label="Phone" required error={errors.phone}>
          {(props) => <input {...props} name="phone" type="tel" autoComplete="tel" required defaultValue={values.phone} className={inputClass} />}
        </Field>
        <Field name="service" label="Service of interest" required error={errors.service}>
          {(props) => (
            <select {...props} name="service" required defaultValue={values.service ?? defaultService ?? ""} className={inputClass}>
              <option value="" disabled>
                Choose a service
              </option>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </Field>
        <Field name="location" label="Site location" hint="City or state where you need the service." error={errors.location}>
          {(props) => <input {...props} name="location" type="text" autoComplete="address-level2" defaultValue={values.location} className={inputClass} />}
        </Field>
        <div className="sm:col-span-2">
          <Field name="message" label="Your requirement" required hint="Site size, number of people, timelines or anything else that helps." error={errors.message}>
            {(props) => <textarea {...props} name="message" rows={5} required maxLength={2000} defaultValue={values.message} className={inputClass} />}
          </Field>
        </div>
      </div>

      <div className="mt-6">
        <label className="flex items-start gap-3">
          <input
            id="enquiry-consent"
            name="consent"
            type="checkbox"
            required
            defaultChecked={values.consent === "on"}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "enquiry-consent-error" : undefined}
            className="mt-1 size-5 shrink-0 accent-brand-600"
          />
          {/* FLAG: consent and privacy wording must be approved by Legal before launch. */}
          <span className="leading-relaxed">
            I agree that Supreme Facility Management can contact me about this enquiry. My details will be used only to respond to it.
          </span>
        </label>
        {errors.consent && (
          <p id="enquiry-consent-error" className="mt-2 text-sm font-medium text-brand-700">
            {errors.consent}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className={cn(
          "mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-600 px-7 font-medium text-white transition-colors hover:bg-brand-700",
          pending && "cursor-wait opacity-80",
        )}
      >
        {pending && <Loader2 aria-hidden className="size-4 animate-spin" />}
        {pending ? "Sending enquiry…" : "Send enquiry"}
      </button>
    </form>
  );
}
