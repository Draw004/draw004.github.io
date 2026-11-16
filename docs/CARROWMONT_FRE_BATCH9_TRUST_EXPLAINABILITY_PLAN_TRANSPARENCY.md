# Carrowmont FRE Batch 9 - Trust, Explainability & Plan Transparency

## Purpose
Batch 9 makes important Carrowmont results verifiable without forcing technical detail into the primary experience. The release formalizes one Carrowmont Trust Contract across public planning tools, My Carrowmont and Ask Carrowmont while preserving the guest-first, deterministic and explicit-save architecture established in the completed foundation.

## Carrowmont Trust Contract
For every important planning insight, a user can progressively disclose answers to these questions:

1. **Why am I seeing this?** - the rule, saved-plan status or deterministic calculation path behind the insight.
2. **What numbers were used?** - the relevant entered or saved values used to produce the result.
3. **When were they last updated?** - session-time context for a live what-if and saved/review dates for account-backed information.
4. **Which values did I enter?** - user-entered values stay distinguishable from system explanation and defaults.
5. **Which values are assumptions?** - return, inflation, growth, step-up, withdrawal-rate and similar forecast inputs are identified as assumptions where they matter.
6. **What could change the result?** - changing inputs, assumptions, targets, dates or real-world outcomes can alter the result.

The disclosure stays collapsed by default. The answer remains the primary experience; verification detail appears only when the user asks for it.

## Tools
The supported planning-tool families load a shared Trust Check component. It reads the values currently entered on the page, identifies likely forecast-style assumptions, records that the values are from the current page/session and explains the save boundary. It does not introduce a second calculator and does not change any formula.

Shared-plan tools load the Trust Check through the existing replicated `shared-plan-bridge.js`. Important standalone tools that do not use that bridge load the same shared component directly. This keeps one explanation contract instead of page-specific disclaimers.

## My Carrowmont
My Carrowmont adds a collapsed Trust Contract next to the already-established Current details / Saved plan / What-if calculation / Progress history model.

Saved details now display both source and last-updated context. Each plan-progress card has its own collapsed Trust Check showing:
- why the status is being shown;
- representative saved inputs/numbers used;
- forecast-style assumptions when present;
- saved-plan freshness;
- what could change the result;
- the explicit-save boundary.

The existing **Export account data**, **Delete saved profile** and **Sign out** controls remain unchanged. Unsaved calculator experiments do not become account data.

## Ask Carrowmont
Ask keeps the answer first. Its existing methodology disclosure becomes a Carrowmont Trust Check and now shows the rationale, values entered/numbers used, calculation engines, assumptions, calculation freshness, what could change the answer and the save boundary.

Ask does not become account-mutating in Batch 9. A result changes My Carrowmont only after an explicit save/update action.

## Google sign-in trust polish
The My Carrowmont **Continue with Google** button replaces the plain monochrome letter `G` with a multicolor Google `G` mark. Button wording, OAuth behavior, provider configuration and account logic remain unchanged.

The production Google OAuth setup already uses the Carrowmont support identity `contact@carrowmont.com`, verified/published Carrowmont branding and authentication-only scopes.

## Protected architecture
Batch 9 does **not** change:
- calculator formulas or deterministic calculation engines;
- saved-plan mathematics or progress formulas;
- Supabase schema or row ownership;
- OAuth Client ID/Secret or provider configuration;
- public URLs, sitemap inventory or indexing rules;
- country/currency localization rules;
- the explicit Save/Update contract.

## Privacy boundary
Calculating is exploration. Saving or updating is commitment. Only plans the user deliberately saves or updates become part of My Carrowmont. Trust disclosures may explain account-backed data, but they do not silently copy guest/session values into the account.

## Exit gate
Batch 9 is complete only when no important Carrowmont insight depends on an opaque "AI said so" explanation and the important account/result context can be understood in plain language, with the underlying values, assumptions, freshness and save boundary available on demand.
