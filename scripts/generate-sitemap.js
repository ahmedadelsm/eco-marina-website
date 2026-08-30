#!/usr/bin/env node
/**
 * Regenerates public/sitemap.xml from site-content with English and Dutch URLs.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const contentPath = path.join(ROOT, "src/content/en/site-content.ts");
const outPath = path.join(ROOT, "public/sitemap.xml");
const SITE = "https://eco-marina.com";

const STATIC_ROUTES = [
  "/",
  "/about",
  "/services",
  "/services/impact-assessment",
  "/services/monitoring",
  "/training",
  "/projects",
  "/insights",
  "/resources",
  "/faq",
  "/contact",
];

function extractSlugs(constName) {
  const content = fs.readFileSync(contentPath, "utf8");
  const start = content.indexOf(`export const ${constName} = [`);
  if (start === -1) return [];
  const end = content.indexOf("] as const;", start);
  if (end === -1) return [];
  const block = content.slice(start, end);
  return [...block.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
}

const projectSlugs = extractSlugs("projects");
const insightSlugs = extractSlugs("insights");
const lastmod = new Date().toISOString().slice(0, 10);

function withLocales(route) {
  const en = route === "/" ? "" : route;
  const nl = route === "/" ? "/nl" : `/nl${route}`;
  return [`${SITE}${en}`, `${SITE}${nl}`];
}

const urls = [
  ...STATIC_ROUTES.flatMap(withLocales),
  ...projectSlugs.flatMap((slug) => withLocales(`/projects/${slug}`)),
  ...insightSlugs.flatMap((slug) => withLocales(`/insights/${slug}`)),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (loc) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(outPath, xml);
console.log(`Generated sitemap with ${urls.length} URLs → public/sitemap.xml`);
