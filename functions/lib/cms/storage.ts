import type { CmsCollection } from "./types";
import { cmsStorageKey } from "./types";
import type { Env } from "../utils";

export async function getCmsCollection<T>(env: Env, collection: CmsCollection): Promise<T | null> {
  const row = await env.DB.prepare("SELECT value FROM content WHERE key = ?")
    .bind(cmsStorageKey(collection))
    .first<{ value: string }>();
  if (!row?.value) return null;
  try {
    return JSON.parse(row.value) as T;
  } catch {
    return null;
  }
}

export async function setCmsCollection(env: Env, collection: CmsCollection, value: unknown): Promise<void> {
  const json = JSON.stringify(value);
  if (json.length > 500_000) {
    throw new Error("Content is too large to save");
  }
  await env.DB.prepare(
    `INSERT INTO content (key, value, updated_at) VALUES (?, ?, datetime('now'))
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`
  )
    .bind(cmsStorageKey(collection), json)
    .run();
}
