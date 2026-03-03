import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { cormorantGaramond, jost } from "@/lib/fonts";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { NAVIGATION_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { mainNav as fallbackMainNav, footerNav as fallbackFooterNav } from "@/data/navigation";
import { siteConfig as fallbackSiteConfig } from "@/data/site";
import type { NavItem, FooterNav, SiteConfig } from "@/types/navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gwyneth PMU Microblading",
  description:
    "Verfijnde permanente make-up die jouw natuurlijke schoonheid versterkt",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: navData } = await sanityFetch({ query: NAVIGATION_QUERY });
  const { data: siteSettings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });

  const mainNav: NavItem[] = navData?.mainNav ?? fallbackMainNav;
  const footerNav: FooterNav = navData?.footerNav ?? fallbackFooterNav;
  const siteConfig: SiteConfig = siteSettings ?? fallbackSiteConfig;

  return (
    <html lang="nl" suppressHydrationWarning>
      <body
        className={`${cormorantGaramond.variable} ${jost.variable} antialiased`}
      >
        <Providers>
          <Navbar mainNav={mainNav} />
          <main className="min-h-screen">{children}</main>
          <Footer footerNav={footerNav} siteConfig={siteConfig} />
        </Providers>
        <SanityLive />
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
