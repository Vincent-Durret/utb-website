import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenu")
    .items([
      S.listItem()
        .title("Réalisations")
        .child(S.documentTypeList("realisation").title("Réalisations")),
      S.listItem()
        .title("Actualités")
        .child(S.documentTypeList("actualite").title("Actualités")),
      S.listItem()
        .title("Avis Google")
        .child(S.documentTypeList("avis").title("Avis Google")),
    ]);
