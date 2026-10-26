/**
 * Integrated Facility Management sub-pages (level 2 and the hard/soft service pages).
 * SOURCE: live pages on supremefacility.com (checked 26 Oct 2026). Copy lightly edited for grammar only.
 * FLAG comments mark claims or wording that need owner confirmation before launch.
 */
import type { ServicePage } from "./services";
import { wp } from "./services";

const IFM = { label: "Integrated Facility Management", href: "/integrated-facility-management/" };
const HARD = { label: "Hard Services", href: "/hard-services/" };
const SOFT = { label: "Soft Services", href: "/best-soft-facility-management-services-in-india/" };

export const ifmPages: ServicePage[] = [
  {
    slug: "hard-services",
    name: "Hard Services",
    trail: [IFM],
    seo: {
      title: "Hard Facility Management Services for Buildings",
      description:
        "Hard services including electrical, HVAC and plumbing, delivered by experts who maintain and optimize facility performance.",
    },
    title: "Modern solutions for efficient hard facility management",
    lead: "Elevate and streamline your facility with modern technical services.",
    heroImage: `${wp}/2023/10/Hard-services.jpg`,
    heroAlt: "Technician servicing building equipment",
    intro: {
      heading: "Hard facility management services",
      paragraphs: [
        "Improve your facility's performance with our comprehensive range of hard facility management solutions. We offer round-the-clock support for operational and maintenance needs, so your facility runs at peak efficiency while you focus on your core business.",
        "We are here 24/7, offering a one-stop solution for technical services that match your needs.",
      ],
    },
    sections: [
      {
        type: "features",
        heading: "Our range of services",
        intro: "Tailored hard facility management services, with a team of specialists for every technical need.",
        items: [
          {
            title: "Electrical and mechanical services",
            text: "Expert management of your electrical and mechanical systems for seamless operations and reduced downtime.",
            href: "/electrical-and-mechanical/",
            image: `${wp}/2024/03/hard-services-5.jpg`,
            alt: "Electrical panel maintenance",
          },
          {
            title: "Fire fighting services",
            text: "Robust fire safety solutions tailored to your facility, from fire detection systems to fire suppression measures.",
            href: "/fire-fighting-services/",
            image: `${wp}/2024/03/hard-services-6.jpg`,
            alt: "Fire safety equipment",
          },
          {
            title: "Plumbing & carpentry",
            text: "Skilled professionals for plumbing and carpentry projects across residences, apartment buildings, schools and colleges, and industrial and commercial facilities.",
            href: "/plumbing-and-carpentry/",
            image: `${wp}/2024/03/hard-services-1.jpg`,
            alt: "Plumbing maintenance work",
          },
          {
            title: "BMS operations",
            text: "Optimal control of your building management systems for smooth operations and efficient resource use.",
            href: "/bms-operations/",
            image: `${wp}/2024/03/hard-services-4.jpg`,
            alt: "Building management system controls",
          },
          {
            title: "Asset management",
            text: "Maximize the lifecycle of your assets, promoting sustainability and cost-effectiveness.",
            href: "/asset-managements/",
            image: `${wp}/2024/03/hard-services-2.jpg`,
            alt: "Facility assets being inspected",
          },
          {
            title: "Specialized engineering services",
            text: "Expertise for unique technical challenges that improves the overall performance of your facility.",
            href: "/specialized-services/",
            image: `${wp}/2024/03/hard-services-3.jpg`,
            alt: "Engineer at work",
          },
        ],
      },
      {
        type: "cards",
        heading: "Our USPs",
        intro: "Our MEP services improve your facility's operational effectiveness.",
        columns: 4,
        items: [
          { title: "Efficient operations", text: "Uninterrupted operations and reduced downtime across your facility's technical systems." },
          { title: "Safety assurance", text: "Fire-fighting and safety solutions that minimize risk and ensure compliance." },
          { title: "Aesthetic maintenance", text: "Plumbing, carpentry and asset management that maintain your facility's appearance and integrity." },
          { title: "Optimized resources", text: "BMS operations and specialized engineering for efficient, cost-effective resource use." },
          { title: "Energy conservation", text: "Energy management that reduces your facility's environmental footprint." },
          { title: "Project success", text: "Ad hoc project management for timely, successful outcomes." },
          { title: "Enhanced longevity", text: "Longer asset life, with lower replacement and maintenance costs." },
        ],
      },
    ],
    faqs: [
      {
        question: "What challenges come with managing hard services in large facilities?",
        answer: "Coordinating complex maintenance schedules, ensuring regulatory compliance and allocating resources efficiently.",
      },
      {
        question: "How do hard services affect a facility's budget?",
        answer: "They involve maintenance, repair and operational costs. Strategic planning and regular assessments help control costs.",
      },
      {
        question: "What role does equipment maintenance play in hard services?",
        answer: "It keeps equipment working properly, minimizes breakdowns, extends equipment life and improves safety.",
      },
      {
        question: "How do hard services differ from soft services?",
        answer:
          "Soft services cover non-technical areas such as housekeeping and catering. Hard services cover technical functions such as building maintenance, mechanical and electrical systems, and equipment upkeep.",
      },
      {
        question: "What steps are involved in an effective hard services strategy?",
        answer:
          "Evaluating facility needs, prioritizing maintenance, scheduling regular inspections, using technology for real-time monitoring and ensuring compliance with industry standards.",
      },
    ],
    cta: {
      heading: "Request a quote for hard facility management",
      text: "Ready to improve your facility's performance? Request a tailored quote today.",
    },
  },
  {
    slug: "best-soft-facility-management-services-in-india",
    name: "Soft Services",
    trail: [IFM],
    seo: {
      title: "Soft Facility Management Services in India",
      description:
        "Soft facility management services by Supreme Facility Management, with housekeeping, janitorial and pest control to keep workplaces clean, safe and efficient.",
    },
    title: "Smart solutions for soft facility management",
    lead: "Efficiency, comfort and excellence across your workplace with integrated soft services.",
    heroImage: `${wp}/2023/10/soft-services.jpg`,
    heroAlt: "Housekeeping team at work in an office",
    intro: {
      heading: "Soft facility management services",
      paragraphs: [
        "Soft services are the heart of facility management: the essential functions that shape the everyday workplace experience.",
        "From mechanized housekeeping that keeps your environment spotless to specialized disinfection that protects health and safety, Supreme Facility Management offers a comprehensive suite of soft services.",
        "Our expertise spans mechanized housekeeping, F&B and pantry services, visitor management, landscaping, guest house management, help desk and mailroom services, and specialized disinfection and sanitization.",
      ],
    },
    sections: [
      {
        type: "cards",
        heading: "Our soft facility management services",
        columns: 4,
        items: [
          { title: "Mechanized housekeeping", text: "Technology and expertise combined for an impeccably clean workspace.", href: "/mechanized-housekeeping-services/" },
          { title: "Landscaping", text: "Greener surroundings that improve both aesthetics and well-being.", href: "/commercial-landscaping-gardening/" },
          { title: "Helpdesk & mail room", text: "Swift communication and organized office logistics.", href: "/helpdesk-and-mailroom-solution/" },
          { title: "Guest house management", text: "Comfortable, efficient stays for guests.", href: "/guest-house-management-services/" },
          { title: "Specialized disinfection & sanitization", text: "A hygienic environment that prioritizes health and safety." },
          { title: "F&B & pantry", text: "Quality food and beverage offerings and a seamless dining experience." },
          { title: "Front office management", text: "A warm welcome for visitors and efficient assistance at reception.", href: "/front-office-management/" },
        ],
      },
      {
        type: "cards",
        heading: "How soft services benefit you",
        intro: "Designed to improve employee experience and operational efficiency.",
        columns: 4,
        items: [
          { title: "Enhanced cleanliness", text: "Mechanized housekeeping maintains high cleanliness standards for a healthier workplace." },
          { title: "Culinary excellence", text: "F&B services provide enjoyable dining that boosts employee satisfaction." },
          { title: "Professional reception", text: "Visitor management offers a seamless, professional front office." },
          { title: "Aesthetic appeal", text: "Landscaping creates a visually appealing, calm work environment." },
          { title: "Effortless stays", text: "Guest house management ensures hassle-free accommodation." },
          { title: "Efficient coordination", text: "Helpdesk and mail room services streamline communication and logistics." },
          { title: "Safety assurance", text: "Disinfection and sanitization prioritize health and well-being." },
          { title: "Happier staff", text: "A clean, well-maintained workplace supports morale and well-being." },
        ],
      },
    ],
    faqs: [
      {
        question: "What do mechanized housekeeping services cover?",
        answer: "Efficient cleaning, sanitization and maintenance of your workspace for a hygienic, organized environment.",
      },
      {
        question: "How do F&B and pantry services improve employee satisfaction?",
        answer: "From refreshing beverages to wholesome meals, they cater to diverse preferences and boost workplace morale.",
      },
      {
        question: "What does visitor and front office management involve?",
        answer: "Seamless reception and coordination that create a positive first impression for visitors and employees.",
      },
      {
        question: "How does landscaping contribute to a better workplace?",
        answer: "Natural surroundings create a calm, energizing atmosphere that supports well-being.",
      },
      {
        question: "What are the benefits of specialized disinfection and sanitization?",
        answer: "A clean, germ-free environment that protects the health and safety of employees and clients.",
      },
    ],
    cta: {
      // Live page CTA mentions catering by mistake; corrected to soft services.
      heading: "Request a quote for soft facility management",
      text: "Tell us about your workplace and the services you need.",
    },
  },
  {
    slug: "specialized-services",
    name: "Specialized Services",
    trail: [IFM],
    seo: {
      title: "Specialized Facility Services and Customized Solutions in India",
      description:
        "Specialized services tailored to your business, including disinfection and sanitization, pest control and deep cleaning, delivered to high standards of quality and reliability.",
    },
    title: "Specialized services, tailored to your needs",
    lead: "Disinfection, pest control and deep cleaning from a team you can trust.",
    intro: {
      heading: "How our specialized services meet unique needs",
      paragraphs: [
        "We address a wide range of needs with precision: specialized disinfection and sanitization for a hygienic environment, pest control that manages rodents, flies and other pests, and deep cleaning for residential, commercial and corporate spaces.",
        "Our customer-centric approach combines innovation and responsiveness, making us a trusted partner for a safe, clean and welcoming environment.",
      ],
    },
    sections: [
      {
        type: "cards",
        heading: "Specialized services we offer",
        columns: 3,
        items: [
          {
            title: "Specialized disinfection & sanitization",
            text: "We don't just clean; we disinfect thoroughly, creating a strong defence against bacteria, viruses and disease. Our discreet, compliant deep cleaning keeps your space sanitized.",
          },
          {
            title: "Pest control",
            text: "Precise pest control that goes beyond traditional treatments, from inspections to targeted treatments, to keep your business pest-free.",
          },
          {
            title: "Deep cleaning",
            text: "Meticulous cleaning with advanced techniques and quality cleaning agents for a pristine, hygienic and more productive workplace.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "What are specialized services?",
        answer:
          "Facility management solutions tailored to unique needs, including disinfection and sanitization, pest control and deep cleaning, to improve cleanliness, safety and facility performance.",
      },
      {
        question: "Which industries benefit from specialized services?",
        answer: "Corporate offices, healthcare facilities, educational institutions, industrial complexes and more.",
      },
      {
        question: "What sets your specialized services apart?",
        answer:
          "A commitment to excellence, decades of industry experience, a highly skilled team and a customer-centric approach that prioritizes innovation, safety and sustainability.",
      },
      {
        question: "How can I request a quote?",
        answer: "Send us an enquiry and our team will contact you to understand your needs and provide a customized quote.",
      },
      {
        question: "Do you offer emergency pest control or disinfection?",
        answer: "Yes. Our rapid response team handles urgent pest control and disinfection needs.",
      },
    ],
    cta: {
      heading: "Request a free quote for specialized services",
      text: "Tell us what your space needs and we will tailor a solution.",
    },
  },
  {
    slug: "hospital-healthcare-facility-management",
    name: "Health Care Services",
    trail: [IFM],
    seo: {
      title: "Hospital and Healthcare Facility Management Services in India",
      description:
        "Hospital and healthcare facility management including maintenance, safety, cleaning and operational support for safe, clean and efficient healthcare facilities.",
    },
    title: "Excellence in hospital and healthcare facility management",
    lead: "Healthier environments for patients, staff and visitors.",
    heroImage: `${wp}/2023/10/Health-care-services.jpg`,
    heroAlt: "Healthcare facility support staff",
    intro: {
      heading: "Facility management built for healthcare",
      paragraphs: [
        "In healthcare, patient well-being and operational efficiency come first. Supreme Facility Management brings a long record of facility management across industries to healthcare environments nationwide.",
        "Operating under the L. V. Shinde Group, with a commitment to innovation and excellence, we make sure hospitals and healthcare facilities get the support they need to deliver quality care.",
      ],
    },
    sections: [
      {
        type: "cards",
        heading: "Our range of healthcare services",
        intro: "Services designed to support health institutions and ensure positive patient experiences.",
        columns: 4,
        items: [
          { title: "Environmental hygiene management", text: "A spotless, safe, sanitized environment that complies with healthcare regulations." },
          { title: "Asset management", text: "Critical medical equipment and facility infrastructure kept maintained and operational." },
          { title: "Patient support services", text: "Patient transport, room readiness and assistance that improve patient satisfaction." },
          { title: "Biomedical waste management", text: "Efficient handling under strict regulations, for environmental sustainability and health safety." },
          { title: "Energy management", text: "Cost-efficient energy strategies that keep conditions right for patients and staff." },
          { title: "Emergency response planning", text: "Plans for quick, effective action during critical situations." },
          { title: "Security and access control", text: "Robust security that safeguards patients and facilities." },
        ],
      },
      {
        type: "cards",
        heading: "Our USPs",
        columns: 4,
        items: [
          { title: "Operational excellence", text: "Streamlined processes and maintenance for efficient operations." },
          { title: "Customer focus", text: "A clean, well-maintained facility creates a positive atmosphere for patients and families." },
          { title: "Regulatory compliance", text: "A meticulous approach to healthcare regulations and standards." },
          { title: "Cost efficiency", text: "Efficient resource allocation minimizes costs." },
          { title: "Enhanced safety", text: "Stringent safety protocols protect patients, staff and visitors." },
          { title: "Infection control", text: "Specialized services help maintain hygiene and prevent infections." },
          { title: "Sustainability", text: "Eco-friendly practices aligned with healthcare's environmental responsibility." },
          { title: "Focus on core activities", text: "Outsourcing facility management lets clinicians concentrate on patient care." },
        ],
      },
      {
        type: "cards",
        heading: "Why choose us for healthcare facility management?",
        columns: 4,
        items: [
          // FLAG: "30+ years" here vs "since 1983" / "four decades" elsewhere on the live site. Confirm one figure.
          { title: "Expertise", text: "Over 30 years of experience in healthcare facility management." },
          { title: "Comprehensive services", text: "Infrastructure support, biomedical waste management, infection control and more." },
          { title: "Trained workforce", text: "Attendants and housekeeping staff trained to follow healthcare protocols." },
          { title: "Adherence to regulations", text: "Strict compliance with healthcare regulations and safety standards." },
          { title: "Advanced technology", text: "Modern technology that optimizes operations for better patient experiences." },
          { title: "Emergency preparedness", text: "Readiness for the unexpected to keep healthcare services running." },
          { title: "Innovation", text: "Continually exploring new solutions for evolving healthcare needs." },
          { title: "Client-centric approach", text: "We tailor our services to your hospital's requirements." },
        ],
      },
    ],
    faqs: [
      {
        question: "Which healthcare facilities do you serve?",
        answer: "Hospitals, clinics, medical centres and nursing homes, with solutions tailored to each type of facility.",
      },
      {
        question: "How does biomedical waste management keep facilities safe?",
        answer:
          "Proper handling, treatment and disposal in line with regulatory guidelines protects patients, staff and the community while reducing environmental risk.",
      },
      {
        question: "What role does infrastructure support play?",
        answer:
          "Specialized housekeeping, operation and maintenance, ambulance drivers and patient care attendants create an environment that supports patient care, efficiency and safety.",
      },
      {
        question: "How do your services improve patient experience?",
        answer: "Clean, organized, safe facilities improve patient comfort, support infection control and create a positive experience.",
      },
      {
        question: "Can you customize solutions for different healthcare facilities?",
        answer: "Yes. We work closely with each client to tailor services to a hospital, clinic or nursing home's specific needs.",
      },
    ],
    cta: {
      heading: "Optimize your healthcare facility's performance",
      text: "Take the first step towards better healthcare facility management. Request a quote today.",
    },
  },
  {
    slug: "staffing-manpower-solution",
    name: "Staffing Solutions",
    trail: [IFM],
    seo: {
      title: "Staffing and Manpower Solutions for Workforce Management",
      description:
        "Expert staffing and manpower solutions from Supreme Facility Management for quality staffing, streamlined operations and efficient workforce management.",
    },
    title: "Staffing and manpower solutions across India",
    lead: "Your partner for tailored staffing and well-managed workforces.",
    heroImage: `${wp}/2023/12/New-Project.jpg`,
    heroAlt: "Staffing team members",
    intro: {
      heading: "Expert staffing and manpower management",
      paragraphs: [
        "Supreme Facility Management brings integrated staffing and manpower solutions to a wide range of industries. With a legacy dating back to 1983, we are established as a one-stop solution provider, improving employee experience and operational efficiency through our Operational Excellence programmes.",
        "Safety and sustainability are our guiding principles. As a reliable manpower supply and staffing partner, we provide tailored workforce solutions that work across industries.",
        "From candidate sourcing to onboarding and performance monitoring, we handle the full range of staffing needs across India, aligned with your organization's goals.",
      ],
    },
    sections: [
      {
        type: "cards",
        heading: "Our staffing solutions",
        columns: 3,
        items: [
          { title: "Payroll management", text: "Precise compensation calculation, tax compliance and on-time disbursal." },
          { title: "Employee life cycle management", text: "Every stage of the employee journey, from recruitment to exit." },
          { title: "Training and development", text: "Tailored programmes that build skills, morale and organizational capability." },
          { title: "Data management", text: "Organized, secure employee data for informed decisions and simpler HR processes." },
          { title: "Performance evaluation and enhancement", text: "Continuous assessment and targeted interventions that improve performance." },
          { title: "Statutory and compliance management", text: "Adherence to labour laws, taxation norms and other statutory requirements." },
        ],
      },
      {
        type: "checklist",
        heading: "Benefits and why choose us",
        lists: [
          {
            title: "Benefits of our staffing services",
            items: [
              "Streamlined payroll that reduces administrative burden",
              "Efficient employee life cycle management",
              "Comprehensive statutory and compliance management",
              "Industry best practices for engagement and productivity",
              "Accurate, secure data management",
              "Scale your workforce with demand",
              "Reduced administrative overhead",
            ],
          },
          {
            title: "Why choose Supreme Facility Management",
            items: [
              // FLAG: "over 40 years" here vs "30+ years" on the healthcare page.
              "Over 40 years of experience across diverse industries",
              "Solutions tailored to your manpower needs and goals",
              "A track record with large corporations and SMEs",
              "End-to-end employee life cycle management",
              "Compliance with employment laws, minimizing legal risk",
              "Optimized workforce management for productivity and cost savings",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "How can your staffing solutions help my business grow?",
        answer: "They give you access to skilled manpower and streamlined processes that improve productivity and agility.",
      },
      {
        question: "Which industries do you provide staffing for?",
        answer: "Healthcare, IT, manufacturing, hospitality and more.",
      },
      {
        question: "Which regions of India do you cover?",
        answer: "Our footprint spans multiple states across India, so we can serve clients nationwide.",
      },
      {
        question: "Do you offer temporary, permanent or contract staffing?",
        answer: "Yes. We offer temporary and contract staffing for flexibility, and permanent placements for long-term workforce planning.",
      },
      {
        question: "How is pricing structured?",
        answer: "Pricing is customized to your needs, with fair and transparent fee structures.",
      },
    ],
    cta: {
      heading: "Transform your team with expert staffing",
      text: "Unlock the potential of your workforce with tailored staffing solutions. Get in touch for a quote.",
    },
  },
  {
    slug: "hospitality-management",
    name: "Hospitality Services",
    trail: [IFM],
    seo: {
      title: "Hospitality Management Services",
      description:
        "Hospitality management services for hotels, resorts and other hospitality operations, focused on efficient guest service.",
    },
    title: "Hospitality management, done to a higher standard",
    lead: "Better guest experiences through attentive service and practical solutions.",
    heroImage: `${wp}/2023/10/Hospitality-Services.jpg`,
    heroAlt: "Hospitality staff preparing a room",
    intro: {
      heading: "Hospitality management services across India",
      paragraphs: [
        "In hospitality, guest experience is everything. As an integrated facility management company and hospitality services provider, we bring our expertise to hospitality operations across India.",
        "With a legacy dating back to 1983 and operating under the L. V. Shinde Group, we are known for quality, innovation and seamless guest experiences.",
        "We combine technology, skilled people and a passion for excellence to deliver tailored solutions, from accommodation to guest services.",
      ],
    },
    sections: [
      {
        type: "cards",
        heading: "Our hospitality offerings",
        columns: 3,
        items: [
          { title: "Executive housekeeping", text: "Meticulous housekeeping with a keen eye for detail and the highest standards of cleanliness and hygiene." },
          { title: "Laundry solutions", text: "Advanced technology and skilled handling so every linen and fabric is treated with care." },
          { title: "Kitchen stewarding", text: "Efficient, hygienic and organized kitchen operations so chefs can focus on their craft." },
          { title: "Pantry and F&B services", text: "Curated refreshments and quality food and beverage offerings on your premises." },
          { title: "Store room services", text: "Well-organized logistics behind the scenes for a smooth workflow." },
          { title: "Front office executives", text: "A warm welcome and efficient assistance that shape first and last impressions." },
        ],
      },
      {
        type: "checklist",
        heading: "Benefits and why choose us",
        lists: [
          {
            title: "Benefits of our hospitality services",
            items: [
              "Better guest experiences that reflect quality and care",
              "Efficient daily operations, from housekeeping to front office",
              "Specialized services such as laundry and kitchen stewarding",
              "A stronger brand image built on quality",
              "Your team freed to focus on personal guest interactions",
              "Flexibility to adapt to changing guest demands",
              "Cost and resource optimization",
              "Consistently high quality standards",
            ],
          },
          {
            title: "Why choose Supreme Facility Management",
            items: [
              "Integrated facility management expertise tailored to hospitality",
              "High standards of service and cleanliness",
              "Solutions customized to each establishment",
              "Skilled, dedicated staff",
              "Technology that improves efficiency and guest interactions",
              "A focus on sustainability",
              "Partnerships with leading names in hospitality",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Why are hospitality services important?",
        answer: "They create a welcoming, comfortable environment for guests, building positive impressions and loyalty.",
      },
      {
        question: "How do hospitality services shape customer experience?",
        answer: "Well-maintained facilities, personalized amenities and attentive staff make guests feel valued.",
      },
      {
        question: "Why do cleanliness and hygiene matter so much in hospitality?",
        answer: "Clean, sanitized spaces protect guest well-being, build a sense of comfort and safety, and encourage guests to return.",
      },
      {
        question: "What sustainable practices are used in hospitality services?",
        answer: "Energy-efficient lighting, waste reduction, locally sourced ingredients and eco-friendly amenities.",
      },
      {
        question: "What role does technology play in modern hospitality?",
        answer: "Online booking, contactless check-in, smart room controls and digital experiences improve convenience and efficiency.",
      },
    ],
    cta: {
      heading: "Ready to raise your hospitality standards?",
      text: "Reach out for a personalized quote.",
    },
  },
  {
    slug: "electrical-and-mechanical",
    name: "Electrical & Mechanical Services",
    trail: [IFM, HARD],
    seo: {
      title: "Electrical and Mechanical Services",
      description:
        "Trusted electrical and mechanical services tailored to your needs. Supreme Facility Management offers efficient, safe and cost-effective solutions.",
    },
    title: "Power up your operations with electrical & mechanical services",
    lead: "Reliable systems, better performance, fewer disruptions.",
    heroImage: `${wp}/2024/03/hard-services-5.jpg`,
    heroAlt: "Electrical panel maintenance",
    intro: {
      heading: "Efficiency built on reliable systems",
      paragraphs: [
        "Electrical circuits, machinery and HVAC are the backbone of your facility. Keeping them at peak performance improves productivity, minimizes disruption and reduces operating costs.",
        "Managing these systems takes specialized knowledge. Our technicians handle everything from routine maintenance and repairs to upgrades and complex installations, using modern tools and current expertise.",
        "Downtime is expensive, so we take a proactive approach that finds and fixes potential issues before they disrupt your operations.",
      ],
    },
    sections: [
      {
        type: "checklist",
        heading: "What we cover",
        intro:
          "Tailored solutions for commercial enterprises, heavy industrial facilities, healthcare, education, hospitality, retail and more.",
        lists: [
          {
            items: [
              "Electrical installations",
              "Mechanical system maintenance",
              "Energy efficiency audits",
              "Emergency repairs",
              "Safety compliance",
              "Custom solutions",
            ],
          },
        ],
      },
      {
        type: "cards",
        heading: "Why choose us for electrical & mechanical services?",
        columns: 4,
        items: [
          { title: "Expertise", text: "Seasoned professionals with extensive knowledge of electrical and mechanical systems." },
          { title: "Customized solutions", text: "Services tailored to your industry and business." },
          { title: "Modern technology", text: "We stay current with the latest advancements." },
          { title: "Reliability", text: "Dependable service that keeps operations running smoothly." },
          { title: "Proven track record", text: "Successful projects across many industries." },
          { title: "Cost-effective", text: "Maximum efficiency at minimum cost." },
          { title: "24/7 support", text: "Round-the-clock assistance for your electrical and mechanical needs." },
          { title: "Commitment to safety", text: "All installation and maintenance work follows strict safety standards." },
        ],
      },
    ],
    faqs: [
      {
        question: "What types of electrical maintenance do you provide?",
        answer: "Routine inspections, equipment repairs and upgrades, covering all your electrical needs.",
      },
      {
        question: "Can you handle mechanical repairs for large industrial equipment?",
        answer: "Yes. We have the expertise and tools to repair large industrial equipment.",
      },
      {
        question: "Do you offer preventive maintenance plans?",
        answer: "Yes. Tailored preventive maintenance extends equipment life and prevents costly breakdowns.",
      },
      {
        question: "How quickly can you respond to emergencies?",
        answer: "Our emergency response team is available 24/7 to minimize downtime.",
      },
      {
        question: "Can you customize services for unique facility needs?",
        answer: "Yes. We work closely with each client to meet their specific requirements.",
      },
    ],
    cta: {
      heading: "Request a customized electrical & mechanical quote",
      text: "Ready to optimize your facility's operations? Let's get started.",
    },
  },
  {
    slug: "fire-fighting-services",
    name: "Fire Fighting Services",
    trail: [IFM, HARD],
    seo: {
      title: "Fire Fighting Services for Safety and Protection",
      description:
        "Expert fire fighting services: fire prevention, safety system installation and emergency response that protect your business and property.",
    },
    title: "Fire fighting services: your safety, our priority",
    lead: "Fire detection, suppression, audits and training from one trusted partner.",
    heroImage: `${wp}/2024/03/hard-services-6.jpg`,
    heroAlt: "Fire safety equipment",
    intro: {
      heading: "Professional fire safety for every space",
      paragraphs: [
        "Fire is a serious threat to businesses and homes. It can damage property, equipment and inventory, and put lives at risk, which is why a comprehensive fire safety plan matters.",
        "We equip clients with fire protection that meets high industry standards, from fire detection systems and suppression equipment to complete fire safety audits.",
        // FLAG: live page calls SFM "the foremost authority in fire safety". Softened; confirm wording with Marketing.
        "With a legacy dating back to 1983 under the L. V. Shinde Group, we have built deep expertise in fire safety and prevention for businesses, industries and institutions across India.",
      ],
    },
    sections: [
      {
        type: "checklist",
        heading: "How we can help",
        lists: [
          {
            items: [
              "Fire risk assessment",
              "Fire detection and alarm systems",
              "Fire suppression systems",
              "Emergency evacuation plans",
              "Fire safety training",
              "Fire extinguisher maintenance",
              "Sprinkler system installation and maintenance",
              "Emergency response services",
            ],
          },
        ],
      },
      {
        type: "cards",
        heading: "Why fire fighting services are critical",
        columns: 4,
        items: [
          { title: "Life preservation", text: "A prompt response saves lives during fire emergencies." },
          { title: "Property protection", text: "Lower risk of damage, financial loss and asset devaluation." },
          { title: "Safety compliance", text: "Adherence to fire safety regulations, avoiding legal complications and fines." },
          { title: "Peace of mind", text: "Confidence that you are prepared for fire-related contingencies." },
          { title: "Swift response", text: "Trained, well-equipped teams limit the spread of fire and damage." },
          { title: "Risk reduction", text: "Proactive measures reduce the overall risk of fire." },
          { title: "Expertise", text: "Professionals assess fire risks, implement safety measures and give guidance." },
          { title: "Limiting environmental damage", text: "Preventing and controlling fires reduces impact on ecosystems." },
        ],
      },
      {
        type: "cards",
        heading: "Fire safety solutions for all business types",
        columns: 3,
        items: [
          { title: "Commercial buildings", text: "Office complexes and shopping malls kept safe for occupants and assets." },
          { title: "Industrial facilities", text: "Protection, suppression and risk assessment for plants, warehouses and industrial sites." },
          { title: "Healthcare institutions", text: "Fire safety standards critical to patient well-being and compliance." },
          { title: "Educational organizations", text: "Secure learning environments for students and staff." },
          { title: "Residential complexes", text: "Safer apartment complexes and housing societies." },
          { title: "Hospitality", text: "Fire detection and emergency response that protect hotel guests." },
          { title: "Government buildings", text: "Compliance and protection for public buildings and sensitive records." },
          { title: "Retail outlets", text: "Fire prevention and rapid response for shops and stores." },
          { title: "Transportation infrastructure", text: "Safety for commuters and cargo at transport hubs." },
          { title: "Energy and utilities", text: "Fire prevention for power plants, oil and gas facilities and utilities." },
        ],
      },
      {
        type: "cards",
        heading: "Why choose us for fire fighting services?",
        columns: 4,
        items: [
          { title: "Expertise", text: "Years of experience in fire risk assessment, detection and suppression." },
          { title: "Comprehensive services", text: "End-to-end protection, from risk evaluation to installation and maintenance." },
          { title: "Modern technology", text: "Current equipment for optimal fire safety and rapid response." },
          { title: "Regulatory compliance", text: "Services that follow applicable safety standards and legal requirements." },
          { title: "Customized solutions", text: "Tailored to your specific needs and budget." },
          { title: "Emergency response", text: "Rapid response teams available 24/7." },
          { title: "Proactive maintenance", text: "Regular maintenance and testing keep your systems reliable." },
          { title: "Safety", text: "Early detection and suppression that protect lives and property." },
        ],
      },
    ],
    faqs: [
      {
        question: "What fire protection systems do you offer?",
        answer:
          "Fire alarm systems, sprinkler systems, fire extinguishers, fire suppression systems for areas such as server rooms or chemical stores, fire doors and dampers, and fire escapes.",
      },
      {
        question: "Can you conduct fire safety training for our employees?",
        answer:
          "Yes. Training covers fire prevention, detection and alarm systems, extinguisher use, evacuation procedures and emergency response.",
      },
      {
        question: "How often should fire extinguishers be inspected?",
        answer:
          "Extinguishers should be inspected regularly and serviced by a qualified technician as required by applicable fire safety standards, including checking pressure, hoses and nozzles.",
      },
      {
        question: "What should I do in a fire emergency?",
        answer:
          "Alert everyone and call emergency services first. Only if it is safe, use an extinguisher on a small fire while following evacuation procedures. Our training prepares your team for these situations.",
      },
      {
        question: "Can you customize fire safety solutions for our facility?",
        answer: "Yes. We assess your facility's fire risks and requirements and tailor a solution that meets your needs and local regulations.",
      },
    ],
    cta: {
      // FLAG: live page promises a quote "within 24 hours". Omitted until Operations confirms the SLA.
      heading: "Request a customized fire safety quote",
      text: "Tell us about your facility and we will prepare a quote.",
    },
  },
  {
    slug: "plumbing-and-carpentry",
    name: "Plumbing & Carpentry Services",
    trail: [IFM, HARD],
    seo: {
      title: "Plumbing and Carpentry Services",
      description:
        "Reliable plumbing and carpentry: quality installations, repairs and more, delivered promptly by an experienced team.",
    },
    title: "Expert plumbing & carpentry services",
    lead: "Precision craftsmanship and seamless plumbing for homes and businesses.",
    heroImage: `${wp}/2024/03/hard-services-1.jpg`,
    heroAlt: "Plumbing maintenance work",
    intro: {
      heading: "Quality plumbing and carpentry",
      paragraphs: [
        "We deliver comprehensive carpentry and plumbing services for residential and commercial clients. Our trained carpenters handle everything from major projects to minor repairs: workstations, tables, chairs, doors, windows, beds, sofas, wardrobes, wooden panelling and more.",
        "Our plumbing solutions cover full-scale projects with materials provided as well as minor repairs. Customers can reach our dedicated helpline from anywhere, and we send an experienced plumber to your location.",
      ],
    },
    sections: [
      {
        type: "checklist",
        heading: "What we offer",
        intro: "From minor repairs to major renovations, for spaces that are functional and look good.",
        lists: [
          {
            items: [
              "Pipe replacement",
              "Leak detection",
              "Custom carpentry projects",
              "Commercial plumbing services",
              "Plumbing repairs",
              "Carpentry services",
              "General repairs",
              "Fixture installation",
            ],
          },
        ],
      },
      {
        type: "cards",
        heading: "Why choose us for plumbing and carpentry?",
        intro: "Plumbing and carpentry for homeowners, businesses, retail stores, offices and more.",
        columns: 4,
        items: [
          { title: "Experienced professionals", text: "Highly skilled experts with years of experience." },
          // FLAG: "fully licensed and insured" is a legal claim. Confirm before launch.
          { title: "Licensed and insured", text: "Work carried out responsibly and professionally." },
          { title: "Customer satisfaction", text: "We go the extra mile so every customer is happy with our work." },
          { title: "Transparent pricing", text: "You always know what you are paying for, with no hidden costs." },
          { title: "Fast response", text: "Prompt response for issues that need immediate attention, including 24/7 emergency repairs." },
          { title: "Custom solutions", text: "Solutions tailored to each project's requirements." },
          { title: "Proven track record", text: "Numerous successful projects across industries." },
          { title: "Cost-effectiveness", text: "Quality workmanship that reduces the need for frequent repairs and replacements." },
        ],
      },
    ],
    faqs: [
      {
        question: "What plumbing services do you provide?",
        answer: "Leak repairs, pipe installations, drain cleaning, fixture replacements and more, from minor repairs to major installations.",
      },
      {
        question: "Do you offer emergency plumbing services?",
        answer: "Yes. We provide 24/7 emergency plumbing services for urgent issues.",
      },
      {
        question: "Are your carpentry services suitable for renovations?",
        answer: "Yes. Our carpenters handle custom cabinetry, door installations, flooring repairs and more.",
      },
      {
        question: "Do you offer maintenance plans?",
        answer: "Yes. Tailored maintenance plans prevent issues, extend the life of your systems and save money over time.",
      },
      {
        question: "Are you licensed and insured for plumbing and carpentry work?",
        answer: "Yes. Our professionals are trained and certified to carry out plumbing and carpentry work safely.",
      },
    ],
    cta: {
      heading: "Request your plumbing and carpentry quote",
      text: "Ready to improve your space? Request a personalized quote.",
    },
  },
  {
    slug: "asset-managements",
    name: "Asset Management",
    trail: [IFM, HARD],
    seo: {
      title: "Asset Management Services",
      description:
        "Expert asset management from Supreme Facility Management: efficient, cost-effective care of the physical assets your organization depends on.",
    },
    title: "Asset management that keeps your facility performing",
    lead: "Unlock value, maximize efficiency and ensure reliability.",
    heroImage: `${wp}/2024/03/hard-services-2.jpg`,
    heroAlt: "Facility assets being inspected",
    intro: {
      heading: "What asset management covers",
      paragraphs: [
        "Asset management is a systematic approach to managing an organization's physical assets for optimal performance, longevity and cost-effectiveness.",
        "In hard services, those assets are the infrastructure and equipment a facility runs on: buildings, machinery, HVAC, electrical systems and more. Managing them well maintains operational efficiency, reduces downtime and controls costs.",
      ],
    },
    sections: [
      {
        type: "checklist",
        heading: "Key aspects and benefits",
        lists: [
          {
            title: "Key aspects of asset management in hard services",
            items: [
              "Asset identification and inventory",
              "Asset lifecycle management",
              "Maintenance and repairs",
              "Asset tracking and monitoring",
              "Risk assessment",
              "Data analytics and predictive maintenance",
              "Compliance and regulations",
              "Documentation and reporting",
              "Integration with technology",
              "Sustainability and energy efficiency",
            ],
          },
          {
            title: "Benefits of effective asset management",
            items: ["Optimized physical assets", "Reduced operational risks", "Controlled costs", "Enhanced operational efficiency"],
          },
        ],
      },
      {
        type: "cards",
        heading: "Why choose us for asset management?",
        intro: "Asset management is critical in manufacturing, healthcare, real estate, utilities and beyond.",
        columns: 4,
        items: [
          { title: "Expertise", text: "Seasoned professionals with in-depth knowledge of asset management practice." },
          { title: "Modern technology", text: "The latest tools to optimize asset performance." },
          { title: "Custom solutions", text: "Services tailored to your organization." },
          { title: "Cost optimization", text: "Efficient lifecycle management that controls costs." },
          { title: "Proactive maintenance", text: "Strategies that keep assets reliable." },
          { title: "Regulatory compliance", text: "Assets that meet industry regulations and standards." },
          { title: "Performance metrics", text: "Detailed reporting and analytics for data-driven decisions." },
          { title: "Risk management", text: "Rigorous analysis that identifies risks and protects your assets." },
        ],
      },
    ],
    faqs: [],
    cta: {
      // Live page CTA mentions plumbing and carpentry by mistake; corrected.
      heading: "Take the first step towards optimized asset management",
      text: "Request a personalized quote for your facility.",
    },
  },
  {
    slug: "bms-operations",
    name: "BMS Operations",
    trail: [IFM, HARD],
    seo: {
      title: "Building Management System (BMS) Operations",
      description:
        "BMS operation services that streamline building operations, reduce energy costs and optimize building efficiency.",
    },
    title: "BMS operations for efficient buildings",
    lead: "Smart operation of your building management systems.",
    heroImage: `${wp}/2024/03/hard-services-4.jpg`,
    heroAlt: "Building management system controls",
    intro: {
      heading: "Building efficiency through BMS operations",
      paragraphs: [
        "Building Management Systems are the backbone of modern building operations, ensuring optimal energy use, safety and comfort for occupants.",
        "Our qualified, specialized engineers operate and manage BMS for many clients. We maintain and manage the hardware and software that control and monitor ventilation, lighting, energy, fire protection and security systems.",
        "We provide full operation and maintenance of access control, fire alarms and sprinklers, CCTV, public address systems, AC control and lighting control across diverse facilities.",
      ],
    },
    sections: [
      {
        type: "cards",
        heading: "What our BMS services include",
        columns: 3,
        items: [
          { title: "BMS installation and configuration", text: "A seamless setup tailored to your building's requirements." },
          { title: "Real-time monitoring and control", text: "Real-time control of your building's systems for optimal performance." },
          { title: "Energy efficiency optimization", text: "Data-driven insights that maximize energy savings." },
          { title: "Preventive maintenance", text: "A proactive approach that minimizes downtime and extends system life." },
          { title: "Fault detection and diagnostics", text: "Tools that identify and resolve issues quickly." },
          { title: "Environmental monitoring", text: "Indoor air quality, temperature, humidity and more for occupant comfort." },
        ],
      },
      {
        type: "cards",
        heading: "Our USPs",
        columns: 4,
        items: [
          { title: "Enhanced energy efficiency", text: "Fine-tuned energy consumption that reduces cost and environmental impact." },
          { title: "Improved comfort", text: "Optimal conditions that support occupant satisfaction and productivity." },
          { title: "Predictive maintenance", text: "Issues addressed early, minimizing downtime and unexpected repairs." },
          { title: "Real-time monitoring", text: "Live data for informed decision-making." },
          { title: "Sustainability", text: "Solutions aligned with green practices." },
          { title: "Compliance assurance", text: "Compliance with industry regulations, reducing risk and liability." },
          { title: "Cost savings", text: "Optimized resources and lower operating expenses." },
          { title: "Reliability and durability", text: "Robust systems that maximize the lifespan of building infrastructure." },
        ],
      },
      {
        type: "cards",
        heading: "Why choose us for BMS operations?",
        columns: 4,
        items: [
          { title: "Extensive expertise", text: "Years of experience operating building systems." },
          { title: "Modern technology", text: "The latest BMS technology for optimal results." },
          { title: "Custom solutions", text: "Services tailored to your specific needs and goals." },
          { title: "24/7 support", text: "Round-the-clock assistance." },
          { title: "Proactive maintenance", text: "Issues identified before they become critical." },
          { title: "Energy efficiency", text: "Committed to reducing your energy consumption and costs." },
          { title: "Client-centric approach", text: "Your satisfaction and success come first." },
          { title: "Cost savings", text: "Long-term savings from optimized energy use and fewer inefficiencies." },
        ],
      },
    ],
    faqs: [
      {
        question: "How can BMS operations improve efficiency and sustainability?",
        answer: "They optimize energy use, monitor equipment health and provide real-time insights.",
      },
      {
        question: "Which types of buildings do you provide BMS operations for?",
        answer: "Commercial, industrial, healthcare, educational, hospitality and more.",
      },
      {
        question: "Which regions of India do you cover?",
        answer: "We provide BMS operations services across India.",
      },
      {
        question: "Do you offer customized BMS solutions?",
        answer: "Yes. Solutions are tailored to your facility's requirements.",
      },
      {
        question: "How long does BMS implementation take?",
        answer: "It depends on the size and complexity of the facility. We work to make the transition seamless and minimize disruption.",
      },
    ],
    cta: {
      // Live page CTA mentions plumbing and carpentry by mistake; corrected.
      heading: "Take the first step towards optimized building management",
      text: "Request a personalized quote for BMS operations.",
    },
  },
  {
    slug: "mechanized-housekeeping-services",
    name: "Mechanized Housekeeping Services",
    trail: [IFM, SOFT],
    seo: {
      title: "Mechanized Housekeeping Services in India",
      description:
        "Mechanized housekeeping services delivering efficient, eco-friendly and cost-effective cleaning for large spaces.",
    },
    title: "Advanced mechanized housekeeping services",
    lead: "Cleaner, more efficient workplaces, from floor to ceiling.",
    heroImage: `${wp}/2023/10/soft-services.jpg`,
    heroAlt: "Housekeeping team at work in an office",
    intro: {
      heading: "Workplace cleanliness, raised to a higher standard",
      paragraphs: [
        "With expertise dating back to 1983, we bring innovation and efficiency to workplace maintenance. A clean, orderly workplace matters for productivity and employee well-being, not just appearance.",
        "Our mechanized approach combines modern equipment with skilled professionals, so every corner of your workspace gets the attention it needs. We use eco-friendly cleaning agents that promote a healthier environment.",
        "Backed by the L. V. Shinde Group's legacy and a customer-centric approach, we tailor housekeeping to each client's needs.",
      ],
    },
    sections: [
      {
        type: "checklist",
        heading: "Our mechanized housekeeping services",
        lists: [
          {
            items: [
              "General cleaning",
              "Floor care",
              "Window cleaning",
              "Carpet and upholstery cleaning",
              "Restroom sanitization",
              "Dusting and surface wiping",
              "Waste management",
              "Customized cleaning plans",
            ],
          },
        ],
      },
      {
        type: "cards",
        heading: "Benefits of outsourcing housekeeping",
        columns: 4,
        items: [
          { title: "Cleanliness and hygiene", text: "A consistently clean, sanitized environment for staff and visitors." },
          { title: "Staff productivity", text: "A well-kept workspace lifts morale and productivity." },
          { title: "Cost-effective", text: "Save on recruitment, training and operating costs." },
          { title: "Skilled professionals", text: "A team trained in current cleaning techniques, with the right tools." },
          { title: "Streamlined operations", text: "We handle the complexity of housekeeping management." },
          { title: "Regulatory compliance", text: "Adherence to industry standards and regulations." },
          { title: "Customized plans", text: "Plans tailored to different areas and frequencies." },
          { title: "Focus on core activities", text: "More time and resources for your core business." },
        ],
      },
      {
        type: "checklist",
        heading: "Why choose us for housekeeping?",
        intro:
          "Housekeeping for commercial complexes, malls, hospitals, IT parks, industrial premises, educational institutions and corporate offices.",
        lists: [
          {
            items: [
              "Over 40 years of excellence in facility management",
              "Customized plans for your specific needs",
              "Skilled professionals equipped with modern tools",
              "Digital workflows, IoT integration and more",
              "24/7 support with quick response",
              "Environmentally conscious practices",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Which industries do you provide housekeeping for?",
        answer:
          "Commercial complexes, malls, hospitals, IT parks, industrial premises, educational institutions and corporate offices, each with tailored hygiene plans.",
      },
      {
        question: "Do you offer one-time cleaning or ongoing contracts?",
        answer: "Both. We handle one-time deep cleans for specific events as well as regular maintenance contracts.",
      },
      {
        question: "How do you keep our premises secure during cleaning?",
        answer: "Staff undergo thorough background checks, and cleaning procedures are supervised.",
      },
      {
        question: "Can you customize services to our needs?",
        answer: "Yes. We work with you on scope, frequency and specialized cleaning to build the right plan.",
      },
      {
        question: "Do you offer emergency cleaning?",
        answer: "Yes. Our responsive team handles unexpected situations to keep your premises clean and safe.",
      },
    ],
    cta: {
      heading: "Get your customized cleaning quote",
      text: "Request a personalized quote and let us take care of your environment while you focus on your business.",
    },
  },
  {
    slug: "commercial-landscaping-gardening",
    name: "Landscaping & Gardening",
    trail: [IFM, SOFT],
    seo: {
      title: "Commercial Landscaping and Gardening Services in India",
      description:
        "Commercial landscaping and gardening services that improve your property, including garden design, maintenance and irrigation.",
    },
    title: "Landscaping and gardening that transform your spaces",
    lead: "Design, development and care for green spaces that last.",
    intro: {
      heading: "Residential and commercial landscaping and gardening",
      paragraphs: [
        "We turn outdoor spaces into green, welcoming environments, with a wide range of landscaping and gardening services for residential and commercial needs.",
        "We combine creative design, sustainable practices and expert horticultural care to create landscapes that work in harmony with nature.",
      ],
    },
    sections: [
      {
        type: "cards",
        heading: "Our landscaping and gardening services",
        columns: 4,
        items: [
          { title: "Landscape architecture & design", text: "Landscapes that blend artistry and function." },
          { title: "Landscape development & execution", text: "From concept to reality, built with precision." },
          { title: "Landscape maintenance", text: "Dedicated teams that keep landscapes looking their best." },
          { title: "Garden design", text: "Thoughtful designs that improve the look of your gardens." },
          { title: "Plant nursery services", text: "A wide variety of plants and trees for your spaces." },
          { title: "Expert installation", text: "Every part of installation handled with precision and care." },
          { title: "Seasonal maintenance", text: "Mowing, trimming, seasonal clean-ups and fertilization." },
          { title: "Customer satisfaction", text: "Quality service and craftsmanship on every project." },
        ],
      },
      {
        type: "checklist",
        heading: "Why choose us for landscaping and gardening?",
        lists: [
          {
            items: [
              "Creative landscape design tailored to your preferences and environment",
              "Eco-friendly, sustainable landscaping practices",
              "Experienced horticulturists and gardeners",
              "Complete garden maintenance, from seasonal planting to year-round upkeep",
              "Garden designs aligned with your aesthetic and functional goals",
              "High-quality plant selection",
              "A reliable plant nursery with diverse flora",
              "Outdoor spaces built to flourish for years",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "What types of spaces do you landscape?",
        answer: "Residential properties, commercial complexes, educational institutions, healthcare facilities and industrial areas.",
      },
      {
        question: "How can I request a consultation?",
        answer:
          "Contact our team. We will schedule a consultation to understand your requirements, assess the site and provide a tailored proposal and design.",
      },
      {
        question: "What sustainable practices do you use?",
        answer: "Water-efficient irrigation, native plant selection, organic soil management and responsible waste disposal.",
      },
      {
        question: "Do you design for both residential and commercial properties?",
        answer: "Yes. Our landscape architects and designers create custom solutions for homes and business premises.",
      },
      {
        question: "What does garden maintenance include?",
        answer:
          "Lawn care, pruning, fertilization, pest control, seasonal plantings, irrigation system maintenance and general upkeep, tailored to each project.",
      },
    ],
    cta: {
      heading: "Request a landscaping and gardening consultation",
      text: "Transform your outdoor space. Request a quote today.",
    },
  },
  {
    slug: "guest-house-management-services",
    name: "Guest House Management Services",
    trail: [IFM, SOFT],
    seo: {
      title: "Guest House Management Services",
      description:
        "Guest house management services for businesses: smooth operations, better guest experiences and efficient facility management.",
    },
    title: "Guest house management for memorable stays",
    lead: "Comfort and convenience for every guest, every stay.",
    intro: {
      heading: "Guest house management services in India",
      paragraphs: [
        "Our guest house management services are designed to improve your property's reputation and guest experience.",
        "Whether you are a business with a corporate guest house or a property manager, we provide complete solutions tailored to your needs.",
      ],
    },
    sections: [
      {
        type: "cards",
        heading: "Our guest house management solutions",
        columns: 3,
        items: [
          { title: "Reservation management", text: "Streamlined booking for a smooth reservation experience." },
          { title: "Housekeeping", text: "Impeccable cleanliness and presentation that leave a positive impression." },
          { title: "Maintenance and repairs", text: "Maintenance issues resolved swiftly for a hassle-free stay." },
          { title: "Front desk services", text: "Professional, courteous front desk support." },
          { title: "Security and safety", text: "Robust security measures that protect guests and property." },
          { title: "Billing and accounting", text: "Accurate financial management and transparent accounting." },
        ],
      },
      {
        type: "checklist",
        heading: "Why choose us for guest house management?",
        lists: [
          {
            items: [
              "Years of hospitality experience",
              "Management strategies tailored to your guest house",
              "A skilled, dedicated team",
              "Technology that improves efficiency and guest satisfaction",
              "Competitive pricing and good value",
              "A focus on memorable guest experiences",
              "Open, transparent communication",
              "Sustainable, eco-friendly practices",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        // Live page shows a landscaping question here by mistake; corrected to match the answer.
        question: "What does guest house management cover?",
        answer: "Reservation management, housekeeping, maintenance, front desk services, security and accounting.",
      },
      {
        question: "Why outsource guest house management?",
        answer: "You can focus on your core business while experts run your guest accommodation efficiently.",
      },
      {
        question: "How do you keep guest houses secure?",
        answer: "Access control, surveillance and trained personnel keep guests and their belongings safe.",
      },
      {
        question: "Can you customize services to our needs?",
        answer: "Yes. Our solutions are tailored to your requirements.",
      },
      {
        question: "How do we get started?",
        answer: "Contact us for a free consultation to discuss your needs and build a personalized plan.",
      },
    ],
    cta: {
      heading: "Start improving your guest house today",
      text: "Ready to raise your guest house standards? Request a quote.",
    },
  },
  {
    slug: "front-office-management",
    name: "Front Office Management",
    trail: [IFM, SOFT],
    seo: {
      title: "Front Office Management Services in India",
      description:
        "Front office management services covering reception, visitor and guest services, and administrative support that improve business efficiency.",
    },
    title: "Seamless front office management",
    lead: "Efficiency and great first impressions start at the front desk.",
    intro: {
      heading: "A professional front office, fully managed",
      paragraphs: [
        "The front desk is the first point of contact for guests and visitors and shapes their impression of your business. It can also be a demanding area to manage.",
        "We provide a dedicated team of professionals who handle the day-to-day work, so your front office runs smoothly and your people can focus on core business activities.",
      ],
    },
    sections: [
      {
        type: "checklist",
        heading: "What we handle",
        intro:
          "For corporate offices, healthcare institutions, law firms, hotels, IT and co-working spaces, and more.",
        lists: [
          {
            items: [
              "Reception desk management",
              "Visitor and guest services",
              "Appointment scheduling",
              "Telephone answering services",
              "Mail and package handling",
              "Front office staff training",
              "Visitor experience enhancement",
              "Office lobby maintenance",
            ],
          },
        ],
      },
      {
        type: "cards",
        heading: "Why front office management matters",
        columns: 4,
        items: [
          { title: "First impressions", text: "A well-managed front office sets the tone for successful interactions." },
          { title: "Productivity", text: "Streamlined operations free your team to focus on core tasks." },
          { title: "Guest services", text: "Professional handling of visitors and guests." },
          { title: "Communication", text: "Important calls and messages are handled promptly." },
          { title: "Punctual appointments", text: "Efficient scheduling minimizes waiting times." },
          { title: "Mail and packages", text: "Reliable handling that prevents workflow disruptions." },
          { title: "Staff capabilities", text: "Training that builds a professional, competent team." },
          { title: "Brand representation", text: "Front office staff represent your brand, values and culture." },
        ],
      },
      {
        type: "cards",
        heading: "Why choose us for front office management?",
        columns: 4,
        items: [
          { title: "Experienced expertise", text: "Extensive experience in front office management." },
          { title: "Tailored solutions", text: "Services customized to your business." },
          { title: "Professional staff", text: "Trained staff who deliver a warm welcome." },
          { title: "Modern technology", text: "Tools for appointment scheduling, call management and more." },
          { title: "Guest experience", text: "Visitor services that create lasting impressions." },
          { title: "Security and compliance", text: "Safety first, with adherence to compliance standards." },
          { title: "Time and cost efficiency", text: "Streamlined processes that save time and resources." },
          { title: "Customer satisfaction", text: "A better experience for clients, visitors and employees." },
        ],
      },
    ],
    faqs: [
      {
        question: "What does front office management include?",
        answer: "Staffing, training, systems implementation and consulting for your front office.",
      },
      {
        question: "Can you manage both small and large front offices?",
        answer: "Yes. We manage front offices of all sizes.",
      },
      {
        question: "How can you improve the visitor experience?",
        answer:
          "A warm greeting, staff who know your company, friendly and helpful service, and prompt answers to visitors' questions so they feel welcome.",
      },
      {
        question: "Which types of businesses do you support?",
        answer: "Hotels, restaurants, offices, medical facilities, retail stores, schools, government agencies and more.",
      },
      {
        question: "Can you customize solutions to our needs?",
        answer: "Yes. We work with you to develop a solution that meets your requirements.",
      },
    ],
    cta: {
      heading: "Request a customized front office management quote",
      text: "Tell us about your front office and we will design the right solution.",
    },
  },
  {
    slug: "helpdesk-and-mailroom-solution",
    name: "Helpdesk and Mailroom Solution",
    trail: [IFM, SOFT],
    seo: {
      title: "Helpdesk and Mailroom Solutions",
      description:
        "Helpdesk and mailroom solutions that streamline operations, improve communication and boost organizational efficiency.",
    },
    title: "Integrated helpdesk and mailroom solutions",
    lead: "Streamlined workflows, better productivity and a team that can focus on what matters.",
    intro: {
      heading: "Streamline workflows across your workplace",
      paragraphs: [
        "Unmanaged requests and cumbersome mailroom processes slow organizations down.",
        "Our combined helpdesk and mailroom solution captures and resolves requests quickly, keeps mail moving accurately, and gives you clear visibility of both.",
      ],
    },
    sections: [
      {
        type: "cards",
        heading: "Tailored helpdesk services",
        columns: 4,
        items: [
          { title: "Request management", text: "Capture, prioritize and resolve employee requests through an easy-to-use helpdesk platform." },
          { title: "Work order generation", text: "Assign and track tasks for timely completion and clear accountability." },
          { title: "Feedback integration", text: "Capture employee insights and use them to improve service delivery." },
          // FLAG: live copy says SLAs are met "without fail". Softened; confirm with Operations.
          { title: "SLA adherence", text: "Consistent, reliable performance against your service level agreements." },
        ],
      },
      {
        type: "cards",
        heading: "Mailroom operations",
        columns: 4,
        items: [
          { title: "Comprehensive tracking", text: "Real-time visibility of incoming and outgoing mail." },
          { title: "Supplier performance evaluation", text: "Data-driven monitoring of mail service providers." },
          { title: "Streamlined processes", text: "Efficient procedures that remove bottlenecks in mail handling." },
          { title: "Flexible customization", text: "Solutions sized to your volume, workflow and security needs." },
        ],
      },
      {
        type: "cards",
        heading: "Better results, driven by technology",
        columns: 3,
        items: [
          { title: "Break down silos", text: "Unified communication and data visibility across departments." },
          { title: "Unified dashboards & reporting", text: "A holistic view of operations for informed decisions." },
          { title: "Cost optimization", text: "Lower administrative overhead and better resource allocation." },
          { title: "Helpdesk automation", text: "Routine tasks automated so your team can focus on strategic work." },
          { title: "Real-time mailroom tracking", text: "Transparent, up-to-date tracking of every mail item." },
          { title: "Data-driven analytics", text: "Actionable insights to optimize performance." },
        ],
      },
    ],
    faqs: [],
    cta: {
      heading: "Contact us for tailored helpdesk and mailroom solutions",
      text: "Explore how our helpdesk and mailroom solutions can make your workplace more efficient.",
    },
  },
];
