import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "404 · Page not found",
};

/** Custom 404 with a small LLM joke. Shown for any URL that does not exist. */
export default function NotFound() {
  return (
    <div className="relative isolate overflow-hidden">
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start px-5 py-28 sm:px-8 sm:py-40">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Error 404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
          This page was hallucinated.
        </h1>
        <div className="mt-6 max-w-xl rounded-xl border border-border bg-surface/70 p-4 font-mono text-sm leading-relaxed sm:p-5">
          <p className="text-muted">
            <span className="text-accent">user ›</span> does this page exist?
          </p>
          <p className="mt-2">
            <span className="text-accent">model ›</span> Yes, absolutely. I am highly confident.
          </p>
          <p className="mt-2 text-muted">
            <span className="text-accent">eval ›</span> Factual accuracy: 0/5. Flagged as hallucination.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/notes" variant="secondary">
            Read the notes
          </Button>
        </div>
      </div>
    </div>
  );
}
