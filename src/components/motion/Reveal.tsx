import { cn } from "@/lib/utils";

/**
 * Marks an element to fade and lift into view when it scrolls into the viewport.
 *
 * This is a plain server component: it only renders the element with a `reveal`
 * class and an optional transition delay. A single client component,
 * <RevealObserver /> in the root layout, finds every `.reveal` on the page,
 * hides the ones that are below the fold and reveals them on scroll.
 *
 * Why this split: elements that are visible on first paint are never hidden,
 * so Largest Contentful Paint is not delayed, and there is only one small
 * piece of client JavaScript per page instead of one per element.
 *
 * Usage: <Reveal delay={0.1}>...</Reveal>
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  /** Seconds to wait before the transition starts. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const Tag = as;
  return (
    <Tag className={cn("reveal", className)} style={delay ? { transitionDelay: `${delay}s` } : undefined}>
      {children}
    </Tag>
  );
}
