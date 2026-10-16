import { cn } from "@/lib/utils";

/**
 * A page section with an optional small mono label ("eyebrow"), a heading and
 * an intro line. Used for consistent spacing on every page.
 */
export function Section({
  eyebrow,
  title,
  intro,
  children,
  className,
  id,
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-14 sm:py-20", className)}>
      {(eyebrow || title || intro) && (
        <header className="mb-8 sm:mb-10">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {title && (
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
          )}
          {intro && <p className="mt-3 max-w-2xl text-muted">{intro}</p>}
        </header>
      )}
      {children}
    </section>
  );
}

/** Small uppercase mono label, e.g. "01 / Projects". */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-xs uppercase tracking-[0.18em] text-accent", className)}>
      {children}
    </p>
  );
}

/** Page-level title block used at the top of every inner page. */
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="pt-14 pb-4 sm:pt-20">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
      {intro && <p className="mt-4 max-w-2xl text-lg text-muted">{intro}</p>}
    </header>
  );
}
