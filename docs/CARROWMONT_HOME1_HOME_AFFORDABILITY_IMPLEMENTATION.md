# CARROWMONT HOME1 — Home Affordability / Mortgage Borrowing Power Implementation

**Implementation date:** 19 October 2026  
**Production baseline:** Carrowmont Source Snapshot 86  
**Main-site baseline SHA:** `ecabf9b743485d0c021b71019013b9b1e59d333d`  
**Central-QA baseline SHA:** `89b89393d54000caca459a0f335c93d562ffe534`

## Product rule

HOME1 is **standalone first, connected ecosystem second**. A visitor arriving directly from search can complete the calculator without using another Carrowmont tool. After the result, contextual links continue the decision into Rent vs Buy, Loan / EMI, Mortgage / Home Loan Payoff and Rate Rise & Budget Stress. No financial values are placed in a URL.

The primary question is simple:

> Given my take-home income, normal expenses, existing debt, protected savings, deposit, ownership costs and the money I want left free each month, what home price may fit my household budget?

HOME1 does not answer a different question on behalf of a bank or lender. It never claims that the modeled amount is approved, eligible, safe or guaranteed.

## Calculation model

HOME1 is cash-flow-first. It does not use a hard-coded income multiple or country-specific lender ratio as its affordability engine.

For “What home price may fit?” mode:

`monthly payment room = take-home income - essentials - existing debt - protected savings - chosen free-cash buffer - other ownership costs`

The standard amortizing-loan formula converts that monthly payment room into a loan amount using the entered annual rate and term. At a 0% rate, the zero-rate formula is used directly. The planning home price is the modeled loan amount plus the deposit or down payment entered by the visitor.

For “Check a home price” mode, HOME1 starts from the target home price, subtracts the deposit, calculates the modeled principal-and-interest payment and shows the monthly amount left compared with the visitor’s chosen buffer.

An optional higher-rate check reuses the same deterministic engine. It is labeled as a personal planning illustration, not a rate forecast and not a lender stress test.

Gross annual income is optional context only. It may display a modeled loan-to-income multiple but cannot change the affordability result.

## Global terminology

One canonical calculator and one calculation engine are retained. Visible terminology changes by selected country where useful:

- India — Home Loan Affordability Calculator; down payment; EMI / repayment; tenure.
- United States — Home Affordability Calculator; down payment; mortgage payment.
- Canada — Mortgage Affordability Calculator; down payment; amortization.
- United Kingdom / Ireland — Mortgage Affordability Calculator — How Much Can I Borrow?; deposit; mortgage repayment.
- Australia / New Zealand — Home Loan Borrowing Power Calculator; deposit; home-loan repayment.
- Other — Home Affordability & Mortgage Calculator.

The static search title and canonical remain stable so localization cannot remove the global search identity.

## Privacy architecture

The current Carrowmont privacy foundation supersedes the older analytics wording in the original HOME1 specification.

- **No Google Analytics.**
- **No analytics popup.**
- No analytics consent buttons or Analytics Settings control.
- Calculator financial inputs and results are not sent to website analytics, advertising or profiling systems.
- HOME1 calculation code performs no live financial-data fetch, XHR, WebSocket or beacon request.
- HOME1 does not persist calculator values in localStorage or sessionStorage.
- Financial values are not placed in URL query strings or fragments.
- Cloudflare privacy-focused aggregate site measurement remains part of the sitewide architecture.

## Search and Learn foundation at launch

Canonical calculator:

`https://carrowmont.com/home-affordability-calculator.html`

Supporting Learn pages:

1. `https://carrowmont.com/how-much-home-can-i-afford.html`
2. `https://carrowmont.com/mortgage-affordability-vs-lender-approval.html`
3. `https://carrowmont.com/how-deposit-and-interest-rates-affect-home-affordability.html`

The calculator owns calculator / affordability / borrowing-power intent. The Learn pages own their explanatory questions. All four URLs are indexable, self-canonical, sitemap-listed and contextually connected.

HOME1 is added as a secondary tool in the All Tools directory. The homepage remains at nine core tools and the compact footer is not expanded.

## Exports

HOME1 provides:

- Copy Summary
- CSV
- an exact four-page PDF generated from the same deterministic result object used by the screen

The report covers the planning summary, household cash flow, rate / methodology context and next-step decision checklist. It does not implement a second affordability engine.

## Learn quality

Each new Learn article follows the Carrowmont Learn Article Standard with a direct answer, worked examples, trade-offs, common mistakes, checklist / decision guidance, FAQs, primary consumer-finance sources and a visible path back to HOME1. Each article remains above the current 1,000-word QA regression floor without padding for keyword volume.

## QA and release scope

The production release is intentionally limited to two repositories:

1. `draw004.github.io`
2. `carrowmont-qa` — merge last

Central QA protects the deterministic formulas, both modes, zero-rate behavior, rate sensitivity, country terminology, privacy-safe inputs, Copy / CSV / exact four-page PDF, Tools Hub count, Learn journeys, sitemap coverage and 1280 / 390 / 360 responsive behavior.

Normal release sequence remains:

`Fresh Source Snapshot -> Batch PR Publisher -> draw004.github.io merge -> carrowmont-qa merge last -> Pages -> Automated QA -> Multi-Repo Guard -> fresh Source Snapshot -> manual Google indexing request for the four new canonical URLs`
