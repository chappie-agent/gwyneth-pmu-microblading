"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Section,
  type SectionVariant,
  type SectionLayout,
  type SectionPadding,
  type PresetKey,
} from "@/components/layout/section";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { ArrowRight } from "lucide-react";
import { treatments } from "@/data/treatments";

const cardGradients = ["warm", "cool", "sage"] as const;

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

interface TreatmentsSectionProps {
  variant?: SectionVariant;
  layout?: SectionLayout;
  padding?: SectionPadding;
  preset?: PresetKey;
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  id?: string;
}

export function TreatmentsSection({
  variant = "default",
  layout = "contained",
  padding = "lg",
  preset,
  eyebrow = "Behandelingen",
  title = "Kies Jouw Behandeling",
  description = "Drie gespecialiseerde technieken, elk met een eigen karakter. Welke past bij jou?",
  className,
  id,
}: TreatmentsSectionProps) {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {treatments.map((treatment, i) => (
          <motion.div key={treatment.slug} variants={staggerItem}>
            <Link
              href={`/behandelingen/${treatment.slug}`}
              className="group relative block h-[440px] lg:h-[520px] rounded-[var(--radius-lg)] overflow-hidden border border-transparent transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]"
            >
              {/* Full-bleed background image */}
              <ImagePlaceholder
                aspect="portrait"
                gradient={cardGradients[i % cardGradients.length]}
                label=""
                className="!absolute inset-0 !rounded-none w-full h-full !aspect-auto transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(to top, rgba(42,40,39,0.75) 0%, transparent 65%)",
                }}
              />
              {/* Darker overlay on hover */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(to top, rgba(42,40,39,0.88) 0%, rgba(42,40,39,0.2) 70%)",
                }}
              />

              {/* Content positioned at bottom */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col">
                {/* Label */}
                <span className="text-[0.7rem] font-body uppercase tracking-[0.25em] text-gold-light mb-2">
                  {treatment.label}
                </span>

                {/* Treatment name */}
                <h3 className="font-display text-[1.8rem] font-light leading-tight text-white mb-1">
                  {treatment.name}
                </h3>

                {/* Price */}
                <span className="font-body text-[1.1rem] text-accent-soft mb-2">
                  Vanaf {treatment.priceLabel}
                </span>

                {/* USPs - hidden by default, revealed on hover */}
                <ul className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-out group-hover:max-h-[200px] group-hover:opacity-100 mt-2 space-y-1.5">
                  {treatment.usps.map((usp) => (
                    <li
                      key={usp}
                      className="flex items-start gap-2 text-[0.82rem] font-body text-white/80"
                    >
                      {/* Checkmark SVG in gold-light */}
                      <svg
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-light"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2.5 8.5l3.5 3.5 7.5-8" />
                      </svg>
                      {usp}
                    </li>
                  ))}
                </ul>

                {/* "Meer Info" link - appears on hover with translateY */}
                <span className="inline-flex items-center gap-1.5 mt-3 text-[0.78rem] font-body uppercase tracking-[0.2em] text-gold-light translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  Meer Info
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
