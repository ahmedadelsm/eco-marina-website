#!/usr/bin/env node
/**
 * Static export uses a single root layout with lang="en".
 * Patch Dutch HTML files after build so accessibility and SEO get lang="nl".
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "out");

function collectHtmlFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectHtmlFiles(full, files);
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

const targets = [
  path.join(OUT, "nl.html"),
  ...collectHtmlFiles(path.join(OUT, "nl")),
];

if (targets.length === 0 || !fs.existsSync(OUT)) {
  console.log("No Dutch HTML to patch — skipping lang fix.");
  process.exit(0);
}

let patched = 0;
for (const file of targets) {
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, "utf8");
  const next = html.replace(/<html lang="en"/g, '<html lang="nl"');
  if (next !== html) {
    fs.writeFileSync(file, next);
    patched += 1;
  }
}

console.log(`Patched lang="nl" on ${patched} HTML file(s).`);
