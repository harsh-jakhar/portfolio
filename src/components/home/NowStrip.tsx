import { nowItems } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";

/** "What I'm working on now" strip under the hero. Edit items in src/lib/site.ts. */
export function NowStrip() {
  return (
    <section aria-labelledby="now-heading" className="border-y border-border bg-surface/50">
      <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8">
        <h2 id="now-heading" className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-accent align-middle" aria-hidden />
          Now
        </h2>
        <ul className="mt-4 grid gap-5 sm:grid-cols-3">
          {nowItems.map((item, i) => (
            <Reveal key={item.label} as="li" delay={i * 0.08}>
              <p className="font-mono text-xs text-accent">{item.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-fg/90">{item.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
