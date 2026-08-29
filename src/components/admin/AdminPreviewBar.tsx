"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { API, apiGet } from "@/lib/api";

export function AdminPreviewBar() {
  const [visible, setVisible] = useState(false);
  const [maintenance, setMaintenance] = useState(false);

  useEffect(() => {
    apiGet<{ maintenanceEnabled: boolean }>(API.admin.stats)
      .then((d) => {
        setVisible(true);
        setMaintenance(d.maintenanceEnabled);
      })
      .catch(() => setVisible(false));
  }, []);

  if (!visible || !maintenance) return null;

  return (
    <div className="sticky top-0 z-[100] border-b border-amber-300 bg-amber-50 px-4 py-2 text-center text-sm text-amber-950">
      <span className="font-medium">Admin preview</span> — maintenance mode is on; visitors see the in-progress page.{" "}
      <Link href="/admin/settings" className="font-semibold underline hover:text-amber-800">
        Turn off maintenance
      </Link>
    </div>
  );
}
