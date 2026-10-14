# CARROWMONT DEBT1 — DEBT PAYOFF CALCULATOR

## Product, Calculation, Plain-Language UX, Localization, Budget Handoff, Learn, Reporting, QA & Release Specification

**Status:** Final V1.0 specification-only document. Owner approval is represented by merging this specification release. Production code must not begin until the spec-only release is green and a fresh post-spec Source Snapshot is taken.  
**Authoritative design baseline:** Carrowmont Source Snapshot 64  
**Snapshot generated:** 2026-10-14T17:02:19Z  
**Main-site commit:** `6dad839c64b78cecb12209e9c23ccb3899f05994`  
**Budget repository commit:** `7bf6557f544723048234cf40427f665cf896271b`  
**Central QA commit:** `79c3543e6e83b50f38f28213015ba14d03bb4a38`

---

# 1. Why DEBT1 is the next build

The original Mortgage Decision Centre roadmap is now complete through MDC1C. The next ranked product in the approved post-MDC roadmap is **Debt Payoff Calculator**, with a simple side-by-side comparison of the two common payoff methods often called Snowball and Avalanche.

DEBT1 remains the strongest next build at the Snapshot 64 checkpoint because it combines:

1. a clear, recurring household question: **Which debt should I pay first, and how quickly can I become debt-free?**;
2. global applicability with relatively little country-specific tax or legal logic;
3. strong natural search intent around debt payoff, debt snowball, debt avalanche and extra-payment planning;
4. direct product adjacency to the existing Budget & Cash Flow Planner;
5. deterministic month-by-month mathematics that can be protected with fixtures;
6. a useful decision comparison without requiring Carrowmont to recommend a lender, credit product or debt-consolidation service.

Rent vs Buy is locked as the **next product immediately after DEBT1**. It needs a dedicated comparison calculator rather than routing users to Goal Planner, because a credible comparison must model the full rent-versus-owning path. It carries materially heavier local assumptions around taxes, transaction costs, ownership costs and market growth, which is why it remains second rather than first. Retirement drawdown / savings-longevity remains a strong future opportunity and should be reassessed after those two builds.

External validation used during scoping:

- Consumer Financial Protection Bureau — highest-interest-rate and snowball debt reduction strategies: `https://www.consumerfinance.gov/archive/blog/how-reduce-your-debt/`
- CFPB debt action-plan material: `https://files.consumerfinance.gov/f/documents/cfpb_your-money-your-goals_debt-action-plan_tool_2018-11.pdf`

These sources support the existence and trade-offs of the two methods. They do not define Carrowmont's calculation implementation.

---

# 2. Product identity

**Product family code:** `DEBT1`  
**Visible product name:** `Debt Payoff Calculator`  
**Search-facing identity:** `Debt Payoff Calculator | Compare Snowball vs Avalanche`

The tool compares two ways of deciding which debt gets the extra payment first, while keeping the same debts and the same total monthly payment:

- **Pay highest-interest debt first (Avalanche)**;
- **Pay smallest debt first (Snowball)**.

Carrowmont must compute both side by side. It must not ask the user to choose a method before showing the comparison.

The result is a planning comparison, not a recommendation.

## 2.1 Plain-language rule for every user-facing surface

DEBT1 must be easy to use even if the person knows almost no finance terminology. Search terms such as **snowball** and **avalanche** may appear because people look for them, but Carrowmont must explain them immediately in everyday language.

Preferred visible wording:

- `Debt Payoff Calculator`
- `Debt name (optional)`
- `How much do you owe?`
- `Interest rate`
- `Minimum monthly payment`
- `Extra amount I can pay each month`
- `Total amount paid each month`
- `You could be debt-free in...`
- `Total interest you may pay`
- `Pay smallest debt first (Snowball)`
- `Pay highest-interest debt first (Avalanche)`

Avoid user-facing phrases such as `repayment allocation`, `amortization hierarchy`, `optimization strategy`, `roll-forward`, `residual balance`, `cash-flow allocation`, or similar technical wording when a normal phrase works. Internal code and methodology may use precise technical terms, but buttons, field labels, results, warnings, Learn copy and the PDF should not require financial knowledge.

If a finance term is genuinely useful, explain it beside the term in one short sentence. For example: `APR (the yearly interest rate shown by your lender)` in a market where APR is familiar. Do not make users open methodology notes just to understand the main result.

---

# 3. Primary user questions

The tool must answer these questions in order:

1. **How long could it take me to pay off these debts?**
2. **How much interest could I pay if I clear the highest-interest debt first versus the smallest debt first?**
3. **In what order would the debts be cleared under each method?**
4. **How much earlier does each method clear the first debt?**
5. **What does an extra monthly payment change?**

The comparison should make the trade-off easy to understand:

> **Pay highest-interest debt first (Avalanche):** put the extra money toward the debt with the highest interest rate.  
> **Pay smallest debt first (Snowball):** put the extra money toward the debt with the smallest balance.

With the same debts and the same total monthly payment, the two methods can change how much interest is paid, which debt disappears first and how long the full payoff takes.

Carrowmont must show the actual modeled difference rather than using generic claims where the user's figures produce the same order or nearly identical results.

---

# 4. Search-intent hierarchy and query ownership

## 4.1 Tool intent

The canonical tool owns calculator / planner intent around:

- debt payoff calculator;
- debt repayment calculator;
- debt snowball calculator;
- debt avalanche calculator;
- snowball vs avalanche calculator;
- extra payment debt calculator;
- how long to pay off debt calculator.

**Static title:**  
`Debt Payoff Calculator | Compare Snowball vs Avalanche | Carrowmont`

**Static meta description:**  
`See how long it could take to clear your debts. Compare paying the smallest debt first with paying the highest-interest debt first, and test an extra monthly payment.`

**Fallback H1:**  
`Debt Payoff Calculator`

## 4.2 Learn intent

The primary Learn article owns educational comparison intent, not calculator head terms.

**Canonical Learn route:**  
`/debt-snowball-vs-avalanche.html`

**Title:**  
`Debt Snowball vs Avalanche: Which Debt Gets Paid First? | Carrowmont`

**H1:**  
`Debt snowball vs avalanche: which debt gets paid first?`

The Learn page should explain:

- smallest-balance-first versus highest-rate-first;
- why the payoff order can change total interest;
- why the first-debt payoff can feel faster under one order;
- why fixed-rate assumptions and minimum-payment behavior matter;
- a worked example;
- when the two methods can produce the same result;
- a direct CTA to the Debt Payoff Calculator.

The Learn page must not be rewritten to compete for the primary `debt payoff calculator` query.

---

# 5. Product architecture

DEBT1 should be a **companion decision tool inside the existing `budget-cash-flow-planner` repository**, not an eighth primary repository and not an eighth homepage core card.

This is the preferred architecture because debt payoff is fundamentally a cash-flow allocation decision and can reuse:

- the Budget & Cash Flow Planner locale / currency catalogue;
- shared visual language;
- privacy-first same-origin infrastructure;
- existing PDF/report utilities where compatible;
- contextual links between monthly surplus and debt repayment.

The seven-core homepage architecture remains unchanged.

The primary Budget & Cash Flow Planner remains a separate broader tool and must not have its existing calculation engine altered by DEBT1.

---

# 6. Stable canonical routes

| Purpose | Canonical path |
|---|---|
| Budget & Cash Flow Planner | `/budget-cash-flow-planner/` |
| **DEBT1 Debt Payoff Calculator** | **`/budget-cash-flow-planner/debt-payoff-calculator.html`** |
| DEBT1 Learn guide | `/debt-snowball-vs-avalanche.html` |
| All Tools directory | `/tools.html` |

No country-specific duplicate calculator URLs are created.

---

# 7. Inputs

## 7.1 Country and currency

Reuse the existing Budget & Cash Flow Planner country and currency catalogues.

Rules:

1. country and currency remain separate controls;
2. currency changes display only; Carrowmont performs no FX conversion;
3. country may adapt terminology and helper copy but not repayment mathematics;
4. changing currency after entering values leaves numeric values unchanged and reinterprets them in the newly selected currency;
5. `Other / International` remains last in the alphabetized country list.

## 7.2 Debt rows

V1 supports **1 to 10 debts**.

Each debt row should ask only four simple questions:

- `Debt name (optional)` — for example Credit card, Personal loan or Car loan;
- `How much do you owe?`;
- `Interest rate`;
- `Minimum monthly payment`.

Where a market commonly uses APR, helper text may say `Interest rate (APR)` rather than making APR the only label.

The tool must never ask for or encourage entry of:

- account numbers;
- card numbers;
- lender login credentials;
- addresses;
- personal identifiers.

The optional label is for the user's own readability only.

## 7.3 Extra monthly payment

Input label:

`Extra amount I can pay each month`

This amount is **in addition to the entered minimum monthly payments**.

Show the calculated total monthly debt budget directly below it:

> `Entered minimums: X · Extra: Y · Total modeled monthly debt payment: Z`

V1 does not require a separate total-budget input mode. Keeping one input model removes ambiguity and maps directly to the debt-reduction methods.

## 7.4 Optional start month

Allow an optional start month for calendar payoff dates.

If absent, show payoff duration in months / years and months, and use the current month only for a clearly labeled estimated calendar date if needed.

The deterministic engine must not depend on wall-clock time; start-month handling belongs outside the core payoff math.

---

# 8. Validation rules

Each active debt requires:

- balance > 0;
- APR >= 0;
- minimum payment > 0.

Extra monthly payment may be zero.

The UI must block calculation when:

- there are no valid debts;
- any balance, rate or minimum contains a non-finite value;
- a minimum payment is zero or negative;
- the debt count exceeds the V1 maximum.

The UI should warn, but not automatically block, when an entered minimum payment is less than or equal to that debt's first modeled month of interest. In that situation the balance can grow while another debt is being targeted.

The core must impose a hard projection horizon and return an explicit unresolved-plan status rather than looping indefinitely.

**V1 model horizon:** 600 months / 50 years.

---

# 9. Calculation contract

## 9.1 Fixed-rate monthly model

For debt `i`:

- opening balance = `B_i`;
- annual entered rate = `r_i` percent;
- monthly rate = `(r_i / 100) / 12`;
- entered minimum monthly payment = `m_i`.

Each modeled month follows the same deterministic sequence.

### Step 1 — accrue interest

For every active debt:

`interest_i = balance_i × monthlyRate_i`

`balance_i = balance_i + interest_i`

### Step 2 — pay entered minimums

For every active debt:

`minimumPaid_i = min(m_i, balance_i)`

Subtract all minimum payments from the balances.

### Step 3 — establish remaining monthly budget

At plan start:

`baseMinimumBudget = sum(all entered m_i)`

`totalMonthlyBudget = baseMinimumBudget + extraMonthlyPayment`

Within each month:

`remainingBudget = totalMonthlyBudget - sum(actual minimumPaid_i)`

Because a nearly cleared debt may need less than its entered minimum, unused money remains available in the same month's budget.

### Step 4 — allocate remaining budget by method

**Avalanche target order:**

1. highest APR first;
2. if APR ties, lower current balance first;
3. if still tied, original input order.

**Snowball target order:**

1. lowest current balance first;
2. if balance ties, higher APR first;
3. if still tied, original input order.

Apply all remaining monthly budget to the current target debt.

If that debt is cleared before the remaining budget is exhausted, spill the unused amount immediately to the next target debt in the same month using the same ordering rules.

No monthly budget is intentionally left idle while an active modeled debt remains.

### Step 5 — record results

Record at minimum:

- interest accrued that month;
- payment applied to each debt;
- closing balance of each debt;
- total closing balance;
- payoff month for any debt cleared;
- cumulative interest;
- cumulative amount paid.

Stop when all balances are cleared or the 600-month horizon is reached.

---

# 10. Precision and statement differences

The engine should retain full numerical precision internally and round only display values, except for final-payment capping needed to avoid overpayment artifacts.

A small numerical payoff tolerance may be used to remove floating-point residue.

The methodology must state that real lender statements can differ because of:

- daily rather than monthly interest accrual;
- compounding conventions;
- statement-date timing;
- changing minimum-payment formulas;
- fees, penalties or new charges;
- promotional or variable rates;
- currency minor-unit rounding.

The tool is a planning model, not a lender payoff quote.

---

# 11. What happens to freed payments

Classic snowball and avalanche plans roll freed payments forward.

DEBT1 therefore keeps `totalMonthlyBudget` constant after a debt is cleared.

Example:

- Debt A minimum: 100
- Debt B minimum: 200
- Extra payment: 50
- Total modeled budget: 350

When Debt A is cleared, the 100 that was previously its minimum does not disappear. It becomes part of the amount available to the next target debt.

This behavior must be visible in the methodology and tested explicitly.

---

# 12. Main result design

The results should not produce a simplistic green/red winner badge.

## 12.1 Shared summary

Show:

- starting total debt;
- entered minimum payments total;
- extra monthly payment;
- total modeled monthly debt budget.

## 12.2 Side-by-side method cards

Use these visible card names:

- **Pay highest-interest debt first (Avalanche)**
- **Pay smallest debt first (Snowball)**

Do not use `Avalanche` or `Snowball` by themselves as the primary card heading. The plain explanation comes first; the known search term stays in parentheses.

For each card, show:

- estimated debt-free time;
- estimated debt-free month/date when a start month is available;
- total modeled interest;
- total modeled amount repaid;
- first debt cleared and its payoff month;
- full payoff order.

## 12.3 Comparison interpretation

Use neutral dynamic copy based on the actual outputs.

Examples:

- `Paying the highest-interest debt first could mean 428 less interest in this example.`
- `Paying the smallest debt first clears your first debt 3 months earlier in this example.`
- `Both methods pay the debts in the same order with these numbers.`
- `The modeled debt-free month is the same, but the interest cost differs.`

Avoid:

- `Avalanche is best`;
- `Snowball is better for you`;
- `You should choose...`;
- creditworthiness or financial-advice language.

---

# 13. Extra-payment impact

Because `extraMonthlyPayment` is a primary user input, the result should quantify its effect.

For each strategy, calculate a comparison using the same debts with **extraMonthlyPayment = 0**, while preserving the same roll-forward method after debts are cleared.

Show, where the zero-extra baseline successfully amortizes within the model horizon:

- months saved by the entered extra amount;
- interest avoided by the entered extra amount.

If the zero-extra baseline does not resolve within 600 months, state that the entered minimum-only plan did not fully repay within the model horizon and do not invent a savings figure.

This baseline must be clearly labeled as a model using the entered fixed minimum payments, not a prediction of future lender-required minimums.

---

# 14. Charts and tables

## 14.1 Balance-over-time chart

Provide a chart comparing total remaining debt over time for:

- Avalanche;
- Snowball.

Permanent key values must not depend on hover.

## 14.2 Text/table equivalent

Provide an accessible table or structured schedule containing at minimum:

- month / date;
- total remaining balance for each method;
- total interest paid to date for each method.

## 14.3 Per-debt payoff table

For each debt and each method, show:

- payoff order;
- payoff month/date;
- entered APR;
- starting balance.

---

# 15. Budget & Cash Flow Planner connection

DEBT1 should strengthen Carrowmont's existing connected planning system without silently moving financial values between tools.

## 15.1 Budget → Debt handoff

When the Budget & Cash Flow Planner has a positive modeled `Money remaining`, it may offer a contextual action such as:

> **Explore debt payoff with this monthly amount**

The user must click the action before any value is staged for DEBT1.

The staged value represents only a **possible extra monthly debt payment**, not a recommendation.

Recommended shared-state path:

`assumptions.possibleMonthlyDebtExtra`

Requirements:

- currency tagged;
- source tool recorded as `budget-cash-flow-planner`;
- timestamp retained by the existing shared-state envelope;
- DEBT1 validates currency compatibility;
- DEBT1 rejects or ignores stale handoffs older than 30 minutes;
- DEBT1 displays the amount and asks `Use this as my extra monthly payment?`;
- the value is never applied silently;
- the staged handoff is cleared after the user applies or dismisses it.

Do not add debt balances, APRs, debt names or creditor information to the shared Carrowmont plan state.

## 15.2 Debt → Budget handoff

V1 does not need to overwrite or prefill the Budget Planner.

After results, provide:

> **Review this payment in Budget & Cash Flow Planner**

This opens the Budget Planner for the user to review affordability manually. No budget row is silently changed.

---

# 16. Privacy and storage

Debt details are potentially sensitive planning data.

V1 privacy contract:

1. no account or card numbers are requested;
2. debt labels, balances, rates and minimum payments are not automatically persisted to localStorage;
3. the calculation runs in the browser;
4. analytics must never include entered labels, balances, APRs, minimums or extra-payment amounts;
5. PDF generation stays client-side under the current Carrowmont report architecture;
6. the only cross-tool value that may be temporarily staged is the explicit Budget → Debt possible-extra-payment handoff described above;
7. a normal page reload may reset debt rows unless a later explicit `Save this plan on this device` feature is separately approved.

Do not add login, cloud sync or bank connection to DEBT1 V1.

---

# 17. Country-aware terminology

The math remains universal.

Preferred visible wording can adapt lightly:

| Market | Preferred plain-language wording |
|---|---|
| India | Debt Payoff Calculator; loan / credit-card debt; interest rate; minimum monthly payment |
| United States | Debt Payoff Calculator; interest rate (APR); minimum payment |
| Canada | Debt Payoff Calculator; interest rate / APR; minimum payment |
| United Kingdom / Ireland | Debt Payoff Calculator; interest rate; minimum payment |
| Australia / New Zealand | Debt Payoff Calculator; interest rate; minimum repayment |
| Other / International | Debt Payoff Calculator |

Method names should always include a plain-language explanation:

- `Pay highest-interest debt first (Avalanche)`
- `Pay smallest debt first (Snowball)`

No duplicate country pages are created.

---

# 18. V1 boundaries

DEBT1 V1 does **not** model:

- new borrowing or new card purchases;
- promotional rate expiry dates;
- variable future interest-rate changes;
- balance transfers;
- consolidation loans;
- lender-specific daily-interest conventions;
- late fees, annual fees or penalty fees unless already reflected by the user's entered balance/rate;
- minimum payments that dynamically change as a percentage of balance;
- taxes;
- settlement negotiations;
- collections strategy;
- bankruptcy / insolvency rules;
- debt-management-plan provider fees;
- credit-score impact;
- lender qualification;
- debt-to-income underwriting thresholds;
- legal or regulatory recommendations.

MDC1B remains the appropriate Carrowmont tool for mortgage refinance / balance-transfer break-even. DEBT1 should not duplicate it.

---

# 19. Failure and edge-state behavior

The tool must handle these states explicitly:

1. **One debt only** — both methods are identical; say so.
2. **Same ordering** — methods produce the same target order; show equal or near-equal results without forced differentiation.
3. **0% debt** — supported.
4. **Minimum below monthly interest** — warn that balance may grow while not targeted.
5. **Very large extra payment** — allow multiple debts to clear in one month; spill remaining budget correctly.
6. **Tiny residual balance** — cap final payment and clear floating-point residue.
7. **Unresolved at 600 months** — show `Not repaid within the 50-year model horizon` and suppress false debt-free dates.
8. **Currency changed after entry** — reinterpret numbers, do not FX-convert.
9. **Stale or currency-mismatched Budget handoff** — do not apply it.
10. **Invalid / removed debt rows** — never retain them in the result object.

---

# 20. Result object

Web, Copy Summary and PDF must all use the same deterministic result object.

Conceptually the result should contain:

- normalized inputs;
- starting total debt;
- base minimum-payment budget;
- extra monthly payment;
- total monthly budget;
- avalanche result;
- snowball result;
- zero-extra avalanche baseline;
- zero-extra snowball baseline;
- comparison deltas;
- warnings;
- calculation methodology version.

Each strategy result should contain:

- status;
- payoff months;
- total interest;
- total paid;
- first payoff debt / month;
- ordered per-debt payoff records;
- monthly aggregate series;
- optional calendar payoff date derived outside the core from the user-selected start month.

No separate arithmetic is allowed in the PDF renderer.

---

# 21. Copy Summary

Use the established capitalization:

`Copy Summary`

The copied text should include:

- total starting debt;
- total monthly debt payment;
- `Pay highest-interest debt first` payoff time and total interest;
- `Pay smallest debt first` payoff time and total interest;
- interest difference;
- first-debt payoff timing difference where meaningful;
- entered extra monthly payment;
- concise assumptions note.

Do not copy debt labels if doing so would unexpectedly expose user-entered sensitive naming in a share action without clear visibility. If labels are included, the UI must make that obvious before copying.

---

# 22. PDF report

Generate an actual Carrowmont PDF from the same result object.

Recommended fixed structure: **3 pages**.

## Page 1 — Debt payoff comparison

- Debt Payoff Calculator identity;
- starting debt and monthly budget;
- `Pay highest-interest debt first` headline result;
- `Pay smallest debt first` headline result;
- estimated interest difference;
- first-debt payoff comparison;
- plain-language interpretation.

## Page 2 — Payoff order and timeline

- per-debt payoff order for both strategies;
- payoff month/date;
- starting balance and interest rate;
- simple total-debt timeline or annual summary;
- extra-payment impact versus zero-extra baseline where valid.

## Page 3 — Assumptions, methodology and next steps

- how monthly interest is estimated;
- how the payment moves to the next debt after one is cleared;
- what the calculator assumes about interest rates and minimum payments;
- why the lender's exact figures may differ;
- privacy note;
- educational disclaimer;
- relevant Carrowmont links: Budget & Cash Flow Planner, Goal Planner, Financial Independence and Mortgage / Home Loan tools where contextually appropriate;
- Learn link to `debt-snowball-vs-avalanche.html`.

The DEBT1 report must not modify the seven-core report registry or require the seven primary repositories' shared `report-standard.js` files to change.

---

# 23. Learn and internal-link architecture

## 23.1 New primary guide

Publish:

`/debt-snowball-vs-avalanche.html`

The article belongs in the existing Budgeting / Money Management Learn area rather than creating a new top-level Learn category solely for one article.

## 23.2 Bidirectional journey

Required:

- Tool → Learn: `What do Snowball and Avalanche mean?`;
- Learn → Tool: `Compare my debts`;
- Budget Planner → Tool: contextual debt-payoff link;
- Tool → Budget Planner: `Review this payment in Budget & Cash Flow Planner`.

Do not add DEBT1 links to every Carrowmont article or calculator.

## 23.3 Existing contextual articles

Review only genuinely relevant Money Management articles such as:

- `cash-flow-vs-income.html`;
- `zero-based-budgeting.html`;
- `pay-yourself-first-budgeting.html`;
- `emergency-fund-how-much.html` / `emergency-savings.html` where context is educational rather than prescriptive.

At most a small number should gain secondary contextual links in V1. Avoid link dumping and intent cannibalization.

---

# 24. Tools Hub and homepage

`/tools.html` should list Debt Payoff Calculator as a **secondary / focused calculator**, not as an eighth core planning calculator.

Preferred card:

**Type:** `Debt planning`  
**Title:** `Debt Payoff Calculator`  
**Description:** `See how long it could take to clear your debts, compare two payoff orders, and test what an extra monthly payment changes.`  
**CTA:** `Calculate my payoff →`

The seven core cards on the homepage remain unchanged.

The permanent `Explore All Tools` gateway remains unchanged.

---

# 25. Structured data and sitemap

The new tool should use:

- `WebApplication`;
- `BreadcrumbList`;
- canonical URL;
- `index,follow` robots metadata;
- shared Carrowmont `WebSite` / `Organization` entity references.

The Learn page should use:

- `Article`;
- `BreadcrumbList`;
- canonical URL;
- shared site / publisher references.

Add both new public URLs to the main sitemap with the release date as `lastmod`.

IndexNow should cover the changed sitemap / public pages automatically through the existing workflow.

After production release, request Google indexing for the two new public URLs and any materially changed directory page if needed.

---

# 26. Accessibility and responsive behavior

Mandatory:

- keyboard-accessible add/remove debt controls;
- visible focus treatment;
- debt rows usable at 390 px and 360 px without horizontal overflow;
- tables may use an explicitly accessible horizontal scroll container only when a stacked representation is not practical;
- chart has a text/table equivalent;
- color is not the only method distinction;
- buttons and interactive controls target approximately 44 px minimum touch size;
- inline validation is associated with the relevant field;
- results announce material recalculation changes appropriately without excessive live-region noise.

---

# 27. Deterministic fixture contract

Production must include independent core fixtures before DOM testing.

Minimum fixture set:

1. one debt, 0% APR;
2. one debt, positive APR;
3. two debts where Snowball and Avalanche choose different first targets;
4. two debts where both methods choose the same order;
5. APR tie resolved by lower balance for Avalanche;
6. balance tie resolved by higher APR for Snowball;
7. full tie resolved by input order;
8. extra monthly payment = 0;
9. large extra clears multiple debts in one month;
10. one debt's minimum below first-month interest;
11. 0% debt coexisting with high-rate debt;
12. final-payment capping / floating residue;
13. three-debt roll-forward of freed minimums;
14. zero-extra comparison baseline;
15. unresolved plan hits 600-month horizon cleanly;
16. currency does not affect numerical math;
17. debt row order does not alter outputs except documented tie cases;
18. deleted/invalid debt row is excluded from normalized input;
19. one-debt Avalanche and Snowball parity.

The production team should add additional fixtures whenever implementation reveals a meaningful edge case.

---

# 28. Browser QA contract

Create a dedicated central QA suite, expected filename:

`23-debt-payoff-calculator.spec.js`

Mandatory browser groups:

1. page loads with no unexpected JS errors;
2. add and remove debt rows;
3. Avalanche vs Snowball divergent-order example;
4. identical-order example;
5. extra-payment comparison;
6. large-payment same-month spillover;
7. warning for minimum <= first-month interest;
8. 600-month unresolved state;
9. country/currency behavior;
10. Budget → Debt handoff requires explicit user application;
11. stale and currency-mismatched handoffs are rejected;
12. debt details are not silently persisted;
13. Copy Summary reconciles with the result object;
14. generated PDF is a valid PDF and has exactly 3 pages;
15. PDF headline values reconcile with webpage output;
16. tool ↔ Learn links;
17. Tools Hub card and sitemap discovery;
18. 1280 px layout;
19. 390 px layout and no horizontal overflow;
20. 360 px layout and no horizontal overflow;
21. plain-language copy audit: no unexplained finance jargon in primary fields, results, warnings, CTAs or PDF headline sections.

Source-contract protection must explicitly assert that the seven-core homepage remains unchanged by DEBT1.

---

# 29. Production release boundary

Expected production release touches exactly three repositories:

1. `budget-cash-flow-planner`
2. `draw004.github.io`
3. `carrowmont-qa` — merge last

Expected Budget repository additions/changes include:

- new `debt-payoff-calculator.html`;
- new deterministic debt-payoff core;
- new DEBT1 UI/controller JS;
- new DEBT1 styles or a tightly scoped extension;
- new DEBT1 PDF renderer/export integration;
- explicit Budget result CTA / one-time handoff support;
- no change to the existing Budget calculation engine unless separately required and regression-protected.

Expected main-site changes include:

- `/tools.html`;
- new Learn article;
- Learn hub entry / supporting metadata;
- sitemap;
- only narrowly relevant internal links;
- no homepage core-card addition.

Expected QA changes include:

- DEBT1 deterministic/browser/PDF protection;
- source-contract additions;
- any tools-hub / Learn expectations affected by the new public URLs.

No workflow file is expected to change.

---

# 30. Release process

The controlled release sequence remains:

1. merge this specification-only release;
2. run Automated QA;
3. run Multi-Repo Guard;
4. take a fresh Source Snapshot;
5. treat that fresh snapshot as the only production-code baseline;
6. build the exact three-repository production bundle;
7. verify manifest base/new SHA-256 hashes;
8. run source contract in staged normal and Guard layouts;
9. run deterministic fixtures;
10. run exact browser QA at desktop / 390 / 360;
11. render and inspect the exact 3-page PDF;
12. create a disposable staging branch from current main;
13. upload the exact ZIP to that branch;
14. run Batch PR Publisher;
15. merge Budget repository first, main site second, central QA last;
16. Pages / deployment green;
17. Automated QA green;
18. Multi-Repo Guard green;
19. take a fresh Source Snapshot;
20. Google indexing requests / IndexNow verification where relevant;
21. delete staging and Publisher-generated branches.

The staging branch itself is never merged to `main`.

---

# 31. Non-goals and future extensions

Potential later DEBT enhancements that are **not** part of V1:

- target debt-free date solver;
- one-time lump-sum payment events;
- promotional APR end dates;
- variable-rate debt scenarios;
- minimum-payment percentage formulas;
- debt-consolidation comparison;
- balance-transfer comparison for non-mortgage debt;
- user-approved local plan saving;
- CSV schedule export;
- debt-free milestone reminders;
- credit-report or account integrations.

These should be added only after real user / search demand justifies them and the V1 comparison is stable.

---

# 32. Acceptance criteria

DEBT1 production is ready only when all of the following are true:

- [ ] Specification merged and a fresh post-spec Source Snapshot taken.
- [ ] Tool is implemented inside `budget-cash-flow-planner`, not as an eighth core repo.
- [ ] Primary visible identity is `Debt Payoff Calculator`; Snowball and Avalanche are secondary method names with immediate plain-language explanations.
- [ ] Field labels, results, errors, Learn copy and PDF headline sections use simple language and avoid unexplained finance jargon.
- [ ] 1–10 debt rows supported.
- [ ] Avalanche and Snowball are calculated side by side under one equal monthly budget.
- [ ] Freed minimum payments roll forward.
- [ ] Same-month spillover works when a target debt clears early.
- [ ] Tie rules are deterministic.
- [ ] Extra-payment impact versus zero-extra baseline is correctly shown where valid.
- [ ] 600-month unresolved behavior is safe and explicit.
- [ ] Budget handoff is explicit, currency-safe, short-lived and never automatic.
- [ ] Debt details are not automatically persisted.
- [ ] Learn page and Tool ↔ Learn journey are live.
- [ ] Tools Hub lists DEBT1 as a secondary focused calculator.
- [ ] Seven-core homepage remains unchanged.
- [ ] Copy Summary uses the same result object.
- [ ] Actual PDF is valid and exactly 3 pages.
- [ ] Desktop / 390 / 360 browser QA is green.
- [ ] Source contract and Guard-layout source contract are green.
- [ ] No workflow file is included.
- [ ] Production release creates exactly 3 PRs in the expected repository order.
- [ ] Post-merge Pages, Automated QA and Multi-Repo Guard are green.
- [ ] Fresh post-production Source Snapshot is accepted before DEBT1 is closed.

---

# 33. Product principle

DEBT1 should help the user understand the consequence of a repayment order, not tell the user what to do.

The core Carrowmont question is:

> **If I pay the same total amount each month, what changes when I pay the highest-interest debt first instead of the smallest debt first?**

The answer should be transparent enough that the user can see the timing, interest and payoff-order trade-offs directly.
