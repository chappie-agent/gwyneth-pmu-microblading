import { createClient } from "@sanity/client";
import { treatments } from "../data/treatments";
import { pricingTiers } from "../data/pricing";
import {
  faqCategories,
  homeFAQ,
  paymentFAQ,
  behandelingenFAQ,
} from "../data/faq";
import { reviews } from "../data/reviews";
import { siteConfig } from "../data/site";
import { mainNav, footerNav, breadcrumbLabels } from "../data/navigation";

// ---------------------------------------------------------------------------
// Sanity client
// ---------------------------------------------------------------------------
const client = createClient({
  projectId: "5ifzz9k4",
  dataset: "production",
  apiVersion: "2025-03-04",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function toPortableText(paragraphs: string[]) {
  return paragraphs.map((text, i) => ({
    _type: "block" as const,
    _key: `block-${i}`,
    style: "normal" as const,
    markDefs: [],
    children: [{ _type: "span" as const, _key: `span-${i}`, text, marks: [] as string[] }],
  }));
}

// Counters for the summary at the end
const created: Record<string, number> = {};

function bump(type: string) {
  created[type] = (created[type] ?? 0) + 1;
}

// ---------------------------------------------------------------------------
// Seed functions
// ---------------------------------------------------------------------------

async function seedTreatments() {
  console.log("\n--- Seeding treatments ---");
  for (let i = 0; i < treatments.length; i++) {
    const t = treatments[i];
    const doc = {
      _type: "treatment",
      slug: { _type: "slug", current: t.slug },
      name: t.name,
      label: t.label,
      tagline: t.tagline,
      price: t.price,
      priceLabel: t.priceLabel,
      featured: t.featured ?? false,
      featuredLabel: t.featuredLabel,
      category: t.category ?? "core",
      heroTitle: t.heroTitle,
      heroDescription: t.heroDescription,
      whatIs: {
        title: t.whatIs.title,
        subtitle: t.whatIs.subtitle,
        content: toPortableText(t.whatIs.content),
        benefits: t.whatIs.benefits,
      },
      suitability: t.suitability,
      process: t.process.map((step, idx) => ({
        _type: "treatmentStep",
        _key: `step-${idx}`,
        title: step.title,
        description: step.description,
      })),
      aftercare: {
        title: t.aftercare.title,
        duration: t.aftercare.duration,
        description: t.aftercare.description,
        timeline: t.aftercare.timeline.map((item, idx) => ({
          _type: "aftercareDayItem",
          _key: `timeline-${idx}`,
          title: item.title,
          description: item.description,
        })),
        dos: t.aftercare.dos,
        donts: t.aftercare.donts,
      },
      faq: t.faq.map((item, idx) => ({
        _type: "faqItem",
        _key: `faq-${idx}`,
        question: item.question,
        answer: item.answer,
      })),
      includes: t.includes,
      comparison: t.comparison,
      usps: t.usps,
      sortOrder: i,
    };

    const result = await client.create(doc);
    console.log(`  Created treatment: ${t.name} (${result._id})`);
    bump("treatment");
  }
}

async function seedPricingTiers() {
  console.log("\n--- Seeding pricing tiers ---");
  for (let i = 0; i < pricingTiers.length; i++) {
    const tier = pricingTiers[i];
    const doc = {
      _type: "pricingTier",
      slug: { _type: "slug", current: tier.slug },
      name: tier.name,
      label: tier.label,
      price: tier.price,
      priceLabel: tier.priceLabel,
      featured: tier.featured ?? false,
      featuredLabel: tier.featuredLabel,
      includes: tier.includes,
      sortOrder: i,
    };

    const result = await client.create(doc);
    console.log(`  Created pricingTier: ${tier.name} (${result._id})`);
    bump("pricingTier");
  }
}

async function seedFAQItems() {
  console.log("\n--- Seeding FAQ items ---");

  // Helper to create a single FAQ document
  async function createFAQ(
    question: string,
    answer: string,
    opts: { pages?: string[]; category?: string },
  ) {
    const doc = {
      _type: "faqItem" as const,
      question,
      answer,
      ...(opts.pages && { pages: opts.pages }),
      ...(opts.category && { category: opts.category }),
    };

    const result = await client.create(doc);
    console.log(`  Created faqItem: "${question.slice(0, 50)}..." (${result._id})`);
    bump("faqItem");
  }

  // homeFAQ -> pages: ["home"]
  for (const item of homeFAQ) {
    await createFAQ(item.question, item.answer, { pages: ["home"] });
  }

  // behandelingenFAQ -> pages: ["behandelingen"]
  for (const item of behandelingenFAQ) {
    await createFAQ(item.question, item.answer, { pages: ["behandelingen"] });
  }

  // paymentFAQ -> pages: ["prijzen"]
  for (const item of paymentFAQ) {
    await createFAQ(item.question, item.answer, { pages: ["prijzen"] });
  }

  // faqCategories -> category: category.slug
  for (const category of faqCategories) {
    for (const item of category.items) {
      await createFAQ(item.question, item.answer, { category: category.slug });
    }
  }
}

async function seedReviews() {
  console.log("\n--- Seeding reviews ---");
  for (const review of reviews) {
    const doc = {
      _type: "review",
      name: review.name,
      treatmentName: review.treatment,
      rating: review.rating,
      text: review.text,
    };

    const result = await client.create(doc);
    console.log(`  Created review: ${review.name} (${result._id})`);
    bump("review");
  }
}

async function seedSiteSettings() {
  console.log("\n--- Seeding site settings ---");
  const doc = {
    _type: "siteSettings",
    businessName: siteConfig.name,
    tagline: siteConfig.tagline,
    subtitle: siteConfig.subtitle,
    description: siteConfig.description,
    heroTitle: siteConfig.heroTitle,
    heroDescription: siteConfig.heroDescription,
    contact: {
      address: siteConfig.contact.address.full,
      phone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
    },
    hours: {
      weekdays: siteConfig.hours.weekdays,
      saturday: siteConfig.hours.saturday,
    },
    social: {
      instagram: siteConfig.social.instagram,
      facebook: siteConfig.social.facebook,
      tiktok: siteConfig.social.tiktok,
    },
    trustItems: [...siteConfig.trustItems],
  };

  const result = await client.create(doc);
  console.log(`  Created siteSettings (${result._id})`);
  bump("siteSettings");
}

async function seedNavigation() {
  console.log("\n--- Seeding navigation ---");
  const doc = {
    _type: "navigation",
    mainNav: mainNav.map((item, idx) => ({
      _type: "navItem",
      _key: `main-${idx}`,
      label: item.label,
      href: item.href,
      children: item.children?.map((child, cidx) => ({
        _type: "navItem",
        _key: `main-${idx}-child-${cidx}`,
        label: child.label,
        href: child.href,
      })),
    })),
    footerNav: {
      treatments: footerNav.treatments.map((item, idx) => ({
        _type: "navItem",
        _key: `footer-treat-${idx}`,
        label: item.label,
        href: item.href,
      })),
      info: footerNav.info.map((item, idx) => ({
        _type: "navItem",
        _key: `footer-info-${idx}`,
        label: item.label,
        href: item.href,
      })),
      contact: footerNav.contact.map((item, idx) => ({
        _type: "navItem",
        _key: `footer-contact-${idx}`,
        label: item.label,
        href: item.href,
      })),
      legal: footerNav.legal.map((item, idx) => ({
        _type: "navItem",
        _key: `footer-legal-${idx}`,
        label: item.label,
        href: item.href,
      })),
    },
    breadcrumbLabels: Object.entries(breadcrumbLabels).map(([key, value], idx) => ({
      _type: "breadcrumbLabel",
      _key: `bc-${idx}`,
      key,
      value,
    })),
  };

  const result = await client.create(doc);
  console.log(`  Created navigation (${result._id})`);
  bump("navigation");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log("=== Sanity Content Seed Script ===");
  console.log(`Project: 5ifzz9k4 | Dataset: production\n`);

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error(
      "ERROR: SANITY_API_WRITE_TOKEN environment variable is not set.\n" +
        "Export it before running this script:\n" +
        "  export SANITY_API_WRITE_TOKEN=your-token-here",
    );
    process.exit(1);
  }

  await seedTreatments();
  await seedPricingTiers();
  await seedFAQItems();
  await seedReviews();
  await seedSiteSettings();
  await seedNavigation();

  console.log("\n=== Seed Complete ===");
  console.log("Summary:");
  for (const [type, count] of Object.entries(created)) {
    console.log(`  ${type}: ${count} document(s)`);
  }
  const total = Object.values(created).reduce((a, b) => a + b, 0);
  console.log(`  Total: ${total} document(s) created`);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
