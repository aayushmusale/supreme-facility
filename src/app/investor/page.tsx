import { Mail, Phone } from "lucide-react";
import { DocumentLibrary } from "@/components/investor/document-library";
import { InvestorSectionNav } from "@/components/investor/section-nav";
import { SimpleDocList } from "@/components/investor/simple-doc-list";
import { PageHero } from "@/components/page/page-hero";
import {
  allInvestorYears,
  boardOfDirectors,
  committees,
  csrParagraphs,
  investorCategories,
  investorContacts,
  ipoDocs,
  materialContractDocs,
  policyDocs,
} from "@/content/investor";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Investor Relations",
  description:
    "Investor Relations for Supreme Facility Management Limited: IPO documents, policies, financials, annual reports, board composition and regulatory disclosures.",
  path: "/investor/",
});

const sectionHeading = "font-display text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-balance";

function ContactCard({ contact }: { contact: { heading: string; name: string; role?: string; contactPerson?: string; phone: string; email: string } }) {
  return (
    <div className="rounded-3xl border border-line bg-white p-7">
      <p className="text-sm font-medium text-muted">{contact.heading}</p>
      <p className="mt-2 font-display text-xl font-semibold">{contact.name}</p>
      {contact.role && <p className="mt-1 text-ink">{contact.role}</p>}
      {contact.contactPerson && <p className="mt-1 text-ink">{contact.contactPerson}</p>}
      <div className="mt-4 space-y-2 text-[0.95rem]">
        <a href={`tel:${contact.phone.replaceAll(" ", "")}`} className="flex items-center gap-2 hover:text-brand-700">
          <Phone aria-hidden className="size-4 text-brand-700" />
          {contact.phone}
        </a>
        <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-brand-700">
          <Mail aria-hidden className="size-4 text-brand-700" />
          {contact.email}
        </a>
      </div>
    </div>
  );
}

export default function InvestorPage() {
  return (
    <main id="main-content">
      <PageHero
        breadcrumbs={[{ label: "Investor Relations", href: "/investor/" }]}
        title="Investor Relations"
        lead="Transparent, accurate information for shareholders, analysts and other stakeholders."
        showActions={false}
      />
      {/* <InvestorSectionNav /> */}

      <section id="ipo" aria-labelledby="ipo-title" className="scroll-mt-40 bg-stone py-16 md:py-24">
        <div className="container-page">
          <h2 id="ipo-title" className={sectionHeading}>
            Initial Public Offer
          </h2>
          <div className="mt-8">
            <SimpleDocList docs={ipoDocs} />
          </div>
        </div>
      </section>

      <section id="policies" aria-labelledby="policies-title" className="scroll-mt-40 py-16 md:py-24">
        <div className="container-page">
          <h2 id="policies-title" className={sectionHeading}>
            Policies
          </h2>
          <div className="mt-8">
            <SimpleDocList docs={policyDocs} />
          </div>
        </div>
      </section>

      <section id="investor-contacts" aria-labelledby="contacts-title" className="scroll-mt-40 bg-stone py-16 md:py-24">
        <div className="container-page">
          <h2 id="contacts-title" className={sectionHeading}>
            Investor Contacts
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            The same contacts handle grievance redressal under Regulation 46 of the SEBI (LODR) Regulations.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <ContactCard contact={investorContacts.companySecretary} />
            <ContactCard contact={investorContacts.registrar} />
          </div>
        </div>
      </section>

      <section id="board" aria-labelledby="board-title" className="scroll-mt-40 py-16 md:py-24">
        <div className="container-page">
          <h2 id="board-title" className={sectionHeading}>
            Board of Directors and Committees
          </h2>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <caption className="sr-only">Composition of the Board of Directors</caption>
              <thead>
                <tr className="border-b border-line bg-black/[0.04] text-muted">
                  <th scope="col" className="px-4 py-3 font-medium">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    DIN
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Designation
                  </th>
                </tr>
              </thead>
              <tbody>
                {boardOfDirectors.map((member) => (
                  <tr key={member.din} className="border-b border-line last:border-0">
                    <td className="px-4 py-3 font-medium">{member.name}</td>
                    <td className="px-4 py-3 text-muted">{member.din}</td>
                    <td className="px-4 py-3">{member.designation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {committees.map((committee) => (
              <div key={committee.name} className="overflow-x-auto rounded-2xl border border-line bg-white">
                <p className="border-b border-line px-4 py-3 font-display font-semibold">{committee.name}</p>
                <table className="w-full min-w-[26rem] text-left text-sm">
                  <caption className="sr-only">Composition of the {committee.name}</caption>
                  <tbody>
                    {committee.members.map((member) => (
                      <tr key={member.name} className="border-b border-line last:border-0">
                        <td className="px-4 py-3 font-medium">{member.name}</td>
                        <td className="px-4 py-3 text-muted">{member.category}</td>
                        {member.designation && <td className="px-4 py-3">{member.designation}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          <h3 className="mt-14 font-display text-xl font-semibold">Material Contract</h3>
          <div className="mt-6">
            <SimpleDocList docs={materialContractDocs} />
          </div>
        </div>
      </section>

      <section id="documents" aria-labelledby="documents-title" className="scroll-mt-40 bg-stone py-16 md:py-24">
        <div className="container-page">
          <h2 id="documents-title" className={sectionHeading}>
            Financials and regulatory disclosures
          </h2>
          <p className="mt-3 max-w-2xl text-muted">Filter by category and year to find a specific filing.</p>
          <div className="mt-8">
            <DocumentLibrary categories={investorCategories} years={allInvestorYears} />
          </div>
        </div>
      </section>

      <section id="csr" aria-labelledby="csr-title" className="scroll-mt-40 py-16 md:py-24">
        <div className="container-page max-w-3xl">
          <h2 id="csr-title" className={sectionHeading}>
            Corporate Social Responsibility
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-ink">
            {csrParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
