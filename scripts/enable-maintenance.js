#!/usr/bin/env node
/**
 * Enables maintenance mode in the static export output.
 * Copies maintenance.html and _redirects into out/ after build.
 */
const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "..", "out");
const publicDir = path.join(__dirname, "..", "public");

if (!fs.existsSync(outDir)) {
  console.error("Error: out/ directory not found. Run next build first.");
  process.exit(1);
}

fs.copyFileSync(path.join(publicDir, "maintenance.html"), path.join(outDir, "maintenance.html"));
fs.copyFileSync(path.join(publicDir, "_redirects.maintenance"), path.join(outDir, "_redirects"));

console.log("Maintenance mode enabled:");
console.log("  - out/maintenance.html");
console.log("  - out/_redirects (all routes → maintenance, 503)");
