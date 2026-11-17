# Carrowmont FRE Batch 10B — Account-Aware Ask Carrowmont

Status: Implemented for Publisher validation.

## Purpose

Batch 10B lets signed-in Ask Carrowmont journeys reuse relevant information the user already chose to keep in My Carrowmont. The goal is to reduce repeated questions without weakening the guest-first experience, the Trust Contract or the explicit Save / Update boundary.

Batch 10B does not turn Ask into an unrestricted chatbot and does not create a second financial-calculation layer. The existing controlled Ask journeys and deterministic engines remain authoritative.

## Product contract

1. Guests continue to use Ask Carrowmont without an account and without loading account data.
2. When a signed-in user starts a supported Ask journey, Carrowmont may read only the saved profile facts and saved-plan details relevant to that journey.
3. Current saved values may be reused automatically so Ask can skip questions already answered by My Carrowmont.
4. Older saved values are not silently treated as current; Ask pre-fills them and requires the user to confirm or replace them before calculation.
5. The user can change a saved value for one Ask scenario or ignore all saved context for that question.
6. Temporary Ask overrides remain session-only unless the user explicitly chooses the existing Save / Update path.
7. Reading or using saved context never writes to My Carrowmont.
8. Every result remains traceable to deterministic engines and the Trust Check identifies whether each important value came from My Carrowmont, this Ask session or a temporary what-if override.

## Read-only account context

`/assets/account/carrowmont-ask-context.js` is the dedicated read-only adapter between Ask Carrowmont and the existing account model.

It reads through the established `CarrowmontAccount` APIs:

- account identity;
- the account-backed My Carrowmont profile; and
- saved scenarios where a journey-specific value is not represented in the profile.

It does not call `saveCloudProfile`, `saveScenario`, `deleteCloudProfile` or `deleteScenario`.

No new Supabase table, column, Row Level Security policy, OAuth scope or account-ownership rule is introduced.

## Relevant saved facts

Batch 10B reuses only facts that match the controlled Ask journey. Examples include:

- monthly take-home income, essential expenses and flexible spending;
- emergency savings and emergency-fund target;
- debt balance, monthly debt payments and highest APR;
- mortgage balance and mortgage rate;
- retirement savings and monthly contribution;
- goal amount, current goal savings, years away and contribution; and
- the user's saved long-term return assumption.

For the mortgage-prepay-versus-invest journey, the remaining loan term may also be read from the latest saved Mortgage Payoff scenario when it is compatible with the active currency.

Decision-specific values such as a new vehicle price, a new extra mortgage amount or a new monthly surplus are not silently taken from an old scenario merely because a similar journey was saved previously.

## Freshness and confirmation

Batch 10B uses freshness as a confirmation rule, not as a claim that a saved value is wrong.

- Current household, debt and resilience facts are considered reusable for up to **180 days** from their saved update timestamp.
- Long-term assumptions, retirement facts and goal facts are considered reusable for up to **365 days**.
- Older values remain visible as saved context but are not inserted into the calculation until the user confirms or replaces them in the current Ask session.

The Trust Check reports when older saved information was confirmed in the current session.

## Currency boundary

Carrowmont does not perform automatic FX conversion when Ask reuses My Carrowmont values.

If the saved My Carrowmont profile uses a different currency from the active Ask session, saved financial context is not reused. Ask explains the mismatch and asks for the needed values in the currently selected currency.

This preserves the existing Carrowmont localization and no-silent-conversion contract.

## Temporary what-if override

The saved-context panel shows which saved values are relevant to the current Ask journey. A user may choose **Change for this question** on an individual current saved value.

That value is then presented as an editable Ask input. If the user changes it:

- the calculation uses the temporary value;
- the Trust Check labels it as a temporary what-if override; and
- the original My Carrowmont value remains unchanged.

The user may also choose **Ignore saved details for this question**, which removes My Carrowmont context from that Ask journey without deleting or modifying account data.

## Save boundary

Batch 10B does not create a new write path.

The existing explicit `Save this plan to My Carrowmont` action remains the only Ask-to-account persistence path. Until the user chooses that action, saved facts are read-only and temporary overrides remain outside the saved profile.

## Trust and explainability

The existing Batch 9 Trust Check is extended so values used by Ask are labelled as:

- My Carrowmont saved value;
- My Carrowmont value confirmed in this Ask session;
- temporary what-if override for this Ask only;
- value entered in this Ask session; or
- an existing explicit illustrative assumption when the user selected `I don't know`.

The freshness row identifies the dates associated with reused saved values and notes older values that were explicitly reconfirmed.

## Guest-first and network boundary

Signed-out users continue to see the same controlled Ask journeys. The account-context adapter checks for a persisted Supabase authentication session before attempting account access, so guest Ask does not load the Supabase SDK merely to determine that no account context is available.

## Architecture impact

Batch 10B changes only the Ask/account-context presentation and read layer.

It does not change:

- any deterministic calculation engine;
- Ask intent classification or the six controlled journeys;
- calculator formulas;
- the My Carrowmont database schema;
- Google OAuth or email authentication;
- saved-plan ownership;
- the Batch 10 country-reference updater;
- public URLs, sitemap entries or search inventory; or
- the explicit Save / Update contract.

## Exit gate

Batch 10B is eligible for closeout only when:

1. signed-out Ask remains guest-first and account-network-lazy;
2. current saved facts reduce repeated questions;
3. older saved facts require confirmation before calculation;
4. temporary overrides and Ignore Saved Context do not write account data;
5. currency mismatch blocks automatic saved-amount reuse;
6. saved scenario context is used only where the controlled journey defines a compatible mapping;
7. Trust Check source/freshness labels remain accurate;
8. existing Ask journeys and deterministic outputs continue to pass regression QA;
9. privacy/terms copy reflects the signed-in Ask read boundary;
10. source-contract and responsive browser QA are green;
11. Publisher and Multi-Repo Guard are green; and
12. a new authoritative all-green Source Snapshot is generated.
