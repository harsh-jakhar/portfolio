"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Wraps the app with next-themes.
 * - attribute="class" puts `.dark` / `.light` on <html>, which Tailwind's
 *   `dark:` variant and the CSS variables in globals.css react to.
 * - defaultTheme="dark" makes dark the default for first-time visitors.
 * - enableSystem={false} so the default is always dark, not the OS setting.
 *   Set it to true if you prefer to follow the OS by default.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
