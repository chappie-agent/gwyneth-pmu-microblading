"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import type { NavItem } from "@/types/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface MobileNavProps {
  mainNav: NavItem[];
}

export function MobileNav({ mainNav }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [behandelingenOpen, setBehandelingenOpen] = useState(false);
  const pathname = usePathname();

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <SheetContent side="right" className="w-80 overflow-y-auto">
        <SheetHeader className="border-b border-border/50 pb-4">
          <SheetTitle className="text-left">
            <Link
              href="/"
              onClick={handleLinkClick}
              className="flex flex-col"
            >
              <span className="font-display text-xl font-semibold tracking-wide">
                Gwyneth PMU
              </span>
              <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                Microblading
              </span>
            </Link>
          </SheetTitle>
        </SheetHeader>

        {/* Navigation Links */}
        <div className="flex flex-col gap-1 px-4 py-6">
          {mainNav.map((item) =>
            item.children ? (
              <div key={item.href}>
                <button
                  onClick={() => setBehandelingenOpen(!behandelingenOpen)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-3 py-3 font-display text-lg transition-colors hover:text-accent",
                    pathname.startsWith(item.href)
                      ? "text-accent"
                      : "text-foreground"
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      behandelingenOpen && "rotate-180"
                    )}
                  />
                </button>
                {behandelingenOpen && (
                  <div className="ml-4 flex flex-col gap-1 border-l border-border/50 pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={handleLinkClick}
                        className={cn(
                          "rounded-md px-3 py-2 font-body text-sm transition-colors hover:text-accent",
                          pathname === child.href
                            ? "text-accent font-medium"
                            : "text-muted-foreground"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className={cn(
                  "rounded-md px-3 py-3 font-display text-lg transition-colors hover:text-accent",
                  pathname === item.href
                    ? "text-accent"
                    : "text-foreground"
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Footer: CTA + Theme Toggle */}
        <div className="mt-auto border-t border-border/50 px-4 py-6">
          <Button
            asChild
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-body text-sm uppercase tracking-wider"
          >
            <Link href="/boeken" onClick={handleLinkClick}>
              Boek Nu
            </Link>
          </Button>
          <div className="mt-4 flex items-center justify-between">
            <span className="font-body text-sm text-muted-foreground">
              Thema
            </span>
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
