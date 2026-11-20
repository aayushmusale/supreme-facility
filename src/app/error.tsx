"use client";

import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/button";

/**
 * Shown when something throws while rendering a page. The header and footer stay in place
 * (this sits below the root layout). In production Next.js hides the real message and only
 * passes a short `digest` that can be matched to the server log, so nothing sensitive reaches the visitor.
 */
export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    // Placeholder for the error reporter (e.g. Sentry) once one is chosen.
    console.error(error);
  }, [error]);

  const digest = error instanceof globalThis.Error ? (error as { digest?: string }).digest : undefined;

  return (
    <main id="main-content" className="container-page flex min-h-[70dvh] flex-col justify-center pt-32 pb-20">
      <h1 className="font-display text-4xl font-semibold tracking-[-0.03em] md:text-5xl">Something went wrong</h1>
      <p className="mt-4 max-w-lg text-lg text-muted">
        This page could not be loaded. Please try again, or go back to the home page. If it keeps happening, call or
        email us and we will help directly.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => retry()}
          className="inline-flex h-11 items-center justify-center rounded-full bg-brand-600 px-5 text-[0.95rem] font-medium text-white transition-colors duration-200 hover:bg-brand-800"
        >
          Try again
        </button>
        <ButtonLink href="/" variant="outline">
          Go to home page
        </ButtonLink>
        <ButtonLink href="/contact-us/" variant="outline">
          Contact us
        </ButtonLink>
      </div>
      {digest && <p className="mt-8 text-sm text-muted">Reference: {digest}</p>}
    </main>
  );
}
