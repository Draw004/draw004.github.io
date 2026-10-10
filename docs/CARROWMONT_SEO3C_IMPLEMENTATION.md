# Carrowmont SEO3C — US Debt & Interest Cost Calculator Implementation

**Implementation baseline:** Source Snapshot generated 10 October 2026 at 05:34:08 UTC, after approval of `CARROWMONT_SEO3C_US_DEBT_INTEREST_COST_CALCULATOR_SPEC_FINAL.md`.

## Scope

SEO3C adds a public, free, no-login macro scenario tool at `/us-debt-interest-cost-calculator.html`. No existing SIP, Goal, Inflation, Retirement, Financial Independence, Budget, SEO3A or SEO3B calculation engine is modified.

The tool implements the approved two-level UX:

- **Simple Mode:** dated U.S. Treasury Debt Held by the Public reference, a user-selected refinancing/new-borrowing rate, and projection period.
- **Advanced Assumptions:** debt basis/custom debt, existing average interest rate, annual primary deficit before interest, and starting-debt refinancing window.

## Release-time reference data

The bundled `data/us-debt-reference.json` uses the latest U.S. Treasury FiscalData Debt to the Penny record available during implementation:

- Record date: **2026-10-08**
- Debt Held by the Public: **$32,454,086,117,711.32**
- Total Public Debt Outstanding: **$40,305,316,210,829.72**
- Source: `https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/`
- API query: latest record sorted by `record_date` descending.

The reference is bundled into the site. The browser does not call the Treasury API.

## Other published assumptions

- Existing average interest-rate reference: **3.4%**, from CBO's February 2026 Budget and Economic Outlook statement that the average interest rate on debt held by the public is estimated at 3.4% in 2026.
- Default new/refinancing rate: **4.0%**, an explicit illustrative scenario input, not a forecast.
- Default primary deficit before interest: **$1.0 trillion**, an explicit illustrative scenario input.
- Default refinancing window: **5 years**, an even-rollover simplification.
- Default projection period: **10 years**.

## Deterministic calculation engine

`us-debt-interest-cost-calculator-core.js` has no DOM dependency. It implements the exact timing convention in the approved specification:

1. Refinance one fixed tranche of the original starting debt.
2. Calculate annual interest on legacy debt at the existing rate and refinanced/new debt at the selected rate.
3. Add the primary deficit and modeled interest to debt at year-end.
4. Year-end additions begin accruing interest from the next modeled year.

The same result object feeds page outputs, chart, tables, Copy Summary, CSV and PDF.

## Weekly Treasury maintenance

`.github/workflows/update-us-debt-reference.yml` runs weekly and also supports `workflow_dispatch`.

The workflow:

1. fetches the latest official Debt to the Penny record;
2. validates record date, field labels and positive finite values;
3. confirms Total Public Debt Outstanding is not below Debt Held by the Public;
4. makes no change for an older/equal record;
5. flags changes above the 5% anomaly-review threshold;
6. changes only `data/us-debt-reference.json`;
7. creates a protected data-only PR rather than writing to `main` directly;
8. leaves the last verified production reference untouched if fetch/validation fails.

## Exports and report

The anonymous user can use Copy Summary, CSV and a four-page PDF report. The PDF uses the established Carrowmont report rendering system and includes:

1. Scenario Snapshot
2. Rate Sensitivity
3. Debt Path, Methodology & Limitations
4. Continue Planning with Carrowmont

## Discoverability

The canonical route is added once to `sitemap.xml`. `learn.html` and selected rate/inflation/gold guides link contextually to SEO3C. Existing IndexNow infrastructure is reused after deployment.

## Privacy and security

The browser calculation is local. It loads only the bundled same-origin debt reference JSON. It contains no API key, backend account dependency or AI calculation layer. Automated QA continues to isolate Cloudflare RUM ingestion.

## Pre-release validation completed

Before release packaging, the implementation was validated against the approved post-spec baseline:

- central source contract: **257 PASS / 0 FAIL**;
- changed JavaScript syntax checks: PASS;
- weekly updater local fixtures: no-change, newer-valid, invalid/failure-safe and anomaly-flag scenarios all PASS;
- local Chromium interaction checks: reference loading, Simple Mode, calculation updates, validation, chart geometry, CSV, PDF and 360/390 px responsive behavior PASS;
- generated PDF: **4 A4 pages**, raster-rendered and visually inspected page by page;
- default official debt provenance remains **Debt Held by the Public** until the user explicitly edits the debt amount or selects another basis;
- report chart consumes the live styled SVG before its own export clone so PDF callouts preserve the canonical Carrowmont chart styling.

Publisher staged Chrome/PDF QA remains the final pre-PR release gate.
