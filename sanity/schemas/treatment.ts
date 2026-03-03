import { defineField, defineType } from "sanity";

export const treatment = defineType({
  name: "treatment",
  title: "Behandeling",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "name", title: "Naam", type: "string", validation: (r) => r.required() }),
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "price", title: "Prijs", type: "number" }),
    defineField({ name: "priceLabel", title: "Prijs Label", type: "string" }),
    defineField({ name: "featured", title: "Uitgelicht", type: "boolean", initialValue: false }),
    defineField({ name: "featuredLabel", title: "Uitgelicht Label", type: "string" }),
    defineField({
      name: "category",
      title: "Categorie",
      type: "string",
      options: { list: [{ title: "Core PMU", value: "core" }, { title: "Aanvullend", value: "additional" }] },
      initialValue: "core",
    }),
    defineField({ name: "heroTitle", title: "Hero Titel", type: "string" }),
    defineField({ name: "heroDescription", title: "Hero Beschrijving", type: "text" }),
    defineField({
      name: "image",
      title: "Afbeelding",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "whatIs",
      title: "Wat Is Het?",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titel", type: "string" }),
        defineField({ name: "subtitle", title: "Ondertitel", type: "string" }),
        defineField({ name: "content", title: "Inhoud", type: "array", of: [{ type: "block" }] }),
        defineField({ name: "benefits", title: "Voordelen", type: "array", of: [{ type: "string" }] }),
      ],
    }),
    defineField({
      name: "suitability",
      title: "Geschiktheid",
      type: "object",
      fields: [
        defineField({ name: "ideal", title: "Ideaal Voor", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "caution", title: "Voorzichtigheid", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "note", title: "Opmerking", type: "text" }),
      ],
    }),
    defineField({
      name: "process",
      title: "Proces Stappen",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "Titel", type: "string" }),
          defineField({ name: "description", title: "Beschrijving", type: "text" }),
        ],
      }],
    }),
    defineField({
      name: "aftercare",
      title: "Nazorg",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titel", type: "string" }),
        defineField({ name: "duration", title: "Duur", type: "string" }),
        defineField({ name: "description", title: "Beschrijving", type: "text" }),
        defineField({
          name: "timeline",
          title: "Tijdlijn",
          type: "array",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "title", title: "Titel", type: "string" }),
              defineField({ name: "description", title: "Beschrijving", type: "text" }),
            ],
          }],
        }),
        defineField({ name: "dos", title: "Do's", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "donts", title: "Don'ts", type: "array", of: [{ type: "string" }] }),
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "question", title: "Vraag", type: "string" }),
          defineField({ name: "answer", title: "Antwoord", type: "text" }),
        ],
      }],
    }),
    defineField({ name: "includes", title: "Inbegrepen", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "comparison",
      title: "Vergelijking",
      type: "object",
      fields: [
        defineField({ name: "techniek", title: "Techniek", type: "string" }),
        defineField({ name: "uiterlijk", title: "Uiterlijk", type: "string" }),
        defineField({ name: "duur", title: "Duur", type: "string" }),
        defineField({ name: "geschikt", title: "Geschikt voor", type: "string" }),
        defineField({ name: "onderhoud", title: "Onderhoud", type: "string" }),
        defineField({ name: "pijn", title: "Pijn/ongemak", type: "string" }),
        defineField({ name: "genezing", title: "Genezingstijd", type: "string" }),
      ],
    }),
    defineField({ name: "usps", title: "USPs", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "sortOrder", title: "Volgorde", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Volgorde", name: "sortOrder", by: [{ field: "sortOrder", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "category", media: "image" },
  },
});
