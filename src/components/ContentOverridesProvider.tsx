"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { API, apiGet } from "@/lib/api";

type ContentOverrides = Record<string, unknown>;

const ContentOverridesContext = createContext<ContentOverrides | null>(null);

const CACHE_KEY = "eco-marina-content-overrides";

function readCachedOverrides(): ContentOverrides {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as ContentOverrides) : {};
  } catch {
    return {};
  }
}

export function ContentOverridesProvider({ children }: { children: React.ReactNode }) {
  const [overrides, setOverrides] = useState<ContentOverrides>(readCachedOverrides);

  useEffect(() => {
    apiGet<{ content: ContentOverrides }>(API.content)
      .then((data) => {
        setOverrides(data.content);
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(data.content));
        } catch {
          // Ignore quota errors — defaults still render correctly.
        }
      })
      .catch(() => {});
  }, []);

  const value = useMemo(() => overrides, [overrides]);
  return (
    <ContentOverridesContext.Provider value={value}>{children}</ContentOverridesContext.Provider>
  );
}

export function useContentOverride(key: string, fallback: string): string {
  const overrides = useContext(ContentOverridesContext);
  const value = overrides?.[key];
  return typeof value === "string" && value.trim() ? value : fallback;
}

export function useContentOverrides(): ContentOverrides {
  return useContext(ContentOverridesContext) ?? {};
}
