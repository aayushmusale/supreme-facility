/**
 * Investor Relations content.
 * SOURCE: https://supremefacility.com/investor/ (checked 26 Oct 2026). Every title, date and PDF/file link is
 * copied exactly as published, including file links on nsearchives.nseindia.com (NSE's own archive).
 * FLAG comments mark apparent errors already present on the live site (broken links, mismatched titles/dates).
 * This is regulated content: Investor Relations / Company Secretary / Compliance must review before launch.
 */

export type InvestorDoc = { title: string; href: string; date?: string; year: number };
export type InvestorGroup = { heading?: string; docs: InvestorDoc[] };
export type InvestorCategory = { id: string; label: string; groups: InvestorGroup[] };

export const investorContacts = {
  companySecretary: {
    heading: "Company Secretary",
    name: "Anshuman Singh Tomar",
    role: "Company Secretary and Compliance Officer",
    phone: "+91 7028091800",
    email: "compliance@supremefacility.com",
  },
  registrar: {
    heading: "Registrar of the Issue",
    name: "KFin Technologies Limited",
    contactPerson: "M Murali Krishna",
    phone: "+91 40 6716 2222",
    email: "sfml.ipo@kfintech.com",
  },
};

export const boardOfDirectors = [
  { name: "Lalasaheb Vitthalrao Shinde", din: "02053259", designation: "Whole Time Director" },
  { name: "Rajendra Lalasaheb Shinde", din: "02053237", designation: "Managing Director" },
  { name: "Amol Sharad Shingate", din: "06668108", designation: "Executive Director and CEO" },
  { name: "Manisha Rajendra Shinde", din: "03064088", designation: "Non-Executive Director" },
  { name: "Sagar Shrirang Jadhav", din: "07897967", designation: "Independent Director" },
  { name: "Gautam Deendayal Sharma", din: "10541840", designation: "Independent Director" },
  { name: "Asha Kaul", din: "06987839", designation: "Independent Director" },
];

export type Committee = { name: string; members: { name: string; category: string; designation: string }[] };

export const committees: Committee[] = [
  {
    name: "Audit Committee",
    members: [
      { name: "Gautam Deendayal Sharma", category: "Chairman", designation: "Independent Director" },
      { name: "Sagar Shrirang Jadhav", category: "Member", designation: "Independent Director" },
      { name: "Amol Sharad Shingate", category: "Member", designation: "Executive Director and CEO" },
    ],
  },
  {
    name: "Nomination and Remuneration Committee",
    members: [
      { name: "Gautam Deendayal Sharma", category: "Chairman", designation: "Independent Director" },
      { name: "Sagar Shrirang Jadhav", category: "Member", designation: "Independent Director" },
      { name: "Manisha Rajendra Shinde", category: "Member", designation: "Non-Executive Director" },
    ],
  },
  {
    name: "Stakeholders Relationship Committee",
    members: [
      { name: "Manisha Rajendra Shinde", category: "Chair Person", designation: "Non-Executive Director" },
      { name: "Sagar Shrirang Jadhav", category: "Member", designation: "Independent Director" },
      { name: "Gautam Deendayal Sharma", category: "Member", designation: "Independent Director" },
    ],
  },
  {
    name: "CSR Committee",
    members: [
      { name: "Lalasaheb Vitthalrao Shinde", category: "Chairman", designation: "" },
      { name: "Rajendra Lalasaheb Shinde", category: "Member", designation: "" },
      { name: "Sagar Shrirang Jadhav", category: "Member", designation: "" },
    ],
  },
];

const inv = "https://supremefacility.com/Investor";
const nse = "https://nsearchives.nseindia.com/corporate";

export const ipoDocs: InvestorDoc[] = [
  { title: "DRHP", href: `${inv}/supreme-facility-management-DRHP.pdf`, year: 2024 },
  // FLAG: this link is http:// (not https) on the live site.
  { title: "RHP", href: "http://supremefacility.com/Investor/SUPREME2005_26092024183046_NSEReplyAddendumSupremeFacility%20%281%29%20%281%29.pdf", year: 2024 },
  { title: "Addendum", href: `${inv}/SUPREME2005_26092024183046_NSEReplyAddendumSupremeFacility%20%281%29.pdf`, year: 2024 },
  { title: "Prospectus", href: `${inv}/prospectus.pdf`, year: 2024 },
];

export const policyDocs: InvestorDoc[] = [
  { title: "Archival Policy", href: `${inv}/Policy_on_Archival_of_Documents.pdf`, year: 2024 },
  { title: "Code of Conduct Policy", href: `${inv}/Code_of_conduct.pdf`, year: 2024 },
  { title: "Independent Directors Policy", href: `${inv}/Independent_Directors__Policy.pdf`, year: 2024 },
  { title: "Materiality Policy", href: `${inv}/Materiality-Policy.pdf`, year: 2024 },
  { title: "Whistle Blower Policy", href: `${inv}/Whistle_Blower_Policy_and_Vigil_Mechanism.pdf`, year: 2024 },
  { title: "POSH Policy", href: `${inv}/POSH_POLICY.pdf`, year: 2024 },
  { title: "CSR Policy", href: `${inv}/CSR_Policy.pdf`, year: 2024 },
  { title: "Familiarization Policy for Independent Directors", href: `${inv}/Familiarization_Policy_for_Independent_Directors.pdf`, year: 2024 },
];

export const materialContractDocs: InvestorDoc[] = [
  { title: "MOA", href: `${inv}/MoA.pdf`, year: 2024 },
  { title: "AOA", href: `${inv}/AoA.pdf`, year: 2024 },
  { title: "Certificate of Incorporation", href: `${inv}/Certificate%20of%20Incorporation.pdf?_t=1712206687`, year: 2024 },
];

export const investorCategories: InvestorCategory[] = [
  {
    id: "restated-financials",
    label: "Restated Financials",
    groups: [
      {
        docs: [
          { title: "Restated Financials", href: `${inv}/Restated_Financials_SFML_23-24.pdf`, date: "31 March 2024", year: 2024 },
          { title: "Restated Financials", href: `${inv}/Restated%20Financials%20as%20on%20June%2030,%202024.pdf`, date: "30 June 2024", year: 2024 },
        ],
      },
    ],
  },
  {
    id: "standalone-financials",
    label: "Standalone Financials",
    groups: [
      {
        docs: [
          { title: "FY 2020-2021", href: `${inv}/SFML_FY_2020-21.pdf`, year: 2021 },
          { title: "FY 2021-2022", href: `${inv}/SFML_FY_2021-22.pdf`, year: 2022 },
          { title: "FY 2022-2023", href: `${inv}/SFML_FY_2022-23.pdf`, year: 2023 },
          { title: "FY 2023-2024", href: `${inv}/SFML_FY_2023-24.pdf`, year: 2024 },
          { title: "FY 2024-2025", href: `${inv}/SFML_Standalone_March%2025_Financials.pdf`, year: 2025 },
        ],
      },
    ],
  },
  {
    id: "consolidated-financials",
    label: "Consolidated Financials",
    groups: [
      {
        docs: [
          { title: "FY 2020-2021", href: `${inv}/SFML_CONSO_20-21.pdf`, year: 2021 },
          { title: "FY 2021-2022", href: `${inv}/SFML_CONSO_21-22.pdf`, year: 2022 },
          { title: "FY 2022-2023", href: `${inv}/SFML_CONSO_22-23.pdf`, year: 2023 },
          { title: "FY 2023-2024", href: `${inv}/SFML_CONSO_23-24.pdf`, year: 2024 },
          { title: "FY 2024-2025", href: `${inv}/SFML_Conso_March%2025_Financials.pdf`, year: 2025 },
        ],
      },
    ],
  },
  {
    id: "annual-report",
    label: "Annual Report",
    groups: [
      {
        docs: [
          { title: "FY 2020-2021", href: `${inv}/Annual-Report-FY-20-21.pdf`, year: 2021 },
          { title: "FY 2021-2022", href: `${inv}/Annual-Report-FY-21-22.pdf`, year: 2022 },
          { title: "FY 2022-2023", href: `${inv}/Annual-Report-FY-22-23.pdf`, year: 2023 },
          { title: "FY 2023-2024", href: `${inv}/Annual%20Report-Supreme_23-24_Final.pdf`, year: 2024 },
          { title: "FY 2024-2025", href: `${inv}/Supreme%20Facility%20Management%20Annual%20Report%202025%20%20-%20CTP%20FILE.pdf`, year: 2025 },
          // FLAG: this link has no file extension on the live site, so it may not open correctly. Needs a fixed file.
          { title: "FY 2025-2026", href: `${inv}/Supreme%20Facility%20Management%20Annual%20Report%202026`, year: 2026 },
        ],
      },
    ],
  },
  {
    id: "group-company-financials",
    label: "Group Company Financials",
    groups: [
      {
        heading: "Supreme Motion Pictures Private Limited",
        docs: [
          { title: "FY 2020-2021", href: `${inv}/Supreme_Motion_FY_20-21_FS.pdf`, year: 2021 },
          { title: "FY 2021-2022", href: `${inv}/Supreme_Motion_FY_21-22_FS.pdf`, year: 2022 },
          { title: "FY 2022-2023", href: `${inv}/Supreme_Motion_FY_22-23_FS.pdf`, year: 2023 },
          { title: "FY 2023-2024", href: `${inv}/Audit%20Report%20with%20FS%2023-24.pdf`, year: 2024 },
        ],
      },
      {
        heading: "Supreme Holidays (India) Private Limited",
        docs: [
          { title: "FY 2020-2021", href: `${inv}/SH_20-21_FS.pdf`, year: 2021 },
          { title: "FY 2021-2022", href: `${inv}/SH_21-22_FS.pdf`, year: 2022 },
          { title: "FY 2022-2023", href: `${inv}/SH_22-23_FS.pdf`, year: 2023 },
          { title: "FY 2023-2024", href: `${inv}/Independent%20Audit%20Report%20with%20FS%2023-24.pdf`, year: 2024 },
        ],
      },
    ],
  },
  {
    id: "subsidiary-company-financials",
    label: "Subsidiary Company Financials",
    groups: [
      {
        heading: "Trimurty Utility Services Private Limited",
        docs: [
          { title: "FY 2020-2021", href: `${inv}/TUSPL_FS_2020-21.pdf`, year: 2021 },
          { title: "FY 2021-2022", href: `${inv}/TUSPL_FS_2021-22.pdf`, year: 2022 },
          { title: "FY 2022-2023", href: `${inv}/TUSPL_FS_2022-23.pdf`, year: 2023 },
          { title: "FY 2023-2024", href: `${inv}/TUSPL_FS_2023-24.pdf.`, year: 2024 },
          { title: "FY 2024-2025", href: `${inv}/TUSPL%20Financial%20March%2025.pdf`, year: 2025 },
        ],
      },
      {
        heading: "Everdew Engineering Private Limited",
        docs: [
          { title: "FY 2020-2021", href: `${inv}/EEPL_FS_20-21.pdf`, year: 2021 },
          { title: "FY 2021-2022", href: `${inv}/EEPL_FS_21-22.pdf`, year: 2022 },
          { title: "FY 2022-2023", href: `${inv}/EEPL_FS_22-23.pdf`, year: 2023 },
          { title: "FY 2023-2024", href: `${inv}/EEPL_FS_23-24.pdf`, year: 2024 },
          { title: "FY 2024-2025", href: `${inv}/EEPL%20Financial%20March%2025.pdf`, year: 2025 },
        ],
      },
      {
        heading: "Ialpha Mobility Solutions Private Limited",
        docs: [
          { title: "FY 2021-2022", href: `${inv}/IMSPL_FS_21-22.pdf`, year: 2022 },
          { title: "FY 2022-2023", href: `${inv}/IMSPL_FS_22-23.pdf`, year: 2023 },
          { title: "FY 2023-2024", href: `${inv}/IMSPL_FS_23-24.pdf`, year: 2024 },
          { title: "FY 2024-2025", href: `${inv}/IALPHA%20Financial%20March%2025.pdf`, year: 2025 },
        ],
      },
    ],
  },
  {
    id: "disclosures-updates",
    label: "Disclosures & Updates",
    groups: [
      {
        docs: [
          { title: "Earnings Conference Call (audio)", href: `${inv}/Earnings%20concall.mpeg`, date: "21 November 2025", year: 2025 },
          { title: "Earnings Call Transcript", href: `${inv}/Earnings%20Call%20Transcript.pdf`, date: "21 November 2025", year: 2025 },
          { title: "Related Party Transaction", href: `${inv}/RPT.html`, date: "30 September 2024", year: 2024 },
          { title: "Shareholding Pattern", href: `${inv}/SHP31MARCH%202026.html`, date: "31 March 2026", year: 2026 },
          { title: "Shareholding Pattern", href: `${inv}/SHP%20For%20March%2031.html`, date: "31 March 2025", year: 2025 },
          { title: "Familiarization of Independent Director", href: `${inv}/ID%20SFML.pdf`, year: 2024 },
          { title: "Newspaper Publication", href: `${inv}/NewsPaperPublication.pdf`, date: "28 May 2025", year: 2025 },
          { title: "Newspaper Publication", href: `${inv}/News%20Paper%20Publication.pdf`, date: "10 January 2025", year: 2025 },
          { title: "Newspaper Publication", href: `${inv}/newspaper%20publication.pdf`, date: "23 February 2025", year: 2025 },
          {
            title: "Press Release: IFM Services Contract (Tata Technologies)",
            href: `${inv}/Supreme%20Facility%20Management%20-%20TTL%20%20IFM%20Contract.pdf`,
            date: "3 June 2025",
            year: 2025,
          },
          // FLAG: these two press-release links are http:// (not https) on the live site.
          {
            title: "Press Release: H2 FY25 Earnings",
            href: "http://supremefacility.com/Investor/Supreme%20Facility%20Management%20-%20H2%20FY25%20Earnings%20Release.pdf",
            date: "28 May 2025",
            year: 2025,
          },
          {
            // FLAG: the live page labels this "22 February 2024", but the file name encodes 22 Feb 2025. Date needs confirming with IR.
            title: "Press Release",
            href: "http://supremefacility.com/Investor/Press%20Release%2022022025.pdf",
            date: "22 February 2024 (file name suggests 2025)",
            year: 2025,
          },
          {
            title: "Press Release",
            href: "http://supremefacility.com/Investor/Press%20Release%20January%2015,%202025.pdf",
            date: "15 January 2025",
            year: 2025,
          },
          {
            title: "Press Release",
            href: `${nse}/SUPREME2005_23122024193103_press_release.pdf`,
            date: "23 December 2024",
            year: 2024,
          },
          { title: "SDD", href: `${inv}/SDD.pdf`, date: "31 March 2025", year: 2025 },
          { title: "Annual Compliance", href: `${inv}/Annual%20Compliance%20Report.pdf`, date: "31 March 2025", year: 2025 },
          { title: "Disclosure Regulation 30: Alteration in Articles of Association", href: `${inv}/Alteration%20in%20Articles%20of%20Association.pdf`, year: 2024 },
          { title: "Disclosure Regulation 30: Agreements", href: `${nse}/SUPREME2005_23122024182508_Disclosure_Regulation_30.pdf`, date: "23 December 2024", year: 2024 },
          { title: "Disclosure Regulation 30: Resignation of CS", href: `${nse}/SUPREME2005_24122024151748_Resignation_of_CS241224.pdf`, date: "24 December 2024", year: 2024 },
          { title: "Disclosure Regulation 30: Appointment of CS", href: `${nse}/SUPREME2005_07012025160023_BM.pdf`, date: "7 January 2025", year: 2025 },
          { title: "Disclosure Regulation 30: Address Change", href: `${inv}/General%20Updates.pdf`, year: 2024 },
          { title: "Regulation 30 Update: Trading Window Closure", href: `${inv}/27%20March%20Trading%20window%20Closure.pdf`, date: "27 March 2025", year: 2025 },
          { title: "Regulation 30 Update: Resignation", href: `${inv}/27%20March%20Resignation.pdf`, date: "27 March 2025", year: 2025 },
          { title: "Regulation 30 Update: Declaration", href: `${inv}/25%20March%20Declaration.pdf`, date: "25 March 2025", year: 2025 },
          { title: "Regulation 30 Update: Waiver Request", href: `${inv}/18%20March%20waiverrequest.pdf`, date: "18 March 2025", year: 2025 },
          { title: "Regulation 30 Update", href: `${inv}/250313004840_0001.pdf`, date: "13 March 2025", year: 2025 },
          { title: "Regulation 30 Update", href: `${inv}/SFML28022025.pdf`, date: "28 February 2025", year: 2025 },
          { title: "Regulation 30 Update: Reason for Delay", href: `${inv}/Reason%20for%20delay.pdf`, date: "14 February 2025", year: 2025 },
          { title: "Regulation 30 Update", href: `${inv}/Updates.pdf`, date: "10 February 2025", year: 2025 },
          { title: "Regulation 30 Update: General Updates", href: `${nse}/SUPREME2005_15012025130038_General_Updates.pdf`, date: "15 January 2025", year: 2025 },
        ],
      },
    ],
  },
  {
    id: "board-meeting",
    label: "Board Meeting",
    groups: [
      {
        heading: "Prior Intimation",
        docs: [
          { title: "FY 2026-27", href: `${inv}/Prior%20Intimation%20Board%20Meeting.pdf`, date: "August 2026", year: 2026 },
          { title: "FY 2025-26", href: `${inv}/BM070326.pdf`, date: "February 2026", year: 2026 },
          { title: "FY 2025-26", href: `${inv}/prior_intimation_2.pdf`, date: "August 2025", year: 2025 },
          { title: "FY 2025-26", href: `${inv}/Prior%20Intimation.pdf`, date: "May 2025", year: 2025 },
          { title: "FY 2024-25", href: `${nse}/SUPREME2005_28122024183825_BM_intimation.pdf`, date: "7 January 2025", year: 2025 },
          { title: "FY 2024-25", href: `${inv}/BMINTIMATION.pdf`, date: "21 February 2025", year: 2025 },
        ],
      },
      {
        heading: "Outcome of Board Meeting",
        docs: [
          { title: "Outcome of Board Meeting", href: `${inv}/SUPREME2005_26052026180430_Financial_Results_Outcome.pdf`, date: "26 May 2026", year: 2026 },
          { title: "Outcome of Board Meeting", href: `${inv}/260307003029_0001.pdf`, date: "7 March 2026", year: 2026 },
          { title: "Outcome of Board Meeting", href: `${inv}/Outcome%20of%20Board%20Meeting.pdf`, date: "14 November 2025", year: 2025 },
          { title: "Outcome of Board Meeting", href: `${nse}/SUPREME2005_07012025155609_Outcome_of_BM-.pdf`, date: "7 January 2025", year: 2025 },
        ],
      },
      {
        heading: "Postal Ballot",
        docs: [
          { title: "Postal Ballot Notice", href: `${inv}/20774_POB_Notice.pdf`, date: "10 June 2025", year: 2025 },
          { title: "Postal Ballot Notice", href: `${nse}/SUPREME2005_09012025225839_SFMLPOSTALBALLOT.pdf`, year: 2025 },
        ],
      },
      {
        heading: "E-voting",
        docs: [
          { title: "Scrutinizer Report", href: `${inv}/ScrutinizerReport.pdf`, date: "11 July 2025", year: 2025 },
          { title: "Scrutinizer Report", href: `${inv}/Scrutinizer%20Report.pdf`, date: "9 February 2025", year: 2025 },
        ],
      },
    ],
  },
  {
    id: "quarterly-compliance",
    label: "Quarterly Compliance",
    groups: [
      {
        heading: "March 2025",
        docs: [
          { title: "Integrated Filing", href: `${inv}/Integrated%20Filing.pdf`, year: 2025 },
          { title: "Investor Grievances", href: `${inv}/Investor%20Grievances%20Report.pdf`, year: 2025 },
          { title: "Regulation 74", href: `${inv}/Reg%2074.pdf`, date: "8 April 2025", year: 2025 },
        ],
      },
      {
        heading: "December 2024",
        docs: [
          { title: "Investor Grievances", href: `${inv}/IGR.html`, year: 2024 },
          { title: "Reconciliation of Share Capital Audit", href: `${inv}/reconciliation.pdf`, year: 2024 },
        ],
      },
      {
        heading: "Reconciliation of Share Capital",
        docs: [{ title: "Reconciliation of Share Capital", href: `${inv}/ShareRECO.pdf`, date: "31 March 2025", year: 2025 }],
      },
    ],
  },
  {
    id: "annual-disclosure",
    label: "Annual Disclosure",
    groups: [{ docs: [{ title: "Compliance Certificate RTA", href: `${inv}/Compliance%20Certificate%20RTA.pdf`, year: 2025 }] }],
  },
  {
    id: "financial-result",
    label: "Financial Result",
    groups: [
      {
        heading: "Annual Result",
        docs: [
          { title: "March 2026", href: `${inv}/Financial%20Result%20March%202026.pdf`, year: 2026 },
          { title: "March 2025", href: `${inv}/Outcome%20of%20BM.pdf`, year: 2025 },
        ],
      },
      {
        heading: "Half Yearly Result",
        docs: [
          { title: "September 2025", href: `${nse}/SUPREME2005_14112025225048_Outcome_of_Board_Meeting_H1_FY25-26.pdf`, year: 2025 },
          { title: "September 2024", href: `${inv}/Financial%20Result%20september%202024.pdf`, year: 2024 },
        ],
      },
    ],
  },
  {
    id: "corporate-governance",
    label: "Corporate Governance",
    groups: [
      { heading: "June 2025", docs: [{ title: "30 June 2025", href: `${inv}/Corporate-Governance-June%2030,%202025.pdf`, year: 2025 }] },
      { heading: "March 2025", docs: [{ title: "31 March 2025", href: `${inv}/Declaration.pdf`, year: 2025 }] },
    ],
  },
  {
    id: "notice-of-agm",
    label: "Notice of AGM",
    groups: [
      {
        docs: [
          // FLAG: this 2026 link points to the same file name as the Annual Report, likely a placeholder on the live site.
          { title: "2026", href: `${inv}/Annual%20Report%202026.pdf`, year: 2026 },
          { title: "2025", href: `${inv}/Notice%20Supreme%20Facility%20Management%20Annual%20Report%202025%20FINAL.pdf`, year: 2025 },
        ],
      },
    ],
  },
  {
    id: "agm-voting-result",
    label: "AGM Voting Result",
    groups: [{ docs: [{ title: "2025", href: `${inv}/agm-voting-result.pdf`, year: 2025 }] }],
  },
  {
    id: "scrutinizer-report",
    label: "Scrutinizer Report",
    groups: [
      {
        docs: [
          { title: "2026", href: `${nse}/SUPREME2005_28092026164801_Scrutinizer_Report.pdf`, year: 2026 },
          { title: "2025", href: `${inv}/scrutinizer-report.pdf`, year: 2025 },
        ],
      },
    ],
  },
];

export const allInvestorYears = Array.from(
  new Set(investorCategories.flatMap((category) => category.groups.flatMap((group) => group.docs.map((doc) => doc.year)))),
).sort((a, b) => b - a);

// FLAG: the live page's CSR paragraph is truncated mid-sentence ("...located at Shri"). Shown here up to the
// last complete sentence; the rest needs the full text from the CSR/Compliance owner.
export const csrParagraphs = [
  "Corporate Social Responsibility (CSR) refers to the ethical obligation of companies to contribute to sustainable economic development by delivering social, environmental, and economic benefits to all stakeholders, including employees, local communities, and society at large. The concept of CSR has been recognized as a critical aspect of corporate governance, and in India, it is governed by the Companies Act, 2013, under Section 135, which lays down the framework for CSR activities and expenditures.",
  "During the year under review, Supreme Facility Management made a CSR expense of ₹8 lakh to National Sulabh Sansthan, located at Sri Ganganagar, Rajasthan.",
];
