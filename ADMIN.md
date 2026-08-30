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
- **Settings** — maintenance mode, contact form email (Zoho), and partner visibility

## Contact form email (Zoho)

Submissions are always saved under **Messages**. Email alerts use your **Zoho Mail** account.

### From the admin panel (any time)

1. **Admin → Settings → Contact form email**
2. Set **Send notifications to** (your Zoho inbox, e.g. `info@eco-marina.com`)
3. Set **From email** (must be a mailbox on the same Zoho account)
4. Turn notifications on/off with the toggle
5. Click **Send test email** after setup

### One-time Zoho API setup (Cloudflare)

OAuth credentials are stored as Cloudflare secrets (not in the admin panel):

| Variable | Description |
|----------|-------------|
| `ZOHO_CLIENT_ID` | From [Zoho API Console](https://api-console.zoho.eu/) |
| `ZOHO_CLIENT_SECRET` | Same app |
| `ZOHO_REFRESH_TOKEN` | Generated with `access_type=offline` |
| `ZOHO_DC` | `eu` for European Zoho accounts |

Required OAuth scope: `ZohoMail.messages.CREATE`

After adding variables, redeploy the site, then run **Send test email** in Settings.

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
