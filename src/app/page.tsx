import type { Metadata } from "next";
import { ClosingCta } from "@/components/home/closing-cta";
import { Hero } from "@/components/home/hero";
import { Leadership } from "@/components/home/leadership";
import { Scale } from "@/components/home/scale";
import { Sectors } from "@/components/home/sectors";
import { Services } from "@/components/home/services";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <Scale />
      <Services />
      <Sectors />
      <Leadership />
      <ClosingCta />
    </main>
  );
}












// import Link from "next/link";

// const proposedServices = [
//   {
//     number: "01",
//     title: "Integrated facility management",
//     image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
//     alt: "Glass-fronted commercial building",
//   },
//   {
//     number: "02",
//     title: "Supply chain solutions",
//     image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85",
//     alt: "Warehouse shelves and logistics equipment",
//   },
//   {
//     number: "03",
//     title: "Employee transportation",
//     image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=85",
//     alt: "Passenger bus on a road",
//   },
//   {
//     number: "04",
//     title: "Corporate food solutions",
//     image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=1200&q=85",
//     alt: "Prepared meal served on a plate",
//   },
//   {
//     number: "05",
//     title: "Production support",
//     image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85",
//     alt: "Industrial production equipment",
//   },
// ];

// export default function Home() {
//   return (
//     <main id="main-content" className="home-page">
//       <section className="home-hero" aria-labelledby="home-title">
//         <div className="home-hero__image" aria-hidden="true" />
//         <div className="home-hero__shade" aria-hidden="true" />
//         <div className="home-container home-hero__content">
//           <p className="eyebrow eyebrow--light">Supreme Facility Management</p>
//           <h1 id="home-title">Supreme Facility <em>Management</em></h1>
//           <p className="home-hero__note">Company information and service details are being prepared for review.</p>
//           <div className="home-actions">
//             <Link className="button button--light" href="#services">Explore services <span aria-hidden="true">↗</span></Link>
//           <Link className="button button--outline-light" href="#company">About the company</Link>
//           </div>
//         </div>
//         <a className="scroll-cue" href="#company"><span>Discover</span><span className="scroll-cue__line" aria-hidden="true" /></a>
//       </section>

//       <section id="company" className="company-intro" aria-labelledby="company-title">
//         <div className="home-container company-intro__grid">
//           <div>
//             <p className="eyebrow eyebrow--light">Company</p>
//             <h2 id="company-title">Supreme Facility Management</h2>
//           </div>
//           <div className="company-intro__copy">
//             <p>Approved company profile content will be added after stakeholder review.</p>
//             <span className="gold-rule" aria-hidden="true" />
//           </div>
//         </div>
//       </section>

//       <section id="services" className="services-section" aria-labelledby="services-title">
//         <div className="home-container">
//           <div className="section-heading">
//             <div>
//               <p className="eyebrow">Services</p>
//               <h2 id="services-title">Service areas</h2>
//             </div>
//             <p className="section-heading__note">Proposed categories from the draft requirements. Details are pending review by the relevant service owners.</p>
//           </div>

//           <div className="service-grid">
//             {proposedServices.map((service) => (
//               <article className="service-card" key={service.number}>
//                 <div className="service-card__image" role="img" aria-label={service.alt} style={{ backgroundImage: `url("${service.image}")` }} />
//                 <div className="service-card__shade" aria-hidden="true" />
//                 <div className="service-card__content">
//                   <span className="service-card__number">{service.number}</span>
//                   <h3>{service.title}</h3>
//                   <span className="service-card__pending">Details pending approval</span>
//                 </div>
//               </article>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="home-closing" aria-labelledby="closing-title">
//         <div className="home-closing__image" aria-hidden="true" />
//         <div className="home-closing__shade" aria-hidden="true" />
//         <div className="home-container home-closing__content">
//           <p className="eyebrow eyebrow--light">Supreme Facility Management</p>
//           <h2 id="closing-title">Explore the company</h2>
//           <p>Additional pages will be published as approved company information becomes available.</p>
//           <Link className="button button--light" href="#company">About Supreme <span aria-hidden="true">↗</span></Link>
//         </div>
//       </section>
//     </main>
//   );
// }
