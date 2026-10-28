/**
 * Site content.
 * SOURCE: https://supremefacility.com/ (public site, checked 26 Oct 2026).
 * Status: treated as final for now on instruction; still needs owner sign-off before launch.
 * Images marked TEMPORARY are stock or hotlinked and must be replaced.
 */

export type NavLink = { label: string; href: string };

export type NavItem =
  | { kind: "link"; label: string; href: string }
  | { kind: "menu"; label: string; items: NavLink[] }
  | { kind: "services"; label: string };

export const company = {
  legalName: "Supreme Facility Management Limited",
  shortName: "Supreme Facility Management",
  tagline: "Making Sustainability Common Place",
  phone: { display: "+91 20631 14400", href: "tel:+912063114400" },
  email: "info@supremefacility.com",
  whatsapp: "https://wa.me/918956064548",
  address: [
    "Kohinoor World Tower T-3, 10th Floor,",
    "Office Nos. 1002 to 1005, Old Pune Mumbai Highway,",
    "PCMC, Chinchwad East, Pune, Maharashtra 411019, India",
  ],
  brochure: "https://supremefacility.com/wp-content/uploads/2023/12/Corporate-Profile_V6-1.pdf",
  logo: "/sfm-sticky-logo-1-removebg.png",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/supreme-facility-management-pvt-ltd/" },
    { label: "Facebook", href: "https://www.facebook.com/supremefacilitymanagementpvtltd/" },
    { label: "Instagram", href: "https://www.instagram.com/supremefacilitymanagement1983/" },
    { label: "YouTube", href: "https://www.youtube.com/@supremefacilitymanagementpvtlt/videos" },
  ],
} as const;

export const pillars = ["Sustainability", "Safety", "Quality", "People", "Process", "Technology"] as const;
export type Pillar = (typeof pillars)[number];

export const valueProposition = [
  "Visibility & Transparency",
  "Responsibility & Accountability",
  "Pay for What We Deliver",
] as const;

export const stats = [
  { value: 14, suffix: "+", label: "States" },
  { value: 48, suffix: "+", label: "Mn sq ft area managed" },
  { value: 175, suffix: "+", label: "Clients served" },
  { value: 500, suffix: "+", label: "Vehicle fleet" },
  { value: 6200, suffix: "+", label: "Meals per day" },
  { value: 17000, suffix: "+", label: "Employees" },
  { value: 25000, suffix: "+", label: "Passengers per day" },
] as const;

export const servicesIntro =
  "A spectrum of integrated solutions where we harmonise excellence and innovation. Our offerings cover the many dimensions of modern business needs, ensuring seamless operations and better experiences.";

export const services = [
  {
    title: "Integrated Facility Management",
    href: "/integrated-facility-management/",
    summary:
      "Seamless workplace solutions driven by innovation, technology and expert resources. Our integrated approach keeps your facilities and services running efficiently and improves the experience of everyone who uses them.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80", // TEMPORARY
    alt: "Glass-fronted commercial building",
    includes: [
      { label: "Hard services", href: "/hard-services/" },
      { label: "Soft services", href: "/best-soft-facility-management-services-in-india/" },
      { label: "Specialized services", href: "/specialized-services/" },
      { label: "Health care services", href: "/hospital-healthcare-facility-management/" },
      { label: "Staffing solutions", href: "/staffing-manpower-solution/" },
      { label: "Hospitality services", href: "/hospitality-management/" },
    ],
  },
  {
    title: "Supply Chain Solutions",
    href: "/supply-chain-solutions/",
    summary:
      "Strategic solutions that simplify supply chain management, streamline processes and support sustainable growth.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80", // TEMPORARY
    alt: "Warehouse shelves and logistics equipment",
  },
  {
    title: "Employee Transportation Services",
    href: "/employee-transportation-services/",
    summary:
      "Smooth, secure employee commutes through reliable transportation designed for your workforce's safety, well-being and productivity.",
    // image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80", // TEMPORARY
    image: "/ETS.jpeg",
    alt: "Passenger bus on a road",
  },
  {
    title: "Corporate Food Solutions",
    href: "/corporate-food-solutions/",
    summary:
      "We manage your food and beverage services with precision, delivering nourishment and satisfaction to your workforce.",
    // image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=1400&q=80", // TEMPORARY
    image: "/CFS.jpeg",
    alt: "Prepared meal served on a plate",
  },
  {
    title: "Production Support Services",
    href: "/production-support-services/",
    summary:
      "Better manufacturing efficiency: we manage supporting operations on the floor so your business can focus on its core.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80", // TEMPORARY
    alt: "Industrial production equipment",
  },
] as const;

export const ifmMenu = {
  overview: { label: "Integrated Facility Management", href: "/integrated-facility-management/" },
  groups: [
    {
      label: "Hard services",
      href: "/hard-services/",
      items: [
        { label: "Electrical & Mechanical", href: "/electrical-and-mechanical/" },
        { label: "Fire Fighting", href: "/fire-fighting-services/" },
        { label: "Plumbing & Carpentry", href: "/plumbing-and-carpentry/" },
        { label: "Asset Management", href: "/asset-managements/" },
        { label: "BMS Operations", href: "/bms-operations/" },
      ],
    },
    {
      label: "Soft services",
      href: "/best-soft-facility-management-services-in-india/",
      items: [
        { label: "Mechanized Housekeeping", href: "/mechanized-housekeeping-services/" },
        { label: "Landscaping & Gardening", href: "/commercial-landscaping-gardening/" },
        { label: "Guest House Management", href: "/guest-house-management-services/" },
        { label: "Front Office Management", href: "/front-office-management/" },
        { label: "Helpdesk & Mailroom", href: "/helpdesk-and-mailroom-solution/" },
      ],
    },
  ],
  more: [
    { label: "Specialized Services", href: "/specialized-services/" },
    { label: "Health Care Services", href: "/hospital-healthcare-facility-management/" },
    { label: "Staffing Solutions", href: "/staffing-manpower-solution/" },
    { label: "Hospitality Services", href: "/hospitality-management/" },
  ],
} as const;

export const mainNav: NavItem[] = [
  {
    kind: "menu",
    label: "About",
    items: [
      { label: "About SFM", href: "/about-us/" },
      { label: "Diversity and Inclusion", href: "/diversity-and-inclusion/" },
      { label: "Digitalization and Technology", href: "/digitalization-and-technology/" },
      { label: "Sustainability", href: "/esg/" },
      { label: "Safety", href: "/safety-3/" },
    ],
  },
  { kind: "services", label: "Services" },
  { kind: "link", label: "Sectors", href: "/sectors/" },
  { kind: "link", label: "Investor", href: "/investor/" },
  { kind: "link", label: "Careers", href: "/careers/" },
  {
    kind: "menu",
    label: "Resources",
    items: [
      { label: "Blogs", href: "/blogs/" },
      { label: "Employee Engagement", href: "/employee-engagement/" },
    ],
  },
];

const wp = "https://supremefacility.com/wp-content/uploads";

export const sectors = [
  { label: "IT/ITES", image: `${wp}/2023/06/IT.jpg` },
  { label: "Engineering", image: `${wp}/2023/06/Engineering.jpg` },
  { label: "Automotive", image: `${wp}/2023/06/Automotive.jpg` },
  { label: "Healthcare", image: `${wp}/2023/06/Healthcare.jpg` },
  { label: "Hospitality", image: `${wp}/2024/04/hospitality.jpg` },
  { label: "Public Sector", image: `${wp}/2023/06/Public-Sector.jpg` },
  { label: "Education", image: `${wp}/2023/06/Education.jpg` },
  { label: "Logistics", image: `${wp}/2023/06/Logistics.jpg` },
  { label: "Retail", image: `${wp}/2023/06/Retail.jpg` },
  { label: "E-Commerce", image: `${wp}/2023/06/E-commerce.jpg` },
  { label: "Commercial Buildings", image: `${wp}/2023/06/Commercial-Buildings.jpg` },
  { label: "Corporate Parks", image: `${wp}/2023/06/Corporate-parks.jpg` },
] as const;

export const leadership = [
  { name: "Dr. Lalasaheb V. Shinde", role: "Chairman", image: `${wp}/2024/02/sHINDE-sIR.jpg` },
  { name: "Rajendra Shinde", role: "Managing Director", image: `${wp}/2024/02/Rajendra-shinde.png` },
  { name: "Amol Shingate", role: "Director and CEO", image: `${wp}/2024/02/Amol-Shingate.png` },
] as const;

export const footerLinks: NavLink[] = [
  { label: "About Us", href: "/about-us/" },
  { label: "Clients", href: "/sectors/#homeclient" },
  { label: "Careers", href: "/careers/" },
  { label: "Corporate Brochure (PDF)", href: company.brochure },
  { label: "Investor", href: "/investor/" },
  { label: "Contact Us", href: "/contact-us/" },
  { label: "SEBI SCORES", href: "https://scores.sebi.gov.in/" },
];
