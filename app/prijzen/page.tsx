import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";
import { Section } from "@/components/layout/section";
import { pricingTiers, whatsIncluded } from "@/data/pricing";
import { paymentFAQ } from "@/data/faq";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Prijzen | Gwyneth PMU",
  description:
    "Transparante prijzen voor alle PMU behandelingen. Geen verborgen kosten.",
};

function WhatsIncludedSection() {
  return (
    <Section variant="light" padding="lg">
      <div className="text-center mb-16">
        <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
          Alles Inbegrepen
        </span>
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.12] mb-4">
          Wat Zit Er In De Prijs?
        </h2>
        <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto">
          Elke behandeling bevat alles wat je nodig hebt voor een perfecte
          ervaring van begin tot eind.
        </p>
      </div>

      {/* Four cards explaining what's included */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {/* Consult card */}
        <div className="rounded-[var(--radius-lg)] border border-border/50 bg-background/50 p-6">
          <h3 className="font-display text-lg font-light mb-3">
            {whatsIncluded.consult.title}
          </h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            {whatsIncluded.consult.description}
          </p>
        </div>

        {/* Treatment card */}
        <div className="rounded-[var(--radius-lg)] border border-border/50 bg-background/50 p-6">
          <h3 className="font-display text-lg font-light mb-3">
            {whatsIncluded.treatment.title}
          </h3>
          <ul className="space-y-2">
            {whatsIncluded.treatment.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm font-body text-muted-foreground"
              >
                <Check className="size-4 text-accent mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Aftercare card */}
        <div className="rounded-[var(--radius-lg)] border border-border/50 bg-background/50 p-6">
          <h3 className="font-display text-lg font-light mb-3">
            {whatsIncluded.aftercare.title}
          </h3>
          <ul className="space-y-2">
            {whatsIncluded.aftercare.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm font-body text-muted-foreground"
              >
                <Check className="size-4 text-accent mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Touch-up card */}
        <div className="rounded-[var(--radius-lg)] border border-border/50 bg-background/50 p-6">
          <h3 className="font-display text-lg font-light mb-3">
            {whatsIncluded.touchUp.title}
          </h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            {whatsIncluded.touchUp.description}
          </p>
        </div>
      </div>

      {/* No extra costs */}
      <div className="text-center">
        <h3 className="font-display text-xl font-light mb-6">
          Geen Extra Kosten
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {whatsIncluded.noExtraCosts.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-2 text-sm font-body"
            >
              <Check className="size-4 text-accent shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default function PrijzenPage() {
  const pricingItems = pricingTiers;
  const faqItems = paymentFAQ;

  return (
    <>
      <HeroSection
        variant="static"
        breadcrumb
        title="Transparante Prijzen"
        description="Geen verborgen kosten. Alles is inbegrepen. Hier zie je precies waar je geld naar gaat."
      />
      <PricingSection variant="default" padding="lg" tiers={pricingItems} />
      <WhatsIncludedSection />
      <FAQSection
        items={faqItems}
        variant="default"
        layout="narrow"
        padding="lg"
        eyebrow="Prijzen & Betaling"
        title="Veelgestelde Vragen Over Prijzen"
      />
      <CTASection
        variant="accent"
        padding="md"
        title="Boek Je Afspraak Vandaag"
        description="Klaar om de stap te zetten? Plan je intake gesprek en ontdek wat PMU voor jou kan betekenen."
        cta={{ label: "Plan Jouw Intake", href: "/boeken" }}
      />
    </>
  );
}
