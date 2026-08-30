"use client";

import { useEffect, useState } from "react";
import type { CmsCollection } from "@/lib/cms/types";
import { getCmsDefault } from "@/lib/cms/registry";
import { API, apiGet, apiPut } from "@/lib/api";

export function useAdminCms<T>(collection: CmsCollection) {
  const [data, setData] = useState<T>(() => getCmsDefault<T>(collection));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    apiGet<{ data: T | null }>(API.admin.cms(collection))
      .then((res) => {
        if (!cancelled) setData(res.data ?? getCmsDefault<T>(collection));
      })
      .catch(() => {
        if (!cancelled) {
          setError("Could not load content.");
          setData(getCmsDefault<T>(collection));
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [collection]);

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

  function revert() {
    if (!confirm("Revert all fields to the original defaults? Unsaved edits will be lost.")) return;
    setData(getCmsDefault<T>(collection));
    setMessage("Reverted to defaults. Click Save to apply on the live site.");
    setError("");
  }

  return { data, setData, loading, saving, save, revert, message, error };
}
