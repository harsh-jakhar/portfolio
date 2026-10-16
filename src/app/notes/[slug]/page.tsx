import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAllNotes, getNote } from "@/lib/notes";
import { renderMDX } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";

type Props = { params: Promise<{ slug: string }> };

/** Pre-render every note at build time. */
export function generateStaticParams() {
  return getAllNotes().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.summary,
    alternates: { canonical: `/notes/${note.slug}` },
    openGraph: {
      type: "article",
      title: note.title,
      description: note.summary,
      publishedTime: note.date,
      authors: [site.name],
      tags: note.tags,
    },
  };
}

/**
 * Every note listed in generateStaticParams is prerendered to static HTML, so
 * navigating to a known note is instant. For an unknown slug we want a real
 * 404 status, which means reading `params` before any streaming starts.
 * `instant = false` tells Next.js that this blocking behaviour is intended.
 */
export const instant = false;

/** Reading layout for one note. */
export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const content = await renderMDX(note.content);

  return (
    <Container size="narrow">
      <article className="pb-20">
        <div className="pt-10">
          <Link
            href="/notes"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> All notes
          </Link>
        </div>

        <header className="mt-8">
          <p className="font-mono text-xs text-muted">
            <time dateTime={note.date}>{formatDate(note.date)}</time> · {note.readingTime}
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            {note.title}
          </h1>
          {note.summary && <p className="mt-4 text-lg text-muted">{note.summary}</p>}
          {note.tags.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tags">
              {note.tags.map((t) => (
                <li key={t}>
                  <Tag>{t}</Tag>
                </li>
              ))}
            </ul>
          )}
        </header>

        <hr className="my-10 border-border" />

        <div className="prose">{content}</div>

        <footer className="mt-16 rounded-2xl border border-border bg-surface p-6">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Written by</p>
          <p className="mt-2 font-medium">{site.name}</p>
          <p className="text-sm text-muted">{site.title}</p>
        </footer>
      </article>
    </Container>
  );
}
