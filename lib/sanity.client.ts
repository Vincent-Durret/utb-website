import { createClient } from "next-sanity";

// Sanity projectId must be lowercase alphanumeric + dashes only
const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const isValidProjectId = /^[a-z0-9-]+$/.test(rawProjectId);

export const isSanityConfigured = isValidProjectId && rawProjectId.length > 0;

export const sanityClient = createClient({
  projectId: isValidProjectId ? rawProjectId : "notconfigured",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});
