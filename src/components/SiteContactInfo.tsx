"use client";

import { useContentOverride } from "@/components/ContentOverridesProvider";
import { CMS_KEYS } from "@/lib/content-keys";
import { site } from "@/content/site-content";

export function useSiteContact() {
  const email = useContentOverride(CMS_KEYS.siteEmail, site.email);
  const phone = useContentOverride(CMS_KEYS.sitePhone, site.phone);
  const office = useContentOverride(CMS_KEYS.siteOffice, site.office);
  const phoneHref = `tel:${phone.replace(/\s/g, "")}`;

  return { email, phone, office, phoneHref, mailto: `mailto:${email}` };
}
