/**
 * Notes (blog) loader.
 *
 * Posts live in /content/notes/*.mdx. Each file has frontmatter like:
 *
 *   ---
 *   title: "What I learned evaluating LLM responses"
 *   date: "2026-10-16"          # YYYY-MM-DD
 *   summary: "One or two lines shown in the list."
 *   tags: ["evaluation", "llm"]
 *   draft: false                # true hides the post everywhere (optional)
 *   ---
 *
 * The file name becomes the URL: my-post.mdx -> /notes/my-post
 *
 * Reading files with `fs` at build time is fine with Next.js Cache Components:
 * the result is predictable, so the pages are prerendered as static HTML.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const NOTES_DIR = path.join(process.cwd(), "content", "notes");

export type NoteMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  draft: boolean;
  /** Human-readable, e.g. "4 min read". */
  readingTime: string;
};

export type Note = NoteMeta & {
  /** Raw MDX body (without frontmatter). */
  content: string;
};

function readNoteFile(fileName: string): Note {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(NOTES_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? "1970-01-01"),
    summary: String(data.summary ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: Boolean(data.draft),
    readingTime: readingTime(content).text,
    content,
  };
}

/** All published notes, newest first. */
export function getAllNotes(): Note[] {
  if (!fs.existsSync(NOTES_DIR)) return [];
  return fs
    .readdirSync(NOTES_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(readNoteFile)
    .filter((n) => !n.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNote(slug: string): Note | undefined {
  return getAllNotes().find((n) => n.slug === slug);
}

/** Every tag used across published notes, sorted. */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const n of getAllNotes()) n.tags.forEach((t) => tags.add(t));
  return [...tags].sort();
}
