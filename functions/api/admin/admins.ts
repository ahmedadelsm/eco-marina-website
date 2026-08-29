import { auditLog } from "../../lib/audit";
import {
  bumpAdminSessionEpoch,
  corsHeaders,
  json,
  readSession,
  requireAdmin,
  type Env,
} from "../../lib/utils";
import { hashPassword } from "../../lib/password";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const denied = await requireAdmin(request, env);
  if (denied) return denied;

  const { results } = await env.DB.prepare(
    "SELECT id, email, name, active, created_at FROM admins ORDER BY created_at ASC"
  ).all();

  return json({ admins: results }, 200, corsHeaders(context.request));
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const denied = await requireAdmin(request, env);
  if (denied) return denied;

  const actor = await readSession(request, env);
  if (!actor) return json({ error: "Unauthorized" }, 401, corsHeaders(context.request));

  try {
    const body = (await request.json()) as { email?: string; password?: string; name?: string };
    const email = body.email?.trim().toLowerCase();
    const password = body.password;
    const name = body.name?.trim().slice(0, 100) || null;

    if (!email || !password || password.length < 8 || password.length > 256) {
      return json({ error: "Email and password (min 8 chars) required" }, 400, corsHeaders(context.request));
    }

    if (email.length > 254) {
      return json({ error: "Email is too long" }, 400, corsHeaders(context.request));
    }

    const passwordHash = await hashPassword(password);
    await env.DB.prepare(
      "INSERT INTO admins (email, password_hash, name) VALUES (?, ?, ?)"
    )
      .bind(email, passwordHash, name)
      .run();

    await auditLog(env, actor, "admin.create", email);

    return json({ ok: true }, 201, corsHeaders(context.request));
  } catch {
    return json({ error: "Email may already exist" }, 409, corsHeaders(context.request));
  }
};

export const onRequestPatch: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const denied = await requireAdmin(request, env);
  if (denied) return denied;

  const actor = await readSession(request, env);
  if (!actor) return json({ error: "Unauthorized" }, 401, corsHeaders(context.request));

  try {
    const body = (await request.json()) as { id?: number; active?: boolean };
    const targetId = body.id;
    const active = body.active;

    if (!targetId || typeof active !== "boolean") {
      return json({ error: "Missing id or active status" }, 400, corsHeaders(context.request));
    }

    if (targetId === actor.id && !active) {
      return json({ error: "You cannot deactivate your own account" }, 400, corsHeaders(context.request));
    }

    const target = await env.DB.prepare("SELECT id, email, active FROM admins WHERE id = ?")
      .bind(targetId)
      .first<{ id: number; email: string; active: number }>();

    if (!target) {
      return json({ error: "Admin not found" }, 404, corsHeaders(context.request));
    }

    if (active) {
      await env.DB.prepare("UPDATE admins SET active = 1 WHERE id = ?").bind(targetId).run();
      await auditLog(env, actor, "admin.activate", target.email);
    } else {
      const activeCount = await env.DB.prepare(
        "SELECT COUNT(*) as count FROM admins WHERE active = 1"
      ).first<{ count: number }>();

      if ((activeCount?.count ?? 0) <= 1) {
        return json({ error: "At least one active admin is required" }, 400, corsHeaders(context.request));
      }

      await env.DB.prepare("UPDATE admins SET active = 0 WHERE id = ?").bind(targetId).run();
      await bumpAdminSessionEpoch(env, targetId);
      await auditLog(env, actor, "admin.deactivate", target.email);
    }

    return json({ ok: true }, 200, corsHeaders(context.request));
  } catch {
    return json({ error: "Update failed" }, 500, corsHeaders(context.request));
  }
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
};
