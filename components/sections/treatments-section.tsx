"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Section,
  type SectionVariant,
  type SectionLayout,
  type SectionPadding,
  type PresetKey,
} from "@/components/layout/section";
import { ArrowRight } from "lucide-react";
import type { Treatment } from "@/data/treatments";

const treatmentImages: Record<string, string> = {
  microblading: "/microblading-behandeling.png",
  "powder-brows": "/powder-brows-portrait.png",
  "combi-brows": "/combi-brows-detail.png",
};

/**
 * Hook: activates a "in-view" state on touch devices when the element
 * scrolls into approximately the centre of the viewport.
 * On pointer devices it always returns false (hover handles it).
 */
function useScrollActivate<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Only enable on touch / no-hover devices
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (!isTouchDevice || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      {
        // Shrink observation zone to the middle ~30% of the viewport
        rootMargin: "-35% 0px -35% 0px",
        threshold: 0.2,
      }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, active };
}

const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

/* ─── Full-size treatment card with scroll-activated hover on mobile ─── */
function TreatmentCard({ treatment }: { treatment: Treatment }) {
  const { ref, active } = useScrollActivate<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      href={`/behandelingen/${treatment.slug}`}
      data-in-view={active || undefined}
      className="group relative block h-[440px] lg:h-[520px] rounded-[var(--radius-lg)] overflow-hidden border border-transparent transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] data-[in-view]:-translate-y-1 data-[in-view]:shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
    >
      {/* Full-bleed background image */}
      <Image
        src={treatmentImages[treatment.slug] ?? ""}
        alt={treatment.name}
        fill
        className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.03] group-data-[in-view]:scale-[1.03]"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:opacity-100 group-data-[in-view]:opacity-100"
        style={{
          background:
            "linear-gradient(to top, rgba(42,40,39,0.75) 0%, transparent 65%)",
        }}
      />
      {/* Darker overlay on hover / scroll-active */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:opacity-100 group-data-[in-view]:opacity-100"
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

        {/* USPs - hidden by default, revealed on hover or scroll-active */}
        <ul className="max-h-0 opacity-0 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:max-h-[200px] group-hover:opacity-100 group-data-[in-view]:max-h-[200px] group-data-[in-view]:opacity-100 mt-2 space-y-1.5">
          {treatment.usps.map((usp) => (
            <li
              key={usp}
              className="flex items-start gap-2 text-[0.82rem] font-body text-white/80"
            >
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

        {/* "Meer Info" link - appears on hover or scroll-active */}
        <span className="inline-flex items-center gap-1.5 mt-3 text-[0.78rem] font-body uppercase tracking-[0.2em] text-gold-light translate-y-3 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:translate-y-0 group-hover:opacity-100 group-data-[in-view]:translate-y-0 group-data-[in-view]:opacity-100">
          Meer Info
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 group-data-[in-view]:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

/* ─── Compact treatment card — half height, for overview page ─── */
function CompactTreatmentCard({ treatment }: { treatment: Treatment }) {
  const { ref, active } = useScrollActivate<HTMLAnchorElement>();
  const hasImage = !!treatmentImages[treatment.slug];

  return (
    <Link
      ref={ref}
      href={`/behandelingen/${treatment.slug}`}
      data-in-view={active || undefined}
      className="group relative block h-[220px] lg:h-[260px] rounded-[var(--radius-lg)] overflow-hidden border border-transparent transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] data-[in-view]:-translate-y-1 data-[in-view]:shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
    >
      {/* Background: image or warm gradient */}
      {hasImage ? (
        <Image
          src={treatmentImages[treatment.slug]}
          alt={treatment.name}
          fill
          className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.05] group-data-[in-view]:scale-[1.05]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div
          className="absolute inset-0 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.05] group-data-[in-view]:scale-[1.05]"
          style={{
            background:
              "linear-gradient(135deg, hsl(30 25% 78%) 0%, hsl(28 30% 62%) 50%, hsl(26 22% 48%) 100%)",
          }}
        />
      )}

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(42,40,39,0.82) 0%, rgba(42,40,39,0.15) 100%)",
        }}
      />
      {/* Darker overlay on hover / scroll-active */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:opacity-100 group-data-[in-view]:opacity-100"
        style={{
          background:
            "linear-gradient(to top, rgba(42,40,39,0.92) 0%, rgba(42,40,39,0.35) 100%)",
        }}
      />

      {/* Content positioned at bottom */}
      <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col">
        {/* Label */}
        <span className="text-[0.65rem] font-body uppercase tracking-[0.25em] text-gold-light mb-1.5">
          {treatment.label}
        </span>

        {/* Treatment name */}
        <h3 className="font-display text-[1.4rem] font-light leading-tight text-white mb-1">
          {treatment.name}
        </h3>

        {/* Price */}
        <span className="font-body text-[0.95rem] text-accent-soft mb-1">
          Vanaf {treatment.priceLabel}
        </span>

        {/* "Meer Info" link - appears on hover or scroll-active */}
        <span className="inline-flex items-center gap-1.5 mt-1.5 text-[0.72rem] font-body uppercase tracking-[0.2em] text-gold-light translate-y-2 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:translate-y-0 group-hover:opacity-100 group-data-[in-view]:translate-y-0 group-data-[in-view]:opacity-100">
          Meer Info
          <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1 group-data-[in-view]:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

interface TreatmentsSectionProps {
  variant?: SectionVariant;
  layout?: SectionLayout;
  padding?: SectionPadding;
  preset?: PresetKey;
  eyebrow?: string;
  title?: string;
  description?: string;
  /** When true, cards are rendered at half height (for overview pages) */
  compact?: boolean;
  /** List of treatments to render. */
  items: Treatment[];
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
  compact = false,
  items,
  className,
  id,
}: TreatmentsSectionProps) {
  const CardComponent = compact ? CompactTreatmentCard : TreatmentCard;

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
        {items.map((treatment) => (
          <motion.div key={treatment.slug} variants={staggerItem}>
            <CardComponent treatment={treatment} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
