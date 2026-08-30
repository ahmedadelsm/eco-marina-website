"use client";

import { useEffect, useState } from "react";
import type { CmsCollection } from "@/lib/cms/types";
import { API, apiGet, apiPut } from "@/lib/api";

export function useAdminCms<T>(collection: CmsCollection, getDefault: () => T) {
  const [data, setData] = useState<T>(() => getDefault());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    apiGet<{ data: T | null }>(API.admin.cms(collection))
      .then((res) => {
        if (!cancelled) setData(res.data ?? getDefault());
      })
      .catch(() => {
        if (!cancelled) {
          setError("Could not load content.");
          setData(getDefault());
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [collection, getDefault]);

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

  async function reload() {
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
  }

  return { data, setData, loading, saving, save, message, error, reload };
}
