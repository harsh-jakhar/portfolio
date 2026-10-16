"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Contact form powered by Formspree (free tier).
 * Set your form ID in src/lib/site.ts -> formspreeId.
 * Until then, submitting shows a helpful error instead of silently failing.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const notConfigured = site.formspreeId === "YOUR_FORM_ID";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (notConfigured) {
      setStatus("error");
      setError("The contact form is not connected yet. Email me instead.");
      return;
    }

    setStatus("sending");
    setError(null);
    const form = e.currentTarget;

    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please email me directly.");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg placeholder:text-muted/70 focus:border-accent focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
      {/* Honeypot field: bots fill it, humans never see it. Formspree ignores submissions with it set. */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block font-mono text-xs text-muted">
            Name
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block font-mono text-xs text-muted">
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block font-mono text-xs text-muted">
          Message
        </label>
        <textarea id="message" name="message" required rows={6} className={inputClass} />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
          <Send className="h-4 w-4" aria-hidden />
        </Button>

        {/* Status messages are announced to screen readers via role="status". */}
        <p role="status" className="text-sm">
          {status === "sent" && <span className="text-accent">Thanks, your message was sent.</span>}
          {status === "error" && (
            <span className="text-muted">
              {error}{" "}
              <a href={`mailto:${site.email}`} className="underline hover:text-fg">
                {site.email}
              </a>
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
