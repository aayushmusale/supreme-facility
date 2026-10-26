import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { company } from "@/content/site";
import { allowIndexing } from "@/lib/seo";
import "./globals.css";

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
    <html lang="en-IN" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-dvh">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
