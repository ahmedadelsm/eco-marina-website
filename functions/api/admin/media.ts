import { auditLog } from "../../lib/audit";
import type { CmsMediaItem } from "../../lib/cms/types";
import { corsHeaders, json, readSession, requireAdmin, type Env } from "../../lib/utils";

const MEDIA_INDEX_KEY = "cms.media.index";
const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);

function sanitizeFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120);
}

async function readMediaIndex(env: Env): Promise<CmsMediaItem[]> {
  const row = await env.DB.prepare("SELECT value FROM content WHERE key = ?")
    .bind(MEDIA_INDEX_KEY)
    .first<{ value: string }>();
  if (!row?.value) return [];
  try {
    const parsed = JSON.parse(row.value) as CmsMediaItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeMediaIndex(env: Env, items: CmsMediaItem[]): Promise<void> {
  await env.DB.prepare(
    `INSERT INTO content (key, value, updated_at) VALUES (?, ?, datetime('now'))
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`
  )
    .bind(MEDIA_INDEX_KEY, JSON.stringify(items))
    .run();
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const denied = await requireAdmin(request, env);
  if (denied) return denied;

  const items = await readMediaIndex(env);
  return json(
    {
      items,
      configured: Boolean(env.MEDIA),
    },
    200,
    corsHeaders(request)
  );
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const denied = await requireAdmin(request, env);
  if (denied) return denied;

  const admin = await readSession(request, env);
  if (!admin) return json({ error: "Unauthorized" }, 401, corsHeaders(request));

  if (!env.MEDIA) {
    return json(
      { error: "Media storage is not configured. Add the R2 bucket binding in Cloudflare." },
      503,
      corsHeaders(request)
    );
  }

  try {
    const form = await request.formData();
    const raw = form.get("file");
    if (!raw || typeof raw === "string") {
      return json({ error: "Missing file" }, 400, corsHeaders(request));
    }
    const file = raw as File;
    if (!ALLOWED_TYPES.has(file.type)) {
      return json({ error: "Unsupported file type. Use JPEG, PNG, WebP, GIF, or SVG." }, 400, corsHeaders(request));
    }
    if (file.size > MAX_BYTES) {
      return json({ error: "File is too large (max 5 MB)" }, 400, corsHeaders(request));
    }

    const safeName = sanitizeFilename(file.name || "upload.jpg");
    const key = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${safeName}`;
    const bytes = await file.arrayBuffer();

    await env.MEDIA.put(key, bytes, {
      httpMetadata: { contentType: file.type },
    });

    const item: CmsMediaItem = {
      key,
      filename: file.name,
      contentType: file.type,
      size: file.size,
      url: `/api/media/${encodeURIComponent(key)}`,
      uploadedAt: new Date().toISOString(),
    };

    const items = await readMediaIndex(env);
    items.unshift(item);
    await writeMediaIndex(env, items.slice(0, 200));
    await auditLog(env, admin, "media.upload", key);

    return json({ item }, 201, corsHeaders(request));
  } catch {
    return json({ error: "Upload failed" }, 500, corsHeaders(request));
  }
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const denied = await requireAdmin(request, env);
  if (denied) return denied;

  const admin = await readSession(request, env);
  if (!admin) return json({ error: "Unauthorized" }, 401, corsHeaders(request));

  const url = new URL(request.url);
  const key = url.searchParams.get("key")?.trim();
  if (!key) return json({ error: "Missing key" }, 400, corsHeaders(request));

  if (env.MEDIA) {
    await env.MEDIA.delete(key);
  }

  const items = (await readMediaIndex(env)).filter((item) => item.key !== key);
  await writeMediaIndex(env, items);
  await auditLog(env, admin, "media.delete", key);

  return json({ ok: true }, 200, corsHeaders(request));
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
};
