import { defineField, defineType } from "sanity";

export default defineType({
  name: "avis",
  title: "Avis Google",
  type: "document",
  fields: [
    defineField({
      name: "authorName",
      title: "Nom du client",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Note",
      type: "number",
      options: {
        list: [
          { title: "★★★★★ (5)", value: 5 },
          { title: "★★★★ (4)", value: 4 },
          { title: "★★★ (3)", value: 3 },
          { title: "★★ (2)", value: 2 },
          { title: "★ (1)", value: 1 },
        ],
      },
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: "comment",
      title: "Commentaire",
      type: "text",
      rows: 4,
      description: "Copiez le texte de l'avis Google (sans le modifier).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date de l'avis",
      type: "date",
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      description: "Plus le chiffre est petit, plus l'avis apparaît en premier.",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Ordre d'affichage",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Date (récent en premier)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "authorName",
      rating: "rating",
      comment: "comment",
    },
    prepare({ title, rating, comment }) {
      const stars = "★".repeat(rating ?? 0) + "☆".repeat(5 - (rating ?? 0));
      return {
        title: title ?? "Avis",
        subtitle: `${stars} — ${comment?.slice(0, 60) ?? ""}${comment && comment.length > 60 ? "…" : ""}`,
      };
    },
  },
});
