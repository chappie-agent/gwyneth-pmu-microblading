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
  /** Text within the title to render in italic + accent color */
  titleAccent?: string;
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
  default: "bg-linen text-dark",
  static: "bg-cream text-charcoal",
  dark: "bg-charcoal text-cream",
  accent: "bg-accent text-warm-white",
  sage: "bg-sage-wash text-charcoal",
};

/* Trust item icons — inline SVGs matching the original design */
const trustIcons: Record<string, React.ReactNode> = {
  Gecertificeerd: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  "5.0 Google Reviews": (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  "500+ klanten": (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
};

/** Renders title with an accented (italic + accent color) substring */
function TitleWithAccent({
  title,
  accent,
  className,
}: {
  title: string;
  accent?: string;
  className?: string;
}) {
  if (!accent || !title.includes(accent)) {
    return <span className={className}>{title}</span>;
  }

  const idx = title.indexOf(accent);
  const before = title.slice(0, idx);
  const after = title.slice(idx + accent.length);

  return (
    <span className={className}>
      {before}
      <em className="italic text-accent">{accent}</em>
      {after}
    </span>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      {/* Line above text */}
      <motion.div
        className="h-8 w-px origin-top"
        style={{
          background:
            "linear-gradient(to bottom, hsl(22 8% 55%), transparent)",
        }}
        animate={{ scaleY: [0.4, 1, 0.4] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Scroll text below line */}
      <span className="mt-2 text-[0.65rem] uppercase tracking-[0.2em] text-accent">
        Scroll
      </span>
    </motion.div>
  );
}

export function HeroSection({
  variant = "default",
  eyebrow,
  title,
  titleAccent,
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

  const isDefault = variant === "default";

  /* ── Default variant: split layout (content left, image right) ── */
  if (isDefault) {
    return (
      <section
        ref={sectionRef}
        className={cn(
          "relative overflow-hidden min-h-[100svh] flex items-center",
          variantStyles[variant]
        )}
      >
        {/* Left content */}
        <Container className="relative z-10">
          <div className="flex flex-col items-start gap-5 max-w-[600px] py-24">
            {/* Eyebrow — plain text, not a Badge */}
            {eyebrow && (
              <motion.span
                variants={fadeIn(0)}
                initial="hidden"
                animate="visible"
                className="text-[0.68rem] uppercase tracking-[0.4em] text-accent font-body"
              >
                {eyebrow}
              </motion.span>
            )}

            {/* Title */}
            <motion.h1
              variants={fadeIn(0.1)}
              initial="hidden"
              animate="visible"
              className="font-display font-light leading-[1.12] text-[clamp(2.6rem,5.5vw,4.2rem)] text-dark"
            >
              <TitleWithAccent title={title} accent={titleAccent} />
            </motion.h1>

            {/* Description */}
            {description && (
              <motion.p
                variants={fadeIn(0.2)}
                initial="hidden"
                animate="visible"
                className="font-body text-[0.95rem] text-taupe-dark leading-relaxed max-w-xl"
              >
                {description}
              </motion.p>
            )}

            {/* Trust items */}
            {trustItems && trustItems.length > 0 && (
              <motion.div
                variants={fadeIn(0.3)}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-1"
              >
                {trustItems.map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-1.5 text-[0.72rem] uppercase tracking-[0.15em] text-grey-warm"
                  >
                    <span className="text-accent">
                      {trustIcons[item] ?? null}
                    </span>
                    {item}
                  </span>
                ))}
              </motion.div>
            )}

            {/* CTAs */}
            {(primaryCta || secondaryCta) && (
              <motion.div
                variants={fadeIn(0.4)}
                initial="hidden"
                animate="visible"
                className="flex flex-row items-center gap-4 mt-3"
              >
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className={cn(
                      "inline-flex items-center gap-2 px-7 py-3",
                      "bg-accent text-warm-white",
                      "text-[0.82rem] font-body tracking-[0.08em] uppercase",
                      "rounded-[var(--radius-sm)]",
                      "transition-colors hover:bg-accent-light"
                    )}
                  >
                    {primaryCta.label}
                    {/* Arrow SVG */}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className={cn(
                      "inline-flex items-center gap-2 px-7 py-3",
                      "border border-taupe text-grey-warm",
                      "text-[0.82rem] font-body tracking-[0.08em] uppercase",
                      "rounded-[var(--radius-sm)]",
                      "transition-colors hover:bg-taupe/10 hover:border-grey-warm"
                    )}
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </motion.div>
            )}
          </div>
        </Container>

        {/* Right image (55% width, absolutely positioned) */}
        <motion.div
          className="absolute top-0 right-0 bottom-0 w-[55%] z-0 hidden md:block"
          style={{ y: backgroundY }}
        >
          <ImagePlaceholder
            aspect="hero"
            gradient="warm"
            className="!aspect-auto absolute inset-0 h-[120%] w-full rounded-none"
          />
          {/* Gradient overlay: fades from linen (left) to transparent (right) */}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(to right, hsl(30 10% 92%) 0%, hsl(30 10% 92% / 0.6) 30%, transparent 70%)",
            }}
          />
        </motion.div>

        {/* Scroll indicator */}
        {showScrollIndicator && <ScrollIndicator />}
      </section>
    );
  }

  /* ── Static / other variants: subpage hero (unchanged logic) ── */
  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative overflow-hidden min-h-[40vh] py-24 pt-32 flex items-center",
        variantStyles[variant]
      )}
    >
      {/* Content */}
      <Container className="relative z-10">
        {breadcrumb && <BreadcrumbNav />}

        <div className="flex flex-col gap-6 items-start">
          {/* Eyebrow */}
          {eyebrow && (
            <motion.div
              variants={fadeIn(0)}
              initial="hidden"
              animate="visible"
            >
              <Badge
                variant="outline"
                className="text-xs uppercase tracking-[0.15em] px-3 py-1"
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
            className="font-display font-light leading-[1.12] text-[clamp(2rem,4.5vw,3.4rem)] max-w-2xl"
          >
            {title}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              variants={fadeIn(0.2)}
              initial="hidden"
              animate="visible"
              className="font-body text-lg max-w-xl leading-relaxed text-muted-foreground"
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
                <Button asChild size="lg" className="rounded-[var(--radius-sm)] px-8">
                  <Link href={primaryCta.href}>{primaryCta.label}</Link>
                </Button>
              )}
              {secondaryCta && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-[var(--radius-sm)] px-8"
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
              className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-4"
            >
              {trustItems.map((item, index) => (
                <span key={item} className="flex items-center gap-3">
                  {index > 0 && (
                    <span
                      className="text-xs text-muted-foreground/40"
                      aria-hidden
                    >
                      &middot;
                    </span>
                  )}
                  <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {item}
                  </span>
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
