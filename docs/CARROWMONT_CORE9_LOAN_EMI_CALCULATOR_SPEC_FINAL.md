# CARROWMONT CORE9 — LOAN / EMI CALCULATOR
## Final Product / Implementation Specification

**Status:** FINAL — approved direction, repository/bootstrap required before implementation release  
**Baseline for bootstrap:** Carrowmont Source Snapshot 75  
**Snapshot generated:** 2026-10-16T20:11:03Z  
**Controller baseline commit:** `04574aad955fa13530b28d0906efc0ca2e6070c1`  
**Central QA baseline commit:** `1bf6e66d4f93e1070c19d5aa887c2de0827bc45b`

---

# 1. Product purpose

Create a global, no-login **Loan / EMI Calculator** for fixed-rate amortizing instalment loans.

The primary user question is:

> What would my monthly loan payment be, how much interest would I pay, and how does the balance fall over time?

For India the visible terminology should use **EMI Calculator** / **Loan EMI**. For markets where EMI is not the familiar term, use **Loan Calculator**, **Loan Repayment Calculator** or **Monthly Loan Payment** language without changing the underlying mathematics.

This is a generic consumer-loan tool. It must not replace the existing Mortgage Payoff Calculator, Debt Payoff Calculator or future vehicle-specific tools. It should be suitable for personal loans, unsecured instalment loans and other ordinary fixed-rate reducing-balance loans when the assumptions match.

Search-demand evidence is directional, not a traffic guarantee. Public demand data reviewed on 17 October 2026 shows very large English-language demand around this intent, including approximately 2.74M monthly searches for **emi calculator** and 1.50M for **loan calculator** in one worldwide English-language Google Ads dataset, while a US dataset reports roughly 823K for **a loan calculator**, 673K for **calculator for a loan**, and 165K for **personal loan calculator**.

References reviewed:

- https://rgb.ir/en/trends/lending/
- https://www.seodata.dev/keyword/interest-on-personal-loans-calculator
- https://www.bankrate.com/loans/loan-calculator/
- https://www.calculator.net/amortization-calculator.html
- https://www.paisabazaar.com/personal-loan-emi-calculator/

---

# 2. Canonical product identity

Repository:

`Draw004/loan-calculator`

Canonical production URL:

`https://carrowmont.com/loan-calculator/`

Recommended canonical title:

**Loan & EMI Calculator | Carrowmont**

Recommended meta description:

**Calculate a monthly loan payment or EMI, total interest and total repayment. Explore an amortization schedule and optional extra-payment scenarios.**

Country-aware visible product labels:

- India — **EMI Calculator**
- United States / Canada — **Loan Calculator**
- United Kingdom — **Loan Repayment Calculator**
- Australia / New Zealand — **Loan Repayment Calculator**
- fallback — **Loan / EMI Calculator**

Recommended H1:

**See what a loan could cost each month.**

The canonical URL must not change by country.

---

# 3. CORE9 architecture change

After implementation is live and approved, the primary planning suite becomes nine tools:

1. Budget & Cash Flow Planner
2. SIP / Recurring Investment Calculator
3. Retirement Planner
4. Inflation Calculator
5. Goal Planner
6. Financial Independence Planner
7. Home Loan / Mortgage Prepayment & Early Payoff Calculator
8. Compound Interest Calculator
9. Loan / EMI Calculator

The shared **Continue planning with Carrowmont** report registry must expand from eight to nine core tools. Each core report removes the current tool and shows the other eight. The same `report-standard.js` must remain byte-identical across all nine core calculator repositories after implementation.

Authority/scenario tools remain separate and do not enter the core report registry merely because they are public.

---

# 4. V1 user modes

## 4.1 Primary mode — Calculate monthly payment / EMI

Required inputs:

- loan amount / principal
- annual interest rate (%)
- loan term

Loan term may be entered in years and/or months, with a deterministic total-month conversion.

Primary outputs:

- monthly payment / EMI
- total interest
- total repayment
- payoff date when a start date is supplied

## 4.2 Reverse mode — Calculate loan amount from a monthly budget

Allow the user to enter:

- target monthly payment / EMI
- annual interest rate
- term

Return the modeled principal supported by those assumptions.

This is a mathematical affordability aid only. It must not be labeled as lender eligibility, approval probability or borrowing advice.

## 4.3 Optional advanced assumptions

Advanced assumptions may include:

- loan start / first-payment date
- fixed upfront fee
- percentage origination / processing fee
- extra monthly payment
- one-time extra payment with payment month/date

Fees must be shown separately from interest. Do not silently add fees to principal unless the user explicitly chooses a financed-fee treatment in a future version.

Extra-payment scenarios must preserve the scheduled payment unless the user explicitly selects another supported scenario. V1 need not model recasting.

---

# 5. Calculation methodology

Let:

- `P` = principal
- `j` = nominal annual interest rate as a decimal
- `r = j / 12` = monthly rate
- `n` = total number of monthly payments
- `PMT` = monthly payment

## 5.1 Standard reducing-balance payment

For `r != 0`:

`PMT = P × r × (1+r)^n / ((1+r)^n - 1)`

For `r = 0`:

`PMT = P / n`

This standard amortizing/reducing-balance method is the default CORE9 method.

## 5.2 Reverse principal calculation

For `r != 0`:

`P = PMT × (1 - (1+r)^(-n)) / r`

For `r = 0`:

`P = PMT × n`

## 5.3 Amortization schedule

For each scheduled month:

- interest = opening balance × monthly rate
- principal repaid = payment - interest
- ending balance = max(0, opening balance - principal repaid - applicable extra payment)

The final scheduled payment must be capped so the balance never becomes negative.

Headline totals must reconcile to the detailed schedule within documented rounding tolerance.

## 5.4 Fees

Show at minimum:

- entered fees
- interest cost
- total repayment including entered fees

Do not label a fee-inclusive effective-rate calculation as regulated **APR** unless a future country-specific regulatory implementation explicitly supports the applicable legal definition.

## 5.5 Extra payments

When enabled, show:

- revised payoff date / months to payoff
- revised total interest
- interest saved versus baseline
- time saved versus baseline

Do not apply prepayment penalties automatically. If the user has a penalty, it can be modeled only through a clearly labeled user-entered fee in V1.

---

# 6. Validation and boundaries

Recommended V1 bounds:

- principal: greater than 0 and up to 1,000,000,000 selected currency units
- annual rate: 0% to 60%
- term: 1 to 600 months
- monthly budget/payment in reverse mode: greater than 0 and up to 100,000,000
- fixed fee: 0 to 100,000,000
- percentage fee: 0% to 20%
- extra monthly payment: 0 to 100,000,000
- one-time extra payment: 0 to outstanding principal

Reject invalid combinations deterministically. Never display NaN, Infinity, undefined or negative ending balances.

---

# 7. Result hierarchy

Primary result cards:

1. Monthly payment / EMI
2. Total interest
3. Total repayment
4. Payoff horizon / date

When reverse mode is active, the first result becomes:

1. Modeled loan amount

Secondary results:

- principal
- entered fees
- total cost including entered fees
- interest-to-principal share
- interest/time savings when extra payments are enabled

The main answer must be understandable without reading methodology.

---

# 8. Visualization and amortization table

Provide a responsive balance/paydown visualization.

Required visual information:

- outstanding balance over time
- cumulative principal repaid
- cumulative interest paid

The detailed amortization table must show at minimum:

- payment number/date
- payment
- principal
- interest
- extra payment when applicable
- ending balance

The screen may group long schedules by year with expandable monthly detail. CSV/report output may contain the complete schedule.

No essential value may be hover-only.

---

# 9. Country and currency behavior

Reuse the existing Carrowmont country/currency architecture.

Country and currency remain separate concepts.

Country may change:

- EMI versus payment/repayment terminology
- helper text/examples
- date/number formatting conventions

Currency changes units/formatting only. It does not perform FX conversion.

The core amortization mathematics remains universal unless a future approved country-specific rule genuinely requires different math.

---

# 10. Privacy and data behavior

V1 remains client-side and no-login.

Do not send loan amount, rate, payment or other scenario values to analytics or third parties.

Do not add lender APIs, lead forms, application flows or bank-product recommendations.

Existing analytics isolation and privacy QA remain unchanged.

---

# 11. Report / PDF

The standard downloadable Carrowmont report is mandatory.

Recommended report structure:

**Page 1 — Loan summary**
- country/currency
- principal
- rate
- term
- payment/EMI
- total interest
- total repayment

**Page 2 — Paydown path**
- balance chart
- principal versus interest decomposition
- optional extra-payment comparison

**Page 3+ — Amortization schedule**
- annual summary and/or paginated monthly detail

**Guide & methodology page**
- reducing-balance formula
- zero-rate handling
- fees and extra-payment disclosure
- educational disclaimer

**Continue planning with Carrowmont**
- the other eight CORE9 tools

---

# 12. Cross-tool relationships

Natural links include:

- Budget & Cash Flow Planner — payment affordability context
- Debt Payoff Calculator — users managing several debts
- Mortgage Payoff Calculator — home-loan-specific payoff/prepayment decisions
- Compound Interest Calculator — saving/investing growth rather than borrowing cost

Do not silently transfer sensitive loan values across tools. Reuse only the existing approved shared-state semantics where fields are genuinely compatible and user intent is clear.

---

# 13. Homepage and Tools directory integration

After implementation is live:

- add the Loan / EMI Calculator to `/tools.html` as a Primary Planning Tool and within **Debt & Credit / Loans** taxonomy;
- update any ItemList/schema counts that encode live tools;
- add a real homepage core card;
- expand deterministic country demand profiles from eight to nine live core tool IDs;
- keep **Explore All Tools** fixed after the live core tools;
- preserve physical DOM order = visual/keyboard order;
- use the established responsive card system rather than forcing a fragile fixed card count.

Do not remove or demote an existing core tool merely to preserve an older grid shape.

---

# 14. Internal linking and Learn support

At launch, link the calculator naturally from relevant existing content and tools where borrowing/payment context is real.

A future Loan & Credit Learn cluster may include distinct-intent guides such as:

- reducing-balance interest versus flat-rate interest
- shorter versus longer loan term
- how amortization changes principal and interest over time
- extra payments and interest savings

Do not create thin pages for every loan amount/rate/term combination.

---

# 15. SEO contract

Required:

- one canonical URL
- one H1
- unique title/meta description
- valid calculator structured data only if non-misleading
- sitemap inclusion with accurate `lastmod`
- IndexNow through the existing corrected implementation
- direct crawlable links from homepage and `/tools.html`
- no country-specific duplicate URLs

Search-intent supporting copy should naturally address:

- loan calculator
- EMI calculator
- monthly loan payment
- loan repayment calculator
- personal loan calculator
- total interest
- amortization schedule

Avoid keyword stuffing and lender-application intent.

---

# 16. QA contract

At minimum validate:

## Mathematics
1. zero interest
2. standard amortizing loan
3. one-month term
4. long term
5. very small rate
6. high but allowed rate
7. reverse principal mode
8. baseline schedule reconciliation
9. final payment cap / zero ending balance
10. fees remain separate from interest
11. extra monthly payment
12. one-time extra payment
13. combined extra payments
14. time saved / interest saved reconciliation

## UI / accessibility
15. desktop layout
16. 390 px layout
17. 360 px layout
18. no page-level horizontal overflow
19. table scroll/expansion remains local
20. visible focus
21. keyboard operation
22. no hover-only essential result
23. validation messages

## Locale
24. India uses EMI terminology
25. US/Canada use Loan Calculator terminology
26. UK/AU/NZ use repayment terminology
27. country selector ordering remains standard
28. currency remains independently selectable

## SEO / architecture
29. canonical/title/meta/H1
30. sitemap inclusion
31. Tools directory link
32. homepage integration
33. IndexNow parser covers the expanded sitemap

## Reports
34. PDF generation
35. chart legibility
36. amortization pagination
37. methodology page
38. Continue Planning page
39. `report-standard.js` byte identity across all nine core repos
40. each report excludes itself and exposes the other eight core tools

## Regression
41. existing calculator mathematics unchanged
42. source contract green
43. staged Chrome/PDF QA green
44. live parallel Automated QA green
45. Multi-Repo Guard green

---

# 17. Repository/bootstrap sequence

CORE9 requires a new repository, so implementation must be split into protected stages.

## Stage A — create repository

Create `Draw004/loan-calculator` with `main` as its default branch and one initial README commit. Do not publish a placeholder calculator page.

Apply the current Carrowmont **Protect main** ruleset:

- Active
- target default branch
- bypass list empty
- Restrict deletions
- Require a pull request before merging
- Block force pushes

## Stage B — token and automation bootstrap

Add `loan-calculator` to the approved `CARROWMONT_REPO_TOKEN` repository list.

Update Repository Access Check, Source Snapshot, Multi-Repo Guard, Multi-Repo Dry Run and Batch PR Publisher so they know about `loan-calculator`.

Because the bootstrap modifies `.github/workflows/*`, temporarily enable **Workflows: Read and write** only for the Publisher run that creates the bootstrap PR, then revoke it again immediately after PR creation succeeds.

Run Repository Access Check and Multi-Repo Guard after the bootstrap merge.

Run a fresh Source Snapshot. That post-bootstrap snapshot — not Snapshot 75 — becomes the implementation baseline.

## Stage C — calculator implementation

Build the full new repository plus coordinated main-site, report-standard and QA changes from the post-bootstrap snapshot.

Run exact-bundle hash/allow-list checks, deterministic fixtures, Publisher-layout source contract, Guard-layout source contract and staged browser/PDF QA before handoff.

## Stage D — production verification

Merge in dependency-safe order with central QA last, configure GitHub Pages for the new repository, then run:

- live route check
- IndexNow
- parallel Automated QA
- Multi-Repo Guard
- fresh Source Snapshot

Only then is CORE9 complete.

---

# 18. Out of scope for V1

Do not add:

- live lender offers or lead-generation forms
- lender approval/eligibility predictions
- credit-score prediction
- regulated APR claims without country-specific implementation
- variable-rate reset simulation
- balloon loans
- interest-only loans
- lease calculations
- car-specific depreciation/ownership-cost modeling
- mortgage taxes/insurance/HOA/PMI
- student-loan income-driven repayment rules
- loan consolidation recommendations
- automatic bank connections
- account/login storage
- AI-generated borrowing advice

These can be separate future tools or approved extensions where the search intent and rules are distinct.

---

# 19. Definition of done

CORE9 is complete only when:

- repository/bootstrap is protected and green;
- calculation fixtures pass independently;
- locale terminology is correct without changing canonical URL;
- screen/CSV/PDF reconcile to the same result object;
- the shared report registry is nine tools and byte-identical across all core repositories;
- homepage and tools directory expose the live tool;
- sitemap/IndexNow include the canonical URL;
- staged Publisher QA passes;
- production Pages route is live;
- parallel Automated QA is green;
- Multi-Repo Guard is green;
- a fresh Source Snapshot becomes the new authoritative baseline.
