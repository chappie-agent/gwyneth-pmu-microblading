import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { ContactSection } from "@/components/sections/contact-section";
import { MapSection } from "@/components/sections/map-section";
import { CTASection } from "@/components/sections/cta-section";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Gwyneth PMU Zoetermeer | Maak een Afspraak",
  description:
    "Plan je gratis intake bij Gwyneth PMU in Zoetermeer (Hekendorpstraat 54). Bel +31 6 83 15 68 60 of boek direct online.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <HeroSection
        variant="static"
        breadcrumb
        title="Laten We Kennismaken!"
        description="Heb je vragen? Wil je een afspraak maken? Neem contact met ons op!"
      />
      <ContactSection variant="default" layout="split" padding="lg" siteConfig={siteConfig} />
      <MapSection />
      <CTASection
        variant="accent"
        padding="md"
        title="Boek Je Afspraak Nu"
        description="Klaar om te starten? Plan direct je intake gesprek online."
        cta={{ label: "Boek Nu", href: siteConfig.bookingUrl }}
      />
    </>
  );
}
