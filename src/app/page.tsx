import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/lib/projects";
import { getAllNotes } from "@/lib/notes";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Hero } from "@/components/home/Hero";
import { NowStrip } from "@/components/home/NowStrip";
import { ContactCta } from "@/components/home/ContactCta";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { NoteCard } from "@/components/notes/NoteCard";
import { Reveal } from "@/components/motion/Reveal";

/** Home page: hero, "now" strip, featured projects, latest notes, contact CTA. */
export default function HomePage() {
  const featured = getFeaturedProjects();
  const latestNotes = getAllNotes().slice(0, 3);

  return (
    <>
      <Hero />
      <NowStrip />

      <Container>
        <Section
          eyebrow="Selected work"
          title="Featured projects"
          intro="Two projects that show how I use language models and build web apps."
        >
          <ul className="grid gap-5 sm:grid-cols-2">
            {featured.map((p, i) => (
              <Reveal key={p.slug} as="li" delay={i * 0.08}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </ul>
          <SeeAll href="/projects" label="All projects" />
        </Section>

        <Section
          eyebrow="Learning log"
          title="Latest notes"
          intro="Short write-ups on what I learn while evaluating and working with LLMs."
          className="border-t border-border"
        >
          <div className="divide-y divide-border">
            {latestNotes.map((n, i) => (
              <Reveal key={n.slug} delay={i * 0.06}>
                <NoteCard note={n} />
              </Reveal>
            ))}
          </div>
          <SeeAll href="/notes" label="All notes" />
        </Section>

        <ContactCta />
      </Container>
    </>
  );
}

function SeeAll({ href, label }: { href: string; label: string }) {
  return (
    <div className="mt-8">
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-accent"
      >
        {label} <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}
