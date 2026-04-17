export interface Review {
  name: string;
  treatment: string;
  rating: number;
  text: string;
  image?: string;
}

export const reviews: Review[] = [
  {
    name: "DeirdreTani Broshka",
    treatment: "Microblading",
    rating: 5,
    text: "Gwyneth is een vakvrouw! Ze neemt de tijd voor je, werkt heel nauwgezet en luistert goed naar je wensen. Daarnaast is ze een warm en fijn mens waarbij je je snel op je gemak voelt. Het resultaat is ontzettend mooi!",
  },
  {
    name: "Baan",
    treatment: "Powder Brows",
    rating: 5,
    text: "Wat ben ik blij met mijn 'nieuwe' wenkbrauwen! Ik ben heel ziek geweest en door de behandelingen had ik praktisch geen wenkbrauwen meer, ook niet na een paar jaar. Maar nu, door Gwyneth, heb ik supermooi en natuurlijke wenkbrauwen! Ze zijn nog nooit zo mooi geweest. Ik ben er ontzettend blij mee en Gwyneth heel dankbaar!",
  },
  {
    name: "Nienke",
    treatment: "Microblading",
    rating: 5,
    text: "Ik heb recentelijk mijn wenkbrauwen laten microbladen bij Gwyneth en ben ontzettend blij met het resultaat. Super professioneel en veel mooier en natuurlijker dan ik het zelf met normale make-up kan krijgen. Aanrader!",
  },
  {
    name: "Esther van Middelkoop",
    treatment: "Microblading & Eyeliner",
    rating: 5,
    text: "Ik heb mijn wenkbrauwen (microblading) laten doen en permanente eyeliner laten aanbrengen bij Gwyneth. Ze is vriendelijk, werkt netjes, schoon en geeft je het gevoel dat je in goede handen bent. Heel blij met het resultaat!",
  },
  {
    name: "Charlane Doebar",
    treatment: "Microblading",
    rating: 5,
    text: "Mijn wenkbrauwen laten doen bij Gwyneth en heel blij met het resultaat. Ze neemt de tijd en werkt heel precies en netjes. Zeker een aanrader!",
  },
  {
    name: "Marcia Martowirono",
    treatment: "Microblading",
    rating: 5,
    text: "Recent mijn wenkbrauwen laten doen bij Gwyneth. Ik ben ontzettend tevreden met het resultaat! Prachtige salon, ze neemt de tijd en een fijne omgang!",
  },
];
