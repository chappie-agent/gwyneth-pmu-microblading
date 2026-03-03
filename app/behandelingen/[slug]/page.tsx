import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, X, Clock } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { HeroSection } from "@/components/sections/hero-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ResultsSection } from "@/components/sections/results-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";
import Image from "next/image";
import { Section } from "@/components/layout/section";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { urlFor } from "@/sanity/lib/image";
import { treatments } from "@/data/treatments";
import { pricingTiers } from "@/data/pricing";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import {
  TREATMENT_BY_SLUG_QUERY,
  TREATMENT_SLUGS_QUERY,
  PRICING_BY_SLUG_QUERY,
  ALL_PRICING_QUERY,
  RESULT_GALLERY_QUERY,
} from "@/sanity/lib/queries";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  // Use client directly instead of sanityFetch (which requires request scope for draftMode)
  const data = await client.fetch(TREATMENT_SLUGS_QUERY);
  if (data?.length) return data.map((t: { slug: string }) => ({ slug: t.slug }));
  // Fallback to static data
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // Try Sanity first
  const { data: sanityTreatment } = await sanityFetch({
    query: TREATMENT_BY_SLUG_QUERY,
    params: { slug },
  });

  const treatment = sanityTreatment ?? treatments.find((t) => t.slug === slug);
  if (!treatment) return {};
  return {
    title: `${treatment.name} — Gwyneth PMU`,
    description: treatment.heroDescription,
  };
}

export default async function TreatmentPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch treatment data from Sanity with static fallback
  const { data: sanityTreatment } = await sanityFetch({
    query: TREATMENT_BY_SLUG_QUERY,
    params: { slug },
  });
  const treatment = sanityTreatment ?? treatments.find((t) => t.slug === slug);
  if (!treatment) notFound();

  // Fetch pricing data from Sanity with static fallback
  const { data: sanityPricing } = await sanityFetch({ query: ALL_PRICING_QUERY });
  const pricingItems = sanityPricing?.length ? sanityPricing : pricingTiers;

  // Fetch gallery data for results section
  const { data: galleryData } = await sanityFetch({ query: RESULT_GALLERY_QUERY });

  const isCore = (treatment.category ?? "core") === "core";

  return (
    <>
      {/* Hero */}
      <HeroSection
        variant="static"
        breadcrumb
        title={treatment.heroTitle}
        description={treatment.heroDescription}
      />

      {/* What Is Section */}
      <Section variant="default" layout="split" padding="lg">
        {treatment.image ? (
          <Image
            src={urlFor(treatment.image).width(700).height(900).quality(85).url()}
            alt={treatment.name}
            width={700}
            height={900}
            className="w-full rounded-[var(--radius-lg)] object-cover"
          />
        ) : (
          <ImagePlaceholder
            aspect="portrait"
            gradient="warm"
            label={treatment.name}
            className="w-full"
          />
        )}
        <div>
          <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground mb-3 block">
            {treatment.whatIs.subtitle}
          </span>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.12] mb-6">
            {treatment.whatIs.title}
          </h2>
          <div className="space-y-4 mb-8 font-body text-base text-muted-foreground leading-relaxed">
            {Array.isArray(treatment.whatIs.content) &&
            typeof treatment.whatIs.content[0] === "string" ? (
              treatment.whatIs.content.map((paragraph: string, i: number) => (
                <p key={i}>{paragraph}</p>
              ))
            ) : (
              <PortableText value={treatment.whatIs.content as any} />
            )}
          </div>
          <ul className="space-y-3">
            {treatment.whatIs.benefits.map((benefit: string) => (
              <li
                key={benefit}
                className="flex items-start gap-3 text-sm font-body"
              >
                <Check className="size-4 text-accent mt-0.5 shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Suitability Section */}
      <Section variant="light" padding="lg">
        <div className="text-center mb-16">
          <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
            Geschiktheid
          </span>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.12] mb-4">
            Is {treatment.name} Geschikt Voor Jou?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Ideal */}
          <div className="rounded-[var(--radius-lg)] border border-border/50 bg-background/50 p-8">
            <h3 className="font-display text-lg mb-6 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                <Check className="size-4 text-accent" />
              </span>
              Ideaal Geschikt Voor
            </h3>
            <ul className="space-y-3">
              {treatment.suitability.ideal.map((item: string) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm font-body text-muted-foreground"
                >
                  <Check className="size-4 text-accent mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Caution */}
          <div className="rounded-[var(--radius-lg)] border border-border/50 bg-background/50 p-8">
            <h3 className="font-display text-lg mb-6 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <X className="size-4 text-muted-foreground" />
              </span>
              Voorzichtigheid Aanbevolen
            </h3>
            <ul className="space-y-3">
              {treatment.suitability.caution.map((item: string) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm font-body text-muted-foreground"
                >
                  <X className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Note */}
        <p className="text-center font-body text-sm text-muted-foreground mt-8 max-w-2xl mx-auto">
          {treatment.suitability.note}
        </p>
      </Section>

      {/* Process */}
      <ProcessSection
        variant="default"
        padding="lg"
        steps={treatment.process}
        title={`Het ${treatment.name} Proces`}
        description={`Van intake tot eindresultaat — zo verloopt jouw ${treatment.name.toLowerCase()} behandeling.`}
      />

      {/* Results — only for core PMU treatments */}
      {isCore && <ResultsSection variant="dark" padding="lg" galleryItems={galleryData?.items} />}

      {/* Aftercare Timeline */}
      <Section variant="sage" padding="lg">
        <div className="text-center mb-16">
          <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
            Nazorg
          </span>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.12] mb-4">
            {treatment.aftercare.title}
          </h2>
          <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto">
            {treatment.aftercare.description}
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="space-y-0">
            {treatment.aftercare.timeline.map((item: { title: string; description: string }, i: number) => (
              <div key={i} className="relative flex gap-6">
                {/* Vertical line + circle */}
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 border border-accent/20">
                    <Clock className="size-4 text-accent" />
                  </div>
                  {i < treatment.aftercare.timeline.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-10">
                  <h3 className="font-display text-base mb-1">{item.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Do's and Don'ts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {/* Do's */}
          <div className="rounded-[var(--radius-lg)] border border-border/50 bg-background/50 p-8">
            <h3 className="font-display text-lg mb-6 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                <Check className="size-4 text-accent" />
              </span>
              Do&apos;s
            </h3>
            <ul className="space-y-3">
              {treatment.aftercare.dos.map((item: string) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm font-body text-muted-foreground"
                >
                  <Check className="size-4 text-accent mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Don'ts */}
          <div className="rounded-[var(--radius-lg)] border border-border/50 bg-background/50 p-8">
            <h3 className="font-display text-lg mb-6 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <X className="size-4 text-muted-foreground" />
              </span>
              Don&apos;ts
            </h3>
            <ul className="space-y-3">
              {treatment.aftercare.donts.map((item: string) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm font-body text-muted-foreground"
                >
                  <X className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Pricing */}
      <PricingSection variant="default" padding="lg" tiers={pricingItems} single={treatment.slug} />

      {/* What&apos;s Included */}
      <Section variant="light" padding="lg">
        <div className="text-center mb-12">
          <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
            Inbegrepen
          </span>
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-light leading-[1.12] mb-4">
            Wat Is Inbegrepen?
          </h2>
        </div>
        <ul className="max-w-md mx-auto space-y-3">
          {treatment.includes.map((item: string) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm font-body"
            >
              <Check className="size-4 text-accent mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* FAQ */}
      <FAQSection
        items={treatment.faq}
        variant="default"
        layout="narrow"
        padding="lg"
        title={`${treatment.name} FAQ`}
      />

      {/* CTA */}
      <CTASection
        variant="accent"
        padding="md"
        title={`Klaar Voor Jouw ${treatment.name}?`}
        description={`Boek een vrijblijvend consult en ontdek wat ${treatment.name.toLowerCase()} voor jou kan betekenen.`}
        cta={{ label: "Plan Jouw Intake", href: "/boeken" }}
      />
    </>
  );
}
