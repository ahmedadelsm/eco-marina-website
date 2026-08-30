"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API, apiGet, apiPut } from "@/lib/api";
import { AdminEmailSettings } from "@/components/admin/AdminEmailSettings";

export default function AdminSettingsPage() {
  const router = useRouter();
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [role, setRole] = useState<"super_admin" | "editor" | null>(null);
  const [maintenanceError, setMaintenanceError] = useState("");

  useEffect(() => {
    Promise.all([
      apiGet<{ enabled: boolean }>(API.admin.maintenance),
      apiGet<{ role: "super_admin" | "editor" }>(API.admin.me),
    ])
      .then(([maintenance, me]) => {
        setEnabled(maintenance.enabled);
        setRole(me.role);
      })
      .catch(() => router.replace("/admin/login"))
      .finally(() => setLoading(false));
  }, [router]);

  async function toggle() {
    setSaving(true);
    setMaintenanceError("");
    const next = !enabled;
    try {
      await apiPut(API.admin.maintenance, { enabled: next });
      setEnabled(next);
    } catch (err) {
      setMaintenanceError(err instanceof Error ? err.message : "Could not update maintenance mode.");
    } finally {
      setSaving(false);
    }
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError("");
    setPasswordMessage("");

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    setPasswordSaving(true);
    try {
      await apiPut(API.admin.password, { currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordMessage("Password updated successfully.");
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : "Could not update password.");
    } finally {
      setPasswordSaving(false);
    }
  }

  if (loading) return <p className="text-ink-muted">Loading settings…</p>;

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">Settings</h1>
      <p className="mt-2 text-ink-muted">Site-wide configuration and your account.</p>

      {role === "super_admin" && (
      <div className="mt-8 max-w-xl border border-line bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-serif text-xl font-semibold text-ink">Maintenance mode</h2>
            <p className="mt-2 text-sm text-ink-muted">
              When enabled, visitors to eco-marina.com see the &ldquo;Site update in progress&rdquo; page.
              Admin and API routes remain accessible.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            disabled={saving}
            onClick={toggle}
            className={`relative h-7 w-12 shrink-0 transition-colors ${
              enabled ? "bg-brand-blue" : "bg-line"
            }`}
          >
            <span
              className={`absolute top-0.5 h-6 w-6 bg-white shadow transition-transform ${
                enabled ? "left-5" : "left-0.5"
              }`}
            />
          </button>
        </div>
        <p className={`mt-4 text-sm font-medium ${enabled ? "text-amber-700" : "text-brand-green"}`}>
          Status: {enabled ? "Maintenance ON — public site hidden" : "Live — full website visible"}
        </p>
        {maintenanceError && <p className="mt-3 text-sm text-red-600">{maintenanceError}</p>}
      </div>
      )}

      {role === "super_admin" && <AdminEmailSettings />}

      <form onSubmit={changePassword} className="mt-8 max-w-xl border border-line bg-white p-6">
        <h2 className="font-serif text-xl font-semibold text-ink">Change password</h2>
        <p className="mt-2 text-sm text-ink-muted">Update the password for your admin account.</p>

        <label className="mt-6 block text-sm font-medium text-ink" htmlFor="current-password">
          Current password
        </label>
        <input
          id="current-password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="mt-1.5 w-full border border-line px-3 py-2.5 text-sm focus:border-sea focus:outline-none focus:ring-2 focus:ring-sea/20"
        />

        <label className="mt-4 block text-sm font-medium text-ink" htmlFor="new-password">
          New password
        </label>
        <input
          id="new-password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength={8}
          autoComplete="new-password"
          className="mt-1.5 w-full border border-line px-3 py-2.5 text-sm focus:border-sea focus:outline-none focus:ring-2 focus:ring-sea/20"
        />

        <label className="mt-4 block text-sm font-medium text-ink" htmlFor="confirm-password">
          Confirm new password
        </label>
        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={8}
          autoComplete="new-password"
          className="mt-1.5 w-full border border-line px-3 py-2.5 text-sm focus:border-sea focus:outline-none focus:ring-2 focus:ring-sea/20"
        />

        {passwordError && <p className="mt-3 text-sm text-red-600">{passwordError}</p>}
        {passwordMessage && <p className="mt-3 text-sm text-sea">{passwordMessage}</p>}

        <button
          type="submit"
          disabled={passwordSaving}
          className="mt-6 bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-blue-dark disabled:opacity-60"
        >
          {passwordSaving ? "Updating…" : "Update password"}
        </button>
      </form>
    </div>
  );
}
