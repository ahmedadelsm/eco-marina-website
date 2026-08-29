"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { API, apiGet } from "@/lib/api";

type ContentOverrides = Record<string, unknown>;

const ContentOverridesContext = createContext<ContentOverrides | null>(null);

export function ContentOverridesProvider({ children }: { children: React.ReactNode }) {
  const [overrides, setOverrides] = useState<ContentOverrides>({});

  useEffect(() => {
    apiGet<{ content: ContentOverrides }>(API.content)
      .then((data) => setOverrides(data.content))
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
