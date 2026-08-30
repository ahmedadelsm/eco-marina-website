#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../src/generated/build-cms.json");
const API = process.env.CMS_API_URL || "https://eco-marina.com/api/cms";

async function main() {
  let payload = null;

  try {
    const response = await fetch(API, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    payload = await response.json();
    console.log(`Fetched CMS data from ${API}`);
  } catch (error) {
    console.warn(`CMS API unavailable (${error instanceof Error ? error.message : error}); build will use code defaults.`);
  }

  const buildData = {
    source: payload ? "api" : "defaults",
    fetchedAt: new Date().toISOString(),
    api: payload ? API : null,
    projects: payload?.projects ?? null,
    insights: payload?.insights ?? null,
    company: payload?.company ?? null,
    seo: payload?.seo ?? null,
    pages: payload?.pages ?? null,
    resources: payload?.resources ?? null,
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, `${JSON.stringify(buildData, null, 2)}\n`);
  console.log(`Wrote ${OUT}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
