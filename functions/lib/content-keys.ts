/** CMS keys editable in admin and/or exposed on the public API. */
export const EDITABLE_CONTENT_KEYS = new Set([
  "hero.headline",
  "hero.subheadline",
  "hero.headline.nl",
  "hero.subheadline.nl",
  "site.email",
  "site.phone",
  "site.office",
  "partners.enabled",
]);

/** Keys returned by GET /api/content (public). */
export const PUBLIC_CONTENT_KEYS = new Set([
  "hero.headline",
  "hero.subheadline",
  "hero.headline.nl",
  "hero.subheadline.nl",
  "site.email",
  "site.phone",
  "site.office",
  "partners.enabled",
]);

export function isEditableContentKey(key: string): boolean {
  return EDITABLE_CONTENT_KEYS.has(key);
}

export function isPublicContentKey(key: string): boolean {
  return PUBLIC_CONTENT_KEYS.has(key);
}
