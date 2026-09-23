#!/usr/bin/env node
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const index = path.join(dist, "index.html");
const worker = path.join(root, "worker", "index.js");
const hosting = path.join(root, ".openai", "hosting.json");

for (const file of [index, worker, hosting]) {
  if (!existsSync(file)) throw new Error("Missing Sites build input: " + file);
}

const html = readFileSync(index, "utf8");

if (/src\/main\.tsx|["']\/?main\.tsx["']/.test(html)) {
  throw new Error("Production index.html still references main.tsx");
}

const entryMatch = html.match(/\/assets\/index-[^"'<>]+\.js/);

if (!entryMatch) {
  throw new Error("Missing generated Vite JavaScript entry in dist/index.html");
}

const entry = path.join(dist, entryMatch[0].replace(/^\//, ""));

if (!existsSync(entry)) {
  throw new Error("Missing generated Vite JavaScript bundle: " + entry);
}

const requiredAssets = [
  "atrium.webp",
  "card-face.webp",
  "helvetiker_bold.typeface.json",
];

for (const asset of requiredAssets) {
  const file = path.join(dist, "assets", asset);
  if (!existsSync(file)) {
    throw new Error("Missing production asset: " + file);
  }
}

mkdirSync(path.join(dist, "server"), { recursive: true });
mkdirSync(path.join(dist, ".openai"), { recursive: true });

copyFileSync(worker, path.join(dist, "server", "index.js"));
copyFileSync(hosting, path.join(dist, ".openai", "hosting.json"));

console.log(
  "Prepared Sites build: dist/server/index.js and dist/.openai/hosting.json",
);