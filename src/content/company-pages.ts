/**
 * About sub-pages (rendered by app/[slug] with the shared template).
 * SOURCE: live pages on supremefacility.com (checked 26 Oct 2026). Copy lightly edited for grammar only.
 */
import type { ServicePage } from "./services";
import { wp } from "./services";

const ABOUT = { label: "About", href: "/about-us/" };

export const companyPages: ServicePage[] = [
  {
    kind: "company",
    slug: "diversity-and-inclusion",
    name: "Diversity and Inclusion",
    trail: [ABOUT],
    seo: {
      title: "Diversity and Inclusion",
      description:
        "Supreme Facility Management champions diversity and inclusion through equitable workplace practices and a culture of respect, empowerment and innovation.",
    },
    title: "Diversity and inclusion",
    lead: "Celebrating individuality and unity across our workforce.",
    heroImage: `${wp}/2023/12/diversity-img.jpg`,
    heroAlt: "Supreme Facility Management team members",
    intro: {
      heading: "Celebrating individuality and unity",
      paragraphs: [
        "We take pride in the many facets that make each of our team members unique. By nurturing a culture that values individuality while fostering unity, we create an environment where diversity thrives and ideas flourish.",
        "Our commitment to diversity is a lived experience. An inclusive, collaborative atmosphere empowers every team member to contribute their perspective, helping us solve complex challenges creatively.",
      ],
    },
    sections: [
      {
        type: "cards",
        heading: "What diversity and inclusion mean at Supreme",
        columns: 3,
        items: [
          {
            title: "Equality",
            text: "Fair treatment and equal opportunities, so individuals can grow and succeed regardless of background.",
          },
          {
            title: "Dignity",
            text: "Respect and dignity are non-negotiable in all our interactions, with each other and with our clients.",
          },
          {
            title: "Unity",
            text: "By appreciating our differences, we create a collective force greater than the sum of its parts.",
          },
          {
            title: "Cultural integration",
            text: "Valuing diverse cultural backgrounds brings a wealth of perspectives and lets ideas flow freely.",
          },
          {
            title: "Talent diversification",
            text: "A multidimensional workforce from across India, bringing unique skills and talents to every operation.",
          },
        ],
      },
      {
        type: "gallery",
        heading: "Life at Supreme",
        images: [
          { src: `${wp}/2023/07/image-1.jpg`, alt: "Team members at a Supreme event" },
          { src: `${wp}/2023/08/image-3.jpg`, alt: "Supreme employees together at work" },
          { src: `${wp}/2023/08/image-2.jpg`, alt: "Supreme team celebration" },
          { src: `${wp}/2023/08/image-1.jpg`, alt: "Supreme staff group photo" },
        ],
      },
    ],
    faqs: [],
    cta: {
      heading: "Build your career with Supreme",
      text: "Join a workforce that celebrates every individual.",
    },
    ctaHref: "/careers/",
    ctaLabel: "View careers",
  },
  {
    kind: "company",
    slug: "digitalization-and-technology",
    name: "Digitalization and Technology",
    trail: [ABOUT],
    seo: {
      title: "Digitalization and Technology",
      description:
        "How Supreme Facility Management uses digital platforms and technology to streamline facility management, improve efficiency and deliver innovative solutions.",
    },
    title: "Digitalization & technology",
    lead: "Digital solutions that make facility operations faster, more transparent and easier to manage.",
    intro: {
      heading: "A digitally empowered way of working",
      paragraphs: [
        "We use digital solutions throughout our operations to drive progress and innovation for our clients.",
        "From mobile apps and cloud platforms to IoT-connected devices, technology gives our teams and clients real-time visibility and better control.",
      ],
    },
    sections: [
      {
        type: "cards",
        heading: "Our digital capabilities",
        columns: 3,
        items: [
          {
            title: "Digital workflow",
            text: "Mobile and cloud applications for remote access, real-time monitoring and team collaboration. Managers can track work orders, manage maintenance and communicate with stakeholders from anywhere.",
          },
          {
            title: "HRMS",
            text: "Employee data, payroll, recruitment, benefits, training, talent management, engagement and attendance, managed in one system.",
          },
          {
            title: "Asset management",
            text: "Cloud-based software to monitor and track valuable assets, extending lifecycles and reducing maintenance costs.",
          },
          { title: "Quick onboarding", text: "Swift employee integration for faster productivity." },
          { title: "Procurement to payment", text: "Integrated procurement that simplifies order-to-payment processes and improves transparency." },
          { title: "IoT integration", text: "Connected devices that support data-driven decisions and better operations." },
          { title: "Helpdesk & visitor management", text: "Secure, organized visitor management and request handling." },
        ],
      },
    ],
    faqs: [],
    cta: {
      heading: "See how technology can improve your facilities",
      text: "Talk to us about digital-first facility management for your sites.",
    },
  },
  {
    kind: "company",
    slug: "esg",
    name: "Sustainability",
    trail: [ABOUT],
    seo: {
      title: "ESG Initiatives and Sustainability",
      description:
        "Supreme Facility Management's ESG initiatives: environmental sustainability, social responsibility and corporate governance, aligned with the UN SDGs.",
    },
    title: "Sustainability and ESG",
    lead: "Making a positive impact on the world around us, aligned with the UN Sustainable Development Goals.",
    heroImage: `${wp}/2023/12/sustainability-banner.jpg`,
    heroAlt: "Green landscape representing sustainability",
    intro: {
      heading: "Our ESG commitment",
      paragraphs: [
        "Environmental, social and governance factors play a vital role in shaping a sustainable future. Our commitment goes beyond facility management: it is about making a positive impact.",
        "We align our ESG mission with the United Nations Sustainable Development Goals, with a focus on SDG 5 (Gender Equality), SDG 12 (Responsible Consumption and Production) and SDG 13 (Climate Action).",
      ],
    },
    sections: [
      {
        type: "gallery",
        heading: "Environmental stewardship",
        images: [
          { src: `${wp}/2023/12/sustainability-img-1.jpg`, alt: "Energy efficiency initiative", caption: "Energy efficiency" },
          { src: `${wp}/2023/12/sustainability-img-2.jpg`, alt: "Waste reduction initiative", caption: "Waste reduction" },
          { src: `${wp}/2023/12/sustainability-img-3.jpg`, alt: "Carbon footprint reduction initiative", caption: "Carbon footprint reduction" },
        ],
      },
      {
        type: "cards",
        heading: "Our commitments to the SDGs",
        columns: 3,
        items: [
          {
            title: "SDG 12: Sustainable consumption",
            text: "Green cleaning with eco-friendly, sustainable products, and life cycle analysis of the housekeeping chemicals we use.",
          },
          {
            // FLAG: "eliminated single-use plastics from daily operations" is an absolute claim. Confirm with the ESG owner.
            title: "SDG 13: Climate action",
            text: "A zero single-use plastic pledge. We have eliminated single-use plastics from our daily operations.",
          },
          {
            title: "SDG 5: Gender equality",
            text: "A diverse workforce, investment in employee development and well-being, and equal opportunities for professional growth.",
          },
        ],
      },
      {
        type: "checklist",
        heading: "Social responsibility and governance",
        lists: [
          {
            title: "Social responsibility",
            items: [
              "Employee well-being initiatives that prioritize health",
              "Investment in employee development",
              "Equal opportunities for professional growth",
            ],
          },
          {
            title: "Governance excellence",
            items: [
              "Transparency in all business operations",
              "Ethical business practices, corporate integrity and high governance standards",
              "Robust compliance and risk management systems",
            ],
          },
        ],
      },
    ],
    faqs: [],
    cta: {
      heading: "Partner with a sustainability-focused FM provider",
      text: "Talk to us about greener, safer facility operations.",
    },
  },
  {
    kind: "company",
    slug: "safety-3",
    name: "Safety",
    trail: [ABOUT],
    seo: {
      title: "Safety at Supreme Facility Management",
      description:
        "Safety Vision Zero, the 3 Golden Rules of Safety and the training, compliance and PPE practices behind every Supreme Facility Management service.",
    },
    title: "Safety is our top priority",
    lead: "A secure, healthy environment for our employees, clients and community, guided by Safety Vision Zero.",
    intro: {
      heading: "Our commitment to safety",
      paragraphs: [
        "We are dedicated to creating a secure and healthy environment for our employees, clients and the community.",
        "Our safety measures make sure every part of our operations prioritizes well-being and complies with industry standards.",
      ],
    },
    sections: [
      {
        type: "cards",
        heading: "Supreme's 3 Golden Rules of Safety",
        intro: "The cornerstone of our safety philosophy.",
        columns: 3,
        items: [
          {
            title: "No safety induction, no work",
            text: "Every employee completes comprehensive safety induction training before starting any work.",
          },
          {
            title: "No PPE, no work",
            text: "Wearing the appropriate personal protective equipment is non-negotiable for every task.",
          },
          {
            title: "No tolerance towards unsafe acts",
            text: "Zero tolerance for unsafe acts or behaviour. Reporting and addressing them promptly is everyone's responsibility.",
          },
        ],
      },
      {
        type: "cards",
        heading: "Safety Vision Zero",
        intro: "We embrace the vision of achieving zero harm to our employees, and continually work towards it.",
        columns: 3,
        items: [
          {
            title: "Zero harm, zero compromises",
            text: "A commitment to eliminating harm to employees, contractors and stakeholders, without compromising on safety standards.",
          },
          {
            title: "Continuous risk assessment",
            text: "Regular risk assessments identify hazards and mitigate them before they become a threat.",
          },
          {
            title: "Safety innovation",
            text: "Investment in new safety technologies and practices to achieve and sustain Safety Vision Zero.",
          },
        ],
      },
      {
        type: "checklist",
        heading: "How we keep people safe",
        lists: [
          {
            title: "Training, recognition and compliance",
            items: [
              "Rigorous safety training for all staff",
              "Continuous education on the latest safety protocols",
              "Reward and recognition for our Supreme Suraksha Veers",
              "Adherence to local, state and national safety regulations",
              "Regular audits and assessments",
              "Necessary PPE for every role, with regular checks and replacement",
            ],
          },
          {
            title: "Safety in our services",
            items: [
              "Routine inspections in facility maintenance, with prompt corrective action",
              "Safe, environmentally friendly cleaning products",
              "Strict hygiene protocols in high-traffic areas",
              "A robust emergency response plan",
              "Clearly communicated evacuation procedures and emergency contacts",
            ],
          },
        ],
      },
      {
        type: "cards",
        heading: "Clients, community and continuous improvement",
        columns: 4,
        items: [
          { title: "Client communication", text: "We tailor our services to each client's safety requirements, with transparent communication." },
          { title: "Community engagement", text: "We engage with local communities and take part in community safety initiatives." },
          { title: "Feedback mechanism", text: "Feedback from employees, clients and the community drives regular safety policy reviews." },
          { title: "Training and development", text: "Our team stays informed about the latest safety trends and technologies." },
        ],
      },
    ],
    faqs: [],
    cta: {
      heading: "Talk to us about safety at your facility",
      text: "Contact us for more information on our safety practices or how we can contribute to the safety of your facility.",
    },
  },
];
