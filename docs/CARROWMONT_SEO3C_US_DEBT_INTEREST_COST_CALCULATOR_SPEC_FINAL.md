# CARROWMONT SEO3C — US DEBT & INTEREST COST CALCULATOR

## Product & Implementation Specification

**Baseline:** Carrowmont clean Source Snapshot generated 10 October 2026 after QA analytics-isolation release  
**Snapshot generated:** 10 October 2026, 05:22:08 UTC  
**Main-site commit:** `22bf75f3e8f4cf729ddc61c0ffc5b30eeeba93d4`  
**Financial Independence commit:** `3b0c69be1629ae1f1cfa940d71ab6f192a395d60`  
**Central QA commit:** `3e6504e0fc5727ef660cce241a2d2d6f215acb37`  
**Specification date:** 10 October 2026  
**Status:** Approved specification — incorporates Simple Mode, Advanced Assumptions and weekly Treasury reference-data maintenance. Production code is not changed by this document.

---

# 1. Purpose

SEO3C will create a public, free, no-login Carrowmont authority asset that makes the relationship between U.S. federal debt, average borrowing costs, refinancing and future interest expense understandable through transparent scenarios.

The core question is:

> **If the modeled U.S. debt stock is X, the existing average rate is Y, refinancing/new borrowing occurs at Z, and new primary deficits continue, how could annual interest cost change over the next several years?**

The calculator is educational scenario analysis. It is **not** a forecast of a U.S. default, fiscal crisis, bond-market crash, dollar collapse, or future Treasury yield.

It should help a reader understand four ideas quickly:

1. A debt balance by itself does not determine the interest burden; the effective rate matters.
2. Higher or lower market rates do not reprice the entire existing debt stock immediately.
3. Maturing debt gradually refinances, so the average cost can move with a lag.
4. Primary deficits and interest expense can add to the debt stock and increase later interest costs.

---

# 2. Strategic role in the Carrowmont roadmap

SEO3C is the first major tool in the **Global Macro Risk & Financial Resilience** pillar.

Its job is to expand Carrowmont from personal-planning calculators into transparent macroeconomic scenario tools that connect global fiscal and market conditions to topics already relevant to Carrowmont users: inflation, bonds, currencies, gold, retirement and financial resilience.

The page should be useful enough to be cited as an educational reference, not merely exist as a search-targeted calculator.

SEO3C should establish the modelling and editorial discipline later reused by:

- Gold Under Macro Stress Explorer;
- Oil Shock & Inflation Calculator;
- Hypothetical US Default & Global Market Stress Test;
- Dollar Reserve Diversification Tracker;
- future Treasury refinancing stress analysis.

---

# 3. Non-negotiable editorial positioning

The tool must separate:

- **official reported data**;
- **Carrowmont reference data snapshots**;
- **user-entered assumptions**;
- **deterministic model outputs**;
- **reasonable interpretation**;
- **speculation**, which should be avoided or explicitly identified.

Do not publish language such as:

- “The U.S. will default in X years.”
- “Rates will definitely rise/fall.”
- “The dollar is about to collapse.”
- “Gold must rise because U.S. debt is high.”
- “The Treasury prints money to repay debt.”

Preferred language includes:

- “Under the assumptions selected…”
- “This scenario produces…”
- “If the modeled refinancing rate were…”
- “The result is a sensitivity illustration, not a forecast.”

---

# 4. Canonical route and search presentation

## 4.1 Canonical URL

`https://carrowmont.com/us-debt-interest-cost-calculator.html`

The URL should remain stable after publication.

## 4.2 Recommended title

**US Debt Interest Cost Calculator | Carrowmont**

## 4.3 Recommended meta description

**Model how U.S. debt, refinancing rates, primary deficits and debt rollover assumptions can change annual federal interest costs over time.**

## 4.4 H1

**See how debt and refinancing rates can change the U.S. interest burden**

## 4.5 Structured data

Use `WebApplication` schema matching the established Carrowmont interactive-asset pattern.

Do not use structured data to imply real-time government data, investment advice, a market forecast or a default prediction.

---

# 5. What SEO3C does and does not calculate

## SEO3C answers

- How does a different interest-rate assumption change modeled annual interest cost?
- Why does refinancing speed matter?
- How does a continuing primary deficit add to future interest expense?
- How much does a 1 percentage-point change in the new/refinancing rate matter under the same debt assumptions?
- How can the modeled debt stock and interest burden evolve over a multi-year horizon?

## SEO3C does not answer

- Will the United States default?
- What will Treasury yields be next year?
- What will the Federal Reserve do?
- What will happen to the dollar, gold, stocks or bonds?
- Is a specific Treasury security a good investment?
- What exact future federal net-interest outlays will be?

Later Carrowmont macro assets may explore transmission channels, but SEO3C must remain a transparent debt/interest-cost scenario tool.

---

# 6. Debt measure and terminology

## 6.1 Default debt basis

Default to **Debt Held by the Public** for the reference scenario.

Reason: it is the debt measure most directly connected to federal borrowing in financial markets and is the measure most often used by CBO for budget/economic analysis.

## 6.2 Alternate debt basis

Keep debt-basis selection inside **Advanced Assumptions** so the normal visitor is not asked to choose among technical debt definitions before using the calculator.

Advanced options:

- **Debt Held by the Public** — default;
- **Total Public Debt Outstanding**;
- **Custom Debt Amount**.

In Simple Mode, show the currently loaded **Debt Held by the Public** reference prominently as a read-only starting figure with its source and `as of` date.

Selecting an official reference basis loads the bundled Treasury reference value and its `as of` date. If the user chooses Custom or edits an official preset in Advanced Assumptions, the UI must identify the result as a **custom scenario value** rather than implying that it remains the official figure.

## 6.3 Important terminology distinction

The page must clearly distinguish three concepts:

1. **Debt Held by the Public** — Treasury securities held outside federal government accounts, subject to Treasury/FiscalData definitions.
2. **Total Public Debt Outstanding** — debt held by the public plus intragovernmental holdings.
3. **Federal net interest outlays** — a budget measure that is not identical to a simple debt × rate calculation and includes relevant budgetary offsets/treatment.

The Carrowmont model output must be labelled **modeled interest cost** or **modeled annual interest cost**, not “official net interest outlays.”

---

# 7. Currency and locale rule — documented tool-specific exception

SEO3C models U.S. federal debt. The underlying debt and interest figures are denominated in **U.S. dollars**.

Therefore:

- model currency is fixed to **USD** in V1;
- do not relabel a $32 trillion debt value as INR, GBP or another currency merely because the user changes locale;
- do not perform automatic FX conversion in V1;
- the shared Carrowmont header, typography, spacing and control geometry still apply;
- if a locale/country control is displayed, it may affect general formatting or contextual copy, but it must never change the model currency away from USD without a real, disclosed FX-conversion feature.

Preferred header treatment for V1:

`United States · USD`

using the established locale-pill visual geometry, with a clear tooltip/help message explaining that the tool models U.S.-dollar federal debt.

This is a documented tool-specific restriction to prevent a misleading currency transformation.

---

# 8. Reference-data architecture and maintenance

SEO3C must not depend on a fragile live external API call for the core calculation.

The production page should consume a **bundled, validated Carrowmont reference-data file** stored in the repository. The file is refreshed through a protected weekly maintenance workflow, not by the visitor's browser calling Treasury directly.

Conceptual structure:

```text
referenceData = {
  asOfDate,
  debtHeldByPublic,
  totalPublicDebtOutstanding,
  sourceName,
  sourceUrl,
  retrievedAt
}
```

The interface must display:

> **U.S. Treasury reference · as of [date]**

and the rounded reference amount, for example:

> **Debt held by the public: $XX.X trillion**

Do not use the words `live`, `real-time` or `current` unless the implementation genuinely fetches, validates and displays live data.

The bundled reference value is a convenience starting point. The deterministic calculation runs from the values shown to the user and continues to work if the Treasury service is temporarily unavailable.

## 8.1 Weekly automatic Treasury check

Create a dedicated GitHub Actions workflow, conceptually named:

**Update US Debt Reference**

Recommended cadence: **once each week**, for example Monday morning UTC after Treasury's latest business-day data should normally be available. The exact schedule may be adjusted without changing the product model.

Each scheduled run should:

1. request the latest available record from the official U.S. Treasury FiscalData **Debt to the Penny** source;
2. read the record date, Debt Held by the Public and Total Public Debt Outstanding;
3. compare the record date with the currently stored Carrowmont reference date;
4. validate the returned values before any repository change is proposed;
5. if the official record is newer and validation passes, update only the small reference-data file;
6. create a small protected pull request showing the old value/date and new value/date;
7. leave `main` untouched until the PR is reviewed and merged.

The user's normal maintenance action should therefore be only:

> **Review the automatically created data-only PR → Merge if the figures and checks look normal.**

No manual Treasury lookup, HTML edit, JavaScript edit or date change should normally be required.

## 8.2 Required updater validation

Before a data-update PR can be created, the workflow must confirm at minimum:

- response parsing succeeded;
- record date is a valid date;
- record date is newer than the stored `asOfDate`;
- Debt Held by the Public is finite and greater than zero;
- Total Public Debt Outstanding is finite and greater than zero;
- Total Public Debt Outstanding is not less than Debt Held by the Public;
- source fields correspond to the expected Treasury dataset;
- the generated reference-data file parses successfully;
- existing source/data-contract tests remain green.

An unusually large change should be treated as a **manual-review flag**, not silently accepted. The workflow may use a conservative anomaly threshold for flagging, but an anomaly threshold must never be presented as a claim that a genuine large Treasury change is impossible.

## 8.3 Failure-safe behavior

If Treasury is unavailable, returns malformed data, returns an older/equal record, or fails validation:

- do **not** alter the stored reference data;
- do **not** create a misleading update PR;
- leave the last verified figure and `as of` date in production;
- fail or clearly report the maintenance run so the issue can be inspected.

The public calculator itself must remain usable with the last verified reference snapshot.

## 8.4 Manual refresh option

The scheduled workflow should also support **workflow_dispatch** so the owner can run the same validated check manually before a major release or whenever a fresh reference is desired. Manual runs must use the same validation and protected-PR path as scheduled runs.

## 8.5 Other reference assumptions

Not every assumption should update weekly.

- **Debt balance:** checked automatically once a week from Treasury.
- **Existing average-rate reference:** reviewed when the relevant official Treasury/CBO reference updates; monthly review is appropriate in V1.
- **Primary-deficit reference assumption:** reviewed when the relevant CBO/Treasury fiscal projection changes or when Carrowmont deliberately updates the scenario baseline.
- **User-selected refinancing rate:** an editable scenario assumption, not an automatically forecast value.

Every non-user reference assumption must display enough source/date context to avoid appearing timeless or real-time.

---

# 9. Inputs and interaction model

The calculator must be immediately usable by a non-specialist. **Do not require the visitor to research U.S. debt, average borrowing rates, primary deficits or refinancing schedules before receiving a result.**

Use a two-level experience:

1. **Simple Mode** — visible by default;
2. **Advanced Assumptions** — collapsed by default.

All defaults are explicit scenario/reference values and remain editable through Advanced Assumptions where appropriate.

## 9.1 Simple Mode — default experience

The normal visitor should initially see only the information needed to understand and test the scenario.

### A. Official U.S. debt reference

Display prominently, but do not require entry:

**Debt held by the public**

Example presentation:

```text
$XX.X trillion
U.S. Treasury reference · as of [date]
```

This value comes from the bundled validated reference-data file described in Section 8.

### B. Rate on refinanced and new borrowing

Label:

**Rate on refinanced and new borrowing**

This is the primary scenario control.

Default: **4.0%** as an illustrative scenario assumption.

Recommended range:

- 0%–20%;
- step 0.1%.

Required help text:

> Treasury borrows across multiple maturities. This single rate is a simplified blended scenario assumption, not a forecast of any one Treasury yield.

The control may be a number field, slider plus number field, or another accessible Carrowmont-standard control. Exact keyboard entry must remain possible.

### C. Projection period

Label:

**Projection period**

Default: **10 years**.

Recommended range:

- 1–15 years;
- integer steps.

### D. Primary action

Use a clear action such as:

**See the impact**

or the established Carrowmont calculate-action wording if consistency requires it.

Simple Mode should allow a useful result without opening Advanced Assumptions.

## 9.2 Advanced Assumptions — collapsed by default

Use an accessible disclosure labelled:

**Advanced Assumptions**

Opening it reveals the technical controls below. These fields must already contain sensible, disclosed defaults; opening Advanced Assumptions should not create additional work merely to run the calculator.

### 9.2.1 Starting debt basis

Options:

- Debt Held by the Public — default;
- Total Public Debt Outstanding;
- Custom.

Switching between official debt bases loads the corresponding validated Treasury reference amount and date.

### 9.2.2 Starting modeled debt

Unit: USD.

Default: bundled official reference value corresponding to the selected official debt basis.

Validation:

- greater than 0;
- finite numeric value;
- recommended UI range: $0.1 trillion to $100 trillion;
- do not silently clamp valid user-entered values without explanation.

If the user edits the official value, clearly show **Custom scenario** and stop describing the edited number as the official Treasury reference.

### 9.2.3 Existing average interest rate

Label:

**Existing average interest rate**

Default reference assumption: use the **latest applicable official/CBO reference available at implementation/update time**. For this specification, the current working reference is **3.4%**, subject to verification immediately before implementation. Help text must identify it as a dated reference assumption, not a live Treasury yield.

Recommended range:

- 0%–20%;
- step 0.1%.

Help text:

> This represents the average rate applied to the portion of the starting debt that has not yet been refinanced in the model. It is not the same as today's 10-year Treasury yield.

### 9.2.4 Annual primary deficit before interest

Label:

**Annual primary deficit before interest**

Default: **$1.0 trillion** as an illustrative scenario assumption, subject to final source/date verification before implementation.

Recommended range:

- $0 to $10 trillion;
- step appropriate to the input control.

Help text:

> Primary deficit means spending minus revenues before net interest. The model adds this amount to debt each year in addition to the modeled interest cost.

V1 does not model a primary surplus. If surplus modelling is later added, its debt-reduction mechanics must be specified separately rather than treating a negative deficit casually.

### 9.2.5 Starting-debt refinancing window

Label:

**Refinance the starting debt over**

Unit: years.

Default: **5 years**.

Recommended range:

- 1–30 years;
- integer steps.

Meaning:

> A 5-year refinancing window means the model reprices one-fifth of the original starting debt each year until all of that original debt has moved from the existing rate to the selected new/refinancing rate.

This is a simplified even-rollover assumption. It is not a representation of the exact Treasury maturity schedule.

## 9.3 Reset and provenance behavior

Provide a clear way to reset the scenario to Carrowmont's published defaults.

The interface must always make it possible to distinguish:

- official Treasury reference data;
- dated Carrowmont reference assumptions;
- user-edited/custom assumptions;
- deterministic calculated outputs.

---

# 10. Model timing convention

V1 uses a transparent **beginning-of-year interest / year-end borrowing convention**.

For each modeled year:

1. A fixed tranche of the original starting debt is refinanced at the selected new/refinancing rate.
2. Interest for that year is calculated on the debt stock already outstanding after that refinancing step.
3. The annual primary deficit and that year’s modeled interest cost are added to debt at year-end.
4. Debt added at year-end begins accruing interest from the next modeled year.

This convention deliberately favors transparency over false precision.

The methodology page must state that real Treasury cash flows, issuance dates, coupons, bills, TIPS inflation adjustments and maturity schedules are more complex.

---

# 11. Exact deterministic model

Let:

- `D0` = starting modeled debt;
- `r0` = existing average interest rate as a decimal;
- `rN` = new borrowing/refinancing rate as a decimal;
- `P` = annual primary deficit before interest;
- `W` = refinancing window in years;
- `T` = projection horizon in years;
- `L_t` = remaining legacy starting debt after refinancing in year `t`;
- `N_t` = debt already priced at the new/refinancing rate before year-end additions;
- `I_t` = modeled interest cost in year `t`.

Initial state:

```text
L_0 = D0
N_0 = 0
annualRefiTranche = D0 / W
```

For each year `t = 1 ... T`:

```text
refi_t = min(annualRefiTranche, L_(t-1))

L_t = L_(t-1) - refi_t
N_pre_t = N_(t-1) + refi_t

I_t = (L_t × r0) + (N_pre_t × rN)

closingDebt_t = L_t + N_pre_t + P + I_t

N_t = N_pre_t + P + I_t
```

The next year begins with:

```text
legacy debt = L_t
new/refinanced debt = N_t
```

Derived values:

```text
openingAnnualizedInterest = D0 × r0
cumulativeInterest = sum(I_t for t = 1...T)
finalDebt = closingDebt_T
finalYearInterest = I_T
changeInAnnualInterest = finalYearInterest - openingAnnualizedInterest
repricedShareOfStartingDebt = min(T / W, 1)
```

Effective modeled rate for a year, before year-end additions:

```text
effectiveRate_t = I_t / (L_t + N_pre_t)
```

if the denominator is greater than zero.

All calculations keep full numeric precision internally. Rounding occurs only in presentation/export layers.

---

# 12. Why the model uses a primary deficit

Do **not** ask the user for a total federal deficit and then add modeled interest again. That would risk double counting interest.

The model specifically asks for the **primary deficit before interest** because:

```text
Closing debt increase ≈ primary deficit + modeled interest cost
```

under the simplified scenario convention.

This distinction must be clear in the UI, methodology, PDF and CSV.

---

# 13. Standard rate-sensitivity scenarios

Always run three rate paths using the same debt, primary-deficit and refinancing assumptions:

1. **1 percentage point lower** than the selected new/refinancing rate;
2. **Selected rate**;
3. **1 percentage point higher** than the selected new/refinancing rate.

For the lower scenario:

```text
lowerRate = max(0, selectedRate - 0.01)
```

For the higher scenario:

```text
higherRate = selectedRate + 0.01
```

Do not label these scenarios `best`, `worst`, `optimistic`, `pessimistic`, `safe` or `likely`.

They are mechanical sensitivity bands, not forecasts.

---

# 14. Core outputs

## 14.1 Primary summary cards

Show a small set of strong outputs for the **Selected rate** scenario:

1. **Opening annualized interest estimate** — `D0 × r0`;
2. **Year 1 modeled interest cost**;
3. **Final-year modeled interest cost**;
4. **Final modeled debt**;
5. **Cumulative modeled interest** over the selected horizon;
6. **Change in annual interest cost** versus the opening annualized estimate.

Desktop may show these in two rows; mobile must stack without horizontal overflow.

## 14.2 Refinancing progress

Display a concise status such as:

> **60% of the original starting debt has been repriced by Year 3 under this simplified rollover assumption.**

## 14.3 One-percentage-point context

Show two deterministic educational sensitivities:

```text
Full starting-debt sensitivity to 1 percentage point = D0 × 1%
One annual refinancing-tranche sensitivity to 1 percentage point = (D0 / W) × 1%
```

Copy should explain that the full effect emerges only as debt reprices and new debt accumulates.

---

# 15. Primary interpretation copy

Generate deterministic text from model outputs, for example:

> Under the selected assumptions, the modeled annual interest cost rises from an opening annualized estimate of $X to $Y by Year N. The result reflects both the repricing of the original debt and the additional debt created by the primary deficit and prior modeled interest costs.

Then add:

> This is a scenario illustration, not a forecast of official federal net-interest outlays or Treasury yields.

No AI-generated interpretation is required in SEO3C V1.

---

# 16. Chart standard

SEO3C must use the established Carrowmont chart language from the first implementation.

## 16.1 Primary chart

One main chart in V1:

**Modeled annual interest cost by year**

- X-axis: Year 0 through selected projection year;
- Y-axis: USD modeled annual interest cost;
- Series 1: 1 percentage point lower;
- Series 2: Selected rate;
- Series 3: 1 percentage point higher.

Year 0 represents the opening annualized interest estimate `D0 × r0` and is common to all three series.

## 16.2 Exact values outside the chart

A compact year-by-year table must provide exact values for the Selected-rate scenario. The chart is not the sole source of numeric detail.

The comparison table should provide at minimum final-year and cumulative-interest outputs for all three rate scenarios.

## 16.3 Typography and geometry

Reuse the canonical Carrowmont chart standard:

- Inter/system font stack;
- approximately 13px / 700 axis text;
- no SVG text stroke;
- subtle neutral grid;
- white/neutral plot area;
- established Carrowmont navy/teal/muted series treatment;
- permanent important values where useful;
- plot-bounded callouts;
- safe label padding;
- no callout covering its own anchor;
- no page-level horizontal overflow.

Do not use gradients, 3D effects, decorative gauges or alarm-style red/green semantics.

## 16.4 Callouts

Permanently label only the key end points needed to interpret the three paths. Avoid labelling every year.

All callouts must:

- measure text width before placement;
- stay fully within plot bounds;
- move inward at edges;
- avoid their anchor markers;
- avoid each other where a valid alternate position exists;
- remain legible at 360px and 390px.

---

# 17. Year-by-year table

Provide a detailed table for the Selected-rate scenario with columns:

1. Year
2. Legacy starting debt remaining
3. Original debt refinanced that year
4. Debt priced at new/refinancing rate before year-end additions
5. Modeled annual interest cost
6. Primary deficit added
7. Closing modeled debt
8. Effective modeled rate

Because a 10–15 year table can become visually dense:

- collapse it by default on the website using the established `<details>` pattern;
- keep all rows in CSV and PDF;
- do not remove data from export merely because the web table is collapsed.

---

# 18. Scenario comparison table

Always show a compact comparison with rows:

- 1 pp lower
- Selected rate
- 1 pp higher

Columns:

1. New/refinancing rate
2. Final-year modeled interest cost
3. Cumulative modeled interest
4. Final modeled debt
5. Change in final-year interest vs selected scenario

The selected scenario should be visually emphasized without suggesting that it is more likely.

---

# 19. Educational explanation sections

The page should contain concise, source-grounded sections explaining:

## 19.1 Debt held by the public vs total public debt

Explain the difference and why the default scenario uses debt held by the public.

## 19.2 Why refinancing takes time

Explain that outstanding Treasury securities mature over different periods, so a move in market yields does not instantly reset the rate on every dollar of debt.

## 19.3 Average cost vs market yield

Explain that the average interest cost on the outstanding debt stock is not the same thing as one current Treasury yield such as the 10-year rate.

## 19.4 Primary deficit vs total deficit

Explain why the model uses a deficit measure before interest.

## 19.5 Gross interest expense vs net interest outlays

Explain that Treasury gross interest expense and federal budget net interest are related but not identical measures.

## 19.6 Why interest can compound the debt burden

Explain that borrowing used to finance interest can raise the debt stock, which can raise later interest cost under the same rate assumptions.

---

# 20. Global and India-facing interpretation

Include a restrained educational block:

**Why U.S. debt-service conditions can matter globally**

Possible channels to explain without forecasting direction:

- Treasury yields are important reference rates in global financial markets;
- changes in U.S. yields can influence global borrowing costs and asset valuations;
- dollar conditions can affect cross-border funding and capital flows;
- for India, possible transmission channels include the rupee, imported financing conditions, portfolio flows, domestic bond yields and gold pricing.

The section must clearly distinguish a transmission channel from a prediction.

Do not state that a higher U.S. interest bill mechanically causes a weaker dollar, higher gold price or lower equities.

---

# 21. Actions and exports

V1 should include:

- **Copy Summary**
- **Download CSV**
- **Download US Debt Interest Cost Report**

## 21.1 Copy Summary

Include:

- reference-data date;
- selected debt basis and starting debt;
- existing average rate;
- new/refinancing rate;
- primary deficit;
- refinancing window;
- projection period;
- opening interest estimate;
- final-year interest cost;
- cumulative interest;
- final debt;
- lower/selected/higher sensitivity summary;
- educational disclaimer.

## 21.2 CSV

CSV should contain:

- a scenario-input section;
- year-by-year Selected-rate rows;
- three-scenario comparison rows;
- raw numeric values where feasible;
- explicit field names for `primary deficit before interest` and `modeled interest cost`.

## 21.3 PDF report

Standard PDF remains available without login.

Recommended maximum: **4 pages**.

### Page 1 — Scenario Snapshot

- assumptions;
- official-reference snapshot date;
- opening interest estimate;
- final-year interest cost;
- cumulative interest;
- final debt;
- concise interpretation.

### Page 2 — Interest-Cost Sensitivity

- three-series chart;
- lower/selected/higher comparison table;
- 1 percentage-point sensitivity note.

### Page 3 — Debt Path, Methodology & Limitations

- selected-scenario year-by-year table, sized carefully;
- exact model timing convention;
- debt-measure distinctions;
- sources;
- limitations and disclaimer.

If the table is too long for one page at the selected horizon, use a controlled continuation rather than shrinking text below the approved report standard.

### Page 4 — Continue Planning with Carrowmont

Use the established Carrowmont report final-page standard and current tool registry.

Relevant links may include Inflation Calculator, Retirement Planner, Financial Independence Planner and related Learn content.

PDF rules:

- same report typography/spacing system as existing Carrowmont reports;
- no oversized fixed-height cards;
- no content collision;
- no clipped chart labels;
- no sparse trailing page;
- raster-render and visually inspect every page before release.

---

# 22. Page structure

Recommended order:

1. Standard Carrowmont header / fixed USD context
2. Compact hero
3. **Official U.S. debt reference card** — amount, source and `as of` date
4. **Simple Mode panel** — refinancing/new-borrowing rate + projection period + primary action
5. **Advanced Assumptions** disclosure — collapsed by default
6. Primary result cards
7. Deterministic interpretation
8. Interest-cost sensitivity chart
9. Three-scenario comparison table
10. Collapsed detailed year-by-year table
11. What drives the result
12. Debt held by public vs total debt
13. Refinancing and average-rate explanation
14. Gross interest vs net interest explanation
15. Global / India-facing transmission channels
16. Methodology and limitations
17. FAQ
18. Sources and data dates
19. Related Carrowmont resources
20. Standard footer

The first screen should communicate the reference debt amount and the primary scenario control without presenting a wall of technical inputs.

---

# 23. Recommended hero and warning copy

## Hero lede

> Model how a changing refinancing rate, new borrowing and the pace of debt rollover can affect the U.S. government’s interest burden over time.

## Scenario warning

> This calculator is an educational sensitivity model. It does not predict Treasury yields, federal policy, a U.S. default or future official net-interest outlays.

## Data note

> The debt figure is a validated U.S. Treasury reference snapshot and shows its `as of` date. Carrowmont checks for a newer official debt record weekly. Rate, deficit and refinancing assumptions are scenario inputs and should not be read as forecasts.

---

# 24. FAQ topics

Include concise answers to at least:

1. **What is debt held by the public?**
2. **How is total public debt different?**
3. **Why doesn’t a higher Treasury yield immediately apply to all U.S. debt?**
4. **What is the average interest rate on federal debt?**
5. **Why does this calculator use a primary deficit?**
6. **Is modeled interest cost the same as CBO net interest outlays?**
7. **Does this calculator predict a U.S. default?**
8. **Does the Federal Reserve directly set the interest rate on all Treasury debt?**
9. **Why can interest expense keep rising even if rates stop rising?**
10. **How could U.S. debt-service conditions affect India?**
11. **Why are all calculations in USD?**
12. **Is this investment advice?**

---

# 25. Authoritative sources

Prefer primary/official sources in this order.

## Required source set

### U.S. Treasury FiscalData — Debt to the Penny

Purpose:

- Debt Held by the Public;
- Intragovernmental Holdings;
- Total Public Debt Outstanding;
- release-date / reference snapshot.

Source:

`https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/`

### U.S. Treasury FiscalData — Average Interest Rates on U.S. Treasury Securities

Purpose:

- background/reference on average rates across Treasury security categories;
- historical context;
- **not** a substitute for explaining the model’s user-selected blended refinancing rate.

Source:

`https://fiscaldata.treasury.gov/datasets/average-interest-rates-treasury-securities/`

### U.S. Treasury FiscalData — Interest Expense on the Debt Outstanding

Purpose:

- historical/reporting context on Treasury interest expense;
- explain why reported gross interest expense differs from Carrowmont’s simplified modeled cost and from CBO net interest.

Source:

`https://fiscaldata.treasury.gov/datasets/interest-expense-debt-outstanding/`

### U.S. Treasury FiscalData — Monthly Statement of the Public Debt (MSPD)

Purpose:

- security composition and maturity/refinancing context;
- support explanation that real Treasury debt does not refinance in equal annual tranches.

Source:

`https://fiscaldata.treasury.gov/datasets/monthly-statement-public-debt/`

### U.S. Treasury — Daily Treasury Par Yield Curve Rates

Purpose:

- context for market yields by maturity;
- link for readers who want to see current yield-curve information;
- never treat a single maturity yield as the average rate on the entire debt stock.

Source:

`https://home.treasury.gov/resource-center/data-chart-center/interest-rates/`

### Congressional Budget Office — Budget and Economic Outlook

Purpose:

- debt-held-by-public framing;
- primary deficit terminology;
- net-interest framing;
- average-rate and refinancing context;
- budget-baseline comparison.

Use the latest CBO Budget and Economic Outlook available at publication/update time.

Current specification reference:

`https://www.cbo.gov/publication/62105`

## Source discipline

- display source names and `as of` dates;
- do not hard-code time-sensitive figures into evergreen explanatory prose without a date;
- refresh release-time reference figures before publication;
- do not cite secondary news coverage when the same fact is available from Treasury/CBO;
- if an official data series definition changes, update the methodology and QA fixture source notes.

---

# 26. Privacy and product-access rules

- no login required;
- no account required;
- calculations run locally in the browser;
- standard PDF remains downloadable without login;
- no external AI call;
- no user financial-account data;
- no need to transmit scenario values to a backend;
- normal site analytics must not include the numeric scenario inputs;
- no API keys or secrets in browser code.

Future accounts may save scenarios, but that is out of scope for SEO3C.

---

# 27. Accessibility

Required:

- explicit labels and help text for every input;
- visible keyboard focus;
- keyboard-usable controls;
- results announced appropriately after recalculation where practical;
- chart has `role="img"` and a useful `aria-label`;
- exact chart values also exist in HTML tables;
- sufficient contrast;
- no meaning conveyed by color alone;
- collapsible detail uses native/accessible disclosure behavior;
- error text identifies both the field and correction required.

---

# 28. Responsive behavior

Test at representative widths including:

- 360px;
- 390px;
- 768px;
- 1024px;
- desktop.

Requirements:

- no page-level horizontal overflow;
- input cards and result cards stack cleanly;
- action buttons remain full, readable touch targets on mobile;
- chart labels stay within plot bounds;
- comparison table remains readable;
- detailed table may use a contained horizontal scroll region if necessary;
- no body-level horizontal scroll;
- USD labels remain unambiguous at every breakpoint.

---

# 29. Proposed implementation files

Expected main-site additions may include:

### New files

- `us-debt-interest-cost-calculator.html`
- `us-debt-interest-cost-calculator.css`
- `us-debt-interest-cost-calculator.js`
- `us-debt-interest-cost-calculator-core.js`
- `data/us-debt-reference.json` (or equivalent small validated reference-data file)
- `us-debt-interest-cost-calculator-pdf-renderer.js`
- `.github/workflows/update-us-debt-reference.yml`
- a small updater/validation script used only by the workflow, for example `scripts/update-us-debt-reference.mjs`

Use existing shared locale/site/report helpers wherever practical. The updater must not place Treasury API dependency inside the browser calculation path.

### Main-site updates

- `sitemap.xml`
- `learn.html`
- selected related Learn pages where contextually relevant
- implementation record under `docs/`

### Central QA

- new dedicated Playwright coverage, recommended:
  `tests/10-us-debt-interest-cost.spec.js`
- source-contract updates;
- sitemap/internal-link checks;
- PDF and mobile visual assertions.

No existing personal-finance calculator engine should be modified for SEO3C.

---

# 30. Calculation isolation rule

SEO3C must use a small deterministic core module with no DOM dependency.

Suggested conceptual API:

```text
normalizeInputs(raw)
runDebtInterestScenario(inputs)
runRateSensitivity(inputs)
formatScenarioSummary(result)
validateScenarioInputs(inputs)
```

The core should return structured numeric objects consumed by:

- web UI;
- chart;
- table;
- Copy Summary;
- CSV;
- PDF.

Do not duplicate the formula separately in the chart or PDF renderer.

---

# 31. Required deterministic fixtures

All monetary examples below use **trillions of USD** internally for readability in the specification. Production code may use full dollars if that is the established implementation convention.

## Fixture A — Opening annualized interest estimate

```text
D0 = 30
r0 = 3%
```

Expected opening annualized interest estimate:

```text
30 × 3% = 0.90 trillion
```

This value is the Year-0 baseline shown before the model applies refinancing, primary deficits or additional modeled interest.

## Fixture B — Full refinance in Year 1

```text
D0 = 30
r0 = 3%
rN = 5%
P = 0
W = 1
T = 1
```

Expected:

```text
Year-1 refi = 30
Legacy remaining = 0
Year-1 interest = 30 × 5% = 1.50
Closing debt = 31.50
```

The closing debt includes the modeled interest financed at year-end.

## Fixture C — Five-year refinancing window

```text
D0 = 30
r0 = 3%
rN = 5%
P = 1
W = 5
T = 3
annual refi tranche = 6
```

Expected:

```text
Year 1:
Legacy = 24
New/refinanced before year-end additions = 6
Interest = 1.020000
Closing debt = 32.020000

Year 2:
Legacy = 18
New/refinanced before year-end additions = 14.020000
Interest = 1.241000
Closing debt = 34.261000

Year 3:
Legacy = 12
New/refinanced before year-end additions = 22.261000
Interest = 1.473050
Closing debt = 36.734050
```

## Fixture D — Rate parity

When:

```text
r0 = rN
P = 0
```

refinancing alone must not change annual interest cost on the original debt. Any change would indicate a calculation defect.

## Fixture E — Primary deficit adds future cost with timing convention

With no refinancing and a positive primary deficit:

- Year 1 interest is calculated on opening debt only;
- the Year 1 primary deficit and interest are added at year-end;
- those additions begin contributing to Year 2 interest.

## Fixture F — 1 percentage-point sensitivity

For any starting debt `D0`:

```text
full starting-debt 1 pp sensitivity = D0 × 0.01
```

The final model difference need not equal that full amount until sufficient debt has repriced.

## Fixture G — Refinancing completion

If:

```text
W = 5
T >= 5
```

then after Year 5:

```text
legacy starting debt = 0
repriced share of original starting debt = 100%
```

No Year 6+ refi of the original starting debt may occur.

## Fixture H — Lower sensitivity floor

If selected new/refinancing rate is below 1%:

```text
lower scenario rate = 0%
```

Never produce a negative interest-rate scenario from the automatic `-1 pp` comparison unless a future specification explicitly allows it.

---

# 32. QA acceptance contract

SEO3C is not complete until all applicable checks pass.

## 32.1 Source / SEO

1. Canonical URL is exact.
2. Page appears once in sitemap.
3. `lastmod` matches release date.
4. No accidental `noindex`.
5. Robots allows crawling.
6. One visible H1 only.
7. Unique title.
8. Unique meta description.
9. WebApplication structured data parses.
10. Internal links are valid.
11. Existing IndexNow mechanism is reused, not duplicated.

## 32.2 Data provenance

12. Reference-data object contains an explicit `asOfDate`.
13. Debt reference values match the release-time official source snapshot.
14. The page does not label bundled data `live`.
15. Source links point to authoritative Treasury/CBO pages.
16. User edits clearly transition official preset values into a custom scenario state.
17. USD is never silently relabelled as another currency.

## 32.3 Calculation

18. Full-refinance fixture passes.
19. Five-year refinancing fixture passes.
20. Rate-parity fixture passes.
21. Primary-deficit timing fixture passes.
22. Refi completion fixture passes.
23. Lower-rate floor fixture passes.
24. Cumulative interest equals the exact sum of annual modeled interest.
25. Final debt equals the model’s closing debt for the final year.
26. No double counting of interest in the primary deficit.
27. No refinancing of more than the remaining original legacy debt.
28. No NaN/Infinity outputs.
29. Full internal precision is preserved until presentation.
30. Three rate scenarios use identical non-rate assumptions.

## 32.4 UI

31. Standard Carrowmont header/shell is reused.
32. Fixed USD context is unambiguous.
33. Inputs are keyboard usable.
34. Help text distinguishes average debt cost from a single Treasury yield.
35. Primary-deficit label explicitly says `before interest`.
36. Results update deterministically.
37. Copy Summary works.
38. CSV downloads valid content.
39. PDF download works without login.
40. No page-level horizontal overflow on desktop.
41. No page-level horizontal overflow at 360px and 390px.
42. Action buttons remain accessible mobile touch targets.

### Simple / Advanced interaction checks

- Simple Mode produces a complete result without opening Advanced Assumptions.
- The official Treasury debt amount is preloaded and not presented as a required user-entry task.
- Advanced Assumptions is collapsed by default and keyboard accessible.
- Editing an official debt preset visibly changes provenance to `Custom scenario`.
- Reset restores the published Carrowmont defaults and official reference provenance.

## 32.5 Chart

43. Chart uses approved Inter/system typography.
44. SVG text has no stroke.
45. Grid/axis treatment matches canonical Carrowmont styling.
46. USD compact formatting is readable and consistent.
47. Three scenario labels are descriptive and stable.
48. Selected scenario is distinguishable without relying only on color.
49. Permanent callouts remain inside plot bounds.
50. Callouts do not cover their own anchor markers.
51. Callouts avoid collisions where valid alternatives exist.
52. Chart remains legible at 360/390px.
53. Exact values are available outside the chart.
54. No key information is hover-only.

## 32.6 Tables

55. Detailed year table is collapsed by default on web.
56. All years remain present in CSV/PDF.
57. Table uses contained horizontal scrolling if necessary.
58. No page-level horizontal overflow.
59. Effective-rate values match the core model.
60. Scenario comparison values match chart series exactly.

## 32.7 PDF

61. PDF generates successfully.
62. PDF inputs match web inputs.
63. PDF results match web results.
64. Chart values and scenario labels match web.
65. No clipped/outlined chart text.
66. No report content collision.
67. Long tables continue cleanly when needed.
68. No oversized blank cards.
69. No sparse accidental trailing page.
70. Continue Planning page is present and uses current Carrowmont registry.

## 32.8 Privacy / regression

71. No scenario numeric values are sent to third parties.
72. No API key or secret is present in browser code.
73. Existing FI/retirement/inflation/SIP/goal/budget calculations are unchanged.
74. Existing SEO3A calculations remain unchanged.
75. Existing SEO3B calculations remain unchanged.
76. Central source contract remains green.
77. Automated QA remains green after merge.
78. Multi-Repo Guard remains green after merge.

## 32.9 Weekly reference-data updater

79. Scheduled workflow can run without browser/user input.
80. `workflow_dispatch` manual run is also supported.
81. Updater reads only the expected official Treasury Debt to the Penny fields required by SEO3C.
82. Older/equal Treasury record dates create no data change PR.
83. Invalid/malformed responses leave the last verified production reference untouched.
84. Debt Held by the Public is positive and finite.
85. Total Public Debt Outstanding is positive, finite and not below Debt Held by the Public.
86. A successful newer update changes only the intended reference-data/provenance files.
87. Successful updater run creates a protected data-only PR rather than writing directly to `main`.
88. PR body shows old/new reference dates and old/new debt values clearly enough for owner review.
89. Anomaly checks flag unusual changes for manual review and never silently overwrite production data.
90. Calculator continues using the last verified bundled reference if Treasury is unavailable.

---

# 33. Visual Consistency Gate

Before Publisher creates production PRs, compare SEO3C against canonical Carrowmont assets.

Review at minimum:

- desktop full-page screenshot;
- 390px full-page screenshot;
- 360px chart close-up;
- input-control geometry;
- USD context treatment;
- result cards;
- scenario comparison table;
- expanded detail table;
- PDF page containing the chart;
- PDF methodology/sources page;
- final Continue Planning page.

The gate must review:

1. typography and heading hierarchy;
2. control dimensions and spacing;
3. result-card geometry;
4. fixed USD treatment;
5. chart typography and callout containment;
6. table/disclosure behavior;
7. button/touch-target behavior;
8. mobile overflow;
9. PDF consistency;
10. accessibility-critical states.

Fix inconsistencies before production release rather than creating post-release presentation patches.

---

# 34. Internal-link architecture

At launch, SEO3C should receive contextual links from pages where the relationship is genuinely relevant, such as:

- `learn.html` / featured-resource area;
- inflation-related educational pages;
- stocks-vs-bonds educational content;
- gold-and-inflation educational content;
- retirement / financial-resilience content where macro-rate risk is discussed naturally.

SEO3C should link out to:

- Inflation Calculator;
- Retirement Planner;
- Financial Independence Planner;
- relevant Learn guides;
- future macro tools when they are published.

Do not add unrelated sitewide links solely to increase internal-link count.

As the Global Macro Risk cluster grows, SEO3C should become a central supporting asset for the planned U.S. debt/refinancing articles.

---

# 35. Sitemap and IndexNow

Add the canonical SEO3C URL to `sitemap.xml` with accurate `lastmod`.

Reuse the existing Carrowmont IndexNow workflow after deployment.

Do not introduce a second IndexNow implementation.

---

# 36. Release workflow

Use the established protected Carrowmont process:

```text
Approved SEO3C specification committed to /docs
        ↓
Fresh Source Snapshot
        ↓
Build smallest approved SEO3C implementation
        ↓
Static/hash/syntax/source-contract checks
        ↓
Staged browser/mobile/PDF QA
        ↓
Carrowmont Visual Consistency Gate
        ↓
Batch PR Publisher GREEN
        ↓
Owner review
        ↓
Merge manually in dependency order; carrowmont-qa last
        ↓
Pages deployment + IndexNow
        ↓
Live Automated QA
        ↓
Multi-Repo Guard
        ↓
Fresh Source Snapshot
```

No production implementation should begin from an older release ZIP after the specification has been committed. Use the fresh Source Snapshot produced after the approved spec merge.

## 36.1 Post-release weekly data-maintenance flow

After SEO3C is live, routine debt-reference maintenance should follow this smaller protected path:

```text
Scheduled weekly GitHub Action
        ↓
Fetch latest Treasury Debt to the Penny record
        ↓
Validate date + debt fields + generated reference file
        ↓
No newer valid record? → stop with no repository change
        ↓
Newer valid record? → create data-only PR
        ↓
Owner reviews old/new value + date
        ↓
Merge PR
        ↓
Normal Pages deployment + applicable QA/data checks
```

A failed Treasury fetch or validation failure must leave production unchanged.

---

# 37. Out of scope for SEO3C V1

Do not add in this release:

- prediction of U.S. default probability;
- debt-ceiling deadline prediction;
- Federal Reserve rate forecasts;
- automated trading/investment recommendations;
- Treasury-security buy/sell recommendations;
- gold-price forecasts;
- dollar-collapse forecasts;
- equity-market forecasts;
- full Treasury security-by-security cash-flow engine;
- exact auction-calendar simulation;
- TIPS inflation-accrual modelling;
- term-premium decomposition;
- stochastic/Monte Carlo macro modelling;
- automatic FX conversion;
- user accounts;
- cloud scenario storage;
- paid features;
- AI-generated analysis;
- external bank/brokerage connections.

---

# 38. Future enhancements — not part of V1

Possible later extensions, only after SEO3C is stable:

- exact maturity-bucket refinancing model using official Treasury data;
- separate bill/note/bond/TIPS/FRN issuance assumptions;
- dynamic primary-deficit paths;
- user-defined year-by-year rate path;
- CBO-baseline comparison mode;
- interest cost as a share of revenues or GDP;
- historical rate/debt overlays;
- Treasury Yield & Refinancing Stress Test as a distinct advanced asset;
- account-based saved scenarios;
- advanced AI interpretation grounded strictly in deterministic outputs.

These additions should not be smuggled into SEO3C V1 merely because they are technically possible.

---

# 39. Definition of done

SEO3C is complete only when:

- this specification is approved and committed;
- implementation uses the post-spec fresh Source Snapshot;
- deterministic fixtures pass;
- official-reference data and dates are disclosed;
- Simple Mode produces a useful result without requiring technical research by the visitor;
- Advanced Assumptions is collapsed by default and contains the technical scenario controls;
- weekly Treasury reference updater passes success/no-change/failure-safe tests and creates protected PRs rather than writing directly to `main`;
- debt terminology is accurate;
- USD treatment is unambiguous;
- web/CSV/PDF consume the same structured result object;
- chart and report pass Carrowmont visual standards;
- desktop/mobile visual review passes;
- Publisher is GREEN;
- release PRs merge in order with central QA last;
- Pages/IndexNow complete;
- live Automated QA is GREEN;
- Multi-Repo Guard is GREEN;
- a fresh Source Snapshot is taken and becomes the new authoritative baseline.

---

# 40. Final product principle

SEO3C should make one macro relationship understandable without sensationalism:

> **The cost of servicing debt depends not only on how much debt exists, but on the rates embedded in that debt, how quickly it refinances, and how much new borrowing is added.**

The page should let a reader test those relationships directly, see the assumptions, reproduce the math, understand the limits, and leave with a clearer view of U.S. debt-service mechanics — not a prediction of crisis.

Operationally, Carrowmont should do the data-maintenance work for the visitor: preload a dated official Treasury reference, check for a newer debt snapshot weekly, and preserve the last verified value whenever the external source cannot be safely validated.

---

**End of specification — SEO3C US Debt & Interest Cost Calculator**
