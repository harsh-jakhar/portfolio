import type { Metadata } from "next";
import { experience } from "@/lib/experience";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Experience",
  description: "LLM Post-Training Intern at Ethara AI and Data & Finance Coordinator at Avishkar, GD Goenka University.",
  alternates: { canonical: "/experience" },
};

/** Timeline of work and leadership roles. Data lives in src/lib/experience.ts. */
export default function ExperiencePage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Experience"
        title="Where I have worked."
        intro="An internship on LLM post-training and a leadership role at my university."
      />

      <ol className="relative mt-10 mb-20 border-l border-border pl-8 sm:pl-12">
        {experience.map((item, i) => (
          <Reveal key={`${item.org}-${item.role}`} as="li" delay={i * 0.08} className="relative pb-12 last:pb-0">
            {/* Dot on the timeline */}
            <span
              aria-hidden
              className="absolute -left-[2.3rem] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-border bg-bg sm:-left-[3.3rem]"
            >
              <span className="h-2 w-2 rounded-full bg-accent" />
            </span>

            <p className="font-mono text-xs text-muted">
              <span className="text-accent">{item.kind === "work" ? "Internship" : "Leadership"}</span> ·{" "}
              {item.period}
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">{item.role}</h2>
            <p className="mt-0.5 text-muted">{item.org}</p>

            <ul className="mt-4 space-y-2.5">
              {item.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-[0.95rem] leading-relaxed">
                  <span aria-hidden className="mt-2.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-border" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </Container>
  );
}
