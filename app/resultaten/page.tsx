import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { ResultsSection } from "@/components/sections/results-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { CTASection } from "@/components/sections/cta-section";
import { reviews } from "@/data/reviews";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_REVIEWS_QUERY, RESULT_GALLERY_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Resultaten — Gwyneth PMU",
  description:
    "Bekijk echte resultaten van permanente make-up behandelingen.",
};

export default async function ResultatenPage() {
  const { data: reviewsData } = await sanityFetch({ query: ALL_REVIEWS_QUERY });
  const { data: galleryData } = await sanityFetch({ query: RESULT_GALLERY_QUERY });

  // Dual-source fallback
  const reviewsItems = reviewsData?.length ? reviewsData : reviews;

  return (
    <>
      <HeroSection
        variant="static"
        breadcrumb
        title="Echte Resultaten, Echte Vrouwen"
        description="Bekijk hoe permanente make-up het verschil maakt. Elke transformatie is uniek en aangepast."
      />
      <ResultsSection showFilters variant="default" padding="lg" galleryItems={galleryData?.items} />
      <ReviewsSection variant="default" padding="lg" reviews={reviewsItems} />
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
