"use client";

import { createContext, useContext, useState, useCallback } from "react";

/**
 * Describes the hero background luminance so the navbar can pick
 * text colors that always remain readable on top of the hero.
 *
 * - "light"  → hero has a light bg (cream, linen, sage-wash)
 *               navbar should use dark text (default behaviour)
 * - "dark"   → hero has a dark bg (charcoal, dark)
 *               navbar should use light / cream text
 * - "accent" → hero uses the brand accent bg (golden, medium luminance)
 *               navbar should use warm-white text (accent for active won't work)
 *               In dark mode the accent hero becomes bg-accent-soft (light)
 *               so the navbar needs dark text instead.
 */
export type HeroBgType = "light" | "dark" | "accent";

interface NavbarThemeContextType {
  heroBg: HeroBgType;
  setHeroBg: (bg: HeroBgType) => void;
}

const NavbarThemeContext = createContext<NavbarThemeContextType>({
  heroBg: "light",
  setHeroBg: () => {},
});

export function NavbarThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [heroBg, setHeroBgState] = useState<HeroBgType>("light");

  const setHeroBg = useCallback((bg: HeroBgType) => {
    setHeroBgState(bg);
  }, []);

  return (
    <NavbarThemeContext.Provider value={{ heroBg, setHeroBg }}>
      {children}
    </NavbarThemeContext.Provider>
  );
}

export function useNavbarTheme() {
  return useContext(NavbarThemeContext);
}
