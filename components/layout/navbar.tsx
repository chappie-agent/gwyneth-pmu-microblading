"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";
import type { NavItem } from "@/types/navigation";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useNavbarTheme } from "@/contexts/navbar-theme";

/**
 * Return text-color classes for the navbar based on the hero background
 * luminance. Only applied when the navbar is transparent (not scrolled).
 *
 * When scrolled the navbar gets its own `bg-background/80` so we fall back
 * to the theme's default foreground colours and no override is needed.
 *
 * Three hero backgrounds are handled:
 *  • "light"  – hero is cream / linen / sage (light bg)  → default dark text
 *  • "dark"   – hero is charcoal / dark                  → cream / light text
 *  • "accent" – hero is brand-accent gold                → warm-white text
 *               In dark mode the accent hero becomes bg-accent-soft (light),
 *               so the navbar flips to dark text.
 */
function useHeroAwareColors(scrolled: boolean) {
  const { heroBg } = useNavbarTheme();

  // When scrolled the navbar has its own bg — use default theme colours.
  if (scrolled) {
    return {
      logo: "text-foreground",
      subtitle: "text-muted-foreground",
      link: "text-foreground/80",
      linkActive: "text-accent",
      linkHover: "hover:text-foreground",
      triggerBase:
        "bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent hover:text-foreground focus:text-foreground data-[state=open]:text-foreground",
    };
  }

  switch (heroBg) {
    case "dark":
      return {
        logo: "text-cream dark:text-cream",
        subtitle: "text-cream/60 dark:text-cream/60",
        link: "text-cream/80 dark:text-cream/80",
        linkActive: "text-warm-white dark:text-cream",
        linkHover: "hover:text-warm-white dark:hover:text-cream",
        triggerBase:
          "bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent text-cream/80 hover:text-warm-white focus:text-warm-white data-[state=open]:text-warm-white dark:text-cream/80 dark:hover:text-cream dark:focus:text-cream dark:data-[state=open]:text-cream",
      };

    case "accent":
      // Light mode: accent bg → warm-white text; active uses warm-white (NOT accent!)
      // Dark mode:  accent-soft bg (light) → dark text
      return {
        logo: "text-warm-white dark:text-charcoal",
        subtitle: "text-warm-white/60 dark:text-charcoal/50",
        link: "text-warm-white/85 dark:text-charcoal/80",
        linkActive: "text-warm-white font-medium dark:text-charcoal dark:font-medium",
        linkHover: "hover:text-warm-white dark:hover:text-charcoal",
        triggerBase:
          "bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent text-warm-white/85 hover:text-warm-white focus:text-warm-white data-[state=open]:text-warm-white dark:text-charcoal/80 dark:hover:text-charcoal dark:focus:text-charcoal dark:data-[state=open]:text-charcoal",
      };

    case "light":
    default:
      return {
        logo: "text-foreground",
        subtitle: "text-muted-foreground",
        link: "text-foreground/80",
        linkActive: "text-accent",
        linkHover: "hover:text-foreground",
        triggerBase:
          "bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent hover:text-foreground focus:text-foreground data-[state=open]:text-foreground",
      };
  }
}

interface NavbarProps {
  mainNav: NavItem[];
}

export function Navbar({ mainNav }: NavbarProps) {
  const scrolled = useScroll(50);
  const pathname = usePathname();
  const colors = useHeroAwareColors(scrolled);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex flex-col">
          <span
            className={cn(
              "font-display text-xl font-semibold tracking-wide transition-colors duration-300",
              colors.logo
            )}
          >
            Gwyneth PMU
          </span>
          <span
            className={cn(
              "font-body text-xs uppercase tracking-widest transition-colors duration-300",
              colors.subtitle
            )}
          >
            Microblading
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-1">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {mainNav.map((item) =>
                item.children ? (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuTrigger
                      className={cn(
                        "font-body text-sm uppercase tracking-wide transition-colors duration-300",
                        colors.triggerBase,
                        pathname.startsWith(item.href)
                          ? colors.linkActive
                          : ""
                      )}
                    >
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-48 gap-1 p-3">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={child.href}
                                className={cn(
                                  "block select-none rounded-[var(--radius-sm)] px-4 py-2.5 text-[0.82rem] font-body transition-colors",
                                  pathname === child.href
                                    ? "bg-accent/10 text-accent font-medium hover:bg-accent/15"
                                    : "text-foreground/80 hover:bg-accent/5 hover:text-accent"
                                )}
                              >
                                {child.label}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "font-body inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm uppercase tracking-wide transition-colors duration-300",
                        colors.linkHover,
                        pathname === item.href
                          ? colors.linkActive
                          : colors.link
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side: Theme Toggle + CTA + Mobile hamburger */}
        <div className={cn("flex items-center gap-2 transition-colors duration-300", colors.link)}>
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="hidden lg:inline-flex bg-accent text-accent-foreground hover:bg-accent/90 font-body text-xs uppercase tracking-wider"
          >
            <Link href="/boeken">Boek Nu</Link>
          </Button>
          <div className="lg:hidden">
            <MobileNav mainNav={mainNav} />
          </div>
        </div>
      </nav>
    </header>
  );
}
