"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API, apiGet } from "@/lib/api";

type AuditEntry = {
  at: string;
  adminId: number;
  email: string;
  action: string;
  detail: string | null;
};

export default function AdminAuditPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiGet<{ entries: AuditEntry[] }>(API.admin.audit)
      .then((d) => setEntries(d.entries))
      .catch((err) => {
        if (err instanceof Error && err.message === "Forbidden") {
          router.replace("/admin");
          return;
        }
        setError("Could not load audit log.");
      });
  }, [router]);

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">Audit log</h1>
      <p className="mt-2 text-ink-muted">Recent admin actions (last 100 entries).</p>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <div className="mt-8 overflow-x-auto border border-line bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-line bg-paper text-xs uppercase tracking-wider text-ink-muted">
            <tr>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Admin</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Detail</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-ink-muted">
                  No audit entries yet.
                </td>
              </tr>
            ) : (
              entries.map((entry, i) => (
                <tr key={`${entry.at}-${i}`} className="border-b border-line last:border-0">
                  <td className="whitespace-nowrap px-4 py-3 text-ink-muted">
                    {new Date(entry.at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{entry.email}</td>
                  <td className="px-4 py-3 font-medium">{entry.action}</td>
                  <td className="px-4 py-3 text-ink-muted">{entry.detail ?? "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
