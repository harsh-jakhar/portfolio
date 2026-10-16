import type { Metadata } from "next";
import { site } from "@/lib/site";
import { education, skills, achievements } from "@/lib/experience";
import { Container } from "@/components/ui/Container";
import { PageHeader, Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Final-year B.Tech CSE student in Gurugram working on LLM evaluation at Ethara AI. Education, interests, skills and achievements.",
  alternates: { canonical: "/about" },
};

/**
 * About page. The story is written in first person and only uses facts from
 * src/lib. To add a personal paragraph, edit the [WRITE HERE] block below.
 */
export default function AboutPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="About"
        title="An AI/LLM engineer in the making."
        intro="A short version of who I am, what I do and what I am trying to get better at."
      />

      {/* Story */}
      <Section className="pt-6">
        <Reveal>
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed">
            <p>
              I&apos;m {site.name}, a final-year B.Tech Computer Science student at GD Goenka
              University, based in {site.location}.
            </p>
            <p>
              Since February 2026 I&apos;ve been working as an LLM Post-Training Intern at Ethara AI.
              Most of my day is spent reading model outputs closely: scoring responses against
              quality rubrics, running side-by-side comparisons, and checking answers for factual
              accuracy, instruction following and reasoning. When something is made up, I flag it.
              I also annotate and clean datasets that go into SFT and RLHF training pipelines, and
              I work with the AI team on response quality and safety guidelines.
            </p>
            <p>
              Before that I built things. A multilingual chatbot that books museum tickets and
              answers visitor questions with an LLM, and a web app that scores job postings for
              signs of fraud so freshers can avoid fake internships. Both taught me that the hard
              part is rarely the model. It is the data you give it and how you check what comes out.
            </p>
            <p className="rounded-xl border border-dashed border-border bg-surface-2 px-4 py-3 text-base text-muted">
              [WRITE HERE: one or two sentences about you outside of work, or leave this out]
            </p>
          </div>
        </Reveal>
      </Section>

      {/* Interests */}
      <Section
        eyebrow="Interests"
        title="What I find interesting about LLMs"
        className="border-t border-border"
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {interests.map((item, i) => (
            <Reveal key={item.title} as="li" delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-surface p-5">
                <h3 className="font-medium">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Education */}
      <Section eyebrow="Education" title="Where I studied" className="border-t border-border">
        <ol className="space-y-4">
          {education.map((e, i) => (
            <Reveal key={e.school} as="li" delay={i * 0.06}>
              <div className="flex flex-col gap-1 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-medium">{e.degree}</h3>
                  <p className="text-sm text-muted">
                    {e.school}
                    {e.detail ? ` · ${e.detail}` : ""}
                  </p>
                </div>
                <p className="font-mono text-xs text-muted">{e.period}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Skills */}
      <Section eyebrow="Skills" title="What I work with" className="border-t border-border">
        <div className="grid gap-6 sm:grid-cols-2">
          {skills.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.06}>
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{group.label}</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {group.items.map((s) => (
                  <li key={s}>
                    <Tag active={group.label === "AI / LLM"}>{s}</Tag>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Achievements */}
      <Section eyebrow="Achievements" title="Recognition" className="border-t border-border">
        <ul className="space-y-3">
          {achievements.map((a) => (
            <Reveal key={a} as="li">
              <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-5">
                <span aria-hidden className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-accent" />
                <p>{a}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>
    </Container>
  );
}

/** Interest cards. Written from the work described in experience and projects. */
const interests = [
  {
    title: "Evaluation that holds up",
    text: "A rubric sounds simple until two people score the same answer differently. I like working out what a fair, repeatable score looks like.",
  },
  {
    title: "Hallucinations",
    text: "Models say wrong things with confidence. I want to understand the patterns behind that and how to catch them before a user does.",
  },
  {
    title: "Data for post-training",
    text: "SFT and RLHF pipelines are only as good as the examples that go in. Cleaning and annotating data is unglamorous and matters a lot.",
  },
  {
    title: "Building with models",
    text: "Chatbots, retrieval over structured information, prompt design. I like shipping something people can actually use.",
  },
];
