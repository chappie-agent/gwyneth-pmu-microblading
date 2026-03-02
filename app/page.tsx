import { HeroSection } from "@/components/sections/hero-section";
import { TreatmentsSection } from "@/components/sections/treatments-section";
import { ResultsSection } from "@/components/sections/results-section";
import { ProcessSection } from "@/components/sections/process-section";
import { AboutSection } from "@/components/sections/about-section";
import { USPSection } from "@/components/sections/usp-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <>
      <HeroSection
        variant="default"
        eyebrow="Permanente Make-up Specialist"
        title="Word elke dag wakker met perfect gevormde wenkbrauwen"
        titleAccent="perfect gevormde"
        description="Verfijnde PMU die jouw natuurlijke schoonheid versterkt. Subtiel, persoonlijk, en op maat gemaakt voor jou."
        trustItems={["Gecertificeerd", "5.0 Google Reviews", "500+ klanten"]}
        primaryCta={{ label: "Plan Intake Gesprek", href: "/boeken" }}
        secondaryCta={{ label: "Bekijk Behandelingen", href: "/behandelingen" }}
        showScrollIndicator
      />
      <TreatmentsSection variant="default" padding="lg" className="dark:bg-charcoal" />
      <ResultsSection variant="dark" padding="lg" />
      <ProcessSection variant="light" padding="xl" />
      <AboutSection />
      <USPSection variant="light" padding="lg" />
      <ReviewsSection variant="dark" padding="lg" />
      <PricingSection variant="default" padding="lg" />
      <FAQSection variant="light" layout="narrow" padding="lg" />
      <CTASection
        variant="dark"
        padding="md"
        className="dark:bg-cream dark:text-charcoal"
        eyebrow="Klaar voor de Volgende Stap?"
        title="Word elke dag wakker met perfecte wenkbrauwen"
        description="Plan een vrijblijvend intake gesprek en ontdek wat PMU voor jou kan betekenen."
        cta={{ label: "Plan Jouw Intake", href: "/boeken" }}
      />
      <ContactSection variant="default" layout="split" padding="lg" />
    </>
  );
}
