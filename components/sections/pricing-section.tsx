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
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import { pricingTiers } from "@/data/pricing";
import { cn } from "@/lib/utils";

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

interface PricingSectionProps {
  variant?: SectionVariant;
  layout?: SectionLayout;
  padding?: SectionPadding;
  preset?: PresetKey;
  single?: string;
  showIncludes?: boolean;
  className?: string;
  id?: string;
}

export function PricingSection({
  variant = "default",
  layout = "contained",
  padding = "lg",
  preset,
  single,
  showIncludes = true,
  className,
  id,
}: PricingSectionProps) {
  const tiers = single
    ? pricingTiers.filter((t) => t.slug === single)
    : pricingTiers;

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
          Prijzen
        </span>
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.12] mb-4">
          Transparante Tarieven
        </h2>
        <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto mb-12">
          Geen verborgen kosten. Inclusief consult, behandeling en alle materialen.
        </p>
      </div>

      <div
        className={cn(
          "grid gap-6",
          single
            ? "grid-cols-1 max-w-md mx-auto"
            : tiers.length <= 3
              ? "grid-cols-1 md:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {tiers.map((tier) => (
          <motion.div key={tier.slug} variants={staggerItem}>
            <Card
              className={cn(
                "h-full relative overflow-hidden border-border/50 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]",
                tier.featured &&
                  "border-accent/50 shadow-lg ring-1 ring-accent/20 hover:shadow-[0_12px_40px_rgba(171,139,103,0.2)]"
              )}
            >
              {/* Accent top border for featured */}
              {tier.featured && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
              )}

              <CardHeader className="text-center pb-0">
                {tier.featured && tier.featuredLabel && (
                  <Badge className="mx-auto mb-3 text-[10px] tracking-wider uppercase">
                    {tier.featuredLabel}
                  </Badge>
                )}
                <span className="text-xs font-body uppercase tracking-[0.2em] text-muted-foreground">
                  {tier.label}
                </span>
                <CardTitle className="font-display text-xl font-light mt-1">
                  {tier.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="font-display text-4xl font-light">
                    {tier.priceLabel}
                  </span>
                  <span className="block text-xs text-muted-foreground mt-1 font-body">
                    {tier.includes.some((i) => i.toLowerCase().includes("nabehandeling"))
                      ? "(incl. nabehandeling)"
                      : ""}
                  </span>
                </div>
              </CardHeader>

              {showIncludes && (
                <>
                  <CardContent>
                    <Separator className="mb-6" />
                    <ul className="space-y-3">
                      {tier.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm font-body"
                        >
                          <Check className="size-4 text-accent mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </>
              )}

              <CardFooter className="mt-auto">
                <Button asChild className="w-full">
                  <Link href="/boeken">Boek Nu</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
