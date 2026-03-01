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
  variant = "default",
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
  const isLight = variant === "default" || variant === "light";

  return (
    <Section
      variant={variant}
      layout={layout}
      padding={padding}
      preset={preset}
      stagger
      className={`relative overflow-hidden ${className ?? ""}`}
      id={id}
    >
      {/* Subtle radial gradient overlay for light variants */}
      {isLight && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(171,139,103,0.04) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
      )}

      <div className="relative text-center">
        {eyebrow && (
          <motion.span
            variants={fadeUp}
            className={`text-xs font-body uppercase tracking-[0.3em] mb-4 block ${
              isLight ? "text-gold-light" : "opacity-80"
            }`}
          >
            {eyebrow}
          </motion.span>
        )}
        <motion.h2
          variants={fadeUp}
          className={`font-display text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.12] mb-4 ${
            isLight ? "text-dark" : ""
          }`}
        >
          {title}
        </motion.h2>
        {description && (
          <motion.p
            variants={fadeUp}
            className={`font-body text-base max-w-2xl mx-auto mb-10 ${
              isLight ? "text-taupe-dark" : "opacity-80"
            }`}
          >
            {description}
          </motion.p>
        )}
        <motion.div variants={fadeUp}>
          <Link
            href={cta.href}
            className="inline-flex items-center gap-[0.6rem] px-[2.4rem] py-4 bg-accent text-warm-white text-[0.73rem] font-body font-normal tracking-[0.2em] uppercase border-none rounded-[var(--radius-sm)] relative overflow-hidden transition-all duration-400 ease hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(171,139,103,0.25)]"
          >
            {cta.label}
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}
