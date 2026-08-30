"use client";

import { useCms } from "@/components/cms/CmsProvider";

export function SkipToContentLink() {
  const { ui } = useCms();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink focus:shadow-lg"
    >
      {ui.skipToContent}
    </a>
  );
}
