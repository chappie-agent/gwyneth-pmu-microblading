import type { Metadata } from "next";
import { cormorantGaramond, jost } from "@/lib/fonts";
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
        {children}
      </body>
    </html>
  );
}
