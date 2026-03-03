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

/**
 * "core"        – Main PMU brow treatments shown on the homepage
 * "additional"  – Extra services only shown on the Behandelingen page
 */
export type TreatmentCategory = "core" | "additional";

export interface Treatment {
  slug: string;
  name: string;
  label: string;
  tagline: string;
  price: number;
  priceLabel: string;
  featured?: boolean;
  featuredLabel?: string;
  /** Defaults to "core" when omitted */
  category?: TreatmentCategory;
  /** Sanity image reference (from CMS) */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
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
  /** Optional – only core brow treatments have comparison data */
  comparison?: Record<string, string>;
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
      { title: "Behandeling", description: "Voorzichtige haartjes worden aangebracht met een handmatig instrument. De behandeling duurt circa 2 uur." },
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
      "Volledige behandeling (ca. 2 uur)",
      "Premium pigmenten & materialen",
      "Aftercare balm & instructies",
      "Nabehandeling na 6 weken inbegrepen",
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
      { title: "Shading", description: "Zachte schaduwing wordt aangebracht met precisie-apparatuur. De behandeling duurt circa 2 uur." },
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
      "Volledige behandeling (ca. 2 uur)",
      "Premium pigmenten",
      "Aftercare balm & richtlijnen",
      "Nabehandeling na 6 weken inbegrepen",
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
      { title: "Beide Technieken", description: "Eerst microblading hairtjes, dan powder shading. De behandeling duurt circa 2,5 uur." },
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
      { question: "Hoe lang duurt een combi-behandeling?", answer: "Combi brows duren ongeveer 2,5 uur vanwege beide technieken. Dit geeft ons de tijd om perfecte resultaten te cre\u00EBren." },
      { question: "Is combi brows geschikt voor alle huidtypes?", answer: "Ja! Dit is eigenlijk een groot voordeel van combi brows. Het werkt goed voor alle huidtypes, omdat we beide technieken flexibel kunnen aanpassen." },
      { question: "Hoe lang blijft combi brows?", answer: "Combi brows houdt doorgaans 1-2 jaar. Met jaarlijkse touch-ups blijft het resultaat perfect." },
      { question: "Wat gebeurt er als ik niet tevreden ben?", answer: "De touch-up na 4-6 weken is gratis en is speciaal bedoeld voor aanpassingen. Dit is jouw kans om kleine wijzigingen aan te brengen." },
    ],
    includes: [
      "Gratis uitgebreid consult",
      "Vorm & kleur mapping",
      "Volledige behandeling (ca. 2,5 uur)",
      "Premium pigmenten",
      "Complete aftercare kit",
      "Nabehandeling na 6 weken inbegrepen",
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
  /* ──────────────────────────────────────────────────────────────────
     ADDITIONAL SERVICES — shown on Behandelingen page, NOT on homepage
     ────────────────────────────────────────────────────────────────── */
  {
    slug: "eyeliner",
    name: "Eyeliner PMU",
    label: "Permanente Make-up",
    tagline: "Gedefinieerde ogen, elke dag",
    price: 200,
    priceLabel: "\u20AC200",
    category: "additional",
    heroTitle: "Permanente Eyeliner \u2014 Altijd Gedefinieerd",
    heroDescription: "Wake up with perfectly defined eyes. Permanente eyeliner bespaart je dagelijkse make-up routine en geeft een subtiele, natuurlijke definitie.",
    whatIs: {
      title: "Wat is Eyeliner PMU?",
      subtitle: "Moeiteloos Gedefinieerde Ogen",
      content: [
        "Eyeliner PMU is een permanente make-up techniek waarbij pigment wordt aangebracht langs de wimperrand. Het resultaat is een subtiele, natuurlijke definitie die je ogen laat opvallen \u2014 zonder dat je dagelijks eyeliner hoeft aan te brengen.",
        "Of je nu kiest voor een fijne lashline (tussen de wimpers) of een zachtere eyeliner look, het resultaat is altijd elegant en tijdbesparend. Perfect voor wie elke dag wakker wil worden met prachtig gedefinieerde ogen.",
      ],
      benefits: [
        "Dagelijks tijd besparen",
        "Subtiele, natuurlijke definitie",
        "Waterproof \u2014 geen uitlopen of smudgen",
        "Perfect voor gevoelige ogen",
        "Langdurig resultaat (1-3 jaar)",
        "Geen irritatie door dagelijkse make-up",
        "Zelfvertrouwen boost",
        "Geschikt voor alle oogvormen",
      ],
    },
    suitability: {
      ideal: [
        "Mensen die dagelijks eyeliner dragen",
        "Wie moeite heeft met aanbrengen eyeliner",
        "Actieve levensstijl (sport, zwemmen)",
        "Gevoelige ogen of contactlensdragers",
        "Wie een subtiele definitie wil",
        "Dunne of lichte wimpers",
      ],
      caution: [
        "Actieve ooginfecties",
        "Recent oogoperatie (< 6 maanden)",
        "Zwangerschap",
        "Bepaalde oogmedicatie",
        "Zeer gevoelige huid rond ogen",
        "Allergie voor PMU-pigmenten",
      ],
      note: "Twijfel je of eyeliner PMU geschikt is voor jou? Boek een vrijblijvend consult!",
    },
    process: [
      { title: "Consult", description: "We bespreken je wensen: fijne lashline of zachtere eyeliner? Welke stijl past bij jou?" },
      { title: "Tekenen", description: "We tekenen de gewenste lijn zodat je vooraf het resultaat kunt zien en goedkeuren." },
      { title: "Verdoving", description: "Topicale verdovende cr\u00E8me zorgt voor comfort rond het gevoelige ooggebied." },
      { title: "Behandeling", description: "Met precisie wordt het pigment aangebracht langs de wimperrand. De behandeling duurt circa 1,5 uur." },
    ],
    aftercare: {
      title: "Nazorg Eyeliner PMU \u2014 Dag 1-10",
      duration: "10 dagen",
      description: "De huid rond de ogen is gevoelig en geneest snel. Volg deze richtlijnen voor het beste resultaat.",
      timeline: [
        { title: "Dag 1 \u2014 Direct Na Behandeling", description: "Lichte zwelling en roodheid rond de ogen is normaal. De kleur ziet er intenser uit dan het eindresultaat." },
        { title: "Dag 2-3 \u2014 Zwelling Neemt Af", description: "De zwelling vermindert snel. Je ogen kunnen tranen. Vermijd aanraken en water in het ooggebied." },
        { title: "Dag 4-7 \u2014 Genezing & Schilfering", description: "Lichte schilfering is normaal. De kleur wordt zachter. Niet krabben of wrijven!" },
        { title: "Dag 8-10 \u2014 Resultaat Zichtbaar", description: "De huid is grotendeels genezen. Het subtiele, definitieve resultaat wordt zichtbaar." },
      ],
      dos: [
        "Houd het ooggebied schoon en droog",
        "Gebruik de verstrekte aftercare gel",
        "Draag een zonnebril bij felle zon",
        "Sleep op je rug (eerste nachten)",
        "Wees voorzichtig bij het wassen",
      ],
      donts: [
        "Vermijd water op het ooggebied (7 dagen)",
        "Geen oogmake-up (10 dagen)",
        "Geen contactlenzen (eerste 3 dagen)",
        "Niet krabben of wrijven",
        "Geen zwemmen of sauna",
        "Geen mascara of eyeliner",
      ],
    },
    faq: [
      { question: "Doet eyeliner PMU pijn?", answer: "Met de verdovende cr\u00E8me voel je weinig tot niets. Het ooggebied is gevoelig, maar de meeste cli\u00EBnten ervaren het als zeer draaglijk." },
      { question: "Heb ik een nabehandeling nodig?", answer: "Niet iedereen heeft een nabehandeling nodig. Bij sommige klanten pakt het pigment direct goed. Mocht een nabehandeling gewenst zijn, dan kan deze apart worden ingepland." },
      { question: "Hoe lang houdt eyeliner PMU?", answer: "Eyeliner PMU houdt gemiddeld 1-3 jaar, afhankelijk van je huidtype en levensstijl. Met een optionele touch-up blijft het resultaat fris." },
      { question: "Kan ik kiezen hoe dik de lijn wordt?", answer: "Absoluut! Van een subtiele lashline (onzichtbaar tussen de wimpers) tot een zachtere eyeliner look \u2014 alles is mogelijk en wordt vooraf getekend." },
      { question: "Wat kost een nabehandeling?", answer: "De prijs van \u20AC200 is exclusief een eventuele nabehandeling. Niet iedereen heeft er een nodig, maar mocht het gewenst zijn, dan bespreken we de kosten tijdens het consult." },
    ],
    includes: [
      "Vrijblijvend consult",
      "Vorm tekening & goedkeuring",
      "Volledige behandeling (ca. 1,5 uur)",
      "Premium pigmenten",
      "Aftercare gel & instructies",
    ],
    usps: [
      "Subtiele, natuurlijke definitie",
      "Dagelijks tijd besparen",
      "Waterproof resultaat",
      "Geschikt voor alle oogvormen",
    ],
  },
  {
    slug: "lashlift",
    name: "Lashlift",
    label: "Wimperbehandeling",
    tagline: "Natuurlijk gekrulde wimpers",
    price: 55,
    priceLabel: "\u20AC55",
    category: "additional",
    heroTitle: "Lashlift \u2014 Natuurlijk Gekrulde Wimpers",
    heroDescription: "Laat je eigen wimpers optimaal tot hun recht komen. Een lashlift geeft een prachtige krul en lift zonder extensions.",
    whatIs: {
      title: "Wat is een Lashlift?",
      subtitle: "Jouw Wimpers, Maar Beter",
      content: [
        "Een lashlift is een behandeling die je eigen natuurlijke wimpers omhoog krult en lift vanaf de wortel. Het resultaat? Wimpers die langer, voller en meer open lijken \u2014 zonder extensions of dagelijkse wimperkruller.",
        "De behandeling is volledig veilig, duurt slechts 45-60 minuten, en het resultaat houdt 6-8 weken aan. Perfect als je een natuurlijke look verkiest boven dramatische wimperextensions.",
      ],
      benefits: [
        "Geen dagelijkse wimperkruller nodig",
        "Natuurlijk, open blik",
        "Geen onderhoud nodig",
        "Veilig voor je eigen wimpers",
        "Resultaat 6-8 weken",
        "Combineert goed met wimperverf",
        "Snelle behandeling (45-60 min)",
        "Geen extensions nodig",
      ],
    },
    suitability: {
      ideal: [
        "Rechte of naar beneden groeiende wimpers",
        "Voorkeur voor natuurlijke look",
        "Wie extensions te intensief vindt",
        "Actieve levensstijl",
        "Gevoelige ogen",
        "Als basis voor mascara",
      ],
      caution: [
        "Zeer korte wimpers",
        "Actieve ooginfecties",
        "Recent chemische behandeling wimpers",
        "Zwangerschap (resultaat kan vari\u00EBren)",
        "Allergie voor liftproducten",
        "Beschadigde wimpers",
      ],
      note: "Een lashlift werkt het best bij wimpers met enige lengte. Tijdens het consult bekijken we samen of het bij jou past!",
    },
    process: [
      { title: "Voorbereiding", description: "We reinigen je wimpers en brengen een beschermend schildje aan op je ooglid." },
      { title: "Lifting", description: "Je wimpers worden zorgvuldig op het schildje geplaatst en het liftproduct wordt aangebracht." },
      { title: "Setting", description: "Een fixerend product zorgt ervoor dat de krul permanent wordt vastgezet." },
      { title: "Afwerking", description: "Optioneel een wimperverf voor extra definitie. Totale behandeltijd: 45-60 minuten." },
    ],
    aftercare: {
      title: "Nazorg Lashlift \u2014 Eerste 24-48 Uur",
      duration: "24-48 uur",
      description: "De nazorg van een lashlift is eenvoudig. De eerste 24-48 uur zijn het belangrijkst.",
      timeline: [
        { title: "Eerste 24 Uur", description: "Houd je wimpers volledig droog. Vermijd stoom, zweet en vochtige omgevingen." },
        { title: "24-48 Uur", description: "Nog steeds voorzichtig met water. Geen mascara of oogmake-up gebruiken." },
        { title: "Na 48 Uur", description: "Je kunt weer normaal je gezicht wassen en make-up gebruiken. De krul blijft 6-8 weken mooi." },
      ],
      dos: [
        "Houd wimpers droog (eerste 24 uur)",
        "Gebruik een wimperborstel om vorm te behouden",
        "Gebruik eventueel een voedend wimperserum",
        "Geniet van je mooie krul!",
      ],
      donts: [
        "Geen water op wimpers (24 uur)",
        "Geen mascara (48 uur)",
        "Geen wimperkruller gebruiken",
        "Niet wrijven in je ogen",
        "Geen sauna of stoom (24 uur)",
      ],
    },
    faq: [
      { question: "Hoe lang duurt het resultaat?", answer: "Een lashlift houdt gemiddeld 6-8 weken aan, afhankelijk van je natuurlijke wimpergroei-cyclus." },
      { question: "Is een lashlift schadelijk?", answer: "Nee, een professionele lashlift is veilig voor je wimpers. We gebruiken hoogwaardige producten die speciaal ontwikkeld zijn voor de gevoelige oogzone." },
      { question: "Kan ik nog mascara gebruiken?", answer: "Ja! Na 48 uur kun je gewoon mascara gebruiken. Veel klanten vinden dat ze het zelfs niet meer nodig hebben door de mooie lift." },
      { question: "Hoeveel kost een lashlift?", answer: "Een lashlift kost \u20AC55. Neem gerust contact op als je meer wilt weten!" },
      { question: "Kan ik dit combineren met wimperverf?", answer: "Absoluut! Een lashlift in combinatie met wimperverf geeft het meest intense resultaat. Dit kan in dezelfde behandeling." },
    ],
    includes: [
      "Reiniging & voorbereiding",
      "Professionele liftbehandeling",
      "Setting & fixering",
      "Optioneel wimperverf",
      "Nazorginstructies",
    ],
    usps: [
      "Natuurlijk gekrulde wimpers",
      "Geen onderhoud nodig",
      "Resultaat 6-8 weken",
      "Snelle behandeling (45-60 min)",
    ],
  },
  {
    slug: "brow-styling",
    name: "Brow Styling",
    label: "Wenkbrauw Styling",
    tagline: "Laminatie, verven & epileren",
    price: 60,
    priceLabel: "\u20AC60",
    category: "additional",
    heroTitle: "Brow Styling \u2014 Perfect Gestylde Wenkbrauwen",
    heroDescription: "Browlamination, verven en epileren in \u00E9\u00E9n behandeling. Geef je wenkbrauwen de perfecte vorm en kleur zonder permanente make-up.",
    whatIs: {
      title: "Wat is Brow Styling?",
      subtitle: "De Niet-Permanente Optie",
      content: [
        "Brow styling is een alles-in-\u00E9\u00E9n wenkbrauwbehandeling die browlamination, verven en epileren combineert. Het resultaat is volle, perfect gevormde wenkbrauwen die er gestyled uitzien \u2014 zonder permanente make-up.",
        "Bij browlamination worden je eigen wenkbrauwharen zacht gemaakt en in de gewenste richting geplaatst. In combinatie met verven en epileren cre\u00EBer je een verzorgde, volle look die 4-6 weken aanhoudt.",
      ],
      benefits: [
        "Vollere, gedefinieerde wenkbrauwen",
        "Geen permanente ingreep",
        "Combineert laminatie, verf & epilatie",
        "Resultaat 4-6 weken",
        "Ideaal als kennismaking",
        "Natuurlijke look",
        "Snelle behandeling (45-60 min)",
        "Geen genezingstijd nodig",
      ],
    },
    suitability: {
      ideal: [
        "Wie PMU nog een stap te ver vindt",
        "Onhandige of dunne wenkbrauwharen",
        "Wenkbrauwen die alle kanten op groeien",
        "Wie meer volume en definitie wil",
        "Als voorbereiding of kennismaking voor PMU",
        "Regelmatig onderhoud van wenkbrauwen",
      ],
      caution: [
        "Allergie voor laminatie- of verfproducten",
        "Actieve huidaandoeningen in het gebied",
        "Zeer beschadigde wenkbrauwharen",
        "Zwangerschap (resultaat kan vari\u00EBren)",
        "Recent chemische peeling",
        "Open wondjes in wenkbrauwgebied",
      ],
      note: "Brow styling is perfect als je nog niet klaar bent voor PMU, maar wel prachtige wenkbrauwen wilt. Boek gerust een afspraak!",
    },
    process: [
      { title: "Analyse", description: "We bekijken je wenkbrauwen en bespreken de gewenste vorm, kleur en stijl." },
      { title: "Laminatie", description: "Je wenkbrauwharen worden zacht gemaakt en in de gewenste richting geplaatst voor een volle look." },
      { title: "Verven", description: "De perfecte kleur wordt gekozen en aangebracht voor optimale definitie." },
      { title: "Epileren & Finish", description: "Overtollige haartjes worden verwijderd voor een strakke, nette vorm. Totale behandeltijd: 45-60 minuten." },
    ],
    aftercare: {
      title: "Nazorg Brow Styling \u2014 Eerste 24 Uur",
      duration: "24 uur",
      description: "De nazorg is eenvoudig. Houd je wenkbrauwen de eerste 24 uur droog voor het beste resultaat.",
      timeline: [
        { title: "Eerste 24 Uur", description: "Houd je wenkbrauwen droog. Vermijd water, stoom en zweet in het gezicht." },
        { title: "Na 24 Uur", description: "Je kunt weer normaal je gezicht wassen. Gebruik eventueel een voedende brow gel." },
        { title: "Week 1-6", description: "Geniet van je gestylde wenkbrauwen! Het resultaat houdt 4-6 weken aan." },
      ],
      dos: [
        "Houd wenkbrauwen droog (24 uur)",
        "Borstel ze dagelijks met een spoolie",
        "Gebruik optioneel een voedende brow gel",
        "Boek tijdig je volgende afspraak",
      ],
      donts: [
        "Geen water op wenkbrauwen (24 uur)",
        "Niet wrijven of krabben",
        "Geen olie-gebaseerde producten (24 uur)",
        "Geen sauna of stoom (24 uur)",
      ],
    },
    faq: [
      { question: "Hoe lang houdt brow styling?", answer: "Het resultaat van brow styling houdt gemiddeld 4-6 weken aan. Daarna kun je de behandeling herhalen voor continu mooie wenkbrauwen." },
      { question: "Is browlamination schadelijk?", answer: "Nee, browlamination is veilig wanneer het door een professional wordt uitgevoerd. We gebruiken hoogwaardige producten die je haartjes voeden." },
      { question: "Is dit een alternatief voor PMU?", answer: "Brow styling is een mooie niet-permanente optie. Het is ook een ideale manier om te ontdekken of je blij bent met vollere wenkbrauwen, voordat je eventueel voor PMU kiest." },
      { question: "Hoeveel kost brow styling?", answer: "Brow styling kost \u20AC60. Neem gerust contact op als je meer wilt weten!" },
      { question: "Wat is het verschil met PMU?", answer: "PMU brengt pigment aan in de huid voor een langdurig resultaat (1-3 jaar). Brow styling werkt met je eigen haartjes en houdt 4-6 weken aan. Beide hebben hun voordelen!" },
    ],
    includes: [
      "Wenkbrauw analyse & advies",
      "Browlamination behandeling",
      "Verven in de perfecte kleur",
      "Epileren voor strakke vorm",
      "Nazorginstructies",
    ],
    usps: [
      "Laminatie, verven & epileren",
      "Geen permanente ingreep",
      "Resultaat 4-6 weken",
      "Ideale kennismaking",
    ],
  },
];

/** Core PMU brow treatments — shown on homepage */
export const coreTreatments = treatments.filter(
  (t) => (t.category ?? "core") === "core"
);

/** Additional services — only on Behandelingen page */
export const additionalServices = treatments.filter(
  (t) => t.category === "additional"
);

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
