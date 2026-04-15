import realisation from "./realisation";
import actualite from "./actualite";

export const schemaTypes = [realisation, actualite];

// Export `schema` for root sanity.config.ts compatibility
export const schema = { types: schemaTypes };
