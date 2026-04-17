import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { ResultsSection } from "@/components/sections/results-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { CTASection } from "@/components/sections/cta-section";
import { reviews } from "@/data/reviews";

export const metadata: Metadata = {
  title: "Resultaten | Gwyneth PMU",
  description:
    "Bekijk echte resultaten van permanente make-up behandelingen.",
};

export default function ResultatenPage() {
  return (
    <>
      <HeroSection
        variant="static"
        breadcrumb
        title="Echte Resultaten, Echte Vrouwen"
        description="Bekijk hoe permanente make-up het verschil maakt. Elke transformatie is uniek en aangepast."
      />
      <ResultsSection showFilters variant="default" padding="lg" />
      <ReviewsSection variant="default" padding="lg" reviews={reviews} />
      <CTASection
        variant="accent"
        padding="md"
        title="Jij Bent De Volgende Success Story"
        description="Laten we samen werken aan jouw perfecte look. Plan je gratis consult vandaag."
        cta={{ label: "Boek Nu", href: "/boeken" }}
      />
    </>
  );
}
