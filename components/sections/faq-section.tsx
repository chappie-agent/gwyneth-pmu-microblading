"use client";

import { motion } from "framer-motion";
import {
  Section,
  type SectionVariant,
  type SectionLayout,
  type SectionPadding,
  type PresetKey,
} from "@/components/layout/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { homeFAQ, type FAQItem, type FAQCategory } from "@/data/faq";

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

interface FAQSectionProps {
  variant?: SectionVariant;
  layout?: SectionLayout;
  padding?: SectionPadding;
  preset?: PresetKey;
  items?: FAQItem[];
  categories?: FAQCategory[];
  eyebrow?: string;
  title?: string;
  className?: string;
  id?: string;
}

export function FAQSection({
  variant = "default",
  layout = "narrow",
  padding = "lg",
  preset,
  items,
  categories,
  eyebrow = "FAQ",
  title = "Veelgestelde Vragen",
  className,
  id,
}: FAQSectionProps) {
  // Determine which items to render
  const faqItems = items ?? (categories ? undefined : homeFAQ);

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
      </div>

      {/* Simple item list */}
      {faqItems && (
        <motion.div variants={staggerItem}>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="font-display text-base text-left hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      )}

      {/* Grouped by category */}
      {categories && (
        <div className="space-y-12">
          {categories.map((category) => (
            <motion.div key={category.slug} variants={staggerItem}>
              <h3 className="font-display text-xl mb-6">{category.title}</h3>
              <Accordion type="single" collapsible className="w-full">
                {category.items.map((item, i) => (
                  <AccordionItem key={i} value={`${category.slug}-${i}`}>
                    <AccordionTrigger className="font-display text-base text-left hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-body text-muted-foreground leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      )}
    </Section>
  );
}
