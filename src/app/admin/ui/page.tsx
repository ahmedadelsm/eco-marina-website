"use client";

import { useState } from "react";
import { AdminSaveBar, LocalizedInput, LocalizedTextarea } from "@/components/admin/cms/CmsFormFields";
import type { CmsUi } from "@/lib/cms/types";
import { useAdminCms } from "@/hooks/useAdminCms";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-line bg-white p-6">
      <h2 className="font-serif text-lg font-semibold text-ink">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: CmsUi[keyof CmsUi];
  onChange: (value: CmsUi[keyof CmsUi]) => void;
  multiline?: boolean;
}) {
  if (multiline) {
    return <LocalizedTextarea label={label} value={value} onChange={onChange} />;
  }
  return <LocalizedInput label={label} value={value} onChange={onChange} />;
}

const TABS = ["chrome", "footer", "projects", "training", "cards", "form"] as const;

export default function AdminUiPage() {
  const { data, setData, loading, saving, save, revert, message, error } = useAdminCms<CmsUi>("ui");
  const [open, setOpen] = useState<(typeof TABS)[number]>("chrome");

  if (loading) return <p className="text-ink-muted">Loading UI strings…</p>;

  const set = <K extends keyof CmsUi>(key: K, value: CmsUi[K]) => setData({ ...data, [key]: value });

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">UI strings</h1>
      <p className="mt-2 text-ink-muted">
        Labels, buttons, and chrome text used across the site header, footer, forms, and detail pages.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {TABS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setOpen(key)}
            className={`border px-3 py-1.5 text-sm capitalize ${open === key ? "border-sea bg-sea-light text-sea" : "border-line bg-white"}`}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="mt-6 max-w-4xl space-y-6">
        {open === "chrome" && (
          <Section title="Header & accessibility">
            <Field label="Contact button" value={data.contact} onChange={(v) => set("contact", v)} />
            <Field label="Skip to content" value={data.skipToContent} onChange={(v) => set("skipToContent", v)} />
            <Field label="Open menu" value={data.openMenu} onChange={(v) => set("openMenu", v)} />
            <Field label="Close menu" value={data.closeMenu} onChange={(v) => set("closeMenu", v)} />
            <Field label="Language switcher label" value={data.language} onChange={(v) => set("language", v)} />
            <Field label="Loading" value={data.loading} onChange={(v) => set("loading", v)} />
            <Field label="Get in touch" value={data.getInTouch} onChange={(v) => set("getInTouch", v)} />
          </Section>
        )}

        {open === "footer" && (
          <Section title="Footer">
            <Field label="Pages heading" value={data.pagesLabel} onChange={(v) => set("pagesLabel", v)} />
            <Field label="Connect heading" value={data.connect} onChange={(v) => set("connect", v)} />
            <Field label="Since prefix" value={data.footerSince} onChange={(v) => set("footerSince", v)} />
            <Field label="Services line" value={data.footerServices} onChange={(v) => set("footerServices", v)} />
            <Field label="Regions suffix" value={data.footerRegions} onChange={(v) => set("footerRegions", v)} />
            <Field label="Projects stat" value={data.projects} onChange={(v) => set("projects", v)} />
            <Field label="Countries stat" value={data.countries} onChange={(v) => set("countries", v)} />
            <Field label="Since stat" value={data.since} onChange={(v) => set("since", v)} />
            <Field label="Partners heading" value={data.partners} onChange={(v) => set("partners", v)} />
          </Section>
        )}

        {open === "projects" && (
          <Section title="Case study detail">
            <Field label="Challenge" value={data.challenge} onChange={(v) => set("challenge", v)} />
            <Field label="Approach" value={data.approach} onChange={(v) => set("approach", v)} />
            <Field label="Outcomes" value={data.outcomes} onChange={(v) => set("outcomes", v)} />
            <Field label="Project details" value={data.projectDetails} onChange={(v) => set("projectDetails", v)} />
            <Field label="Location" value={data.location} onChange={(v) => set("location", v)} />
            <Field label="Client" value={data.client} onChange={(v) => set("client", v)} />
            <Field label="Category" value={data.category} onChange={(v) => set("category", v)} />
            <Field label="Services delivered" value={data.servicesDelivered} onChange={(v) => set("servicesDelivered", v)} />
            <Field label="Discuss similar CTA" value={data.discussSimilar} onChange={(v) => set("discussSimilar", v)} />
            <Field label="More case studies" value={data.moreCaseStudies} onChange={(v) => set("moreCaseStudies", v)} />
          </Section>
        )}

        {open === "training" && (
          <Section title="Training page">
            <Field label="Topics" value={data.topics} onChange={(v) => set("topics", v)} />
            <Field label="Audience" value={data.audience} onChange={(v) => set("audience", v)} />
            <Field label="Grounded in" value={data.groundedIn} onChange={(v) => set("groundedIn", v)} />
            <Field label="Pricing" value={data.pricing} onChange={(v) => set("pricing", v)} />
            <Field label="Schedule" value={data.schedule} onChange={(v) => set("schedule", v)} />
            <Field label="Training CTA text" value={data.trainingCta} onChange={(v) => set("trainingCta", v)} multiline />
            <Field label="Request training button" value={data.requestTraining} onChange={(v) => set("requestTraining", v)} />
          </Section>
        )}

        {open === "cards" && (
          <Section title="Service cards">
            <Field label="Details link" value={data.detailsLink} onChange={(v) => set("detailsLink", v)} />
            <Field label="Deliverables" value={data.deliverables} onChange={(v) => set("deliverables", v)} />
            <Field label="Sectors" value={data.sectors} onChange={(v) => set("sectors", v)} />
          </Section>
        )}

        {open === "form" && (
          <Section title="Contact form">
            <Field label="First name" value={data.formFirstName} onChange={(v) => set("formFirstName", v)} />
            <Field label="Last name" value={data.formLastName} onChange={(v) => set("formLastName", v)} />
            <Field label="Email" value={data.formEmail} onChange={(v) => set("formEmail", v)} />
            <Field label="Organization" value={data.formOrganization} onChange={(v) => set("formOrganization", v)} />
            <Field label="Service interest" value={data.formServiceInterest} onChange={(v) => set("formServiceInterest", v)} />
            <Field label="Select service placeholder" value={data.formSelectService} onChange={(v) => set("formSelectService", v)} />
            <Field label="Message" value={data.formMessage} onChange={(v) => set("formMessage", v)} />
            <Field label="Message placeholder" value={data.formMessagePlaceholder} onChange={(v) => set("formMessagePlaceholder", v)} />
            <Field label="Send button" value={data.formSend} onChange={(v) => set("formSend", v)} />
            <Field label="Sending" value={data.formSending} onChange={(v) => set("formSending", v)} />
            <Field label="Captcha error" value={data.formCaptcha} onChange={(v) => set("formCaptcha", v)} />
            <Field label="Submit error" value={data.formError} onChange={(v) => set("formError", v)} />
            <Field label="Thank you heading" value={data.formThankYou} onChange={(v) => set("formThankYou", v)} />
            <Field label="Thank you message" value={data.formReceived} onChange={(v) => set("formReceived", v)} />
          </Section>
        )}
      </div>

      <AdminSaveBar saving={saving} message={message} error={error} onSave={save} onRevert={revert} />
    </div>
  );
}
