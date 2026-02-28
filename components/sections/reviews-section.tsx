"use client";

import { motion } from "framer-motion";
import {
  Section,
  type SectionVariant,
  type SectionLayout,
  type SectionPadding,
  type PresetKey,
} from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import { reviews } from "@/data/reviews";

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
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
      className={className}
      id={id}
    >
      <div className="text-center mb-16">
        <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
          Reviews
        </span>
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.12] mb-4">
          Wat Klanten Zeggen
        </h2>
        <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto mb-12">
          De mooiste complimenten komen van tevreden klanten.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <motion.div key={review.name} variants={staggerItem}>
            <Card className="h-full border-border/30 bg-background/5 backdrop-blur-sm">
              <CardContent className="flex flex-col h-full pt-6">
                {/* Star rating */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 text-gold fill-gold"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-body italic text-base leading-relaxed flex-1 mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>

                <Separator className="mb-4 bg-border/30" />

                {/* Attribution */}
                <div className="flex items-center justify-between">
                  <span className="font-display text-base">{review.name}</span>
                  <Badge variant="outline" className="text-[10px] tracking-wider uppercase">
                    {review.treatment}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
