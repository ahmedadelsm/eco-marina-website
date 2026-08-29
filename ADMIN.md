# Eco Marina Admin

## Sign in

**URL:** https://eco-marina.com/admin/login

Sign in with the admin email and password configured in the D1 database. Credentials are never stored in this repository.

Multiple admins are supported — each person can have their own email and password.

**Important:** Use the same URL on all devices: **https://eco-marina.com/admin/login**

## Add more admins

1. Sign in as an existing admin
2. Go to **Admin → Admins**
3. Enter email, name, and password (min 8 characters)

## Change your password

1. Sign in
2. Go to **Admin → Settings → Change password**

## Features

- **Dashboard** — overview
- **Messages** — contact form submissions
- **Content** — edit homepage copy and contact details
- **Admins** — add/remove admin users
- **Settings** — maintenance mode and partner visibility

## Database setup (local only)

Run these commands locally. **Never commit generated SQL or passwords.**

```bash
npx wrangler d1 execute eco-marina-admin --remote --file=schema-admins.sql
node scripts/seed-admin.mjs admin@eco-marina.com "YOUR-STRONG-PASSWORD" "Site Admin" > seed.sql
npx wrangler d1 execute eco-marina-admin --remote --file=seed.sql
rm seed.sql
```

## Cloudflare bindings

| Binding | Type | Name |
|---------|------|------|
| `DB` | D1 | `eco-marina-admin` |
| `SETTINGS` | KV | `ECO_MARINA_SETTINGS` |

Auth uses the `admins` table in D1 with PBKDF2 password hashes.
