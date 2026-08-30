#!/usr/bin/env node
/**
 * Creates the eco-marina-media R2 bucket for admin media uploads.
 * Run once: node scripts/setup-r2.mjs
 */
import { execFileSync } from "node:child_process";

const BUCKET = "eco-marina-media";

try {
  execFileSync("npx", ["wrangler", "r2", "bucket", "create", BUCKET], { stdio: "inherit" });
  console.log(`\n✓ R2 bucket "${BUCKET}" is ready.`);
  console.log("Ensure wrangler.toml has the MEDIA binding and redeploy the Pages project.");
} catch {
  console.log(`Bucket may already exist. Verify in Cloudflare → R2 → ${BUCKET}`);
}
