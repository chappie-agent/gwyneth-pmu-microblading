export interface Review {
  name: string;
  treatment: string;
  rating: number;
  text: string;
  /** Optional portrait photo URL. Falls back to initials when absent. */
  image?: string;
}

export const reviews: Review[] = [
  {
    name: "Sophie B.",
    treatment: "Microblading",
    rating: 5,
    text: "Ik voelde me zo op mijn gemak bij Gwyneth. Ze nam alle tijd om mijn wensen te begrijpen. Het resultaat is ongelooflijk natuurlijk \u2014 ik krijg constant complimenten.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Laura M.",
    treatment: "Powder Brows",
    rating: 5,
    text: "Precies de zachte kleur die ik wilde. De studio is prachtig en de sfeer heel rustgevend.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Nina K.",
    treatment: "Combi Brows",
    rating: 5,
    text: "Na jaren twijfelen ben ik zo blij dat ik voor Gwyneth heb gekozen. Professioneel en prachtig resultaat!",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
  },
];

export const placeholderReviewImages = [
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
  "https://randomuser.me/api/portraits/women/32.jpg",
  "https://randomuser.me/api/portraits/women/65.jpg",
  "https://randomuser.me/api/portraits/women/12.jpg",
  "https://randomuser.me/api/portraits/women/90.jpg",
];
