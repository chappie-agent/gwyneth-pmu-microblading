import { defineField, defineType } from "sanity";

export const pricingTier = defineType({
  name: "pricingTier",
  title: "Prijzen",
  type: "document",
  fields: [
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "name", title: "Naam", type: "string", validation: (r) => r.required() }),
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "price", title: "Prijs", type: "number" }),
    defineField({ name: "priceLabel", title: "Prijs Label", type: "string" }),
    defineField({ name: "featured", title: "Uitgelicht", type: "boolean", initialValue: false }),
    defineField({ name: "featuredLabel", title: "Uitgelicht Label", type: "string" }),
    defineField({ name: "includes", title: "Inbegrepen", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "sortOrder", title: "Volgorde", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Volgorde", name: "sortOrder", by: [{ field: "sortOrder", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "priceLabel" } },
});
