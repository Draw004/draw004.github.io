# CARROWMONT MDC1B — Refinance / Balance Transfer Break-Even
## Production Implementation Record

**Implementation date:** 14 October 2026  
**Approved product specification:** `docs/CARROWMONT_MDC1B_REFINANCE_BREAK_EVEN_SPEC_FINAL.md`  
**Authoritative production baseline:** Source Snapshot 59

## 1. Baseline lock

Production coding started only after the specification-only PR was merged. Source Snapshot 59 is the exact production baseline for this implementation.

| Repository | Snapshot 59 commit |
| --- | --- |
| `draw004.github.io` | `e2db46fd12843e68238515ff2b92d032f2398dce` |
| `mortgage-payoff-calculator` | `84b149c7fc730ac0daa0b7fe0c38cfadf12b6345` |
| `carrowmont-qa` | `d8f6e1189537cec5120e88d621803396e359e889` |

The other six core-tool repositories are outside MDC1B production scope and remain unchanged.

## 2. Controlled repository scope

Expected generated release PR count: **3**.

Merge order:

1. `mortgage-payoff-calculator`
2. `draw004.github.io`
3. `carrowmont-qa` — central QA always last

No SIP, Goal, Financial Independence, Inflation, Retirement or Budget repository change is part of MDC1B.

## 3. Public routes and Decision Centre state

- Existing payoff calculator: `/mortgage-payoff-calculator/`
- Decision Centre hub: `/mortgage-payoff-calculator/decision-centre.html`
- MDC1A Prepayment vs Investing: `/mortgage-payoff-calculator/prepayment-vs-investing.html`
- MDC1B Refinance Break-Even: `/mortgage-payoff-calculator/refinance-break-even.html`
- MDC1B primary Learn guide: `/mortgage-refinance-break-even.html`
- MDC1C Rate Shock & Budget Stress remains planned and non-clickable.

After MDC1B, the Decision Centre therefore exposes exactly **three Live** decisions and **one Planned** decision. The seven-core-tool homepage architecture remains unchanged.

## 4. Deterministic comparison architecture

MDC1B reuses the existing `mortgage-payoff-calculator/core.js` amortization engine and does not modify it. The separate `refinance-break-even-core.js` creates three deliberately distinct loan views:

1. current modeled repayment from balance, current rate and remaining term;
2. new-rate repayment using the **same current balance and same remaining term**, with no financed switching fees, to isolate the rate effect;
3. proposed refinance repayment using the lender's entered new term and current balance plus switching fees only when those fees are financed.

The same repayment frequency is used for current and proposed loans in V1. Existing country-specific fixed-rate payment conventions from the shared mortgage core, including Canada's convention, are reused unchanged.

## 5. Costs and durable break-even

The economic switching cost is:

`switching fees + existing-lender exit / early-repayment charge - cashback / incentive`

If switching fees are financed, the fee still remains part of economic switching cost and is also added to proposed principal, so its associated loan interest is captured.

At each modeled repayment period, MDC1B compares:

`current cumulative interest - proposed cumulative interest - net switching cost`

Positive values mean the refinance path has the lower modeled borrowing cost at that point. The comparison reconciles independently to cumulative borrower cash outflow plus remaining loan balance. Principal repayment is not mislabeled as a borrowing cost.

A **durable break-even** is the earliest point at which the modeled advantage is non-negative and never becomes negative again through the full comparison horizon. A temporary crossing that later reverses is disclosed but is not promoted as the hero break-even. If no durable crossing occurs, the result explicitly says so.

## 6. Term and holding-period protection

MDC1B does not allow term extension to masquerade as a pure rate saving. It always keeps the same-term new-rate payment visible beside the actual proposed-term payment.

- A longer proposed term triggers an explicit warning.
- A lower payment paired with higher modeled lifetime borrowing cost triggers a stronger warning.
- A shorter term may legitimately create a higher payment and lower lifetime cost; this is not labeled a failure.
- The optional holding-period result is separate from lifetime economics and shows the modeled advantage/cost at the first repayment checkpoint at or after the entered holding period.

## 7. Local profile, privacy and localization

MDC1B reads the existing local-only `carrowmontMortgageDecisionV1` profile only after explicit user confirmation. It uses reusable loan facts but intentionally ignores a saved current-payment override so the three-payment comparison remains internally consistent.

Saving from MDC1B writes reusable current-loan facts only. New-offer rate, proposed term, fees, exit charge, cashback, holding period and results are never added to the shared profile.

The engine remains universal. Country selection changes terminology for India, US, Canada, UK, Ireland, Australia, New Zealand and the international fallback. MDC1B does not invent country-specific legal, tax, penalty, lender-eligibility or product rules.

## 8. Reporting, Learn and discovery

MDC1B provides:

- Copy Summary from the deterministic result object;
- an actual **three-page PDF Refinance Decision Report** from the same result object;
- a period-by-period accessible advantage chart with visible text/table results as the source of truth;
- a primary Learn guide explaining fees, financed fees, durable break-even, holding period and term extension;
- bidirectional Tool ↔ Learn links and shared bottom Learn CTA;
- Learn-hub and sitemap discovery for the new public routes.

No CSV export, live lender feed, lender ranking, lender eligibility decision or recommendation is introduced.

## 9. QA and release gate

The exact packaged release must protect:

- existing Mortgage Payoff and MDC1A behavior;
- Decision Centre state of 3 Live / 1 Planned;
- deterministic fixtures for no-fee, upfront-fee, financed-fee, cashback, term extension, term shortening, no durable break-even, temporary crossing, holding-period timing, cashback greater than costs, zero-rate, Canada convention and repayment-frequency month conversion;
- the same-term rate-isolation invariant and cash/balance economic-equivalence invariant;
- explicit profile application and intentional ignoring of a saved current-payment override;
- Copy Summary and exact three-page PDF generation;
- Tool ↔ Learn, canonical, sitemap and representative localization states;
- desktop, 390px and 360px horizontal-overflow protection;
- source contract in source, Publisher and Multi-Repo Guard-style layouts;
- ZIP integrity and release-manifest hashes.

## 10. Workflow permissions and post-merge sequence

No workflow file is changed by MDC1B. `Workflows: Read and write` is **not required**; the established no-workflow-change / No access discipline remains in force unless separately approved.

After the three generated PRs are merged in order:

**Pages → Automated QA → Multi-Repo Guard → fresh Source Snapshot → indexing.**

The successful fresh snapshot supersedes Snapshot 59 for MDC1C.
