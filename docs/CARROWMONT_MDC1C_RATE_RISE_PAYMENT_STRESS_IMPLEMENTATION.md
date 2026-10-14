# Carrowmont MDC1C — Mortgage Rate Rise & Payment Stress Test — Implementation Record

**Production implementation date:** 2026-10-14  
**Authoritative source baseline:** Source Snapshot 61

## Snapshot 61 repository heads

- `draw004.github.io`: `3a8eecc1dd50011a801abfab7c1e5e2c90167a8f`
- `mortgage-payoff-calculator`: `35c3ec813e9dc6d1791290ebdd88bafb5dea911d`
- `carrowmont-qa`: `c00ec350207292c2fe149c689c1aee1ae454fab7`

## Production scope

MDC1C adds a fourth live Mortgage Decision Centre decision: **Mortgage Rate Rise Calculator & Payment Stress Test**. The primary acquisition question is “How much will my mortgage payment increase if rates rise?” Household cash-flow context is optional and is deliberately secondary to the payment calculation.

The production route is `/mortgage-payoff-calculator/rate-rise-stress-test.html`. The Learn route is `/mortgage-rate-rise-payment-stress.html`. The Decision Centre now contains exactly four Live cards and no Planned card. The seven-core homepage is unchanged.

## Calculation architecture

The MDC1C engine reuses `mortgage-payoff-calculator/core.js` for payment conventions, scheduled-payment mathematics, repayment frequency and loan simulation. It does not duplicate the mortgage payment formula. The new deterministic layer:

1. models the current scheduled payment, or an explicitly entered lender-payment override;
2. projects the balance to an immediate or future renewal/reset checkpoint;
3. calculates a same-rate reference payment over the remaining term;
4. calculates a stressed payment over that same remaining term;
5. separates the pure rate effect from the change versus what the borrower pays today;
6. produces standard +0.25, +0.50, +1, +2 and +3 percentage-point stress scenarios;
7. normalizes weekly and every-two-weeks repayments to monthly equivalents for household comparison; and
8. optionally solves a mathematical zero-buffer rate from 0% to 50% without describing it as safe, affordable or recommended.

A future reset holds entered household income and non-mortgage expenses constant. MDC1C does not forecast wages, inflation, central-bank decisions, lender rates, credit eligibility or affordability.

## Country-aware presentation

The universal engine is unchanged by localization except where the existing mortgage core already uses a genuine payment convention. UI terminology adapts for India, United States, Canada, United Kingdom, Ireland, Australia and New Zealand, including mortgage/home-loan wording and every-two-weeks/fortnightly labels.

## Shared mortgage profile and privacy

Existing current-loan facts may be reused only after explicit confirmation. Balance, current rate, remaining term, cadence and an optional lender-payment override can be saved locally. Future stressed rate, reset timing, household income, essential outgoings, stress results and zero-buffer outputs are decision-specific and are not persisted in the shared profile. No network request is required by the MDC1C core or UI.

## Reporting and education

The tool generates an exact three-page PDF named `carrowmont-mortgage-rate-rise-stress-report.pdf` from the current deterministic result object. The Learn guide explains percentage points, immediate versus future resets, projected balances, payment-frequency normalization, optional household buffer analysis, the non-normative zero-buffer crossover and the special interpretation required for a typical fully fixed-rate US mortgage.

## QA contract

The central source contract includes independent deterministic fixtures covering immediate and future resets, 0% rates, country convention differences, payment overrides, non-monthly cadences, standard ladder behavior, optional budget states and zero-buffer solving. Browser QA covers canonical/search metadata, the four-live-card Decision Centre, visible pure-rate versus today comparisons, profile confirmation, localization, Copy Summary, exact three-page PDF generation, Tool/Learn bidirectionality and 1280/390/360 horizontal-overflow checks.

Existing payoff, MDC1A and MDC1B engines are not modified.

## Release discipline

Expected generated release PR count: **3**

Merge order:

1. `mortgage-payoff-calculator`
2. `draw004.github.io`
3. `carrowmont-qa` last

No workflow file is changed by this release. GitHub Actions permission `Workflows: Read and write` is **not required** for the release bundle. The temporary staging branch is disposable and must never be merged directly to `main`.
