import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Instellingen",
  type: "document",
  fields: [
    defineField({ name: "businessName", title: "Bedrijfsnaam", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "subtitle", title: "Ondertitel", type: "string" }),
    defineField({ name: "description", title: "Beschrijving", type: "text" }),
    defineField({ name: "heroTitle", title: "Hero Titel", type: "string" }),
    defineField({ name: "heroDescription", title: "Hero Beschrijving", type: "text" }),
    defineField({
      name: "contact",
      title: "Contact",
      type: "object",
      fields: [
        defineField({ name: "address", title: "Adres", type: "string" }),
        defineField({ name: "phone", title: "Telefoon", type: "string" }),
        defineField({ name: "email", title: "E-mail", type: "string" }),
      ],
    }),
    defineField({
      name: "hours",
      title: "Openingstijden",
      type: "object",
      fields: [
        defineField({ name: "weekdays", title: "Doordeweeks", type: "string" }),
        defineField({ name: "saturday", title: "Zaterdag", type: "string" }),
      ],
    }),
    defineField({
      name: "social",
      title: "Social Media",
      type: "object",
      fields: [
        defineField({ name: "instagram", title: "Instagram", type: "url" }),
        defineField({ name: "facebook", title: "Facebook", type: "url" }),
        defineField({ name: "tiktok", title: "TikTok", type: "url" }),
      ],
    }),
    defineField({
      name: "trustItems",
      title: "Trust Items",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", title: "Label", type: "string" }),
          defineField({ name: "value", title: "Waarde", type: "string" }),
        ],
      }],
    }),
  ],
  preview: { prepare: () => ({ title: "Site Instellingen" }) },
});
