# Carrowmont FRE Batch 7B — Acceptance Ledger

| Requirement | Result |
|---|---|
| Optional login is live only on My Carrowmont | PASS |
| Guest calculators, Ask and My Carrowmont remain usable without login | PASS |
| Passwordless email magic-link authentication is active | PASS |
| Supabase Project URL and publishable key only are present in frontend config | PASS |
| No service-role, secret API key, database password or SMTP key is shipped | PASS |
| Signed-out visitors do not contact Supabase until they request a sign-in link | PASS |
| Existing guest financial values are never uploaded automatically | PASS |
| Browser-to-cloud save requires explicit user action | PASS |
| Cloud-to-browser load requires explicit user action | PASS |
| Owner-only RLS remains the database access boundary | PASS |
| Sign out, export and delete-saved-cloud-profile controls remain available | PASS |
| Homepage trust copy says “Account optional” | PASS |
| Privacy policy documents Supabase account storage and Brevo authentication email delivery | PASS |
| Tools Hub stays 23 and public search inventory stays 138 | PASS |
| No financial calculation formula changes | PASS |
| About page explains the guest-first, account-optional model and links to My Carrowmont | PASS |
| Terms document optional account/saved-profile use and link to Privacy | PASS |
| Privacy removes stale future-account wording and identifies Brevo auth-email processing | PASS |
