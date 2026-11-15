# Carrowmont Google Sign-In — one-time provider setup

Batch 8K adds frontend support for Google OAuth **alongside** the existing passwordless email link. No Google client secret is stored in the repository.

## Google Auth Platform
1. Create or use the Carrowmont Google Cloud project.
2. Configure the OAuth consent screen for the Carrowmont website.
3. Create a **Web application** OAuth client.
4. Add this Authorized redirect URI exactly:
   - `https://oltscckjsbbpfctegosn.supabase.co/auth/v1/callback`
5. Keep the Google Client ID and Client Secret private. **Do not commit the Google Client Secret to this repository.**

## Supabase
1. Open Authentication → Providers → Google.
2. Enable Google and enter the Google Client ID and Client Secret.
3. Under Authentication URL / Redirect configuration, keep the production site URL and allow:
   - `https://carrowmont.com/my-carrowmont.html`
4. If a separate preview/test origin is used, add only the exact approved preview callback; do not use a broad wildcard for production.

## Expected identity behaviour
- Existing passwordless users should continue to use the same My Carrowmont data.
- A verified Google identity using the same email should resolve to the same Supabase user when Supabase identity linking permits it. Test this before announcing Google sign-in publicly.
- A genuinely different Google email is a different account; do not auto-merge financial planning data.
- Google sign-in requests authentication only. Carrowmont does not request Gmail, Drive or other Google data scopes.

## PWA check
Test both normal browser and installed Carrowmont PWA. The OAuth flow may temporarily use the browser, but the resulting same-browser Carrowmont session must be available when My Carrowmont is reopened.
