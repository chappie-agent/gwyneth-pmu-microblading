"use client";

import { ThemeProvider } from "next-themes";
import { NavbarThemeProvider } from "@/contexts/navbar-theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <NavbarThemeProvider>{children}</NavbarThemeProvider>
    </ThemeProvider>
  );
}
