import type { MetadataRoute } from "next";
import { treatments } from "@/data/treatments";

const SITE_URL = "https://www.gwynethpmu.nl";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/behandelingen`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/prijzen`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/resultaten`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/over`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/boeken`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];

  const treatmentRoutes: MetadataRoute.Sitemap = treatments.map((t) => ({
    url: `${SITE_URL}/behandelingen/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...treatmentRoutes];
}
