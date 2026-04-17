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
import { coreTreatments, homeProcessSteps, uspItems } from "@/data/treatments";
import { pricingTiers } from "@/data/pricing";
import { homeFAQ } from "@/data/faq";
import { reviews, placeholderReviewImages } from "@/data/reviews";
import { siteConfig } from "@/data/site";
import { sanityFetch } from "@/sanity/lib/live";
import {
  CORE_TREATMENTS_QUERY,
  ALL_PRICING_QUERY,
  FAQ_BY_PAGE_QUERY,
  ALL_REVIEWS_QUERY,
  SITE_SETTINGS_QUERY,
  RESULT_GALLERY_QUERY,
} from "@/sanity/lib/queries";

export default async function Home() {
  const { data: treatmentsData } = await sanityFetch({ query: CORE_TREATMENTS_QUERY });
  const { data: pricingData } = await sanityFetch({ query: ALL_PRICING_QUERY });
  const { data: faqData } = await sanityFetch({ query: FAQ_BY_PAGE_QUERY, params: { page: "home" } });
  const { data: reviewsData } = await sanityFetch({ query: ALL_REVIEWS_QUERY });
  const { data: settingsData } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const { data: galleryData } = await sanityFetch({ query: RESULT_GALLERY_QUERY });

  // Dual-source fallbacks: use Sanity data if available, otherwise fall back to static data
  const treatmentsItems = treatmentsData?.length ? treatmentsData : coreTreatments;
  const flagshipSlugs = ["microblading", "powder-brows", "combi-brows"];
  const allPricing = pricingData?.length ? pricingData : pricingTiers;
  const pricingItems = flagshipSlugs
    .map((slug) => allPricing.find((t: any) => t.slug === slug))
    .filter((t: any): t is NonNullable<typeof t> => Boolean(t));
  const faqItems = faqData?.length ? faqData : homeFAQ;
  const rawReviews = reviewsData?.length ? reviewsData : reviews;
  // TODO: vervang placeholder-foto's door echte klantfoto's (via Sanity `image`-veld)
  const reviewsItems = rawReviews.map((r: any, i: number) => ({
    ...r,
    treatment: r.treatment ?? r.treatmentName,
    image: r.image ?? placeholderReviewImages[i % placeholderReviewImages.length],
  }));
  const settings = settingsData ?? siteConfig;

  return (
    <>
      <HeroSection
        variant="default"
        eyebrow={settings.subtitle ?? "Permanente Make-up Specialist"}
        title={settings.heroTitle ?? "Word elke dag wakker met perfect gevormde wenkbrauwen"}
        titleAccent={settings.heroTitleAccent ?? "perfect gevormde"}
        description={settings.heroDescription ?? "Verfijnde PMU die jouw natuurlijke schoonheid versterkt. Subtiel, persoonlijk, en op maat gemaakt voor jou."}
        trustItems={
          settings.trustItems?.map((item: any) =>
            typeof item === "string" ? item : item.label ?? item.value
          ) ?? ["Gecertificeerd", "5.0 Google Reviews", "500+ klanten"]
        }
        primaryCta={{ label: "Plan Intake Gesprek", href: "/boeken" }}
        secondaryCta={{ label: "Bekijk Behandelingen", href: "/behandelingen" }}
        heroImage={settings.heroImage}
        showScrollIndicator
      />
      <TreatmentsSection variant="default" padding="lg" className="dark:bg-charcoal" items={treatmentsItems} />
      <ResultsSection variant="dark" padding="lg" galleryItems={galleryData?.items} />
      <ProcessSection variant="light" padding="xl" steps={homeProcessSteps} />
      <AboutSection aboutImage={settings.aboutImage} />
      <USPSection variant="light" padding="lg" items={uspItems} />
      <ReviewsSection variant="dark" padding="lg" reviews={reviewsItems} />
      <PricingSection variant="default" padding="lg" tiers={pricingItems} />
      <FAQSection variant="light" layout="narrow" padding="lg" items={faqItems} />
      <CTASection
        variant="dark"
        padding="md"
        className="dark:bg-cream dark:text-charcoal"
        eyebrow="Klaar voor de Volgende Stap?"
        title="Word elke dag wakker met perfecte wenkbrauwen"
        description="Plan een vrijblijvend intake gesprek en ontdek wat PMU voor jou kan betekenen."
        cta={{ label: "Plan Jouw Intake", href: "/boeken" }}
      />
      <ContactSection variant="default" layout="split" padding="lg" siteConfig={settings} />
    </>
  );
}
