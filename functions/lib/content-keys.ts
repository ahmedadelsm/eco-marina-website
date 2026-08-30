/** Legacy KV content keys — deprecated; site content now lives in D1 CMS collections. */
export const EDITABLE_CONTENT_KEYS = new Set<string>([]);

/** Keys returned by GET /api/content (public). */
export const PUBLIC_CONTENT_KEYS = new Set<string>([]);

export function isEditableContentKey(key: string): boolean {
  return EDITABLE_CONTENT_KEYS.has(key);
}

export function isPublicContentKey(key: string): boolean {
  return PUBLIC_CONTENT_KEYS.has(key);
}
