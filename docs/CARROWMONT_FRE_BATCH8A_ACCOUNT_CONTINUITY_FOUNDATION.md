# FRE Batch 8A — My Carrowmont Account Continuity Foundation

## Purpose
Batch 8A deliberately supersedes the Batch 6 guest/local My Carrowmont dashboard model. Carrowmont remains guest-first for calculators and basic financial help, while My Carrowmont becomes the optional account-backed layer for continuity, saved planning and cross-device access.

## Owner-approved product rule
**Guest = use Carrowmont freely. My Carrowmont = keep, revisit and update meaningful plans across devices.**

## Implemented boundaries
- Calculators, Ask Carrowmont, Learn and Research remain usable without login.
- The My Carrowmont dashboard is hidden until authentication succeeds.
- The pre-login “Remember on this device” control and browser/cloud copy-direction controls are removed.
- Passwordless Supabase/Brevo authentication remains unchanged.
- The sign-in action is presented as `Continue with email`, with a one-time-link explanation.
- A supported explicit save action may stage only the selected planning facts for the sign-in handoff; it does not transmit financial values in the authentication request.
- If an authenticated profile exists, an explicitly selected staged plan is merged into that profile; if no profile exists, it becomes the first saved profile.
- Edits/removals/ignore choices made inside authenticated My Carrowmont save back to the account profile.
- Sign-out clears the My Carrowmont browser working copy and hides account-backed values.
- Export and delete-saved-profile controls remain available.
- Homepage My Carrowmont and newsletter are separate cards directly after the core planning grid. Newsletter signup remains independent of My Carrowmont.
- Ask Carrowmont becomes the first controlled meaningful-plan `Save this plan to My Carrowmont` handoff. Broader tool prompts are reserved for Batch 8B.

## Not in 8A
- No paid Premium tier.
- No balance-transfer/debt-consolidation monitoring.
- No connected bank data.
- No calculator formula changes.
- No full Batch 11 homepage transformation.
- No broad multi-tool progress tracking yet; that follows after this account continuity foundation is proven green.
