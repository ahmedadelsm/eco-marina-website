export const LOCALE_COOKIE = "eco_marina_locale";

export type LocaleCookieValue = "en" | "nl";

export function setLocaleCookie(locale: LocaleCookieValue) {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
}

export function parseLocaleCookie(cookieHeader: string | null): LocaleCookieValue | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${LOCALE_COOKIE}=(en|nl)(?:;|$)`));
  return match ? (match[1] as LocaleCookieValue) : null;
}
