# CARROWMONT NEWSLETTER1 — Money in Real Life implementation

Baseline: Source Snapshot generated 2026-10-30T16:39:37Z (draw004.github.io b9840b3501dc4f0a6cc4a52c1ecce1d776b9cf6d).

## Scope
- Adds the optional **Carrowmont Money in Real Life** weekly newsletter signup to the homepage and the end of all 90 Learn articles plus the three current Research studies.
- Uses the owner-created Kit inline form UID `6ba4a35ab0` and source `https://carrowmont.kit.com/6ba4a35ab0/index.js`.
- Loads the third-party Kit embed only when the newsletter module approaches the viewport.
- Preserves guest-first Carrowmont: all calculators, Learn and Research content remain usable without an account or newsletter subscription.
- Changes homepage trust wording from **No sign-up required** to **No account required** so it stays truthful after an optional newsletter and future optional accounts.
- Adds a noindex Carrowmont confirmation page at `/newsletter-confirmed.html` for an optional post-confirm redirect.
- Updates Privacy to describe Kit, double opt-in, unsubscribe behavior and the boundary between newsletter data and calculator inputs/results.

## Consent and privacy
- Newsletter signup is optional.
- Kit confirmation email remains enabled and auto-confirm remains off.
- Subscriber email data is handled through Kit; calculator inputs and calculated financial results are not sent to Kit as part of newsletter signup.
- The signup note links to Carrowmont Privacy and states that subscribers can unsubscribe at any time.

## Placement and UX
- Homepage: newsletter module appears before Follow Carrowmont.
- Learn/Research: compact module appears after the article/study content and before the footer.
- Desktop and mobile use the existing Carrowmont shell, typography and responsive spacing.
- NEWSLETTER1B replaces the small bullet-style promise row with a hero-style three-item value row using teal outline SVG icons: **Key developments**, **Real-life impact**, and **Practical next steps**.
- NEWSLETTER1C aligns the post-confirmation page to the same three-promise model and removes the legacy negative tagline so the subscriber journey stays consistent.
- Kit branding is not hidden or removed.

## Cache / rollout
- `site.js` is cache-busted to `20261030-newsletter1b` on the homepage, all 90 Learn articles and all three Research studies for immediate deterministic rollout.

## Safety boundaries
- No calculator formulas, report engines, shared-plan logic, country/currency math, analytics provider, social URLs or GitHub workflow files change.
- No subscriber list is exposed in source.
- No automatic email sends are created by this release.
