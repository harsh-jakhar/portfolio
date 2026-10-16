import Link from "next/link";
import type { NoteMeta } from "@/lib/notes";
import { formatDate } from "@/lib/utils";
import { Tag } from "@/components/ui/Tag";

/** One row in the notes list. */
export function NoteCard({ note }: { note: NoteMeta }) {
  return (
    <Link
      href={`/notes/${note.slug}`}
      className="group block rounded-2xl border border-transparent p-5 -mx-5 transition-colors hover:border-border hover:bg-surface sm:p-6 sm:-mx-6"
    >
      <p className="font-mono text-xs text-muted">
        <time dateTime={note.date}>{formatDate(note.date)}</time> · {note.readingTime}
      </p>
      <h3 className="mt-2 text-lg font-semibold tracking-tight group-hover:text-accent">
        {note.title}
      </h3>
      {note.summary && <p className="mt-1.5 text-sm leading-relaxed text-muted">{note.summary}</p>}
      {note.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
          {note.tags.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
      )}
    </Link>
  );
}
