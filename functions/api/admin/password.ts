import { corsHeaders, json, readSession, type Env } from "../../lib/utils";
import { hashPassword, verifyPassword } from "../../lib/password";

export const onRequestPut: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const cors = corsHeaders(request);
  const admin = await readSession(request, env);

  if (!admin) {
    return json({ error: "Unauthorized" }, 401, cors);
  }

  try {
    const body = (await request.json()) as { currentPassword?: string; newPassword?: string };
    const currentPassword = body.currentPassword ?? "";
    const newPassword = body.newPassword ?? "";

    if (!currentPassword || !newPassword) {
      return json({ error: "Current and new password required" }, 400, cors);
    }

    if (newPassword.length < 8) {
      return json({ error: "New password must be at least 8 characters" }, 400, cors);
    }

    if (currentPassword === newPassword) {
      return json({ error: "New password must be different from current password" }, 400, cors);
    }

    const row = await env.DB.prepare("SELECT password_hash FROM admins WHERE id = ? AND active = 1")
      .bind(admin.id)
      .first<{ password_hash: string }>();

    if (!row || !(await verifyPassword(currentPassword, row.password_hash))) {
      return json({ error: "Current password is incorrect" }, 401, cors);
    }

    const passwordHash = await hashPassword(newPassword);
    await env.DB.prepare("UPDATE admins SET password_hash = ? WHERE id = ?")
      .bind(passwordHash, admin.id)
      .run();

    return json({ ok: true }, 200, cors);
  } catch {
    return json({ error: "Could not update password" }, 500, cors);
  }
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
};
