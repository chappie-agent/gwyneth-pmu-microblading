# Sanity CMS Integration Design

**Date:** 2026-03-03
**Status:** Approved
**Sanity Project ID:** 5ifzz9k4

## Summary

Integrate Sanity as headless CMS for Gwyneth PMU. All site content moves from
hardcoded TypeScript data files into Sanity Content Lake. Admins get visual
editing (click-to-edit overlays in preview mode). Regular visitors see
published content via ISR-cached pages.

Also: clean up old vanilla JS/HTML files and `image-old/` from the parent
directory.

## Decisions

| Decision | Choice |
|---|---|
| CMS scope | All content (treatments, FAQ, pricing, reviews, site settings, navigation, page copy) |
| Studio hosting | Embedded in Next.js at `/studio` |
| Edit experience | Sanity Visual Editing overlay (native) |
| Rich text | Sanity Portable Text + `@portabletext/react` |
| Caching strategy | ISR with Sanity webhook revalidation |
| Sanity project | `5ifzz9k4` |

## Cleanup

Delete from parent directory (`gwyneth-pmu-microblading/`):

- `image-old/` directory (11 old images)
- `behandelingen/` directory (4 old HTML pages)
- All `.html` files: index, boeken, contact, faq, nazorg, over, prijzen, privacy, resultaten, voorwaarden
- `main.js`, `styles.css`, `README.md`, `resultaat-brows-duo.png`

Keep: `gwyneth-pmu/` (Next.js project), `.claude/`, `docs/`

## Sanity Schemas

### Document Types

**`treatment`** (from `data/treatments.ts`)
- `slug` (slug) - URL path segment
- `name` (string) - Display name
- `label` (string) - Category label (e.g. "Hairstroke Techniek")
- `tagline` (string) - Short description
- `price` (number) - Price in euros
- `priceLabel` (string) - Formatted price string
- `featured` (boolean) - Highlight in UI
- `featuredLabel` (string) - Badge text
- `category` (string, options: core/additional)
- `heroTitle` (string) - Hero section title
- `heroDescription` (text) - Hero section description
- `whatIs` (object): title, subtitle, content (Portable Text), benefits (string array)
- `suitability` (object): ideal (string array), caution (string array), note (text)
- `process` (array of objects): title, description
- `aftercare` (object): title, duration, description, timeline (array), dos (string array), donts (string array)
- `faq` (array of objects): question, answer (Portable Text)
- `includes` (string array)
- `comparison` (object, optional): techniek, uiterlijk, duur, geschikt, onderhoud, pijn, genezing
- `usps` (string array)
- `image` (image) - Treatment card image

**`pricingTier`** (from `data/pricing.ts`)
- `slug` (slug)
- `name` (string)
- `label` (string)
- `price` (number)
- `priceLabel` (string)
- `featured` (boolean)
- `featuredLabel` (string)
- `includes` (string array)

**`faqItem`** (from `data/faq.ts`)
- `question` (string)
- `answer` (Portable Text)
- `category` (string, options: algemeen/behandeling/nazorg/betaling)
- `pages` (string array) - Which pages to display on

**`review`** (from `data/reviews.ts`)
- `name` (string)
- `treatmentName` (string)
- `rating` (number, 1-5)
- `text` (text)

**`siteSettings`** (singleton, from `data/site.ts`)
- `businessName` (string)
- `tagline` (string)
- `description` (text)
- `contact` (object): address (string), phone (string), email (string)
- `hours` (array of objects): day, time
- `social` (object): instagram (url)
- `trustItems` (array of objects): label, value

**`navigation`** (singleton, from `data/navigation.ts`)
- `mainNav` (array of objects): label, href, children (array)
- `footerNav` (object): treatments, info, contact, legal (each array of {label, href})

**`pageContent`** (for hardcoded page props)
- `pageId` (string) - Identifier (e.g. "home", "behandelingen", "prijzen")
- `heroTitle` (string)
- `heroDescription` (text)
- `ctaTitle` (string)
- `ctaDescription` (text)
- `ctaLabel` (string)
- `ctaHref` (string)
- `metaTitle` (string)
- `metaDescription` (text)

## Architecture

### Data Flow

```
Sanity Content Lake
       |
       +--> Published docs --> GROQ query --> Next.js Server Component --> Static HTML (ISR)
       |
       +--> Draft docs ------> GROQ query --> Next.js Draft Mode --> Live preview + Visual Editing
```

### Packages

| Package | Purpose |
|---|---|
| `sanity` | Studio, schema definitions, Portable Text types |
| `next-sanity` | Client, GROQ helpers, Studio embedding, Draft Mode |
| `@sanity/visual-editing` | Click-to-edit overlays in preview mode |
| `@portabletext/react` | Render Portable Text as React components |
| `@sanity/image-url` | Generate optimized image URLs |

### File Structure (new)

```
gwyneth-pmu/
  sanity/
    env.ts                    # SANITY_PROJECT_ID, dataset, API version
    client.ts                 # createClient configuration
    lib/
      queries.ts              # All GROQ queries
      fetch.ts                # sanityFetch helper (handles draft mode)
    schemas/
      index.ts                # schemaTypes export
      treatment.ts
      pricingTier.ts
      faqItem.ts
      review.ts
      siteSettings.ts
      navigation.ts
      pageContent.ts
  sanity.config.ts            # Studio configuration (root)
  sanity.cli.ts               # CLI configuration (root)
  app/
    studio/[[...tool]]/
      page.tsx                # Embedded Studio route
    api/draft-mode/
      enable/route.ts         # Enable Draft Mode
      disable/route.ts        # Disable Draft Mode
  components/
    sanity/
      visual-editing.tsx      # VisualEditing wrapper (client component)
      portable-text.tsx       # PortableText renderer with Tailwind styles
```

### Draft Mode Flow

1. Admin navigates to `/studio`
2. Opens "Presentation" tool -> sees live preview of the site
3. Visual Editing overlays highlight editable content
4. Admin clicks on text -> side panel opens with field editor
5. Changes are saved as drafts in Sanity
6. Admin publishes -> Sanity webhook hits `/api/revalidate` -> ISR regenerates pages

### Content Migration

Existing `data/*.ts` files become one-time seed scripts:
1. Run migration script that reads current TS data
2. Creates corresponding Sanity documents via client
3. After verification, remove `data/` imports from components
4. Components fetch from Sanity instead

## Error Handling

- If Sanity API is unreachable, ISR serves last cached version
- Draft Mode gracefully falls back to published content
- Visual Editing only loads in Draft Mode (no overhead for visitors)

## Security

- Studio at `/studio` requires Sanity authentication
- Draft Mode uses secret token in URL (configured in Sanity)
- API token stored in `.env.local` (never committed)
- Read-only public token for client-side queries (if needed)
