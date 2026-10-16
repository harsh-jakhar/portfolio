import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "@/components/ui/BrandIcons";
import { site } from "@/lib/site";
import { isPlaceholder } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Harsh Kumar Jakhar about Software Developer and AI/LLM Engineer roles.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const channels = [
    { label: "Email", value: site.email, href: `mailto:${site.email}`, Icon: Mail },
    { label: "LinkedIn", value: "contactharshjakhar", href: site.linkedin, Icon: LinkedInIcon },
    { label: "GitHub", value: isPlaceholder(site.github) ? "coming soon" : site.github.replace(/^https?:\/\//, ""), href: site.github, Icon: GitHubIcon },
  ];

  return (
    <Container>
      <PageHeader
        eyebrow="Contact"
        title="Say hello."
        intro="For roles, collaborations or questions about anything on this site. I reply to every real message."
      />

      <div className="mt-8 mb-20 grid gap-10 lg:grid-cols-[18rem_1fr]">
        <Reveal>
          <ul className="space-y-3">
            {channels.map(({ label, value, href, Icon }) => {
              const placeholder = isPlaceholder(href);
              const inner = (
                <>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface-2 text-muted">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-xs text-muted">{label}</span>
                    <span className="block truncate text-sm">{value}</span>
                  </span>
                </>
              );
              return (
                <li key={label}>
                  {placeholder ? (
                    <div className="flex items-center gap-3 rounded-2xl border border-dashed border-border p-3 opacity-80">
                      {inner}
                    </div>
                  ) : (
                    <a
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3 transition-colors hover:border-fg/30"
                    >
                      {inner}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-sm text-muted">{site.location}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <h2 className="text-lg font-semibold tracking-tight">Send a message</h2>
            <p className="mt-1 mb-6 text-sm text-muted">This form goes straight to my inbox.</p>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </Container>
  );
}
