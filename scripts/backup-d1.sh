#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
STAMP="$(date +%Y%m%d-%H%M%S)"
OUT_DIR="$ROOT/backups"
OUT_FILE="$OUT_DIR/eco-marina-admin-${STAMP}.sql"

mkdir -p "$OUT_DIR"

if [ -z "${CLOUDFLARE_ACCOUNT_ID:-}" ]; then
  export CLOUDFLARE_ACCOUNT_ID="bace0682525d63a4e564f456e50c157c"
fi

cd "$ROOT"
npx wrangler d1 export eco-marina-admin --remote --output="$OUT_FILE"

echo "Backup saved to $OUT_FILE"
