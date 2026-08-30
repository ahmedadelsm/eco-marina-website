"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { CmsMediaItem } from "@/lib/cms/types";
import { API, apiDelete, apiGet } from "@/lib/api";

export default function AdminMediaPage() {
  const router = useRouter();
  const [items, setItems] = useState<CmsMediaItem[]>([]);
  const [configured, setConfigured] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    apiGet<{ items: CmsMediaItem[]; configured: boolean }>(API.admin.media)
      .then((res) => {
        if (!cancelled) {
          setItems(res.items);
          setConfigured(res.configured);
        }
      })
      .catch(() => {
        if (!cancelled) router.replace("/admin/login");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function upload(file: File) {
    setUploading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch(API.admin.media, { method: "POST", credentials: "include", body: form });
      const data = (await res.json()) as { item?: CmsMediaItem; error?: string };
      if (!res.ok) throw new Error(data.error || "Upload failed");
      if (data.item) setItems((current) => [data.item!, ...current]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function remove(key: string) {
    if (!confirm("Delete this file?")) return;
    await apiDelete(`${API.admin.media}?key=${encodeURIComponent(key)}`);
    setItems((current) => current.filter((item) => item.key !== key));
  }

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  }

  if (loading) return <p className="text-ink-muted">Loading media library…</p>;

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">Media library</h1>
      <p className="mt-2 text-ink-muted">
        Upload images for case studies, training, and SEO. Copy the URL into content editors — or use built-in site images below.
      </p>

      {!configured && (
        <p className="mt-4 border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          R2 storage is not configured yet. Create bucket <code className="text-xs">eco-marina-media</code> in Cloudflare
          and ensure the <code className="text-xs">MEDIA</code> binding is attached to the Pages project.
        </p>
      )}

      <div className="mt-8 max-w-xl border border-line bg-white p-6">
        <label className="text-sm font-medium text-ink" htmlFor="media-upload">
          Upload image (max 5 MB)
        </label>
        <input
          id="media-upload"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          disabled={!configured || uploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void upload(file);
            e.target.value = "";
          }}
          className="mt-2 block w-full text-sm"
        />
        {uploading && <p className="mt-2 text-sm text-ink-muted">Uploading…</p>}
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.key} className="border border-line bg-white p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.url} alt={item.filename} className="aspect-video w-full object-cover bg-paper" />
            <p className="mt-3 truncate text-sm font-medium text-ink">{item.filename}</p>
            <p className="text-xs text-ink-muted">{(item.size / 1024).toFixed(0)} KB</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => copyUrl(item.url)}
                className="text-xs font-semibold text-sea hover:underline"
              >
                {copied === item.url ? "Copied!" : "Copy URL"}
              </button>
              <button
                type="button"
                onClick={() => remove(item.key)}
                className="text-xs font-semibold text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && configured && (
        <p className="mt-6 text-sm text-ink-muted">No uploads yet. Add your first image above.</p>
      )}

      <div className="mt-12 max-w-3xl border border-line bg-white p-6">
        <h2 className="font-serif text-lg font-semibold text-ink">Built-in site images</h2>
        <p className="mt-2 text-sm text-ink-muted">
          These ship with the site in <code className="text-xs">public/images/</code>. Paste paths directly into CMS fields.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-ink-muted">
          <li><code className="text-xs text-ink">/images/hero-coastal.jpg</code> — homepage hero default</li>
          <li><code className="text-xs text-ink">/images/services/training.jpg</code> — training service card</li>
          <li><code className="text-xs text-ink">/images/projects/shipping-agency.jpg</code> — case studies hero</li>
          <li><code className="text-xs text-ink">/images/training/eia-workshop.jpg</code> — EIA course</li>
          <li><code className="text-xs text-ink">/images/about/adel-regal.jpg</code> — founder photo</li>
        </ul>
      </div>
    </div>
  );
}
