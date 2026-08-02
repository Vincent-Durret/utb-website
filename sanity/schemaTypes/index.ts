import realisation from "./realisation";
import actualite from "./actualite";
import avis from "./avis";

export const schemaTypes = [realisation, actualite, avis];

// Export `schema` for root sanity.config.ts compatibility
export const schema = { types: schemaTypes };
