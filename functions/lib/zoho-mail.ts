import type { Env } from "./utils";

type ZohoDc = "com" | "eu" | "in" | "com.au" | "jp" | "ca";

function resolveDc(env: Env): ZohoDc {
  const dc = env.ZOHO_DC?.trim().toLowerCase();
  if (dc === "eu" || dc === "in" || dc === "com.au" || dc === "jp" || dc === "ca") return dc;
  return "com";
}

function accountsBase(dc: ZohoDc): string {
  if (dc === "eu") return "https://accounts.zoho.eu";
  if (dc === "in") return "https://accounts.zoho.in";
  if (dc === "com.au") return "https://accounts.zoho.com.au";
  if (dc === "jp") return "https://accounts.zoho.jp";
  if (dc === "ca") return "https://accounts.zohocloud.ca";
  return "https://accounts.zoho.com";
}

function mailApiBase(dc: ZohoDc): string {
  if (dc === "eu") return "https://mail.zoho.eu";
  if (dc === "in") return "https://mail.zoho.in";
  if (dc === "com.au") return "https://mail.zoho.com.au";
  if (dc === "jp") return "https://mail.zoho.jp";
  if (dc === "ca") return "https://mail.zohocloud.ca";
  return "https://mail.zoho.com";
}

interface TokenCache {
  token: string;
  expiresAt: number;
}

const TOKEN_KEY = "zoho:access_token";
const ACCOUNT_KEY = "zoho:account_id";

async function refreshAccessToken(env: Env): Promise<string> {
  const dc = resolveDc(env);
  const clientId = env.ZOHO_CLIENT_ID?.trim();
  const clientSecret = env.ZOHO_CLIENT_SECRET?.trim();
  const refreshToken = env.ZOHO_REFRESH_TOKEN?.trim();
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Zoho Mail is not configured");
  }

  const body = new URLSearchParams({
    refresh_token: refreshToken,
    grant_type: "refresh_token",
    client_id: clientId,
    client_secret: clientSecret,
  });

  const res = await fetch(`${accountsBase(dc)}/oauth/v2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = (await res.json()) as { access_token?: string; expires_in?: number; error?: string };
  if (!res.ok || !data.access_token) {
    throw new Error(data.error || `Zoho token refresh failed (${res.status})`);
  }

  const expiresIn = data.expires_in ?? 3600;
  const cache: TokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + expiresIn * 1000 - 60_000,
  };
  await env.SETTINGS.put(TOKEN_KEY, JSON.stringify(cache), { expirationTtl: Math.max(expiresIn - 60, 300) });
  return data.access_token;
}

async function getAccessToken(env: Env): Promise<string> {
  const raw = await env.SETTINGS.get(TOKEN_KEY);
  if (raw) {
    try {
      const cache = JSON.parse(raw) as TokenCache;
      if (cache.token && cache.expiresAt > Date.now()) return cache.token;
    } catch {
      /* refresh below */
    }
  }
  return refreshAccessToken(env);
}

async function getAccountId(env: Env, accessToken: string): Promise<string> {
  const preset = env.ZOHO_ACCOUNT_ID?.trim();
  if (preset) return preset;

  const cached = await env.SETTINGS.get(ACCOUNT_KEY);
  if (cached) return cached;

  const dc = resolveDc(env);
  const res = await fetch(`${mailApiBase(dc)}/api/accounts`, {
    headers: {
      Accept: "application/json",
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
  });

  const data = (await res.json()) as {
    data?: Array<{ accountId?: string; zuid?: string; primaryEmailAddress?: string }>;
    status?: { code?: number; description?: string };
  };

  if (!res.ok) {
    throw new Error(data.status?.description || `Zoho accounts lookup failed (${res.status})`);
  }

  const account = data.data?.[0];
  const accountId = account?.accountId || account?.zuid;
  if (!accountId) {
    throw new Error("Could not resolve Zoho Mail account ID");
  }

  await env.SETTINGS.put(ACCOUNT_KEY, accountId);
  return accountId;
}

export interface OutboundEmail {
  to: string;
  fromEmail: string;
  fromName: string;
  replyTo?: string;
  subject: string;
  text: string;
}

export async function sendZohoMail(env: Env, email: OutboundEmail): Promise<void> {
  const accessToken = await getAccessToken(env);
  const accountId = await getAccountId(env, accessToken);
  const dc = resolveDc(env);

  const res = await fetch(`${mailApiBase(dc)}/api/accounts/${accountId}/messages`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
    body: JSON.stringify({
      fromAddress: email.fromEmail,
      toAddress: email.to,
      subject: email.subject,
      content: email.text,
      mailFormat: "plaintext",
      ...(email.replyTo ? { replyTo: email.replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Zoho send failed (${res.status}): ${detail.slice(0, 200)}`);
  }
}
