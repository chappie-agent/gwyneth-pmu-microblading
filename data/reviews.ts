export interface Review {
  name: string;
  treatment: string;
  rating: number;
  text: string;
}

export const reviews: Review[] = [
  {
    name: "Sophie B.",
    treatment: "Microblading",
    rating: 5,
    text: "Ik voelde me zo op mijn gemak bij Gwyneth. Ze nam alle tijd om mijn wensen te begrijpen. Het resultaat is ongelooflijk natuurlijk \u2014 ik krijg constant complimenten.",
  },
  {
    name: "Laura M.",
    treatment: "Powder Brows",
    rating: 5,
    text: "Precies de zachte kleur die ik wilde. De studio is prachtig en de sfeer heel rustgevend.",
  },
  {
    name: "Nina K.",
    treatment: "Combi Brows",
    rating: 5,
    text: "Na jaren twijfelen ben ik zo blij dat ik voor Gwyneth heb gekozen. Professioneel en prachtig resultaat!",
  },
];
