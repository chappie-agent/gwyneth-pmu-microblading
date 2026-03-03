import { defineField, defineType } from "sanity";

export const pageContent = defineType({
  name: "pageContent",
  title: "Pagina Content",
  type: "document",
  fields: [
    defineField({
      name: "pageId",
      title: "Pagina",
      type: "string",
      options: {
        list: [
          { title: "Homepage", value: "home" },
          { title: "Behandelingen", value: "behandelingen" },
          { title: "Prijzen", value: "prijzen" },
          { title: "Resultaten", value: "resultaten" },
          { title: "Over", value: "over" },
          { title: "Contact", value: "contact" },
          { title: "Boeken", value: "boeken" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "heroTitle", title: "Hero Titel", type: "string" }),
    defineField({ name: "heroDescription", title: "Hero Beschrijving", type: "text" }),
    defineField({ name: "ctaTitle", title: "CTA Titel", type: "string" }),
    defineField({ name: "ctaDescription", title: "CTA Beschrijving", type: "text" }),
    defineField({ name: "ctaLabel", title: "CTA Knop Tekst", type: "string" }),
    defineField({ name: "ctaHref", title: "CTA Link", type: "string" }),
    defineField({ name: "metaTitle", title: "Meta Titel", type: "string" }),
    defineField({ name: "metaDescription", title: "Meta Beschrijving", type: "text" }),
  ],
  preview: { select: { title: "pageId" } },
});
