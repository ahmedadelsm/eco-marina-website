# Eco Marina Website

Official website for [eco-marina.com](https://eco-marina.com) — environmental consultancy by Adel Regal.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build (static export for Cloudflare Pages)

```bash
npm run build
```

Output is written to `out/`.

## Deploy to Cloudflare Pages

1. Push this repo to GitHub
2. In [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. Select the GitHub repository
4. Build settings:
   - **Framework preset:** Next.js (Static HTML Export) or None
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Node.js version:** 20
5. Add custom domain **eco-marina.com** under **Custom domains**
6. Update DNS nameservers or add CNAME to Cloudflare as instructed

## Deploy via Wrangler (optional)

```bash
npx wrangler pages deploy out --project-name eco-marina
```

## Contact

- Email: info@eco-marina.com
- Phone: +31 684 942 020
- Office: Utrecht, Netherlands
