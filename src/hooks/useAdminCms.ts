"use client";

import { useCallback, useEffect, useState } from "react";
import type { CmsCollection } from "@/lib/cms/types";
import { API, apiGet, apiPut } from "@/lib/api";

export function useAdminCms<T>(collection: CmsCollection, getDefault: () => T) {
  const [data, setData] = useState<T>(() => getDefault());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await apiGet<{ data: T | null }>(API.admin.cms(collection));
      setData(res.data ?? getDefault());
    } catch {
      setError("Could not load content.");
      setData(getDefault());
    } finally {
      setLoading(false);
    }
  }, [collection, getDefault]);

  useEffect(() => {
    void load();
  }, [load]);

  async function save() {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      await apiPut(API.admin.cms(collection), { data });
      setMessage("Saved successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setSaving(false);
    }
  }

  return { data, setData, loading, saving, save, message, error, reload: load };
}
