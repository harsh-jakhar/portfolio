import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

/** Closing call-to-action on the home page. */
export function ContactCta() {
  return (
    <section className="py-14 sm:py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-8 sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/15 blur-3xl"
          />
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Contact</p>
          <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
            Hiring for an entry-level Software Developer or AI/LLM Engineer role?
          </h2>
          <p className="mt-3 max-w-xl text-muted">
            I would like to hear about it. Email me or send a message through the contact form.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/contact">
              Get in touch <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button href={`mailto:${site.email}`} variant="secondary" external>
              {site.email}
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
