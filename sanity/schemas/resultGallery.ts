import { defineField, defineType } from "sanity";

export const resultGallery = defineType({
  name: "resultGallery",
  title: "Resultaten Galerij",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Galerij Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Afbeelding",
              type: "image",
              options: { hotspot: true },
              validation: (r) => r.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "Bijv. 'Microblading', 'Lip Blush', 'Healed Result'",
            }),
            defineField({
              name: "layout",
              title: "Layout",
              type: "string",
              options: {
                list: [
                  { title: "Portret (groot, 2x2)", value: "portrait" },
                  { title: "Landschap (breed, 2x1)", value: "landscape" },
                  { title: "Vierkant (klein, 1x1)", value: "square" },
                ],
              },
              initialValue: "square",
            }),
          ],
          preview: {
            select: { title: "label", media: "image" },
          },
        },
      ],
      validation: (r) => r.max(6),
    }),
  ],
  preview: { prepare: () => ({ title: "Resultaten Galerij" }) },
});
