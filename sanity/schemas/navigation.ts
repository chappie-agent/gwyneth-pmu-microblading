import { defineField, defineType } from "sanity";

const navItemFields = [
  defineField({ name: "label", title: "Label", type: "string" }),
  defineField({ name: "href", title: "Link", type: "string" }),
];

export const navigation = defineType({
  name: "navigation",
  title: "Navigatie",
  type: "document",
  fields: [
    defineField({
      name: "mainNav",
      title: "Hoofdnavigatie",
      type: "array",
      of: [{
        type: "object",
        fields: [
          ...navItemFields,
          defineField({
            name: "children",
            title: "Submenu",
            type: "array",
            of: [{ type: "object", fields: navItemFields }],
          }),
        ],
        preview: { select: { title: "label", subtitle: "href" } },
      }],
    }),
    defineField({
      name: "footerNav",
      title: "Footer Navigatie",
      type: "object",
      fields: [
        defineField({ name: "treatments", title: "Behandelingen", type: "array", of: [{ type: "object", fields: navItemFields }] }),
        defineField({ name: "info", title: "Info", type: "array", of: [{ type: "object", fields: navItemFields }] }),
        defineField({ name: "contact", title: "Contact", type: "array", of: [{ type: "object", fields: navItemFields }] }),
        defineField({ name: "legal", title: "Juridisch", type: "array", of: [{ type: "object", fields: navItemFields }] }),
      ],
    }),
    defineField({
      name: "breadcrumbLabels",
      title: "Breadcrumb Labels",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "key", title: "Slug", type: "string" }),
          defineField({ name: "value", title: "Label", type: "string" }),
        ],
      }],
    }),
  ],
  preview: { prepare: () => ({ title: "Navigatie" }) },
});
