"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Sticky top navigation.
 * - Desktop: inline links + theme toggle.
 * - Mobile: hamburger button that opens a full-width panel.
 * The active link is marked with aria-current for accessibility.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    // No backdrop-blur on purpose: blurring over the animated hero grid would
    // force the browser to re-rasterise the header every frame on mobile.
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/95">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5 sm:px-8"
      >
        {/* Logo / name */}
        <Link
          href="/"
          className="group flex items-center gap-2 font-mono text-sm tracking-tight"
          // Accessible name must contain the visible text ("harsh.jakhar").
          aria-label="harsh.jakhar, home"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-accent transition-transform group-hover:scale-125" />
          <span className="font-medium">harsh.jakhar</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition-colors",
                  isActive(item.href)
                    ? "bg-surface-2 text-fg"
                    : "text-muted hover:text-fg",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-muted hover:text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" aria-hidden /> : <Menu className="h-4 w-4" aria-hidden />}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-t border-border/70 transition-[max-height,opacity] duration-300 ease-out-expo md:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 border-t-0 opacity-0",
        )}
      >
        <ul className="mx-auto flex w-full max-w-5xl flex-col gap-1 px-5 py-3">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                // Close the panel as soon as a link is tapped.
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-lg px-3 py-2.5 text-base",
                  isActive(item.href) ? "bg-surface-2 text-fg" : "text-muted hover:text-fg",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
