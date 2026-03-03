import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { ContactSection } from "@/components/sections/contact-section";
import { MapSection } from "@/components/sections/map-section";
import { CTASection } from "@/components/sections/cta-section";
import { siteConfig } from "@/data/site";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Contact — Gwyneth PMU",
  description:
    "Neem contact op voor vragen of om een afspraak te maken.",
};

export default async function ContactPage() {
  const { data: settingsData } = await sanityFetch({ query: SITE_SETTINGS_QUERY });

  // Dual-source fallback
  const settings = settingsData ?? siteConfig;

  return (
    <>
      <HeroSection
        variant="static"
        breadcrumb
        title="Laten We Kennismaken!"
        description="Heb je vragen? Wil je een afspraak maken? Neem contact met ons op!"
      />
      <ContactSection variant="default" layout="split" padding="lg" siteConfig={settings} />
      <MapSection />
      <CTASection
        variant="accent"
        padding="md"
        title="Boek Je Afspraak Nu"
        description="Klaar om te starten? Plan direct je intake gesprek online."
        cta={{ label: "Boek Nu", href: "/boeken" }}
      />
    </>
  );
}
