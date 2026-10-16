/**
 * Reveals text one word ("token") at a time, like a model streaming its output.
 * Used for the hero headline.
 *
 * Pure CSS (see `.anim-token` in globals.css): the animation starts on first
 * paint and does not wait for JavaScript, so it never delays Largest
 * Contentful Paint. Screen readers get the full string from a visually hidden span.
 */
export function TokenReveal({
  text,
  className,
  delay = 0,
  /** Seconds between tokens. */
  stagger = 0.08,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const tokens = text.split(" ");

  return (
    <span className={className}>
      {/* Full text for screen readers; the animated tokens below are decorative. */}
      <span className="sr-only">{text}</span>
      {tokens.map((token, i) => (
        <span
          key={`${token}-${i}`}
          aria-hidden
          className="anim-token inline-block whitespace-pre"
          style={{ animationDelay: `${delay + i * stagger}s` }}
        >
          {token}
          {i < tokens.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
