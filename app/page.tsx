import { HeroSection } from "@/components/sections/hero-section";
import { TreatmentsSection } from "@/components/sections/treatments-section";
// HIDDEN until real client photos are available — restore when ready
// import { ResultsSection } from "@/components/sections/results-section";
import { ProcessSection } from "@/components/sections/process-section";
import { AboutSection } from "@/components/sections/about-section";
import { USPSection } from "@/components/sections/usp-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";
import { ContactSection } from "@/components/sections/contact-section";
import { coreTreatments, homeProcessSteps, uspItems } from "@/data/treatments";
import { pricingTiers } from "@/data/pricing";
import { homeFAQ } from "@/data/faq";
import { reviews } from "@/data/reviews";
import { siteConfig } from "@/data/site";

export default function Home() {
  const flagshipSlugs = ["microblading", "powder-brows", "combi-brows"];
  const pricingItems = flagshipSlugs
    .map((slug) => pricingTiers.find((t) => t.slug === slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <>
      <HeroSection
        variant="default"
        eyebrow={siteConfig.subtitle ?? "Permanente Make-up Specialist"}
        title={siteConfig.heroTitle ?? "Word elke dag wakker met perfect gevormde wenkbrauwen"}
        titleAccent="perfect gevormde"
        description={siteConfig.heroDescription ?? "Verfijnde PMU die jouw natuurlijke schoonheid versterkt. Subtiel, persoonlijk, en op maat gemaakt voor jou."}
        trustItems={siteConfig.trustItems}
        primaryCta={{ label: "Plan Intake Gesprek", href: siteConfig.bookingUrl }}
        secondaryCta={{ label: "Bekijk Behandelingen", href: "/behandelingen" }}
        showScrollIndicator
      />
      <TreatmentsSection variant="default" padding="lg" className="dark:bg-charcoal" items={coreTreatments} />
      {/* HIDDEN until real client photos are available — restore when ready */}
      {/* <ResultsSection variant="dark" padding="lg" /> */}
      <ProcessSection variant="light" padding="xl" steps={homeProcessSteps} />
      <AboutSection />
      <USPSection variant="light" padding="lg" items={uspItems} />
      <ReviewsSection variant="dark" padding="lg" reviews={reviews} />
      <PricingSection variant="default" padding="lg" tiers={pricingItems} />
      <FAQSection variant="light" layout="narrow" padding="lg" items={homeFAQ} />
      <CTASection
        variant="dark"
        padding="md"
        className="dark:bg-cream dark:text-charcoal"
        eyebrow="Klaar voor de Volgende Stap?"
        title="Word elke dag wakker met perfecte wenkbrauwen"
        description="Plan een vrijblijvend intake gesprek en ontdek wat PMU voor jou kan betekenen."
        cta={{ label: "Plan Jouw Intake", href: siteConfig.bookingUrl }}
      />
      <ContactSection variant="default" layout="split" padding="lg" siteConfig={siteConfig} />
    </>
  );
}
