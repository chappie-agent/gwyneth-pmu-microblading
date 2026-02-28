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
  variant = "light",
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[2rem]">
        {uspItems.map((item) => {
          const Icon = iconMap[item.icon] ?? Sparkles;
          return (
            <motion.div
              key={item.title}
              variants={staggerItem}
              className="group text-center p-[2rem_1.2rem] rounded-[var(--radius-md)] transition-colors duration-300 hover:bg-warm-white"
            >
              {/* Icon container: 48x48, no background */}
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center">
                <Icon
                  size={32}
                  className="text-accent"
                  strokeWidth={1}
                  fill="none"
                />
              </div>
              <h3 className="font-display text-[1.1rem] mb-2">{item.title}</h3>
              <p className="font-body text-[0.84rem] text-taupe-dark leading-[1.7]">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
