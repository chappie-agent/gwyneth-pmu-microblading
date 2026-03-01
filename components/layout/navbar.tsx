"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { mainNav } from "@/data/navigation";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const scrolled = useScroll(50);
  const pathname = usePathname();

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
          <span className="font-display text-xl font-semibold tracking-wide text-foreground">
            Gwyneth PMU
          </span>
          <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">
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
                        "font-body text-sm uppercase tracking-wide bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent hover:text-foreground focus:text-foreground data-[state=open]:text-foreground",
                        pathname.startsWith(item.href)
                          ? "text-accent"
                          : "text-foreground/80"
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
                        "font-body inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm uppercase tracking-wide transition-colors hover:text-foreground",
                        pathname === item.href
                          ? "text-accent"
                          : "text-foreground/80"
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
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="hidden lg:inline-flex bg-accent text-accent-foreground hover:bg-accent/90 font-body text-xs uppercase tracking-wider"
          >
            <Link href="/boeken">Boek Nu</Link>
          </Button>
          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </nav>
    </header>
  );
}
