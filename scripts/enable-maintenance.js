#!/usr/bin/env node
/**
 * Enables maintenance mode in the static export output.
 * Removes generated pages so Cloudflare serves maintenance.html for all routes.
 */
const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "..", "out");
const publicDir = path.join(__dirname, "..", "public");

if (!fs.existsSync(outDir)) {
  console.error("Error: out/ directory not found. Run next build first.");
  process.exit(1);
}

function removeHtmlPages(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      removeHtmlPages(fullPath);
      if (fs.readdirSync(fullPath).length === 0) {
        fs.rmdirSync(fullPath);
      }
      continue;
    }
    if (entry.name.endsWith(".html") && entry.name !== "maintenance.html") {
      fs.unlinkSync(fullPath);
    }
  }
}

removeHtmlPages(outDir);

fs.copyFileSync(
  path.join(publicDir, "maintenance.html"),
  path.join(outDir, "maintenance.html")
);
fs.copyFileSync(
  path.join(publicDir, "maintenance.html"),
  path.join(outDir, "index.html")
);
fs.copyFileSync(
  path.join(publicDir, "_redirects.maintenance"),
  path.join(outDir, "_redirects")
);

console.log("Maintenance mode enabled:");
console.log("  - removed generated page HTML");
console.log("  - out/maintenance.html");
console.log("  - out/_redirects (all routes → maintenance, 503)");
