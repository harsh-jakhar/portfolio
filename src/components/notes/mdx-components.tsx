import Link from "next/link";
import type { MDXComponents } from "mdx/types";

/**
 * Components available inside every .mdx note.
 * - Standard tags (a, img) are improved here.
 * - <Callout> can be used directly in MDX:  <Callout>Something worth noting.</Callout>
 */

function MdxLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href ?? "";
  // Internal links use Next's <Link> for client-side navigation.
  if (href.startsWith("/")) {
    return <Link href={href} {...props} />;
  }
  // Heading anchors (from rehype-autolink-headings) stay plain.
  if (href.startsWith("#")) {
    return <a {...props} />;
  }
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <aside className="my-6 rounded-xl border border-accent/40 bg-accent-soft px-4 py-3 text-[0.95em]">
      {children}
    </aside>
  );
}

export const mdxComponents: MDXComponents = {
  a: MdxLink,
  Callout,
};
