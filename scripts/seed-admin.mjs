#!/usr/bin/env node
/**
 * Generate admin seed SQL. Usage:
 *   node scripts/seed-admin.mjs admin@eco-marina.com "YourPassword" "Adel Regal"
 *
 * Output is SQL only — redirect to seed.sql locally, never commit passwords.
 */
import { webcrypto } from "node:crypto";

const ITERATIONS = 100_000;

async function hashPassword(password) {
  const salt = webcrypto.getRandomValues(new Uint8Array(16));
  const key = await webcrypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const hash = await webcrypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: ITERATIONS, hash: "SHA-256" },
    key,
    256,
  );
  const saltB64 = Buffer.from(salt).toString("base64");
  const hashB64 = Buffer.from(new Uint8Array(hash)).toString("base64");
  return `${saltB64}:${hashB64}`;
}

const email = process.argv[2];
const password = process.argv[3];
const name = process.argv[4] || "Site Admin";

if (!email || !password) {
  console.error("Usage: node scripts/seed-admin.mjs <email> <password> [name]");
  process.exit(1);
}

if (password.length < 8) {
  console.error("Password must be at least 8 characters.");
  process.exit(1);
}

const hash = await hashPassword(password);
const safeEmail = email.toLowerCase().replace(/'/g, "''");
const sql = `INSERT OR REPLACE INTO admins (email, password_hash, name, active) VALUES ('${safeEmail}', '${hash}', '${name.replace(/'/g, "''")}', 1);`;

console.log(`-- Admin seed for ${email.toLowerCase()}`);
console.log(sql);
