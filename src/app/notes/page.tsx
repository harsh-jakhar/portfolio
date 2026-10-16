import type { Metadata } from "next";
import { getAllNotes, getAllTags } from "@/lib/notes";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { NoteCard } from "@/components/notes/NoteCard";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Notes",
  description: "A learning log on evaluating LLMs: rubrics, side-by-side comparisons, hallucinations and training data.",
  alternates: { canonical: "/notes" },
};

/** Notes list. Add a post by dropping a .mdx file into /content/notes. */
export default function NotesPage() {
  const notes = getAllNotes();
  const tags = getAllTags();

  return (
    <Container>
      <PageHeader
        eyebrow="Notes"
        title="AI/LLM learning log."
        intro="Short, honest write-ups on what I learn while evaluating and working with language models."
      />

      {tags.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="All tags">
          {tags.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 mb-20 divide-y divide-border">
        {notes.map((n, i) => (
          <Reveal key={n.slug} delay={i * 0.05}>
            <NoteCard note={n} />
          </Reveal>
        ))}
        {notes.length === 0 && <p className="py-10 text-muted">No notes yet.</p>}
      </div>
    </Container>
  );
}
