"use client";

import { motion } from "framer-motion";
import {
  Section,
  type SectionVariant,
  type SectionLayout,
  type SectionPadding,
  type PresetKey,
} from "@/components/layout/section";
import { homeProcessSteps, type TreatmentStep } from "@/data/treatments";

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
  steps?: TreatmentStep[];
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
  steps = homeProcessSteps,
  eyebrow = "Werkwijze",
  title = "Van Consult Tot Resultaat",
  description = "Elke stap is zorgvuldig doordacht voor een ontspannen ervaring en perfect eindresultaat.",
  className,
  id,
}: ProcessSectionProps) {
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

      {/* Desktop: horizontal timeline */}
      <div className="hidden md:grid md:grid-cols-4 gap-8 relative">
        {/* Connecting line */}
        <div className="absolute top-6 left-[12.5%] right-[12.5%] h-px bg-border" />

        {steps.map((step, i) => (
          <motion.div key={step.title} variants={staggerItem} className="relative text-center">
            {/* Step number circle */}
            <div className="relative z-10 mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <span className="font-display text-xl">{i + 1}</span>
            </div>
            <h3 className="font-display text-lg mb-2">{step.title}</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Mobile: vertical timeline */}
      <div className="md:hidden space-y-0">
        {steps.map((step, i) => (
          <motion.div key={step.title} variants={staggerItem} className="relative flex gap-6">
            {/* Vertical line + circle */}
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <span className="font-display text-xl">{i + 1}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="w-px flex-1 bg-border mt-2" />
              )}
            </div>

            {/* Content */}
            <div className="pb-10">
              <h3 className="font-display text-lg mb-1">{step.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
