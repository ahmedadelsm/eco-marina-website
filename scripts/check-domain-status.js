#!/usr/bin/env node
const fs = require("fs");
const os = require("os");
const path = require("path");

const ACCOUNT_ID = "bace0682525d63a4e564f456e50c157c";
const PROJECT = "eco-marina";

function getOAuthToken() {
  const configPath = path.join(
    os.homedir(),
    "Library/Preferences/.wrangler/config/default.toml"
  );
  const config = fs.readFileSync(configPath, "utf8");
  const match = config.match(/oauth_token\s*=\s*"([^"]+)"/);
  if (!match) throw new Error("Wrangler OAuth token not found");
  return match[1];
}

async function cf(path) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    headers: { Authorization: `Bearer ${getOAuthToken()}` },
  });
  const data = await res.json();
  if (!data.success) throw new Error(JSON.stringify(data.errors || data));
  return data.result;
}

async function main() {
  const project = await cf(`/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT}`);
  const domains = await cf(
    `/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT}/domains`
  );
  console.log("Project:", project.name);
  console.log("Subdomain:", project.subdomain || `${PROJECT}.pages.dev`);
  console.log("Production URL:", project.canonical_deployment?.url || "n/a");
  console.log("\nCustom domains:");
  for (const d of domains) {
    console.log(`  ${d.name}`);
    console.log(`    status: ${d.status}`);
    console.log(`    verification: ${d.verification_data?.status || "n/a"}`);
  }
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
