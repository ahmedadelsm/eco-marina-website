import type { Env } from "./utils";
import { corsHeaders, json } from "./utils";

interface RateLimitState {
  count: number;
  resetAt: number;
}

export function getClientIp(request: Request): string {
  return (
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

/** Returns a 429 Response when limited, otherwise null. */
export async function enforceRateLimit(
  request: Request,
  env: Env,
  bucket: string,
  limit: number,
  windowSeconds: number
): Promise<Response | null> {
  const ip = getClientIp(request);
  const key = `ratelimit:${bucket}:${ip}`;
  const now = Date.now();
  const cors = corsHeaders(request);

  const raw = await env.SETTINGS.get(key);
  let state: RateLimitState = raw
    ? (JSON.parse(raw) as RateLimitState)
    : { count: 0, resetAt: now + windowSeconds * 1000 };

  if (now >= state.resetAt) {
    state = { count: 0, resetAt: now + windowSeconds * 1000 };
  }

  if (state.count >= limit) {
    const retryAfter = Math.max(1, Math.ceil((state.resetAt - now) / 1000));
    return json(
      { error: "Too many requests. Please try again later." },
      429,
      { ...cors, "Retry-After": String(retryAfter) }
    );
  }

  state.count += 1;
  const ttl = Math.max(1, Math.ceil((state.resetAt - now) / 1000));
  await env.SETTINGS.put(key, JSON.stringify(state), { expirationTtl: ttl });
  return null;
}
