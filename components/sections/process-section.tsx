"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Section,
  type SectionVariant,
  type SectionLayout,
  type SectionPadding,
  type PresetKey,
} from "@/components/layout/section";
import type { TreatmentStep } from "@/data/treatments";

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

interface ProcessSectionProps {
  variant?: SectionVariant;
  layout?: SectionLayout;
  padding?: SectionPadding;
  preset?: PresetKey;
  steps: TreatmentStep[];
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  id?: string;
}

export function ProcessSection({
  variant = "default",
  layout = "contained",
  padding = "lg",
  preset,
  steps,
  eyebrow = "Werkwijze",
  title = "Van Consult Tot Resultaat",
  description = "Elke stap is zorgvuldig doordacht voor een ontspannen ervaring en perfect eindresultaat.",
  className,
  id,
}: ProcessSectionProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const isLineInView = useInView(lineRef, { once: true, margin: "-80px" });

  return (
    <Section
      variant={variant}
      layout={layout}
      padding={padding}
      preset={preset}
      stagger
      className={className}
      id={id}
    >
      <div className="text-center mb-16">
        {eyebrow && (
          <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
            {eyebrow}
          </span>
        )}
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.12] mb-4">
          {title}
        </h2>
        {description && (
          <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto mb-12">
            {description}
          </p>
        )}
      </div>

      {/* Horizontal progress line */}
      <div ref={lineRef} className="relative mb-10">
        <div className="h-px bg-beige dark:bg-grey-warm w-full" />
        <motion.div
          className="absolute top-0 left-0 h-px bg-accent"
          initial={{ width: "0%" }}
          animate={isLineInView ? { width: "100%" } : { width: "0%" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Steps grid: 4 columns on desktop, 2 on mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[2.5rem]">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            variants={staggerItem}
            className="group text-center p-[1.5rem_1rem] rounded-[var(--radius-md)] transition-colors duration-300 hover:bg-cream dark:hover:bg-charcoal"
          >
            {/* Large serif number */}
            <span className="block font-display text-[2.8rem] leading-none text-accent opacity-20 group-hover:opacity-50 transition-opacity duration-300 mb-4">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h4 className="font-display text-[1.25rem] mb-2">{step.title}</h4>
            <p className="font-body text-[0.85rem] text-taupe-dark dark:text-taupe leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
