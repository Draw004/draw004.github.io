# CARROWMONT CORE7 - HOME LOAN / MORTGAGE PREPAYMENT & EARLY PAYOFF CALCULATOR

## Product, Calculation, UX, Localization, Integration & Release Specification

**Status:** Draft V1.1 for owner review - production code is not changed by this document.  
**Authoritative baseline:** Carrowmont Source Snapshot 41  
**Snapshot generated:** 2026-10-10T19:22:17Z  
**Main-site commit:** `116f41d9d7833fafa2922850ef20f940139c4bd7`  
**SIP / Recurring Investment commit:** `9309d6b6150c6f09e410b7f0b3c79a456c4c3f42`  
**Goal Planner commit:** `bc61b12b5e1632d99892a9d72d4f11cf147afa57`  
**Financial Independence commit:** `3b0c69be1629ae1f1cfa940d71ab6f192a395d60`  
**Inflation Calculator commit:** `885fb1a09946632dccee1d4f2cb9a3bb686282b5`  
**Retirement Planner commit:** `3385406f104940f20ff4a7c3769ba34baccca93e`  
**Budget & Cash Flow Planner commit:** `b657d819c401bf7d3beeeb797ca706c3d5ac2e55`  
**Central QA commit:** `49a46160c375175e1558de6325d080db163fa5ea`

---

# 1. Owner-approved product decisions

This specification formalizes the following approved direction:

1. Build a globally usable **Home Loan / Mortgage Prepayment & Early Payoff Calculator** as the **seventh primary/core Carrowmont planning tool**.
2. Keep one universal calculation engine and localize terminology, helper text, examples and country-specific conventions where genuinely necessary.
3. Promote the seventh tool into the homepage core grid.
4. The homepage future state is **seven real core tools + the permanent Explore All Tools gateway**, producing a balanced **4 x 2 desktop grid** where space permits.
5. The seven real tools are ordered by **country-specific search demand / priority evidence**. Currency-only changes must not alter the order.
6. Treat this specification as the explicit architecture change that expands the primary planning suite from six to seven tools.
7. Expand the shared core-tool report registry from six to seven tools so each core report can recommend the other six core tools.
8. Introduce a shared, same-origin browser-state contract so compatible values can move between Carrowmont tools without forcing the user to re-enter them.
9. Never silently overwrite a value with a semantically different value. Every receiving tool must validate imported/shared data.
10. Preserve all existing Carrowmont architecture, typography, colors, controls, responsive behavior, accessibility, report structure, terminology and QA rules.
11. Keep scheduled loan repayment frequency, planning view and extra / part-prepayment frequency as separate concepts. Part-prepayment cadence is user-selected and must not be preselected by country.

---

# 2. Purpose

The seventh core tool should answer a practical household question:

> **How much time and interest could I save by paying extra toward my home loan or mortgage, and what payment would I need to become debt-free sooner?**

The tool should help a borrower explore:

- a one-time lump-sum prepayment;
- regular extra repayments;
- a target payoff date / target remaining term;
- the difference between shortening the loan term and mathematically reducing the regular payment after a lump-sum payment;
- the effect of a user-entered early repayment fee / prepayment charge;
- a modeled full early payoff / foreclosure scenario without pretending to provide an exact lender payoff quote.

The tool is educational planning software. It is not a lender quote, credit recommendation, refinance recommendation, tax calculation or regulated financial advice.

---

# 3. Why this belongs in the primary planning suite

Unlike a macro scenario tool, this calculator directly affects household cash flow, debt duration, long-term interest cost and future savings capacity. It therefore belongs beside Budget, Retirement, Goal, Financial Independence, Inflation and SIP / Recurring Investment.

The product is globally portable because the underlying mathematical problem is universal:

1. a borrower has an outstanding principal;
2. interest accrues on that balance;
3. scheduled payments reduce interest and principal;
4. extra principal paid earlier generally reduces later interest under the model;
5. local lender rules may limit, charge for or calculate early repayment differently.

The engine should therefore remain universal while the interface explains local terminology and lender-rule caveats.

---

# 4. Architecture inheritance - non-negotiable

The new tool must inherit the current Carrowmont shell rather than create a new design system.

Mandatory inheritance includes:

- shared header and brand treatment;
- desktop and mobile navigation behavior;
- country/currency pill and popover;
- `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` font stack;
- current Carrowmont navy / teal palette and established muted/border tokens;
- established input dimensions, border radii, button hierarchy and focus treatment;
- current title-style capitalization for actions;
- no page-level horizontal overflow;
- shared footer and active-tool navigation;
- same accessible keyboard/focus behavior;
- same reporting system and final report pages;
- same QA/release discipline.

The new calculator must be recognizable as Carrowmont before a visitor reads the tool name.

---

# 5. Proposed repository, route and identity

## 5.1 Repository

Recommended new repository:

`Draw004/mortgage-payoff-calculator`

## 5.2 Public route

Recommended public route:

`https://carrowmont.com/mortgage-payoff-calculator/`

The route is intentionally stable and globally understandable. Country terminology may change the visible product name without creating separate URLs or separate engines.

## 5.3 Canonical static SEO title

**Mortgage Payoff & Home Loan Prepayment Calculator | Carrowmont**

## 5.4 Canonical static meta description

**Estimate how extra mortgage or home-loan payments, lump-sum prepayments and an earlier payoff target may change interest, repayments and time to debt-free.**

## 5.5 H1 fallback

**See how extra payments could change your home loan or mortgage**

JavaScript may replace the visible product identity after locale resolution, but the static HTML must remain understandable without JavaScript.

---

# 6. Country-aware terminology

Terminology is part of the product contract. In particular, **foreclosure** must never be used as the universal product term because in the United States and several other markets it normally means lender repossession after default, while in Indian lending usage it can mean voluntarily closing a loan early.

| Country / profile | Preferred visible identity | Key local terms |
|---|---|---|
| India | **Home Loan Prepayment / Foreclosure Calculator** | home loan, EMI, prepayment, part-prepayment, foreclosure / pre-closure, tenure |
| United States | **Mortgage Payoff & Extra Payment Calculator** | mortgage, extra principal, payoff, early payoff, remaining term |
| Canada | **Mortgage Prepayment & Payoff Calculator** | mortgage, prepayment privilege, prepayment charge, amortization, term |
| United Kingdom | **Mortgage Overpayment & Early Repayment Calculator** | mortgage, overpayment, early repayment charge (ERC), remaining term |
| Australia | **Home Loan Extra Repayments Calculator** | home loan, mortgage, extra repayments, repayment frequency, redraw / offset as future topics |
| New Zealand | **Mortgage / Home Loan Extra Repayments Calculator** | mortgage, home loan, extra repayments, break fee |
| Ireland | **Mortgage Overpayment Calculator** | mortgage, overpayment, early repayment |
| Singapore / Malaysia / Hong Kong | **Home Loan Early Repayment Calculator** | home loan, mortgage, early repayment / prepayment |
| Other / International | **Mortgage / Home Loan Early Payoff Calculator** | mortgage, home loan, prepayment, extra payment, payoff |

Country selection controls terminology. Currency selection controls monetary display only and must not change terminology or homepage tool order.

---

# 7. Search-demand and traffic rationale

The housing-debt category has stronger evidence of broad consumer demand than the deferred Oil Shock concept.

Directional evidence available during this specification includes:

- United States keyword data reported by seodata.dev from Google Ads API data showed approximately **74,000 monthly searches** for `mortgage payoff calculator` in June 2026, with closely overlapping early-payoff variants also showing material volume.
- An India home-loan search-trend report published by Techmagnate reported large FY2024-25 demand for `home loan calculator` and specific demand for `housing loan prepayment calculator`.
- The United Kingdom MoneyHelper service explicitly discusses mortgage overpayments and early-repayment charges and points consumers toward overpayment calculators.
- Australia's government Moneysmart mortgage calculator includes the question **How can I repay my home loan sooner?** and supports repayment-frequency comparisons.
- New Zealand's Sorted mortgage calculator explicitly models higher repayments and shows the time and interest saved.
- Canada's Financial Consumer Agency provides dedicated consumer guidance on mortgage prepayment privileges and penalties.

This evidence supports the product category, but it is **not sufficient to invent exact relative rankings for every Carrowmont country**.

## 7.1 Mandatory homepage-demand gate

Before production merge, revise:

`docs/CARROWMONT_HOMEPAGE_TOOL_DEMAND_MATRIX.md`

The revision must add the seventh tool to every supported country/profile using the existing evidence hierarchy:

1. country-specific keyword-volume evidence where comparable;
2. Google Trends country-level relative interest where useful;
3. reputable local finance/public-information calculator prominence;
4. documented regional/global fallback when country evidence is weak;
5. Carrowmont Search Console data later, when statistically meaningful.

The matrix must evaluate intent clusters rather than one literal phrase, including:

- home loan prepayment calculator;
- housing loan prepayment calculator;
- home loan foreclosure / pre-closure calculator;
- mortgage payoff calculator;
- mortgage extra payment calculator;
- mortgage overpayment calculator;
- mortgage prepayment calculator;
- extra repayments calculator;
- pay off home loan faster calculator;
- local-language equivalents where search behavior requires them.

The public homepage must not call an external keyword API at runtime. Ranking remains a version-controlled build-time dataset.

---

# 8. Product modes

The interface should begin with one compact question:

**What do you want to explore?**

Use four options:

1. **Pay extra regularly** - show interest/time saved from recurring extra repayments.
2. **Make a lump-sum prepayment** - compare shorter term versus lower modeled regular payment.
3. **Pay off by a target date** - calculate the regular payment / extra payment required.
4. **Pay off the loan in full** - show a modeled settlement amount with a strong lender-quote warning.

The default mode is **Pay extra regularly** because it is simple, broadly applicable and easy to understand.

The mode switch must not discard already entered common loan inputs.

---

# 9. Common loan inputs

## 9.1 Current outstanding balance

Primary label by market:

- India: **Outstanding home loan balance**
- US/CA/UK: **Current mortgage balance**
- AU/NZ: **Current home loan balance**
- fallback: **Current loan balance**

Rules:

- required;
- greater than zero;
- stored with its currency code;
- never converted automatically if the user changes currency.

## 9.2 Annual interest rate

Label:

**Current annual interest rate**

Rules:

- required;
- minimum 0%;
- maximum product-validation cap: 50%;
- step 0.01%;
- no live market-rate default;
- visible helper text must say to use the current lender rate for a closer estimate.

## 9.3 Remaining loan duration

Use years + months so the user does not have to round.

Localized labels:

- India / US / UK / AU / NZ: **Remaining loan term**
- Canada: **Remaining amortization**

Canada requires a note that the mortgage contract term and amortization period are different concepts; this calculator models repayment over the remaining amortization at the rate entered and does not model renewal pricing unless a later rate-change feature is added.

## 9.4 Scheduled repayment frequency

This field describes how often the lender's normal scheduled repayment is made. It is separate from both the user's planning view and any extra / part-prepayment cadence.

Options:

- Monthly
- Fortnightly / Biweekly - localized label
- Weekly

Default: **Monthly**, subject to the user's actual loan setup and any later approved country-profile suggestion. The user must always be able to override it.

The calculation engine must treat scheduled repayment frequency as a real model input rather than changing only the label.

## 9.5 Planning view - Monthly vs Pay Cycle

Provide a display / affordability view selector:

- **Monthly View**
- **Pay Cycle View**

This view controls how Carrowmont expresses affordability, set-aside amounts and cash-flow impact. It must not silently change the lender's scheduled repayment frequency.

Where a valid shared pay-frequency preference exists from another Carrowmont tool, **Pay Cycle View** may reuse that preference after validation. Otherwise, the user chooses the relevant pay cycle.

Example: a user may have a monthly EMI, be paid fortnightly, and choose to build a quarterly part-prepayment from amounts set aside each pay cycle. These are three distinct cadences and must remain separate in the model.

## 9.6 Current regular repayment - optional but recommended

Provide a switch:

**Use my lender's current repayment amount**

When off, Carrowmont calculates the scheduled repayment from balance, rate, remaining duration and calculation convention.

When on, the user enters the current repayment. This can improve continuity with the user's actual loan, but the tool must validate that the payment is sufficient to reduce principal under the model.

If the entered payment is less than or equal to modeled periodic interest, show a negative-amortization warning and do not claim a payoff date.

---

# 10. Mode-specific inputs

## 10.1 Pay extra regularly / recurring part-prepayment

Inputs:

- extra / part-prepayment amount;
- **extra / part-prepayment frequency**;
- start: now, after a selected number of periods, or on a selected date;
- optional one-time lump sum in addition to the recurring extra.

Frequency options should include, where mathematically compatible with the loan model:

- Every scheduled repayment
- Monthly
- Quarterly
- Half-yearly / Every 6 months
- Annually
- Custom interval / selected dates

### Neutral-selection rule

Recurring part-prepayment is **off by default**. If the user enables it, Carrowmont must require the user to choose the cadence; **no country-specific part-prepayment frequency is preselected**. In India, **Quarterly** may be shown as a clearly available option and the localized label may use **Part-Prepayment Frequency**, but it must not be treated as a universal or default behavior.

Default start after the user enables recurring part-prepayment: **next eligible date under the selected cadence**.

When **Pay Cycle View** is active, Carrowmont may additionally show the amount to set aside per pay cycle to fund the selected recurring part-prepayment. For example, it may show the per-pay-cycle amount required to build a quarterly principal part-payment. This is a planning display only; it must not change the lender repayment frequency or the selected part-prepayment cadence.

## 10.2 Lump-sum prepayment

Inputs:

- lump-sum amount;
- apply now or at a future payment date;
- strategy after lump sum:
  - **Keep regular repayment - finish sooner** (default);
  - **Keep original payoff date - lower modeled repayment**.

The second option is a mathematical recast / EMI-reduction illustration. The UI must state that the lender may not automatically recalculate the payment this way and the user should confirm actual loan terms.

## 10.3 Target payoff

Inputs:

- target payoff in years + months or target date;
- optional one-time lump sum to apply first.

Output:

- required regular repayment;
- additional amount above the modeled/current repayment;
- interest difference versus baseline;
- new target payoff date.

If the selected target is not earlier than the baseline payoff, the extra required is zero and the interface should explain why rather than showing a negative extra payment.

## 10.4 Full payoff / India foreclosure scenario

Inputs:

- optional user-entered early repayment / prepayment / foreclosure charge;
- optional other lender charges already quoted to the user.

The tool must **not** claim to provide an exact payoff statement.

Required message:

> A lender's payoff / foreclosure quote can differ from the current balance because of accrued interest, settlement timing, discharge or administration fees, and contract-specific charges. Confirm the final amount with your lender.

---

# 11. Calculation engine - source of truth

The calculation engine must be deterministic, isolated from UI code and independently testable.

Recommended file:

`core.js`

All screen, table, CSV and PDF outputs must consume the same engine results. No report renderer may recreate loan mathematics independently.

---

# 12. Core formulas

Let:

- `P` = current outstanding principal;
- `r` = annual rate as decimal;
- `m` = repayment periods per year;
- `n` = remaining repayment periods;
- `i` = periodic interest rate;
- `A` = scheduled repayment per period.

## 12.1 Periods per year

```text
Monthly      m = 12
Fortnightly  m = 26
Weekly       m = 52
```

## 12.2 Default periodic-rate convention

For the universal standard principal-and-interest approximation:

```text
i = r / m
```

## 12.3 Canadian fixed-rate convention

For Canada fixed-rate mortgage mode, use the standard nominal rate compounded semi-annually conversion:

```text
i = (1 + r / 2)^(2 / m) - 1
```

The Canadian convention must be disclosed in methodology. Other countries remain on the universal period-rate model unless a future approved country-specific convention is added.

## 12.4 Scheduled repayment

For `i > 0`:

```text
A = P * i / (1 - (1 + i)^(-n))
```

For `i = 0`:

```text
A = P / n
```

If the user supplies a current lender repayment, that value replaces the calculated `A` for ledger simulation after validation.

---

# 13. Amortization ledger

Use a period-by-period ledger for both the baseline and scenario paths.

For each period `t`:

```text
openingBalance_t = previous closing balance
interest_t       = openingBalance_t * i
scheduled_t      = min(A, openingBalance_t + interest_t)
extra_t          = applicable recurring extra + applicable lump sum
extra_t          = min(extra_t, openingBalance_t + interest_t - scheduled_t)
closingBalance_t = max(0, openingBalance_t + interest_t - scheduled_t - extra_t)
```

The final payment must be capped so the balance cannot become negative.

The engine should stop once the closing balance reaches zero or the safety period limit is reached.

Recommended hard safety limit: 100 years of modeled periods. Hitting the limit is an error state, not a valid payoff result.

Internal calculations should retain full numerical precision. Round only for display/export presentation.

---

# 14. Scenario calculations

## 14.1 Baseline

Calculate:

- modeled scheduled repayment;
- baseline payoff periods/date;
- baseline total interest remaining;
- baseline total repayments remaining.

## 14.2 Recurring extra-payment scenario

Run the same ledger with the recurring extra applied from the selected start period.

Calculate:

```text
interestSaved = baselineInterest - scenarioInterest
periodsSaved  = baselinePeriods - scenarioPeriods
```

## 14.3 Lump-sum, keep payment unchanged

Apply the lump sum at the selected event date, then keep the scheduled repayment unchanged. Use the ledger to determine the new payoff period and interest.

## 14.4 Lump-sum, keep payoff date unchanged

At the lump-sum event:

1. calculate the balance immediately after the lump sum;
2. determine the remaining periods in the original baseline schedule;
3. calculate a new modeled repayment using the standard repayment formula.

Output must say **modeled lower repayment**, not imply the lender will automatically recast / re-amortize.

## 14.5 Target payoff

Let `nTarget` be the desired remaining periods after any immediate lump sum.

Calculate the required repayment with the standard payment formula.

```text
extraRequired = max(0, requiredPayment - baselineScheduledPayment)
```

Run a ledger to verify the target is reached without a residual rounding balance.

## 14.6 Full payoff

A Carrowmont full-payoff result is an estimate, not a lender payoff quote.

At minimum show:

```text
modeledPrincipalSettlement = current modeled balance
totalUserEnteredCharges    = prepayment charge + other entered charges
modeledSettlementTotal     = modeledPrincipalSettlement + totalUserEnteredCharges
```

Do not fabricate accrued daily interest or lender charges that the user did not enter.

---

# 15. Fees, penalties and net modeled savings

Provide optional manual fee/charge inputs rather than hard-code lender or legal assumptions.

Show:

```text
interestSavedBeforeCharges = baselineInterest - scenarioInterest
netModeledCostReduction    = interestSavedBeforeCharges - userEnteredEarlyRepaymentCharges
```

Use the label **Net modeled cost reduction after entered charges** rather than `profit` or `return`.

The tool does not apply time-value-of-money, investment-return or tax assumptions to the prepayment decision. A separate **Prepay vs Invest** tool may be built later.

---

# 16. Primary outputs

The result hierarchy should answer the user's question within seconds.

## 16.1 Extra-payment / lump-sum term-reduction mode

Primary cards:

1. **Interest saved**
2. **Time saved**
3. **New payoff date**
4. **New total repayment per period**

Secondary figures:

- baseline repayment;
- extra repayment;
- baseline total remaining interest;
- scenario total remaining interest;
- baseline payoff date;
- scenario payoff date;
- user-entered charges;
- net modeled cost reduction after charges.

## 16.2 Lower-payment mode

Primary cards:

1. **Modeled new regular repayment**
2. **Payment reduction per period**
3. **Interest difference**
4. **Original payoff date retained**

## 16.3 Target-payoff mode

Primary cards:

1. **Required repayment**
2. **Extra amount required**
3. **Target payoff date**
4. **Interest difference versus baseline**

## 16.4 Full-payoff mode

Primary cards:

1. **Modeled principal settlement**
2. **Entered charges**
3. **Modeled settlement total**
4. **Future interest avoided under baseline model**

Always display the lender-quote warning near these results.

---

# 17. Deterministic interpretation language

Generate concise plain-language summaries from engine outputs only.

Example:

> With the assumptions entered, adding an extra $300 each month would reduce the modeled payoff time from 25 years to about 20 years and 8 months, while reducing remaining interest by about $X before any lender charges.

Rules:

- no `guaranteed`, `best`, `smartest`, `always`, `should` or similar recommendation language;
- no claim that interest saved is an investment return;
- no claim that the modeled payoff date equals a lender statement;
- any fee-adjusted statement must use only the fee values actually entered.

---

# 18. Chart and detailed table

## 18.1 Primary chart

Use one Carrowmont-standard balance-over-time chart:

- baseline remaining balance;
- scenario remaining balance;
- clear payoff point for each path;
- permanent printed endpoint / key values outside hover;
- no text outline / SVG stroke around labels;
- callouts must remain within plot boundaries and avoid markers.

The chart must follow the established Carrowmont chart font, axis, grid, callout and mobile rules.

## 18.2 Detailed schedule

Provide a compact yearly summary by default.

Columns:

- year / period group;
- opening balance;
- scheduled repayments;
- extra repayments / lump sums;
- interest charged;
- principal repaid;
- closing balance.

The complete period-level detail may be placed behind a disclosure / accordion to prevent the web page from becoming dominated by a long table.

CSV and PDF must retain complete detail even if the website collapses it.

---

# 19. Validation and edge cases

Mandatory validation includes:

- balance <= 0;
- negative or non-finite interest rate;
- zero remaining term;
- remaining term beyond supported maximum;
- negative extra payment;
- lump sum greater than modeled balance;
- target payoff earlier than one repayment period;
- target payoff later than baseline;
- user-entered repayment too small to amortize;
- fee values below zero;
- currency mismatch in imported shared state;
- unsupported country / locale fallback;
- exact zero-interest loan;
- rate values near zero;
- final-period rounding residue;
- extremely large currency values without overflow / `Infinity` / scientific-notation UI breakage.

A lump sum larger than the modeled balance should be capped to the balance for calculation and accompanied by a message explaining that the excess is unnecessary in the model.

---

# 20. Shared Carrowmont plan state - new core architecture

This release should introduce a versioned shared-state helper for compatible cross-tool data.

Recommended helper:

`shared-plan-state.js`

Recommended same-origin storage key:

`carrowmont_plan_context_v1`

Because all production tools operate under the same `carrowmont.com` origin, browser storage can support local cross-tool continuity without an account.

## 20.1 Required principles

1. Local-only by default.
2. No server transmission of financial values merely for persistence.
3. Every stored monetary value carries its currency code.
4. Every field carries a source tool and updated timestamp.
5. Shared state has a schema version.
6. Receiving tools validate every imported value.
7. Currency mismatches never trigger automatic FX conversion.
8. Directly equivalent fields may synchronize automatically when safe.
9. Semantically related but non-identical fields require user confirmation / explicit linking.
10. A tool must never silently overwrite a value the user already changed in that session.

## 20.2 Minimum schema

```text
version
locale.region
locale.currency
assumptions.annualInflationPct
housingLoan.balance
housingLoan.annualInterestRatePct
housingLoan.remainingPeriods
housingLoan.paymentFrequency
housingLoan.regularPayment
housingLoan.monthlyEquivalentPayment
housingLoan.modeledPayoffDate
housingLoan.sourceTool
housingLoan.updatedAt
```

The implementation may use nested structured objects rather than flat keys, but the semantic identifiers above must remain stable and documented.

## 20.3 Shared-state event

Dispatch a same-page event after a successful shared-state update:

`carrowmont:planchange`

The event should describe which semantic keys changed, not expose full financial amounts to analytics.

---

# 21. Cross-tool handoff behavior

The goal is not to copy every number everywhere. It is to reuse compatible values intelligently.

## 21.1 Budget & Cash Flow Planner

Home Loan -> Budget:

- offer to use the modeled/current regular housing-loan payment as the `Rent / mortgage` recurring commitment;
- if the Budget row is already explicitly linked to the shared housing loan, later loan-payment changes may update it;
- if the user has an independent housing value, ask before replacing it.

Budget -> Home Loan:

- an existing `Rent / mortgage` payment may be offered as a possible current repayment amount;
- never infer loan balance, interest rate or remaining term from the budget payment.

## 21.2 Retirement Planner

Home Loan -> Retirement:

- offer monthly-equivalent housing-loan payment as a pre-retirement expense;
- where the Retirement model supports expense end timing, offer the modeled payoff date / period as the end of that debt expense;
- if required age/date context is missing, ask the user rather than invent an age.

## 21.3 Financial Independence Planner

Home Loan -> FI:

- offer the housing-loan payment as a time-limited spending commitment;
- use the payoff horizon only if the planner's expense-end model can represent it without formula drift;
- do not treat outstanding principal as portfolio spending.

## 21.4 Goal Planner

Home Loan -> Goal:

- do not auto-create a goal;
- offer `Use home-loan payoff as a goal` only when the user deliberately chooses it;
- if selected, the outstanding balance can seed the goal amount, clearly identified as today's balance rather than a guaranteed settlement quote.

## 21.5 SIP / Recurring Investment Calculator

Home Loan -> Investment:

- do not automatically redirect debt payments into investments;
- after modeled payoff, offer an explicit handoff such as **Explore investing the payment you may free up**;
- only after user action should the former payment be proposed as a recurring investment amount.

## 21.6 Inflation Calculator

- share locale automatically;
- annual inflation assumptions may be shared where the semantic meaning is exactly the same;
- do not inflate or alter the home-loan balance simply because the user opens the Inflation Calculator.

---

# 22. Shared inflation assumption rule

As part of the cross-tool foundation, tools that already expose a generic annual inflation assumption may use a shared semantic field:

`assumptions.annualInflationPct`

Applicable candidates:

- Goal Planner;
- Financial Independence;
- Retirement Planner;
- Inflation Calculator.

The implementation must confirm that the existing fields are semantically equivalent before binding them. Tool-specific inflation assumptions that mean something different must remain separate.

This is the pattern Carrowmont should use for future shared values: share by meaning, not by similar-looking label.

---

# 23. Expansion from six to seven primary tools

This specification is the explicit approved architecture change contemplated by the current Tools Hub documentation.

After this release, the primary/core planning suite becomes:

1. Budget & Cash Flow Planner
2. SIP / Recurring Investment Calculator
3. Retirement Planner
4. Inflation Calculator
5. Goal Planner / Life Goals
6. Financial Independence Planner
7. Home Loan / Mortgage Prepayment & Early Payoff Calculator

Authority / scenario tools remain a separate category and do not enter the primary report registry merely because they are live.

---

# 24. Shared report registry change

The current six-tool `Continue planning with Carrowmont` registry must expand to seven tools.

After the change:

- the same shared `report-standard.js` logic should exist byte-identically across all seven core-tool repositories;
- the report that generated the PDF is removed from the recommendation list;
- each core report therefore shows the **other six primary tools**;
- the natural six-card recommendation layout should use a clean two-column grid with three rows unless an established responsive PDF rule produces a better equivalent;
- country-aware labels still apply, including SIP vs Recurring Investment and the local Home Loan / Mortgage identity where practical in the report system.

Existing calculator mathematics must remain unchanged by the registry update.

---

# 25. Homepage integration - seven tools + Explore All Tools

Update the main homepage core grid to:

- `data-core-tool-count="7"`;
- contain seven live core tool cards with stable `data-tool-id` values;
- append the permanent **Explore All Tools** gateway after country ranking;
- produce a balanced **4 x 2 desktop grid** at the established wide breakpoint;
- preserve two columns on narrower desktop/tablet where current responsive rules require it;
- preserve one column on mobile.

Recommended tool key for the new card:

`housing`

The order array for every country profile must contain exactly the seven real tool IDs once the tool is live.

`Explore All Tools` is not scored, not ranked and is always appended last.

Keyboard and screen-reader order must match visual order by physically reordering the card nodes, preserving the current Tools Hub pattern.

---

# 26. Homepage tool card

The new core card must look like a first-class Carrowmont planning card, not an authority-tool card.

Suggested content:

**Title - India:** Home Loan Prepayment  
**Title - US/CA:** Mortgage Payoff  
**Title - UK:** Mortgage Overpayment  
**Title - AU/NZ:** Home Loan Extra Repayments  
**Fallback:** Mortgage / Home Loan Payoff

Suggested description:

> See how extra payments or a lump-sum prepayment could reduce interest, shorten the loan or change the modeled repayment.

Suggested CTA:

- India: **Plan a prepayment ->**
- US/CA: **Explore mortgage payoff ->**
- UK: **Explore overpayments ->**
- AU/NZ: **Explore extra repayments ->**
- fallback: **Open calculator ->**

The icon should use the established card-icon language and may combine a simple home outline with a downward loan-balance / payoff motif. Do not introduce a different illustration style.

---

# 27. Tools directory integration

Add the new tool to `/tools.html` as a **Primary Planning Tool** and within the **Home & Loans** taxonomy.

The directory must:

- use the same country-aware visible terminology;
- link directly to `/mortgage-payoff-calculator/`;
- retain a crawlable static fallback name;
- not create separate country URLs.

Update the primary-tool count and any schema/ItemList that encodes the active core tools.

---

# 28. Report / PDF specification

The standard no-login downloadable report remains mandatory.

Recommended report structure:

## Page 1 - Loan & scenario summary

- Carrowmont heading;
- localized tool/report name;
- generated date;
- country and currency;
- common loan assumptions;
- selected scenario mode;
- four primary result cards.

## Page 2 - Balance path

- baseline versus scenario balance chart;
- payoff dates;
- interest comparison;
- time saved / payment change.

## Page 3 - Detail

- compact annual/period summary;
- user-entered charges;
- assumptions and any Canada-specific interest convention note;
- full-payoff warning when applicable.

## Page 4 - Report Guide & Methodology

Use the shared Carrowmont guide page structure with loan-specific methodology, assumptions, terminology and limitations.

## Page 5 - Continue planning with Carrowmont

Use the expanded seven-tool registry and render the other six core tools.

Page count may vary when detail requires safe wrapping, but the report must not create sparse trailing pages or clipped tables.

---

# 29. Copy Summary and CSV

## 29.1 Copy Summary

Provide **Copy Summary** with title-style capitalization.

The text should include:

- balance;
- rate;
- remaining duration;
- repayment frequency;
- scenario type;
- baseline repayment and payoff;
- scenario repayment and payoff;
- interest difference;
- time difference;
- entered charges;
- clear estimate-only wording.

## 29.2 CSV

CSV must include machine-readable fields for:

- country;
- currency;
- calculation convention;
- balance;
- annual rate;
- remaining periods;
- payment frequency;
- baseline payment;
- baseline total interest;
- baseline payoff date;
- scenario mode;
- recurring extra;
- lump sum;
- start period/date;
- target payoff date where applicable;
- user-entered charges;
- scenario total interest;
- scenario payoff date;
- interest saved;
- periods saved;
- net modeled cost reduction after entered charges;
- methodology version.

CSV values must match screen/PDF results from the same engine.

---

# 30. UI layout and display requirements

Use the established Carrowmont planner pattern:

1. shared header / locale control;
2. concise hero / product explanation;
3. input panel;
4. immediately visible primary results;
5. chart;
6. detailed comparison/table;
7. methodology / assumptions / FAQ disclosures;
8. report / copy / CSV actions;
9. related planning handoffs;
10. shared footer.

Do not over-densify the first viewport. Advanced lender-rule inputs belong behind a clear disclosure.

Result cards must use the same typography, number formatting, border, radius and spacing logic as existing core tools.

---

# 31. Accessibility requirements

Mandatory:

- native labeled inputs/selects/buttons;
- keyboard-complete interaction;
- visible focus states;
- no required hover interaction;
- color is never the sole indicator;
- chart information duplicated in text/table form;
- minimum practical touch target around 44px;
- no page-level horizontal overflow at 320px width;
- scenario mode control has accessible selected-state semantics;
- dynamic results use an appropriate polite `aria-live` region without re-announcing the whole page;
- validation errors identify the field and explain the correction.

---

# 32. Privacy and analytics

Loan values are sensitive household financial inputs.

Rules:

- calculations run locally in the browser;
- shared plan state remains in same-origin browser storage;
- no principal, payment, rate, income or other raw financial value is sent to analytics;
- analytics may record non-sensitive events such as calculator start, scenario-mode selection, report generation, handoff used, country profile and completion state;
- future account/cloud storage must remain a separate explicit-consent architecture.

Provide a clear **Clear shared Carrowmont values** action in an appropriate settings/reset area. It should remove the cross-tool financial context without changing browser-wide site permissions.

---

# 33. Methodology and limitations content

The page must explain:

- how amortization works;
- why extra principal paid earlier can reduce modeled future interest;
- why actual lender results can differ;
- fixed versus floating / variable rate caveats;
- lender-specific payment timing and interest-accrual differences;
- prepayment / early-repayment limits and charges;
- why the tool does not automatically decide whether prepayment is better than investing;
- why a current balance is not always the same as an exact payoff quote;
- that user-entered fees are included only when the user supplies them;
- that the model assumes the entered rate remains constant unless a future approved rate-change feature is introduced.

---

# 34. Country-specific guidance rules

Country guidance should be short, source-backed and non-prescriptive.

## India

- use EMI / tenure / prepayment terminology;
- recurring **Part-Prepayment Frequency** remains user-selected; quarterly may be offered prominently but must not be preselected merely because the country is India;
- explain that floating-rate prepayment-charge rules have regulatory constraints, but the tool still requires the user to confirm their own lender/product terms;
- do not hard-code a zero fee simply because the country is India.

## United States

- use payoff / extra principal language;
- explain that some mortgages can have prepayment penalties and loan documents control whether one applies;
- full payoff requires an actual payoff statement from the lender/servicer.

## Canada

- explain prepayment privileges and possible penalties on closed mortgages;
- distinguish mortgage term from amortization;
- use the Canadian fixed-rate semiannual-compounding convention in the model when applicable.

## United Kingdom

- use overpayment and Early Repayment Charge terminology;
- avoid hard-coding a universal 10% allowance because lender methods differ.

## Australia

- use extra repayments / home loan terminology;
- support monthly, fortnightly and weekly frequency;
- note that actual interest timing, redraw, offset and loan conditions can change outcomes.

## New Zealand

- use mortgage / home loan terminology;
- note possible break fees and contract-specific limits for fixed lending.

Other countries use general early-repayment wording and a lender-terms disclaimer unless a future approved local rule is added.

---

# 35. SEO and FAQ requirements

The page itself should be strong enough to answer the main search intent without requiring a separate article in V1.

Recommended FAQ topics:

1. Does making extra mortgage payments reduce interest?
2. Is it better to reduce the payment or shorten the loan term after a lump sum?
3. What is the difference between current balance and payoff amount?
4. Can my lender charge a prepayment / early repayment fee?
5. What does home-loan foreclosure mean in India?
6. What is mortgage overpayment in the UK?
7. How does a target payoff calculator work?
8. Does Carrowmont assume interest rates stay unchanged?
9. Can I compare prepaying with investing? - explain that this is a separate future decision tool, not part of this calculator.
10. Why might my lender's result differ from Carrowmont?

FAQ structured data may be used only if the visible page contains the same questions/answers and current search-engine guidance supports it at release time.

---

# 36. Internal linking

Required links from the new tool:

- Budget & Cash Flow Planner;
- Retirement Planner;
- Financial Independence Planner;
- Goal Planner;
- SIP / Recurring Investment Calculator - only in an explicit post-payoff / alternative-planning context;
- Inflation Calculator where relevant to long-term planning context;
- `/tools.html`.

Existing tools should receive contextual links back to the new calculator where useful, but do not add repetitive link spam to every section of every page.

---

# 37. Repository and file scope

## 37.1 New repository - `mortgage-payoff-calculator`

Expected files:

- `README.md`
- `index.html`
- `styles.css`
- `locale.js`
- `shared-plan-state.js`
- `core.js`
- `app.js`
- `analytics.js`
- `mortgage-payoff-pdf-renderer.js`
- `pdf-export.js`
- `report-standard.js`

## 37.2 Main site - `draw004.github.io`

Expected changes:

- homepage card / seven-tool count;
- country-aware title/copy for the new card;
- `site.js` seven-tool order profiles after demand-matrix revision;
- `carrowmont.css` confirmation of 4 x 2 wide layout and responsive behavior;
- `/tools.html` primary-tool and Home & Loans entry;
- footer / navigation registry where core-tool lists are maintained;
- `sitemap.xml`;
- `docs/CARROWMONT_HOMEPAGE_TOOL_DEMAND_MATRIX.md` revision;
- `docs/CARROWMONT_ARCHITECTURE.md` update to seven primary tools and shared-state contract;
- this specification in `docs/`.

## 37.3 Existing six core-tool repositories

Expected shared changes, limited to what the approved integration actually requires:

- `shared-plan-state.js` byte-identical helper;
- script include / app adapter for supported shared semantic fields;
- `report-standard.js` seven-tool registry update;
- any related report QA wiring;
- no formula changes unless separately specified and fixture-tested.

## 37.4 Central QA - `carrowmont-qa`

Add a dedicated test file, recommended:

`tests/15-mortgage-payoff-calculator.spec.js`

Also update source contract, report-registry tests, shared-state contract tests, homepage ordering tests and repository allow-lists.

---

# 38. New-repository automation prerequisite

The existing Publisher / Guard access currently covers the existing Carrowmont repository set. Before the first production release for this tool:

1. create the new `mortgage-payoff-calculator` repository;
2. grant the approved GitHub automation / app access to it;
3. add it to Publisher / Guard / Snapshot allow-lists where required;
4. validate repository access before attempting a multi-repo release.

Do not weaken repository protection or bypass the approved protected-PR workflow to add the seventh tool.

---

# 39. Calculation QA fixtures

At minimum, central QA must contain deterministic fixtures for:

1. 0% interest loan;
2. standard monthly amortization with no extra payments;
3. recurring extra payment from period 1;
4. recurring extra payment starting later;
5. one-time lump sum with unchanged regular payment;
6. lump sum with modeled lower payment and unchanged payoff horizon;
7. target payoff requiring additional payment;
8. target payoff later than baseline -> zero additional payment;
9. full payoff with zero entered charges;
10. full payoff with entered charges;
11. final-period cap with no negative balance;
12. user-entered payment too small -> negative-amortization error;
13. very large extra payment -> early payoff without negative balance;
14. Canadian fixed-rate periodic-rate convention;
15. monthly vs fortnightly vs weekly scheduled-repayment period handling;
16. recurring part-prepayment at monthly, quarterly, half-yearly and annual cadences;
17. neutral recurring part-prepayment state -> no cadence selected until the user explicitly chooses one;
18. Monthly View vs Pay Cycle View changes affordability / set-aside presentation without changing amortization cadence;
19. Pay Cycle View can derive a set-aside amount for a quarterly part-prepayment without converting the scheduled EMI to quarterly;
20. currency-format edge cases including zero-decimal currencies;
21. CSV / screen / PDF parity;
22. shared-state currency mismatch;
23. shared-state validation / non-overwrite behavior;
24. homepage seven-tool ordering + Explore All Tools fixed last.

Independent hand-calculated or externally verified reference values should be recorded for the principal fixtures rather than testing the engine only against itself.

---

# 40. Shared-state QA

Central QA must verify:

- schema version exists;
- invalid JSON / corrupt storage fails safely;
- currency-tagged values do not auto-convert;
- same-currency direct fields can be reused;
- receiving tool validates imported values;
- an explicitly edited receiving-tool field is not silently overwritten;
- clear-shared-values action works;
- loan values never appear in analytics payloads;
- `carrowmont:planchange` event does not expose full sensitive amounts to analytics hooks;
- country/currency continuity still works with existing `carrowmont_region_v1` / `carrowmont_currency_v1` behavior or the approved migration path.

---

# 41. UI / browser QA

Validate desktop and mobile for:

- canonical Carrowmont font stack;
- header and locale pill dimensions;
- no shell drift;
- mode control usability;
- input labels/helper text wrapping;
- large currency values;
- result cards;
- chart labels/callouts;
- full table disclosure;
- Copy Summary;
- CSV export;
- PDF generation;
- cross-tool handoff prompts;
- 4 x 2 homepage desktop state with seven tools + gateway;
- country change reorders tools and changes terminology;
- currency-only change does not reorder tools;
- no horizontal overflow at 320 / 360 / 390 px;
- visible focus and keyboard flow.

---

# 42. PDF visual review gate

Before Publisher creates production PRs, generate and visually inspect actual report PDFs for at least:

- India terminology / INR;
- United States terminology / USD;
- United Kingdom terminology / GBP;
- Australia terminology / AUD with fortnightly repayment;
- Canada terminology / CAD fixed-rate convention;
- a large-value currency case;
- a full-payoff warning case;
- a long annual table case.

Inspect every report page for clipping, sparse pages, broken wrapping, chart label collisions and inconsistent final recommendation cards.

---

# 43. Search-demand visual QA

For at least India, US, UK, Canada, Australia and Other / International:

- verify the new `housing` card appears at the rank specified by the revised demand matrix;
- verify the DOM order equals the visual order;
- verify `Explore All Tools` remains last;
- verify selecting another currency without changing country leaves the card order unchanged;
- verify the correct country wording appears on both homepage and tool page.

---

# 44. Source-contract / architecture QA

The central source contract must protect:

- seven primary tool identities;
- no duplicate hard-coded divergent registry;
- report helper byte equality across seven core tools;
- shared-state helper byte equality where the implementation uses copied helpers;
- no external API keys / secrets;
- no production runtime dependency on keyword-volume APIs;
- stable canonical route;
- sitemap presence;
- canonical and metadata presence;
- tool directory presence;
- country terminology mapping;
- report registry count = 7;
- per-report related core cards = 6;
- no authority/scenario tool silently enters the core report registry.

---

# 45. Release packaging scope

If the full architecture change is shipped in one coordinated release, expected repositories are conceptually:

1. `draw004.github.io`
2. `sip-calculator`
3. `goal-planner`
4. `financial-independence`
5. `inflation-calculator`
6. `retirement-calculator`
7. `budget-cash-flow-planner`
8. `mortgage-payoff-calculator` - new
9. `carrowmont-qa`

That implies up to **9 PRs** for the final integrated release.

Because this is materially larger than recent two-repository authority-tool releases, implementation may be split into controlled protected batches if necessary. However, the seventh-tool launch is not complete until the shared registry, homepage ranking, cross-tool handoff contract and final QA state are all consistent.

Do not guess expected PR count from old releases; calculate it from the final manifest before Publisher is run.

---

# 46. Recommended protected implementation sequence

1. Owner approves this specification.
2. Commit the approved Markdown specification to `draw004.github.io/docs/` through the protected PR flow.
3. Run a fresh Source Snapshot; that snapshot replaces Snapshot 41 as the implementation baseline.
4. Create / configure the new repository and automation access.
5. Build the deterministic calculation core and fixtures first.
6. Build the Carrowmont UI from the shared shell standard.
7. Implement country terminology.
8. Implement PDF / CSV / Copy Summary.
9. Implement shared plan-state helper and only the approved cross-tool adapters.
10. Expand the seven-tool report registry.
11. Refresh and commit the homepage demand matrix with the seventh tool.
12. Add the seventh homepage card, 4 x 2 desktop state and tools-directory entry.
13. Run static/hash/syntax/source-contract validation.
14. Run staged browser/mobile/calculation/export/PDF QA.
15. Run the visual consistency gate.
16. Run Publisher / Guard layout rehearsal if required by the release framework.
17. Build final reviewed release ZIP / manifest.
18. Run **Carrowmont Batch PR Publisher**.
19. Owner reviews all expected PRs.
20. Merge in controlled order; main-site and new-tool dependencies must be sequenced deliberately, with central QA merged last unless the final release manifest requires another documented order.
21. Confirm Pages deployments are green.
22. Run Live Automated QA.
23. Run Multi-Repo Guard.
24. Run a fresh Source Snapshot.
25. Inspect / request indexing for the new tool URL only after the release chain is green.

No production code should be written before the approved specification is committed and the fresh post-spec snapshot is taken.

---

# 47. Out of scope for V1

Do not include these in the first release unless separately approved:

- refinance / balance-transfer comparison;
- prepay-versus-invest recommendation engine;
- tax deduction optimization;
- property valuation / LTV calculations;
- borrowing-capacity / affordability underwriting;
- live lender rates;
- lender-specific penalty formulas;
- lender product recommendations;
- offset-account modeling;
- redraw modeling;
- escrow / property tax / insurance calculation;
- adjustable-rate reset schedules;
- historical interest-rate scenarios;
- cloud account requirement;
- AI-generated financial advice.

These may become separate later tools or advanced features.

---

# 48. Definition of done

The seventh core tool is complete only when:

- the calculation engine passes deterministic fixtures;
- terminology is correct for all supported country profiles;
- the page visually matches Carrowmont standards;
- the tool works at desktop and mobile widths;
- Copy Summary, CSV and PDF are consistent;
- the report uses the shared Guide & Methodology page;
- the shared report registry contains seven core tools and each report shows the other six;
- shared compatible values can move safely between relevant tools;
- scheduled repayment frequency, planning view and part-prepayment cadence remain separate and are never silently synchronized as one field;
- recurring part-prepayment remains neutral until the user explicitly enables it and selects a cadence;
- no receiving tool silently overwrites a user's independent value;
- shared financial state remains local-only by default;
- the homepage contains seven real core cards plus Explore All Tools;
- the homepage card order follows the revised country demand matrix;
- currency-only changes do not reorder the core tools;
- `/tools.html` lists the new primary/Home & Loans tool;
- sitemap/canonical/metadata are correct;
- central source contract is green;
- staged browser/mobile/PDF QA is green;
- visual consistency review is green;
- Batch PR Publisher is green;
- all expected PRs are reviewed and merged;
- live Pages are green;
- Live Automated QA is green;
- Multi-Repo Guard is green;
- a fresh Source Snapshot is green and becomes the next authoritative baseline;
- the new URL is inspected in Google Search Console and submitted for indexing when appropriate.

---

# 49. Source and evidence register

## 49.1 Carrowmont Snapshot 41 sources

- `docs/CARROWMONT_ARCHITECTURE.md`
- `docs/CARROWMONT_SHARED_UI_STANDARD.md`
- `docs/CARROWMONT_TOOLS_HUB1_ALL_TOOLS_DIRECTORY_DISCOVERABILITY_SPEC_FINAL_REV1.md`
- `docs/CARROWMONT_HOMEPAGE_TOOL_DEMAND_MATRIX.md`
- `docs/CARROWMONT_REPORT_STANDARD_IMPLEMENTATION.md`
- current `index.html`, `site.js`, `carrowmont.css`
- existing calculator locale/report patterns and central QA framework

## 49.2 External product / regulatory guidance consulted

- Consumer Financial Protection Bureau - prepayment penalties and payoff amount guidance:  
  https://www.consumerfinance.gov/ask-cfpb/can-i-be-charged-a-penalty-for-paying-off-my-mortgage-early-en-204/  
  https://www.consumerfinance.gov/ask-cfpb/what-is-a-payoff-amount-and-is-it-the-same-as-my-current-balance-en-205/

- Reserve Bank of India - floating-rate EMI reset / prepayment guidance and foreclosure-charge rules:  
  https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12529  
  https://www.rbi.org.in/scripts/NotificationUser.aspx?Id=12655&Mode=0

- Financial Consumer Agency of Canada - mortgage prepayment rights and penalties:  
  https://www.canada.ca/en/financial-consumer-agency/services/rights-responsibilities/rights-mortgages/rights-prepayments.html

- MoneyHelper UK - mortgage overpayments / early repayment charges:  
  https://www.moneyhelper.org.uk/en/homes/buying-a-home/should-you-pay-off-your-mortgage-early

- Australian Securities and Investments Commission Moneysmart - mortgage calculator / repay sooner guidance:  
  https://moneysmart.gov.au/home-loans/mortgage-calculator  
  https://moneysmart.gov.au/home-loans/pay-off-your-mortgage-faster

- New Zealand Sorted / Consumer Protection - mortgage calculator, extra repayments and break-fee guidance:  
  https://sorted.org.nz/tools/mortgage-calculator/  
  https://www.consumerprotection.govt.nz/help-product-service/borrowing-money/mortgages-and-home-loans

## 49.3 Search-demand evidence consulted

- seodata.dev - `mortgage payoff calculator` United States search-volume page, Google Ads API based data, updated June 2026:  
  https://www.seodata.dev/keyword/mortgage-payoff-calculator

- Techmagnate - Home Loan Trends for India FY2024-25, including `home loan calculator` and `housing loan prepayment calculator` query demand:  
  https://www.techmagnate.com/campaigns/ppc/health-insurance-industry-trends-india/pdf/2024/Techmagnate-Home-Loan-STR.pdf

Search-demand figures are directional product evidence, not a guarantee of Carrowmont traffic or ranking. The production seven-tool homepage order must still be based on the refreshed Carrowmont demand matrix described in Section 7.1.

---

# 50. Final product principle

The one idea the page must make obvious:

> **Paying principal earlier can change the modeled interest and payoff timeline, but the real result depends on the borrower's actual loan contract, rate behavior, repayment rules and charges. Carrowmont should make the mathematics transparent without pretending to replace the lender's payoff statement or provide individualized credit advice.**

The seventh core tool should feel like a natural extension of Carrowmont: global at its mathematical core, local in terminology, connected to the rest of the planning ecosystem, transparent in assumptions, and protected by the same design and QA standards as the existing six tools.
