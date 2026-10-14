# CARROWMONT MDC1B — MORTGAGE REFINANCE / BALANCE TRANSFER BREAK-EVEN

## Product, Calculation, UX, Localization, Learn, Reporting, QA & Release Specification

**Status:** Final V1.0 specification-only document. Owner approval is represented by merging this specification release. Production code must not begin until the spec-only release is green and a fresh post-spec Source Snapshot is taken.  
**Authoritative design baseline:** Carrowmont Source Snapshot 58  
**Snapshot generated:** 2026-10-13T18:28:34Z  
**Main-site commit:** `2a0553cc5c28a4d0349c1c2af2001292774593cb`  
**Mortgage repository commit:** `84b149c7fc730ac0daa0b7fe0c38cfadf12b6345`  
**Central QA commit:** `d8f6e1189537cec5120e88d621803396e359e889`  

---

# 1. Owner-approved roadmap direction being formalized

MDC1B is the second controlled release of the Carrowmont Mortgage Decision Centre.

The roadmap already locks the following direction:

1. Mortgage Decision Centre remains inside the existing `mortgage-payoff-calculator` repository.
2. The seven-core-tool homepage architecture remains unchanged.
3. Release order is MDC1A Prepayment vs Investing → **MDC1B Refinance / Balance Transfer Break-Even** → MDC1C Rate Shock & Budget Stress.
4. MDC1B answers whether a lower-rate offer still saves money after switching costs, exit charges, incentives and term changes.
5. The comparison must show the proposed-rate payment over the **same remaining term** as well as the payment over the lender's **proposed new term** so that term extension cannot masquerade as a pure rate saving.
6. User-entered switching / processing / legal / valuation / administrative costs, current-lender exit / prepayment / early-repayment charges, optional cashback / incentive and eligible financed fees are part of V1.
7. Optional expected holding period is part of V1.
8. V1 compares one current loan with one proposed refinance / transfer offer.
9. Carrowmont does not rank lenders, recommend a product, claim eligibility or invent country-specific charges.
10. Fixed deterministic math is used in V1; rate-path complexity is deferred.
11. Country-specific legal, tax, penalty and lender-rule calculations require authoritative support; otherwise the user enters the actual charge.
12. Tool ↔ Learn discovery remains bidirectional and contextual.
13. Central QA merges last.
14. No new workflow files are expected.
15. Exact Publisher-layout browser rehearsal at desktop, 390 px and 360 px is mandatory before production handoff.

This document converts that roadmap into an implementation contract.

---

# 2. Release scope

MDC1B production is one controlled release with these public changes:

1. the existing Mortgage Decision Centre hub changes the **Refinance / Transfer** card from Planned to Live;
2. a new Refinance / Balance Transfer Break-Even decision tool is published;
3. one primary Learn article is published for refinance break-even methodology;
4. the Learn hub Home Loans & Mortgages category gains the new guide;
5. sitemap and contextual discovery paths are updated;
6. central QA gains deterministic and browser protection for MDC1B.

MDC1B must not implement MDC1C Rate Shock & Budget Stress.

The Decision Centre after MDC1B must contain:

- Payoff / Prepayment — Live;
- Prepay vs Invest — Live;
- Refinance / Transfer — Live;
- Rate Shock / Budget — Planned / Coming next, with no clickable placeholder calculator.

---

# 3. Core user question

> **A lender is offering me a different rate. After switching costs, penalties, incentives and any change in term, will I actually save money — and how long until I break even?**

The tool must answer this without equating a lower monthly payment with a better economic outcome.

---

# 4. Product purpose

MDC1B must help a user separate five different effects that are often mixed together:

1. the effect of the new interest rate;
2. the effect of a different repayment term;
3. the effect of upfront or financed switching fees;
4. the effect of exit / early-repayment charges and cashback;
5. the effect of how long the user expects to keep the property / loan before another sale or refinance.

The result must make clear that:

- a lower rate can still fail to recover switching costs;
- a lower payment can be caused partly or mainly by a longer term;
- a refinance can reduce lifetime borrowing cost even if the payment rises because the new term is shorter;
- a refinance can lower the payment yet increase lifetime borrowing cost;
- break-even timing and expected holding period are separate questions.

---

# 5. Product boundaries

MDC1B is educational planning software. It is not:

- lender advice;
- a lender marketplace;
- a refinance / remortgage / balance-transfer recommendation;
- a lender ranking or product ranking;
- an eligibility, credit-score, affordability or debt-to-income test;
- a legal settlement quote;
- an APR / APRC / comparison-rate engine;
- an automatic tax-deduction calculator;
- an automatic prepayment-penalty calculator;
- a property-value or home-price forecast;
- a variable-rate path forecast;
- a guarantee that a lender will offer the modeled rate or term.

Wording such as **modeled**, **under these assumptions**, **entered costs** and **illustrative comparison** must be used where needed.

---

# 6. Architecture inheritance — non-negotiable

MDC1B inherits the current Mortgage Decision Centre architecture rather than introducing a separate design or storage model.

Mandatory inheritance includes:

- existing Carrowmont header/footer;
- `decision-centre.css` visual language unless a small extension is required;
- current mortgage `locale.js` region and currency universe;
- current `CarrowmontMortgageCore` amortization primitives;
- current Canadian fixed-rate convention where already supported;
- current `carrowmontMortgageDecisionV1` local profile;
- explicit profile review before applying saved values;
- current report-standard and PDF architecture;
- privacy-first analytics behavior;
- current Learn article standard;
- current mobile overflow discipline;
- current Publisher / QA / Guard / Snapshot release discipline.

The existing public Mortgage Payoff Calculator and MDC1A engines must remain parity-clean.

---

# 7. Stable canonical routes

| Purpose | Canonical path |
|---|---|
| Mortgage / Home Loan Payoff | `/mortgage-payoff-calculator/` |
| Mortgage Decision Centre | `/mortgage-payoff-calculator/decision-centre.html` |
| MDC1A Prepayment vs Investing | `/mortgage-payoff-calculator/prepayment-vs-investing.html` |
| **MDC1B Refinance Break-Even** | **`/mortgage-payoff-calculator/refinance-break-even.html`** |
| MDC1B primary Learn guide | **`/mortgage-refinance-break-even.html`** |

No country-specific duplicate calculator URLs are created.

---

# 8. Search presentation

## 8.1 MDC1B tool

**Static title:**  
`Mortgage Refinance Break-Even Calculator | Carrowmont`

**Static meta description:**  
`Compare a mortgage refinance, remortgage or home-loan balance transfer after fees, cashback and term changes. See same-term payment, proposed payment, break-even timing and modeled lifetime cost.`

**Fallback H1:**  
`When does refinancing actually break even?`

The runtime H1 may use local terminology, but the canonical URL and core search intent remain global.

## 8.2 Primary Learn article

**Canonical URL:**  
`https://carrowmont.com/mortgage-refinance-break-even.html`

**Title:**  
`When Does Mortgage Refinancing Break Even? | Carrowmont`

**H1:**  
`When does refinancing or a balance transfer break even?`

The article must use `Article` + `BreadcrumbList` structured data consistent with the current Learn cluster.

---

# 9. Decision Centre hub after MDC1B

The existing hub question remains:

> **What are you trying to decide?**

Cards remain in the same order.

## 9.1 Payoff / Prepayment

Live. Existing route unchanged.

## 9.2 Prepay vs Invest

Live. Existing MDC1A route unchanged.

## 9.3 Refinance / Transfer

Becomes Live.

Question:

> `Does the lower rate still save money after fees and term changes?`

Link:

`/mortgage-payoff-calculator/refinance-break-even.html`

The hub should also offer a contextual Learn link to `/mortgage-refinance-break-even.html`.

## 9.4 Rate Shock / Budget

Remains Planned / Coming next.

There must be no indexable placeholder URL or fake controls for MDC1C.

---

# 10. Country-aware product identity

The mathematics remains universal. Country selection controls familiar terminology only.

| Region | Preferred MDC1B wording |
|---|---|
| India | **Home Loan Balance Transfer Break-Even** |
| United States | **Mortgage Refinance Break-Even** |
| Canada | **Mortgage Refinance Break-Even** |
| United Kingdom | **Remortgage / Product Switch Break-Even** |
| Ireland | **Mortgage Refinance / Switch Break-Even** |
| Australia | **Home Loan Refinance Break-Even** |
| New Zealand | **Home Loan Refinance Break-Even** |
| Other / International | **Mortgage / Home Loan Refinance Break-Even** |

Supporting terminology follows existing Mortgage Decision Centre conventions:

- India: home loan, EMI, tenure, balance transfer, foreclosure / prepayment charge where user-entered;
- US: mortgage, payment, term, refinance;
- UK: mortgage, payment, term, remortgage / product switch, early repayment charge only where user-entered;
- Canada: mortgage, payment, refinance, amortization / term as appropriate;
- Australia / New Zealand: home loan, repayment, loan term, refinance;
- fallback: mortgage / home loan, repayment, term, refinance.

Carrowmont must not auto-calculate a penalty from country selection.

---

# 11. Currency and locale behavior

MDC1B reuses the existing mortgage locale system.

Rules:

1. country / region and currency remain separate controls;
2. currency changes display and interpretation of monetary values only;
3. Carrowmont performs no FX conversion;
4. changing currency after values are entered leaves numeric values unchanged and reinterprets them in the new currency;
5. country may change labels and explanatory text but not refinance mathematics;
6. Canada continues using the current supported fixed-rate periodic convention where applicable;
7. the same repayment frequency is used for the current and proposed loan in V1.

A separate current-vs-new repayment-frequency comparison is out of scope for V1.

---

# 12. Shared mortgage profile and explicit reuse

MDC1B may read the existing local-only profile:

`carrowmontMortgageDecisionV1`

The tool must display staged values and require explicit confirmation before applying them.

MDC1B may reuse:

- country;
- currency;
- outstanding balance;
- current annual rate;
- remaining years/months;
- scheduled repayment frequency.

The profile's optional `currentPayment` value is **not a calculation driver in MDC1B V1**. MDC1B deliberately derives the current modeled payment from balance, rate and remaining term so that the same-term rate comparison remains internally consistent.

If a saved profile contains a current-payment override, the UI may state that the refinance comparison recalculates payments from balance, rate and term rather than silently applying the override.

No MDC1B offer-specific values are written into the shared profile.

---

# 13. Required inputs — current loan

## 13.1 Outstanding balance

Required.

- must be finite;
- must be greater than zero;
- interpreted in selected currency.

## 13.2 Current annual interest rate

Required.

- range: 0% to 50%;
- uses the existing mortgage periodic-rate convention;
- represents the contractual rate used to model repayments, not a fee-inclusive APR/APRC/comparison-rate substitute.

## 13.3 Remaining term

Required.

- years + additional months;
- must represent at least one month;
- maximum inherited safety horizon: 100 years.

## 13.4 Scheduled repayment frequency

Required.

V1 uses the existing supported Mortgage Decision Centre frequencies:

- monthly;
- every 2 weeks / biweekly / fortnightly according to region wording;
- weekly.

The selected frequency is shared by both current and proposed loan calculations.

---

# 14. Required inputs — proposed refinance / transfer

## 14.1 New offered annual interest rate

Required.

- range: 0% to 50%;
- uses the same region-supported rate convention as the current loan;
- Carrowmont does not infer future variable-rate changes.

## 14.2 Proposed new term

Required.

- years + additional months;
- at least one month;
- maximum 100 years.

The proposed term is intentionally independent of the current remaining term.

---

# 15. Switching-cost inputs

## 15.1 New-loan / switching fees

One user-entered monetary amount representing the total eligible switching / processing / legal / valuation / administrative costs the user wants modeled.

The UI should explain that users may aggregate known offer costs here rather than expecting Carrowmont to know local lender schedules.

Input must be finite and non-negative.

## 15.2 Current-lender exit / early-repayment charge

Separate user-entered monetary amount.

Input must be finite and non-negative.

Carrowmont does not calculate it automatically from country, balance, rate or lender.

## 15.3 Cashback / incentive

Optional user-entered monetary amount.

Input must be finite and non-negative.

V1 assumes the entered amount is received at completion and retained. The interface must warn that clawbacks, eligibility conditions, taxes or delayed incentives are not modeled; users should enter only the amount they want treated as an effective incentive.

## 15.4 Fee payment mode

The **new-loan / switching fees** can be modeled as either:

- paid upfront; or
- financed into the new loan.

The current-lender exit / early-repayment charge is modeled as an upfront refinance cost in V1.

If an actual offer finances another charge, the user may include that amount inside the switching-fee field and set the separate exit-charge field accordingly. Carrowmont must not guess this structure.

---

# 16. Optional expected holding period

The user may enter how long they expect to keep the property / loan before another sale, refinance or switch.

Input:

- optional years + months;
- if present, at least one month;
- maximum 100 years.

If blank, the tool still calculates break-even and lifetime comparison.

If present, MDC1B must show the modeled net saving / cost at that holding point.

The holding-period calculation assumes both paths are settled at that point and does not model property value, selling costs or a future replacement loan.

---

# 17. Core amortization rules

MDC1B must reuse `CarrowmontMortgageCore` primitives rather than copy the existing payoff engine.

For both current and proposed loans:

1. convert annual rate to the supported periodic rate using the selected repayment frequency and regional convention;
2. derive scheduled payment from principal, periodic rate and number of periods;
3. simulate amortization deterministically until payoff;
4. reject negative-amortization or invalid states rather than fabricating a result;
5. use the same rounding discipline as the existing mortgage engine.

No separate hidden refinance amortization formula is allowed if an existing shared primitive can be reused.

---

# 18. Three payment figures — mandatory differentiator

MDC1B must show three distinct payment figures.

## 18.1 Current modeled payment

Principal:

`current balance`

Rate:

`current rate`

Term:

`current remaining term`

## 18.2 New-rate payment using the SAME remaining term

This is the rate-isolation payment.

Principal:

`current balance only`

Rate:

`new offered rate`

Term:

`current remaining term`

Switching fees are **not** added to this rate-only figure, even if the actual refinance fees are financed. Its purpose is to isolate the effect of changing the rate while holding principal and term constant.

## 18.3 Proposed refinance payment using the NEW term

Principal:

`current balance + financed switching fees`

Rate:

`new offered rate`

Term:

`proposed new term`

This is the modeled payment for the actual refinance structure entered.

The UI must not collapse the same-term and proposed-term figures into one number.

---

# 19. Fee-financing treatment

Let:

- `B` = current outstanding balance;
- `F` = new-loan / switching fees;
- `E` = current-lender exit / early-repayment charge;
- `C` = cashback / incentive.

If fees are paid upfront:

`new principal = B`

If eligible fees are financed:

`new principal = B + F`

The full switching fee `F` remains an economic refinance cost in either mode. Financing changes when cash is paid and adds interest because the financed amount becomes part of the new loan; it does not make the fee disappear.

`E` remains a refinance cost in both cases.

`C` offsets refinance cost as entered.

---

# 20. Net switching cost

The economic switching-cost amount before refinance interest is:

`net switching cost = F + E - C`

This value may be:

- positive;
- zero; or
- negative if entered cashback exceeds entered switching and exit costs.

A negative value is allowed and must not be silently floored to zero.

The result must separately display:

- switching fees;
- exit / early-repayment charge;
- cashback / incentive;
- net switching cost;
- whether switching fees are paid upfront or financed.

---

# 21. Economic comparison principle

MDC1B must not compare only cumulative cash payments, because faster principal repayment would otherwise look like an economic cost.

The primary economic comparison is based on **borrowing cost**, not principal transfer.

At comparison period `k`:

`current economic cost(k) = cumulative current-loan interest through k`

`refinance economic cost(k) = net switching cost + cumulative new-loan interest through k`

Therefore:

`refinance economic advantage(k) = current cumulative interest(k) - refinance cumulative interest(k) - net switching cost`

Interpretation:

- positive = refinance path has the lower modeled borrowing cost by that point;
- negative = refinance path has the higher modeled borrowing cost by that point;
- zero = modeled economic break-even.

This is mathematically equivalent to comparing cumulative borrower cash outflows plus remaining loan balance on each path, with the entered refinance fees / cashback accounted for. QA should use that equivalence as an independent invariant.

Principal repayment itself must not be mislabeled as a saving or cost.

---

# 22. Comparison horizon

The deterministic economic ledger must run through:

`max(current modeled payoff periods, proposed refinance payoff periods)`

After one path is paid off:

- its remaining balance is zero;
- its interest accumulation stops;
- its scheduled loan payments stop.

The other path continues until its own payoff.

The lifetime result is therefore evaluated only after both modeled loans are finished.

---

# 23. Break-even definition

The hero break-even metric is a **durable economic break-even**, not simply the first temporary crossing.

Let `A(k)` be the refinance economic advantage at period `k`.

The durable break-even period is the earliest `k` for which:

1. `A(k) >= 0` within a small deterministic numeric tolerance; and
2. `A(j)` does not become negative again for any later comparison period through the full comparison horizon.

This rule prevents a long-term extension from creating an early apparent break-even that later reverses because of additional interest.

## 23.1 Immediate break-even

If the refinance is already durably non-negative at completion (`k = 0`), show:

`Immediate / at completion`

## 23.2 No durable break-even

If no durable crossing exists before both loans are paid off, show:

`No durable break-even within the modeled loan horizons.`

Do not fabricate a month.

## 23.3 Temporary crossing

If the series crosses into positive territory and later becomes negative again, the tool may disclose:

`The modeled savings recover costs temporarily around month X, but the advantage does not remain positive through the full comparison horizon.`

The hero must still say **No durable break-even**.

---

# 24. Break-even month conversion

The engine may work in repayment periods, but the primary output must be understandable as months.

For a non-monthly payment frequency:

`break-even months = ceil(break-even periods × 12 / periods-per-year)`

For monthly repayment frequency, period count and month count are identical.

For weekly / biweekly / fortnightly schedules the UI should use wording such as **about X months** and may also show the exact repayment-cycle count in supporting detail.

---

# 25. Expected holding-period result

If a holding period is entered, convert the entered months to the first repayment period at or beyond that point:

`holding periods = ceil(total holding months × periods-per-year / 12)`

The modeled net saving / cost at the holding period is the economic advantage at that checkpoint.

If the holding period is beyond both payoff dates, the result equals the lifetime advantage.

The output must show one of:

- `Modeled saving at your holding period` when positive;
- `Modeled additional cost at your holding period` when negative;
- `Approximately break-even at your holding period` within tolerance.

If expected exit occurs before durable break-even, show an explicit note.

---

# 26. Lifetime comparison

The tool must calculate:

- current remaining-lifetime interest;
- refinance lifetime interest;
- refinance interest attributable to the full new principal, including any financed switching fees;
- net switching cost;
- lifetime refinance economic advantage.

Lifetime advantage is:

`current total remaining interest - new total interest - net switching cost`

A lower proposed payment must never be described as a lifetime saving unless this lifetime economic result is also positive.

---

# 27. Mandatory term-extension warning

If:

`proposed term > current remaining term`

show a prominent warning:

> **The proposed loan runs longer. Part of a lower payment may come from borrowing for longer, not only from the lower rate.**

The warning must remain visible even when the lifetime comparison is favorable.

The result should quantify the term difference in months / years.

If proposed payment is lower but lifetime advantage is negative, show an even stronger neutral warning:

> **The modeled payment is lower, but the modeled lifetime borrowing cost is higher under these assumptions.**

This is descriptive, not a recommendation.

---

# 28. Shorter-term interpretation

If the proposed term is shorter:

- the proposed payment may be higher;
- lifetime interest may be lower;
- break-even may still occur.

The interface must not treat a higher proposed payment as an automatic failure.

Suggested interpretation:

> `The proposed repayment is higher because the modeled loan finishes sooner. Review payment affordability separately from the borrowing-cost comparison.`

MDC1B does not perform an affordability test.

---

# 29. Result hierarchy

The results area should prioritize:

1. **Durable break-even** — month / immediate / no durable break-even;
2. **Proposed repayment change** — lower or higher per repayment cycle;
3. **Net effect at expected holding period** — only when entered;
4. **Lifetime modeled saving / additional cost**;
5. same-term rate-only payment vs actual proposed-term payment;
6. term-extension / term-shortening explanation;
7. switching-cost composition;
8. lifetime-interest comparison.

No single output should be labeled `Best option` or `Recommended`.

---

# 30. Comparison table

A clear table should include at minimum:

| Measure | Current loan | New rate, same term | Proposed refinance |
|---|---:|---:|---:|
| Starting principal | current balance | current balance | current balance + financed fees |
| Interest rate | current rate | new rate | new rate |
| Remaining / proposed term | current term | current term | proposed term |
| Repayment per cycle | current modeled payment | rate-only payment | proposed payment |
| Lifetime interest | current interest | optional supporting value | refinance interest |
| Payoff horizon | current term | current term | proposed term |

The middle column is explicitly an isolation scenario, not a second lender offer.

---

# 31. Cumulative advantage chart

MDC1B should provide one transparent chart:

**Modeled refinance advantage over time**

Chart rules:

- horizontal axis: elapsed time;
- vertical axis: modeled refinance economic advantage;
- zero line clearly visible;
- break-even marker when durable break-even exists;
- holding-period marker when entered;
- chart values must also be available as visible text / summary and not require hover;
- no chart should imply a forecast of future market or property values.

For very long loans, the chart may sample display points while the engine keeps full deterministic-period calculations.

---

# 32. Core result object

One deterministic result object must be the source of truth for:

- on-screen results;
- Copy Summary;
- PDF report;
- chart;
- QA fixtures.

Suggested result shape:

```text
ok
status
country
currency
paymentFrequency
currentLoan
  balance
  rate
  termPeriods
  payment
  totalInterest
  payoffPeriods
rateOnlySameTerm
  rate
  principal
  termPeriods
  payment
  totalInterest
proposedLoan
  rate
  baseBalance
  financedFees
  principal
  termPeriods
  payment
  totalInterest
  payoffPeriods
costs
  switchingFees
  exitCharge
  cashback
  netSwitchingCost
  feePaymentMode
comparison
  paymentChange
  termChangePeriods
  lifetimeAdvantage
  durableBreakEvenPeriod
  durableBreakEvenMonths
  temporaryCrossingPeriod
  holdingPeriodPeriods
  holdingPeriodAdvantage
  advantageSeries
messages[]
```

Names may differ in implementation, but the semantic separation must remain.

---

# 33. Numeric tolerance and deterministic status rules

The implementation must define one small numeric tolerance scaled appropriately for currency values.

The same tolerance must be used for:

- break-even equality;
- lifetime near-zero status;
- holding-period near-zero status;
- durable-crossing checks.

The UI must not display spurious `0.00` savings caused only by floating-point noise.

---

# 34. Input validation

Reject or clearly flag:

- zero / negative balance;
- negative rate;
- rate above 50%;
- zero term;
- proposed term above the inherited safety maximum;
- negative switching fees;
- negative exit charge;
- negative cashback;
- invalid financed-fee state;
- holding period of zero months when the field is explicitly enabled;
- non-finite values.

The tool must never silently repair an invalid value into a materially different financial assumption.

---

# 35. Important edge cases

## 35.1 New rate equals current rate

A refinance can still be unfavorable or favorable depending on costs, cashback and term. Do not hard-code a conclusion.

## 35.2 New rate is higher

Still calculate. A shorter term or large incentive may create a different lifetime result.

## 35.3 Zero switching costs

Allowed.

## 35.4 Cashback exceeds costs

Allowed. Net switching cost becomes negative.

## 35.5 Fees financed

Add the eligible fee amount to proposed principal and charge new-loan interest on it.

## 35.6 Very long proposed term

Calculate within the inherited 100-year safety limit and display the term-extension warning.

## 35.7 No durable break-even

Return a clear status, not a fabricated month.

## 35.8 Holding period before break-even

Show the modeled additional cost at the entered exit point.

## 35.9 One loan paid off before the holding period

That path's interest and loan payments stop; the other path continues. Settlement-balance equivalence must still reconcile.

---

# 36. Default values

Defaults should be neutral examples, not lender recommendations.

Recommended initial state for the visual interface may use:

- a positive sample balance;
- a plausible current rate;
- a slightly different new rate;
- current and proposed terms;
- zero fees / zero exit charge / zero cashback or clearly illustrative non-zero examples.

However:

- no lender name;
- no `best refinance rate` claim;
- no market-rate feed;
- no country-specific penalty default.

The production specification review should prefer values that make the tool understandable without implying a market quote.

---

# 37. UX flow

Recommended sequence:

1. current loan details;
2. proposed offer details;
3. switching costs and incentive;
4. fee-financing choice;
5. optional expected holding period;
6. calculate / compare;
7. review break-even and payment comparison;
8. inspect lifetime / holding-period detail;
9. read methodology / Learn guide;
10. Copy Summary or Generate Refinance Decision Report.

The user should not need to understand amortization equations before using the tool.

---

# 38. Local profile UX

When saved mortgage facts are available:

- show a banner;
- summarize the staged balance / rate / term / frequency;
- provide **Use these loan details**;
- provide **Start fresh**;
- provide **Clear saved mortgage details** where the current MDC family pattern supports it.

No saved value is applied merely because the page loads.

The new-rate offer, fees, cashback, fee mode, holding period and results are never written into the shared mortgage profile.

---

# 39. Privacy

MDC1B should remain local-first.

No server-side storage of financial inputs is introduced.

Analytics may record only aggregated product interaction events such as:

- tool opened;
- calculation completed;
- profile applied;
- Learn opened;
- PDF generated;
- Copy Summary used.

Analytics must not capture balances, rates, fees, cashback, terms, holding periods or calculated financial results.

---

# 40. Result language and neutrality

Allowed patterns:

- `Under these assumptions, modeled switching costs are recovered after about 18 months.`
- `At your 3-year holding period, the refinance path is modeled to cost about X less.`
- `The proposed repayment is lower, but the modeled lifetime borrowing cost is higher.`
- `No durable break-even appears within the modeled loan horizons.`

Avoid:

- `You should refinance.`
- `This is a good deal.`
- `Best option.`
- `Guaranteed saving.`
- `You qualify.`

---

# 41. Methodology section on the tool

The page should explain, in plain language:

1. why principal repayment is not itself treated as a borrowing cost;
2. why fees are counted whether paid upfront or financed;
3. why financed fees also create interest;
4. why the same-term new-rate payment is shown separately;
5. why break-even is durable rather than a temporary crossing;
6. why holding period matters;
7. why a longer term can lower the payment but raise lifetime cost;
8. what Carrowmont does not model.

The tool should link to the primary Learn article for the full explanation.

---

# 42. Primary Learn guide

New article:

`/mortgage-refinance-break-even.html`

Primary question:

> **When does refinancing or a balance transfer break even?**

Recommended content structure:

1. lower rate does not automatically mean lower total cost;
2. what switching costs belong in the comparison;
3. cashback and incentives;
4. upfront vs financed fees;
5. current payment vs new-rate same-term payment vs proposed-term payment;
6. how economic break-even is calculated;
7. expected holding period;
8. why term extension can hide cost;
9. shorter-term refinances;
10. examples of no-break-even and temporary-crossing cases;
11. what local charges / legal rules Carrowmont does not invent;
12. FAQ;
13. primary CTA to the MDC1B tool.

The Learn article must not become a lender ranking or current-rate list.

---

# 43. Tool ↔ Learn paths

Required:

- MDC1B tool → primary Learn guide;
- Learn guide top CTA → MDC1B tool;
- Learn guide bottom CTA → MDC1B tool;
- Learn hub Home Loans & Mortgages category → MDC1B Learn guide;
- Decision Centre hub → MDC1B tool;
- Decision Centre hub → MDC1B Learn guide contextually.

Do not force unrelated mortgage articles to link to MDC1B merely for link count.

---

# 44. Tools Hub and homepage rule

MDC1B is not a new core homepage tool.

The existing Mortgage / Home Loan core card remains the gateway.

No new homepage core card is added.

A Tools Hub change is not required for MDC1B V1 if discovery is already strong through the Mortgage core tool, Decision Centre and Learn cluster. If a later Tools Hub companion-link enhancement is desired, it should not alter the seven-core-tool identity.

---

# 45. Copy Summary

Copy Summary should include at minimum:

- current balance;
- current rate and remaining term;
- new rate and proposed term;
- current modeled payment;
- new-rate same-term payment;
- proposed refinance payment;
- switching fees;
- exit charge;
- cashback;
- fee mode;
- durable break-even status / month;
- holding-period net effect when entered;
- lifetime modeled saving / additional cost;
- term-extension warning when applicable;
- educational / assumption disclaimer.

Copy Summary must read from the shared result object.

---

# 46. PDF Decision Report

MDC1B should use the established Carrowmont report design and generate an actual PDF.

Recommended three-page structure:

## Page 1 — Decision summary

- refinance / balance-transfer identity;
- durable break-even;
- current vs rate-only same-term vs proposed payment;
- holding-period result if entered;
- lifetime modeled saving / additional cost;
- term-change warning.

## Page 2 — Cost and time comparison

- loan assumptions table;
- switching-cost composition;
- cumulative advantage chart;
- current vs proposed lifetime interest;
- same-term rate-only reference;
- payoff horizons.

## Page 3 — Assumptions, methodology and next steps

- fee-financing treatment;
- break-even definition;
- holding-period interpretation;
- uncertainty / excluded lender rules;
- primary Learn guide;
- related Carrowmont tools and Mortgage Decision Centre.

The PDF must use the exact same result object as the webpage.

No separate PDF-only financial arithmetic is allowed.

CSV export is not required for MDC1B V1.

---

# 47. Accessibility and responsive requirements

MDC1B must support:

- keyboard navigation for all controls;
- visible focus treatment;
- associated labels and help text;
- semantic results headings;
- chart interpretation without hover;
- no horizontal overflow at desktop Publisher viewport, 390 px and 360 px;
- long localized labels without clipping;
- long currency strings without broken layout;
- accessible warning text that does not rely only on color.

---

# 48. Deterministic fixture set — minimum

Independent MDC1B core fixtures must include at least:

1. **no-fee, lower-rate, same-term case** — durable break-even is immediate and lifetime advantage is positive;
2. **upfront-fee case** — positive fee delays break-even;
3. **financed-fee case** — principal increases by financed fee and refinance interest includes interest on that fee;
4. **cashback case** — cashback reduces net switching cost and moves break-even earlier versus the otherwise identical case;
5. **longer-term case** — proposed payment may fall while explicit term-extension warning appears;
6. **lower-payment / higher-lifetime-cost case** — warning is required and no false `saving` language appears;
7. **shorter-term case** — proposed payment may rise while lifetime cost falls;
8. **no-break-even case** — engine returns null / status rather than fabricating a month;
9. **temporary-crossing case** — early positive crossing later reverses and hero says no durable break-even;
10. **holding-period-before-break-even case** — holding-period result remains negative;
11. **holding-period-after-break-even case** — holding-period result is positive;
12. **cashback greater than costs** — negative net switching cost is preserved;
13. **zero-rate edge case**;
14. **Canada fixed-rate convention case**;
15. **monthly / biweekly / weekly month-conversion checks**;
16. **balance-adjusted-cost equivalence invariant** — cumulative cash + remaining balance difference reconciles to the interest-plus-cost formulation;
17. **same-term rate-isolation invariant** — financed fees never contaminate the same-term rate-only payment.

Exact numeric expected values must be locked in production QA from an independently calculated fixture source, not copied from DOM output.

---

# 49. Existing regression protection

All existing Mortgage / Home Loan QA must remain green, including:

- Mortgage Payoff core fixtures;
- Canada fixed-rate convention;
- current Payoff modes and report behavior;
- Mortgage Learn behavior;
- MDC1A deterministic equal-cash-flow fixtures;
- MDC1A profile confirmation;
- MDC1A PDF and Copy Summary;
- Decision Centre mobile layout;
- GSEO1D internal-authority paths.

If `core.js`, `locale.js`, `mortgage-decision-profile.js` or shared report files are modified, add explicit before / after parity protection for existing public calculations and MDC1A.

---

# 50. Browser QA — MDC1B

Minimum staged browser checks:

1. Decision Centre shows three Live modules and one Planned module.
2. Refinance card links to the approved canonical route.
3. Rate Shock card remains non-clickable / planned.
4. MDC1B canonical, title and description are correct.
5. saved mortgage facts require explicit apply.
6. start-fresh path works.
7. current payment is derived from balance/rate/term rather than silently applying a saved MDC1A override.
8. upfront-fee scenario calculates.
9. financed-fee scenario calculates.
10. cashback scenario calculates.
11. same-term rate-only payment is visible separately from proposed-term payment.
12. longer proposed term displays the explicit warning.
13. lower-payment / higher-lifetime-cost state displays the correct warning.
14. shorter-term scenario does not get falsely labeled unfavorable merely because payment rises.
15. durable break-even month appears when it exists.
16. no-break-even state displays without a fabricated month.
17. temporary crossing does not become the hero break-even.
18. holding-period result updates deterministically.
19. Tool ↔ Learn links are bidirectional.
20. Learn hub lists the new guide.
21. Copy Summary matches displayed results.
22. PDF generates successfully.
23. desktop layout is stable.
24. 390 px has no horizontal overflow.
25. 360 px has no horizontal overflow.
26. keyboard focus reaches all primary controls.
27. chart information remains available without hover.
28. India / US / UK / Australia representative terminology states render correctly.

---

# 51. PDF QA gate

Before production handoff:

- generate representative reports for India, United States, United Kingdom and Australia;
- visually inspect every page;
- confirm no clipping, overlap, missing glyphs or truncated long labels;
- confirm Page 1 break-even matches the webpage result;
- confirm all three payment figures reconcile;
- confirm financed-fee principal and interest treatment reconcile;
- confirm holding-period and lifetime outputs reconcile;
- confirm term warning is visible where applicable;
- confirm no separate PDF arithmetic exists.

---

# 52. Source-contract expectations after implementation

Central source contract should protect at minimum:

- canonical MDC1B tool and Learn routes;
- Decision Centre becomes three Live + one Planned;
- MDC1C remains non-link planned;
- same-term rate-only payment exists;
- proposed-term payment exists separately;
- financed fee increases new principal;
- net switching cost includes fee + exit charge - cashback;
- durable break-even semantics exist;
- no fabricated break-even when none exists;
- explicit term-extension warning exists;
- lower-payment / higher-lifetime-cost warning exists;
- local profile remains explicit-use and does not persist offer-specific values;
- Tool ↔ Learn paths exist;
- sitemap contains the new public URLs;
- seven-core homepage architecture remains unchanged;
- no workflow file change;
- expected production repository scope remains mortgage repo + main site + central QA.

---

# 53. Red-prevention production release gate

An MDC1B production bundle is ready for handoff only when:

1. base repository hashes match the approved fresh post-spec snapshot;
2. ZIP integrity passes;
3. every release-manifest hash verifies;
4. source contract passes in normal source layout;
5. source contract passes in Publisher layout;
6. Multi-Repo Guard layout passes;
7. full staged browser QA passes;
8. desktop, 390 px and 360 px pass;
9. deterministic refinance fixtures pass independently of DOM rendering;
10. existing Mortgage Payoff and MDC1A parity tests pass;
11. Copy Summary and PDF reconcile with the same result object;
12. representative PDFs are visually reviewed;
13. no unexpected browser network dependency exists;
14. no workflow file changed unless separately approved.

A green static source contract alone is not sufficient.

---

# 54. Production repository scope

Expected MDC1B production repositories:

1. `mortgage-payoff-calculator`
2. `draw004.github.io`
3. `carrowmont-qa`

No change expected to:

- sip-calculator;
- goal-planner;
- financial-independence;
- inflation-calculator;
- retirement-calculator;
- budget-cash-flow-planner.

---

# 55. Production merge order

MDC1B production merge order:

1. `mortgage-payoff-calculator`
2. `draw004.github.io`
3. `carrowmont-qa` — always last

After merge:

1. confirm Pages;
2. run Automated QA;
3. run Multi-Repo Guard;
4. take a fresh Source Snapshot;
5. perform indexing steps for the new public URLs.

---

# 56. Specification-only release scope

This document itself is a specification-only release.

Expected Publisher output for the specification release:

**1 PR** in `draw004.github.io` containing only:

`docs/CARROWMONT_MDC1B_REFINANCE_BREAK_EVEN_SPEC_FINAL.md`

No production calculator, Learn, sitemap or QA file is changed by the specification-only release.

---

# 57. Specification approval and baseline rule

Production coding must not begin directly from Snapshot 58 after this document is created.

Required sequence:

1. owner reviews the specification summary;
2. stage the exact specification-only release through the disposable-branch Batch PR Publisher workflow;
3. merge the specification PR if Publisher is green and file scope is exact;
4. run the normal validation appropriate to a docs-only change;
5. take a **fresh post-spec Source Snapshot**;
6. use that newer clean snapshot as the authoritative production baseline for MDC1B implementation.

Merging this specification PR constitutes owner approval of V1.0.

---

# 58. Out of scope for MDC1B V1

- MDC1C Mortgage Rate Shock & Budget Stress;
- changing the Budget Planner receiver schema;
- lender ranking or recommendation;
- live lender offers or rate feeds;
- eligibility / underwriting / credit-score / DTI logic;
- lender-specific legal settlement calculations;
- automatic country penalty calculation;
- automatic tax deduction calculation;
- APR/APRC/comparison-rate normalization engine;
- separate current-vs-new payment frequencies;
- variable or floating future-rate paths;
- teaser-rate / step-rate schedules;
- interest-only refinance modeling;
- offset-account or redraw-account modeling;
- multiple refinance offers side by side;
- home-value or equity forecast;
- sale-price modeling;
- future refinance assumptions;
- user accounts or server-side financial-data storage;
- country-specific duplicate calculator pages;
- new homepage core-tool card;
- workflow-file changes;
- GSEO2 external-authority campaign execution;
- MDC1C production work.

---

# 59. Definition of done — specification

The MDC1B specification is ready to merge when it clearly defines:

- canonical tool and Learn routes;
- localized identity;
- current and proposed loan inputs;
- switching-fee, exit-charge and cashback treatment;
- financed-fee principal treatment;
- same-term rate-only payment;
- proposed-term payment;
- economic cost methodology;
- durable break-even definition;
- holding-period comparison;
- lifetime comparison;
- term-extension warnings;
- local profile behavior;
- privacy boundaries;
- result-object source of truth;
- Learn / discovery paths;
- PDF and Copy Summary scope;
- deterministic fixtures;
- repository scope;
- merge / release sequence;
- out-of-scope boundaries.

---

# 60. Definition of done — future MDC1B production

MDC1B production is done only when:

1. Decision Centre shows three Live choices and only MDC1C remains Planned.
2. Refinance / Balance Transfer Break-Even is live at the approved canonical URL.
3. same-term rate isolation and proposed-term payment are both visible.
4. financed-fee and cashback treatment pass deterministic fixtures.
5. durable break-even never reports a temporary crossing as a permanent break-even.
6. no-break-even state never fabricates a month.
7. holding-period result reconciles with the economic ledger.
8. term-extension warning is present whenever required.
9. lower-payment / higher-lifetime-cost state is explicitly protected.
10. existing Mortgage Payoff and MDC1A remain parity-clean.
11. local profile reuse remains explicit and offer assumptions are not persisted.
12. primary Learn guide is live with bidirectional Tool ↔ Learn paths.
13. all new public URLs are in sitemap with correct canonical metadata.
14. Copy Summary and actual PDF report reconcile with the result object.
15. desktop, 390 px and 360 px are overflow-safe.
16. Pages, Automated QA and Multi-Repo Guard are green.
17. a fresh post-release Source Snapshot is taken.
18. indexing actions are completed.

---

## Final V1 principle

The defining MDC1B rule is:

> **A lower payment is not the same thing as a lower borrowing cost. Show the rate-only same-term payment, the actual proposed-term payment, all entered switching costs, and a durable break-even so the user can see what actually changed.**
