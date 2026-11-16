# Carrowmont FRE Batch 10 — Country-Aware Financial Intelligence

Status: Implemented for Publisher validation.

## Purpose

Batch 10 moves Carrowmont beyond country-aware labels and currency formatting by adding a small, verified financial-reference layer where country context materially helps interpretation.

The first release supports five priority markets already strongly represented in Carrowmont's localization system:

- India
- United States
- United Kingdom
- Canada
- Australia

This release deliberately does **not** attempt tax, pension, benefit, lender-eligibility or regulatory engines for every country.

## What was added

### 1. Verified country reference model

`/data/country-financial-reference.json` stores a reviewed set of official reference points for each supported market:

- the relevant central-bank policy rate or target range;
- the official inflation target / control range;
- the relevant as-of or framework date where available;
- the official source title and source URL; and
- the date the Carrowmont reference set was reviewed.

Initial reference set reviewed: **17 November 2026**.

### 2. Country Context panel on relevant tools

A shared `/assets/country-intelligence/carrowmont-country-context.js` component reads the existing `CarrowmontLocale` region and displays a collapsed **Country context** panel on selected core planning, borrowing, inflation and cash-flow tools.

The panel explains:

- the current official reference point;
- the source and date;
- why the reference may matter for the current type of calculator; and
- the boundary between official context and the user's own assumptions.

When the user switches country, the panel follows the same existing locale event. Unsupported countries do not receive invented country-specific information.

### 3. Explicit non-override contract

Batch 10 does not automatically write an official rate or inflation target into any calculator field, saved plan or My Carrowmont profile.

Examples:

- A central-bank policy rate is **not** treated as a mortgage, home-loan, credit-card, savings or personal-loan rate.
- An inflation target is **not** treated as current inflation or a forecast of future inflation.
- User-entered return, inflation, interest-rate, contribution and target assumptions remain authoritative for the calculation being run.

### 4. Methodology transparency

The public Methodology page now explains the country-aware reference layer, supported first-release markets and the rule that unsupported markets retain the existing terminology/currency localization until verified country-specific support is available.

## Initial official references

### India

- Policy repo rate: 5.50% — Reserve Bank of India current rates, reviewed 17 Nov 2026.
- CPI inflation target: 4%, tolerance band 2%-6%, framework through 31 Mar 2031 — Reserve Bank of India.

### United States

- Federal funds target range: 3.75%-4.00%, effective 29 Oct 2026 — Federal Reserve.
- Longer-run PCE inflation goal: 2% — Federal Reserve.

### United Kingdom

- Bank Rate: 4.00%, decision published 5 Nov 2026 — Bank of England.
- CPI inflation target: 2% — Bank of England.

### Canada

- Target for the overnight rate: 2.50%, decision 28 Oct 2026 — Bank of Canada.
- CPI inflation-control target: 2% midpoint of a 1%-3% range — Bank of Canada.

### Australia

- Cash rate target: 4.85%, effective 4 Nov 2026 — Reserve Bank of Australia.
- CPI inflation target: 2%-3% — Reserve Bank of Australia.

## Tool coverage

The shared Country Context component is loaded on the primary Carrowmont planning surfaces where policy-rate or inflation context can reasonably help interpretation:

- SIP / Recurring Investment
- Compound Interest
- Loan / EMI
- Mortgage / Home Loan Payoff
- Retirement Planner
- Inflation Calculator
- Goal Planner
- Financial Independence
- Budget & Cash Flow Planner
- Home Affordability
- Debt-to-Income / Borrowing Health
- Car Affordability
- Emergency Fund / Runway

This is a contextual layer only. The underlying deterministic calculators are unchanged.

## Preserved boundaries

Batch 10 makes no changes to:

- tested financial formulas;
- calculator deterministic cores;
- currency conversion behavior (Carrowmont still does not perform automatic FX conversion when the currency selector changes);
- Supabase schema or account ownership;
- Google OAuth;
- explicit Save / Update to My Carrowmont rules;
- Batch 9 Trust Contract;
- Batch 9B consolidated plan/report logic;
- public URL inventory or sitemap.

## Forward compatibility

The shared API exposes `CarrowmontCountryIntelligence.getReference(region)` so later work, including Batch 10B Account-Aware Ask Carrowmont, can reuse the same verified reference model instead of inventing country rules independently.

## Release gate

Batch 10 is complete only when:

1. all official references are sourced and dated/reviewed;
2. supported-country panels follow the selected locale correctly;
3. unsupported countries do not receive invented context;
4. no reference silently overwrites calculator or account data;
5. source-contract QA is green;
6. responsive browser QA is green;
7. Publisher and Multi-Repo Guard are green; and
8. a new authoritative Source Snapshot is generated.
