import type { Metadata } from "next";
import { cormorantGaramond, jost } from "@/lib/fonts";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { mainNav, footerNav } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gwyneth PMU Microblading",
  description:
    "Verfijnde permanente make-up die jouw natuurlijke schoonheid versterkt",
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
        <Providers>
          <Navbar mainNav={mainNav} />
          <main className="min-h-screen">{children}</main>
          <Footer footerNav={footerNav} siteConfig={siteConfig} />
        </Providers>
      </body>
    </html>
  );
}
