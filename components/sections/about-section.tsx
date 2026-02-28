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
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

interface AboutSectionProps {
  variant?: SectionVariant;
  layout?: SectionLayout;
  padding?: SectionPadding;
  preset?: PresetKey;
  className?: string;
  id?: string;
}

export function AboutSection({
  variant,
  layout,
  padding,
  preset = "split-about",
  className,
  id,
}: AboutSectionProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(imageRef, { once: true, margin: "-80px" });

  return (
    <Section
      variant={variant}
      layout={layout}
      padding={padding}
      preset={preset}
      animate={false}
      className={className}
      id={id}
    >
      {/* Left: Image with clip-path reveal */}
      <div ref={imageRef} className="relative">
        <motion.div
          initial={{ clipPath: "inset(8% 8% 8% 8%)" }}
          animate={isInView ? { clipPath: "inset(0% 0% 0% 0%)" } : { clipPath: "inset(8% 8% 8% 8%)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <ImagePlaceholder
            aspect="portrait"
            gradient="warm"
            label="Gwyneth"
            className="w-full"
          />
        </motion.div>
      </div>

      {/* Right: Content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="flex flex-col justify-center"
      >
        <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
          Over Mij
        </span>
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.12] mb-8">
          Schoonheid is een kunstvorm
        </h2>
        <div className="space-y-6 mb-8">
          <p className="font-body text-base text-muted-foreground leading-relaxed">
            Met passie en precisie creëer ik permanente make-up die naadloos aansluit bij jouw
            natuurlijke uitstraling. Elk gezicht vertelt een verhaal — ik help dat verhaal nog
            mooier te maken.
          </p>
          <p className="font-body text-base text-muted-foreground leading-relaxed">
            Na jarenlange ervaring en internationale masterclasses bied ik behandelingen van het
            hoogste niveau. Mijn studio is jouw plek van rust, vertrouwen en transformatie.
          </p>
        </div>
        <p className="font-display text-lg italic text-accent">— Gwyneth</p>
      </motion.div>
    </Section>
  );
}
