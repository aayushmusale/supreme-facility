/**
 * Resources content: blog index and employee engagement cards.
 * SOURCE: https://supremefacility.com/blogs/ and /employee-engagement/ (checked 26 Oct 2026).
 *
 * The live blogs section has 6 pages of posts; only page 1 (the 10 most recent) is listed here.
 * Full article bodies are NOT reproduced — each card links to the original post on the current site,
 * since the CMS decision (where blog content will actually live and be edited) is still pending.
 */

const wp = "https://supremefacility.com/wp-content/uploads";

export type BlogPost = { title: string; href: string; date: string; image: string };

export const blogPosts: BlogPost[] = [
  { title: "A Moment of Pride for the Supreme Family", href: "https://supremefacility.com/a-moment-of-pride-for-the-supreme-family/", date: "2 December 2025", image: `${wp}/2025/12/amol-shingate-720x544.jpg` },
  { title: "The Unseen Impact of Soft Services on Workplace Experience", href: "https://supremefacility.com/the-unseen-impact-of-soft-services-on-workplace-experience/", date: "13 October 2025", image: `${wp}/2025/10/The-Unseen-Impact-of-Soft-Services-on-Workplace-Experience-720x544.jpg` },
  { title: "The Importance of Landscaping in Facility Management", href: "https://supremefacility.com/the-importance-of-landscaping-in-facility-management/", date: "13 October 2025", image: `${wp}/2025/10/The-Importance-of-Landscaping-in-Facility-Management-720x544.jpg` },
  { title: "How Soft Services Define the Guest Experience in Modern Hospitality", href: "https://supremefacility.com/how-soft-services-define-the-guest-experience-in-modern-hospitality/", date: "12 September 2025", image: `${wp}/2025/09/softonic-720x544.jpg` },
  { title: "The Human Touch in Hospitality: Why Trained Professionals Matter", href: "https://supremefacility.com/the-human-touch-in-hospitality-why-trained-professionals-matter/", date: "1 September 2025", image: `${wp}/2025/09/blog-supreme1-720x544.jpg` },
  { title: "Sustainable Facility Management in Manufacturing: How Supreme Drives Eco-Friendly Operations", href: "https://supremefacility.com/sustainable-facility-management-in-manufacturing-how-supreme-drives-eco-friendly-operations/", date: "29 August 2025", image: `${wp}/2025/08/Blog-img-720x544.jpg` },
  { title: "The Future of Technology in Facility Management in Manufacturing Industry", href: "https://supremefacility.com/the-future-of-technology-in-facility-management-in-manufacturing-industry/", date: "25 August 2025", image: `${wp}/2025/08/Supremeblogimage-720x544.jpg` },
  { title: "Why On-Demand Facility Services Are Non-Negotiable in a Crisis", href: "https://supremefacility.com/why-on-demand-facility-services-are-non-negotiable-in-a-crisis/", date: "23 August 2025", image: `${wp}/2025/08/blog-image-720x544.jpg` },
  { title: "Monsoon-Proofing Commercial Spaces: Why Deep Cleaning & Disinfection Matter More Than Ever", href: "https://supremefacility.com/monsoon-proofing-commercial-spaces/", date: "20 August 2025", image: `${wp}/2025/08/Naya6-720x544.jpg` },
  { title: "The Role of Preventive Maintenance in Avoiding Costly Downtime", href: "https://supremefacility.com/the-role-of-preventive-maintenance-in-avoiding-costly-downtime/", date: "11 August 2025", image: `${wp}/2025/08/2-720x544.png` },
];

export type EngagementPost = { title: string; tag: string; href: string; image: string; summary: string; hasVideo?: boolean };

export const engagementPosts: EngagementPost[] = [
  {
    title: "Monthly Birthday Celebration",
    tag: "Celebration",
    href: "https://www.linkedin.com/posts/supremefacilitymanagementltd_celebration-activity-7512080810309668865-6jj8",
    image: `${wp}/2026/10/employee-engagement-monthly-birthday-celebration.jpg`,
    summary: "Supreme Facility Management's monthly birthday celebration was a moment to come together, share smiles and wish our team members another year filled with happiness and growth.",
  },
  {
    title: "Clean India, Green India Poster Competition",
    tag: "CSR",
    href: "https://www.linkedin.com/posts/supremefacilitymanagementltd_cleanindiagreenindia-myvoicemyindia-youngindia-activity-7510661818533687296-wdar",
    image: `${wp}/2026/10/employee-engagement-clean-india-green-india-poster-competition.jpg`,
    summary: "Through the \u201cClean India, Green India\u201d poster-making competition, children brought their ideas, imagination and hopes for the country to life through art.",
    hasVideo: true,
  },
  {
    title: "Recognition & Rewards",
    tag: "Recognition",
    href: "https://www.linkedin.com/posts/supremefacilitymanagementltd_recognition-and-rewards-activity-7507674601527881730-IH8v",
    image: `${wp}/2026/10/employee-engagement-recognition-rewards.jpg`,
    summary: "At Supreme Facility Management, every contribution matters. Through appreciation and recognition, we celebrate the dedication and outstanding work of our team.",
  },
  {
    title: "Ganesh Chaturthi Celebrations",
    tag: "Festival",
    href: "https://www.linkedin.com/posts/supremefacilitymanagementltd_lvshindegroup-ganeshchaturthi-ganpatibappamorya-activity-7506585786729852928-Xi7r",
    image: `${wp}/2026/10/employee-engagement-ganesh-chaturthi-celebrations.jpg`,
    summary: "This Ganesh Chaturthi, our teams at L. V. Shinde Group came together to create, collaborate and celebrate Bappa in their own unique way.",
    hasVideo: true,
  },
  {
    title: "Team Building: Workmates Turned Adventure Mates",
    tag: "Team Building",
    href: "https://www.linkedin.com/posts/supremefacilitymanagementltd_supremefacilitymanagement-teambuilding-activity-7497192021057576960-zLmT",
    image: `${wp}/2026/10/employee-engagement-team-building-workmates-turned-adventure-mates.jpg`,
    summary: "Team building is more than an activity. It's about creating opportunities for bonding, collaboration and stronger connections.",
    hasVideo: true,
  },
  {
    title: "5 Years of Safety Excellence",
    tag: "Safety",
    href: "https://www.linkedin.com/posts/supremefacilitymanagementltd_safety-excellence-activity-7492456425231929344-DD3x",
    image: `${wp}/2026/10/employee-engagement-5-years-of-safety-excellence.jpg`,
    summary: "A proud milestone for the Supreme Facility Management team, recognised for its consistent commitment to safe operations and a Zero Harm Culture.",
  },
  {
    title: "Building Skills Through Continuous Learning",
    tag: "Training",
    href: "https://www.linkedin.com/posts/supremefacilitymanagementltd_team-development-activity-7491374812561604608-YhnC",
    image: `${wp}/2026/10/employee-engagement-building-skills-through-continuous-learning.jpg`,
    summary: "Regular training sessions help our teams sharpen professional practices, strengthen safety awareness and improve day-to-day workplace skills.",
  },
];

export const linkedinFollowUrl = "https://www.linkedin.com/company/supremefacilitymanagementltd/";
