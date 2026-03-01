"use client";

import { motion } from "framer-motion";
import {
  Section,
  type SectionVariant,
  type SectionLayout,
  type SectionPadding,
  type PresetKey,
} from "@/components/layout/section";
import { reviews } from "@/data/reviews";

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

interface ReviewsSectionProps {
  variant?: SectionVariant;
  layout?: SectionLayout;
  padding?: SectionPadding;
  preset?: PresetKey;
  className?: string;
  id?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function ReviewsSection({
  variant = "dark",
  layout = "contained",
  padding = "lg",
  preset,
  className,
  id,
}: ReviewsSectionProps) {
  return (
    <Section
      variant={variant}
      layout={layout}
      padding={padding}
      preset={preset}
      stagger
      className={`!bg-dark ${className ?? ""}`}
      id={id}
    >
      <div className="text-center mb-16">
        <span className="text-xs font-body uppercase tracking-[0.3em] text-gold-light mb-4 block">
          Reviews
        </span>
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.12] mb-4">
          Wat Klanten Zeggen
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <motion.div
            key={review.name}
            variants={staggerItem}
            className="relative flex flex-col rounded-[var(--radius-md)] border border-white/[0.06] bg-white/[0.03] p-[2.4rem]"
          >
            {/* Decorative quote mark */}
            <span
              className="absolute top-[1.2rem] right-[1.5rem] font-display text-[3.5rem] leading-none text-gold opacity-15 select-none pointer-events-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>

            {/* Star rating */}
            <div className="flex gap-[2px] mb-5">
              {Array.from({ length: review.rating }).map((_, i) => (
                <svg
                  key={i}
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-gold"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            {/* Review text */}
            <p className="font-body italic text-[0.93rem] leading-[1.85] text-[#DDDBD8] mb-6 flex-1">
              {review.text}
            </p>

            {/* Author section */}
            <div className="flex items-center gap-3 mt-auto">
              {/* Avatar with initials */}
              <div className="w-10 h-10 rounded-full bg-[rgba(171,139,103,0.15)] flex items-center justify-center shrink-0">
                <span className="font-display text-[1rem] text-accent-light">
                  {getInitials(review.name)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-[0.88rem] text-cream">
                  {review.name}
                </span>
                <span className="font-body text-[0.74rem] text-taupe-dark">
                  {review.treatment}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
