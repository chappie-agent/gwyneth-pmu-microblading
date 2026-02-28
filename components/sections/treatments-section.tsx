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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { ArrowRight } from "lucide-react";
import { treatments } from "@/data/treatments";

const cardGradients = ["warm", "cool", "sage"] as const;

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

interface TreatmentsSectionProps {
  variant?: SectionVariant;
  layout?: SectionLayout;
  padding?: SectionPadding;
  preset?: PresetKey;
  eyebrow?: string;
  title?: string;
  description?: string;
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
  className,
  id,
}: TreatmentsSectionProps) {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {treatments.map((treatment, i) => (
          <motion.div key={treatment.slug} variants={staggerItem}>
            <Card className="group relative overflow-hidden border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-500 hover:shadow-lg hover:border-border">
              <div className="overflow-hidden">
                <ImagePlaceholder
                  aspect="landscape"
                  gradient={cardGradients[i % cardGradients.length]}
                  label={treatment.name}
                  className="transition-transform duration-700 group-hover:scale-105 rounded-none"
                />
              </div>

              <CardHeader className="pb-0">
                <Badge variant="outline" className="w-fit mb-2 text-[10px] tracking-widest uppercase">
                  {treatment.label}
                </Badge>
                <CardTitle className="font-display text-xl font-light">
                  {treatment.name}
                </CardTitle>
                <p className="font-display text-lg text-accent">
                  {treatment.priceLabel}
                </p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2">
                  {treatment.usps.map((usp) => (
                    <li
                      key={usp}
                      className="flex items-start gap-2 text-sm font-body text-muted-foreground"
                    >
                      <span className="mt-2 h-1 w-1 rounded-full bg-accent shrink-0" />
                      {usp}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button asChild variant="outline" className="w-full group/btn">
                  <Link href={`/behandelingen/${treatment.slug}`}>
                    Bekijk Behandeling
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
