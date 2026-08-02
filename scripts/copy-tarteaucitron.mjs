import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "node_modules", "tarteaucitronjs");
const dest = join(root, "public", "tarteaucitron");

if (!existsSync(src)) {
  console.warn("[copy-tarteaucitron] Package tarteaucitronjs introuvable, skip.");
  process.exit(0);
}

rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });
console.log("[copy-tarteaucitron] Fichiers copiés vers public/tarteaucitron");
