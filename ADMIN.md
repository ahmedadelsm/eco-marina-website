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

- **Dashboard** — overview with CMS collection count
- **Messages** — contact form submissions (export CSV)
- **Content** — edit homepage hero and contact details
- **Hero** — homepage hero image, eyebrow, CTAs, headline defaults
- **Page copy** — inner page heroes, about labels, service detail content
- **Navigation** — header and footer menu labels
- **UI strings** — header, footer, forms, case study and training labels
- **Services** — core services, specialist categories, legacy services
- **Training** — page hero, courses, pricing, and schedules
- **FAQ** — categories, questions, and answers
- **Partners** — full partner CRUD with publish toggle and logos
- **Contact** — contact page hero, intro, labels, and form dropdown options
- **Resources** — resource groups and request section copy
- **Admins** — add/remove admin users
- **Audit log** — admin action history (D1)
- **Settings** — maintenance mode and contact form email (Zoho)

## Audit log (D1)

Run once after deploying:

```bash
npx wrangler d1 execute eco-marina-admin --remote --file=schema-audit.sql
```

## Dynamic sitemap

`/sitemap.xml` is generated at request time from CMS project and insight slugs. No static sitemap is written at build time.

## Messages export

In **Admin → Messages**, click **Export CSV** to download up to 200 recent submissions.

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

## Media uploads (R2)

1. In Cloudflare, create R2 bucket `eco-marina-media`
2. Attach the `MEDIA` binding to the Pages project (see `wrangler.toml`)
3. Use **Admin → Media** to upload images
4. Copy the URL into case study or training image fields

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
| `MEDIA` | R2 | `eco-marina-media` |

Auth uses the `admins` table in D1 with PBKDF2 password hashes.
