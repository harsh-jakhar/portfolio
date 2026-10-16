"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Drives the scroll-reveal animation for every <Reveal> on the page.
 *
 * - Runs once per route (re-runs when the pathname changes).
 * - Elements already inside the viewport are left alone, so nothing visible
 *   on first paint ever flickers or delays LCP.
 * - Elements below the fold get the `reveal-hidden` class and lose it when
 *   they scroll into view (CSS in globals.css does the actual transition).
 * - Respects prefers-reduced-motion: in that case nothing is hidden at all.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const viewportHeight = window.innerHeight;
    const below = elements.filter((el) => el.getBoundingClientRect().top > viewportHeight * 0.9);
    if (below.length === 0) return;

    for (const el of below) el.classList.add("reveal-hidden");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.remove("reveal-hidden");
            observer.unobserve(entry.target);
          }
        }
      },
      // Start a little before the element is fully in view.
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    for (const el of below) observer.observe(el);

    return () => {
      observer.disconnect();
      for (const el of below) el.classList.remove("reveal-hidden");
    };
  }, [pathname]);

  return null;
}
