# CARROWMONT RENT1 — RENT VS BUY CALCULATOR IMPLEMENTATION

**Production baseline:** Carrowmont Source Snapshot 67  
**Release date:** 2026-10-15  
**Product code:** RENT1

## Production route

`https://carrowmont.com/mortgage-payoff-calculator/rent-vs-buy-calculator.html`

## Calculation model

RENT1 compares two complete housing paths over the same monthly horizon:

- both paths start with the same available housing cash, equal to the larger upfront requirement;
- each path pays its own upfront requirement and invests unused starting cash;
- each month the higher housing outflow becomes the shared housing budget and the cheaper path invests the difference;
- the buying path amortizes the entered loan, separates principal from interest, grows owner-only costs, grows the home value and deducts selling costs plus remaining debt at the selected horizon;
- the renting path grows rent, returns the refundable rental deposit at the horizon and keeps its investment balance;
- stable crossover is secondary to the selected-horizon net-wealth result and is reported only when the newly leading path remains ahead through the rest of the modeled period.

The deterministic core version is `RENT1-1.0` and contains 30 fixture checks.

## Product boundaries

- Country controls terminology; currency controls formatting only. Neither changes the universal core mathematics.
- Local purchase taxes, transfer taxes, tax deductions, capital-gains tax and local benefits are not calculated automatically in V1.
- RENT1 does not write Mortgage Decision Profile or shared housing-plan state.
- The existing Mortgage / Home Loan Decision Centre remains four modules.
- The seven-core homepage remains unchanged.
- The existing `/rent-vs-buy-home.html` article remains the Learn authority page and now links to the live calculator.
- Goal Planner remains down-payment-goal planning only.

## Reporting and discovery

The calculator provides Copy Summary, a three-page PDF report, chart plus table equivalent, Tools Hub discovery, bidirectional Learn links, WebApplication/Breadcrumb structured data and sitemap coverage.

## Repository scope

1. `mortgage-payoff-calculator` — calculator, deterministic core, UI, scoped CSS and three-page PDF renderer.
2. `draw004.github.io` — Tools Hub, existing Rent vs Buy Learn CTA, sitemap and this implementation note.
3. `carrowmont-qa` — source contract, Tools Hub count update, Learn boundary update and dedicated RENT1 browser/PDF QA.
