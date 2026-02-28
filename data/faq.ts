export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  slug: string;
  label: string;
  title: string;
  items: FAQItem[];
}

export const faqCategories: FAQCategory[] = [
  {
    slug: "algemeen",
    label: "Algemeen",
    title: "Basisvragen Over PMU",
    items: [
      { question: "Wat is permanente make-up?", answer: "Permanente make-up (PMU) is een semi-permanente tatoeage waarbij pigmenten onder de huid worden gebracht. Dit cre\u00EBert de schijn van make-up die weken tot jaren meegaat." },
      { question: "Hoe lang houdt permanente make-up?", answer: "Het varieert van 1-3 jaar afhankelijk van techniek, huidtype, en levensstijl. Met jaarlijkse touch-ups kan het veel langer mooi blijven." },
      { question: "Doet PMU pijn?", answer: "Minimaal! We gebruiken topicale verdovende cr\u00E8me. De meeste cli\u00EBnten voelen alleen wat druk of een licht kriebel." },
      { question: "Is permanente make-up veilig?", answer: "Ja, volledig veilig wanneer gedaan door gecertificeerde professionals met steriele materialen. We gebruiken alleen hoogwaardige, veilige pigmenten." },
    ],
  },
  {
    slug: "behandeling",
    label: "Behandeling",
    title: "Vragen Over Het Proces",
    items: [
      { question: "Wat is het verschil tussen microblading en powder brows?", answer: "Microblading cre\u00EBert individuele haartjes (zeer natuurlijk). Powder brows geven een zachte, poederachtige finish (meer volle look). Combi brows combineren beide." },
      { question: "Hoe lang duurt een behandeling?", answer: "Microblading: 2-3 uur. Powder brows: 2-3 uur. Combi brows: 3-3,5 uur. Dit geeft ons tijd voor perfectie!" },
      { question: "Kan ik mijn bestaande PMU verbeteren?", answer: "Ja! We kunnen touchups, correcties, of volledige refreshes doen. Stuur je foto vooraf zodat we het kunnen beoordelen." },
      { question: "Wat als ik niet tevreden ben?", answer: "Je gratis touch-up (4-6 weken later) is speciaal voor aanpassingen. Dit is jouw moment om wijzigingen aan te brengen." },
    ],
  },
  {
    slug: "nazorg",
    label: "Nazorg",
    title: "Genezing & Aftercare Vragen",
    items: [
      { question: "Wat kan ik doen na mijn behandeling?", answer: "Vermijd water, zweten, intensieve oefeningen, en directe zon gedurende 10-14 dagen. We geven je volledige instructies!" },
      { question: "Hoe snel zie ik mijn eindresultaat?", answer: "Direct na behandeling ziet het er donkerder uit. Na 2-3 weken genezing zie je het echte resultaat. Volledig genezen na 4-6 weken." },
      { question: "Zal het littekens nalaten?", answer: "Nee! PMU werkt oppervlakkig en laat geen littekens na. Volg gewoon de nazorginstructies nauwkeurig op." },
      { question: "Kan ik sporten na de behandeling?", answer: "Vermijd intensieve training en zweten gedurende 10-14 dagen. Zacht trainen (walking, yoga) is oke na 3-5 dagen." },
    ],
  },
  {
    slug: "betaling",
    label: "Betaling",
    title: "Prijzen & Betaling Vragen",
    items: [
      { question: "Wat zit in de prijs inbegrepen?", answer: "ALLES: consult, mapping, behandeling, pigmenten, aftercare kit, EN gratis touch-up. Geen verborgen kosten!" },
      { question: "Kan ik het in termijnen betalen?", answer: "Ja! We bieden flexibele betalingsopties. Je kunt 50% betalen bij boeking, 50% op dag van behandeling." },
      { question: "Wat kosten touch-ups?", answer: "De eerste touch-up (4-6 weken) is GRATIS. Jaarlijkse touch-ups daarna kosten \u20AC100-150." },
      { question: "Wat is het annuleringsbeleid?", answer: "Annulering tot 48 uur = volledige terugbetaling. 48 uur tot afspraak = 50% terugbetaling. No-show = geen terugbetaling." },
    ],
  },
];

// Homepage FAQ (subset of general questions)
export const homeFAQ: FAQItem[] = [
  { question: "Doet microblading pijn?", answer: "De meeste klanten ervaren minimaal ongemak. Voor de behandeling breng ik een verdovende cr\u00E8me aan, waardoor je weinig tot niets voelt." },
  { question: "Hoe lang houdt PMU resultaat?", answer: "Afhankelijk van je huidtype en levensstijl houdt het resultaat gemiddeld 1 tot 3 jaar. Met een jaarlijkse touch-up blijft het altijd fris." },
  { question: "Wat is het verschil tussen de technieken?", answer: "Microblading cre\u00EBert individuele haartjes. Powder brows geven een zachtere, poederachtige finish. Combi brows combineren beide technieken." },
  { question: "Hoe verloopt de nazorg?", answer: "Na de behandeling ontvang je een nazorgpakket met instructies. Na 4-6 weken kom je terug voor een gratis touch-up." },
  { question: "Kan ik een consult boeken zonder verplichting?", answer: "Absoluut! Een intake gesprek is geheel vrijblijvend. We bespreken je wensen en je krijgt een eerlijk advies zonder druk." },
];

// Payment FAQ for pricing page
export const paymentFAQ: FAQItem[] = [
  { question: "Hoe betaal ik?", answer: "We accepteren alle betaalmethoden: contant, PIN, transfers, en creditcards. Betaling geschiedt op moment van afspraak." },
  { question: "Kan ik het in termijnen betalen?", answer: "Ja! We bieden flexibele betalingsopties. Neem contact op voor arrangementen. Je kunt ook 50% betalen bij boeking en 50% op dag van behandeling." },
  { question: "Zijn er extra kosten voor touch-ups?", answer: "De eerste touch-up (4-6 weken) is GRATIS. Jaarlijkse touch-ups daarna kosten \u20AC100-150 afhankelijk van wat nodig is." },
  { question: "Wat gebeurt er als ik niet tevreden ben?", answer: "Je gratis touch-up is speciaal bedoeld voor aanpassingen. Dit is jouw kans om wijzigingen aan te brengen. We willen dat je 100% tevreden bent." },
  { question: "Wat als ik moet annuleren?", answer: "Annulering tot 48 uur van tevoren = volledige terugbetaling. Annulering binnen 48 uur = 50% terugbetaling. No-show = geen terugbetaling." },
];

// Behandelingen overview FAQ
export const behandelingenFAQ: FAQItem[] = [
  { question: "Wat is het verschil tussen de technieken?", answer: "Microblading cre\u00EBert individuele haartjes voor een zeer natuurlijk uiterlijk. Powder brows geven een zachte, poederachtige finish die meer volle wenkbrauwen oplevert. Combi brows combineren beide technieken voor maximale dimensie." },
  { question: "Welke techniek is geschikt voor mijn huidtype?", answer: "Microblading werkt best op normale tot droge huid. Powder brows en combi brows zijn geschikt voor alle huidtypes, inclusief vette huid. Tijdens je intake gesprek bepalen we welke optie het best voor jou is." },
  { question: "Hoe lang duurt een behandeling?", answer: "Een volledige behandeling duurt gemiddeld 2-3 uur, inclusief intake gesprek, mapping en de behandeling zelf. Dit zorgt ervoor dat we alle tijd nemen voor perfectie." },
  { question: "Doet het pijn?", answer: "De meeste klanten ervaren minimaal ongemak. We gebruiken een topicale verdovende cr\u00E8me vooraf, zodat je minimale sensatie voelt. Veel klanten beschrijven het als een licht kriebel- of krabbelgevoel." },
  { question: "Wat zijn de nazorginstructies?", answer: "Je ontvangt een compleet nazorgpakket met instructies. Vermijd water, zweten en directe zonnestraling voor 10-14 dagen. Deze voorzorgsmaatregelen zorgen voor optimale genezing en kleurontwikkeling." },
];
