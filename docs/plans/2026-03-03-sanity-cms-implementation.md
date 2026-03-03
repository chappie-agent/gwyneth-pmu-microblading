# Sanity CMS Integration — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate all hardcoded content from TypeScript data files to Sanity CMS with visual editing for admins and ISR-cached pages for visitors.

**Architecture:** Server Components fetch from Sanity via `sanityFetch` (from `defineLive`). Draft Mode + Visual Editing overlays let admins click-to-edit. Sanity Studio embedded at `/studio`. Content seeded from existing `data/*.ts` files.

**Tech Stack:** Next.js 16 (App Router), Sanity v3, next-sanity, @sanity/visual-editing, @portabletext/react, Portable Text

**Sanity Project ID:** `5ifzz9k4`

**Note:** No test framework is configured. Verification is via `npx next build`.

---

## Task 1: Clean Up Old Files

**Context:** The parent directory `gwyneth-pmu-microblading/` contains leftover vanilla JS/HTML files and old images that are not in git (`.git` is inside `gwyneth-pmu/`). Delete them.

**Step 1: Delete old files**

```bash
cd /Users/elwyndeneve/Development/gwyneth-pmu-microblading
rm -rf image-old/ behandelingen/
rm -f index.html main.js styles.css README.md resultaat-brows-duo.png
rm -f boeken.html contact.html faq.html nazorg.html over.html
rm -f prijzen.html privacy.html resultaten.html voorwaarden.html
```

**Step 2: Verify only gwyneth-pmu/, .claude/, and docs/ remain**

```bash
ls /Users/elwyndeneve/Development/gwyneth-pmu-microblading/
# Expected: .claude  .DS_Store  docs  gwyneth-pmu
```

No git commit needed (files are outside the repo).

---

## Task 2: Install Sanity Packages & Environment

**Files:**
- Modify: `package.json`
- Create: `.env.local`

**Step 1: Install packages**

```bash
cd /Users/elwyndeneve/Development/gwyneth-pmu-microblading/gwyneth-pmu
npm install sanity next-sanity @sanity/visual-editing @portabletext/react @sanity/image-url
```

**Step 2: Create `.env.local`**

```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=5ifzz9k4
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-03-04
SANITY_API_READ_TOKEN=<user-must-provide>
```

> **Important:** The user must create an API token in Sanity manage (manage.sanity.io) with Viewer permissions and paste it as `SANITY_API_READ_TOKEN`. Prompt the user for this.

**Step 3: Add `.env.local` to `.gitignore` (verify it's already there)**

Check that `.gitignore` contains `.env.local`. Next.js default `.gitignore` includes it.

**Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install sanity packages"
```

---

## Task 3: Sanity Client & Live Configuration

**Files:**
- Create: `sanity/env.ts`
- Create: `sanity/lib/client.ts`
- Create: `sanity/lib/live.ts`

**Step 1: Create `sanity/env.ts`**

```typescript
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-03-04";
```

**Step 2: Create `sanity/lib/client.ts`**

```typescript
import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    studioUrl: "/studio",
  },
});
```

**Step 3: Create `sanity/lib/live.ts`**

```typescript
import { defineLive } from "next-sanity/live";
import { client } from "./client";

const token = process.env.SANITY_API_READ_TOKEN;
if (!token) {
  throw new Error(
    "Missing SANITY_API_READ_TOKEN — create one at https://sanity.io/manage"
  );
}

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
  fetchOptions: {
    revalidate: 60,
  },
});
```

**Step 4: Commit**

```bash
git add sanity/
git commit -m "feat: add Sanity client and live configuration"
```

---

## Task 4: Define Sanity Schemas

**Files:**
- Create: `sanity/schemas/treatment.ts`
- Create: `sanity/schemas/pricingTier.ts`
- Create: `sanity/schemas/faqItem.ts`
- Create: `sanity/schemas/review.ts`
- Create: `sanity/schemas/siteSettings.ts`
- Create: `sanity/schemas/navigation.ts`
- Create: `sanity/schemas/pageContent.ts`
- Create: `sanity/schemas/index.ts`

Each schema maps 1:1 to the existing TypeScript interfaces in `data/*.ts`.

**Step 1: Create `sanity/schemas/treatment.ts`**

```typescript
import { defineField, defineType } from "sanity";

export const treatment = defineType({
  name: "treatment",
  title: "Behandeling",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "name", title: "Naam", type: "string", validation: (r) => r.required() }),
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "price", title: "Prijs", type: "number" }),
    defineField({ name: "priceLabel", title: "Prijs Label", type: "string" }),
    defineField({ name: "featured", title: "Uitgelicht", type: "boolean", initialValue: false }),
    defineField({ name: "featuredLabel", title: "Uitgelicht Label", type: "string" }),
    defineField({
      name: "category",
      title: "Categorie",
      type: "string",
      options: { list: [{ title: "Core PMU", value: "core" }, { title: "Aanvullend", value: "additional" }] },
      initialValue: "core",
    }),
    defineField({ name: "heroTitle", title: "Hero Titel", type: "string" }),
    defineField({ name: "heroDescription", title: "Hero Beschrijving", type: "text" }),
    defineField({
      name: "image",
      title: "Afbeelding",
      type: "image",
      options: { hotspot: true },
    }),
    // What Is
    defineField({
      name: "whatIs",
      title: "Wat Is Het?",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titel", type: "string" }),
        defineField({ name: "subtitle", title: "Ondertitel", type: "string" }),
        defineField({ name: "content", title: "Inhoud", type: "array", of: [{ type: "block" }] }),
        defineField({ name: "benefits", title: "Voordelen", type: "array", of: [{ type: "string" }] }),
      ],
    }),
    // Suitability
    defineField({
      name: "suitability",
      title: "Geschiktheid",
      type: "object",
      fields: [
        defineField({ name: "ideal", title: "Ideaal Voor", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "caution", title: "Voorzichtigheid", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "note", title: "Opmerking", type: "text" }),
      ],
    }),
    // Process
    defineField({
      name: "process",
      title: "Proces Stappen",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "Titel", type: "string" }),
          defineField({ name: "description", title: "Beschrijving", type: "text" }),
        ],
      }],
    }),
    // Aftercare
    defineField({
      name: "aftercare",
      title: "Nazorg",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titel", type: "string" }),
        defineField({ name: "duration", title: "Duur", type: "string" }),
        defineField({ name: "description", title: "Beschrijving", type: "text" }),
        defineField({
          name: "timeline",
          title: "Tijdlijn",
          type: "array",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "title", title: "Titel", type: "string" }),
              defineField({ name: "description", title: "Beschrijving", type: "text" }),
            ],
          }],
        }),
        defineField({ name: "dos", title: "Do's", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "donts", title: "Don'ts", type: "array", of: [{ type: "string" }] }),
      ],
    }),
    // FAQ
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "question", title: "Vraag", type: "string" }),
          defineField({ name: "answer", title: "Antwoord", type: "text" }),
        ],
      }],
    }),
    // Includes
    defineField({ name: "includes", title: "Inbegrepen", type: "array", of: [{ type: "string" }] }),
    // Comparison (optional, core only)
    defineField({
      name: "comparison",
      title: "Vergelijking",
      type: "object",
      fields: [
        defineField({ name: "techniek", title: "Techniek", type: "string" }),
        defineField({ name: "uiterlijk", title: "Uiterlijk", type: "string" }),
        defineField({ name: "duur", title: "Duur", type: "string" }),
        defineField({ name: "geschikt", title: "Geschikt voor", type: "string" }),
        defineField({ name: "onderhoud", title: "Onderhoud", type: "string" }),
        defineField({ name: "pijn", title: "Pijn/ongemak", type: "string" }),
        defineField({ name: "genezing", title: "Genezingstijd", type: "string" }),
      ],
    }),
    // USPs
    defineField({ name: "usps", title: "USPs", type: "array", of: [{ type: "string" }] }),
    // Sort order
    defineField({ name: "sortOrder", title: "Volgorde", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Volgorde", name: "sortOrder", by: [{ field: "sortOrder", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "category", media: "image" },
  },
});
```

**Step 2: Create `sanity/schemas/pricingTier.ts`**

```typescript
import { defineField, defineType } from "sanity";

export const pricingTier = defineType({
  name: "pricingTier",
  title: "Prijzen",
  type: "document",
  fields: [
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "name", title: "Naam", type: "string", validation: (r) => r.required() }),
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "price", title: "Prijs", type: "number" }),
    defineField({ name: "priceLabel", title: "Prijs Label", type: "string" }),
    defineField({ name: "featured", title: "Uitgelicht", type: "boolean", initialValue: false }),
    defineField({ name: "featuredLabel", title: "Uitgelicht Label", type: "string" }),
    defineField({ name: "includes", title: "Inbegrepen", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "sortOrder", title: "Volgorde", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Volgorde", name: "sortOrder", by: [{ field: "sortOrder", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "priceLabel" } },
});
```

**Step 3: Create `sanity/schemas/faqItem.ts`**

```typescript
import { defineField, defineType } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Vraag", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Antwoord", type: "text", validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Categorie",
      type: "string",
      options: {
        list: [
          { title: "Algemeen", value: "algemeen" },
          { title: "Behandeling", value: "behandeling" },
          { title: "Nazorg", value: "nazorg" },
          { title: "Betaling", value: "betaling" },
        ],
      },
    }),
    defineField({
      name: "pages",
      title: "Toon op pagina's",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Homepage", value: "home" },
          { title: "Behandelingen", value: "behandelingen" },
          { title: "Prijzen", value: "prijzen" },
        ],
      },
    }),
    defineField({ name: "sortOrder", title: "Volgorde", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Volgorde", name: "sortOrder", by: [{ field: "sortOrder", direction: "asc" }] }],
  preview: { select: { title: "question", subtitle: "category" } },
});
```

**Step 4: Create `sanity/schemas/review.ts`**

```typescript
import { defineField, defineType } from "sanity";

export const review = defineType({
  name: "review",
  title: "Reviews",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Naam", type: "string", validation: (r) => r.required() }),
    defineField({ name: "treatmentName", title: "Behandeling", type: "string" }),
    defineField({ name: "rating", title: "Beoordeling", type: "number", validation: (r) => r.min(1).max(5) }),
    defineField({ name: "text", title: "Tekst", type: "text", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "name", subtitle: "treatmentName" } },
});
```

**Step 5: Create `sanity/schemas/siteSettings.ts`**

```typescript
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Instellingen",
  type: "document",
  fields: [
    defineField({ name: "businessName", title: "Bedrijfsnaam", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "subtitle", title: "Ondertitel", type: "string" }),
    defineField({ name: "description", title: "Beschrijving", type: "text" }),
    defineField({ name: "heroTitle", title: "Hero Titel", type: "string" }),
    defineField({ name: "heroDescription", title: "Hero Beschrijving", type: "text" }),
    defineField({
      name: "contact",
      title: "Contact",
      type: "object",
      fields: [
        defineField({ name: "address", title: "Adres", type: "string" }),
        defineField({ name: "phone", title: "Telefoon", type: "string" }),
        defineField({ name: "email", title: "E-mail", type: "string" }),
      ],
    }),
    defineField({
      name: "hours",
      title: "Openingstijden",
      type: "object",
      fields: [
        defineField({ name: "weekdays", title: "Doordeweeks", type: "string" }),
        defineField({ name: "saturday", title: "Zaterdag", type: "string" }),
      ],
    }),
    defineField({
      name: "social",
      title: "Social Media",
      type: "object",
      fields: [
        defineField({ name: "instagram", title: "Instagram", type: "url" }),
        defineField({ name: "facebook", title: "Facebook", type: "url" }),
        defineField({ name: "tiktok", title: "TikTok", type: "url" }),
      ],
    }),
    defineField({
      name: "trustItems",
      title: "Trust Items",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", title: "Label", type: "string" }),
          defineField({ name: "value", title: "Waarde", type: "string" }),
        ],
      }],
    }),
  ],
  preview: { prepare: () => ({ title: "Site Instellingen" }) },
});
```

**Step 6: Create `sanity/schemas/navigation.ts`**

```typescript
import { defineField, defineType } from "sanity";

const navItemFields = [
  defineField({ name: "label", title: "Label", type: "string" }),
  defineField({ name: "href", title: "Link", type: "string" }),
];

export const navigation = defineType({
  name: "navigation",
  title: "Navigatie",
  type: "document",
  fields: [
    defineField({
      name: "mainNav",
      title: "Hoofdnavigatie",
      type: "array",
      of: [{
        type: "object",
        fields: [
          ...navItemFields,
          defineField({
            name: "children",
            title: "Submenu",
            type: "array",
            of: [{ type: "object", fields: navItemFields }],
          }),
        ],
        preview: { select: { title: "label", subtitle: "href" } },
      }],
    }),
    defineField({
      name: "footerNav",
      title: "Footer Navigatie",
      type: "object",
      fields: [
        defineField({ name: "treatments", title: "Behandelingen", type: "array", of: [{ type: "object", fields: navItemFields }] }),
        defineField({ name: "info", title: "Info", type: "array", of: [{ type: "object", fields: navItemFields }] }),
        defineField({ name: "contact", title: "Contact", type: "array", of: [{ type: "object", fields: navItemFields }] }),
        defineField({ name: "legal", title: "Juridisch", type: "array", of: [{ type: "object", fields: navItemFields }] }),
      ],
    }),
    defineField({
      name: "breadcrumbLabels",
      title: "Breadcrumb Labels",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "key", title: "Slug", type: "string" }),
          defineField({ name: "value", title: "Label", type: "string" }),
        ],
      }],
    }),
  ],
  preview: { prepare: () => ({ title: "Navigatie" }) },
});
```

**Step 7: Create `sanity/schemas/pageContent.ts`**

```typescript
import { defineField, defineType } from "sanity";

export const pageContent = defineType({
  name: "pageContent",
  title: "Pagina Content",
  type: "document",
  fields: [
    defineField({
      name: "pageId",
      title: "Pagina",
      type: "string",
      options: {
        list: [
          { title: "Homepage", value: "home" },
          { title: "Behandelingen", value: "behandelingen" },
          { title: "Prijzen", value: "prijzen" },
          { title: "Resultaten", value: "resultaten" },
          { title: "Over", value: "over" },
          { title: "Contact", value: "contact" },
          { title: "Boeken", value: "boeken" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "heroTitle", title: "Hero Titel", type: "string" }),
    defineField({ name: "heroDescription", title: "Hero Beschrijving", type: "text" }),
    defineField({ name: "ctaTitle", title: "CTA Titel", type: "string" }),
    defineField({ name: "ctaDescription", title: "CTA Beschrijving", type: "text" }),
    defineField({ name: "ctaLabel", title: "CTA Knop Tekst", type: "string" }),
    defineField({ name: "ctaHref", title: "CTA Link", type: "string" }),
    defineField({ name: "metaTitle", title: "Meta Titel", type: "string" }),
    defineField({ name: "metaDescription", title: "Meta Beschrijving", type: "text" }),
  ],
  preview: { select: { title: "pageId" } },
});
```

**Step 8: Create `sanity/schemas/index.ts`**

```typescript
import { treatment } from "./treatment";
import { pricingTier } from "./pricingTier";
import { faqItem } from "./faqItem";
import { review } from "./review";
import { siteSettings } from "./siteSettings";
import { navigation } from "./navigation";
import { pageContent } from "./pageContent";

export const schemaTypes = [
  treatment,
  pricingTier,
  faqItem,
  review,
  siteSettings,
  navigation,
  pageContent,
];
```

**Step 9: Commit**

```bash
git add sanity/schemas/
git commit -m "feat: define all Sanity document schemas"
```

---

## Task 5: Sanity Studio & Configuration

**Files:**
- Create: `sanity.config.ts` (project root)
- Create: `sanity.cli.ts` (project root)
- Create: `app/studio/[[...tool]]/page.tsx`

**Step 1: Create `sanity.config.ts`**

```typescript
"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
  ],
  schema: { types: schemaTypes },
});
```

**Step 2: Create `sanity.cli.ts`**

```typescript
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "5ifzz9k4",
    dataset: "production",
  },
});
```

**Step 3: Create `app/studio/[[...tool]]/page.tsx`**

```tsx
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

**Step 4: Verify Studio loads**

```bash
npm run dev
# Navigate to http://localhost:3000/studio
# Expect: Sanity Studio login screen
```

**Step 5: Commit**

```bash
git add sanity.config.ts sanity.cli.ts "app/studio/[[...tool]]/page.tsx"
git commit -m "feat: embed Sanity Studio at /studio"
```

---

## Task 6: Draft Mode & Visual Editing

**Files:**
- Create: `app/api/draft-mode/enable/route.ts`
- Create: `app/api/draft-mode/disable/route.ts`
- Modify: `app/layout.tsx` — add `SanityLive` and `VisualEditing`

**Step 1: Create `app/api/draft-mode/enable/route.ts`**

```typescript
import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/lib/client";

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    token: process.env.SANITY_API_READ_TOKEN!,
  }),
});
```

**Step 2: Create `app/api/draft-mode/disable/route.ts`**

```typescript
import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  (await draftMode()).disable();
  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
}
```

**Step 3: Modify `app/layout.tsx`**

Add these imports and components. The layout must become `async` to check `draftMode()`. Add `SanityLive` (always rendered) and `VisualEditing` (only in draft mode) before the closing `</body>`.

Current layout structure:
```tsx
// BEFORE (simplified):
export default function RootLayout({ children }) {
  return (
    <html><body>
      <Providers>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </Providers>
    </body></html>
  );
}
```

Changes needed:
```tsx
// Add imports:
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/sanity/lib/live";

// Make function async:
export default async function RootLayout({ children }) {
  return (
    <html><body>
      <Providers>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </Providers>
      <SanityLive />
      {(await draftMode()).isEnabled && <VisualEditing />}
    </body></html>
  );
}
```

**Step 4: Verify build**

```bash
npx next build
```

**Step 5: Commit**

```bash
git add app/api/draft-mode/ app/layout.tsx
git commit -m "feat: add Draft Mode, Visual Editing, and SanityLive"
```

---

## Task 7: GROQ Queries

**Files:**
- Create: `sanity/lib/queries.ts`

Define all GROQ queries used by pages. Each query returns data shaped to match the existing TypeScript interfaces so components need minimal changes.

**Step 1: Create `sanity/lib/queries.ts`**

```typescript
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
  *[_type == "pricingTier" && slug.current == $slug] | order(sortOrder asc) {
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
    heroTitle, heroDescription,
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

/* ── Page Content ────────────────────────────────────── */

export const PAGE_CONTENT_QUERY = defineQuery(`
  *[_type == "pageContent" && pageId == $pageId][0] {
    heroTitle, heroDescription,
    ctaTitle, ctaDescription, ctaLabel, ctaHref,
    metaTitle, metaDescription
  }
`);
```

**Step 2: Commit**

```bash
git add sanity/lib/queries.ts
git commit -m "feat: define all GROQ queries"
```

---

## Task 8: Content Seed Script

**Files:**
- Create: `scripts/seed-sanity.mjs`

This script reads the existing TypeScript data and creates Sanity documents. Run it once to populate Sanity with current content.

**Step 1: Create `scripts/seed-sanity.mjs`**

This is an ES module script that uses the Sanity client to create documents. Since the data files are TypeScript, we'll hardcode the data in the seed script (copy from the TS files). The script uses `@sanity/client` directly.

```javascript
// scripts/seed-sanity.mjs
// Run with: node scripts/seed-sanity.mjs
// Requires: SANITY_API_WRITE_TOKEN env var (Editor role)

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "5ifzz9k4",
  dataset: "production",
  apiVersion: "2025-03-04",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// ─── Helper ──────────────────────────────────────────
async function createDoc(type, data) {
  const doc = { _type: type, ...data };
  const result = await client.create(doc);
  console.log(`Created ${type}: ${result._id}`);
  return result;
}

// ─── INSTRUCTIONS ────────────────────────────────────
// 1. Get a write token from https://sanity.io/manage (Editor role)
// 2. Run: SANITY_API_WRITE_TOKEN=<token> node scripts/seed-sanity.mjs
//
// The script creates all documents from the current data files.
// Import the data objects from data/*.ts below and iterate to create.
//
// Since this is .mjs and our data is .ts, the actual data must be
// copy-pasted or imported via a build step. For simplicity, this
// script provides the framework — the actual data insertion will
// be done manually through Sanity Studio or via a tsx seed script.

console.log("Seed script ready. See instructions in the file.");
console.log("Alternatively, use Sanity Studio at /studio to enter content.");
```

> **Implementation note:** Because the data files are TypeScript and this is a plain Node script, the simplest approach is to use `tsx` to run a `.ts` seed script that imports directly from `data/*.ts`. The implementer should:
> 1. Install `tsx` as a dev dependency: `npm install -D tsx`
> 2. Create `scripts/seed-sanity.ts` that imports from `data/treatments`, `data/faq`, etc.
> 3. Run with: `SANITY_API_WRITE_TOKEN=<token> npx tsx scripts/seed-sanity.ts`

**Step 2: Commit**

```bash
git add scripts/
git commit -m "feat: add content seed script skeleton"
```

---

## Task 9: Migrate Layout Components

**Context:** Layout components (`Navbar`, `Footer`, `MobileNav`, `BreadcrumbNav`) currently import data directly. They need to receive data as props from the root layout, which fetches from Sanity.

**Files:**
- Modify: `app/layout.tsx` — fetch nav + site settings, pass as props
- Modify: `components/layout/navbar.tsx` — accept `mainNav` as prop instead of import
- Modify: `components/layout/mobile-nav.tsx` — accept `mainNav` as prop instead of import
- Modify: `components/layout/footer.tsx` — accept `footerNav` + `siteConfig` as props
- Modify: `components/layout/breadcrumb-nav.tsx` — accept `breadcrumbLabels` as prop

**Step 1: Update `app/layout.tsx`**

The layout fetches navigation and site settings from Sanity and passes them as props to Navbar and Footer. `sanityFetch` returns `{ data }`.

Key changes to layout.tsx:
- Import `sanityFetch` from `@/sanity/lib/live`
- Import `NAVIGATION_QUERY`, `SITE_SETTINGS_QUERY` from `@/sanity/lib/queries`
- Fetch both in the async function body
- Pass `navData.mainNav` to `<Navbar>` and `<MobileNav>`
- Pass `navData.footerNav`, `navData.breadcrumbLabels`, and `siteSettings` to `<Footer>`

**Step 2: Update `components/layout/navbar.tsx`**

- Remove: `import { mainNav } from "@/data/navigation"`
- Add prop: `mainNav: NavItem[]` (keep the NavItem type, import from a shared types file or define inline)
- The component already uses `mainNav` throughout — it just needs to come from props instead of import

**Step 3: Update `components/layout/mobile-nav.tsx`**

- Remove: `import { mainNav } from "@/data/navigation"`
- Add prop: `mainNav: NavItem[]`

**Step 4: Update `components/layout/footer.tsx`**

- Remove: `import { footerNav } from "@/data/navigation"` and `import { siteConfig } from "@/data/site"`
- Add props for `footerNav` and `siteConfig` data

**Step 5: Update `components/layout/breadcrumb-nav.tsx`**

- Remove: `import { breadcrumbLabels } from "@/data/navigation"`
- Accept `breadcrumbLabels` as prop or fetch independently
- Since breadcrumbs are used inside pages (not layout), each page that uses breadcrumbs should pass the data, OR breadcrumbs can fetch from Sanity directly (it's a server component if not using `"use client"`)

**Step 6: Verify build**

```bash
npx next build
```

**Step 7: Commit**

```bash
git add app/layout.tsx components/layout/
git commit -m "refactor: migrate layout components to Sanity data"
```

---

## Task 10: Migrate Section Components

**Context:** Section components import from `data/` files. Most already accept props — they just need their default data removed and all data passed from parent pages.

**Files:**
- Modify: `components/sections/treatments-section.tsx` — remove `coreTreatments` import, require `items` prop
- Modify: `components/sections/pricing-section.tsx` — remove `pricingTiers` import, accept `tiers` prop
- Modify: `components/sections/faq-section.tsx` — remove `homeFAQ` import, require `items` prop
- Modify: `components/sections/process-section.tsx` — remove `homeProcessSteps` import, require `steps` prop
- Modify: `components/sections/usp-section.tsx` — remove `uspItems` import, accept `items` prop
- Modify: `components/sections/reviews-section.tsx` — remove `reviews` import, accept `reviews` prop
- Modify: `components/sections/contact-section.tsx` — remove `siteConfig` import, accept `siteConfig` prop

**For each component, the pattern is:**
1. Remove the `import { ... } from "@/data/..."` line
2. Add a required prop for the data (or make the existing optional prop required)
3. Remove any fallback/default that references the old data import
4. Types can be kept as TypeScript interfaces (import from `data/` types or redefine)

**Key detail:** Keep the TypeScript interfaces/types from `data/` files. Only remove the data constants. The interfaces are still useful for typing props.

**Step 1-7:** Update each component as described above.

**Step 8: Verify build**

```bash
npx next build
# Will FAIL at this point — pages still pass old data. That's expected.
# The section components are ready for the page migration in Task 11.
```

**Step 9: Commit**

```bash
git add components/sections/
git commit -m "refactor: migrate section components to accept Sanity data as props"
```

---

## Task 11: Migrate Page Routes

**Context:** Pages are server components. They fetch from Sanity using `sanityFetch` and pass data to section components as props.

**Files:**
- Modify: `app/page.tsx` (homepage)
- Modify: `app/behandelingen/page.tsx`
- Modify: `app/behandelingen/[slug]/page.tsx`
- Modify: `app/prijzen/page.tsx`
- Modify: `app/resultaten/page.tsx`
- Modify: `app/over/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/boeken/page.tsx`

**Pattern for each page:**

```typescript
import { sanityFetch } from "@/sanity/lib/live";
import { RELEVANT_QUERY } from "@/sanity/lib/queries";

export default async function SomePage() {
  const { data } = await sanityFetch({ query: RELEVANT_QUERY, params: { ... } });
  return <SomeSection items={data} />;
}
```

**Step 1: Migrate `app/page.tsx` (Homepage)**

The homepage uses many section components. It needs to fetch:
- Core treatments (for TreatmentsSection)
- Process steps — these can come from `homeProcessSteps` in treatments or be a separate query. Simplest: keep the homeProcessSteps as a query on siteSettings or hardcode temporarily
- USP items — similar, can be part of siteSettings
- Reviews
- FAQ items (page: "home")
- Site settings (for trust items)
- Page content (for hero/CTA copy)

Import `sanityFetch` and all relevant queries. Make the function async. Call `sanityFetch` for each data source, destructure `{ data }`, and pass to components.

**Step 2: Migrate `app/behandelingen/page.tsx`**

Needs: all treatments, core treatments (for comparison table), FAQ (page: "behandelingen"), comparison labels.

Note: `comparisonLabels` is a static mapping (key → Dutch label). This can stay hardcoded since it's structural, not content.

**Step 3: Migrate `app/behandelingen/[slug]/page.tsx`**

Needs: single treatment by slug, pricing tier by slug.

Update `generateStaticParams` to fetch slugs from Sanity:
```typescript
export async function generateStaticParams() {
  const { data } = await sanityFetch({ query: TREATMENT_SLUGS_QUERY });
  return data.map((t) => ({ slug: t.slug }));
}
```

**Step 4: Migrate `app/prijzen/page.tsx`**

Needs: all pricing tiers, FAQ (page: "prijzen"), `whatsIncluded` data.

Note: `whatsIncluded` is a structured object currently in `pricing.ts`. This can be part of siteSettings or a pageContent document. For simplicity, keep it hardcoded initially or add fields to the `pageContent` schema for the prijzen page.

**Steps 5-8: Migrate remaining pages**

`resultaten`, `over`, `contact`, `boeken` — these have minimal data imports. Most use section components without direct data. They mainly need page content (hero/CTA copy) from Sanity.

**Step 9: Verify build**

```bash
npx next build
```

**Step 10: Commit**

```bash
git add app/
git commit -m "refactor: migrate all pages to fetch from Sanity"
```

---

## Task 12: Clean Up Data Files

**Files:**
- Modify: `data/treatments.ts` — keep only TypeScript interfaces, remove data constants
- Modify: `data/pricing.ts` — keep only interface, remove constants
- Modify: `data/faq.ts` — keep only interfaces, remove constants
- Modify: `data/reviews.ts` — keep only interface, remove constants
- Modify: `data/navigation.ts` — keep only interface, remove constants
- Modify: `data/site.ts` — keep only interface if used, or delete

**Alternative:** If no component still imports types from these files (all types are now inferred from GROQ queries), delete the entire `data/` directory. Check with:

```bash
grep -r "from.*@/data/" app/ components/ --include="*.tsx" --include="*.ts"
```

If no matches, delete:
```bash
rm -rf data/
```

If some type imports remain (e.g., `type Treatment`, `type FAQItem`), create a single `types/index.ts` file with just the interfaces.

**Step 1: Commit**

```bash
git add -A
git commit -m "refactor: remove hardcoded data files, content now in Sanity"
```

---

## Task 13: Populate Sanity with Content

**Context:** Content must be entered into Sanity. Two options:

**Option A: Seed script (automated)**
1. Install tsx: `npm install -D tsx`
2. Write `scripts/seed-sanity.ts` that imports data from `data/*.ts` (before deletion) and creates Sanity documents
3. Get a write token from sanity.io/manage (Editor role)
4. Run: `SANITY_API_WRITE_TOKEN=<token> npx tsx scripts/seed-sanity.ts`

**Option B: Manual entry via Studio**
1. Start dev server: `npm run dev`
2. Navigate to `/studio`
3. Create documents manually using the Studio UI

> **Recommendation:** Option A is faster. Create a proper seed script before deleting `data/` files (do this before Task 12).

---

## Task 14: Final Build & Verification

**Step 1: Build**

```bash
npx next build
```

Expected: All 16 pages generate successfully.

**Step 2: Manual verification**

```bash
npm run dev
```

Check each route:
- `/` — Homepage loads, all sections render
- `/behandelingen` — All 6 compact treatment cards show
- `/behandelingen/microblading` — Detail page renders with all sections
- `/behandelingen/eyeliner` — Additional service detail page works
- `/prijzen` — All 6 pricing cards show
- `/studio` — Sanity Studio loads and shows all content types
- `/studio` → Presentation tool → Visual Editing overlay works

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: complete Sanity CMS integration"
```

---

## Execution Order Summary

| # | Task | Depends On | Files Changed |
|---|------|-----------|---------------|
| 1 | Cleanup old files | — | Parent dir only |
| 2 | Install packages + .env | — | package.json |
| 3 | Sanity client + live | 2 | sanity/env.ts, lib/client.ts, lib/live.ts |
| 4 | Define schemas | 3 | sanity/schemas/* (8 files) |
| 5 | Studio + config | 3, 4 | sanity.config.ts, sanity.cli.ts, app/studio/ |
| 6 | Draft Mode + Visual Editing | 3 | app/api/draft-mode/*, app/layout.tsx |
| 7 | GROQ queries | 3 | sanity/lib/queries.ts |
| 8 | Seed script | 3, 4 | scripts/seed-sanity.ts |
| 9 | Migrate layout components | 7 | components/layout/* (4 files) |
| 10 | Migrate section components | 7 | components/sections/* (7 files) |
| 11 | Migrate page routes | 9, 10 | app/**/* (8 files) |
| 12 | Clean up data files | 11 | data/* |
| 13 | Populate Sanity content | 8 | Sanity Content Lake |
| 14 | Build & verify | all | — |

**Parallelizable:** Tasks 4, 7, 8 can run in parallel after Task 3. Tasks 9, 10 can run in parallel after Task 7.
