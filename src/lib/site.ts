/**
 * Single source of truth for personal details and site-wide settings.
 * Edit this file to change your name, links, intro line, etc.
 *
 * Anything wrapped in square brackets like "[ADD ...]" is a placeholder.
 * The UI detects placeholders (see isPlaceholder in utils.ts) and renders
 * them as "coming soon" instead of broken links.
 */

/**
 * Public URL of the site. Used for Open Graph tags, the sitemap and robots.txt.
 * - On Vercel this is filled automatically from VERCEL_PROJECT_PRODUCTION_URL.
 * - You can override it by setting NEXT_PUBLIC_SITE_URL in Vercel's env settings
 *   (for example when you add a custom domain).
 * - Locally it falls back to http://localhost:3000.
 */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const site = {
  name: "Harsh Kumar Jakhar",
  firstName: "Harsh",
  title: "Software Developer | LLM Evaluation & Generative AI",
  /** One-line intro shown in the hero and in page metadata. */
  intro:
    "Final-year CSE student. I score and compare LLM responses at Ethara AI, and I build things with language models.",
  location: "Gurugram, Haryana, India",
  email: "jakharharsh08@gmail.com",
  linkedin: "https://www.linkedin.com/in/contactharshjakhar",
  github: "[ADD YOUR GITHUB LINK]",
  url: resolveSiteUrl(),

  /**
   * Formspree form ID for the contact form.
   * 1. Create a free form at https://formspree.io
   * 2. Copy the ID from the endpoint (https://formspree.io/f/ID)
   * 3. Paste it here.
   */
  formspreeId: "YOUR_FORM_ID",

  /** Path to the PDF resume inside /public. Put your file at public/resume.pdf. */
  resumePdf: "/resume.pdf",

  /** Main navigation. Order matters. */
  nav: [
    { href: "/about", label: "About" },
    { href: "/experience", label: "Experience" },
    { href: "/projects", label: "Projects" },
    { href: "/notes", label: "Notes" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

/** Short list shown in the "what I'm working on now" strip on the home page. */
export const nowItems = [
  {
    label: "Interning",
    text: "LLM Post-Training Intern at Ethara AI: scoring responses, running SxS comparisons, flagging hallucinations.",
  },
  {
    label: "Studying",
    text: "Final year of B.Tech CSE at GD Goenka University.",
  },
  {
    label: "Writing",
    text: "A learning log on how I evaluate language models. See Notes.",
  },
] as const;
