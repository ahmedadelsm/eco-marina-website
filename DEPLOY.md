# Cloudflare Pages Deployment

## Fix a failed deployment

In **Cloudflare Dashboard → Workers & Pages → your project → Settings → Builds**:

| Setting | Correct value |
|---------|----------------|
| **Framework preset** | `None` (not "Next.js") |
| **Build command** | `npm run build:cloudflare` |
| **Build output directory** | `out` |
| **Root directory** | `/` (leave empty) |
| **Environment variable** | `NODE_VERSION` = `20` |

Then **Retry deployment**.

### Why deployments fail

1. **Wrong framework preset** — Cloudflare's "Next.js" preset expects SSR, not static export
2. **Wrong output folder** — must be `out`, not `.next`
3. **Turbopack on CI** — we use `next build --webpack` for compatibility
4. **Node version** — requires Node 20 (see `.node-version`)

---

## Maintenance mode

**Currently enabled by default** via `npm run build:cloudflare`.

Visitors see a "Site update in progress" page with contact details. HTTP status **503** (temporarily unavailable).

### Go live (disable maintenance)

Change Cloudflare build command to:

```bash
npm run build:production
```

Or locally:

```bash
npm run build:production
```

---

## Custom domain (eco-marina.com)

Custom domains are registered on the Pages project. DNS must point to Pages:

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| **CNAME** | `@` (eco-marina.com) | `eco-marina.pages.dev` | Proxied (orange cloud) |
| **CNAME** | `www` | `eco-marina.pages.dev` | Proxied (orange cloud) |

**Remove** any existing **A** records on `@` — they currently serve a placeholder.

Dashboard: [DNS records](https://dash.cloudflare.com/bace0682525d63a4e564f456e50c157c/eco-marina.com/dns/records) · [Pages domains](https://dash.cloudflare.com/bace0682525d63a4e564f456e50c157c/pages/view/eco-marina/domains)

Domains become **Active** within 1–5 minutes after DNS is correct. SSL is automatic.

## Manual deploy (Wrangler)

```bash
npm run build:production
npx wrangler pages deploy out --project-name eco-marina
```
