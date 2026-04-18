"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Section,
  type SectionVariant,
  type SectionPadding,
} from "@/components/layout/section";
import Image from "next/image";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

interface AboutSectionProps {
  variant?: SectionVariant;
  padding?: SectionPadding;
  className?: string;
  id?: string;
  /** About portrait image URL */
  aboutImage?: string;
}

export function AboutSection({
  variant = "sage",
  padding = "lg",
  className,
  id,
  aboutImage,
}: AboutSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <Section
      variant={variant}
      layout="contained"
      padding={padding}
      animate={false}
      className={className}
      id={id}
    >
      <div
        ref={sectionRef}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[5rem] items-center"
      >
        {/* Left: Image with decorative square and clip-path reveal */}
        <div className="relative">
          {/* Decorative offset frame — surrounds the whole image */}
          <div
            className="absolute -top-4 -left-4 -right-4 -bottom-4 border border-taupe dark:border-grey-warm opacity-70 rounded-[var(--radius-lg)] z-0 pointer-events-none"
          />
          <motion.div
            className="relative z-10 overflow-hidden rounded-[var(--radius-lg)]"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            {aboutImage ? (
              <Image
                src={aboutImage}
                alt="Gwyneth — gecertificeerd PMU specialist in Zoetermeer"
                width={800}
                height={1000}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-[580px] max-lg:h-[400px] object-cover object-top"
              />
            ) : (
              <ImagePlaceholder
                aspect="portrait"
                gradient="warm"
                label="Gwyneth"
                className="w-full h-[580px] max-lg:h-[400px]"
              />
            )}
          </motion.div>
        </div>

        {/* Right: Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="flex flex-col justify-center"
        >
          <span className="text-xs font-body uppercase tracking-[0.3em] text-accent mb-4 block">
            Over Mij
          </span>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-light leading-[1.12] mb-8">
            Schoonheid is een kunstvorm
          </h2>
          <div className="space-y-6 mb-8 max-w-[440px]">
            <p className="font-body text-[0.95rem] text-grey-warm dark:text-taupe leading-relaxed">
              Met passie en precisie creëer ik permanente make-up die naadloos aansluit bij jouw
              natuurlijke uitstraling. Elk gezicht vertelt een verhaal, en ik help dat verhaal nog
              mooier te maken.
            </p>
            <p className="font-body text-[0.95rem] text-grey-warm dark:text-taupe leading-relaxed">
              Na jarenlange ervaring en internationale masterclasses bied ik behandelingen van het
              hoogste niveau. Mijn studio is jouw plek van rust, vertrouwen en transformatie.
            </p>
          </div>
          <p className="font-display italic text-[1.8rem] text-accent mt-[1.5rem]">Gwyneth</p>
        </motion.div>
      </div>
    </Section>
  );
}
