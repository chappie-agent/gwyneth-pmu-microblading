import { defineQuery } from "next-sanity";

/* ── Treatments ──────────────────────────────────────── */

export const ALL_TREATMENTS_QUERY = defineQuery(`
  *[_type == "treatment"] | order(sortOrder asc) {
    _id,
    "slug": slug.current,
    name, label, tagline, price, priceLabel,
    featured, featuredLabel,
    category,
    heroTitle, heroDescription,
    image,
    whatIs {
      title, subtitle, content, benefits
    },
    suitability { ideal, caution, note },
    process[] { title, description },
    aftercare {
      title, duration, description,
      timeline[] { title, description },
      dos, donts
    },
    faq[] { question, answer },
    includes,
    comparison,
    usps,
    sortOrder
  }
`);

export const CORE_TREATMENTS_QUERY = defineQuery(`
  *[_type == "treatment" && category == "core"] | order(sortOrder asc) {
    _id,
    "slug": slug.current,
    name, label, tagline, price, priceLabel,
    featured, featuredLabel, category,
    image, usps, comparison
  }
`);

export const ADDITIONAL_TREATMENTS_QUERY = defineQuery(`
  *[_type == "treatment" && category == "additional"] | order(sortOrder asc) {
    _id,
    "slug": slug.current,
    name, label, tagline, price, priceLabel,
    category, image, usps
  }
`);

export const TREATMENT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "treatment" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    name, label, tagline, price, priceLabel,
    featured, featuredLabel, category,
    heroTitle, heroDescription, image,
    whatIs { title, subtitle, content, benefits },
    suitability { ideal, caution, note },
    process[] { title, description },
    aftercare {
      title, duration, description,
      timeline[] { title, description },
      dos, donts
    },
    faq[] { question, answer },
    includes, comparison, usps
  }
`);

export const TREATMENT_SLUGS_QUERY = defineQuery(`
  *[_type == "treatment"]{ "slug": slug.current }
`);

/* ── Pricing ─────────────────────────────────────────── */

export const ALL_PRICING_QUERY = defineQuery(`
  *[_type == "pricingTier"] | order(sortOrder asc) {
    _id,
    "slug": slug.current,
    name, label, price, priceLabel,
    featured, featuredLabel, includes
  }
`);

export const PRICING_BY_SLUG_QUERY = defineQuery(`
  *[_type == "pricingTier" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    name, label, price, priceLabel,
    featured, featuredLabel, includes
  }
`);

/* ── FAQ ─────────────────────────────────────────────── */

export const FAQ_BY_PAGE_QUERY = defineQuery(`
  *[_type == "faqItem" && $page in pages] | order(sortOrder asc) {
    _id, question, answer, category
  }
`);

export const FAQ_ALL_QUERY = defineQuery(`
  *[_type == "faqItem"] | order(category asc, sortOrder asc) {
    _id, question, answer, category
  }
`);

/* ── Reviews ─────────────────────────────────────────── */

export const ALL_REVIEWS_QUERY = defineQuery(`
  *[_type == "review"] {
    _id, name, treatmentName, rating, text
  }
`);

/* ── Site Settings (singleton) ───────────────────────── */

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    businessName, tagline, subtitle, description,
    heroTitle, heroTitleAccent, heroDescription,
    heroImage,
    aboutImage,
    contact { address, phone, email },
    hours { weekdays, saturday },
    social { instagram, facebook, tiktok },
    trustItems[] { label, value }
  }
`);

/* ── Navigation (singleton) ──────────────────────────── */

export const NAVIGATION_QUERY = defineQuery(`
  *[_type == "navigation"][0] {
    mainNav[] { label, href, children[] { label, href } },
    footerNav {
      treatments[] { label, href },
      info[] { label, href },
      contact[] { label, href },
      legal[] { label, href }
    },
    breadcrumbLabels[] { key, value }
  }
`);

/* ── Result Gallery (singleton) ────────────────────── */

export const RESULT_GALLERY_QUERY = defineQuery(`
  *[_type == "resultGallery"][0] {
    items[] { image, label, layout }
  }
`);

/* ── Page Content ────────────────────────────────────── */

export const PAGE_CONTENT_QUERY = defineQuery(`
  *[_type == "pageContent" && pageId == $pageId][0] {
    heroTitle, heroDescription,
    ctaTitle, ctaDescription, ctaLabel, ctaHref,
    metaTitle, metaDescription
  }
`);
