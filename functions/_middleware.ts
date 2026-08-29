import { readSession, type Env } from "./lib/utils";

const BYPASS = ["/api/", "/admin", "/images/", "/favicon", "/_next/", "/maintenance.html", "/robots.txt", "/sitemap.xml"];

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env, next } = context;
  const url = new URL(request.url);

  if (BYPASS.some((p) => url.pathname.startsWith(p) || url.pathname.includes("favicon"))) {
    return next();
  }

  const maintenance = await env.SETTINGS.get("maintenance_mode");
  if (maintenance !== "false") {
    const admin = await readSession(request, env);
    if (admin) {
      return next();
    }

    const assetUrl = new URL("/maintenance.html", request.url);
    const response = await env.ASSETS.fetch(assetUrl.toString());
    return new Response(response.body, {
      status: 503,
      headers: {
        ...Object.fromEntries(response.headers),
        "Cache-Control": "no-store",
        "Retry-After": "3600",
      },
    });
  }

  return next();
};
