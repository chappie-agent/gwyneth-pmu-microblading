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
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

interface CTASectionProps {
  variant?: SectionVariant;
  layout?: SectionLayout;
  padding?: SectionPadding;
  preset?: PresetKey;
  eyebrow?: string;
  title: string;
  description?: string;
  cta: { label: string; href: string };
  className?: string;
  id?: string;
}

export function CTASection({
  variant = "accent",
  layout = "narrow",
  padding = "md",
  preset,
  eyebrow,
  title,
  description,
  cta,
  className,
  id,
}: CTASectionProps) {
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
      <div className="text-center">
        {eyebrow && (
          <motion.span
            variants={fadeUp}
            className="text-xs font-body uppercase tracking-[0.3em] opacity-80 mb-4 block"
          >
            {eyebrow}
          </motion.span>
        )}
        <motion.h2
          variants={fadeUp}
          className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.12] mb-4"
        >
          {title}
        </motion.h2>
        {description && (
          <motion.p
            variants={fadeUp}
            className="font-body text-base opacity-80 max-w-2xl mx-auto mb-10"
          >
            {description}
          </motion.p>
        )}
        <motion.div variants={fadeUp}>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-current hover:bg-white/10"
          >
            <Link href={cta.href}>
              {cta.label}
              <ArrowRight className="size-4 ml-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}
