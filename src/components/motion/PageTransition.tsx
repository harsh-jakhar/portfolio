/**
 * Soft fade-in on every route change.
 * Used from src/app/template.tsx, which re-mounts on navigation, so the CSS
 * animation (`.anim-page-in` in globals.css) replays each time a page loads.
 * No JavaScript involved, so it costs nothing on page load.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return <div className="anim-page-in">{children}</div>;
}
