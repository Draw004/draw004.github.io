# Carrowmont Car Affordability handoff and localized starter values

## Purpose
Close two usability gaps found during Ask Carrowmont testing without changing any financial formula.

1. A resolved Ask Carrowmont car-affordability scenario must carry its exact deterministic engine inputs into the full Car Affordability tool.
2. Opening the full tool directly must not reuse India-scale raw money defaults in every currency.

## Handoff contract
- Ask Carrowmont writes the exact `car-affordability` engine input to same-origin `sessionStorage` only when the user chooses **Open the full Car Affordability tool**.
- The handoff includes the active country/currency and expires after 15 minutes.
- The receiving tool validates a whitelist of numeric fields, consumes the payload once, immediately removes it from `sessionStorage`, and recalculates with the existing deterministic engines.
- No financial values are placed in the URL, query string or fragment.
- No account, network request or persistent local-storage record is introduced.

## Direct-tool starter values
When there is no Ask handoff, the tool loads round currency-aware starter examples from the same style of reviewed magnitude table already used by Carrowmont content localization. These are explicitly illustrations, not live FX conversion, market-price estimates, lender assumptions or country-specific affordability rules.

For example, NZD uses a monthly illustration unit of 500, producing a starter vehicle price of NZ$30,000 rather than carrying the old raw 1,200,000 value into New Zealand. If the user edits any money field, later country/currency changes do not silently convert those user-entered values.

## Boundaries
- Car-affordability core formulas are unchanged.
- Loan, Borrowing Health and Emergency Fund engines remain authoritative.
- No public URL is added.
- Tools Hub and search inventory counts are unchanged.
- Batch 5 Money Priorities remains intact; this repair is merged on top of the post-Batch-5 all-green baseline.
