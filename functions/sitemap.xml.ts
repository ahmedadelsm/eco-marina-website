import type { Env } from "./lib/utils";

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

async function getSlugs(env: Env, key: string): Promise<string[]> {
  const row = await env.DB.prepare("SELECT value FROM content WHERE key = ?")
    .bind(key)
    .first<{ value: string }>();
  if (!row?.value) return [];
  try {
    const parsed = JSON.parse(row.value) as { slug: string; published?: boolean }[];
    return parsed.filter((item) => item.published !== false).map((item) => item.slug);
  } catch {
    return [];
  }
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;
  const projectSlugs = await getSlugs(env, "cms.projects");
  const insightSlugs = await getSlugs(env, "cms.insights");
  const lastmod = new Date().toISOString().slice(0, 10);
  const site = "https://eco-marina.com";

  const urls = [
    ...STATIC_ROUTES.flatMap((route) => {
      const en = route === "/" ? "" : route;
      const nl = route === "/" ? "/nl" : `/nl${route}`;
      return [`${site}${en}`, `${site}${nl}`];
    }),
    ...projectSlugs.flatMap((slug) => [`${site}/projects/${slug}`, `${site}/nl/projects/${slug}`]),
    ...insightSlugs.flatMap((slug) => [`${site}/insights/${slug}`, `${site}/nl/insights/${slug}`]),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (loc) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
