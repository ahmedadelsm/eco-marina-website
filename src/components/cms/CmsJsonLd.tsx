"use client";

import { useCms } from "@/components/cms/CmsProvider";
import { JsonLd } from "@/components/JsonLd";

export function CmsJsonLd() {
  const { company } = useCms();
  const siteUrl = `https://${company.domain}`;

  return (
    <JsonLd
      data={[
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: company.name,
          url: siteUrl,
          logo: `${siteUrl}/images/logo.png`,
          email: company.email,
          telephone: company.phone,
          address: {
            "@type": "PostalAddress",
            addressLocality: company.office,
            addressCountry: "NL",
          },
          sameAs: [company.linkedIn],
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: company.name,
          url: siteUrl,
          description: company.tagline,
        },
        {
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: company.name,
          url: siteUrl,
          description: company.tagline,
          areaServed: company.operatingRegions,
          email: company.email,
          telephone: company.phone,
        },
      ]}
    />
  );
}
