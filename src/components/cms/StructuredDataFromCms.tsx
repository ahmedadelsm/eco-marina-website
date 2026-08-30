"use client";

import { useEffect } from "react";
import { useCms } from "@/components/cms/CmsProvider";
import { useSiteContact } from "@/components/SiteContactInfo";
import { site } from "@/content/site-content";

export function StructuredDataFromCms() {
  const { company } = useCms();
  const { email, phone } = useSiteContact();

  useEffect(() => {
    const scripts = document.querySelectorAll('script[data-cms-structured="true"]');
    scripts.forEach((node) => node.remove());

    const org = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: site.name,
      url: "https://eco-marina.com",
      logo: "https://eco-marina.com/images/logo.png",
      email,
      telephone: phone,
      sameAs: [company.linkedIn],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-cms-structured", "true");
    script.textContent = JSON.stringify(org);
    document.head.appendChild(script);
  }, [company.linkedIn, email, phone]);

  return null;
}
