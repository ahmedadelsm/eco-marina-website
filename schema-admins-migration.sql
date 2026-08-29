-- Run once on existing databases:
--   CLOUDFLARE_ACCOUNT_ID=... npx wrangler d1 execute eco-marina-admin --remote --file=schema-admins-migration.sql

ALTER TABLE admins ADD COLUMN role TEXT NOT NULL DEFAULT 'editor';

UPDATE admins SET role = 'super_admin' WHERE id = (SELECT MIN(id) FROM admins);
