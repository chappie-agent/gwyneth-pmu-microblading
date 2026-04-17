# Remove Sanity CMS — Hardcoded TS Migration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove Sanity CMS entirely and serve all content from the existing `data/*.ts` files, leaving the visible site 100% unchanged.

**Architecture:** Every page currently does `sanityFetch(…) ?? fallbackFromData`. We invert this: pages import `data/` directly and skip the Sanity fetch entirely. Components that called `urlFor()` to resolve Sanity image refs switch to plain string paths (treatments already use `/public` static paths as fallbacks; hero/about already fall back to `/hero-portrait.png` and `ImagePlaceholder`). The result gallery has no real data in Sanity, so `ResultsSection` keeps rendering its built-in `ImagePlaceholder` fallback.

**Tech Stack:** Next.js 15 App Router, TypeScript, `data/*.ts` static files, `/public` images.

---

## File Map

**Modified:**
- `app/layout.tsx` — remove `sanityFetch`, `SanityLive`, `VisualEditing`, `draftMode`; import `data/navigation` + `data/site` directly
- `app/page.tsx` — remove all `sanityFetch` calls; import from `data/` directly
- `app/over/page.tsx` — remove `sanityFetch`; hero strings are already hardcoded as fallbacks
- `app/boeken/page.tsx` — remove `sanityFetch`; hero strings are already hardcoded as fallbacks
- `app/contact/page.tsx` — remove `sanityFetch`; use `data/site` directly
- `app/resultaten/page.tsx` — remove `sanityFetch`; use `data/reviews` directly; no gallery items
- `app/prijzen/page.tsx` — remove `sanityFetch`; use `data/pricing` + `data/faq` directly
- `app/behandelingen/page.tsx` — remove `sanityFetch`; use `data/treatments` + `data/faq` directly
- `app/behandelingen/[slug]/page.tsx` — remove `sanityFetch`/`client`/`PortableText`; use `data/treatments` directly; images use fallback paths
- `components/sections/treatments-section.tsx` — remove `urlFor` import; simplify `treatmentImageSrc` to return static paths only
- `components/sections/about-section.tsx` — remove `urlFor` import; `aboutImage` becomes `string | undefined`; use plain `src`
- `components/sections/hero-section.tsx` — remove `urlFor` import; `heroImage` becomes `string | undefined`; use plain `src`
- `components/sections/results-section.tsx` — remove `urlFor` import; `GalleryItem.image` becomes `string | undefined`; use plain `src`
- `next.config.ts` — remove `cdn.sanity.io` remote pattern

**Deleted:**
- `sanity/` (entire dir: `lib/`, `schemas/`)
- `sanity.cli.ts`
- `sanity.config.ts`
- `app/studio/` (entire dir)
- `app/api/draft-mode/` (entire dir)

**npm packages removed:**
- `sanity`, `next-sanity`, `@sanity/image-url`, `@sanity/visual-editing`, `@portabletext/react`

---

## Task 1: Update app/layout.tsx

**Files:** Modify `app/layout.tsx`

- [ ] Remove the `sanityFetch`, `SanityLive` imports from `@/sanity/lib/live`
- [ ] Remove `VisualEditing` import from `next-sanity/visual-editing`
- [ ] Remove `draftMode` import from `next/headers`
- [ ] Remove the `NAVIGATION_QUERY`, `SITE_SETTINGS_QUERY` imports from `@/sanity/lib/queries`
- [ ] Remove the `fallback` prefixes from the navigation/site imports (they become the direct imports)
- [ ] Remove the two `await sanityFetch(…)` calls and the fallback ternaries; assign from `data/` directly
- [ ] Remove `<SanityLive />` and the `{(await draftMode()).isEnabled && <VisualEditing />}` JSX
- [ ] Verify the file compiles: `npx tsc --noEmit 2>&1 | head -20`

```tsx
// Result layout.tsx imports (no Sanity):
import { mainNav } from "@/data/navigation";
import { footerNav } from "@/data/navigation";
import { siteConfig } from "@/data/site";
// ...
// RootLayout becomes a non-async function (or stays async if other needs require it):
export default function RootLayout({ children }) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className={`${cormorantGaramond.variable} ${jost.variable} antialiased`}>
        <Providers>
          <Navbar mainNav={mainNav} />
          <main className="min-h-screen">{children}</main>
          <Footer footerNav={footerNav} siteConfig={siteConfig} />
        </Providers>
      </body>
    </html>
  );
}
```

- [ ] Commit: `git add app/layout.tsx && git commit -m "refactor: remove Sanity from layout — use data/ directly"`

---

## Task 2: Update app/page.tsx

**Files:** Modify `app/page.tsx`

- [ ] Remove all `sanityFetch` imports and query imports from `@/sanity/lib/*`
- [ ] Remove the six `await sanityFetch(…)` calls at the top of `Home()`
- [ ] Replace each dual-source variable with its `data/` equivalent:
  - `treatmentsItems` → `coreTreatments` directly (already imported)
  - `allPricing` → `pricingTiers` directly; keep the `flagshipSlugs` filter logic
  - `faqItems` → `homeFAQ` directly
  - `reviewsItems` → map over `reviews` directly (keep the `placeholderReviewImages` merge logic)
  - `settings` → `siteConfig` directly (already imported)
- [ ] Pass `galleryItems={undefined}` to `ResultsSection` (or just omit the prop — it has a default)
- [ ] The `heroImage` prop on `HeroSection` should be omitted (no field in `siteConfig`) — hero falls back to `/hero-portrait.png`
- [ ] The `aboutImage` prop on `AboutSection` should be omitted — about falls back to `ImagePlaceholder`
- [ ] Verify the file compiles: `npx tsc --noEmit 2>&1 | head -20`
- [ ] Commit: `git add app/page.tsx && git commit -m "refactor: remove Sanity from home page — use data/ directly"`

---

## Task 3: Update remaining pages (over, boeken, contact, resultaten, prijzen, behandelingen)

**Files:** Modify 6 page files

- [ ] **app/over/page.tsx**: Remove `sanityFetch` + `PAGE_CONTENT_QUERY` imports; replace the async fetch with the hardcoded fallback strings (already present in the file as `?? "…"` defaults). Page can become sync.

```tsx
// Replace:
const { data: pageContent } = await sanityFetch({ query: PAGE_CONTENT_QUERY, params: { pageId: "over" } });
const heroTitle = pageContent?.heroTitle ?? "Gwyneth — Permanente Make-up Specialist";
const heroDescription = pageContent?.heroDescription ?? "Gepassioneerd over perfectie…";

// With:
const heroTitle = "Gwyneth — Permanente Make-up Specialist";
const heroDescription = "Gepassioneerd over perfectie. Gespecialiseerd in natuurlijke schoonheid. Gecertificeerd in internationale standaarden.";
```

- [ ] **app/boeken/page.tsx**: Same pattern — remove `sanityFetch`, promote fallback strings to direct constants.

```tsx
const heroTitle = "Boek Je Afspraak";
const heroDescription = "Stap een naar je perfecte wenkbrauwen. Kies je behandeling en datum.";
```

- [ ] **app/contact/page.tsx**: Remove `sanityFetch` + `SITE_SETTINGS_QUERY`; use `siteConfig` from `@/data/site` directly (already imported as fallback).

- [ ] **app/resultaten/page.tsx**: Remove `sanityFetch` + query imports; use `reviews` from `@/data/reviews` directly. Remove `galleryData` — omit `galleryItems` prop on `ResultsSection` (it renders placeholders by default).

- [ ] **app/prijzen/page.tsx**: Remove `sanityFetch` + query imports; use `pricingTiers` and `paymentFAQ` from `data/` directly (both already imported as fallbacks).

- [ ] **app/behandelingen/page.tsx**: Remove `sanityFetch` + query imports; use `treatments`, `coreTreatments`, `behandelingenFAQ` from `data/` directly (all already imported).

- [ ] Compile check: `npx tsc --noEmit 2>&1 | head -30`
- [ ] Commit: `git add app/over/page.tsx app/boeken/page.tsx app/contact/page.tsx app/resultaten/page.tsx app/prijzen/page.tsx app/behandelingen/page.tsx && git commit -m "refactor: remove Sanity from all remaining pages — use data/ directly"`

---

## Task 4: Update app/behandelingen/[slug]/page.tsx

**Files:** Modify `app/behandelingen/[slug]/page.tsx`

This file is the most complex because it uses `PortableText`, `urlFor`, `client`, and `sanityFetch`.

- [ ] Remove imports: `PortableText` from `@portabletext/react`, `urlFor` from `@/sanity/lib/image`, `sanityFetch` from `@/sanity/lib/live`, `client` from `@/sanity/lib/client`, all query imports from `@/sanity/lib/queries`

- [ ] **`generateStaticParams`**: Remove Sanity `client.fetch` call; return `treatments.map((t) => ({ slug: t.slug }))` directly (the fallback path that's already there)

- [ ] **`generateMetadata`**: Remove `sanityFetch` call; look up treatment from static data only:
```tsx
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const treatment = treatments.find((t) => t.slug === slug);
  if (!treatment) return {};
  return {
    title: `${treatment.name} — Gwyneth PMU`,
    description: treatment.heroDescription,
  };
}
```

- [ ] **`TreatmentPage`**: Remove all three `sanityFetch` calls. Replace:
  - `treatment` → `treatments.find((t) => t.slug === slug)` (fallback path already there)
  - `pricingItems` → `pricingTiers` directly
  - `galleryData` → omit the `galleryItems` prop on `ResultsSection`

- [ ] **Image section**: Since `treatment.image` is `undefined` for all static treatments, remove the Sanity image branch — only render `ImagePlaceholder`:
```tsx
<ImagePlaceholder
  aspect="portrait"
  gradient="warm"
  label={treatment.name}
  className="w-full"
/>
```

- [ ] **`whatIs.content` rendering**: Since static data always uses `string[]`, remove the `PortableText` branch:
```tsx
{treatment.whatIs.content.map((paragraph: string, i: number) => (
  <p key={i}>{paragraph}</p>
))}
```

- [ ] Compile check: `npx tsc --noEmit 2>&1 | head -30`
- [ ] Commit: `git add app/behandelingen/[slug]/page.tsx && git commit -m "refactor: remove Sanity from treatment detail page"`

---

## Task 5: Update components — remove urlFor

**Files:** Modify 4 component files

- [ ] **`components/sections/treatments-section.tsx`**:
  - Remove `urlFor` import
  - Simplify `treatmentImageSrc`: since `treatment.image` is now always `undefined` (no Sanity refs), just return the static fallback:
  ```tsx
  function treatmentImageSrc(treatment: Treatment): string | null {
    return fallbackImages[treatment.slug] ?? null;
  }
  ```
  - Remove the `image?: any` field comment from the `Treatment` type reference (the field stays in `data/treatments.ts` as `image?: string` if needed, but it's always undefined — safe to leave)

- [ ] **`components/sections/about-section.tsx`**:
  - Remove `urlFor` import
  - Change `aboutImage?: any` to `aboutImage?: string`
  - Replace `src={urlFor(aboutImage).width(800).height(1000).quality(85).url()}` with `src={aboutImage}`

- [ ] **`components/sections/hero-section.tsx`**:
  - Remove `urlFor` import
  - Change `heroImage?: any` to `heroImage?: string`
  - Replace `src={heroImage ? urlFor(heroImage).width(1200).quality(85).url() : "/hero-portrait.png"}` with `src={heroImage ?? "/hero-portrait.png"}`

- [ ] **`components/sections/results-section.tsx`**:
  - Remove `urlFor` import
  - Change `GalleryItem` interface: `image?: string` (was `any`)
  - Replace `src={urlFor(sanityItem.image).width(i === 0 ? 800 : 600).quality(80).url()}` with `src={sanityItem.image}`

- [ ] Compile check: `npx tsc --noEmit 2>&1 | head -30`
- [ ] Commit: `git add components/sections/treatments-section.tsx components/sections/about-section.tsx components/sections/hero-section.tsx components/sections/results-section.tsx && git commit -m "refactor: remove urlFor/Sanity image resolution from components"`

---

## Task 6: Remove Sanity files and packages

**Files:** Delete directories and files, update `next.config.ts` and `package.json`

- [ ] Delete Sanity source files:
```bash
rm -rf sanity/ sanity.cli.ts sanity.config.ts
rm -rf app/studio app/api/draft-mode
```

- [ ] Update `next.config.ts` — remove `cdn.sanity.io` remote pattern:
```ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};
```

- [ ] Uninstall Sanity packages:
```bash
npm uninstall sanity next-sanity @sanity/image-url @sanity/visual-editing @portabletext/react
```

- [ ] Final compile check: `npx tsc --noEmit 2>&1 | head -40`
- [ ] Smoke test build: `npm run build 2>&1 | tail -30`
- [ ] Commit: `git add -A && git commit -m "chore: remove Sanity CMS — all packages, config, and studio"`
