export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Behandelingen",
    href: "/behandelingen",
    children: [
      { label: "Overzicht", href: "/behandelingen" },
      { label: "Microblading", href: "/behandelingen/microblading" },
      { label: "Powder Brows", href: "/behandelingen/powder-brows" },
      { label: "Combi Brows", href: "/behandelingen/combi-brows" },
      { label: "Eyeliner PMU", href: "/behandelingen/eyeliner" },
      { label: "Lashlift", href: "/behandelingen/lashlift" },
      { label: "Brow Lamination", href: "/behandelingen/brow-lamination" },
    ],
  },
  { label: "Resultaten", href: "/resultaten" },
  { label: "Over Mij", href: "/over" },
  { label: "Prijzen", href: "/prijzen" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  treatments: [
    { label: "Microblading", href: "/behandelingen/microblading" },
    { label: "Powder Brows", href: "/behandelingen/powder-brows" },
    { label: "Combi Brows", href: "/behandelingen/combi-brows" },
    { label: "Eyeliner PMU", href: "/behandelingen/eyeliner" },
    { label: "Lashlift", href: "/behandelingen/lashlift" },
    { label: "Brow Lamination", href: "/behandelingen/brow-lamination" },
  ],
  info: [
    { label: "Over Mij", href: "/over" },
    { label: "Resultaten", href: "/resultaten" },
    { label: "FAQ", href: "/faq" },
    { label: "Nazorg", href: "/nazorg" },
  ],
  contact: [
    { label: "Afspraak Maken", href: "/boeken" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Voorwaarden", href: "/voorwaarden" },
  ],
};

export const breadcrumbLabels: Record<string, string> = {
  behandelingen: "Behandelingen",
  microblading: "Microblading",
  "powder-brows": "Powder Brows",
  "combi-brows": "Combi Brows",
  eyeliner: "Eyeliner PMU",
  lashlift: "Lashlift",
  "brow-lamination": "Brow Lamination",
  resultaten: "Resultaten",
  prijzen: "Prijzen",
  over: "Over Mij",
  contact: "Contact",
  boeken: "Boeken",
  faq: "FAQ",
  nazorg: "Nazorg",
  privacy: "Privacy",
  voorwaarden: "Voorwaarden",
};
