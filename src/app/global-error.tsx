"use client";

import "./globals.css";

/**
 * Last-resort fallback for errors in the root layout itself. It replaces the whole document,
 * so it brings its own <html> and <body> and cannot rely on the header, footer or custom fonts.
 */
export default function GlobalError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <html lang="en-IN">
      <body className="flex min-h-dvh items-center bg-stone text-ink">
        <main className="container-page py-20">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Something went wrong</h1>
          <p className="mt-4 max-w-lg text-lg text-muted">
            The site hit an unexpected problem. Please try again. If it continues, call +91 20631 14400 or email
            info@supremefacility.com.
          </p>
          <button
            type="button"
            onClick={() => retry()}
            className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-brand-600 px-5 text-[0.95rem] font-medium text-white hover:bg-brand-800"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
