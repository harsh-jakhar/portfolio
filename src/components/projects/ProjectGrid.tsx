"use client";

import { useState } from "react";
import { projectCategories, type Project, type ProjectCategory } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "@/components/motion/Reveal";

type Filter = "All" | ProjectCategory;

/**
 * Project grid with category filter buttons.
 * Filtering happens in the browser, so the page stays fully static.
 */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const filters: Filter[] = ["All", ...projectCategories];
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              "rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors",
              filter === f
                ? "border-accent bg-accent text-accent-fg"
                : "border-border bg-surface text-muted hover:text-fg",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2">
        {visible.map((p, i) => (
          <Reveal key={p.slug} as="li" delay={i * 0.06}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </ul>

      {visible.length === 0 && (
        <p className="mt-8 text-sm text-muted">No projects in this category yet.</p>
      )}
    </div>
  );
}
