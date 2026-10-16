import type { Metadata } from "next";
import { Download } from "lucide-react";
import { site } from "@/lib/site";
import { experience, education, skills, achievements } from "@/lib/experience";
import { projects } from "@/lib/projects";
import { isPlaceholder } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Harsh Kumar Jakhar: LLM Post-Training Intern at Ethara AI, B.Tech CSE at GD Goenka University.",
  alternates: { canonical: "/resume" },
};

/**
 * Web version of the resume, built from the same data as the rest of the site.
 * The download button points to /public/resume.pdf. Put your PDF there.
 */
export default function ResumePage() {
  return (
    <Container>
      <div className="flex flex-col gap-6 pt-14 sm:flex-row sm:items-end sm:justify-between sm:pt-20">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Resume</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">{site.name}</h1>
          <p className="mt-2 text-lg text-muted">{site.title}</p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
            <li>{site.location}</li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-fg">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                LinkedIn
              </a>
            </li>
            {!isPlaceholder(site.github) && (
              <li>
                <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                  GitHub
                </a>
              </li>
            )}
          </ul>
        </div>
        <Button href={site.resumePdf} download size="lg" className="shrink-0">
          <Download className="h-4 w-4" aria-hidden /> Download PDF
        </Button>
      </div>

      <div className="mt-14 mb-20 space-y-14">
        <ResumeSection title="Experience">
          {experience.map((item) => (
            <Entry
              key={item.role}
              heading={item.role}
              sub={item.org}
              right={item.period}
              bullets={item.bullets}
            />
          ))}
        </ResumeSection>

        <ResumeSection title="Education">
          {education.map((e) => (
            <Entry
              key={e.school}
              heading={e.degree}
              sub={`${e.school}${e.detail ? ` · ${e.detail}` : ""}`}
              right={e.period}
            />
          ))}
        </ResumeSection>

        <ResumeSection title="Projects">
          {projects.map((p) => (
            <Entry
              key={p.slug}
              heading={p.title}
              sub={p.stack.join(", ")}
              right={p.period}
              bullets={[p.tagline]}
              href={`/projects/${p.slug}`}
            />
          ))}
        </ResumeSection>

        <ResumeSection title="Skills">
          <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-[10rem_1fr]">
            {skills.map((g) => (
              <div key={g.label} className="contents">
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted sm:pt-0.5">{g.label}</dt>
                <dd className="text-[0.95rem]">{g.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </ResumeSection>

        <ResumeSection title="Achievements">
          <ul className="space-y-2">
            {achievements.map((a) => (
              <li key={a} className="flex gap-3">
                <span aria-hidden className="mt-2.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </ResumeSection>
      </div>
    </Container>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal as="section">
      <div className="grid gap-4 border-t border-border pt-8 sm:grid-cols-[10rem_1fr] sm:gap-8">
        <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{title}</h2>
        <div className="space-y-8">{children}</div>
      </div>
    </Reveal>
  );
}

function Entry({
  heading,
  sub,
  right,
  bullets,
  href,
}: {
  heading: string;
  sub: string;
  right: string;
  bullets?: string[];
  href?: string;
}) {
  return (
    <div>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="font-medium">
          {href ? (
            <a href={href} className="hover:text-accent">
              {heading}
            </a>
          ) : (
            heading
          )}
        </h3>
        <p className="font-mono text-xs text-muted">{right}</p>
      </div>
      <p className="text-sm text-muted">{sub}</p>
      {bullets && (
        <ul className="mt-3 space-y-2">
          {bullets.map((b) => (
            <li key={b} className="flex gap-3 text-[0.95rem] leading-relaxed">
              <span aria-hidden className="mt-2.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-border" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
