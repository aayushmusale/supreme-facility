import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SiteLoader } from "@/components/motion/site-loader";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { company } from "@/content/site";
import { allowIndexing } from "@/lib/seo";
import "./globals.css";

/**
 * Runs synchronously, before React hydrates and before the browser paints
 * — this is the whole point of it being a plain inline <script>, not a
 * React effect. Decides whether the loader overlay should be visible at
 * all: skip it if prefers-reduced-motion is set, or if it already played
 * once in this tab's session. Sets a `data-skip-loader` attribute on <html>
 * that a plain CSS rule in globals.css uses to hide #site-loader — so on a
 * repeat visit within the same tab, the overlay is never visible for even
 * one frame, with no JavaScript needed for the hiding itself (only for this
 * one synchronous check). Wrapped in try/catch because sessionStorage can
 * throw in some private-browsing modes — if it does, the loader simply
 * plays again, which is harmless.
 */
const LOADER_SKIP_CHECK = `try{var r=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;var p=sessionStorage.getItem('sfm-loader-played')==='1';if(r||p){document.documentElement.setAttribute('data-skip-loader','true');}}catch(e){}`;

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://supremefacility.com"),
  title: {
    default: "Comprehensive Facility Management Services Company in India | Supreme Facility Management",
    template: "%s | Supreme Facility Management",
  },
  description:
    "Supreme Facility Management is your partner for integrated facility management, supply chain, employee transportation, corporate food and production support services across India.",
  openGraph: {
    type: "website",
    siteName: company.legalName,
    locale: "en_IN",
  },
  // Staging is never indexed. Set ALLOW_INDEXING=true only in approved production.
  robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#2a0d10",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: LOADER_SKIP_CHECK (above) deliberately sets `data-skip-loader` on
    // <html> before hydration, so that attribute is expected to differ from the server HTML. This
    // only silences mismatches on <html>'s own attributes, not anywhere in the tree below it.
    <html lang="en-IN" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh">
        {/* Must come before SiteLoader in document order — see the comment on LOADER_SKIP_CHECK above. */}
        <script dangerouslySetInnerHTML={{ __html: LOADER_SKIP_CHECK }} />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteLoader />
        <ScrollProgress />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}













// import type { Metadata, Viewport } from "next";
// import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
// import { ScrollProgress } from "@/components/motion/scroll-progress";
// import { SiteFooter } from "@/components/layout/site-footer";
// import { SiteHeader } from "@/components/layout/site-header";
// import { company } from "@/content/site";
// import { allowIndexing } from "@/lib/seo";
// import "./globals.css";

// const display = Bricolage_Grotesque({
//   subsets: ["latin"],
//   variable: "--font-bricolage",
//   display: "swap",
// });

// const sans = Instrument_Sans({
//   subsets: ["latin"],
//   variable: "--font-instrument-sans",
//   display: "swap",
// });

// export const metadata: Metadata = {
//   metadataBase: new URL("https://supremefacility.com"),
//   title: {
//     default: "Comprehensive Facility Management Services Company in India | Supreme Facility Management",
//     template: "%s | Supreme Facility Management",
//   },
//   description:
//     "Supreme Facility Management is your partner for integrated facility management, supply chain, employee transportation, corporate food and production support services across India.",
//   openGraph: {
//     type: "website",
//     siteName: company.legalName,
//     locale: "en_IN",
//   },
//   // Staging is never indexed. Set ALLOW_INDEXING=true only in approved production.
//   robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
// };

// export const viewport: Viewport = {
//   themeColor: "#2a0d10",
// };

// export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html lang="en-IN" className={`${display.variable} ${sans.variable}`}>
//       <body className="min-h-dvh">
//         <a className="skip-link" href="#main-content">
//           Skip to content
//         </a>
//         <ScrollProgress />
//         <SiteHeader />
//         {children}
//         <SiteFooter />
//       </body>
//     </html>
//   );
// }

















// import type { Metadata, Viewport } from "next";
// import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
// import { ScrollProgress } from "@/components/motion/scroll-progress";
// import { SiteFooter } from "@/components/layout/site-footer";
// import { SiteHeader } from "@/components/layout/site-header";
// import { company } from "@/content/site";
// import { allowIndexing } from "@/lib/seo";
// import "./globals.css";

// const display = Bricolage_Grotesque({
//   subsets: ["latin"],
//   variable: "--font-bricolage",
//   display: "swap",
// });

// const sans = Instrument_Sans({
//   subsets: ["latin"],
//   variable: "--font-instrument-sans",
//   display: "swap",
// });

// export const metadata: Metadata = {
//   metadataBase: new URL("https://supremefacility.com"),
//   title: {
//     default: "Comprehensive Facility Management Services Company in India | Supreme Facility Management",
//     template: "%s | Supreme Facility Management",
//   },
//   description:
//     "Supreme Facility Management is your partner for integrated facility management, supply chain, employee transportation, corporate food and production support services across India.",
//   openGraph: {
//     type: "website",
//     siteName: company.legalName,
//     locale: "en_IN",
//   },
//   // Staging is never indexed. Set ALLOW_INDEXING=true only in approved production.
//   robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
// };

// export const viewport: Viewport = {
//   themeColor: "#2a0d10",
// };

// export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html lang="en-IN" className={`${display.variable} ${sans.variable}`}>
//       <body className="min-h-dvh">
//         <a className="skip-link" href="#main-content">
//           Skip to content
//         </a>
//         <ScrollProgress />
//         <SiteHeader />
//         {children}
//         <SiteFooter />
//       </body>
//     </html>
//   );
// }





// // import type { Metadata, Viewport } from "next";
// // import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
// // import { ScrollProgress } from "@/components/motion/scroll-progress";
// // import { SiteFooter } from "@/components/layout/site-footer";
// // import { SiteHeader } from "@/components/layout/site-header";
// // import { company } from "@/content/site";
// // import { allowIndexing } from "@/lib/seo";
// // import "./globals.css";

// // const display = Bricolage_Grotesque({
// //   subsets: ["latin"],
// //   variable: "--font-bricolage",
// //   display: "swap",
// // });

// // const sans = Instrument_Sans({
// //   subsets: ["latin"],
// //   variable: "--font-instrument-sans",
// //   display: "swap",
// // });

// // export const metadata: Metadata = {
// //   metadataBase: new URL("https://supremefacility.com"),
// //   title: {
// //     default: "Comprehensive Facility Management Services Company in India | Supreme Facility Management",
// //     template: "%s | Supreme Facility Management",
// //   },
// //   description:
// //     "Supreme Facility Management is your partner for integrated facility management, supply chain, employee transportation, corporate food and production support services across India.",
// //   openGraph: {
// //     type: "website",
// //     siteName: company.legalName,
// //     locale: "en_IN",
// //   },
// //   // Staging is never indexed. Set ALLOW_INDEXING=true only in approved production.
// //   robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
// // };

// // export const viewport: Viewport = {
// //   themeColor: "#2a0d10",
// // };

// // export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
// //   return (
// //     <html lang="en-IN" className={`${display.variable} ${sans.variable}`}>
// //       <body className="min-h-dvh">
// //         <a className="skip-link" href="#main-content">
// //           Skip to content
// //         </a>
// //         <ScrollProgress />
// //         <SiteHeader />
// //         {children}
// //         <SiteFooter />
// //       </body>
// //     </html>
// //   );
// // }




















// // import type { Metadata, Viewport } from "next";
// // import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
// // import { SiteFooter } from "@/components/layout/site-footer";
// // import { SiteHeader } from "@/components/layout/site-header";
// // import { company } from "@/content/site";
// // import { allowIndexing } from "@/lib/seo";
// // import "./globals.css";

// // const display = Bricolage_Grotesque({
// //   subsets: ["latin"],
// //   variable: "--font-bricolage",
// //   display: "swap",
// // });

// // const sans = Instrument_Sans({
// //   subsets: ["latin"],
// //   variable: "--font-instrument-sans",
// //   display: "swap",
// // });

// // export const metadata: Metadata = {
// //   metadataBase: new URL("https://supremefacility.com"),
// //   title: {
// //     default: "Comprehensive Facility Management Services Company in India | Supreme Facility Management",
// //     template: "%s | Supreme Facility Management",
// //   },
// //   description:
// //     "Supreme Facility Management is your partner for integrated facility management, supply chain, employee transportation, corporate food and production support services across India.",
// //   openGraph: {
// //     type: "website",
// //     siteName: company.legalName,
// //     locale: "en_IN",
// //   },
// //   // Staging is never indexed. Set ALLOW_INDEXING=true only in approved production.
// //   robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
// // };

// // export const viewport: Viewport = {
// //   themeColor: "#2a0d10",
// // };

// // export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
// //   return (
// //     <html lang="en-IN" className={`${display.variable} ${sans.variable}`}>
// //       <body className="min-h-dvh">
// //         <a className="skip-link" href="#main-content">
// //           Skip to content
// //         </a>
// //         <SiteHeader />
// //         {children}
// //         <SiteFooter />
// //       </body>
// //     </html>
// //   );
// // }
