"use client";

import { useLayoutEffect } from "react";
import type { Locale } from "@/lib/i18n";

export function SetHtmlLang({ locale }: { locale: Locale }) {
  useLayoutEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
