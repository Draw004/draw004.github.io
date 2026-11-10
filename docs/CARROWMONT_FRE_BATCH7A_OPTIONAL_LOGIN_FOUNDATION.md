# Batch 7A — Optional Login & Saved Financial Profile Foundation

Batch 7A prepares the production account layer without exposing a non-working login before a real Supabase Free project is configured.

## Included

- Passwordless email magic-link authentication adapter using Supabase Auth.
- Cloud profile adapter for My Carrowmont.
- Separate saved-scenario API boundary for future Ask/plan persistence.
- Explicit browser-to-cloud migration controls; no automatic upload.
- Explicit cloud-to-browser load; no automatic overwrite.
- Export, delete-saved-profile and sign-out controls.
- Postgres schema and RLS policies that restrict every row to its authenticated owner.
- Configuration gate: `enabled: false` until the real Carrowmont Supabase project URL and publishable key are supplied.

## Preserved

- Guest My Carrowmont remains fully usable without login.
- Session-only remains the default guest behavior.
- Existing deterministic engines remain authoritative.
- Tools Hub stays at 23 tools.
- No new public URL or search-index entry is created in 7A.
- No service-role key, password database or Carrowmont-managed credential store is introduced.

## Activation gate

Batch 7 is not considered publicly complete until the Supabase Free project is created, the RLS schema is applied, the public project URL/publishable key are configured, browser QA is green, and a fresh authoritative Source Snapshot is taken.
