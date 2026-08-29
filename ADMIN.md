# Eco Marina Admin

## Sign in

**URL:** https://eco-marina.com/admin/login

### Temporary admin (change after first login)

| Field | Value |
|-------|--------|
| **Email** | `admin@eco-marina.com` |
| **Password** | `EcoMarina2026!` |

Multiple admins are supported — each person signs in with their own email and password.

**Important:** Use the same URL on all devices: **https://eco-marina.com/admin/login** (not `www.` — cookies now work on both, but stick to one for consistency).

Each device signs in separately with the **same email and password** — you'll see the same messages and settings. The admin header shows which email you're signed in as.

## Add more admins

1. Sign in as an existing admin
2. Go to **Admin → Admins**
3. Enter email, name, and password (min 8 characters)

## Features

- **Dashboard** — overview
- **Messages** — contact form submissions
- **Content** — edit homepage copy and contact details
- **Admins** — add/remove admin users
- **Settings** — toggle maintenance mode (instant, no rebuild)

## Database setup

```bash
npx wrangler d1 execute eco-marina-admin --remote --file=schema-admins.sql
node scripts/seed-admin.mjs admin@eco-marina.com "EcoMarina2026!" "Site Admin" > seed.sql
npx wrangler d1 execute eco-marina-admin --remote --file=seed.sql
```

## Cloudflare bindings

| Binding | Type | Name |
|---------|------|------|
| `DB` | D1 | `eco-marina-admin` |
| `SETTINGS` | KV | `ECO_MARINA_SETTINGS` |

No `ADMIN_PASSWORD` env var needed — auth uses the `admins` table in D1.
