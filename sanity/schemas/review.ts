import { defineField, defineType } from "sanity";

export const review = defineType({
  name: "review",
  title: "Reviews",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Naam", type: "string", validation: (r) => r.required() }),
    defineField({ name: "treatmentName", title: "Behandeling", type: "string" }),
    defineField({ name: "rating", title: "Beoordeling", type: "number", validation: (r) => r.min(1).max(5) }),
    defineField({ name: "text", title: "Tekst", type: "text", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "name", subtitle: "treatmentName" } },
});
