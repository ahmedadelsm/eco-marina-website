#!/usr/bin/env node
/**
 * Cloudflare API helper using Wrangler OAuth credentials.
 */
const fs = require("fs");
const os = require("os");
const path = require("path");

const ACCOUNT_ID = "bace0682525d63a4e564f456e50c157c";
const PROJECT = "eco-marina";
const PAGES_TARGET = "eco-marina.pages.dev";
const DOMAINS = ["eco-marina.com", "www.eco-marina.com"];

function getOAuthToken() {
  const configPath = path.join(
    os.homedir(),
    "Library/Preferences/.wrangler/config/default.toml"
  );
  const config = fs.readFileSync(configPath, "utf8");
  const match = config.match(/oauth_token\s*=\s*"([^"]+)"/);
  if (!match) throw new Error("Wrangler OAuth token not found. Run: npx wrangler login");
  return match[1];
}

async function cf(path, options = {}) {
  const token = getOAuthToken();
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const data = await res.json();
  if (!data.success) {
    throw new Error(JSON.stringify(data.errors || data, null, 2));
  }
  return data.result;
}

async function main() {
  const zones = await cf("/zones?name=eco-marina.com");
  if (!zones.length) throw new Error("Zone eco-marina.com not found in this Cloudflare account");
  const zoneId = zones[0].id;
  console.log("Zone ID:", zoneId);

  for (const domain of DOMAINS) {
    try {
      const added = await cf(
        `/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT}/domains`,
        { method: "POST", body: JSON.stringify({ name: domain }) }
      );
      console.log("Added Pages domain:", domain, added.status || added.validation_data?.status || "ok");
    } catch (err) {
      if (String(err.message).includes("already exists") || String(err.message).includes("1061")) {
        console.log("Pages domain already exists:", domain);
      } else {
        throw err;
      }
    }
  }

  const existing = await cf(`/zones/${zoneId}/dns_records?per_page=100`);
  const byName = Object.fromEntries(existing.map((r) => [`${r.name}:${r.type}`, r]));

  async function upsert(name, type, content, proxied = true) {
    const key = `${name}:${type}`;
    const payload = { type, name, content, proxied, ttl: 1 };
    if (byName[key]) {
      const updated = await cf(`/zones/${zoneId}/dns_records/${byName[key].id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      console.log(`Updated DNS ${type} ${name} -> ${content}`);
      return updated;
    }
    const created = await cf(`/zones/${zoneId}/dns_records`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    console.log(`Created DNS ${type} ${name} -> ${content}`);
    return created;
  }

  await upsert("eco-marina.com", "CNAME", PAGES_TARGET);
  await upsert("www.eco-marina.com", "CNAME", PAGES_TARGET);

  for (const domain of ["A", "AAAA"]) {
    const apexA = existing.find((r) => r.name === "eco-marina.com" && r.type === domain);
    if (apexA) {
      await cf(`/zones/${zoneId}/dns_records/${apexA.id}`, { method: "DELETE" });
      console.log(`Removed old ${domain} record for apex`);
    }
  }

  const pagesDomains = await cf(
    `/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT}/domains`
  );
  console.log("\nPages custom domains:");
  for (const d of pagesDomains) {
    console.log(`  ${d.name}: ${d.status}`);
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
