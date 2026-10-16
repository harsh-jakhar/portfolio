import { cn } from "@/lib/utils";

/** Small mono label used for tech stacks and note tags. */
export function Tag({
  children,
  className,
  active = false,
}: {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[11px] leading-5 tracking-wide",
        active
          ? "border-accent/50 bg-accent-soft text-accent"
          : "border-border bg-surface-2 text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
