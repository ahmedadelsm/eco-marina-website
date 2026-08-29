# Eco Marina Admin & Deployment

## Admin panel

URL: **https://eco-marina.com/admin/login**

Set `ADMIN_PASSWORD` in Cloudflare Dashboard → Workers & Pages → eco-marina → Settings → Environment variables.

### Features

- **Dashboard** — message counts, maintenance status
- **Messages** — contact form submissions (stored in D1)
- **Content** — edit homepage headline, contact details
- **Settings** — toggle maintenance mode instantly (no rebuild)

## Cloudflare bindings (required)

In Pages project **Settings → Functions**:

| Binding | Type | Name |
|---------|------|------|
| `DB` | D1 | `eco-marina-admin` |
| `SETTINGS` | KV | `ECO_MARINA_SETTINGS` |

Also set environment variable: `ADMIN_PASSWORD`

## Build settings

| Setting | Value |
|---------|--------|
| Build command | `npm run build` |
| Output directory | `out` |
| Node version | `20` |

Maintenance mode is controlled at **runtime** via KV (admin toggle), not at build time.

## Database

```bash
npx wrangler d1 execute eco-marina-admin --remote --file=schema.sql
```
