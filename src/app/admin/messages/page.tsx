"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API, apiDelete, apiGet, apiPatch } from "@/lib/api";

type Message = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  organization: string | null;
  service_type: string | null;
  message: string;
  read: number;
  created_at: string;
};

export default function AdminMessagesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);

  useEffect(() => {
    apiGet<{ messages: Message[] }>(API.admin.messages)
      .then((d) => setMessages(d.messages as Message[]))
      .catch(() => router.replace("/admin/login"));
  }, [router]);

  async function markRead(id: number, read: boolean) {
    await apiPatch(API.admin.messages, { id, read });
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: read ? 1 : 0 } : m)));
    if (selected?.id === id) setSelected({ ...selected, read: read ? 1 : 0 });
  }

  async function remove(id: number) {
    if (!confirm("Delete this message?")) return;
    await apiDelete(`${API.admin.messages}?id=${id}`);
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">Messages</h1>
      <p className="mt-2 text-ink-muted">Contact form submissions from eco-marina.com</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-2">
          {messages.length === 0 && <p className="text-sm text-ink-muted">No messages yet.</p>}
          {messages.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setSelected(m);
                if (!m.read) markRead(m.id, true);
              }}
              className={`w-full border px-4 py-3 text-left transition-colors ${
                selected?.id === m.id ? "border-sea bg-sea-light" : "border-line bg-white hover:border-sea/40"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium text-ink">
                  {m.first_name} {m.last_name}
                </p>
                {!m.read && <span className="h-2 w-2 shrink-0 rounded-full bg-sea" />}
              </div>
              <p className="mt-1 truncate text-xs text-ink-muted">{m.email}</p>
              <p className="mt-1 text-xs text-ink-light">{new Date(m.created_at).toLocaleString()}</p>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 border border-line bg-white p-6">
          {!selected ? (
            <p className="text-ink-muted">Select a message to read.</p>
          ) : (
            <>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-serif text-xl font-semibold text-ink">
                    {selected.first_name} {selected.last_name}
                  </h2>
                  <a href={`mailto:${selected.email}`} className="text-sm text-sea hover:underline">
                    {selected.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => remove(selected.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
              <dl className="mt-6 space-y-3 text-sm">
                {selected.organization && (
                  <div>
                    <dt className="text-ink-light">Organization</dt>
                    <dd className="text-ink">{selected.organization}</dd>
                  </div>
                )}
                {selected.service_type && (
                  <div>
                    <dt className="text-ink-light">Service interest</dt>
                    <dd className="text-ink">{selected.service_type}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-ink-light">Received</dt>
                  <dd className="text-ink">{new Date(selected.created_at).toLocaleString()}</dd>
                </div>
              </dl>
              <div className="mt-6 border-t border-line pt-6">
                <p className="whitespace-pre-wrap text-ink leading-relaxed">{selected.message}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
