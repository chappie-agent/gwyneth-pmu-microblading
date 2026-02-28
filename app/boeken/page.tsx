import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, AlertTriangle, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookingFormSection } from "./booking-form";

export const metadata: Metadata = {
  title: "Boeken — Gwyneth PMU",
  description:
    "Boek je PMU behandeling online. Kies je behandeling, datum en tijd.",
};

const voorbereidingErvoor = [
  "Geen alcohol drinken (24 uur van tevoren)",
  "Geen bloedverdunners innemen",
  "Geen wenkbrauwen harsen, threaden of epileren (1 week van tevoren)",
  "Geen retinol of AHA/BHA producten gebruiken op het gebied",
];

const voorbereidingDag = [
  "Kom met een schoon gezicht (geen make-up op de wenkbrauwen)",
  "Neem je favoriete wenkbrauwproducten mee als referentie",
  "Eet goed voor je komt — de behandeling duurt 2-3 uur",
  "Neem eventueel een hoofdtelefoon mee voor ontspanning",
];

const cancellationPolicies = [
  {
    title: "Tot 48 Uur Ervoor",
    description: "Volledige terugbetaling. Geen vragen gesteld.",
    icon: Check,
    iconColor: "text-green-600",
  },
  {
    title: "24-48 Uur Ervoor",
    description: "50% terugbetaling. Rescheduling mogelijk.",
    icon: Clock,
    iconColor: "text-amber-500",
  },
  {
    title: "Minder Dan 24 Uur",
    description: "Geen terugbetaling. Rescheduling kan.",
    icon: AlertTriangle,
    iconColor: "text-orange-500",
  },
  {
    title: "No-Show",
    description: "Geen terugbetaling. Boeking vervalt.",
    icon: X,
    iconColor: "text-red-500",
  },
];

function PreparationSection() {
  return (
    <Section variant="light" padding="lg">
      <div className="text-center mb-16">
        <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
          Voorbereiding
        </span>
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.12] mb-4">
          Wat Je Kunt Doen
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        {/* De Dag Ervoor */}
        <div>
          <h3 className="font-display text-xl font-light mb-6">
            De Dag Ervoor
          </h3>
          <ul className="space-y-3">
            {voorbereidingErvoor.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm font-body text-muted-foreground"
              >
                <Check className="size-4 text-accent mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* De Dag Van De Behandeling */}
        <div>
          <h3 className="font-display text-xl font-light mb-6">
            De Dag Van De Behandeling
          </h3>
          <ul className="space-y-3">
            {voorbereidingDag.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm font-body text-muted-foreground"
              >
                <Check className="size-4 text-accent mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Important note */}
      <div className="mt-12 max-w-2xl mx-auto">
        <Card className="border-amber-200/50 bg-amber-50/50 dark:border-amber-500/20 dark:bg-amber-900/10">
          <CardContent className="flex items-start gap-4 pt-6">
            <AlertTriangle className="size-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-display text-base font-medium mb-1">
                Belangrijk
              </p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Ben je zwanger, gebruik je bloedverdunners, of heb je een
                huidaandoening? Neem dan vooraf contact met ons op zodat we
                samen kunnen kijken of PMU geschikt is voor jou.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}

function CancellationPolicySection() {
  return (
    <Section variant="default" padding="lg">
      <div className="text-center mb-16">
        <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
          Beleid
        </span>
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.12] mb-4">
          Annulerings- & Rescheduling Beleid
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cancellationPolicies.map((policy) => {
          const Icon = policy.icon;
          return (
            <Card
              key={policy.title}
              className="border-border/50 bg-background/50"
            >
              <CardContent className="pt-6 text-center">
                <Icon
                  className={cn("size-8 mx-auto mb-4", policy.iconColor)}
                />
                <h3 className="font-display text-base font-light mb-2">
                  {policy.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {policy.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

export default function BoekenPage() {
  return (
    <>
      <HeroSection
        variant="static"
        breadcrumb
        title="Boek Je Afspraak"
        description="Stap een naar je perfecte wenkbrauwen. Kies je behandeling en datum."
      />
      <BookingFormSection />
      <PreparationSection />
      <CancellationPolicySection />
      <CTASection
        variant="accent"
        padding="md"
        title="Laten We Beginnen!"
        description="Heb je nog vragen? Neem gerust contact op voor een vrijblijvend gesprek."
        cta={{ label: "Neem Contact Op", href: "/contact" }}
      />
    </>
  );
}
