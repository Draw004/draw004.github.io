# CARROWMONT SEO3D — Silver Supply, Demand & Macro Stress Explorer Implementation

**Implementation status:** Release candidate built from approved specification  
**Development baseline:** Snapshot 39  
**Snapshot generated:** 10 October 2026, 16:06:27 UTC  
**Baseline `draw004.github.io`:** `932669af99842a2ca31b30f76ffffc9d3edec509`  
**Baseline `carrowmont-qa`:** `4727a788bdbe01b64c61f9abe55a06baac4b53de`

## Scope

This release implements the approved Silver project as one connected discovery and decision-support experience:

- `/silver-vs-gold.html` — the primary search/discovery Learn article.
- `/silver-supply-demand-macro-stress-explorer.html` — the deterministic explorer.
- `data/silver-market-reference.json` — reviewed completed-year physical-market reference.
- `scripts/validate-silver-market-reference.mjs` — offline deterministic physical-reference validator.
- Silver calculation core, application, styling, CSV/Copy Summary and four-page PDF report.
- Tools directory, Learn hub and selected Gold-context links.
- Central Playwright and source-contract coverage.

No existing SIP, Goal, Inflation, Retirement, Financial Independence or Budget calculation engine is modified. The homepage ranked core-tool grid and its country-demand ordering are not modified.

## Data architecture

The physical reference uses the latest completed full year from **World Silver Survey 2026** (2025 reference year), with mine production cross-checked against the **USGS Mineral Commodity Summaries 2026**. The engine keeps published headline totals/balance provenance separate from rounded component sums.

The macro engine reuses the existing bundled `data/gold-macro-reference.json` real-yield and Broad Dollar fields. No duplicate weekly macro updater or new GitHub Actions workflow is added.

Browser execution uses only same-origin bundled data. V1 has no live silver-price feed and no external client-side market-data API.

## Deterministic model

The Physical Market Engine models:

`modeled balance = modeled supply - modeled demand`

and classifies the balance as a share of modeled demand:

- `<= -5%`: Large modeled deficit
- `> -5% to <= -2%`: Modeled deficit
- `> -2% to < +2%`: Near balance
- `>= +2% to < +5%`: Modeled surplus
- `>= +5%`: Large modeled surplus

The macro engine remains separately visible. The combined text uses a rule matrix rather than a hidden silver-price score.

## Editorial safeguards

The release never converts a physical deficit into a claim that silver must rise, never labels silver as automatically undervalued because gold is expensive, and never produces a target price, expected return, buy/sell signal or allocation recommendation.

The Silver-vs-Gold guide explicitly explains that lower unit price is not the same as better value and creates the required discovery funnel into the Explorer.

## Localization and UI safeguards

The release respects `docs/CARROWMONT_ARCHITECTURE.md` and `docs/CARROWMONT_SHARED_UI_STANDARD.md`.

- Global silver quantities remain Moz/metric-tonne quantities rather than local-currency values.
- Existing Learn localization remains active for the new article without introducing hard-coded India-only money/SIP terminology.
- The homepage, homepage tool-demand matrix, `locale.js`, and the six core tool repositories remain out of scope.
- `/tools.html` expands from ten to eleven live tools by adding Silver only under Macro & Market Explorers.

## Maintenance

Annual physical-market updates are reviewed changes to `data/silver-market-reference.json` and must pass `scripts/validate-silver-market-reference.mjs`. The existing Gold macro updater continues to maintain the shared macro inputs.

## Release topology

Expected generated release PR count: **2**

1. `draw004.github.io`
2. `carrowmont-qa`

No `.github/workflows/*` file is changed. Temporary **Workflows: Read and write is not required** for this release.

## Required release gate

Before Publisher:

- source contract green in source, Publisher and Multi-Repo Guard layouts;
- deterministic core/reference fixtures green;
- desktop, 390 px and 360 px browser checks green;
- article discovery/cross-linking green;
- Copy Summary/CSV parity green, including scenario identifier, unit, physical classification and macro-state fields;
- four-page PDF generated and visually reviewed;
- same-origin privacy/RUM gate green;
- homepage India/US ordering and visuals remain unchanged;
- release manifest and ZIP integrity verified.
