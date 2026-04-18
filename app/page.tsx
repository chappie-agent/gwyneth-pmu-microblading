import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/hero-section";
import { TreatmentsSection } from "@/components/sections/treatments-section";

const ProcessSection = dynamic(() =>
  import("@/components/sections/process-section").then((m) => m.ProcessSection)
);
const AboutSection = dynamic(() =>
  import("@/components/sections/about-section").then((m) => m.AboutSection)
);
const USPSection = dynamic(() =>
  import("@/components/sections/usp-section").then((m) => m.USPSection)
);
const ReviewsSection = dynamic(() =>
  import("@/components/sections/reviews-section").then((m) => m.ReviewsSection)
);
const PricingSection = dynamic(() =>
  import("@/components/sections/pricing-section").then((m) => m.PricingSection)
);
const FAQSection = dynamic(() =>
  import("@/components/sections/faq-section").then((m) => m.FAQSection)
);
const CTASection = dynamic(() =>
  import("@/components/sections/cta-section").then((m) => m.CTASection)
);
const ContactSection = dynamic(() =>
  import("@/components/sections/contact-section").then((m) => m.ContactSection)
);

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
      <AboutSection aboutImage="/gwyneth.webp" />
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
