import { isPlaceholder } from "@/lib/utils";

/**
 * Renders a link if the value is a real URL, or a muted "coming soon" label if
 * it is still a placeholder like "[ADD LINK]". This keeps the site honest:
 * nothing links to a page that does not exist yet.
 */
export function MaybeLink({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  if (isPlaceholder(href)) {
    return (
      <span
        className={className}
        title="Link not added yet"
        aria-label={`${label} (link not added yet)`}
      >
        {label} <span className="text-muted">· soon</span>
      </span>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {label} <span aria-hidden>↗</span>
    </a>
  );
}

/** Dashed box shown where a screenshot will go. */
export function ScreenshotPlaceholder({ label = "Screenshot coming soon" }: { label?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed border-border bg-surface-2 font-mono text-xs text-muted"
    >
      {label}
    </div>
  );
}
