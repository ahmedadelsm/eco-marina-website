import type { LocalizedList, LocalizedText } from "@/lib/cms/types";

const inputClass =
  "mt-1 w-full border border-line px-3 py-2 text-sm focus:border-sea focus:outline-none focus:ring-2 focus:ring-sea/20";

export function LocalizedInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: LocalizedText;
  onChange: (value: LocalizedText) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="text-sm font-medium text-ink">{label} (EN)</label>
        <input
          value={value.en}
          onChange={(e) => onChange({ ...value, en: e.target.value })}
          className={inputClass}
        />
      </div>
      <div>
        <label className="text-sm font-medium text-ink">{label} (NL)</label>
        <input
          value={value.nl}
          onChange={(e) => onChange({ ...value, nl: e.target.value })}
          className={inputClass}
        />
      </div>
    </div>
  );
}

export function LocalizedTextarea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: LocalizedText;
  onChange: (value: LocalizedText) => void;
  rows?: number;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="text-sm font-medium text-ink">{label} (EN)</label>
        <textarea
          rows={rows}
          value={value.en}
          onChange={(e) => onChange({ ...value, en: e.target.value })}
          className={inputClass}
        />
      </div>
      <div>
        <label className="text-sm font-medium text-ink">{label} (NL)</label>
        <textarea
          rows={rows}
          value={value.nl}
          onChange={(e) => onChange({ ...value, nl: e.target.value })}
          className={inputClass}
        />
      </div>
    </div>
  );
}

export function LocalizedListField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: LocalizedList;
  onChange: (value: LocalizedList) => void;
}) {
  function update(locale: "en" | "nl", text: string) {
    const items = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    onChange({ ...value, [locale]: items });
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="text-sm font-medium text-ink">{label} (EN) — one per line</label>
        <textarea
          rows={5}
          value={value.en.join("\n")}
          onChange={(e) => update("en", e.target.value)}
          className={inputClass}
        />
      </div>
      <div>
        <label className="text-sm font-medium text-ink">{label} (NL) — one per line</label>
        <textarea
          rows={5}
          value={value.nl.join("\n")}
          onChange={(e) => update("nl", e.target.value)}
          className={inputClass}
        />
      </div>
    </div>
  );
}

export function AdminSaveBar({
  saving,
  message,
  error,
  onSave,
  onRevert,
  revertLabel = "Revert to defaults",
}: {
  saving: boolean;
  message: string;
  error: string;
  onSave: () => void;
  onRevert?: () => void;
  revertLabel?: string;
}) {
  return (
    <div className="sticky bottom-0 z-10 -mx-4 mt-8 border-t border-line bg-paper/95 px-4 py-4 backdrop-blur sm:-mx-8 sm:px-8">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-blue-dark disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
        {onRevert && (
          <button
            type="button"
            onClick={onRevert}
            disabled={saving}
            className="border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink hover:bg-paper disabled:opacity-60"
          >
            {revertLabel}
          </button>
        )}
        {message && <span className="text-sm text-brand-green">{message}</span>}
        {error && <span className="text-sm text-red-600">{error}</span>}
      </div>
    </div>
  );
}
