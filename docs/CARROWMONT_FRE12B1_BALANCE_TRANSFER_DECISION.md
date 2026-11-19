# Carrowmont Financial Resolution Engine — Batch 12B-1

**Title:** Credit-card balance transfer decision comparison  
**Baseline:** `carrowmont-source-snapshot - 2026-11-19T190557.410.zip`  
**Main:** `8c2d7e0b7c1cdbfe343fadccd6a7f1301f29e490`  
**QA:** `91a1be52556c588ffb29f3d6940e961541308be4`  
**Stage:** Reviewable release, not merged or deployed

## Scope and original-roadmap alignment

This is the first constrained delivery of the **original Batch 12 Wider Resolution Library & Opportunity Engine**. The parent Batch 12 remains open for the later short-term savings, mortgage, goal/lump-sum and potential saved-plan opportunity layers. Original Batch 13 stays reserved for **optional connected financial data**, not for this release.

Carrowmont already has a deep balance-transfer Learn guide and a tested Credit Card Payoff Calculator. To avoid a competing URL and minimize prior green-release regressions, the new decision is an optional expandable section of the **existing canonical credit-card calculator**:

`/budget-cash-flow-planner/credit-card-payoff-calculator.html#balance-transfer`

The Learn guide and the existing Tools card point to this anchor. The core calculator, 23-card Tools directory, 9-core homepage, existing `145` public indexed URLs, sitemap, formulas, PWA startup, login, saved plans and country/currency storage remain unchanged.

## Decision and mathematical model

**Question:** Is moving an existing credit-card balance to an introductory-rate transfer worth it compared with keeping the current card at the same fixed monthly payment?

Required inputs are the initial balance, existing APR, common fixed monthly payment, promotional APR, introductory months (0–60), post-promotion APR, percentage fee, additional fixed fee and fee treatment (financed or paid upfront).

- **Keep the card:** Call the **existing Debt Payoff Core** `simulateStrategy` using a single debt and the entered fixed monthly payment; no new baseline interest model.
- **Transfer:** Move the same opening balance. Add the percentage plus fixed fee to the new outstanding balance if the user chooses financed fees; otherwise count it as upfront extra cash. Interest is applied at the promotional nominal annual APR / 12 for the selected months, then at post-promotion APR / 12. Payments follow interest and are capped at the balance due, using the same monthly payment as the old-card path.
- **Results:** Fee, total interest, total paid including any upfront fee, repayment months, balance when the offer expires, and the minimum modeled payment needed to clear during that period (rounded *up* to the display currency’s ordinary fractional unit (whole units for currencies such as JPY)).
- **Comparable savings:** Current-card **total paid** less transfer **total outlay**, only when **both paths fully repay** within the 600-month model. A negative number is displayed as **more with transfer**, never as savings. If either path is unresolved, do not display a misleading lifetime saving.
- **No arbitrary promotional-rate optimism:** A 0% offer can still cost more after a fee or if a balance survives the expiry date.

No live rates, credit approval, new purchases, issuer grace-period/day-count rules, statement-specific minimums, late fees, taxes, credit limits, investment return, bank connection, credit inquiry or product recommendation are modeled. The user must verify actual offer terms. No example amount is presented as a current country rate.

## Privacy / data / country rules

- Guest-first, client-only calculation; nothing auto-saved in My Carrowmont.
- Never collect card account numbers, identification or issuer credentials.
- Existing country and currency controls handle labels/number formatting. No automatic FX conversion and no invented local law or deposit/credit rules.
- Existing Ask/Search categorization and one established Learn URL remain authoritative. User question routing occurs via existing Search and Tools links; no new full AI intent or account access introduced.

## Quality and release acceptance

1. Deterministic cases: sample, zero APR/no fee, fee makes transfer worse, financed/upfront fee, APR expiry cliff, 0-month offer, insufficient payment and invalid data.
2. Confirm current-card path matches existing Debt Payoff Core exactly and interest + principal + fee reconciles to total outlay.
3. Browser: fragment reveals the new section, current payoff report remains available, accessibility, mobile 360px no horizontal overflow, no stale savings on invalid inputs.
4. Tools/Learn deep-links and Search1 inventory/relevance; **no new sitemap URL or indexing request**.
5. Main + budget repo + QA combined source checks and package baseline hashes; Browser QA (Chrome, Edge, Mobile Chromium), Publisher and Multi-Repo Guard must complete green before merge.
6. No automatic account write, no PWA/startup/nav/financial-engine changes and no change to unrelated calculator repositories.

**Release state:** Source pass alone is not production acceptance. Publisher browser QA and deployed physical-device review remain required.
