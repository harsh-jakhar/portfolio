import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { Tag } from "@/components/ui/Tag";

/** Card used on /projects and on the home page. Links to the project page. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-[border-color,transform,box-shadow] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-fg/30 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.35)]"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-xs text-muted">
          <span className="text-accent">{project.category}</span> · {project.period}
        </p>
        <ArrowUpRight
          className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
          aria-hidden
        />
      </div>
      <h3 className="mt-3 text-lg font-semibold tracking-tight">{project.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.tagline}</p>
      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
        {project.stack.map((s) => (
          <li key={s}>
            <Tag>{s}</Tag>
          </li>
        ))}
      </ul>
    </Link>
  );
}
