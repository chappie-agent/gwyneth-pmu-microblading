import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { CTASection } from "@/components/sections/cta-section";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Over Mij — Gwyneth PMU",
  description:
    "Leer meer over Gwyneth, gecertificeerd PMU specialist met jarenlange ervaring.",
};

const trustCards = [
  {
    title: "Gecertificeerd PMU Specialist",
    description:
      "Internationale certificering in permanente make-up technieken. Jaarlijkse opfriscoursen verplicht.",
  },
  {
    title: "500+ Gelukkige Clienten",
    description:
      "Vertrouwd door honderden clienten die hun perfecte look hebben bereikt.",
  },
  {
    title: "Jarenlange Ervaring",
    description:
      "8+ jaar ervaring met microblading, powder brows, en combi brows. Continu leren en innoveren.",
  },
];

function TrustCardsSection() {
  return (
    <Section variant="sage" padding="lg">
      <div className="text-center mb-16">
        <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
          Waarom Gwyneth
        </span>
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.12] mb-4">
          Expertise & Vertrouwen
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {trustCards.map((card) => (
          <Card
            key={card.title}
            className="border-border/30 bg-background/50 backdrop-blur-sm"
          >
            <CardContent className="pt-6">
              <h3 className="font-display text-lg font-light mb-3">
                {card.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export default function OverPage() {
  return (
    <>
      <HeroSection
        variant="accent"
        breadcrumb
        title="Gwyneth — Permanente Make-up Specialist"
        description="Gepassioneerd over perfectie. Gespecialiseerd in natuurlijke schoonheid. Gecertificeerd in internationale standaarden."
      />
      <AboutSection />
      <TrustCardsSection />
      <CTASection
        variant="accent"
        padding="md"
        title="Laten We Samenwerken"
        description="Klaar om jouw natuurlijke schoonheid te versterken? Neem vandaag nog contact op."
        cta={{ label: "Plan Jouw Intake", href: "/boeken" }}
      />
    </>
  );
}
