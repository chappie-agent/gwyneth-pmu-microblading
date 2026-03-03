import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { cormorantGaramond, jost } from "@/lib/fonts";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SanityLive } from "@/sanity/lib/live";
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
  return (
    <html lang="nl" suppressHydrationWarning>
      <body
        className={`${cormorantGaramond.variable} ${jost.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
        <SanityLive />
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
