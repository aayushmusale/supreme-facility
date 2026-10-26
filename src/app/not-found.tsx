import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you requested could not be found.",
};

export default function NotFound() {
  return (
    <main id="main-content" className="container-page flex min-h-[70dvh] flex-col justify-center pt-32 pb-20">
      <p className="font-display text-7xl font-semibold tracking-tight text-brand-600">404</p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] md:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-lg text-lg text-muted">
        This page may have moved, or it is still being rebuilt. Use the menu above or go back to the home page.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Go to home page</ButtonLink>
        <ButtonLink href="/contact-us/" variant="outline">
          Contact us
        </ButtonLink>
      </div>
    </main>
  );
}











// import Link from "next/link";

// export const metadata = {
//   title: "Page not found",
//   description: "The page you requested could not be found.",
// };

// export default function NotFound() {
//   return (
//     <main id="main-content" className="page-container page-content not-found">
//       <p className="eyebrow">404</p>
//       <h1>Page not found</h1>
//       <p>The address may be incorrect, or the page may not be available yet.</p>
//       <Link className="text-link" href="/">Return to the home page</Link>
//     </main>
//   );
// }
