"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Section,
  type SectionVariant,
  type SectionLayout,
  type SectionPadding,
  type PresetKey,
} from "@/components/layout/section";
import Image from "next/image";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { cn } from "@/lib/utils";

const filterOptions = ["Alles", "Microblading", "Powder Brows", "Combi Brows"];

/** Fallback placeholder items when no Sanity gallery data is available */
const fallbackGalleryItems = [
  { label: "Microblading", gradient: "warm" as const, aspect: "portrait" as const },
  { label: "Lip Blush", gradient: "cool" as const, aspect: "landscape" as const },
  { label: "Lip Blush", gradient: "sage" as const, aspect: "landscape" as const },
  { label: "Healed Result", gradient: "gold" as const, aspect: "landscape" as const },
];

interface GalleryItem { image?: string; label?: string; layout?: string }

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

interface ResultsSectionProps {
  variant?: SectionVariant;
  layout?: SectionLayout;
  padding?: SectionPadding;
  preset?: PresetKey;
  showFilters?: boolean;
  /** Gallery items (image URL + label + layout) */
  galleryItems?: GalleryItem[];
  className?: string;
  id?: string;
}

export function ResultsSection({
  variant = "dark",
  layout = "contained",
  padding = "lg",
  preset,
  showFilters = false,
  galleryItems,
  className,
  id,
}: ResultsSectionProps) {
  const [activeFilter, setActiveFilter] = useState("Alles");
  const isDark = variant === "dark";

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
        <span className={cn("text-xs font-body uppercase tracking-[0.3em] mb-4 block", isDark ? "text-taupe" : "text-muted-foreground")}>
          Resultaten
        </span>
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.12] mb-4">
          Echte Resultaten, Echte Vrouwen
        </h2>
        <p className={cn("font-body text-base max-w-2xl mx-auto mb-12", isDark ? "text-accent-soft" : "text-muted-foreground")}>
          Bekijk het verschil. Elke behandeling is uniek en afgestemd op de individuele klant.
        </p>
      </div>

      {showFilters && (
        <motion.div variants={staggerItem} className="flex flex-wrap justify-center gap-3 mb-12">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-5 py-2 text-xs font-body uppercase tracking-widest rounded-full border transition-all duration-300",
                activeFilter === filter
                  ? "bg-accent text-accent-foreground border-accent"
                  : isDark
                    ? "bg-transparent text-taupe border-taupe/30 hover:border-accent/50"
                    : "bg-transparent text-muted-foreground border-border hover:border-accent/50"
              )}
            >
              {filter}
            </button>
          ))}
        </motion.div>
      )}

      {/* Bento grid */}
      <motion.div
        variants={staggerItem}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px] lg:auto-rows-[220px]"
      >
        {(() => {
          const items = galleryItems?.length ? galleryItems : null;
          const gridConfig = [
            { colSpan: "sm:col-span-2 sm:row-span-2", fallback: fallbackGalleryItems[0] },
            { colSpan: "sm:col-span-2 sm:row-span-1", fallback: fallbackGalleryItems[1] },
            { colSpan: "sm:col-span-1 sm:row-span-1", fallback: fallbackGalleryItems[2] },
            { colSpan: "sm:col-span-1 sm:row-span-1", fallback: fallbackGalleryItems[3] },
          ];
          return gridConfig.map((cell, i) => {
            const sanityItem = items?.[i];
            return (
              <div key={i} className={cell.colSpan}>
                {sanityItem?.image ? (
                  <Image
                    src={sanityItem.image}
                    alt={sanityItem.label ?? `Resultaat ${i + 1}`}
                    width={i === 0 ? 800 : 600}
                    height={i === 0 ? 800 : 400}
                    className="h-full w-full object-cover rounded-[var(--radius-lg)]"
                  />
                ) : (
                  <ImagePlaceholder
                    aspect={cell.fallback.aspect}
                    gradient={cell.fallback.gradient}
                    label={sanityItem?.label ?? cell.fallback.label}
                    className="h-full w-full rounded-[var(--radius-lg)]"
                  />
                )}
              </div>
            );
          });
        })()}
      </motion.div>
    </Section>
  );
}
