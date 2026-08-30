"use client";

import { useEffect } from "react";
import { useCms } from "@/components/cms/CmsProvider";
import { useLocale } from "@/components/locale/LocaleProvider";

export function PageSeo({ path, fallbackTitle, fallbackDescription }: { path: string; fallbackTitle: string; fallbackDescription: string }) {
  const { getSeo } = useCms();
  const { locale } = useLocale();

  useEffect(() => {
    const seo = getSeo(path);
    const title = seo?.title || fallbackTitle;
    const description = seo?.description || fallbackDescription;
    document.title = title.includes("Eco Marina") ? title : `${title} | Eco Marina`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }, [path, fallbackTitle, fallbackDescription, getSeo, locale]);

  return null;
}
