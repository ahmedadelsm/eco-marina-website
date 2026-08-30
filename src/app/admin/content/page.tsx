"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminContentPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/company");
  }, [router]);

  return <p className="text-ink-muted">Redirecting to Company settings…</p>;
}
