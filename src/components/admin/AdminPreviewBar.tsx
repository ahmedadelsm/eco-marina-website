"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API, adminLogout, apiGet } from "@/lib/api";

export function AdminPreviewBar() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [maintenance, setMaintenance] = useState(false);

  useEffect(() => {
    apiGet<{ email: string }>(API.admin.me)
      .then((d) => setEmail(d.email))
      .catch(() => setEmail(null));
    apiGet<{ maintenanceEnabled: boolean }>(API.admin.stats)
      .then((d) => setMaintenance(d.maintenanceEnabled))
      .catch(() => {});
  }, []);

  async function logout() {
    try {
      await adminLogout();
    } catch {
      // Still redirect — server may have invalidated the session.
    }
    router.replace("/");
  }

  if (!email) return null;

  return (
    <div className="sticky top-0 z-[100] border-b border-amber-300 bg-amber-50 px-4 py-2.5 text-sm text-amber-950">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-between">
        <p className="text-center sm:text-left">
          {maintenance ? (
            <>
              <span className="font-medium">Admin preview</span> — maintenance mode is on; visitors see the in-progress page.
            </>
          ) : (
            <>
              Signed in as <span className="font-medium">{email}</span>
            </>
          )}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {maintenance && (
            <Link href="/admin/settings" className="font-semibold underline hover:text-amber-800">
              Turn off maintenance
            </Link>
          )}
          <Link href="/admin" className="font-semibold underline hover:text-amber-800">
            Admin panel
          </Link>
          <button
            type="button"
            onClick={logout}
            className="rounded border border-red-300 bg-white px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-50"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
