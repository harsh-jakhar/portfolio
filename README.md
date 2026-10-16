# harsh.jakhar — personal site

Personal website of Harsh Kumar Jakhar. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4 and MDX. Deployed on Vercel.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Other scripts:

```bash
npm run build   # production build (also type-checks)
npm run start   # serve the production build
npm run lint    # ESLint
```

## Where things live

| What | File |
| --- | --- |
| Your name, title, intro line, email, links, Formspree ID | `src/lib/site.ts` |
| Projects (cards + detail pages) | `src/lib/projects.ts` |
| Experience, education, skills, achievements | `src/lib/experience.ts` |
| Notes (blog posts) | `content/notes/*.mdx` |
| Theme colours, fonts, prose/code styles | `src/app/globals.css` |
| Pages | `src/app/**/page.tsx` |
| Reusable UI | `src/components/**` |
| Resume PDF | `public/resume.pdf` (you add this) |
| Project screenshots | `public/projects/` (you add these) |

Anything in square brackets like `[ADD LINK]` or `[WRITE HERE]` is a placeholder. The UI hides or softens placeholders so nothing on the live site looks broken, but you should fill them in.

## Add a new note

1. Create a file in `content/notes/`, for example `content/notes/my-new-post.mdx`.
   The file name becomes the URL: `/notes/my-new-post`.
2. Start it with frontmatter:

   ```mdx
   ---
   title: "My new post"
   date: "2026-11-01"
   summary: "One or two lines that show up in the list."
   tags: ["llm-evaluation", "rlhf"]
   draft: false
   ---

   Your content here. Markdown and MDX both work.

   ## A heading

   Some text with `inline code`.

   ```python
   def score(response):
       return 5
   ```
   ```

3. Save. The dev server picks it up on refresh. Nothing else to edit: the list page, sitemap, reading time and the Open Graph image are generated from the file.

Set `draft: true` to hide a post while you write it.

You can also use `<Callout>Text</Callout>` inside a note for a highlighted box (see `src/components/notes/mdx-components.tsx`).

## Add a project

Add an object to the `projects` array in `src/lib/projects.ts`. Set `featured: true` to show it on the home page. Put screenshots in `public/projects/` and list them as `"/projects/my-image.png"`.

## Contact form

The form posts to Formspree. Create a free form at https://formspree.io, copy the ID from the endpoint URL (`https://formspree.io/f/<ID>`), and paste it into `formspreeId` in `src/lib/site.ts`. Until then the form shows a friendly "not connected yet" message with your email.

## Deploy on Vercel

Push to GitHub, then import the repo at https://vercel.com/new. No settings are needed: Vercel detects Next.js and the site URL for metadata is read from Vercel's own environment variables. If you add a custom domain, set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` in the Vercel project's Environment Variables so Open Graph tags and the sitemap use it.
