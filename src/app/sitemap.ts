import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { getAllNotes } from "@/lib/notes";

/** Generated at build time and served at /sitemap.xml. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/about", "/experience", "/projects", "/notes", "/resume", "/contact"].map(
    (path) => ({
      url: `${site.url}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    }),
  );

  const projectPages = projects.map((p) => ({
    url: `${site.url}/projects/${p.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const notePages = getAllNotes().map((n) => ({
    url: `${site.url}/notes/${n.slug}`,
    lastModified: n.date,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages, ...notePages];
}
