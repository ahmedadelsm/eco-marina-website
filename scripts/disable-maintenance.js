#!/usr/bin/env node
/**
 * Disables maintenance mode — removes _redirects so full site is served.
 */
const fs = require("fs");
const path = require("path");

const redirects = path.join(__dirname, "..", "out", "_redirects");

if (fs.existsSync(redirects)) {
  fs.unlinkSync(redirects);
  console.log("Maintenance mode disabled: removed out/_redirects");
} else {
  console.log("No _redirects file found — site already in production mode.");
}
