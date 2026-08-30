"use client";

import { useCallback, useState } from "react";
import { useSiteContact } from "@/components/SiteContactInfo";
import { isTurnstileConfigured, TurnstileWidget } from "@/components/TurnstileWidget";
import { API, apiPost } from "@/lib/api";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);
  const { email: contactEmail } = useSiteContact();

  const handleTurnstileToken = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken("");
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isTurnstileConfigured() && !turnstileToken) {
      setError("Please complete the captcha.");
      return;
    }

    setLoading(true);
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await apiPost(API.contact, {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        organization: data.get("organization"),
        serviceType: data.get("serviceType"),
        message: data.get("message"),
        website: data.get("website"),
        ...(turnstileToken ? { turnstileToken } : {}),
      });
      setSubmitted(true);
      form.reset();
      setTurnstileToken("");
    } catch {
      setError(`Could not send your message. Please email ${contactEmail} directly.`);
      setTurnstileToken("");
      setTurnstileReset((n) => n + 1);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="border border-sea/20 bg-sea-light p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sea/15">
          <svg className="h-7 w-7 text-sea" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="mt-5 font-serif text-xl font-semibold text-ink">Thank you</h3>
        <p className="mt-2 text-ink-muted">Your message has been received. We&apos;ll respond within 1–2 business days.</p>
      </div>
    );
  }

  const inputClass =
    "mt-1.5 w-full border border-line bg-white px-4 py-3 text-sm transition-colors focus:border-sea focus:outline-none focus:ring-2 focus:ring-sea/20";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="text-sm font-medium text-ink">First name *</label>
          <input id="firstName" name="firstName" required maxLength={100} className={inputClass} />
        </div>
        <div>
          <label htmlFor="lastName" className="text-sm font-medium text-ink">Last name *</label>
          <input id="lastName" name="lastName" required maxLength={100} className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-ink">Email *</label>
        <input id="email" name="email" type="email" required maxLength={254} className={inputClass} />
      </div>
      <div>
        <label htmlFor="organization" className="text-sm font-medium text-ink">Organization</label>
        <input id="organization" name="organization" maxLength={200} className={inputClass} />
      </div>
      <div>
        <label htmlFor="serviceType" className="text-sm font-medium text-ink">Service interest</label>
        <select id="serviceType" name="serviceType" className={inputClass}>
          <option value="">Select a service</option>
          <option value="impact-assessment">Environmental & Social Impact Assessment</option>
          <option value="monitoring">Environmental Monitoring Program</option>
          <option value="training">Training & Workshops</option>
          <option value="other">Other / General Inquiry</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink">Message *</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          maxLength={5000}
          className={inputClass}
          placeholder="Tell us about your project, timeline, and location…"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <TurnstileWidget
        onToken={handleTurnstileToken}
        onExpire={handleTurnstileExpire}
        resetKey={turnstileReset}
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-sea py-3.5 text-sm font-semibold text-white transition-colors hover:bg-sea-dark disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {loading ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

export function ContactPageContent() {
  const { email, phone, office, phoneHref, mailto } = useSiteContact();

  return (
    <>
      <section className="border-b border-line bg-ink py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sea-light">Contact</p>
          <h1 className="mt-3 max-w-2xl font-serif text-4xl font-semibold">Let&apos;s work together</h1>
          <p className="mt-4 max-w-xl text-white/75">
            Initial consultations are free. Tell us about your assessment, monitoring, or training needs.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl font-semibold text-ink">Get in touch</h2>
              <p className="mt-3 text-ink-muted">We typically respond within 1–2 business days.</p>
              <div className="mt-10 space-y-6">
                {[
                  { label: "Email", value: email, href: mailto },
                  { label: "Phone", value: phone, href: phoneHref },
                  { label: "Office", value: office },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink-light">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="mt-1 block text-ink hover:text-sea">{item.value}</a>
                    ) : (
                      <p className="mt-1 text-ink">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-line bg-white p-8 lg:col-span-3 lg:p-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
