export interface PricingTier {
  slug: string;
  name: string;
  label: string;
  price: number;
  priceLabel: string;
  featured?: boolean;
  featuredLabel?: string;
  includes: string[];
}

export const pricingTiers: PricingTier[] = [
  {
    slug: "microblading",
    name: "Microblading",
    label: "Hairstroke",
    price: 430,
    priceLabel: "\u20AC430",
    includes: [
      "Start met consult",
      "Vorm & kleur mapping",
      "Volledige behandeling (ca. 2 uur)",
      "Premium pigmenten",
      "Aftercare kit",
      "Nabehandeling na 6 weken inbegrepen",
    ],
  },
  {
    slug: "powder-brows",
    name: "Powder Brows",
    label: "Meest Populair",
    price: 430,
    priceLabel: "\u20AC430",
    featured: true,
    featuredLabel: "Meest Gekozen",
    includes: [
      "Start met consult",
      "Vorm & kleur mapping",
      "Volledige behandeling (ca. 2 uur)",
      "Premium pigmenten",
      "Aftercare kit",
      "Nabehandeling na 6 weken inbegrepen",
    ],
  },
  {
    slug: "combi-brows",
    name: "Combi Brows",
    label: "Premium",
    price: 475,
    priceLabel: "\u20AC475",
    includes: [
      "Start met consult",
      "Vorm & kleur bepaling",
      "Volledige behandeling (ca. 2,5 uur)",
      "Premium pigmenten",
      "Complete aftercare kit",
      "Nabehandeling na 6 weken inbegrepen",
    ],
  },
  {
    slug: "eyeliner",
    name: "Eyeliner PMU",
    label: "Permanente Make-up",
    price: 300,
    priceLabel: "vanaf \u20AC300",
    includes: [
      "inclusief intake consult",
      "Vorm tekening & goedkeuring",
      "Volledige behandeling (ca. 2 uur)",
      "Premium pigmenten",
      "Aftercare gel & instructies",
      "inclusief nabehandeling",
    ],
  },
  {
    slug: "lashlift",
    name: "Lashlift",
    label: "Wimperbehandeling",
    price: 55,
    priceLabel: "\u20AC55",
    includes: [
      "Reiniging & voorbereiding",
      "Professionele liftbehandeling",
      "Setting & fixering",
      "Optioneel wimperverf",
      "Nazorginstructies",
    ],
  },
  {
    slug: "brow-lamination",
    name: "Brow Lamination",
    label: "Wenkbrauw lamineren",
    price: 50,
    priceLabel: "\u20AC50",
    includes: [
      "Wenkbrauw analyse & advies",
      "Browlamination behandeling",
      "Epileren voor strakke vorm",
      "Nazorginstructies",
    ],
  },
];

export const touchUpPrice = "\u20AC120";

export const whatsIncluded = {
  consult: {
    title: "Intake Consult (Gratis)",
    description: "Persoonlijk gesprek over je wensen, gezichtsvorm, huidtype en verwachtingen. Dit helpt ons de perfecte vorm en kleur bepalen.",
  },
  treatment: {
    title: "Behandeling Inclusief",
    items: [
      "Professionele vorm mapping",
      "Premium pigmenten",
      "Topicale verdovende cr\u00E8me",
      "Steriele materialen en apparaten",
      "Begeleiding tijdens het proces",
    ],
  },
  aftercare: {
    title: "Aftercare Kit Inclusief",
    items: [
      "Premium aftercare balm",
      "Gedetailleerde verzorgingsinstructies",
      "Contact voor vragen tijdens genezing",
      "Foto-documentatie voor nazorg",
    ],
  },
  touchUp: {
    title: "Nabehandeling (6-8 Weken)",
    description: "Na volledige genezing plan je een nabehandeling. Dit is het perfecte moment om kleine aanpassingen te maken. Inbegrepen bij PMU wenkbrauwbehandelingen.",
  },
  noExtraCosts: [
    "Consult",
    "Mapping",
    "Verdoving",
    "Aftercare materialen",
    "Nabehandeling (bij wenkbrauw PMU)",
  ],
};
