import { isPublicContentKey } from "../lib/content-keys";
import { corsHeaders, json, type Env } from "../lib/utils";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, request } = context;
  try {
    const { results } = await env.DB.prepare("SELECT key, value, updated_at FROM content").all();
    const content: Record<string, unknown> = {};
    for (const row of results as { key: string; value: string }[]) {
      if (!isPublicContentKey(row.key)) continue;
      try {
        content[row.key] = JSON.parse(row.value);
      } catch {
        content[row.key] = row.value;
      }
    }
    return json({ content }, 200, corsHeaders(request));
  } catch {
    return json({ content: {} }, 200, corsHeaders(request));
  }
};
