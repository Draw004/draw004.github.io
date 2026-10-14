# CARROWMONT MDC1C — MORTGAGE RATE RISE & PAYMENT STRESS TEST

## Product, Calculation, UX, Localization, Learn, Reporting, QA & Release Specification

**Status:** Final V1.0 specification-only document. Owner approval is represented by merging this specification release. Production code must not begin until the spec-only release is green and a fresh post-spec Source Snapshot is taken.  
**Authoritative design baseline:** Carrowmont Source Snapshot 60  
**Snapshot generated:** 2026-10-14T05:09:14Z  
**Main-site commit:** `9e38f8244f081ac9aa56624bbc5ef16f4237fc62`  
**Mortgage repository commit:** `35c3ec813e9dc6d1791290ebdd88bafb5dea911d`  
**Central QA commit:** `c00ec350207292c2fe149c689c1aee1ae454fab7`  

---

# 1. Owner-approved direction being formalized

MDC1C is the third controlled release of the Carrowmont Mortgage Decision Centre.

The owner has specifically challenged whether people naturally search for wording such as “household buffer if the rate rises.” The product direction is therefore refined as follows:

1. The primary search and acquisition question is **how much the mortgage / home-loan payment could increase if the interest rate rises**.
2. Household-budget stress remains the Carrowmont differentiator, but it is a secondary analysis rather than the primary search phrase.
3. The product should therefore be positioned as **Mortgage Rate Rise & Payment Stress Test**, not primarily as “Rate Shock / Budget”.
4. Search-intent language should match familiar borrower questions such as mortgage rate rise calculator, mortgage payment increase, payment stress test, EMI increase after a rate rise, renewal payment shock and rate-reset payment change.
5. Mortgage Decision Centre remains inside the existing `mortgage-payoff-calculator` repository.
6. The seven-core-tool homepage architecture remains unchanged.
7. Release order remains MDC1A Prepayment vs Investing → MDC1B Refinance / Balance Transfer Break-Even → **MDC1C Mortgage Rate Rise & Payment Stress Test**.
8. MDC1C must preserve mathematical separation from MDC1A and MDC1B. It does not compare investment returns and it does not compare refinance fees or term changes.
9. Central QA merges last.
10. No workflow files are expected.
11. Exact Publisher-layout browser rehearsal at desktop, 390 px and 360 px is mandatory before production handoff.

This document converts that direction into the implementation contract.

---

# 2. Release scope

MDC1C production is one controlled release with these public changes:

1. the existing Mortgage Decision Centre hub changes the **Rate Rise / Payment Stress** decision from Coming next to Live;
2. a new Mortgage Rate Rise & Payment Stress Test is published;
3. one primary Learn article is published for rate-rise / payment-stress methodology;
4. the Learn hub Home Loans & Mortgages category gains the new guide;
5. sitemap and contextual discovery paths are updated;
6. central QA gains deterministic, PDF, localization and browser protection for MDC1C.

After MDC1C, all four originally planned Mortgage Decision Centre decisions are Live:

- Payoff / Prepayment — Live;
- Prepay vs Invest — Live;
- Refinance / Transfer — Live;
- Rate Rise / Payment Stress — Live.

MDC1C must not invent a fifth placeholder decision.

---

# 3. Primary user question

> **How much could my mortgage or home-loan payment increase if the rate rises, renews or resets — and what would that do to my monthly budget?**

The tool must answer the payment question even if the user does not enter household-budget details.

Budget analysis is optional and must never block the core payment stress calculation.

---

# 4. Search-intent hierarchy

## 4.1 Primary acquisition intent

The primary search intent is:

> **How much will my mortgage payment increase if interest rates rise?**

Equivalent high-intent phrasing includes:

- mortgage rate rise calculator;
- mortgage payment increase calculator;
- mortgage payment stress test;
- mortgage payment shock calculator;
- mortgage renewal payment increase;
- mortgage rate reset payment calculator;
- home loan EMI increase after rate rise;
- repo-rate impact on home-loan EMI;
- home-loan rate rise calculator.

The tool must not force the phrase “household buffer” into primary SEO identity.

## 4.2 Secondary differentiation intent

After the payment impact is calculated, Carrowmont adds:

> **How much monthly money remains after the stressed mortgage payment and my entered essential outgoings?**

This is the product differentiator, not the primary search title.

---

# 5. Product purpose

MDC1C helps the user separate four questions that are often mixed together:

1. what the current scheduled payment is;
2. what the payment would be at a higher future rate while keeping the remaining amortization term unchanged;
3. how much of that change is caused by the rate itself;
4. what the higher payment would do to an optional user-entered monthly household budget.

The result must also separate:

- an immediate rate change from a rate change that happens at a future reset / renewal checkpoint;
- the current payment the borrower actually pays from the mathematically equivalent same-rate payment at the future reset checkpoint when those can differ because of a user-entered payment override;
- scheduled repayment frequency from monthly-equivalent household cash flow.

---

# 6. Product boundaries

MDC1C is educational planning software. It is not:

- lender advice;
- a prediction of future central-bank or mortgage rates;
- a lender affordability decision;
- a debt-to-income underwriting test;
- an eligibility or credit-score assessment;
- a recommendation to fix, float, refinance or prepay;
- a country-specific tax or regulatory stress test;
- a forecast of household income, inflation or living costs;
- a guarantee that a lender will recalculate payments in the modeled manner;
- a model of every variable-rate, tracker, offset, interest-only, negative-amortization or payment-cap product;
- a refinance-fee or term-change comparison; MDC1B remains the correct tool for that decision.

The result must use neutral language such as **modeled**, **under these assumptions**, **entered household figures**, **monthly equivalent** and **illustrative stress scenario**.

Carrowmont must not label a household as “safe”, “unsafe”, “approved”, “affordable” or “unaffordable”.

---

# 7. Architecture inheritance — non-negotiable

MDC1C inherits the current Mortgage Decision Centre architecture rather than introducing a separate design or storage model.

Mandatory inheritance includes:

- existing Carrowmont header/footer;
- `decision-centre.css` visual language unless a small extension is required;
- current mortgage `locale.js` country / region and currency universe;
- current `CarrowmontMortgageCore` repayment and country-convention primitives;
- current Canadian fixed-rate convention where already supported;
- current `carrowmontMortgageDecisionV1` local profile;
- explicit profile review before applying saved values;
- current report-standard / direct PDF architecture;
- privacy-first analytics behavior;
- current Learn article standard;
- current mobile overflow discipline;
- current Publisher / QA / Guard / Snapshot release discipline.

The existing public Mortgage Payoff, MDC1A and MDC1B engines must remain parity-clean.

---

# 8. Stable canonical routes

| Purpose | Canonical path |
|---|---|
| Mortgage / Home Loan Payoff | `/mortgage-payoff-calculator/` |
| Mortgage Decision Centre | `/mortgage-payoff-calculator/decision-centre.html` |
| MDC1A Prepayment vs Investing | `/mortgage-payoff-calculator/prepayment-vs-investing.html` |
| MDC1B Refinance Break-Even | `/mortgage-payoff-calculator/refinance-break-even.html` |
| **MDC1C Rate Rise & Payment Stress Test** | **`/mortgage-payoff-calculator/rate-rise-stress-test.html`** |
| MDC1C primary Learn guide | **`/mortgage-rate-rise-payment-stress.html`** |

No country-specific duplicate calculator URLs are created.

---

# 9. Search presentation

## 9.1 MDC1C tool

**Static title:**  
`Mortgage Rate Rise Calculator & Payment Stress Test | Carrowmont`

**Static meta description:**  
`See how much your mortgage or home-loan payment could rise if interest rates increase. Stress test future payments, monthly income share and optional household budget buffer.`

**Fallback H1:**  
`How much would your mortgage payment rise if rates increase?`

The runtime product label may use local terminology, but the canonical route and core search intent remain global.

## 9.2 Primary Learn article

**Canonical URL:**  
`https://carrowmont.com/mortgage-rate-rise-payment-stress.html`

**Title:**  
`How Much Could Your Mortgage Payment Rise if Rates Increase? | Carrowmont`

**H1:**  
`How much could your mortgage payment rise if rates increase?`

The article must use `Article` + `BreadcrumbList` structured data consistent with the current Learn cluster.

---

# 10. Decision Centre hub after MDC1C

The existing hub question remains:

> **What are you trying to decide?**

Cards remain in the same order.

## 10.1 Payoff / Prepayment

Live. Existing route unchanged.

## 10.2 Prepay vs Invest

Live. Existing route unchanged.

## 10.3 Refinance / Transfer

Live. Existing route unchanged.

## 10.4 Rate Rise / Payment Stress

Becomes Live.

Card title:

`Rate Rise / Payment Stress`

Card question:

> `How much could your payment increase if your rate resets, renews or rises — and what would that do to your monthly budget?`

Link:

`/mortgage-payoff-calculator/rate-rise-stress-test.html`

The hub should also offer a contextual Learn link to `/mortgage-rate-rise-payment-stress.html`.

After MDC1C there must be exactly four Live decision cards and zero Planned decision cards.

---

# 11. Country-aware product identity

The calculation engine remains universal. Country selection changes familiar terminology and explanatory wording only.

| Region | Preferred MDC1C wording |
|---|---|
| India | **Home Loan EMI Rate Rise Stress Test** |
| United States | **Mortgage Rate Rise & Payment Stress Test** |
| Canada | **Mortgage Renewal Payment Stress Test** |
| United Kingdom | **Mortgage Rate Rise / Remortgage Payment Stress Test** |
| Ireland | **Mortgage Rate Rise / Switch Payment Stress Test** |
| Australia | **Home Loan Rate Rise Stress Test** |
| New Zealand | **Home Loan Rate Rise Stress Test** |
| Other / International | **Mortgage / Home Loan Rate Rise Stress Test** |

Supporting terminology follows existing Mortgage Decision Centre conventions:

- India: home loan, EMI, tenure, rate reset / repricing;
- US: mortgage, payment, remaining term, reset / renewal / refinance where appropriate;
- Canada: mortgage, payment, renewal, amortization;
- UK / Ireland: mortgage, payment, remortgage / switch / reset where appropriate;
- Australia / New Zealand: home loan, repayment, loan term, rate rise;
- fallback: mortgage / home loan, repayment, remaining term, rate change.

The US copy must explicitly note that a typical fully fixed-rate mortgage does not automatically change payment merely because market rates rise; the tool is for a reset, renewal, ARM adjustment, refinance or other future-rate scenario entered by the user.

---

# 12. Currency and locale behavior

MDC1C reuses the existing mortgage locale system.

Rules:

1. country / region and currency remain separate controls;
2. currency changes display and interpretation of monetary values only;
3. Carrowmont performs no FX conversion;
4. changing currency after values are entered leaves numeric values unchanged and reinterprets them in the new currency;
5. country may change labels and explanatory text but not household-budget thresholds or lender rules;
6. country selection must not silently insert a regulatory stress rate.

---

# 13. Shared mortgage profile and explicit reuse

MDC1C reads the existing local-only `carrowmontMortgageDecisionV1` profile.

Reusable facts are:

- country;
- currency;
- outstanding balance;
- annual mortgage / home-loan rate;
- remaining years;
- remaining months;
- repayment frequency;
- optional current scheduled-payment override.

Nothing is applied silently.

The banner must explain what is available and provide explicit actions:

- **Use these loan details**;
- **Start fresh**;
- **Clear saved details**.

Unlike MDC1B, a valid saved current-payment override may be useful in MDC1C because the tool compares future cash flow with what the household actually pays today. If applied, it must remain visibly disclosed as an override.

MDC1C must never save:

- stressed future rate;
- rate-rise scenario ladder;
- months until rate change;
- household income;
- essential expenses;
- calculated buffers;
- results.

Only reusable current-loan facts may be written back to the shared profile.

---

# 14. Rate-change timing — immediate and future reset

MDC1C V1 must support both:

- **0 months until rate change** — immediate stress scenario;
- a user-entered future reset / renewal delay in months.

Input label:

`Months until the higher rate could apply`

Default:

`0`

Rules:

1. zero means the stressed rate is applied to the current balance now;
2. a positive value projects the current loan forward at the current rate and current scheduled payment until the nearest modeled repayment checkpoint;
3. the projected balance at that checkpoint becomes the balance used for the stressed-rate payment calculation;
4. the stressed payment is then calculated over the **remaining amortization term after that checkpoint**;
5. the tool must disclose that lender reset dates may occur between modeled repayment checkpoints and V1 snaps the timing to the nearest scheduled repayment period;
6. `months until rate change` must be less than the remaining loan term.

This timing feature is mandatory because renewal / reset searches are common in markets where the future rate applies after a fixed period rather than immediately.

---

# 15. Required current-loan inputs

## 15.1 Outstanding balance

Required. Must be greater than zero.

## 15.2 Current annual interest rate

Required. Range:

`0%` to `50%` inclusive.

## 15.3 Remaining term

Required as years + months.

Rules:

- total term must be greater than zero;
- months must be 0–11;
- total modeled term must not exceed the existing mortgage-core safety ceiling.

## 15.4 Scheduled repayment frequency

Reuse existing supported mortgage frequencies:

- monthly;
- biweekly;
- fortnightly;
- weekly.

The same frequency is used before and after the modeled rate change in V1.

## 15.5 Optional current-payment override

Existing shared profile behavior may be reused.

If selected:

- the amount must be greater than zero;
- it is treated as the current scheduled cash payment for projection and current-budget comparison;
- V1 must reject an override that is not greater than first-period interest because negative-amortization products are outside scope;
- the stressed future payment is still recalculated mathematically to amortize the projected balance over the remaining term.

The UI must state that a payment override can make the “change from what you pay today” differ from the pure rate-only change.

---

# 16. Stressed-rate inputs

MDC1C must provide two related stress mechanisms.

## 16.1 Custom future annual rate

Required for the hero result.

Label:

`Future / stressed annual rate`

Default:

`current rate + 1.00 percentage point`

The UI should show the implied increase or decrease in **percentage points**, for example:

`7.00% = +1.00 percentage point from 6.00%`

The future rate may be lower, equal or higher than the current rate. The tool remains a scenario calculator rather than blocking non-rise cases.

Range:

`0%` to `50%` inclusive.

## 16.2 Standard rate-stress ladder

The tool automatically calculates these additional rate-increase scenarios from the current rate:

- +0.25 percentage point;
- +0.50 percentage point;
- +1.00 percentage point;
- +2.00 percentage points;
- +3.00 percentage points.

The UI must say **percentage points**, not “percent increase”.

If a standard row would exceed the V1 50% annual-rate ceiling, that row is omitted or clearly marked outside the modeled ceiling. It must not be silently capped.

---

# 17. Optional household-budget inputs

Budget analysis is optional.

The core payment result must work with these fields blank.

## 17.1 Monthly take-home household income

Label:

`Monthly take-home household income`

Definition:

Money actually available to the household after tax and payroll deductions, entered by the user.

Carrowmont does not calculate tax.

## 17.2 Monthly essential non-mortgage outgoings

Label:

`Monthly essential outgoings excluding this mortgage`

Helper examples may include:

- food;
- utilities;
- transport;
- insurance;
- childcare;
- required debt payments;
- other recurring essential commitments.

The user decides what to include.

## 17.3 Budget activation rule

Budget analysis becomes active only when:

- take-home household income is greater than zero; and
- essential outgoings are zero or greater.

If income is blank / zero, payment stress still works and all household-buffer outputs are hidden or marked optional rather than erroneous.

---

# 18. Core amortization rules

MDC1C must reuse existing `CarrowmontMortgageCore` conventions rather than reimplementing incompatible mortgage math.

Mandatory rules:

1. same repayment frequency before and after the stress point;
2. same remaining amortization term, reduced only by elapsed time until the rate-change checkpoint;
3. no term extension or shortening in MDC1C;
4. no refinance fee or cashback logic;
5. current country-specific fixed-rate payment convention is reused, including the existing Canadian fixed-rate convention;
6. zero-rate math is supported;
7. exact internal values are retained and UI rounding is presentation-only.

If the user wants to change the term or include refinance costs, the result should link contextually to MDC1B rather than overloading MDC1C.

---

# 19. Projected balance at the rate-change checkpoint

Let:

- `B0` = current outstanding balance;
- `P0` = current scheduled payment, modeled or overridden;
- `i0` = current periodic interest rate;
- `k` = modeled repayment periods until rate change.

For `k = 0`:

`B_reset = B0`

For `k > 0`, project the balance for exactly `k` scheduled repayment periods using current-rate amortization and `P0`.

The projection must not run a new payoff formula over only `k` periods. It must model the existing loan for `k` periods using its current scheduled payment.

This distinction is a deterministic QA requirement.

The result must expose:

- modeled reset checkpoint;
- projected balance at reset;
- remaining repayment periods after reset.

---

# 20. Three payment references — mandatory transparency

MDC1C must keep three payment concepts separate.

## 20.1 Current scheduled payment today

`P_today`

This is:

- the user-entered current-payment override when explicitly enabled; otherwise
- the mathematically modeled payment for the current balance, current rate and current remaining term.

## 20.2 Same-rate reference payment at the reset checkpoint

`P_same_rate`

This is the payment required to amortize `B_reset` over the remaining term at the **current rate**.

When no current-payment override is used and the loan is modeled conventionally, this should reconcile to the current formula payment within numeric tolerance.

If an override is used, it may differ from `P_today`.

This is the correct reference for isolating the rate-only effect.

## 20.3 Stressed payment at the reset checkpoint

`P_stress`

This is the payment required to amortize `B_reset` over the same remaining term at the future / stressed annual rate.

No term change is allowed in this comparison.

---

# 21. Pure rate effect vs change from today

Two changes must be calculated separately.

## 21.1 Pure rate-only payment effect

`rate_effect = P_stress - P_same_rate`

This isolates the rate effect at the reset checkpoint.

## 21.2 Cash-flow change from what the user pays today

`today_effect = P_stress - P_today`

This is useful when the current payment is overridden or intentionally above the formula payment.

If `P_today` and `P_same_rate` are equal within tolerance, the UI may visually collapse the duplicate explanation while retaining both values in the result object.

---

# 22. Monthly-equivalent normalization

Household income and essential outgoings are monthly figures.

For non-monthly mortgage payment frequencies, MDC1C must convert scheduled payment amounts to monthly equivalents before budget analysis.

Let `m` = repayments per year.

`monthly_equivalent = scheduled_payment × m / 12`

Examples:

- monthly: × 12 / 12;
- biweekly: × 26 / 12;
- fortnightly: × 26 / 12;
- weekly: × 52 / 12.

The tool must not compare a weekly or biweekly payment directly with monthly income.

Both the actual scheduled payment and monthly equivalent must remain visible where useful.

---

# 23. Standard scenario ladder output

Each standard stress row must contain at least:

- stressed annual rate;
- rate change in percentage points;
- stressed scheduled payment;
- stressed monthly equivalent;
- rate-only payment increase / decrease;
- percentage payment change versus same-rate reference;
- optional monthly budget buffer when budget analysis is active.

The custom future-rate scenario must be visually distinguished from the standard ladder but use the same core calculation function.

---

# 24. Payment-change metrics

For every scenario calculate:

1. scheduled payment amount at the repayment frequency;
2. monthly-equivalent payment;
3. absolute rate-only change;
4. percentage rate-only change:

`(P_stress - P_same_rate) / P_same_rate × 100`

5. annualized cash-flow difference based on monthly equivalent:

`monthly_equivalent_change × 12`

The UI must not call principal repayment an “interest cost increase”.

MDC1C is primarily a cash-flow stress tool, not a lifetime-interest comparison.

---

# 25. Household-budget calculation

When optional budget inputs are active:

Let:

- `I` = monthly take-home household income;
- `E` = monthly essential outgoings excluding this mortgage;
- `M_today` = monthly equivalent of `P_today`;
- `M_stress` = monthly equivalent of `P_stress`.

Current entered monthly buffer:

`buffer_today = I - E - M_today`

Stressed monthly buffer:

`buffer_stress = I - E - M_stress`

Change in buffer versus today:

`buffer_change = buffer_stress - buffer_today`

The result must describe a negative value as a **modeled monthly shortfall under the entered assumptions**, not as a lender or financial-advice verdict.

---

# 26. Mortgage share of take-home income

When budget analysis is active:

`mortgage_share = M_stress / I × 100`

The tool may show both current and stressed shares.

This is a descriptive household cash-flow ratio only.

Carrowmont must not present a universal “healthy”, “approved”, “safe” or lender-qualified threshold because underwriting standards and household circumstances differ.

---

# 27. Zero-buffer stress rate

MDC1C should calculate a useful secondary threshold:

> **At what modeled mortgage rate would the entered monthly household buffer reach approximately zero?**

This is not a recommended maximum rate. It is a mathematical crossover under the user-entered income and expense assumptions.

Available monthly amount for this mortgage:

`A = I - E`

Convert `A` to the scheduled-payment frequency:

`target_payment = A × 12 / m`

Solve for annual rate `r*` such that:

`scheduledPayment(B_reset, periodicRate(r*), remaining_periods) ≈ target_payment`

Implementation may use a stable binary search over `0%` to `50%` using the existing payment convention.

Interpretation rules:

1. if `I <= 0`, do not calculate;
2. if `A <= 0`, say the entered essential outgoings already use all or more of take-home income before this mortgage;
3. if even a 0% mortgage payment is greater than `A`, say no non-negative modeled rate leaves a positive buffer under these assumptions;
4. if the threshold is above the 50% V1 ceiling, say it is above the modeled ceiling rather than inventing a value;
5. if the current entered budget is already negative, lead with that fact and do not frame the crossover as remaining “headroom”.

The UI label should be neutral, for example:

`Modeled zero-buffer rate`

not:

`Maximum safe rate`.

---

# 28. Budget-state language

MDC1C may use only neutral sign-based states:

- **Monthly surplus remains** — buffer greater than zero;
- **Approximately break-even** — buffer within numeric money tolerance of zero;
- **Modeled monthly shortfall** — buffer below zero.

There is no red/amber/green affordability rating and no arbitrary universal household-risk score.

Visual styling may emphasize a negative modeled shortfall without labeling the user financially unsafe.

---

# 29. Rate-change timing assumption for budget figures

If the higher rate begins in the future, V1 holds entered household income and essential outgoings constant between today and the modeled reset date.

The UI must disclose:

> `Income and non-mortgage expenses are held constant in this stress test. Carrowmont does not forecast wages, inflation or future household costs.`

The tool must not silently index income or expenses.

---

# 30. Result hierarchy

The result hierarchy should be:

## 30.1 Hero result

Primary custom scenario:

- future / stressed rate;
- stressed scheduled payment;
- **rate-only payment increase or decrease**;
- percentage payment change;
- monthly-equivalent change.

Headline language example:

> `At 7.00%, the modeled monthly payment is $3,101 — about $235 more per month from the rate change alone.`

## 30.2 Timing card

Show:

- rate applies now / in X months;
- projected balance at reset;
- remaining term at reset.

## 30.3 Optional household result

When enabled:

- current monthly buffer;
- stressed monthly buffer;
- change in buffer;
- mortgage share of take-home income;
- modeled zero-buffer rate when applicable.

## 30.4 Scenario ladder

Show +0.25 / +0.50 / +1 / +2 / +3 percentage-point rows.

## 30.5 Methodology and next-decision links

Contextual links:

- if fees or term changes matter → MDC1B Refinance Break-Even;
- if extra payments are being considered → Payoff / Prepayment;
- if the user is deciding between prepaying and investing → MDC1A.

---

# 31. Comparison table

The visible scenario table is the source of truth and must remain usable without the chart.

Minimum columns:

| Scenario | Annual rate | Scheduled payment | Monthly equivalent | Rate-only change | Payment % change | Budget buffer* |
|---|---:|---:|---:|---:|---:|---:|

`*` Budget buffer appears only when household analysis is active.

The current-rate baseline row must be included.

The custom scenario may be pinned or highlighted.

---

# 32. Scenario chart

MDC1C should provide one accessible chart that reinforces rather than replaces the table.

Preferred design:

- x-axis: annual mortgage rate;
- y-axis: monthly-equivalent mortgage payment;
- plotted points: current rate, standard stress ladder and custom stressed rate;
- when budget analysis is active, show a clearly labeled horizontal reference line for the monthly amount available for the mortgage (`I - E`).

This makes the zero-buffer crossover visually understandable without requiring a dual-axis chart.

Requirements:

- visible textual summary near the chart;
- accessible labels / descriptions;
- no tooltip-only critical information;
- no horizontal overflow at 1280, 390 or 360 px.

---

# 33. Core result object

The deterministic core should expose one serializable object similar in discipline to MDC1A/MDC1B.

Minimum structure:

```js
{
  ok,
  version,
  input: {
    country,
    currency,
    balance,
    annualRatePct,
    remainingYears,
    remainingMonths,
    paymentFrequency,
    useCurrentPayment,
    currentPayment,
    monthsUntilRateChange,
    stressedAnnualRatePct,
    householdBudgetEnabled,
    monthlyTakeHomeIncome,
    monthlyEssentialOutgoings
  },
  current: {
    convention,
    periodsPerYear,
    totalPeriods,
    formulaPayment,
    paymentToday,
    monthlyEquivalentToday
  },
  reset: {
    requestedMonths,
    modeledPeriods,
    modeledMonths,
    projectedBalance,
    remainingPeriods,
    sameRateReferencePayment,
    sameRateMonthlyEquivalent
  },
  customScenario: {
    annualRatePct,
    rateChangePctPoints,
    payment,
    monthlyEquivalent,
    rateOnlyChange,
    todayChange,
    rateOnlyPctChange,
    annualCashFlowChange,
    budget
  },
  ladder: [
    {
      deltaPctPoints,
      annualRatePct,
      payment,
      monthlyEquivalent,
      rateOnlyChange,
      rateOnlyPctChange,
      budget
    }
  ],
  budget: {
    applicable,
    monthlyTakeHomeIncome,
    monthlyEssentialOutgoings,
    availableForMortgage,
    bufferToday,
    customBuffer,
    customBufferChange,
    currentMortgageSharePct,
    stressedMortgageSharePct,
    zeroBufferRatePct,
    zeroBufferStatus
  },
  messages: []
}
```

UI, Copy Summary, chart and PDF must consume this deterministic result rather than recalculate independent business logic.

---

# 34. Numeric tolerance and deterministic status rules

Use a small numeric epsilon for comparisons.

Presentation rounding must not drive calculation status.

Recommended money comparison tolerance:

- internal: `1e-8` scale where practical;
- display: currency formatting according to locale;
- “approximately break-even” budget state may use an absolute amount tolerance of `0.01` in the entered currency before formatting.

Rate threshold binary search should be stable to at least `0.0001` percentage point internally; UI may present two decimals unless a closer value materially improves interpretation.

---

# 35. Input validation

Mandatory validation includes:

1. balance > 0;
2. current annual rate 0–50%;
3. remaining term > 0 and within core ceiling;
4. months component 0–11;
5. supported repayment frequency;
6. current payment override > 0 when enabled;
7. current payment override must exceed first-period interest in V1;
8. months until rate change >= 0;
9. rate-change timing must occur before final remaining term;
10. custom stressed annual rate 0–50%;
11. household income >= 0;
12. essential outgoings >= 0;
13. blank optional budget fields must not be coerced into a false budget analysis;
14. NaN, Infinity and malformed values must fail cleanly.

Validation messages should tell the user what to correct without blaming language.

---

# 36. Important edge cases

## 36.1 Future rate equals current rate

Rate-only payment effect should reconcile to zero within tolerance.

## 36.2 Future rate is lower

Show a modeled payment decrease. Do not block the scenario merely because the product is named rate-rise stress test.

## 36.3 Current rate is zero

Payment math must remain valid.

## 36.4 Immediate stress

With zero months until rate change, projected reset balance equals current balance.

## 36.5 Future reset

Projection must use current scheduled payment for elapsed periods, not incorrectly amortize the balance over only the pre-reset period.

## 36.6 Current-payment override

Pure rate effect compares stressed payment with same-rate reference at reset; cash-flow change from today separately compares stressed payment with the override.

## 36.7 Budget already negative today

Lead with the current modeled shortfall; do not present “headroom” language.

## 36.8 Essential expenses exceed income before mortgage

State that the entered non-mortgage outgoings already exceed take-home income.

## 36.9 Zero-rate payment exceeds available mortgage amount

State that no non-negative modeled rate leaves a positive monthly buffer under the entered assumptions.

## 36.10 Non-monthly repayment frequency

Household budget must use monthly-equivalent payment, not raw per-payment amount.

## 36.11 Standard ladder exceeds 50%

Do not silently cap.

## 36.12 Rate change after remaining term

Invalid.

## 36.13 Loan pays off before entered reset because of a high override

If projection reaches zero before the requested reset checkpoint, explain that the modeled loan is already repaid before the higher rate applies; stressed payment becomes zero and no rate stress applies to that modeled loan.

---

# 37. Default values

Defaults should be useful but clearly editable.

Suggested defaults:

## India

- balance: `5,000,000`;
- current rate: `8.50%`;
- remaining term: `15 years`;
- repayment frequency: monthly;
- months until rate change: `0`;
- custom stressed rate: `9.50%`;
- budget fields blank / optional.

## Non-India fallback

- balance: `400,000`;
- current rate: `6.00%`;
- remaining term: `20 years`;
- repayment frequency: monthly;
- months until rate change: `0`;
- custom stressed rate: `7.00%`;
- budget fields blank / optional.

No default household income or essential expense should be prefilled because that could look like a normative affordability benchmark.

---

# 38. UX flow

Recommended page flow:

1. locale / currency;
2. explicit saved-profile banner when available;
3. **Your current mortgage / home loan**;
4. **When could the rate change?**;
5. **Stress the rate**;
6. primary payment result;
7. optional **Add household budget context** disclosure / section;
8. scenario ladder;
9. chart;
10. methodology;
11. Copy Summary / PDF;
12. Learn guide and related Mortgage Decision Centre links.

Budget inputs should not crowd the initial search-intent flow. The user should be able to answer the payment question first.

---

# 39. Local profile UX

The profile banner must show a concise human-readable summary before application.

Applying saved details must:

- validate the profile;
- update locale / currency from the saved profile;
- populate current-loan facts;
- populate current-payment override only when the saved profile validly contains one;
- leave rate-change timing, stressed rate and household-budget fields untouched except for sensible stress-rate default recomputation from the applied current rate.

A status message must disclose whether an override was applied.

Saving from MDC1C must save current-loan facts only.

---

# 40. Privacy

MDC1C remains local-first.

Household income and expense figures are especially sensitive in practical use and must not be written to the shared mortgage profile.

No login is required.

Analytics must not send raw balances, rates, income, expenses, payment amounts or calculated household buffers.

Permitted analytics should remain event-level / privacy-first, for example:

- tool viewed;
- budget section opened;
- report generated;
- summary copied;
- Learn link opened.

---

# 41. Result language and neutrality

Permitted phrasing:

- `modeled payment`;
- `rate-only increase`;
- `change from what you pay today`;
- `monthly equivalent`;
- `monthly surplus remains`;
- `modeled monthly shortfall`;
- `under the entered income and expense assumptions`;
- `modeled zero-buffer rate`.

Avoid:

- `safe rate`;
- `maximum affordable rate`;
- `you can afford`;
- `you cannot afford`;
- `you should refinance`;
- `you should fix your rate`;
- `rates will rise to...`;
- `this is what your lender will charge`.

---

# 42. Methodology section on the tool

The visible methodology must explain, in plain language:

1. how the current scheduled payment is modeled;
2. how a current-payment override changes the projection;
3. how the balance is projected to a future reset / renewal checkpoint;
4. why the remaining term is held constant after the rate change;
5. the distinction between pure rate effect and change from today;
6. monthly-equivalent normalization for weekly / biweekly / fortnightly schedules;
7. optional household buffer math;
8. how the zero-buffer crossover is solved;
9. why the tool does not predict future rates or lender affordability.

A direct link to the Learn guide must be present.

---

# 43. Primary Learn guide

The primary Learn guide should answer search intent before introducing the tool.

Minimum sections:

1. Why a higher rate changes the payment;
2. Percentage points versus percent increase;
3. Immediate rate rise versus renewal / reset later;
4. Why projected balance at renewal matters;
5. Same term versus term changes;
6. Monthly payment versus monthly-equivalent cash flow;
7. How to stress test household cash flow without pretending there is one universal safe ratio;
8. Why fixed-rate US borrowers may not see an automatic payment change until reset / refinance / ARM adjustment;
9. Why income and expenses should be treated as assumptions, not forecasts;
10. When refinance fees and term changes require MDC1B instead;
11. Worked examples;
12. methodology / limitations;
13. direct CTA to MDC1C.

The article should use authoritative educational references appropriate to the topic when production content is written. No unsupported universal affordability threshold should be introduced.

---

# 44. Tool ↔ Learn paths

Required bidirectional paths:

- MDC1C tool → primary Learn guide;
- primary Learn guide → MDC1C tool near the first actionable section;
- shared bottom Learn CTA → MDC1C tool;
- Decision Centre Rate Rise card → tool;
- Decision Centre Rate Rise Learn link → guide;
- Learn hub Home Loans & Mortgages category → guide.

Contextual cross-links from the Learn guide should also point to MDC1B when fees / term changes are discussed.

---

# 45. Tools Hub and homepage rule

MDC1C is a Mortgage Decision Centre sub-tool.

The seven-core-tool homepage architecture remains unchanged.

`tools.html` should continue to present the Mortgage / Home Loan Payoff family as the housing core tool and route into the Mortgage Decision Centre rather than promoting MDC1C as an eighth core homepage tool.

Direct discovery can come from:

- Decision Centre;
- Learn content;
- search engines;
- contextual mortgage links;
- sitemap.

---

# 46. Copy Summary

Copy Summary must come from the current deterministic result object.

Minimum contents:

- localized product identity;
- country and currency;
- current balance;
- current rate;
- remaining term;
- repayment frequency;
- payment today;
- months until rate change;
- projected reset balance;
- custom stressed rate;
- same-rate reference payment;
- stressed payment;
- rate-only change;
- percentage payment change;
- monthly-equivalent change;
- optional budget inputs;
- optional current and stressed buffer;
- optional zero-buffer rate;
- methodology / educational-use caveat.

Raw household budget values must not be persisted merely because they were copied.

---

# 47. PDF Decision Report

MDC1C should produce an exact **three-page PDF** from the same deterministic result object.

Suggested filename:

`carrowmont-mortgage-rate-rise-stress-report.pdf`

## Page 1 — Payment stress summary

- product identity;
- current mortgage facts;
- rate-change timing;
- custom stressed rate;
- payment today;
- same-rate reference;
- stressed payment;
- rate-only increase / decrease;
- monthly-equivalent change.

## Page 2 — Scenario ladder and budget impact

- baseline + standard stress rows;
- projected balance at reset;
- optional household income / outgoings;
- optional buffer under custom scenario;
- optional zero-buffer rate;
- explanatory note that these are user-entered assumptions, not lender underwriting.

## Page 3 — Assumptions, methodology and next decisions

- same-term isolation rule;
- reset-date projection method;
- repayment-frequency monthly-equivalent method;
- income / expenses held constant;
- no future-rate prediction;
- country / lender limitations;
- links / next-decision references for payoff, prepay-vs-invest and refinance break-even.

PDF generation must not depend on a screenshot of the live page.

---

# 48. Accessibility and responsive requirements

Mandatory:

- real labels for every form control;
- keyboard-operable controls;
- visible focus states inherited from current system;
- chart has text alternative / visible scenario table;
- status messages exposed accessibly where appropriate;
- no important result conveyed by color alone;
- no horizontal overflow at desktop, 390 px or 360 px;
- long localized labels must wrap;
- table may use an intentional contained horizontal scroller on narrow screens if the page itself does not overflow.

---

# 49. Deterministic fixture set — minimum

Production implementation must include at least the following deterministic fixtures.

## Fixture A — US immediate +1 pp

- balance: 400,000;
- current rate: 6.00%;
- remaining term: 20 years;
- monthly;
- reset: 0 months;
- stressed rate: 7.00%.

Expected approximately:

- current formula payment: `2,865.7242339`;
- stressed payment: `3,101.1957425`;
- rate-only increase: `235.4715086`.

## Fixture B — US immediate +2 pp

Same baseline, stressed rate 8.00%.

Expected approximately:

- stressed payment: `3,345.7602760`;
- rate-only increase: `480.0360421`.

## Fixture C — US future reset in 24 months

Same 400,000 / 6.00% / 20-year baseline; reset after 24 months; stressed rate 7.00%.

Expected approximately:

- projected reset balance: `377,982.9400320`;
- remaining periods: `216`;
- stressed payment: `3,082.4590810`;
- pure rate-only increase remains approximately `216.7348471` at the reset checkpoint.

This fixture must specifically catch the incorrect implementation that amortizes 400,000 over only 24 months.

## Fixture D — India immediate +1 pp

- balance: 5,000,000;
- current rate: 8.50%;
- remaining term: 15 years;
- monthly;
- stressed rate: 9.50%.

Expected approximately:

- current payment: `49,236.9778963`;
- stressed payment: `52,211.2341432`;
- increase: `2,974.2562469`.

## Fixture E — Canada convention with 36-month renewal timing

- balance: 500,000;
- current rate: 5.00%;
- remaining amortization: 25 years;
- monthly;
- Canada fixed convention;
- reset after 36 months;
- stressed rate: 6.00%.

Expected approximately:

- current payment: `2,908.0249252`;
- projected reset balance: `467,237.1164811`;
- stressed payment: `3,171.2727210`;
- increase: `263.2477958`.

## Fixture F — zero-rate baseline

- balance: 100,000;
- current rate: 0%;
- 10 years;
- monthly;
- stressed rate: 1.00%.

Expected approximately:

- current payment: `833.3333333`;
- stressed payment: `876.0412137`.

## Fixture G — household buffer crossover

Use Fixture A baseline plus:

- monthly take-home income: 6,500;
- monthly essential outgoings: 3,500.

Expected approximately:

- current buffer: `134.2757661`;
- custom 7.00% buffer: `-101.1957425`;
- modeled zero-buffer rate: `6.57508198%`.

## Fixture H — future-reset buffer crossover

Use Fixture C plus the same 6,500 income / 3,500 outgoings.

Expected modeled zero-buffer rate approximately:

`6.62396665%`.

## Fixture I — India buffer crossover

Use Fixture D plus:

- monthly take-home income: 120,000;
- essential outgoings: 65,000.

Expected zero-buffer rate approximately:

`10.41281417%`.

## Fixture J — Canada buffer crossover

Use Fixture E plus:

- monthly take-home income: 7,000;
- essential outgoings: 3,500.

Expected zero-buffer rate approximately:

`7.19736190%`.

## Fixture K — current-payment override

- 400,000 balance;
- 6.00%;
- 20 years;
- current payment override 3,000;
- reset after 24 months;
- stressed rate 7.00%.

Expected approximately:

- projected balance: `374,568.0447589`;
- stressed payment: `3,054.6105360`;
- change from today: `54.6105360`;
- pure rate effect must be calculated against the same-rate reset reference, not blindly against the 3,000 override.

## Fixture L — non-monthly normalization

400,000 / 6.00% / 20 years / biweekly should produce a per-payment amount around `1,321.7229762` and monthly equivalent around `2,863.7331151`.

At 7.00%, biweekly stressed payment should be around `1,430.2931821` and monthly equivalent around `3,098.9685612`.

Budget math must use the monthly equivalents.

## Fixture M — future rate equals current rate

Rate-only change must be zero within tolerance.

## Fixture N — future rate below current rate

Payment change must be negative and the UI must say modeled decrease rather than failing validation.

## Fixture O — budget unavailable

With blank budget inputs, all payment outputs must still calculate and budget object must report `applicable: false`.

## Fixture P — expenses exceed income

Budget result must identify the entered non-mortgage shortfall before mortgage payment without inventing a “safe rate”.

## Fixture Q — zero-rate payment already exceeds available-for-mortgage amount

Zero-buffer status must report that no non-negative modeled mortgage rate leaves a positive buffer under the entered assumptions.

## Fixture R — rate-change timing after payoff

If a valid high current-payment override repays the modeled loan before the entered reset date, the result must state that the modeled loan is repaid before the stressed rate would apply.

At least 18 deterministic cases should therefore be available across unit/source-contract/browser layers.

---

# 50. Existing regression protection

MDC1C must not change core economics for:

- Mortgage Payoff;
- MDC1A Prepayment vs Investing;
- MDC1B Refinance Break-Even.

Regression gates must preserve:

- existing `core.js` behavior unless a separately justified bug fix is approved;
- MDC1A deterministic fixtures;
- MDC1B durable break-even fixtures;
- Decision Centre routing;
- shared profile schema version 1;
- Learn hub structure;
- seven-core homepage architecture.

Prefer a separate `rate-rise-stress-test-core.js` rather than modifying existing decision engines.

---

# 51. Browser QA — MDC1C

Minimum browser QA should cover:

1. Decision Centre has exactly four Live cards and zero Planned cards;
2. Rate Rise / Payment Stress card links to the canonical MDC1C tool;
3. canonical title, meta description and canonical URL;
4. immediate +1 pp custom scenario;
5. standard +0.25 / +0.50 / +1 / +2 / +3 pp ladder;
6. future reset projection uses projected balance rather than an incorrect short-term amortization;
7. current-payment override keeps pure rate effect separate from change from today;
8. household budget optionality;
9. positive buffer state;
10. modeled shortfall state;
11. zero-buffer rate threshold;
12. non-monthly monthly-equivalent normalization;
13. representative India / US / Canada / UK / Australia terminology;
14. explicit saved-profile application;
15. Copy Summary;
16. exact three-page PDF;
17. Tool ↔ Learn links;
18. sitemap presence;
19. desktop, 390 and 360 px overflow protection;
20. existing MDC1A and MDC1B key routes remain functional.

QA selectors must avoid Playwright strict-mode ambiguity by scoping link selectors deliberately when duplicate contextual links are valid.

Seeded-profile tests must not clear the profile again during the reload used to consume it.

---

# 52. PDF QA gate

Publisher QA must verify:

- generated file begins with `%PDF`;
- exact page count is 3;
- suggested filename is `carrowmont-mortgage-rate-rise-stress-report.pdf`;
- report generation uses the current result;
- representative payment and rate values from the live scenario are present in the report-generation data path;
- report does not silently omit the educational / assumptions caveat.

---

# 53. Source-contract expectations after implementation

Future MDC1C source-contract additions should protect at least:

- exact canonical MDC1C route;
- Decision Centre exactly four Live / zero Planned decisions;
- tool and Learn canonical URLs;
- tool title / search identity;
- separate `rate-rise-stress-test-core.js`;
- reset projection logic;
- same-rate reference payment;
- custom + standard stress scenarios;
- percentage-point wording;
- optional household budget;
- monthly-equivalent normalization;
- zero-buffer rate method;
- no arbitrary safe/unsafe threshold language;
- US fixed-rate explanatory note;
- profile schema unchanged;
- household income / expenses not written to shared profile;
- three-page PDF architecture;
- Tool ↔ Learn paths;
- sitemap inclusion;
- seven-core homepage unchanged;
- no new workflow files.

---

# 54. Red-prevention production release gate

Before production handoff, the exact packaged bundle must pass:

1. manifest base/new SHA-256 verification;
2. ZIP integrity;
3. JavaScript syntax checks;
4. JSON-LD parse checks for Learn content;
5. sitemap XML parse;
6. deterministic fixtures;
7. source contract against exact staged bundle;
8. Multi-Repo Guard-layout source-contract simulation;
9. staged Chrome browser QA on the exact staged bundle;
10. exact PDF generation check;
11. desktop / 390 / 360 layout checks;
12. no workflow files included.

The package itself, not an earlier working directory, is the release candidate.

---

# 55. Production repository scope

Expected production repositories:

1. `mortgage-payoff-calculator`;
2. `draw004.github.io`;
3. `carrowmont-qa`.

Expected production PR count: **3**.

Other six core-tool repositories remain unchanged.

No workflow file change is expected.

---

# 56. Production merge order

Mandatory merge order:

1. `mortgage-payoff-calculator`;
2. `draw004.github.io`;
3. `carrowmont-qa` — last.

Post-merge sequence:

**Pages → Automated QA → Multi-Repo Guard → fresh Source Snapshot → indexing.**

---

# 57. Specification-only release scope

This specification release changes only:

`draw004.github.io/docs/CARROWMONT_MDC1C_RATE_RISE_PAYMENT_STRESS_SPEC_FINAL.md`

It contains no production calculator code, no HTML route, no Learn article, no QA change and no workflow change.

Expected Publisher result for the spec-only bundle: **1 PR** in `draw004.github.io`.

---

# 58. Specification approval and baseline rule

Production implementation must not begin from Snapshot 60 after this specification is merged.

Required sequence:

1. publish this spec-only release;
2. merge the single generated main-site PR;
3. verify deployment / normal gates as appropriate;
4. run a fresh Source Snapshot;
5. that post-spec snapshot becomes the authoritative MDC1C production baseline;
6. build the production release only from that fresh snapshot.

This prevents production manifests from targeting a pre-spec commit.

---

# 59. Out of scope for MDC1C V1

Explicitly deferred:

- future-rate forecasting;
- central-bank probability models;
- live lender rates;
- lender product comparison;
- country regulatory stress-test rules;
- automatic tax calculations;
- gross-income to net-income conversion;
- inflation / wage-growth forecast;
- household expense inflation;
- term extension / shortening at rate reset;
- refinance fees / cashback / penalties;
- interest-only products;
- offset-account modeling;
- payment caps / floors;
- negative-amortization loans;
- multiple mortgages;
- HELOC / revolving credit modeling;
- rental-income underwriting;
- lender DTI / LTV approval logic;
- recommendation to fix, float, refinance or prepay;
- new homepage core-tool slot;
- login / cloud profile.

These may be future controlled extensions only if justified.

---

# 60. Definition of done — specification

The specification is complete when it unambiguously locks:

- search-intent-first product positioning;
- route and title;
- four-live-card Decision Centre end state;
- country terminology;
- current loan inputs;
- immediate and future reset timing;
- current payment override treatment;
- custom rate + standard stress ladder;
- same-term stressed-payment calculation;
- pure rate effect versus change from today;
- monthly-equivalent normalization;
- optional household budget;
- sign-based neutral budget states;
- zero-buffer mathematical crossover;
- result hierarchy;
- Learn content;
- PDF / Copy Summary;
- deterministic fixtures;
- browser QA;
- source-contract expectations;
- release scope and merge order;
- post-spec fresh-snapshot requirement.

---

# 61. Definition of done — future MDC1C production

Production is complete only when:

1. Decision Centre exposes all four original decisions as Live;
2. MDC1C tool is canonical and indexable;
3. primary payment calculation works without budget inputs;
4. future reset projection is correct;
5. pure rate effect is mathematically isolated;
6. non-monthly repayments are normalized before monthly budget comparison;
7. optional household budget and zero-buffer threshold work without normative affordability labels;
8. local profile requires explicit apply and does not persist household budget data;
9. Copy Summary consumes the deterministic result;
10. exact three-page PDF consumes the deterministic result;
11. primary Learn guide is live and bidirectionally linked;
12. sitemap is updated;
13. seven-core homepage remains unchanged;
14. existing Payoff, MDC1A and MDC1B remain regression-clean;
15. exact production bundle passes Publisher source contract, Chrome/PDF and responsive QA;
16. Multi-Repo Guard is green after merge;
17. a fresh post-production Source Snapshot becomes the next authoritative baseline.

---

## Final V1 principle

**MDC1C should win the search with the simple question borrowers actually ask — “How much will my payment increase if rates rise?” — then earn trust by showing exactly how the payment was recalculated, when the higher rate is assumed to apply, and what the result would do to an optional user-entered household budget without pretending that Carrowmont can predict future rates or decide what the household can afford.**
