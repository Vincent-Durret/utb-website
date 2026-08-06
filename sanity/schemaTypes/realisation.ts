import { defineField, defineType } from "sanity";

export default defineType({
  name: "realisation",
  title: "Réalisation",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date de réalisation",
      type: "date",
    }),
    defineField({
      name: "location",
      title: "Lieu",
      type: "string",
      description: "Ex: Nice, 06",
    }),
    defineField({
      name: "service",
      title: "Type de service",
      type: "string",
      options: {
        list: [
          { title: "Terrasse en bois", value: "terrasses-bois" },
          { title: "Terrasse sur pilotis", value: "sur-pilotis" },
          { title: "Pergola", value: "pergolas" },
          { title: "Abri de voiture", value: "abris-de-voiture" },
          { title: "Terrasse piscine", value: "piscines" },
          { title: "Aménagement extérieur", value: "amenagements" },
          { title: "Toiture teck", value: "teck" },
        ],
      },
    }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texte alternatif",
              type: "string",
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).error("Ajoutez au moins une photo"),
    }),
    defineField({
      name: "description",
      title: "Description (optionnel)",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "title",
      location: "location",
      media: "images.0",
    },
    prepare({ title, location, media }) {
      return {
        title,
        subtitle: location,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Date (récent en premier)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});
