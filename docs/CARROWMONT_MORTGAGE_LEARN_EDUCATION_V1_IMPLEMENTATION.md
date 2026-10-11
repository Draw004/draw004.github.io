# CARROWMONT Mortgage Learn & Education Integration V1

**Status:** implementation release prepared from Source Snapshot 44  
**Date:** 11 October 2026  
**Baseline snapshot generated:** 2026-10-11T10:10:34Z

## Baseline repositories

- `draw004.github.io`: `5c8c9ae3a8afbf6c6bb1d4ad3de6888e6f8a2ff8`
- `mortgage-payoff-calculator`: `5b62be00cbe76d78003c94567006cc0c3590c637`
- `carrowmont-qa`: `dba41980f57dcad9dcbf409b4ce092d22dbd004c`

## Product contract

This release turns Mortgage/Home Loan education and the calculator into a two-way journey rather than separate site areas.

`Learn -> understand -> Tool -> calculate -> contextual Learn -> Tool`

Required behavior:

1. The Mortgage/Home Loan calculator exposes a visible educational bridge before modelling.
2. Results expose a contextual Learn link based on the scenario being explored.
3. Every new mortgage Learn article links to the calculator near the top and through the shared generated bottom CTA.
4. The tool FAQ shows one country-aware question instead of showing India- and UK-specific questions to every visitor.
5. Learn hub contains a dedicated Home Loans & Mortgages cluster.
6. Existing Rent vs Buy content provides a contextual bridge to the mortgage tool and flagship mortgage guide.
7. No calculator formula or report-math change is part of this release.

## New universal Learn guides

- `one-extra-mortgage-payment-a-year.html`
- `monthly-extra-vs-annual-lump-sum-mortgage.html`
- `biweekly-fortnightly-mortgage-payments.html`
- `extra-mortgage-payments-early-vs-late.html`
- `pay-off-mortgage-five-years-early.html`

The worked examples are produced from the same fixed-rate principal-and-interest logic as the Mortgage calculator. They are explicitly illustrative and do not turn one example into a universal promise.

## Country behavior

The calculation concepts are universal. Visible terminology adapts where useful (for example Home Loan / EMI / prepayment in India, Mortgage / extra principal in the US, Mortgage Overpayment in the UK, and Home Loan Extra Repayments in Australia/New Zealand). Country-specific lender rules remain caveats and are not silently built into universal maths.

## Release scope

Expected generated release PR count: **3**

1. `draw004.github.io`
2. `mortgage-payoff-calculator`
3. `carrowmont-qa`

No `.github/workflows/*` file is changed. `Workflows: Read and write` is **not required**.

## Publisher rehearsal FIX1

The first staged browser rehearsal exposed three integration-test mismatches before any release PR was created: the Learn hub smoke contract still expected eight categories, the Rent-vs-Buy contextual mortgage bridge reused the reserved direct-answer class, and the five new guides included an extra sibling before the shared article content wrapper, preventing the standard generated bottom CTA from mounting. FIX1 aligns the hub smoke contract with the nine-category layout, preserves exactly one direct-answer block, and restores the canonical single-content-wrapper Learn structure. No calculator formula or report-math change is involved.
