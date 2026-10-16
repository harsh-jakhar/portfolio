import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { projects, getProject } from "@/lib/projects";
import { isPlaceholder } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { MaybeLink, ScreenshotPlaceholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/motion/Reveal";

type Props = { params: Promise<{ slug: string }> };

/** Pre-render one page per project at build time. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: project.title, description: project.tagline },
  };
}

/**
 * Every project listed in generateStaticParams is prerendered to static HTML,
 * so navigating to a known project is instant. For an unknown slug we want a
 * real 404 status, which means reading `params` before any streaming starts.
 * `instant = false` tells Next.js that this blocking behaviour is intended.
 */
export const instant = false;

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const realScreens = project.screenshots.filter((s) => !isPlaceholder(s));
  const realLearned = project.learned.filter((s) => !isPlaceholder(s));

  return (
    <Container>
      <article className="pb-20">
        <div className="pt-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> All projects
          </Link>
        </div>

        <header className="mt-8 max-w-3xl">
          <p className="font-mono text-xs text-muted">
            <span className="text-accent">{project.category}</span> · {project.period}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">{project.title}</h1>
          <p className="mt-4 text-lg text-muted">{project.tagline}</p>

          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tech stack">
            {project.stack.map((s) => (
              <li key={s}>
                <Tag active>{s}</Tag>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
            <MaybeLink href={project.links.github} label="Source code" className="text-fg hover:text-accent" />
            <MaybeLink href={project.links.demo} label="Live demo" className="text-fg hover:text-accent" />
          </div>
        </header>

        {/* Screenshots */}
        <Reveal className="mt-12">
          {realScreens.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {realScreens.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  width={1280}
                  height={720}
                  className="rounded-xl border border-border"
                  priority={i === 0}
                />
              ))}
            </div>
          ) : (
            <ScreenshotPlaceholder />
          )}
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_16rem]">
          <div className="max-w-2xl space-y-12">
            <Block title="The problem">
              <p className="leading-relaxed">{project.problem}</p>
            </Block>

            <Block title="What I built">
              <ul className="space-y-3">
                {project.built.map((b) => (
                  <li key={b} className="flex gap-3 leading-relaxed">
                    <span aria-hidden className="mt-2.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="What I learned">
              {realLearned.length > 0 ? (
                <ul className="space-y-3">
                  {realLearned.map((l) => (
                    <li key={l} className="flex gap-3 leading-relaxed">
                      <span aria-hidden className="mt-2.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">Still writing this part.</p>
              )}
            </Block>
          </div>

          {/* Side column */}
          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            <div>
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Tech stack</h2>
              <ul className="mt-3 space-y-1.5 text-sm">
                {project.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Timeline</h2>
              <p className="mt-3 text-sm">{project.period}</p>
            </div>
            <div>
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Links</h2>
              <ul className="mt-3 space-y-1.5 text-sm">
                <li>
                  <MaybeLink href={project.links.github} label="GitHub" className="hover:text-accent" />
                </li>
                <li>
                  <MaybeLink href={project.links.demo} label="Demo" className="hover:text-accent" />
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </article>
    </Container>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal as="section">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </Reveal>
  );
}
