# Carrowmont FRE Batch 13A - Connected Financial Data Readiness

**Release type:** provider-independent sandbox/consent foundation only  
**Baseline:** post-Batch-12 SEO/indexing all-green snapshot `carrowmont-source-snapshot - 2026-11-22T204049.510.zip`  
**Main baseline:** `655eff0e351af3ebde2cf0105d05f7a152bf8135`  
**QA baseline:** `3cf2f53cb269d21666d6ed4ca2699fe34e039c8f`

## Purpose

Batch 13A starts the original roadmap's optional connected-financial-data stage without connecting a real financial institution. It proves Carrowmont's privacy, consent, provenance, freshness, review and disconnect architecture first.

This release deliberately does **not** select Plaid, an Indian Account Aggregator, an open-banking provider or any other production vendor. It does not claim that live account connections are available.

## Product rules

1. **Guest-first remains unchanged.** All calculators and planning journeys continue to work without an account or connected data.
2. **Read-only architecture.** Connected data can never initiate a payment, transfer money, trade, or change an external account.
3. **No bank credentials.** Carrowmont's connected-data state must never contain a password, PIN, access token, refresh token, secret or OAuth code.
4. **Minimum scope.** A user chooses each sandbox scope separately. The first foundation supports only a balance summary and a monthly cash-flow summary. No raw transaction feed is retained.
5. **Explicit review before save.** Connected values are staged first. A saved My Carrowmont fact changes only after the user selects `Use this value` for that specific item.
6. **No silent overwrite.** A connected value never replaces a manual or saved value automatically.
7. **Source and freshness are visible.** Every review item names the source and observation/refreshed time.
8. **Disconnect deletes the connection copy.** Sandbox connection state is session-only. Disconnect removes it. A value the user explicitly chose to save remains an ordinary My Carrowmont fact with review provenance until the user edits/removes it.
9. **Manual planning stays first-class.** The dashboard must not become dependent on a connected source.
10. **Ask does not receive connected raw data.** Batch 13A does not expose sandbox snapshots or transaction-level data to Ask Carrowmont.
11. **No production live provider.** The public feature flag is OFF. The sandbox can be exercised only through the explicit preview query used by QA/development: `?connected-data-preview=sandbox`.
12. **No new public indexed URL.** The foundation lives inside the existing `my-carrowmont.html` account experience.

## Provider-neutral model

`assets/connected/connected-data-core.js` owns the neutral contract:

- allowed scopes;
- consent normalization and expiry;
- credential-field rejection;
- normalized snapshots;
- current/stale/expired/disconnected freshness states;
- review-item generation;
- explicit application into the existing Dashboard Store.

The core knows nothing about a production vendor.

`assets/connected/connected-data-sandbox.js` is the only adapter in 13A. It produces deterministic mock balances and monthly cash-flow summaries. Unknown/raw fields are discarded by normalization.

## Sandbox UX

When explicitly opened in sandbox preview while signed in, My Carrowmont shows:

1. **Optional connected data / Sandbox only** explanation.
2. Granular scope selection.
3. A consent review showing source, requested scope, purpose, retention and credential boundary.
4. A `Connect sandbox` action only after the user acknowledges the mock-data boundary.
5. Connection provenance, refresh time and consent expiry.
6. Side-by-side **Current My Carrowmont** vs **Sandbox value** cards.
7. `Use this value` per item.
8. `Refresh sandbox`.
9. `Disconnect & delete sandbox copy`.

The production configuration remains `enabled:false`, `sandboxOnly:true`, with an empty live-provider list.

## Storage boundary

- Sandbox consent/snapshot state: `sessionStorage` only, key `carrowmont_connected_data_sandbox_session_v1`.
- Cloud profile: unchanged existing My Carrowmont schema.
- Explicitly reviewed values: saved through the existing Dashboard Store / cloud-profile mechanism with origin `connected-reviewed` and a source note.
- Raw transactions: not stored by the Batch 13A model.
- Credentials/tokens: prohibited by the connected-data core contract.

## Regulatory boundary

Batch 13A is intentionally vendor- and regulator-neutral. A production connection pilot is a separate Batch 13B decision requiring provider/regulatory review for the chosen jurisdiction. In particular, this release does not assert that Carrowmont itself is an Account Aggregator, Financial Information User, payment provider, investment adviser or open-banking provider.

## What Batch 13A does not do

- no real bank/account connection;
- no credential collection;
- no external provider SDK/API;
- no Supabase connected-account table;
- no background sync;
- no transaction categorization;
- no payment initiation;
- no investment trading;
- no new indexed URL;
- no new calculator formula;
- no change to Search/Ask ranking;
- no automatic use of connected values.

## Next gate: Batch 13B

Do not start a live pilot automatically after 13A. First choose a country/provider based on regulation, provider coverage, cost, security model, deletion/consent controls and actual user demand. A real provider release must update privacy/legal disclosures before collecting any additional real financial information.

### Currency alignment guard

The sandbox follows the saved My Carrowmont profile currency before device/browser locale. Connected values with a different currency are shown as a mismatch and cannot be applied; Batch 13A performs no implicit FX conversion.
