/**
 * Careers content.
 * SOURCE: https://supremefacility.com/careers/ (checked 26 Oct 2026; that page was last updated Dec 2024).
 *
 * IMPORTANT: every role is `hrVerified: false`. Unverified roles are shown ONLY in development, with a
 * "pending HR verification" badge, so no expired role is ever presented as open in production.
 * HR sets `hrVerified: true` (and `postedOn`) for roles that are genuinely open.
 */

export const careersEmail = "careers@supremefacility.com";

export const careersIntro = [
  "We prioritize our team's growth and success, with ongoing learning opportunities, innovation and a collaborative work environment. Safety is at our core, and our legacy of excellence and commitment to a sustainable future mean you can contribute to something meaningful.",
  "We offer competitive compensation, focus on career advancement and believe in nurturing talent from within. Join us in creating better environments, delivering quality services and building a brighter future.",
];

export type Job = {
  id: string;
  title: string;
  hrVerified: boolean;
  postedOn?: string;
  location: string;
  summary: string;
  details: { heading: string; items: string[] }[];
  facts?: { label: string; value: string }[];
};

export const jobs: Job[] = [
  {
    id: "tax-manager",
    title: "Tax Manager",
    hrVerified: false,
    location: "Pune (Akurdi)",
    summary:
      "Direct and manage direct and indirect tax functions and compliance for group companies, including monthly and quarterly tax preparation and reconciliations.",
    facts: [
      { label: "Education", value: "Graduate, Post Graduate, CA" },
      { label: "Experience", value: "2+ years" },
      { label: "Salary", value: "Up to ₹5 lakh" },
    ],
    details: [
      {
        heading: "Responsibilities",
        items: [
          "Plan, manage and develop all aspects of the company's tax process",
          "Deliver a full range of tax services within agreed timelines",
          "Improve company tax procedures",
          "Identify tax risks and help minimize them in acquisitions, mergers and other dealings",
          "Mentor accounting staff",
          "Manage tax provision, compliance and coordination with tax audits",
          "Maintain tax balances on the general ledger and prepare tax papers",
          "Review quarterly tax projections",
          "File GST, TDS, state and local tax returns on time",
          "Monitor tax law developments and ensure compliance",
        ],
      },
      {
        heading: "Requirements",
        items: [
          "Bachelor's in Commerce, Master's in Accounting; CA or CA dropout preferred",
          "2+ years as a Tax Manager, Tax Accountant or similar",
          "Excellent knowledge of tax accounting, compliance and returns, including GST and TDS",
          "Proficiency in MS Office and tax software such as IRIS, Tax Robo and SAP",
          "Ability to handle assessments and sensitive, confidential data",
          "Strong leadership, communication, problem-solving and attention to detail",
        ],
      },
    ],
  },
  {
    id: "purchasing-executive",
    title: "Purchasing Executive",
    hrVerified: false,
    location: "Pune",
    summary: "Run purchasing from vendor identification to purchase orders, GRN checks and payment follow-up.",
    facts: [
      { label: "Qualification", value: "Diploma / BE Mechanical" },
      { label: "Experience", value: "1–2 years; exceptional freshers considered" },
      { label: "Type", value: "Contract to start, with potential to move on-roll" },
    ],
    details: [
      {
        heading: "Responsibilities",
        items: [
          "Identify vendors, send RFQs, collect quotes and prepare comparisons",
          "Release purchase orders and follow up",
          "Check GRN preparation and submit documents to accounts",
          "Follow up to ensure timely release of payment",
          "Handle purchase parts, maintenance parts, admin supplies, indirect purchase, AMC and consumables",
        ],
      },
    ],
  },
  {
    id: "accounts-executive",
    title: "Accounts Executive / Accounts Receivable Executive",
    hrVerified: false,
    location: "Akurdi (Pimpri Chinchwad)",
    summary: "Maintain billing, invoices, reconciliations and receivables records, and support financial reporting.",
    facts: [
      { label: "Qualification", value: "B.Com / M.Com, MBA or CA Intern" },
      { label: "Experience", value: "3+ years in accounting" },
    ],
    details: [
      {
        heading: "Responsibilities",
        items: [
          "Maintain the billing system and generate invoices and account statements",
          "Perform account reconciliations and maintain receivables records",
          "Produce monthly financial and management reports",
          "Investigate and resolve irregularities and queries",
          "Assist in general financial management and analysis",
        ],
      },
      {
        heading: "Skills",
        items: [
          "Hands-on Tally, ERP software or SAP",
          "Strong MS Excel (VLOOKUP, HLOOKUP, pivot tables)",
          "Good communication skills",
        ],
      },
    ],
  },
  {
    id: "key-account-manager",
    title: "Key Account Manager (Supply Chain)",
    hrVerified: false,
    location: "Indore",
    summary: "Lead warehousing operations for LVS Supply Chain Solutions and deliver SLAs, reporting to the AGM – SCM.",
    facts: [
      { label: "Qualification", value: "MBA / Graduate; PG diploma in materials and logistics is a plus" },
      { label: "Team", value: "5 direct reports, 25–40 indirect" },
    ],
    details: [
      {
        heading: "Key responsibilities",
        items: [
          "Overall control of warehouse operations and SLA achievement",
          "Customer focus, people management, training and measurement",
          "Service delivery, compliance and P&L responsibility",
          "Hiring of manpower and handling local issues and grievances",
        ],
      },
      {
        heading: "Requirements",
        items: [
          "Experience in warehouse and inventory management operations",
          "Proficiency in SAP, WMS, Excel, Word and PowerPoint",
          "Fluent English and conversant in local languages",
          "Strong communication, analytical and time management skills (MTM)",
        ],
      },
    ],
  },
];

/** Roles visible in this environment. Production shows HR-verified roles only. */
export function visibleJobs() {
  return process.env.NODE_ENV === "production" ? jobs.filter((job) => job.hrVerified) : jobs;
}
