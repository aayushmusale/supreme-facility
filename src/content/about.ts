/**
 * About page content.
 * SOURCE: https://supremefacility.com/about-us/ (checked 26 Oct 2026). Copy lightly edited; long bios condensed.
 * FLAG comments mark figures that conflict with other pages or need Compliance/IR sign-off.
 */

const wp = "https://supremefacility.com/wp-content/uploads";

export const aboutIntro =
  "With over 40 years of experience, Supreme Facility Management leads in integrated facility management, supply chain solutions, employee transportation, corporate food solutions and production support services. Established in 1983 under the L. V. Shinde Group, we are a one-stop solution provider that improves employee experience and optimizes operations through our Operational Excellence programmes, with a strong emphasis on safety and sustainability.";

export const aboutOverview = {
  image: `${wp}/2023/08/soft-services.jpg`,
  imageAlt: "Supreme Facility Management team at a client site",
  paragraphs: [
    // FLAG: "150+ clients across 7+ states" and "10,000+ professionals" conflict with the homepage (175+ clients, 14+ states, 17,000+ employees).
    "Supreme Facility Management, part of the L. V. Shinde Group, is a leading facility management company in India, offering comprehensive services to 150+ clients across 7+ states.",
    "Since 1983, guided by Dr. L. V. Shinde, we have taken non-core work off businesses' hands so they can focus on their core objectives.",
    "Headquartered in Pune with regional offices across India, our 10,000+ professionals embody quality, integrity, commitment and execution. Our reputation is built on professionalism and client satisfaction.",
  ],
};

export const purpose = [
  { title: "Our purpose", text: "Making sustainable solutions possible for a greener and safer world." },
  { title: "Our vision", text: "Maintain a sustainable and excellent environment for our customers and employees at the workplace." },
  { title: "Our mission", text: "High-quality service for customer delight." },
];

export const values = [
  { title: "Accountability", text: "Consistently delivering on our commitments." },
  { title: "Integrity", text: "Actions that build trust and confidence." },
  { title: "Excellence", text: "Safety, sustainability and quality as core business drivers." },
  { title: "Leadership", text: "Lead and demonstrate by example." },
  { title: "Customer centricity", text: "Exceeding client expectations." },
];

export type Leader = { name: string; role: string; image: string; summary: string; bio: string[] };

export const leaders: Leader[] = [
  {
    name: "Dr. Lalasaheb V. Shinde",
    role: "Chairman",
    image: `${wp}/2023/11/sHINDE-sIR.jpg`,
    summary: "Chairman of the L. V. Shinde Group, with 40+ years in the industry.",
    bio: [
      "Dr. Lalasaheb Shinde is Chairman of the L. V. Shinde Group and a leader in business, film production and social work. His passion for integrated facility management and commitment to excellence have guided the company for over four decades.",
      "He leads with innovation, integrity and a relentless pursuit of quality, and sees the group's success as a collective achievement.",
      "He has produced films including \"Ajoba\" and the \"Boyz\" trilogy, and supports health check-ups, book distribution and tree plantation. His recognitions include the Best President Award and the Samaj Bhushan Puraskar.",
    ],
  },
  {
    name: "Rajendra Shinde",
    role: "Managing Director",
    image: `${wp}/2023/09/Rajendra-shinde.png`,
    summary: "Has grown the organization sustainably into a major force in the Indian FM industry.",
    bio: [
      "As Managing Director, Rajendra Shinde has grown the organization sustainably and earned the trust of clients for over two decades.",
      "His focus is on making the company an industry leader that sets benchmarks for corporate social responsibility, quality, innovation and customer satisfaction.",
    ],
  },
  {
    name: "Amol Shingate",
    role: "Director and CEO",
    image: `${wp}/2023/10/Amol-Shingate.png`,
    summary: "15+ years in facility management, including six years as Finance Head.",
    bio: [
      "Amol Shingate has been instrumental in shaping the company's culture, vision, strategy and expansion. His career of over 15 years in facility management includes a six-year tenure as Finance Head. He holds a Master's and a PG Diploma from IIM Indore.",
      "His vision is grounded in creating value for all stakeholders, exploring new opportunities and fostering innovation while preserving the company's core values.",
    ],
  },
  {
    name: "Surya Banerjee",
    role: "Country Head (Operations & Business Development)",
    image: `${wp}/2023/10/Surya-b.png`,
    summary: "22 years across IFM, workplace solutions, corporate real estate and supply chain.",
    bio: [
      "Surya Banerjee has worked across integrated facilities management, workplace solutions, corporate real estate and supply chain management in FM, automotive, petrochemicals and FMCG.",
      "His vision is to transform SFM into an Indian IFM multinational, with a focus on quality, safety, technology and sustainability.",
    ],
  },
  {
    name: "S. V. Saradhi",
    role: "Senior Vice President – Operations",
    image: `${wp}/2025/Saradhi.jpeg`,
    summary: "27+ years in operations strategy, integrated facility management and team leadership.",
    bio: [
      "S. V. Saradhi has led large-scale projects across corporate, manufacturing, healthcare, infrastructure and defence sectors, building high-performance teams and innovative operating models.",
      "He holds an EMBA from Washington University in St. Louis and IIT Bombay, an MBA from ICFAI University, and LLB and B.Com degrees from Andhra University.",
      "His vision is a future-ready, AI-enabled Supreme, using predictive analytics and intelligent automation for smarter, safer and more sustainable operations.",
    ],
  },
  {
    name: "Nikhilesh Loya",
    role: "Chief Financial Officer",
    image: `${wp}/2023/10/Nikhilesh-Loya.jpg`,
    summary: "Chartered Accountant with 13+ years in finance, corporate planning and capital markets.",
    bio: [
      "Nikhilesh Loya leads Finance & Accounts and has been with the company for six years. He is an associate member of the Institute of Chartered Accountants of India.",
      "He was previously associated with Ruby Capital as Director (Retainer Service) and with Innoventive Industries Limited, with experience across finance, corporate planning, capital markets, debt syndication, M&A and strategy.",
    ],
  },
  {
    name: "Ashok More",
    role: "Vice President – Operations (IFM & ETS)",
    image: `${wp}/2025/Ashok.jpeg`,
    summary: "With Supreme since 1997, rising from Supervisor to Vice President.",
    bio: [
      "Ashok More took on the Vice President role in June 2025 after nearly three decades with the organization. He joined in 1997 as a Supervisor and rose through Site In-charge, Field Officer, Operations Manager, Assistant General Manager and General Manager for IFM and ETS.",
      "His vision is sustainable revenue growth through operational excellence and service delivery, with equal focus on developing people.",
    ],
  },
  {
    name: "Jitendra Sonar",
    role: "General Manager (HR, IR & Administration)",
    image: `${wp}/2023/11/01.jpg`,
    summary: "26+ years in HR and industrial relations at leading manufacturers.",
    bio: [
      "Jitendra Sonar has worked with Mahindra, Mahindra Navistar, Cummins, Raymond and Autoline Industries. He has concluded six major long-term settlements with unions including Maharashtra Labour Union, Rashtriya Kamgar Sena and Bharatiya Mazdoor Sangh.",
      "He has also led cultural integration projects in Brazil and the USA, and brings an understanding of modern digital and AI-enabled HR processes.",
    ],
  },
  {
    name: "Baljeet Arora",
    role: "Vice President – Human Resources",
    image: `${wp}/2025/Baljeet-Arora.jpeg`,
    summary: "16+ years in strategic HR, leadership development and talent management.",
    bio: [
      "Baljeet Arora holds a Bachelor of Engineering, postgraduate degrees in Human Resources and a Master's in Labour Law and Labour Welfare.",
      "As VP HR she leads HR strategy, leadership development and talent acquisition, building a workplace culture of growth, clarity and belonging.",
    ],
  },
];

export const whyChooseUs = [
  {
    // FLAG: "7+ states", "98% client retention" and "150+ clients" need confirmation (homepage says 14+ states, 175+ clients).
    title: "Strong legacy & track record",
    items: ["40+ years of experience and 7+ states covered", "Consistent growth with a 98% client retention rate", "150+ strong client base"],
  },
  {
    title: "Experienced & capable team",
    items: [
      "Experience across all geographies of India",
      "Clients across industry verticals",
      "Complex, client-specific deliveries",
      "Strong top management team of 15+ people",
    ],
  },
  {
    title: "Technology advantage",
    items: [
      "Strong technology leadership",
      "Technology integrated into every aspect of FM",
      "Real-time tracking of completed tasks",
      "Complete data analytics and digital solutions",
    ],
  },
  {
    title: "Unique business model",
    items: ["Offerings shaped to client requirements", "'Pay per use' model", "Activity-based service offering"],
  },
  {
    title: "Statutory compliance",
    items: [
      "The right HR support at each site to prevent IR and legal issues",
      "Monitoring and tracking of compliance requirements",
      "Awareness of local market dynamics and contacts with local authorities",
      "Mitigation of labour issues with no impact on the principal employer",
    ],
  },
];

// FLAG: milestones include revenue figures and client names. Investor Relations / Compliance and the named clients' consent should be confirmed before launch.
export const milestones = [
  { year: "1983", text: "Founded by Dr. L. V. Shinde in Pune with 50 employees and a housekeeping contract for Tata Motors, still a valued client." },
  { year: "2005", text: "Incorporated as a private limited company." },
  { year: "2016", text: "Crossed a manpower strength of 5,000, turnover of ₹100 crore and 100+ client sites." },
  {
    year: "2018",
    text: "Acquired a 55% stake in Trimurty Utility Services Pvt Ltd, adding CFSS and expanding IFM and manpower business. Started the supply chain business with 42 people.",
  },
  { year: "2019", text: "Acquired a 66.67% stake in Everdew Engineering Pvt Ltd to expand production support services." },
  { year: "2020", text: "Felicitated by the Chief Minister of Gujarat for providing 450+ jobs during COVID." },
  { year: "2022", text: "Crossed revenue of ₹200+ crore, with operations in 5 states." },
  {
    year: "2023",
    text: "Crossed revenue of ₹300+ crore, growing by ₹100+ crore in a single year. Reached a fleet of 400 with a single order of 100 BharatBenz vehicles for Škoda Auto Volkswagen India Pvt Ltd.",
  },
  { year: "2024", text: "Crossed a manpower strength of 10,000+ and a fleet of 400+ vehicles." },
];

export const coreStrengths = {
  quote:
    "We have built our goodwill and reputation over the last 40 years and at no cost should we allow that to be tarnished. If you think about that, you'll do things with integrity.",
  quoteBy: "Dr. L. V. Shinde, Founder Chairman",
  paragraphs: [
    "Our core belief system is based on integrity and ethics.",
    "Our business stands on strong fundamentals: compliance, and on-time, in-full availability of skilled manpower, machines, materials and resources at competitive cost. It is backed by robust capabilities in safety, environment and sustainability, technology, digitalization and quality management systems, all governed by the Supreme Operational Excellence Model (SOEM).",
    "Small improvements and attention to detail make a huge difference and lead to a great customer experience.",
  ],
};

export const trainingImages = [2, 4, 5, 7, 8, 9, 11, 12].map((n) => ({
  src: `${wp}/2023/07/Training-${n}.jpg`,
  alt: `Supreme Facility Management training session ${n}`,
}));
