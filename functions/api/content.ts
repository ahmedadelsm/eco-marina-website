import { corsHeaders, json, type Env } from "../lib/utils";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;
  try {
    const { results } = await env.DB.prepare("SELECT key, value, updated_at FROM content").all();
    const content: Record<string, unknown> = {};
    for (const row of results as { key: string; value: string }[]) {
      try {
        content[row.key] = JSON.parse(row.value);
      } catch {
        content[row.key] = row.value;
      }
    }
    return json({ content }, 200, corsHeaders(context.request));
  } catch {
    return json({ content: {} }, 200, corsHeaders(context.request));
  }
};
