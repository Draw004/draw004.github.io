# Batch 7 Supabase setup — no paid plan required for development

This file is the activation checklist for the optional My Carrowmont account layer.

1. Create a Supabase Free project owned by the Carrowmont account.
2. In the Supabase SQL editor, run `docs/CARROWMONT_FRE_BATCH7_SUPABASE_SCHEMA.sql`.
3. In Authentication > URL Configuration, add `https://carrowmont.com/my-carrowmont.html` as an allowed redirect URL.
4. Keep email magic-link authentication enabled. Carrowmont does not manage or store passwords.
5. Copy the project URL and the public/publishable key only. Never copy a `service_role` key into the website.
6. Put those two public values into `/assets/account/supabase-config.js` and set `enabled: true` in a separate activation release.
7. Run Publisher, Automated QA, Multi-Repo Guard and take a fresh Source Snapshot before exposing account saving publicly.

## Privacy boundary

- Guest/local My Carrowmont continues to work without login.
- No guest financial values are uploaded merely because the user signs in.
- If the user starts sign-in from a populated guest dashboard, Carrowmont may temporarily stage that guest profile in this browser only so an email-link return can offer migration. The staged copy is cleared after save/sign-out/cancellation.
- If both browser and cloud profiles exist, Carrowmont never auto-merges or silently overwrites them. The user chooses which direction to copy.
- Cloud rows are isolated with Postgres Row Level Security using `auth.uid()`.
- The browser contains only the public project URL and publishable key. A Supabase service-role secret must never be shipped to the frontend.
