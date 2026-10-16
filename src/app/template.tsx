import { PageTransition } from "@/components/motion/PageTransition";

/**
 * template.tsx re-mounts on every navigation (unlike layout.tsx), which is
 * what lets the page fade in each time you move between pages.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
