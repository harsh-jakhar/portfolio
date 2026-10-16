import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { TokenReveal } from "@/components/motion/TokenReveal";

/**
 * Home page hero.
 * - Faint drifting grid in the background (see .hero-grid in globals.css).
 * - Name revealed one token at a time.
 * - A short chat-style line that reads like a model answering "who is harsh?".
 *
 * All entrance animations are CSS, staggered with inline animation delays.
 * The headline and intro box never change opacity (transform/blur only), so
 * they are painted immediately and count towards a fast LCP.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background grid, purely decorative */}
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 -z-10" />
      {/* Soft accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-160 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
      />

      <div className="mx-auto w-full max-w-5xl px-5 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-28">
        <p className="anim-fade-up font-mono text-xs uppercase tracking-[0.18em] text-accent">
          {site.title}
        </p>

        <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          <TokenReveal text={site.name} delay={0.05} stagger={0.1} />
        </h1>

        {/* Chat-style intro */}
        <div className="anim-rise mt-8 max-w-2xl" style={{ animationDelay: "0.15s" }}>
          <div className="rounded-xl border border-border bg-surface/70 p-4 font-mono text-sm leading-relaxed sm:p-5">
            <p className="text-muted">
              <span className="text-accent">user ›</span> who is {site.firstName.toLowerCase()}?
            </p>
            <p className="mt-2">
              <span className="text-accent">harsh ›</span> {site.intro}
              <span aria-hidden className="cursor-blink ml-0.5 inline-block w-[0.55em] text-accent">
                ▍
              </span>
            </p>
          </div>
        </div>

        <div className="anim-fade-up mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.35s" }}>
          {/* Slightly smaller on phones so all three fit on one line. */}
          <Button href="/projects" className="h-11 px-5 sm:h-12 sm:px-6 sm:text-base">
            Projects <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          <Button href="/resume" variant="secondary" className="h-11 px-5 sm:h-12 sm:px-6 sm:text-base">
            Resume
          </Button>
          <Button href="/contact" variant="ghost" className="h-11 px-4 sm:h-12 sm:px-6 sm:text-base">
            Contact
          </Button>
        </div>

        <div
          className="anim-fade-up mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted"
          style={{ animationDelay: "0.45s" }}
        >
          <span>{site.location}</span>
          <span className="hidden h-1 w-1 rounded-full bg-border sm:inline-block" />
          <span>B.Tech CSE · GD Goenka University · 2022–2026</span>
        </div>
      </div>
    </section>
  );
}
