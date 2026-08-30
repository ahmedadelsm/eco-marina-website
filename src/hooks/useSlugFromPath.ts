"use client";

import { usePathname } from "next/navigation";

export function useSlugFromPath(prefix: string): string {
  const pathname = usePathname() ?? "";
  if (!pathname.startsWith(prefix)) return "";
  const slug = pathname.slice(prefix.length).replace(/^\/+/, "").replace(/\/+$/, "");
  if (!slug || slug === "detail") return "";
  return slug;
}
