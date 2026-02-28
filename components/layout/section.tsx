"use client";

import { cn } from "@/lib/utils";
import { Container } from "./container";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export type SectionVariant =
  | "default"
  | "light"
  | "dark"
  | "accent"
  | "sage"
  | "muted";

export type SectionLayout = "contained" | "full-bleed" | "split" | "narrow";

export type SectionPadding = "none" | "sm" | "md" | "lg" | "xl";

const presets = {
  "hero-dark": {
    variant: "dark" as const,
    layout: "full-bleed" as const,
    padding: "none" as const,
  },
  "hero-light": {
    variant: "default" as const,
    layout: "full-bleed" as const,
    padding: "none" as const,
  },
  "content-default": {
    variant: "default" as const,
    layout: "contained" as const,
    padding: "lg" as const,
  },
  "content-dark": {
    variant: "dark" as const,
    layout: "contained" as const,
    padding: "lg" as const,
  },
  "cta-accent": {
    variant: "accent" as const,
    layout: "contained" as const,
    padding: "md" as const,
  },
  "cta-dark": {
    variant: "dark" as const,
    layout: "narrow" as const,
    padding: "md" as const,
  },
  "gallery-dark": {
    variant: "dark" as const,
    layout: "contained" as const,
    padding: "lg" as const,
  },
  "split-about": {
    variant: "default" as const,
    layout: "split" as const,
    padding: "lg" as const,
  },
} as const;

export type PresetKey = keyof typeof presets;

const variantStyles: Record<SectionVariant, string> = {
  default: "bg-warm-white text-charcoal dark:bg-dark dark:text-cream",
  light: "bg-cream text-charcoal dark:bg-charcoal dark:text-cream",
  dark: "bg-charcoal text-cream dark:bg-dark dark:text-linen",
  accent: "bg-accent text-warm-white dark:bg-accent-soft dark:text-dark",
  sage: "bg-sage-wash text-charcoal dark:bg-grey-warm dark:text-sage",
  muted: "bg-linen text-grey-warm dark:bg-charcoal dark:text-taupe",
};

const paddingStyles: Record<SectionPadding, string> = {
  none: "",
  sm: "py-[var(--spacing-section-sm)]",
  md: "py-[var(--spacing-section-md)]",
  lg: "py-[var(--spacing-section-lg)]",
  xl: "py-[var(--spacing-section-xl)]",
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

interface SectionProps {
  variant?: SectionVariant;
  layout?: SectionLayout;
  padding?: SectionPadding;
  preset?: PresetKey;
  animate?: boolean;
  stagger?: boolean;
  className?: string;
  id?: string;
  children: React.ReactNode;
}

export function Section({
  variant: variantProp,
  layout: layoutProp,
  padding: paddingProp,
  preset,
  animate = true,
  stagger = false,
  className,
  id,
  children,
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Resolve preset values, then allow individual props to override
  const resolved = preset ? presets[preset] : undefined;
  const variant: SectionVariant = variantProp ?? resolved?.variant ?? "default";
  const layout: SectionLayout = layoutProp ?? resolved?.layout ?? "contained";
  const padding: SectionPadding = paddingProp ?? resolved?.padding ?? "lg";

  const sectionClasses = cn(
    variantStyles[variant],
    paddingStyles[padding],
    className
  );

  // Build the inner content based on layout
  let content: React.ReactNode;
  switch (layout) {
    case "full-bleed":
      content = children;
      break;
    case "narrow":
      content = <Container size="narrow">{children}</Container>;
      break;
    case "split":
      content = (
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {children}
          </div>
        </Container>
      );
      break;
    case "contained":
    default:
      content = <Container>{children}</Container>;
      break;
  }

  // Choose animation variants
  const motionVariants = stagger ? staggerContainerVariants : fadeUpVariants;

  if (!animate) {
    return (
      <section id={id} className={sectionClasses}>
        {content}
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      className={sectionClasses}
      variants={motionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {content}
    </motion.section>
  );
}
