# CARROWMONT GSEO1B-2 — Core Tool Search-Intent Alignment

**Baseline:** Source Snapshot 53  
**Scope:** Financial Independence/FIRE, Retirement Calculator, Budget & Cash Flow, Inflation/Purchasing Power, sitemap freshness, Central QA  
**Math changes:** None  
**Report changes:** None  
**URL changes:** None  
**Visible localization changes:** None  
**Layout/design changes:** None

## Purpose

GSEO1B-2 continues the controlled search-intent work begun in GSEO1B-1. It improves the search-facing identity of four existing calculators without changing their calculation engines, reports, visible product labels, localized terminology, input structure or navigation behavior.

The user-provided Google Search Console baseline is still early (648 impressions and 7 clicks over roughly the first three weeks of meaningful data). It shows that Carrowmont is being discovered globally, but high-intent calculator visibility remains much weaker than informational Learn visibility. This batch therefore targets clear calculator terminology while keeping the product experience stable.

## Financial Independence / FIRE

Search-facing title becomes:

`Financial Independence & FIRE Calculator | Carrowmont`

The visible product label remains **Financial Independence** and the existing H1 remains unchanged. The source description and `WebApplication` structured-data name clarify that the tool serves both financial-independence and FIRE calculator intent.

No target formula, withdrawal-rate method, Plan Until Age behavior, frequency logic, chart, Copy Summary or PDF behavior changes.

## Retirement

The interactive calculator page at:

`/retirement-calculator/planner.html`

owns the generic calculator intent and receives the search-facing title:

`Retirement Calculator & Retirement Planner | Carrowmont`

The `/retirement-calculator/` landing page remains unchanged and continues to serve as the branded/educational overview. This deliberately separates the landing-page intent from the interactive calculator page instead of making both pages compete with identical search titles.

The visible product label remains **Retirement Planner** and the current expense-aware H1 remains unchanged. No retirement corpus, expense, pension/income, frequency, contribution, report or localization logic changes.

## Budget & Cash Flow

Search-facing title becomes:

`Budget Calculator & Monthly Cash Flow Planner | Carrowmont`

The visible product remains **Budget & Cash Flow Planner** and the current H1 remains unchanged. Metadata and structured data clarify monthly-budget and cash-flow calculator intent.

No monthly/pay-cycle logic, saved history, Smart Suggestions, report, CSV, localization or cross-tool handoff behavior changes.

## Inflation / Purchasing Power

Search-facing title becomes:

`Inflation & Purchasing Power Calculator | Carrowmont`

The visible product remains **Inflation Calculator** and the existing H1 remains unchanged. Metadata and structured data make the purchasing-power use case explicit while retaining one universal calculator.

No inflation formula, currency formatting, chart, report, Copy Summary or methodology changes.

## Sitemap

Only the four changed public calculator URLs receive a `2026-10-13` sitemap `lastmod` update:

- `/financial-independence/`
- `/retirement-calculator/planner.html`
- `/budget-cash-flow-planner/`
- `/inflation-calculator/`

No new public URL is introduced.

## Locked product rule

Global SEO work must improve discoverability without silently changing:

- calculator mathematics;
- established country/localization terminology;
- canonical URLs;
- report behavior;
- navigation/access paths;
- the approved Carrowmont visual system.

If a future SEO recommendation requires a product or UX change, that change must be scoped and approved separately.

## QA gate

Central QA must prove:

- all four new search-facing titles are present;
- their source descriptions/social metadata/structured-data names remain aligned;
- visible product labels and current H1s are preserved;
- the Retirement landing page keeps its distinct overview title while `planner.html` owns calculator intent;
- sitemap `lastmod` changes are limited to the four changed calculator URLs;
- existing calculator, report, localization and layout suites remain green;
- no workflow file changes.
