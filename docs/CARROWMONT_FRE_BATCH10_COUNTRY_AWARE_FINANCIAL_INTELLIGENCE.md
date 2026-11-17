# Carrowmont FRE Batch 10 — Country-Aware Financial Intelligence

Status: Expansion implemented for Publisher validation.

## Purpose

Batch 10 moves Carrowmont beyond country-aware labels and currency formatting by adding a small, verified financial-reference layer where country context materially helps interpretation.

The verified country-context layer now supports nine country profiles across eight monetary-policy jurisdictions:

- India — Reserve Bank of India
- United States — Federal Reserve
- United Kingdom — Bank of England
- Canada — Bank of Canada
- Australia — Reserve Bank of Australia
- Japan — Bank of Japan
- South Korea — Bank of Korea
- France — Euro Area / European Central Bank
- Italy — Euro Area / European Central Bank

France and Italy intentionally share one ECB monetary-policy jurisdiction. China remains unsupported by this automated reference layer in this release; Carrowmont shows no invented policy benchmark for unsupported markets.

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

The country-context runtime is delivered through the already-proven `/assets/trust/carrowmont-trust.js` public asset. It reads the existing `CarrowmontLocale` region and displays a collapsed **Country context** panel on selected core planning, borrowing, inflation and cash-flow tools. The reviewed JSON reference file remains the release/source record; the browser runtime carries a verified embedded copy so a newly introduced public asset path cannot become a single deployment dependency.

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

The public Methodology page now explains the country-aware reference layer, the supported markets, the shared ECB jurisdiction for France and Italy, and the rule that unsupported markets retain the existing terminology/currency localization until verified country-specific support is available.

### 5. Protected country-reference maintenance updater

Batch 10 includes a protected weekday maintenance workflow for policy-rate references. It now checks eight official monetary-policy jurisdictions: RBI, Federal Reserve, Bank of England, Bank of Canada, RBA, Bank of Japan, Bank of Korea and the ECB. France and Italy are updated from the same validated ECB observation. The workflow creates a human-review pull request only when a validated policy-rate value changes.

The updater deliberately incorporates the lessons from the earlier Gold Macro and U.S. Debt automations:

- change direction is calculated numerically as **proposed minus stored**;
- `+` always means the policy rate increased and `-` always means it decreased;
- changes are shown in **percentage points (pp)** rather than relative percent change;
- a changed observation older than the stored reference is blocked;
- unexpectedly future-dated observations are blocked;
- a changed source older than 120 days is blocked;
- an automated move larger than 2.00 percentage points is blocked for manual review;
- the workflow never auto-merges; and
- `/data/country-financial-reference.json` and the embedded copy in `/assets/trust/carrowmont-trust.js` must change together and match exactly.

The weekday updater only automates policy-rate references. Inflation targets and control frameworks are preserved until an official framework change is explicitly reviewed; monthly inflation readings are not substituted for those policy objectives.

### 6. Currency-aware Home Affordability starter values

The Home Affordability tool now uses round, currency-aware starter magnitudes instead of carrying India-scale raw numbers into every currency. For example, an untouched New Zealand / NZD scenario starts around **NZ$12,000 monthly after-tax household income, NZ$200,000 deposit and NZ$1,000,000 target home price**, with a round illustrative rate/term profile.

These starter values are examples, **not market averages and not FX conversions**. If the user edits any input, later country/currency changes do not silently convert or replace those user-entered values. Resetting the tool intentionally reloads the starter profile for the currently selected locale.

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

### Japan

- Uncollateralized overnight call rate guideline: around 1.25%; Carrowmont stores 1.25% as the numeric policy reference, with the Bank of Japan page showing the matching complementary-deposit rate effective 24 Sep 2026.
- CPI price-stability target: 2% — Bank of Japan.

### South Korea

- Bank of Korea Base Rate: 3.00%, latest change effective 27 Aug 2026 — Bank of Korea official Base Rate history.
- CPI inflation target: 2% over the medium term — Bank of Korea.

### France and Italy — Euro Area / ECB

- ECB deposit facility rate: 2.50%, effective 16 Sep 2026 — European Central Bank. The ECB states that the monetary-policy stance is steered through this rate.
- HICP inflation target: 2% over the medium term — European Central Bank.
- France and Italy intentionally share this single ECB reference and update path; Carrowmont does not invent separate Banque de France or Banca d'Italia policy rates.

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
5. the protected country-reference updater passes sign, freshness, anomaly and synchronization checks;
6. Home Affordability starter values remain realistic in scale across currencies without overwriting edited inputs;
7. source-contract QA is green;
8. responsive browser QA is green;
9. Publisher and Multi-Repo Guard are green; and
10. a new authoritative Source Snapshot is generated.
