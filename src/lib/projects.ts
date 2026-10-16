/**
 * Project data. Each entry becomes a card on /projects and a page at /projects/<slug>.
 * To add a project, add an object to the array below. Nothing else is needed.
 *
 * Placeholders ("[ADD ...]") render as "coming soon" in the UI, so the site
 * never shows a broken link or invented content.
 */

export type ProjectCategory = "AI/LLM" | "Web";

export type Project = {
  slug: string;
  title: string;
  period: string;
  /** One sentence shown on the card. */
  tagline: string;
  category: ProjectCategory;
  /** Short tech labels shown as tags. */
  stack: string[];
  /** Whether to show on the home page. */
  featured: boolean;
  /** Detail page sections. */
  problem: string;
  built: string[];
  learned: string[];
  /** Image paths under /public, e.g. "/projects/museum-1.png". */
  screenshots: string[];
  links: {
    github: string;
    demo: string;
  };
};

export const projects: Project[] = [
  {
    slug: "museum-ticket-booking-chatbot",
    title: "Museum Ticket Booking Chatbot",
    period: "Jan 2026 – Apr 2026",
    tagline:
      "Multilingual chatbot and web interface for booking museum tickets, with an LLM that answers visitor questions.",
    category: "AI/LLM",
    stack: ["Python", "Botpress", "LLM"],
    featured: true,
    problem:
      "Museum visitors, both domestic and international, need to book tickets and get answers about their visit. The information lives on official heritage websites and is not always easy to find or available in the visitor's language.",
    built: [
      "A multilingual chatbot built with Botpress, with a web interface for booking museum tickets.",
      "An LLM-backed flow that answers visitor questions.",
      "A structured knowledge source for the LLM, which I put together from information on official heritage websites.",
      "Support for both domestic and international tourists.",
    ],
    learned: [
      "[WRITE HERE: what you learned about grounding LLM answers in structured data]",
      "[WRITE HERE: what you learned about handling multiple languages]",
      "[WRITE HERE: anything you would do differently]",
    ],
    screenshots: ["[ADD SCREENSHOT]"],
    links: {
      github: "[ADD LINK]",
      demo: "[ADD LINK]",
    },
  },
  {
    slug: "job-scam-fake-internship-detector",
    title: "Job Scam & Fake Internship Detector",
    period: "Jan 2025 – Mar 2025",
    tagline:
      "Web app that checks job postings for fraud signs and gives an NLP-based risk score, built to help freshers avoid fake internships.",
    category: "Web",
    stack: ["React.js", "Node.js", "NLP", "REST APIs"],
    featured: true,
    problem:
      "Freshers looking for internships run into fake postings. It is hard to tell a real offer from a scam by reading the text alone.",
    built: [
      "A React.js front end where a user submits a job posting and gets a risk score back.",
      "A Node.js back end that exposes the checks through REST APIs.",
      "NLP-based risk scoring that looks for fraud signs in the posting text.",
    ],
    learned: [
      "[WRITE HERE: what you learned about building the NLP scoring]",
      "[WRITE HERE: what you learned about designing the REST API]",
      "[WRITE HERE: anything you would do differently]",
    ],
    screenshots: ["[ADD SCREENSHOT]"],
    links: {
      github: "[ADD LINK]",
      demo: "[ADD LINK]",
    },
  },
];

export const projectCategories: ProjectCategory[] = ["AI/LLM", "Web"];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
