export const LOCALE_COOKIE = "eco_marina_locale";

export type LocaleCookieValue = "en" | "nl";

export function parseLocaleCookie(cookieHeader: string | null): LocaleCookieValue | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${LOCALE_COOKIE}=(en|nl)(?:;|$)`));
  return match ? (match[1] as LocaleCookieValue) : null;
}

export function toDutchPath(pathname: string): string {
  if (pathname === "/") return "/nl";
  return `/nl${pathname}`;
}

export function shouldGeoLocalize(pathname: string): boolean {
  if (pathname.startsWith("/nl")) return false;
  if (pathname.startsWith("/admin")) return false;
  if (pathname.startsWith("/api/")) return false;
  if (pathname.includes("favicon")) return false;
  if (pathname.startsWith("/images/")) return false;
  if (pathname === "/maintenance.html") return false;
  if (pathname === "/robots.txt") return false;
  if (pathname === "/sitemap.xml") return false;
  return true;
}
