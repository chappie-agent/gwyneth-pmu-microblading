import { defineField, defineType } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Vraag", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Antwoord", type: "text", validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Categorie",
      type: "string",
      options: {
        list: [
          { title: "Algemeen", value: "algemeen" },
          { title: "Behandeling", value: "behandeling" },
          { title: "Nazorg", value: "nazorg" },
          { title: "Betaling", value: "betaling" },
        ],
      },
    }),
    defineField({
      name: "pages",
      title: "Toon op pagina's",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Homepage", value: "home" },
          { title: "Behandelingen", value: "behandelingen" },
          { title: "Prijzen", value: "prijzen" },
        ],
      },
    }),
    defineField({ name: "sortOrder", title: "Volgorde", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Volgorde", name: "sortOrder", by: [{ field: "sortOrder", direction: "asc" }] }],
  preview: { select: { title: "question", subtitle: "category" } },
});
