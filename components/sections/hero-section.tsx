"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { BreadcrumbNav } from "@/components/layout/breadcrumb-nav";

type HeroVariant = "default" | "static" | "dark" | "accent" | "sage";

interface HeroSectionProps {
  variant?: HeroVariant;
  eyebrow?: string;
  title: string;
  description?: string;
  trustItems?: string[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  showScrollIndicator?: boolean;
  breadcrumb?: boolean;
}

const fadeIn = (delay: number) => ({
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
});

const variantStyles: Record<HeroVariant, string> = {
  default: "bg-warm-white text-charcoal",
  static: "bg-cream text-charcoal",
  dark: "bg-charcoal text-cream",
  accent: "bg-accent text-warm-white",
  sage: "bg-sage-wash text-charcoal",
};

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Scroll
      </span>
      <motion.div
        className="h-8 w-px bg-muted-foreground/40 origin-top"
        animate={{ scaleY: [0.4, 1, 0.4] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

export function HeroSection({
  variant = "default",
  eyebrow,
  title,
  description,
  trustItems,
  primaryCta,
  secondaryCta,
  showScrollIndicator = false,
  breadcrumb = false,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const isFullHeight = variant === "default";
  const isStatic = variant !== "default";

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative overflow-hidden",
        isFullHeight && "min-h-[100svh] flex items-center justify-center",
        isStatic && "min-h-[40vh] py-24 pt-32 flex items-center",
        variantStyles[variant]
      )}
    >
      {/* Background */}
      {isFullHeight ? (
        <>
          <motion.div
            className="absolute inset-0 z-0"
            style={{ y: backgroundY }}
          >
            <ImagePlaceholder
              aspect="hero"
              gradient="warm"
              className="!aspect-auto absolute inset-0 h-[120%] w-full rounded-none"
            />
          </motion.div>
          <div className="absolute inset-0 z-[1] bg-charcoal/30" />
        </>
      ) : null}

      {/* Content */}
      <Container className={cn("relative z-10", isFullHeight && "text-center")}>
        {breadcrumb && isStatic && <BreadcrumbNav />}

        <div
          className={cn(
            "flex flex-col gap-6",
            isFullHeight && "items-center",
            isStatic && "items-start"
          )}
        >
          {/* Eyebrow */}
          {eyebrow && (
            <motion.div
              variants={fadeIn(0)}
              initial="hidden"
              animate="visible"
            >
              <Badge
                variant="outline"
                className={cn(
                  "text-xs uppercase tracking-[0.15em] px-3 py-1",
                  isFullHeight &&
                    "border-cream/40 text-cream bg-cream/10"
                )}
              >
                {eyebrow}
              </Badge>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            variants={fadeIn(0.1)}
            initial="hidden"
            animate="visible"
            className={cn(
              "font-display font-light leading-[1.12]",
              isFullHeight &&
                "text-[clamp(2.6rem,5.5vw,4.2rem)] text-cream max-w-3xl",
              isStatic && "text-[clamp(2rem,4.5vw,3.4rem)] max-w-2xl"
            )}
          >
            {title}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              variants={fadeIn(0.2)}
              initial="hidden"
              animate="visible"
              className={cn(
                "font-body text-lg max-w-xl leading-relaxed",
                isFullHeight && "text-cream/80",
                isStatic && "text-muted-foreground"
              )}
            >
              {description}
            </motion.p>
          )}

          {/* CTAs */}
          {(primaryCta || secondaryCta) && (
            <motion.div
              variants={fadeIn(0.3)}
              initial="hidden"
              animate="visible"
              className="flex flex-row items-center gap-4 mt-2"
            >
              {primaryCta && (
                <Button
                  asChild
                  size="lg"
                  className={cn(
                    "rounded-full px-8",
                    isFullHeight &&
                      "bg-accent text-warm-white hover:bg-accent-light"
                  )}
                >
                  <Link href={primaryCta.href}>{primaryCta.label}</Link>
                </Button>
              )}
              {secondaryCta && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className={cn(
                    "rounded-full px-8",
                    isFullHeight &&
                      "border-cream/40 text-cream hover:bg-cream/10 hover:text-cream"
                  )}
                >
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              )}
            </motion.div>
          )}

          {/* Trust items */}
          {trustItems && trustItems.length > 0 && (
            <motion.div
              variants={fadeIn(0.4)}
              initial="hidden"
              animate="visible"
              className={cn(
                "flex flex-wrap items-center gap-x-3 gap-y-1 mt-4",
                isFullHeight && "justify-center"
              )}
            >
              {trustItems.map((item, index) => (
                <span key={item} className="flex items-center gap-3">
                  {index > 0 && (
                    <span
                      className={cn(
                        "text-xs",
                        isFullHeight
                          ? "text-cream/40"
                          : "text-muted-foreground/40"
                      )}
                      aria-hidden
                    >
                      &middot;
                    </span>
                  )}
                  <span
                    className={cn(
                      "text-xs uppercase tracking-[0.15em]",
                      isFullHeight
                        ? "text-cream/70"
                        : "text-muted-foreground"
                    )}
                  >
                    {item}
                  </span>
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </Container>

      {/* Scroll indicator */}
      {showScrollIndicator && isFullHeight && <ScrollIndicator />}
    </section>
  );
}
