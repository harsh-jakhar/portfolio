/**
 * MDX rendering for notes.
 * Uses next-mdx-remote's RSC API so the MDX is compiled on the server at build time.
 *
 * Plugins:
 * - remark-gfm: tables, task lists, strikethrough
 * - rehype-slug + rehype-autolink-headings: heading ids and "#" anchors
 * - rehype-pretty-code (shiki): syntax highlighting with a light and a dark theme
 */
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import { mdxComponents } from "@/components/notes/mdx-components";

const prettyCodeOptions: PrettyCodeOptions = {
  // Both themes are rendered into CSS variables; globals.css picks one per theme.
  theme: { light: "github-light", dark: "github-dark-default" },
  keepBackground: false,
  defaultLang: "plaintext",
};

export async function renderMDX(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "append", properties: { className: ["anchor"], ariaHidden: true, tabIndex: -1 }, content: { type: "text", value: "#" } }],
          [rehypePrettyCode, prettyCodeOptions],
        ],
      },
    },
  });
  return content;
}
