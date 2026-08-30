import type { Env } from "../../lib/utils";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, params } = context;
  if (!env.MEDIA) {
    return new Response("Media storage not configured", { status: 503 });
  }

  const segments = params.path;
  const key = Array.isArray(segments) ? segments.join("/") : segments;
  if (!key) return new Response("Not found", { status: 404 });

  const object = await env.MEDIA.get(decodeURIComponent(key));
  if (!object) return new Response("Not found", { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  headers.set("ETag", object.httpEtag);

  return new Response(object.body, { headers });
};
