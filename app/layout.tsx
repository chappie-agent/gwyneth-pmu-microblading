import type { Metadata } from "next";
import { cormorantGaramond, jost } from "@/lib/fonts";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { mainNav, footerNav } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import "./globals.css";

const SITE_URL = "https://www.gwynethpmu.nl";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Permanente Make-up & Microblading Zoetermeer | Gwyneth PMU",
  description:
    "Gecertificeerd PMU specialist in Zoetermeer. Microblading, Powder Brows en Combi Brows vanaf €430. 1000+ tevreden klanten, 4.8★. Plan je gratis intake.",
  keywords: [
    "microblading Zoetermeer",
    "permanente make-up Zoetermeer",
    "powder brows Zoetermeer",
    "combi brows Zoetermeer",
    "PMU specialist Zoetermeer",
    "wenkbrauwen laten doen Zoetermeer",
    "permanente eyeliner Zoetermeer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: SITE_URL,
    siteName: "Gwyneth PMU",
    title: "Permanente Make-up & Microblading Zoetermeer | Gwyneth PMU",
    description:
      "Gecertificeerd PMU specialist in Zoetermeer. Microblading, Powder Brows en Combi Brows vanaf €430. 1000+ tevreden klanten, 4.8★.",
  },
  robots: { index: true, follow: true },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "@id": `${SITE_URL}/#business`,
  name: "Gwyneth PMU",
  description:
    "Gecertificeerd specialist in permanente make-up (microblading, powder brows, combi brows, eyeliner) in Zoetermeer.",
  url: SITE_URL,
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  image: `${SITE_URL}/og-image.jpg`,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.contact.address.street,
    postalCode: siteConfig.contact.address.postalCode,
    addressLocality: siteConfig.contact.address.city,
    addressCountry: "NL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 52.0607,
    longitude: 4.4940,
  },
  areaServed: [
    { "@type": "City", name: "Zoetermeer" },
    { "@type": "City", name: "Den Haag" },
    { "@type": "City", name: "Leiden" },
    { "@type": "City", name: "Pijnacker" },
    { "@type": "City", name: "Nootdorp" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      description: "Op afspraak",
    },
  ],
  sameAs: [
    siteConfig.social.instagram,
    siteConfig.social.facebook,
    siteConfig.social.tiktok,
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "1000",
    bestRating: "5",
    worstRating: "1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body
        className={`${cormorantGaramond.variable} ${jost.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Providers>
          <Navbar mainNav={mainNav} />
          <main className="min-h-screen">{children}</main>
          <Footer footerNav={footerNav} siteConfig={siteConfig} />
        </Providers>
      </body>
    </html>
  );
}
