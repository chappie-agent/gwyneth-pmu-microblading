export interface TreatmentStep {
  title: string;
  description: string;
}

export interface AftercareDayItem {
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Treatment {
  slug: string;
  name: string;
  label: string;
  tagline: string;
  price: number;
  priceLabel: string;
  featured?: boolean;
  featuredLabel?: string;
  heroTitle: string;
  heroDescription: string;
  whatIs: {
    title: string;
    subtitle: string;
    content: string[];
    benefits: string[];
  };
  suitability: {
    ideal: string[];
    caution: string[];
    note: string;
  };
  process: TreatmentStep[];
  aftercare: {
    title: string;
    duration: string;
    description: string;
    timeline: AftercareDayItem[];
    dos: string[];
    donts: string[];
  };
  faq: FAQItem[];
  includes: string[];
  comparison: Record<string, string>;
  usps: string[];
}

export const treatments: Treatment[] = [
  {
    slug: "microblading",
    name: "Microblading",
    label: "Hairstroke Techniek",
    tagline: "Haarscharpe, natuurlijke lijntjes",
    price: 350,
    priceLabel: "\u20AC350",
    heroTitle: "Haarscharpe Wenkbrauwen Met Microblading",
    heroDescription: "De meest natuurlijke permanente make-up techniek. Perfecte haartjes, geen schade aan bestaande haartjes, resultaten die jaren meegaan.",
    whatIs: {
      title: "Wat is Microblading?",
      subtitle: "De Kunst van Perfectie",
      content: [
        "Microblading is een semi-permanente make-up techniek waarbij we haarscharpe lijntjes aanbrengen met behulp van een handmatig instrument. Dit cre\u00EBert het uiterlijk van perfecte natuurlijke wenkbrauwharen.",
        "In tegenstelling tot poederachtige technieken, gebruikt microblading zeer fijne naalden om individuele haartjespatronen te cre\u00EBren. Het resultaat is ongelooflijk natuurlijk \u2014 iets wat vrienden en familie zal opmerken, maar waarvan ze niet zullen weten dat het niet jouw echte haartjes zijn.",
      ],
      benefits: [
        "Ongelooflijk natuurlijk uiterlijk",
        "Haartjespatroon dat volledig aansluit bij jou",
        "Geen schade aan bestaande haartjes",
        "Langdurig resultaat (1-3 jaar)",
        "Miniem ongemak tijdens behandeling",
        "Snellere genezing dan poedertechnieken",
        "Perfecte vorm en symmetrie",
        "Gepersonaliseerde kleur matching",
      ],
    },
    suitability: {
      ideal: [
        "Normale tot droge huid",
        "Dunne of onregelmatige wenkbrauwen",
        "Iedereen die meer definitie wil",
        "Degenen met littekens in wenkbrauwlijn",
        "Voorkeur voor natuurlijk uiterlijk",
        "Geduldig met genezingsproces",
      ],
      caution: [
        "Erg vette huid (poeder kan beter werken)",
        "Zeer gevoelige huid",
        "Actieve huidaandoeningen in gebied",
        "Zwangerschap",
        "Bepaalde medicijnen (bloedverdunners)",
        "Allergie voor PMU-pigmenten",
      ],
      note: "Twijfel je of microblading voor jou geschikt is? Boek een gratis consult en we bespreken alle opties!",
    },
    process: [
      { title: "Intake", description: "We bespreken je wensen, gezichtsvorm, huidtype, en verwachte kleur. Geen druk, zuiver informatief." },
      { title: "Mapping", description: "Met precisie tekenen we jouw perfecte vorm. Dit doen we totdat je 100% tevreden bent." },
      { title: "Verdoving", description: "Topicale verdovende cr\u00E8me zorgt voor minimaal ongemak tijdens de behandeling." },
      { title: "Behandeling", description: "Voorzichtige haartjes worden aangebracht met een handmatig instrument. Dit duurt ongeveer 1-1,5 uur." },
    ],
    aftercare: {
      title: "Het Genezingsproces \u2014 Dag 1-14",
      duration: "14 dagen",
      description: "De eerste twee weken zijn cruciaal voor optimale resultaten. Hier is wat je kunt verwachten en hoe je je wenkbrauwen het best verzorgt.",
      timeline: [
        { title: "Dag 1 \u2014 Direct Na Behandeling", description: "Je wenkbrauwen kunnen rood en gezwollen zijn. Dit is normaal en zal snel afnemen. De pigmentkleur kan donkerder lijken dan het uiteindelijk resultaat." },
        { title: "Dag 2-3 \u2014 Begin Genezing", description: "Zwelling gaat terug. Je wenkbrauwen kunnen jeukend aanvoelen. Dit is normaal! Blijf uit de buurt van water en zweetige activiteiten." },
        { title: "Dag 4-7 \u2014 Schilfering Begint", description: "Je wenkbrauwen beginnen te schilferen terwijl de huid geneest. NIET krabben! De schilfering gaat vanzelf af. De kleur kan lichter lijken." },
        { title: "Dag 8-14 \u2014 Verdere Genezing", description: "Schilfering stopt geleidelijk. De kleur stabiliseert zich. Je wenkbrauwen zullen lichter zijn dan tijdens de eerste dag \u2014 dit is normaal!" },
        { title: "Dag 14+ \u2014 Volledig Genezen", description: "Genezing is meestal compleet. Nu kun je zien hoe het eindresultaat eruitziet. Een gratis touch-up is inbegrepen na 4-6 weken." },
      ],
      dos: [
        "Houd het gebied schoon en droog",
        "Gebruik de verstrekte aftercare balm",
        "Wees voorzichtig bij het wassen",
        "Draag zonnebrandcr\u00E8me (SPF 30+)",
        "Sleep op je rug (vermijd je gezicht)",
        "Drink veel water voor gezonde genezing",
        "Neem de gratis touch-up waar",
      ],
      donts: [
        "Vermijd water gedurende 10-14 dagen",
        "Geen zwemmen, sauna of warm bad",
        "Geen intensieve trainingen/zweten",
        "Krab NIET aan je wenkbrauwen",
        "Vermijd directe zon",
        "Geen make-up op het gebied",
        "Geen vettige cr\u00E8mes gebruiken",
      ],
    },
    faq: [
      { question: "Doet microblading pijn?", answer: "Nee, niet echt. We gebruiken een topicale verdovende cr\u00E8me die het gebied compleet gevoelloos maakt. Je voelt misschien wat druk, maar geen pijn. Veel cli\u00EBnten vallen zelfs in slaap!" },
      { question: "Hoe lang houdt microblading?", answer: "Microblading houdt typisch 1-3 jaar, afhankelijk van je huidtype, levensstijl en zonexpositie. Met jaarlijkse touch-ups blijft het altijd fris." },
      { question: "Kan ik bestaande microblading verbeteren?", answer: "Ja! We kunnen aanpassingen maken aan bestaande microblading. Afhankelijk van de huidige situatie kunnen we touchups, correcties of een complete refresh doen." },
      { question: "Zal het verbleken?", answer: "Ja, zoals alle permanente make-up verbleekt microblading geleidelijk. Dit is normaal en natuurlijk. Daarom raden we jaarlijkse touch-ups aan om het fris te houden." },
      { question: "Kan ik mijn echte wenkbrauwhaartjes beschadigen?", answer: "Nee! Microblading werkt boven je echte wenkbrauwharen en beschadigt ze niet. Ze groeit er naast. Veel cli\u00EBnten genieten van beide: hun echte haartjes PLUS de PMU voor perfectie." },
    ],
    includes: [
      "Gratis intake consult (30 min)",
      "Vorm & kleur mapping",
      "Volledige behandeling (2-3 uur)",
      "Premium pigmenten & materialen",
      "Aftercare balm & instructies",
      "Gratis touch-up (4-6 weken)",
    ],
    comparison: {
      techniek: "Handmatige haartjes",
      uiterlijk: "Natuurlijk, haairig",
      duur: "1-3 jaar",
      geschikt: "Normale tot droge huid",
      onderhoud: "Jaarlijks",
      pijn: "Minimaal met verdoving",
      genezing: "10-14 dagen",
    },
    usps: [
      "Haarscharpe, natuurlijke lijntjes",
      "Handmatige precisietechniek",
      "Inclusief gratis touch-up",
      "Resultaat 1-3 jaar",
    ],
  },
  {
    slug: "powder-brows",
    name: "Powder Brows",
    label: "Soft Shading",
    tagline: "Zachte, poederachtige finish",
    price: 375,
    priceLabel: "\u20AC375",
    featured: true,
    featuredLabel: "Meest Populair",
    heroTitle: "Volle Wenkbrauwen Met Powder Brows",
    heroDescription: "De populairste techniek \u2014 zachte, poederachtige schading voor volle en gedefinieerde wenkbrauwen. Perfect voor alle huidtypes.",
    whatIs: {
      title: "Wat zijn Powder Brows?",
      subtitle: "Volle & Zachte Wenkbrauwen",
      content: [
        "Powder brows (ook bekend als ombre brows of soft shading) gebruiken een zachte, poederachtige schadingstechniek om je wenkbrauwen voller en gedefinieerder te maken. Het resultaat is vergelijkbaar met ingetekende wenkbrauwen met poeder.",
        "Dit verschilt van microblading, dat individuele haartjes cre\u00EBert. Powder brows geven een meer uniform, gestileerd uiterlijk dat zeer populair is onder degenen die graag een meer opvallend resultaat willen.",
      ],
      benefits: [
        "Volle, gedefinieerde look",
        "Perfect voor alle huidtypes (incl. vette huid)",
        "Zachte, natuurlijke toon",
        "Langdurig resultaat",
        "Gestyled uiterlijk zonder dagelijks werk",
        "Gemakkelijk aan te passen aan jouw stijl",
        "Ombre-effect mogelijk (donkerder aan poten)",
        "Minimale touch-ups nodig",
      ],
    },
    suitability: {
      ideal: [
        "Alle huidtypes (inclusief vet)",
        "Degenen die volle brows willen",
        "Mensen met weinig natuurlijke haartjes",
        "Voorkeur voor een gestyled look",
        "Gevoelige huid die hairtjes niet toelaat",
        "Actieve levensstijl",
      ],
      caution: [
        "Zeer donkere huidtoon (kleurkeuze)",
        "Actieve huidaandoeningen",
        "Zwangerschap",
        "Bepaalde medicijnen (bloedverdunners)",
        "Recent chemisch peeling",
        "Allergie voor pigmenten",
      ],
      note: "Wil je zeker weten? Boek een gratis consult voor persoonlijk advies!",
    },
    process: [
      { title: "Consult", description: "We bespreken je voorkeur, gezichtsvorm, en gewenste kleur. Alles op jouw tempo." },
      { title: "Mapping", description: "Precisie tekenen totdat je vorm perfect is. Je feedback is essentieel." },
      { title: "Verdoving", description: "Topicale verdovende cr\u00E8me zorgt voor maximaal comfort." },
      { title: "Shading", description: "Zachte schaduwing wordt aangebracht met precisie-apparatuur. Ongeveer 2-3 uur." },
    ],
    aftercare: {
      title: "Genezing & Nazorg \u2014 Dag 1-21",
      duration: "21 dagen",
      description: "Powder brows genezen iets langer dan microblading. Hier is de complete gids voor de eerste drie weken.",
      timeline: [
        { title: "Dag 1 \u2014 Direct Na Behandeling", description: "Roodheid en lichte zwelling zijn normaal. De kleur ziet er donkerder uit dan het eindresultaat. Dit zal verminderen." },
        { title: "Dag 2-5 \u2014 Zwelling Neemt Af", description: "Zwelling neemt af. Je wenkbrauwen voelen strak aan. NIET in water! Het gebied kan kriebelen \u2014 dit is normaal." },
        { title: "Dag 6-10 \u2014 Schilfering Begint", description: "Schilfering begint. De kleur wordt lichter. Dit is het genezingsproces. Niet aan krabben! Het gaat vanzelf." },
        { title: "Dag 11-14 \u2014 Voortdurende Schilfering", description: "Schilfering gaat door. De kleur zet zich af. Je wenkbrauwen zien er misschien onregelmatig uit \u2014 dit is normaal." },
        { title: "Dag 15-21 \u2014 Bijna Genezen", description: "Schilfering stopt. De kleur stabiliseert. De huid is nu volledig genezen. Touch-up is nog steeds nodig na 4-6 weken." },
      ],
      dos: [
        "Houd schoon en droog gedurende 14-21 dagen",
        "Gebruik de verstrekte aftercare balm",
        "Voorzichtig omgaan met water",
        "Draag SPF 50+ zonnebrandcr\u00E8me",
        "Sleep op je rug",
        "Volg de verstrekte verzorging",
        "Plan je touch-up na 4-6 weken",
      ],
      donts: [
        "GEEN water op gezicht 14-21 dagen",
        "Geen zwemmen of spa",
        "Geen zware oefeningen/zweet",
        "NIET aan schilfering krabben",
        "Geen directe zonblootstelling",
        "Geen make-up op gebied",
        "Geen stoom of sauna",
      ],
    },
    faq: [
      { question: "Hoe ziet het er onmiddellijk na uit?", answer: "Direct na de behandeling zijn je wenkbrauwen rood, gezwollen, en de kleur ziet er donker uit. Dit is normaal! Na 2-3 weken ziet het er veel natuurlijker uit. De genezingstijd is langer dan microblading." },
      { question: "Kan ik een ombre-effect krijgen?", answer: "Ja! Ombre brows zijn een populaire variant. Dit geeft een geleidelijke overgang van lichter naar donkerder. Perfect voor meer definitie!" },
      { question: "Hoe lang houdt powder brows?", answer: "Powder brows houdt gemiddeld 1-2 jaar. Met jaarlijkse touch-ups blijft het fris. Sommige klanten hebben ze langer!" },
      { question: "Is het geschikt voor vette huid?", answer: "Ja! Dit is eigenlijk een groot voordeel van powder brows. Ze werken beter op vette huid dan microblading. De pigmenten hechten beter door de zachte schadingstechniek." },
      { question: "Kan ik nog steeds mijn echte haartjes zien?", answer: "Ja! De PMU-pigmenten liggen boven je echte wenkbrauwhaartjes. Je ziet zowel je echte haartjes als de PMU, wat een mooie combinatie cre\u00EBert." },
    ],
    includes: [
      "Gratis intake consult",
      "Vorm & kleur mapping",
      "Volledige behandeling (2-3 uur)",
      "Premium pigmenten",
      "Aftercare balm & richtlijnen",
      "Gratis touch-up (4-6 weken)",
    ],
    comparison: {
      techniek: "Zachte schaduwing",
      uiterlijk: "Voller, poederachtig",
      duur: "1-2 jaar",
      geschikt: "Alle huidtypes",
      onderhoud: "6-12 maanden",
      pijn: "Minimaal met verdoving",
      genezing: "14-21 dagen",
    },
    usps: [
      "Zachte, poederachtige finish",
      "Voller en gedefinieerder",
      "Inclusief gratis touch-up",
      "Geschikt voor elk huidtype",
    ],
  },
  {
    slug: "combi-brows",
    name: "Combi Brows",
    label: "Best of Both",
    tagline: "Microblading + powder shading",
    price: 395,
    priceLabel: "\u20AC395",
    featuredLabel: "Premium Combinatie",
    heroTitle: "Het Beste Van Beide \u2014 Combi Brows",
    heroDescription: "Microblading + Powder Shading gecombineerd. Maximale dimensie, definitie, en een volle look die perfect op jou is afgestemd.",
    whatIs: {
      title: "Wat zijn Combi Brows?",
      subtitle: "Drie Voordelen in E\u00E9n",
      content: [
        "Combi brows combineren het beste van microblading en powder brows. We cre\u00EBren individuele haartjes met microblading, en voegen zachte schaduwing toe met powder shading.",
        "Het resultaat? Wenkbrauwen met maximale dimensie, definitie, en natuurlijkheid. Dit is de meest veelzijdige optie die we aanbieden.",
      ],
      benefits: [
        "Natuurlijke hairtjes + volle look",
        "Maximale dimensie & definitie",
        "Werkt voor bijna iedereen",
        "Lange duur (1-2 jaar)",
        "Zeer gestyled uiterlijk",
        "Perfecte balans tussen technieken",
        "Aangepast aan jouw gezichtsvorm",
        "Best value for money",
      ],
    },
    suitability: {
      ideal: [
        "Iedereen! Dit werkt voor alle huidtypes",
        "Degenen die het beste willen van beide",
        "Actieve levensstijl (langduriger)",
        "Vergaande haaruitval",
        "Voorkeur voor gestyled look",
        "Perfectie zoeken",
      ],
      caution: [
        "Zwangerschap",
        "Bepaalde medicijnen",
        "Actieve huidaandoeningen",
        "Recent chemische peeling",
        "Allergie voor pigmenten",
        "Zeer gevoelige huid",
      ],
      note: "Combi brows zijn onze meest veelzijdige optie. Boek een consult om te zien of het bij jou past!",
    },
    process: [
      { title: "Intake", description: "We bespreken jouw voorkeur en wat je ervan verwacht. Alles staat open voor discussie." },
      { title: "Mapping", description: "Precisie tekening totdat jij 100% tevreden bent met de vorm." },
      { title: "Verdoving", description: "Topicale verdovende cr\u00E8me voor maximaal comfort." },
      { title: "Beide Technieken", description: "Eerst microblading hairtjes, dan powder shading. Dit duurt 3-3,5 uur." },
    ],
    aftercare: {
      title: "Genezing Voor Combi Brows",
      duration: "21 dagen",
      description: "Combi brows genezen vergelijkbaar met powder brows (wat langer dan microblading alleen). Hier is de volledige gids.",
      timeline: [
        { title: "Dag 1-2 \u2014 Zwelling & Roodheid", description: "Dit is normaal direct na beide technieken. Zwelling neemt geleidelijk af. Kleur ziet er donkerder uit." },
        { title: "Dag 3-7 \u2014 Eerste Fase Genezing", description: "Zwelling gaat weg. Schilfering begint. NIET in water! Niet aan krabben." },
        { title: "Dag 8-14 \u2014 Schilfering Voortdurend", description: "Schilfering gaat voort. De microblading hairtjes en powder worden duidelijker. Kleur begint lichter te worden." },
        { title: "Dag 15-21 \u2014 Bijna Klaar", description: "Schilfering stopt grotendeels. De huid geneest volledig. Het eindresultaat begint duidelijk te worden." },
        { title: "Dag 21+ \u2014 Volledig Genezen", description: "Genezing is compleet. Nu zie je het echte eindresultaat. Touch-up na 4-6 weken wordt sterk aanbevolen." },
      ],
      dos: [
        "Houd droog en schoon 14-21 dagen",
        "Gebruik aftercare balm zorgvuldig",
        "Voorzichtig met water",
        "Draag SPF 50+ zonnebrandcr\u00E8me",
        "Sleep op je rug",
        "Volg alle instructies nauwkeurig op",
        "Plan je touch-up voortijdig",
      ],
      donts: [
        "GEEN water 14-21 dagen",
        "Geen zwemmen of spa",
        "Geen intens zweten",
        "NIET aan schilfering krabben",
        "Geen directe zon",
        "Geen make-up op gebied",
        "Geen sauna/stoom",
      ],
    },
    faq: [
      { question: "Waarom kiezen voor combi in plaats van \u00E9\u00E9n techniek?", answer: "Combi brows geven je het beste van beide werelden: natuurlijke hairtjes van microblading PLUS volle definitie van powder. Het resultaat is meer dimensionaal en duurt langer." },
      { question: "Hoe lang duurt een combi-behandeling?", answer: "Combi brows duren ongeveer 3-3,5 uur vanwege beide technieken. Dit geeft ons veel tijd om perfecte resultaten te cre\u00EBren." },
      { question: "Is combi brows geschikt voor alle huidtypes?", answer: "Ja! Dit is eigenlijk een groot voordeel van combi brows. Het werkt goed voor alle huidtypes, omdat we beide technieken flexibel kunnen aanpassen." },
      { question: "Hoe lang blijft combi brows?", answer: "Combi brows houdt doorgaans 1-2 jaar. Met jaarlijkse touch-ups blijft het resultaat perfect." },
      { question: "Wat gebeurt er als ik niet tevreden ben?", answer: "De touch-up na 4-6 weken is gratis en is speciaal bedoeld voor aanpassingen. Dit is jouw kans om kleine wijzigingen aan te brengen." },
    ],
    includes: [
      "Gratis uitgebreid consult",
      "Vorm & kleur mapping",
      "Microblading + Powder",
      "Premium pigmenten",
      "Complete aftercare kit",
      "Gratis touch-up",
    ],
    comparison: {
      techniek: "Beide technieken",
      uiterlijk: "Dimensionaal",
      duur: "1-2 jaar",
      geschikt: "Alle huidtypes",
      onderhoud: "6-12 maanden",
      pijn: "Minimaal met verdoving",
      genezing: "14-21 dagen",
    },
    usps: [
      "Microblading + powder shading",
      "Maximale dimensie & definitie",
      "Inclusief gratis touch-up",
      "Meest veelzijdige optie",
    ],
  },
];

// Comparison table labels
export const comparisonLabels: Record<string, string> = {
  techniek: "Techniek",
  uiterlijk: "Uiterlijk",
  duur: "Duur",
  geschikt: "Geschikt voor",
  onderhoud: "Onderhoudsbeurt",
  pijn: "Pijn/ongemak",
  genezing: "Genezingstijd",
};

// Homepage process steps (generic)
export const homeProcessSteps: TreatmentStep[] = [
  { title: "Intake", description: "Persoonlijk gesprek over je wensen, huidtype en verwachtingen." },
  { title: "Mapping", description: "Met precisie tekenen we de perfecte vorm tot je helemaal tevreden bent." },
  { title: "Behandeling", description: "In een ontspannen sfeer met de hoogste kwaliteit materialen en technieken." },
  { title: "Nazorg", description: "Uitgebreide instructies en een gratis touch-up na 4-6 weken." },
];

// USP items
export const uspItems = [
  { title: "Natuurlijk Resultaat", description: "Subtiele verfijning die jouw eigen schoonheid versterkt", icon: "sparkles" as const },
  { title: "Hygi\u00EBnisch", description: "Gecertificeerde materialen en hoogste standaarden", icon: "shield-check" as const },
  { title: "Maatwerk", description: "Aangepast aan jouw unieke gelaatstrekken", icon: "palette" as const },
  { title: "Premium Pigmenten", description: "Hoogwaardige, veilige pigmenten voor langdurig resultaat", icon: "gem" as const },
];
