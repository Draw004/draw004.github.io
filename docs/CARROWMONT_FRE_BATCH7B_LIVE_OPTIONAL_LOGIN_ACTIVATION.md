# Batch 7B — Live Optional Login & Saved Profile Activation

Batch 7B activates the configuration-gated Batch 7A account foundation after the production backend was provisioned and tested.

## Production boundaries
- Supabase project: South Asia (Mumbai).
- Auth: passwordless email magic link.
- Auth redirect: `https://carrowmont.com/my-carrowmont.html`.
- Email delivery: Brevo custom SMTP using the authenticated `carrowmont.com` domain and `no-reply@carrowmont.com` sender.
- Browser config includes only the public Project URL and publishable key.
- Database/SMTP/service-role secrets never ship to the site.
- Guest mode remains available without login.
- Sign-in never uploads guest financial values automatically.
- Signed-out users do not load the Supabase SDK until they request a login link.

## Data controls
Signed-in users explicitly choose browser-to-cloud save or cloud-to-browser load. They can export saved account data, delete the saved cloud profile/scenarios, and sign out. RLS restricts rows to `auth.uid()`.

## Trust copy
Homepage changes from **No account required** to **Account optional**. Calculator and Ask access remain guest-first.


## Trust and legal closeout
- Homepage, My Carrowmont, Privacy, About and Terms now reflect the live optional-account model.
- Ask Carrowmont intentionally retains “No account required” because Ask itself remains usable without sign-in.
- Privacy identifies Supabase for authentication/saved profiles and Brevo for authentication-email delivery, and removes stale “future optional account” wording.
