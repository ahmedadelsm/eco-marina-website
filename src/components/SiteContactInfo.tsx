"use client";

import { useCms } from "@/components/cms/CmsProvider";

export function useSiteContact() {
  const { company } = useCms();
  const phoneHref = `tel:${company.phone.replace(/\s/g, "")}`;

  return {
    email: company.email,
    phone: company.phone,
    office: company.office,
    phoneHref,
    mailto: `mailto:${company.email}`,
  };
}
