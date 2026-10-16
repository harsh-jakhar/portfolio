/** Small helpers used across the site. */

/** Join class names, skipping falsy values. Tiny stand-in for clsx. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Placeholders look like "[ADD LINK]" or "[WRITE HERE]".
 * The UI uses this to avoid rendering broken links or fake content.
 */
export function isPlaceholder(value: string | undefined | null): boolean {
  if (!value) return true;
  const v = value.trim();
  return v.startsWith("[") && v.endsWith("]");
}

/** Format an ISO date (YYYY-MM-DD) as "16 Oct 2026". Deterministic, so safe to prerender. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${d} ${months[(m ?? 1) - 1]} ${y}`;
}
