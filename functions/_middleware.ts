import { readSession, type Env } from "./lib/utils";
import {
  LOCALE_COOKIE,
  parseLocaleCookie,
  shouldGeoLocalize,
  toDutchPath,
} from "./lib/locale-cookie";

const BYPASS_MAINTENANCE = [
  "/api/",
  "/admin",
  "/images/",
  "/favicon",
  "/_next/",
  "/maintenance.html",
  "/robots.txt",
  "/sitemap.xml",
];

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env, next } = context;
  const url = new URL(request.url);

  if (BYPASS_MAINTENANCE.some((p) => url.pathname.startsWith(p) || url.pathname.includes("favicon"))) {
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

  const localeCookie = parseLocaleCookie(request.headers.get("Cookie"));
  if (localeCookie === "en") {
    return next();
  }

  const country = request.cf?.country;
  const preferDutch = localeCookie === "nl" || (!localeCookie && country === "NL");

  if (preferDutch && shouldGeoLocalize(url.pathname)) {
    const target = new URL(toDutchPath(url.pathname), request.url);
    target.search = url.search;
    const headers = new Headers();
    if (!localeCookie) {
      headers.set(
        "Set-Cookie",
        `${LOCALE_COOKIE}=nl; Path=/; Max-Age=31536000; SameSite=Lax; Secure`,
      );
    }
    headers.set("Cache-Control", "no-store");
    headers.set("Vary", "Cookie, CF-IPCountry");
    return Response.redirect(target.toString(), 302);
  }

  return next();
};
