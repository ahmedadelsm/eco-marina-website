"use client";

import { useState } from "react";
import { Icons } from "@/components/Icons";
import { PageHero } from "@/components/SectionHeading";
import { site } from "@/content/site-content";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-teal-500/10 p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/20">
          <svg className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="mt-6 font-serif text-xl font-medium text-ocean-900">Thank you!</h3>
        <p className="mt-2 text-slate-500">Your message has been received. We&apos;ll respond within 1–2 business days.</p>
      </div>
    );
  }

  const inputClass = "mt-1.5 w-full rounded-xl border border-sand-300 bg-white px-4 py-3 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="text-sm font-medium text-ocean-900">First Name *</label>
          <input id="firstName" name="firstName" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="lastName" className="text-sm font-medium text-ocean-900">Last Name *</label>
          <input id="lastName" name="lastName" required className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-ocean-900">Email *</label>
        <input id="email" name="email" type="email" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="organization" className="text-sm font-medium text-ocean-900">Organization</label>
        <input id="organization" name="organization" className={inputClass} />
      </div>
      <div>
        <label htmlFor="serviceType" className="text-sm font-medium text-ocean-900">Service Interest</label>
        <select id="serviceType" name="serviceType" className={inputClass}>
          <option value="">Select a service</option>
          <option value="impact-assessment">Environmental & Social Impact Assessment</option>
          <option value="monitoring">Environmental Monitoring Program</option>
          <option value="training">Training & Certification</option>
          <option value="other">Other / General Inquiry</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-ocean-900">Message *</label>
        <textarea id="message" name="message" rows={5} required className={inputClass} placeholder="Tell us about your project, timeline, and location..." />
      </div>
      <button type="submit" className="w-full rounded-full bg-teal-500 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-teal-400 sm:w-auto sm:px-10">
        Send Message
      </button>
    </form>
  );
}

export function ContactPageContent() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's work together" description="Initial consultations are free. Tell us about your assessment, monitoring, or training needs." />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl font-medium text-ocean-900">Get in touch</h2>
              <p className="mt-4 text-slate-500">We typically respond within 1–2 business days.</p>
              <div className="mt-10 space-y-6">
                {[
                  { icon: Icons.Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
                  { icon: Icons.Phone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
                  { icon: Icons.MapPin, label: "Office", value: site.office },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-500/10">
                      <item.icon className="h-5 w-5 text-teal-500" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="mt-1 block text-ocean-900 hover:text-teal-500">{item.value}</a>
                      ) : (
                        <p className="mt-1 text-ocean-900">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 rounded-2xl bg-sand-100 p-6">
                <p className="text-sm font-semibold text-ocean-900">Operating regions</p>
                <p className="mt-2 text-sm text-slate-500">{site.operatingRegions.join(" · ")}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-sand-200 bg-white p-8 shadow-sm lg:col-span-3 lg:p-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
