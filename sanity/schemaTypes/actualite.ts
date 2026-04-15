import { defineField, defineType } from "sanity";

export default defineType({
  name: "actualite",
  title: "Actualité",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Date de publication",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Résumé",
      type: "text",
      rows: 3,
      description: "Court texte affiché dans la liste des actualités",
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "coverImage",
      title: "Image principale",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texte alternatif",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Contenu",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt", type: "string" }),
            defineField({ name: "caption", title: "Légende", type: "string" }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "publishedAt",
      media: "coverImage",
    },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString("fr-FR") : "Non publié",
        media,
      };
    },
  },
  orderings: [
    {
      title: "Date (récent en premier)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
