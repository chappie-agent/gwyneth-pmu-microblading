"use client";

import { motion } from "framer-motion";
import {
  Section,
  type SectionVariant,
  type SectionLayout,
  type SectionPadding,
  type PresetKey,
} from "@/components/layout/section";
import { Sparkles, ShieldCheck, Palette, Gem, type LucideIcon } from "lucide-react";
import { uspItems } from "@/data/treatments";

const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  "shield-check": ShieldCheck,
  palette: Palette,
  gem: Gem,
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

interface USPSectionProps {
  variant?: SectionVariant;
  layout?: SectionLayout;
  padding?: SectionPadding;
  preset?: PresetKey;
  className?: string;
  id?: string;
}

export function USPSection({
  variant = "sage",
  layout = "contained",
  padding = "lg",
  preset,
  className,
  id,
}: USPSectionProps) {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {uspItems.map((item) => {
          const Icon = iconMap[item.icon] ?? Sparkles;
          return (
            <motion.div
              key={item.title}
              variants={staggerItem}
              className="group rounded-[var(--radius-lg)] border border-border/50 bg-background/30 p-8 text-center transition-all duration-500 hover:shadow-md hover:bg-background/60"
            >
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <Icon className="size-5 text-accent" />
              </div>
              <h3 className="font-display text-lg mb-2">{item.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
