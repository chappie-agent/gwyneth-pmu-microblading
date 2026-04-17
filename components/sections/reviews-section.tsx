"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Section,
  type SectionVariant,
  type SectionLayout,
  type SectionPadding,
  type PresetKey,
} from "@/components/layout/section";
import type { Review } from "@/data/reviews";

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
  /** Reviews to display. */
  reviews: Review[];
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

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[var(--radius-md)] border border-white/[0.06] bg-white/[0.03] p-[2.4rem]">
      <span
        className="absolute -top-[10rem] -right-[3rem] z-0 font-display text-[40rem] leading-none text-gold/[0.09] select-none pointer-events-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <div className="relative z-10 flex gap-[2px] mb-5">
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

      <p className="relative z-10 font-body italic text-[0.93rem] leading-[1.85] text-[#DDDBD8] mb-6 flex-1">
        {review.text}
      </p>

      <div className="relative z-10 flex items-center gap-3 mt-auto">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[rgba(171,139,103,0.15)] flex items-center justify-center shrink-0">
          {review.image ? (
            <Image
              src={review.image}
              alt={review.name}
              fill
              sizes="40px"
              className="object-cover"
            />
          ) : (
            <span className="font-display text-[1rem] text-accent-light">
              {getInitials(review.name)}
            </span>
          )}
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
    </div>
  );
}

export function ReviewsSection({
  variant = "dark",
  layout = "contained",
  padding = "lg",
  preset,
  reviews,
  className,
  id,
}: ReviewsSectionProps) {
  const [perPage, setPerPage] = useState(3);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setPerPage(mq.matches ? 3 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const useCarousel = reviews.length > 3;

  useEffect(() => {
    if (!useCarousel || isPaused) return;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    const id = window.setInterval(() => {
      setAnimate(true);
      setActiveIndex((i) => i + 1);
    }, 4500);
    return () => window.clearInterval(id);
  }, [useCarousel, isPaused]);

  const slides = useMemo(
    () => (useCarousel ? [...reviews, ...reviews.slice(0, perPage)] : reviews),
    [reviews, perPage, useCarousel],
  );

  const slideWidthPct = 100 / perPage;

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

      {!useCarousel ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <motion.div key={review.name} variants={staggerItem}>
              <ReviewCard review={review} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <div
            className="overflow-hidden -mx-3"
            role="region"
            aria-roledescription="carousel"
            aria-label="Klantreviews"
          >
            <motion.div
              className="flex"
              animate={{ x: `-${activeIndex * slideWidthPct}%` }}
              transition={
                animate
                  ? { duration: 1.1, ease: [0.45, 0, 0.25, 1] }
                  : { duration: 0 }
              }
              onAnimationComplete={() => {
                if (activeIndex >= reviews.length) {
                  setAnimate(false);
                  setActiveIndex(0);
                } else if (!animate) {
                  setAnimate(true);
                }
              }}
            >
              {slides.map((review, slideIndex) => (
                <div
                  key={`${review.name}-${slideIndex}`}
                  className="shrink-0 px-3"
                  style={{ width: `${slideWidthPct}%` }}
                >
                  <ReviewCard review={review} />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center items-center gap-2 mt-10">
            {reviews.map((_, i) => {
              const isActive = i === activeIndex % reviews.length;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setAnimate(true);
                    setActiveIndex(i);
                  }}
                  aria-label={`Ga naar review ${i + 1} van ${reviews.length}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`h-[6px] rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-8 bg-gold"
                      : "w-[6px] bg-white/25 hover:bg-white/40"
                  }`}
                />
              );
            })}
          </div>
        </div>
      )}
    </Section>
  );
}
