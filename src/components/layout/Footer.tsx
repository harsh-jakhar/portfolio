import Link from "next/link";
import { site } from "@/lib/site";
import { isPlaceholder } from "@/lib/utils";

/** Site footer with contact links and a short nav. */
export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-mono text-sm">{site.name}</p>
          <p className="mt-1 text-sm text-muted">{site.location}</p>
        </div>

        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          <li>
            <a href={`mailto:${site.email}`} className="hover:text-fg">
              Email
            </a>
          </li>
          <li>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
              LinkedIn
            </a>
          </li>
          {/* GitHub shows only once the real link is added in src/lib/site.ts */}
          {!isPlaceholder(site.github) && (
            <li>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                GitHub
              </a>
            </li>
          )}
          <li>
            <Link href="/resume" className="hover:text-fg">
              Resume
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
