import type { Env } from "./utils";
import { getClientIp } from "./rate-limit";

interface TurnstileResponse {
  success: boolean;
  "error-codes"?: string[];
}

/** Returns true when Turnstile is not configured (dev/local). */
export function isTurnstileEnabled(env: Env): boolean {
  return Boolean(env.TURNSTILE_SECRET_KEY?.trim());
}

export async function verifyTurnstile(
  request: Request,
  env: Env,
  token: string | undefined
): Promise<boolean> {
  const secret = env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return true;
  if (!token?.trim()) return false;

  const body = new URLSearchParams({
    secret,
    response: token.trim(),
    remoteip: getClientIp(request),
  });

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) return false;
  const data = (await res.json()) as TurnstileResponse;
  return data.success === true;
}
