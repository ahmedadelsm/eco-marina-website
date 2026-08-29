"use client";

import { useSiteContact } from "@/components/SiteContactInfo";

export function ResourcesContactEmail() {
  const { email, mailto } = useSiteContact();
  return (
    <a href={mailto} className="mt-4 inline-block text-sm text-ink-light hover:text-sea">
      {email}
    </a>
  );
}
