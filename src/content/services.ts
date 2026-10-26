/**
 * Service detail pages.
 * SOURCE: live service pages on supremefacility.com (checked 26 Oct 2026). Copy lightly edited for grammar only.
 * Treated as final for now on instruction. Items marked FLAG need owner confirmation before launch.
 */

import type { NavLink } from "./site";

export type CardItem = { title: string; text: string; href?: string };
export type MetricItem = { value: string; label: string; text?: string };
export type FeatureItem = { title: string; text: string; href: string; image: string; alt: string };

export type PageSection =
  | { type: "cards"; heading: string; intro?: string; columns?: 2 | 3 | 4; items: CardItem[] }
  | { type: "metrics"; heading: string; intro?: string; items: MetricItem[] }
  | { type: "checklist"; heading: string; intro?: string; lists: { title?: string; items: string[] }[] }
  | { type: "features"; heading: string; intro?: string; items: FeatureItem[] }
  | { type: "gallery"; heading: string; intro?: string; images: { src: string; alt: string; caption?: string }[] };

export type Faq = { question: string; answer: string };

export type ServicePage = {
  /** "service" pages sit under Services in breadcrumbs and get Service structured data. Default: "service". */
  kind?: "service" | "company";
  slug: string;
  name: string;
  /** Parent pages between "Services" and this page, for breadcrumbs and sibling links. */
  trail?: NavLink[];
  seo: { title: string; description: string };
  title: string;
  lead: string;
  heroImage?: string;
  heroAlt?: string;
  intro: { heading: string; paragraphs: string[] };
  sections: PageSection[];
  faqs: Faq[];
  cta: { heading: string; text: string };
  /** Optional override for the CTA button (defaults to the contact page). */
  ctaHref?: string;
  ctaLabel?: string;
};

export const wp = "https://supremefacility.com/wp-content/uploads";

export const servicePages: ServicePage[] = [
  {
    slug: "integrated-facility-management",
    name: "Integrated Facility Management",
    seo: {
      title: "Integrated Facility Management Services in India",
      description:
        "Integrated facility management services by Supreme Facility Management. Expert solutions in maintenance, security and more for your business needs.",
    },
    title: "Optimize operations with integrated facility management services",
    lead: "Transform your facility management with smart, integrated services. Contact us for a quote on a customized solution.",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80", // TEMPORARY
    heroAlt: "Glass-fronted commercial building",
    intro: {
      heading: "Integrated facility management services",
      paragraphs: [
        "Supreme Facility is a leading provider of integrated facility management services. We offer full-service solutions to efficiently manage your buildings, grounds and more.",
        "Our comprehensive approach helps reduce costs and improve customer satisfaction while optimizing operations. We understand that every building and facility is unique.",
        "Our team works with you to build a complete plan for managing your workplaces that meets your budget and operational objectives.",
      ],
    },
    sections: [
      {
        type: "features",
        heading: "Comprehensive IFM solutions: our range of services",
        intro:
          "IFM covers a range of integrated services, from day-to-day operations to advanced technical support and strategic planning. Our IFM services include:",
        items: [
          {
            title: "Hard services",
            text: "Physical maintenance of your facility: engineering, installation, remedial and preventive maintenance for HVAC, plumbing and drainage systems, electrical installations, water treatment plants, fire protection systems and more.",
            href: "/hard-services/",
            image: `${wp}/2023/10/Hard-services.jpg`,
            alt: "Technician servicing building equipment",
          },
          {
            title: "Soft services",
            text: "Everything that makes a comfortable, safe and secure working environment. Our trained professionals provide reliable janitorial, landscaping, security and safety, waste management, pest control, catering services and more.",
            href: "/best-soft-facility-management-services-in-india/",
            image: `${wp}/2023/10/soft-services.jpg`,
            alt: "Housekeeping team at work in an office",
          },
          {
            title: "Staffing solutions",
            text: "Integrated staffing and manpower management for a wide range of industries. With a legacy dating back to 1983, we are established as a one-stop solution provider that delivers better employee experiences.",
            href: "/staffing-manpower-solution/",
            image: `${wp}/2023/12/New-Project.jpg`,
            alt: "Staffing team members",
          },
          {
            title: "Hospitality services",
            text: "Executive housekeeping including laundry, kitchen stewarding and front office management, plus pantry and F&B services and store room management, run to the highest standards.",
            href: "/hospitality-management/",
            image: `${wp}/2023/10/Hospitality-Services.jpg`,
            alt: "Hospitality staff preparing a room",
          },
          {
            title: "Health care services",
            text: "Specialized housekeeping, operational maintenance, ambulance drivers and patient care attendants, plus biomedical waste management with secure handling, treatment and disposal.",
            href: "/hospital-healthcare-facility-management/",
            image: `${wp}/2023/10/Health-care-services.jpg`,
            alt: "Healthcare facility support staff",
          },
        ],
      },
      {
        type: "cards",
        heading: "Why choose Supreme Facility Management?",
        columns: 3,
        items: [
          { title: "Experienced and proficient team", text: "Our team is skilled across facility management, from upkeep and repair to energy efficiency." },
          { title: "Quality assurance", text: "Our quality assurance team routinely assesses our services to make sure everything is completed to the highest standard." },
          { title: "Cost-effective solutions", text: "Keep your operating costs low while maintaining the quality of your facilities." },
          { title: "Customized services", text: "Our facility management service can be tailored to the specific needs of your business." },
          { title: "Extensive support", text: "Full support for all our services, so you have the resources you need to keep your facilities running." },
        ],
      },
      {
        type: "checklist",
        heading: "Components and benefits of IFM",
        lists: [
          {
            title: "Key components",
            items: ["Building & grounds maintenance", "Security services", "Energy management", "Space management", "Facility management software"],
          },
          {
            title: "Benefits",
            items: [
              "Increased efficiency",
              "Reduced costs",
              "Improved customer satisfaction",
              "Improved regulatory compliance",
              "Improved environmental sustainability",
            ],
          },
        ],
      },
      {
        type: "cards",
        heading: "Factors to consider when selecting an IFM partner",
        columns: 3,
        items: [
          { title: "Budget", text: "How much can you invest in an IFM partner?" },
          { title: "Reliability", text: "Is the company reliable and experienced, with a track record of successful projects?" },
          { title: "Services offered", text: "What services do they offer, and how do these match your needs?" },
          { title: "Scalability", text: "Can the IFM partner scale their services as needed?" },
          { title: "Technology", text: "What technology do they use for tracking, monitoring and reporting?" },
        ],
      },
    ],
    faqs: [
      {
        question: "Which industries does Supreme Facility Management cater to?",
        answer:
          "As an integrated facility management company, we are a one-stop solution for facility and property management services, serving customers in hospitality, healthcare, retail, commercial real estate, education and IT & ITES.",
      },
      {
        question: "Are your services customizable to suit my facility's requirements?",
        answer: "Yes. We provide facility management services tailored to each client's needs and budget.",
      },
      {
        question: "How do you maintain service quality?",
        answer:
          "We employ a team of experienced, dedicated experts focused on client support and satisfaction. The team is routinely trained in current industry best practices and advancements.",
      },
      {
        question: "What is the process for engaging Supreme Facility Management as our IFM partner?",
        answer:
          "Onboarding starts with an initial consultation to understand your requirements, followed by a complete evaluation of the facility and its operations and an on-site assessment. We then work with you on a customized plan that meets your objectives and budget.",
      },
      {
        question: "Do you prioritize sustainability and eco-friendly practices?",
        answer:
          "Yes. Our team is trained in green building initiatives and best practices, and we work to reduce our environmental footprint while maintaining high service quality.",
      },
    ],
    cta: {
      heading: "Request a free quote for integrated facility management",
      text: "Our integrated facility management services are tailored to the needs of your business, inside and out. Tell us what you need.",
    },
  },

  {
    slug: "supply-chain-solutions",
    name: "Supply Chain Solutions",
    seo: {
      title: "Supply Chain Solutions for Efficient Business Operations",
      description:
        "Supply chain solutions by Supreme Facility Management, providing logistics, inventory management and streamlined distribution.",
    },
    title: "Empowering businesses with supply chain solutions",
    lead: "Unlock your full business potential with dynamic supply chain solutions built for efficiency and growth.",
    heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80", // TEMPORARY
    heroAlt: "Warehouse shelves and logistics equipment",
    intro: {
      heading: "Supply chain solutions",
      paragraphs: [
        // FLAG: live page brands this unit "LVS Supply Chain Solutions". Confirm naming with Marketing.
        "Business success depends on streamlined processes, from procurement to delivery. At LVS Supply Chain Solutions, we take pride in four decades of commitment to excellence in supply chain management.",
        "The supply chain is the backbone of any operation, connecting every stage of your business, from sourcing raw materials to delivering finished products. A well-run supply chain minimizes disruption and maximizes profitability.",
        "Our solutions optimize logistics, streamline processes and improve productivity, so you can focus on growing your business. Our experienced team analyses your current processes, identifies bottlenecks and designs strategies that improve efficiency and reduce costs.",
        "Our presence across e-commerce, automotive, healthcare, consumer electronics, food and beverage and more reflects our adaptability and commitment to excellence.",
      ],
    },
    sections: [
      {
        type: "cards",
        heading: "Service offerings",
        intro: "A holistic set of solutions across the supply chain, from warehouse management to in-plant logistics.",
        columns: 4,
        items: [
          { title: "Warehouse management", text: "Efficient, organized warehouse management for timely accessibility and accurate inventory control." },
          { title: "Inventory management", text: "Precise, data-driven control of inventory levels to minimize costs and maximize availability." },
          { title: "Manpower management", text: "Efficient allocation and management of your workforce for seamless operations." },
          { title: "Local material movements", text: "Reliable, timely local material transportation." },
          { title: "Trolley movement", text: "Streamlined material flow within your facility for greater operational agility." },
          { title: "Kitting & repacking", text: "Flexible kitting and repacking services tailored to your product requirements." },
          { title: "Line feeding", text: "Keep production lines consistently supplied and minimize disruptions." },
          { title: "In-plant logistics", text: "Efficiency within your plant premises, improving productivity and resource utilization." },
          { title: "Store operation", text: "Smooth store operations with organized storage and quick retrieval." },
          { title: "Multi-client facility", text: "Flexible, efficient storage in a shared facility tailored to your business needs." },
          { title: "Loading & unloading", text: "Swift, secure material handling that minimizes delays and errors." },
          {
            title: "Material handling equipment",
            text: "Advanced equipment for safety and reduced downtime, with rental options including forklifts, stackers and reach trucks.",
          },
        ],
      },
      {
        type: "cards",
        heading: "Our USPs",
        intro: "An efficient supply chain enables streamlined operations, cost savings and better customer satisfaction.",
        columns: 4,
        items: [
          { title: "Cost savings", text: "Streamlined processes and optimized resource allocation reduce costs across the supply chain." },
          { title: "Improved customer satisfaction", text: "Meeting demand accurately and on time, with quick issue resolution, builds stronger relationships." },
          { title: "Risk mitigation", text: "Proactive monitoring and agile response strategies protect against unexpected disruptions." },
          { title: "Data-driven decisions", text: "Real-time data and analytics support continuous improvement and growth." },
          { title: "Enhanced efficiency", text: "Seamless coordination and timely execution minimize delays, bottlenecks and idle resources." },
          { title: "Inventory optimization", text: "Precise inventory control prevents overstocking and stockouts, reducing carrying costs." },
          { title: "Increased agility", text: "Adapt quickly to changing market dynamics and customer demand." },
          { title: "Sustainability", text: "Efficient practices reduce environmental impact and support sustainability goals." },
        ],
      },
      {
        type: "cards",
        heading: "Why choose us for supply chain management?",
        columns: 4,
        items: [
          { title: "Proven track record", text: "Supply chain solutions across industries with a focus on cost savings, efficiency, safety and sustainability." },
          { title: "End-to-end solutions", text: "Every aspect of supply chain management, from warehousing to logistics and everything in between." },
          { title: "Customization", text: "Fully customizable solutions aligned with your specific needs and goals." },
          { title: "Skilled team", text: "Deep industry knowledge and a hands-on approach, backed by regular training." },
          { title: "Scalable space and inventory", text: "Solutions that scale with your growth while ensuring optimal space utilization." },
          { title: "Advanced technology and robust WMS", text: "A robust Warehouse Management System that improves visibility and provides real-time insights." },
          { title: "Customer-focused CSAT", text: "Close collaboration and robust data to improve customer satisfaction." },
          { title: "Commitment to excellence", text: "Excellence with risk mitigation in every aspect of supply chain management." },
        ],
      },
      {
        type: "checklist",
        heading: "Upcoming project: multi-client facility in Pune and Bhiwandi",
        intro: "A multi-client facility strategically located in Pune and Bhiwandi.",
        lists: [
          {
            items: [
              "Built to suit (50,000 to 1 lakh sq ft) or even smaller space",
              "Fully compliant with fire hydrant system",
              "Conventional as well as palletized storage available",
              "Ideal for OEMs, OEM vendors, FMCG and automobile industries",
              "Flexible storage",
              "Plug-and-play model, pay per use",
              "Shared resources and infrastructure",
              "Minimum customer investment",
              "No lock-in",
              "Scalability to meet demand spurts",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "What are supply chain solutions?",
        answer:
          "The strategic coordination and oversight of all activities involved in producing and distributing goods and services, for optimal efficiency and customer satisfaction.",
      },
      {
        question: "How does effective inventory management impact a business?",
        answer:
          "It balances supply and demand. Accurate tracking of stock levels avoids excess inventory costs and makes sure products are available when needed.",
      },
      {
        question: "What role does warehouse management play in the supply chain?",
        answer:
          "It covers the organization, storage and movement of goods within a warehouse or distribution centre, improving order fulfilment, reducing errors and boosting supply chain efficiency.",
      },
      {
        question: "How does in-plant logistics contribute to operational efficiency?",
        answer:
          "In-plant logistics manages material flow within a manufacturing facility. It optimizes production processes, reduces downtime and improves resource allocation.",
      },
      {
        question: "Why choose Supreme Facility Management for supply chain solutions?",
        answer:
          "We bring a wealth of experience, tailored strategies and a commitment to client success, with a holistic approach that delivers streamlined operations, cost savings and sustainable growth.",
      },
    ],
    cta: {
      heading: "Learn how we can improve your supply chain",
      text: "Discover how our supply chain solutions can transform your operations for efficiency and growth.",
    },
  },

  {
    slug: "employee-transportation-services",
    name: "Employee Transportation Services",
    seo: {
      title: "Employee Transportation Services for Safe and Efficient Commutes",
      description:
        "Professional employee transportation services offering safe, reliable and timely commutes, customized to the needs of your business.",
    },
    title: "Your reliable employee transportation partner",
    lead: "Efficient employee transportation solutions for smooth, safe daily commutes.",
    heroImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80", // TEMPORARY
    heroAlt: "Passenger bus on a road",
    intro: {
      heading: "Delivering excellence in employee transport",
      paragraphs: [
        "We prioritize reliable, efficient corporate employee transportation to support your team's well-being and productivity. Our transport solutions are tailored to your company's needs.",
        "With a dedicated team and a well-maintained fleet, we provide safe, timely transportation for daily commutes, office events and special occasions.",
        "Our approach focuses on efficiency, safety and convenience, creating a commute that improves the daily routine of your workforce.",
      ],
    },
    sections: [
      {
        // FLAG: these figures differ from the homepage (25,000+ passengers/day, 500+ fleet). Both are on the live site; ETS owner to confirm.
        type: "metrics",
        heading: "Our achievements",
        items: [
          { value: "36,000+", label: "Passengers per day" },
          { value: "550+", label: "Fleet operated" },
          { value: "25+", label: "Clients" },
          { value: "1 lakh+", label: "Km driven per day" },
          { value: "35,000", label: "Trips per month" },
        ],
      },
      {
        type: "cards",
        heading: "Our approach",
        columns: 4,
        items: [
          { title: "Tailored solutions", text: "We design transport solutions that align with your company culture, operational needs and employee preferences." },
          { title: "Advanced technology", text: "Technology to optimize routes, manage schedules and provide real-time tracking." },
          { title: "Safety first", text: "Well-maintained vehicles undergo rigorous safety checks, and trained drivers follow strict safety protocols." },
          { title: "Sustainability", text: "We are committed to reducing our carbon footprint and promoting eco-friendly practices." },
        ],
      },
      {
        type: "cards",
        heading: "Transport solutions for every need",
        intro: "An extensive range of transport services, for daily operations and special occasions.",
        columns: 4,
        items: [
          { title: "Shift transport", text: "Employee commuting during shifts, with timely arrivals and departures." },
          { title: "Late-night transport", text: "Reliable transportation that keeps employees safe during late hours." },
          { title: "Inter-office shuttle", text: "Connect your office locations with shuttle services." },
          { title: "Nodal transport", text: "Transport to key nodal points, optimizing accessibility and connectivity." },
          { title: "Fleet transportation", text: "Hassle-free fleet management with vehicles well maintained and ready for service." },
          { title: "Ad hoc transport", text: "On-demand transport for unforeseen needs." },
          { title: "Airport transport (upcoming)", text: "A planned service for smooth, comfortable airport travel for your employees." },
          { title: "Team outing", text: "Reliable, comfortable transport for team outings." },
        ],
      },
      {
        type: "cards",
        heading: "Key services",
        columns: 3,
        items: [
          { title: "Route optimization", text: "Intelligent route planning that minimizes travel time and congestion, saving time and cost." },
          { title: "Real-time tracking", text: "GPS tracking lets employees follow their rides in real time with accurate arrival estimates." },
          { title: "Comprehensive reporting", text: "Detailed analytics on transport usage, trends and costs for data-driven decisions." },
        ],
      },
      {
        type: "cards",
        heading: "Data-driven analytics and expert support",
        columns: 4,
        items: [
          { title: "SMS alerts", text: "Instant alerts for route changes, delays and updates." },
          { title: "MIS reports", text: "A consolidated view of key metrics for better planning and resource allocation." },
          { title: "Vehicle & driver compliance", text: "We manage vehicle maintenance schedules, driver certifications and compliance requirements." },
          { title: "Third-party manpower", text: "Skilled manpower for help desks, transport coordination and other critical functions." },
          { title: "Reports", text: "Track usage, analyse trends and make informed decisions about your transport operations." },
          { title: "Process improvement", text: "Our experts identify inefficiencies and implement streamlined solutions." },
          { title: "Efficiency enhancement", text: "Automated tools create optimized routes and generate comprehensive MIS reports." },
          {
            title: "Expert consultation",
            text: "Transportation planners, analysts and consultants who interpret data and help implement solutions tailored to your goals.",
          },
        ],
      },
      {
        type: "cards",
        heading: "Trip safety features",
        columns: 3,
        items: [
          { title: "GPS and panic alarm", text: "All cabs are equipped with GPS and panic alarms for real-time tracking and immediate assistance." },
          { title: "Driver antecedent checks", text: "All drivers undergo background checks through police or approved external agencies." },
          { title: "Dedicated security guards", text: "After 7 pm, around 200 trained security guards are deployed exclusively for women's cabs." },
          { title: "Regular driver training", text: "Periodic training sessions focused on safety protocols and road awareness." },
          { title: "Safety-compliant cabs", text: "Cabs are equipped with seat belts for both the driver and co-passenger." },
          { title: "Emergency control centres", text: "An emergency control centre in each city, ready to respond to any critical situation." },
        ],
      },
      {
        type: "metrics",
        heading: "Our USPs",
        items: [
          { value: "100%", label: "Trip fulfilment", text: "A near-perfect trip completion rate, so employees never miss a ride." },
          { value: "100%", label: "Safe drop", text: "Every employee reaches their destination securely." },
          { value: "100%", label: "Paperless", text: "Eco-friendly, efficient digital processes." },
          { value: "98%", label: "On-time arrival", text: "We strive for a 98% on-time arrival rate." },
          { value: "25%", label: "Cost reduction", text: "Savings through optimized transport, without compromising quality." },
        ],
      },
      {
        type: "cards",
        heading: "Our transportation platform",
        intro: "A platform built for efficiency, safety and cost-effectiveness across your employee commute.",
        columns: 3,
        items: [
          { title: "Smart, GPS-enabled buses", text: "A modern fleet equipped for a comfortable, connected commute." },
          { title: "Efficient route optimization", text: "Advanced algorithms that minimize travel time." },
          { title: "Safer commute", text: "Safety features and protocols for a secure journey." },
          { title: "Significant cost savings", text: "Optimized routes and efficient operations reduce costs." },
          { title: "Real-time vehicle tracking", text: "Employees and administrators can monitor vehicles and arrivals accurately." },
          { title: "Data analytics", text: "Insights to fine-tune operations and improve efficiency." },
          { title: "Employee notifications", text: "Automated notifications about pick-up times, delays and updates." },
          { title: "Green transportation options", text: "Eco-friendly options, including electric or hybrid vehicles." },
          { title: "Premium executive transport", text: "Personalized, premium transport for senior executives." },
          { title: "Special event transport", text: "Smooth transport for company events, conferences and team outings." },
        ],
      },
    ],
    faqs: [
      {
        question: "Can we customize transportation routes to our office locations?",
        answer: "Yes. Our team works with you to plan routes that align with your office locations and employee requirements.",
      },
      {
        question: "Is there an on-demand booking option for employees with varying schedules?",
        answer: "Yes. Employees can book rides through our app.",
      },
      {
        question: "How can we track the performance of the transportation service?",
        answer:
          "Our tracking system provides real-time monitoring of vehicle locations, trip progress and performance metrics, with detailed reports.",
      },
      {
        question: "What customer support do you offer?",
        answer: "Our dedicated customer support team is available around the clock to address issues or concerns.",
      },
      {
        question: "How do we get started?",
        answer:
          "Reach out to us. Our team will understand your requirements, recommend the best solution and handle onboarding for your organization.",
      },
    ],
    cta: {
      heading: "Ready to improve employee transport? Request your quote",
      text: "Share your requirements and our team will create a transportation solution that matches your needs.",
    },
  },

  {
    slug: "corporate-food-solutions",
    name: "Corporate Food Solutions",
    seo: {
      title: "Corporate Food Solutions: Catering and Food Services",
      description:
        "Corporate food solutions including high-quality catering, cloud kitchen food services and office meals for large corporate events.",
    },
    title: "Workplace food solutions your teams will enjoy",
    lead: "Elevate your office dining with catering built around your people.",
    heroImage: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=1600&q=80", // TEMPORARY
    heroAlt: "Prepared meal served on a plate",
    intro: {
      heading: "Professional corporate food solutions",
      paragraphs: [
        // FLAG: live page uses "LVS Group" branding here. Confirm naming with Marketing.
        "LVS Group is your partner for corporate food solutions, catering to a wide range of tastes and dietary preferences.",
        "Our diverse menus serve everything from important meetings to client gatherings. With expertise in industrial, educational and IT catering, we create enjoyable dining experiences.",
        "Let us handle the catering while you focus on your business objectives.",
      ],
    },
    sections: [
      {
        type: "cards",
        heading: "Types of corporate food solutions",
        intro: "From breakfast that starts the day to dinners that celebrate success.",
        columns: 3,
        items: [
          { title: "Breakfast catering", text: "A breakfast spread that energizes your team for the day ahead." },
          { title: "Lunch catering", text: "Lunch that keeps employees and clients satisfied and fuelled." },
          { title: "Dinner catering", text: "Dinner events that leave a lasting impression on internal and external guests." },
          { title: "Special event catering", text: "Customized catering for special occasions." },
          { title: "Workstation catering", text: "Convenient catering delivered right to workstations." },
          { title: "Offsite catering", text: "Catering at your preferred location, beyond the office walls." },
        ],
      },
      {
        type: "cards",
        heading: "Industries we cater to",
        columns: 4,
        items: [
          { title: "Industrial catering", text: "Nourishing meals that support workforce productivity and well-being." },
          { title: "Healthcare catering", text: "Catering designed to support healing and balanced nutrition." },
          { title: "Educational catering", text: "Wholesome, flavourful options for learning environments." },
          { title: "IT catering", text: "Catering choices for the needs of tech teams." },
          { title: "Offshore catering", text: "Varied, satisfying meals even in remote work settings." },
          { title: "Off-site catering", text: "Comfortable, home-style dishes wherever you need them." },
          { title: "On-site catering", text: "Accessible dining at your workplace." },
          { title: "Outdoor catering", text: "Outdoor catering that makes events memorable." },
        ],
      },
      {
        type: "checklist",
        heading: "Why corporates should consider a food solutions provider",
        intro:
          "Customized menus for diverse tastes and dietary preferences, nutritious food that supports well-being and productivity, and high standards of hygiene and safety.",
        lists: [
          {
            items: [
              "Ensure a well-balanced, nutrient-rich diet for employees",
              "Increase employee morale and productivity",
              "Look after employee health and wellness",
              "Provide non-cash benefits to employees",
              "Serve the changing needs and demands of the workforce",
              "Ensure employees eat hygienic food at a reasonable price",
              "Support CSR initiatives",
            ],
          },
        ],
      },
      {
        type: "cards",
        heading: "Choosing the right food solutions partner",
        columns: 3,
        items: [
          { title: "Menu variety", text: "A diverse menu that caters to different tastes and dietary preferences." },
          { title: "Experience and reputation", text: "A proven track record and positive feedback from previous clients." },
          { title: "Service and presentation", text: "Professionalism and presentation that impress your guests." },
          { title: "Quality and taste", text: "Sample the food beforehand to make sure it meets your expectations." },
          { title: "Flexibility", text: "A service that accommodates last-minute changes and your event's specific needs." },
          { title: "Sustainability", text: "Eco-friendly packaging, local ingredients and minimal food waste." },
        ],
      },
      {
        type: "checklist",
        heading: "What sets us apart",
        lists: [
          {
            items: [
              "Customized menu preparation",
              "Approved & licensed raw material vendors",
              "Committed to supporting health & wellness",
              "Transparency in cooking procedures",
              "Expert chefs",
              "SOP-based cooking procedures",
              "Flexible shifts available",
              "FSSAI certified",
              "Cashless convenience",
            ],
          },
        ],
      },
      {
        type: "cards",
        heading: "A threefold sustainability initiative in our kitchens",
        columns: 3,
        items: [
          { title: "Green sourcing", text: "Local and seasonal produce to minimize environmental impact and support communities." },
          { title: "Nourishing choices", text: "Sustainable options that lower carbon footprints and support nutrition." },
          { title: "Waste reduction", text: "Creative culinary methods that reduce food waste." },
        ],
      },
    ],
    faqs: [
      {
        question: "What types of catering services do you offer corporate clients?",
        answer: "Breakfast, lunch, dinner and special event catering, tailored to the needs of each corporate client.",
      },
      {
        question: "How do you ensure the quality and freshness of the food?",
        answer:
          "Our chefs use quality ingredients, and our streamlined processes and quality checks maintain high standards of taste and freshness.",
      },
      {
        question: "Do you cater to multiple locations?",
        answer: "Yes. We serve corporate clients at their main offices and at offsite locations.",
      },
      {
        question: "What sets your corporate food solutions apart?",
        answer:
          "Attention to detail, commitment to quality, an experienced team, diverse menus and the ability to customize catering to your requirements.",
      },
      {
        question: "Do you provide on-site setup and assistance during office catering?",
        answer: "Yes. Our team provides on-site setup and assistance so you can focus on your business.",
      },
      {
        question: "Do you provide off-site setup and assistance?",
        answer:
          "Yes. Whether it is a corporate event, a customized menu, workstation catering with à la carte services or in-house catering, we provide setup and assistance wherever you need it.",
      },
    ],
    cta: {
      heading: "Elevate workplace meals: get your quote",
      text: "From breakfasts to dinners, we cater to all your business needs. Request a quote today.",
    },
  },

  {
    slug: "production-support-services",
    name: "Production Support Services",
    seo: {
      title: "Production Support Services for Streamlined Operations",
      description:
        "Expert production support services that improve operational productivity, with customized solutions for smooth workflows and on-time issue resolution.",
    },
    title: "Transform production with production support services",
    lead: "Reinvent efficiency on your factory floor.",
    heroImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80", // TEMPORARY
    heroAlt: "Industrial production equipment",
    intro: {
      heading: "Production support services",
      paragraphs: [
        "Production Support Services (PSS) creates self-contained units within a factory. These mini-factories operate independently yet integrate seamlessly, streamlining production and fostering innovation.",
        "With specialized machinery and dedicated personnel, PSS brings efficiency and flexibility to manufacturing.",
      ],
    },
    sections: [
      {
        type: "cards",
        heading: "Our USPs",
        intro: "The PSS approach brings a range of advantages to your production processes.",
        columns: 4,
        items: [
          { title: "Enhanced workflow efficiency", text: "Self-contained units streamline processes and minimize bottlenecks." },
          { title: "Specialized expertise", text: "Each mini-factory focuses on specific tasks, building excellence in each domain." },
          { title: "Agile adaptation", text: "A modular setup enables rapid adjustments to production lines." },
          { title: "Resource allocation", text: "Dedicated units reduce wastage and improve resource management." },
          { title: "Scalability", text: "Expand individual units without disrupting the entire manufacturing setup." },
          { title: "Innovation hubs", text: "Mini-factories promote experimentation and new ideas." },
          { title: "Quality enhancement", text: "A targeted approach improves quality control and oversight." },
          { title: "Employee empowerment", text: "Cross-functional collaboration and skill development build a versatile workforce." },
        ],
      },
      {
        type: "cards",
        heading: "Challenges clients face",
        columns: 4,
        items: [
          { title: "High cost pressure", text: "Cutting costs while maintaining quality and operational excellence." },
          { title: "Complex compliances", text: "Labour and factory regulations demand meticulous compliance." },
          { title: "Low productivity", text: "Limited transparency and accountability on the floor reduce productivity." },
          { title: "Market volatility", text: "Fluctuating demand requires adaptable strategies." },
          { title: "Supply chain disruptions", text: "Disruptions affect the timely flow of materials and components." },
          { title: "Technological integration", text: "Integrating new technology with existing systems is challenging." },
          { title: "Sustainability demands", text: "Environmental targets add complexity to production." },
          { title: "Talent shortages", text: "Finding and retaining a skilled workforce is a recurring challenge." },
        ],
      },
      {
        type: "cards",
        heading: "Our value proposition",
        columns: 4,
        items: [
          { title: "Streamlined compliance", text: "We take on the burden of statutory factory and labour compliance." },
          { title: "Cost optimization", text: "Optimum resource utilization reduces production costs." },
          { title: "Performance-linked payments", text: "Our 'pay-as-we-deliver' model ties payments to performance milestones." },
          { title: "Timely deliveries", text: "An On Time In Full (OTIF) approach for timely, accurate order fulfilment." },
          { title: "Enhanced productivity", text: "Greater on-floor accountability drives productivity." },
          { title: "Safety first", text: "We prioritize the safety of your workforce on the factory premises." },
          { title: "Customized quality", text: "Production aligned precisely with your quality standards." },
          { title: "Preventive maintenance", text: "Rigorous preventive maintenance keeps machines reliable." },
        ],
      },
      {
        type: "cards",
        heading: "Client onboarding process",
        intro: "A structured onboarding process for a smooth transition to the PSS model.",
        columns: 3,
        items: [
          { title: "Identification & understanding", text: "Identifying your requirements and understanding your operational nuances." },
          { title: "Contractual agreements", text: "Clear agreements on roles, responsibilities and performance metrics." },
          { title: "Legal considerations", text: "Meeting legal obligations for compliance and operational clarity." },
          { title: "Employee transfer", text: "A seamless transfer of employees that preserves your workforce's expertise." },
          { title: "PSS setup", text: "Establishing the PSS model, customized to your needs." },
          { title: "Training", text: "Training modules that align your team with the PSS approach." },
        ],
      },
    ],
    faqs: [
      {
        question: "How does the PSS model differ from traditional factory setups?",
        answer:
          "It creates self-contained units within a larger facility, promoting specialized production, efficiency and optimal resource utilization.",
      },
      {
        question: "Is the PSS model suitable for all industries?",
        answer: "It is adaptable across a wide range of industries, including manufacturing, automotive and electronics.",
      },
      {
        question: "What support do you provide during implementation?",
        answer: "Initial assessment, employee transition, training, legal compliance and the establishment of self-contained units.",
      },
      {
        question: "Can PSS be customized to our manufacturing needs?",
        answer: "Yes. The model is tailored to your specific requirements and production processes.",
      },
      {
        question: "Is the PSS model scalable?",
        answer: "Yes. It can be scaled up or down as production demands change.",
      },
    ],
    cta: {
      heading: "Streamline your factory with production support services",
      text: "Take the first step towards better efficiency, cost savings and quality.",
    },
  },
];
